import React, { useState, useEffect } from 'react';
import NepaliDate from 'nepali-date';
import { Cloud, Clock, Calendar, MapPin, X, Sun, CloudRain, CloudSnow, CloudLightning, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface WeatherTimeWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WeatherTimeWidget({ isOpen, onClose }: WeatherTimeWidgetProps) {
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [locationName, setLocationName] = useState('Bagmati, Kathmandu, Nepal');

  // User provided API key
  const API_KEY = 'AIzaSyDSKzGs7yGvCO8V2rMlAn3q40XHAze8Ej0';

  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      // Fetching highly detailed current weather for Kathmandu, Nepal
      const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=27.7172&longitude=85.3240&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&timezone=Asia%2FKathmandu&_t=${Date.now()}`, {
        cache: 'no-store'
      });
      const data = await res.json();
      setWeather(data.current);
    } catch (err) {
      console.error("Failed to fetch real-world weather data:", err);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherCondition = (code: number) => {
    if (code === 0) return { text: 'Sunny / Clear', icon: <Sun className="text-yellow-500" size={32} /> };
    if (code >= 1 && code <= 3) return { text: 'Partly Cloudy', icon: <Cloud className="text-slate-400" size={32} /> };
    if (code >= 51 && code <= 67) return { text: 'Raining', icon: <CloudRain className="text-blue-500" size={32} /> };
    if (code >= 71 && code <= 86) return { text: 'Snowing', icon: <CloudSnow className="text-blue-300" size={32} /> };
    if (code >= 80 && code <= 82) return { text: 'Showers', icon: <CloudRain className="text-blue-500" size={32} /> };
    if (code >= 95) return { text: 'Thunderstorm', icon: <CloudLightning className="text-purple-500" size={32} /> };
    return { text: 'Clear', icon: <Sun className="text-yellow-500" size={32} /> };
  };

  useEffect(() => {
    if (isOpen && !weather) {
      fetchWeather();
    }
  }, [isOpen]);

  // Format Nepali Date
  let formattedNepaliDate = '';
  try {
    const nepaliDate = new NepaliDate(time);
    formattedNepaliDate = nepaliDate.format('YYYY MMMM DD, dddd');
  } catch (e) {
    formattedNepaliDate = 'Date unavailable';
  }

  // Time in Kathmandu
  const kathmanduTime = time.toLocaleTimeString('en-US', { 
    timeZone: 'Asia/Kathmandu', 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit' 
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-24 right-4 sm:right-6 z-50 w-72 sm:w-80 bg-white/95 backdrop-blur-xl rounded-[24px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-white/40 overflow-hidden flex flex-col"
        >
          <div className="bg-gradient-to-r from-blue-600 to-emerald-500 p-4 text-white flex justify-between items-center shadow-sm relative z-10 shrink-0">
            <h3 className="font-bold flex items-center gap-2 text-[15px]">
              <MapPin size={16} />
              {locationName}
            </h3>
            <button onClick={onClose} className="text-white/80 hover:text-white transition-all p-1.5 rounded-full hover:bg-white/20 active:scale-95">
              <X size={18} />
            </button>
          </div>
            
            <div className="p-3 space-y-3 max-h-[65vh] overflow-y-auto bg-slate-50/50">
              {/* Time Section */}
              <div className="bg-white rounded-xl p-3 border border-slate-100 shadow-sm flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                    <Clock size={14} className="text-blue-500" />
                    <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Real-time Clock</span>
                  </div>
                  <div className="text-2xl font-bold text-slate-800 font-mono tracking-tight">
                    {kathmanduTime}
                  </div>
                </div>
              </div>

              {/* Date Section */}
              <div className="bg-white rounded-xl p-3 border border-slate-100 shadow-sm flex flex-col">
                <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                  <Calendar size={14} className="text-emerald-500" />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Nepali Calendar</span>
                </div>
                <div className="text-base font-semibold text-slate-700">
                  {formattedNepaliDate}
                </div>
              </div>

              {/* Weather Section */}
              <div className="bg-white rounded-xl p-3 border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between mb-3 border-b border-slate-50 pb-2">
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Cloud size={14} className="text-sky-500" />
                    <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Live Weather</span>
                  </div>
                  <button 
                    onClick={fetchWeather}
                    disabled={loading}
                    className="text-blue-600 hover:text-blue-700 py-0.5 px-2 rounded-md bg-blue-50 hover:bg-blue-100 transition-colors disabled:opacity-50 flex items-center gap-1"
                    title="Refresh Weather"
                  >
                    <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
                    <span className="text-[10px] font-bold uppercase">Sync</span>
                  </button>
                </div>
                {loading && !weather ? (
                  <div className="text-slate-400 text-xs animate-pulse text-center py-4">Establishing satellite connection to Kathmandu...</div>
                ) : weather ? (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-50 rounded-xl">
                        {getWeatherCondition(weather.weather_code).icon}
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-slate-800 tracking-tighter leading-none">
                          {Math.round(weather.temperature_2m)}°C
                        </div>
                        <div className="text-sm font-semibold text-slate-600 mt-1">
                          {getWeatherCondition(weather.weather_code).text}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold text-slate-500">Feels Like</span>
                        <span className="text-sm font-bold text-slate-700">{Math.round(weather.apparent_temperature)}°</span>
                      </div>
                      <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold text-slate-500">Humidity</span>
                        <span className="text-sm font-bold text-slate-700">{weather.relative_humidity_2m}%</span>
                      </div>
                      <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold text-slate-500">Precip.</span>
                        <span className="text-sm font-bold text-slate-700">{weather.precipitation}mm</span>
                      </div>
                      <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold text-slate-500">Wind</span>
                        <span className="text-sm font-bold text-slate-700">{Math.round(weather.wind_speed_10m)}km/h</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-red-400 text-xs text-center py-4">Failed to connect to weather station</div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
  );
}
