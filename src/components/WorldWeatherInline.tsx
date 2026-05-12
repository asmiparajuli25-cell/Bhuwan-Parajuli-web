import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, CloudLightning, MapPin, Globe } from 'lucide-react';

export default function WorldWeatherInline() {
  const [nepalWeather, setNepalWeather] = useState<any>(null);
  const [worldWeather, setWorldWeather] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      // Kathmandu
      const reqNp = fetch(`https://api.open-meteo.com/v1/forecast?latitude=27.7172&longitude=85.3240&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=Asia%2FKathmandu`);
      
      // Major cities
      const cities = [
        { name: 'Tokyo', lat: 35.6895, lon: 139.6917, tz: 'Asia/Tokyo' },
        { name: 'New York', lat: 40.7128, lon: -74.0060, tz: 'America/New_York' },
        { name: 'London', lat: 51.5074, lon: -0.1278, tz: 'Europe/London' },
        { name: 'Sydney', lat: -33.8688, lon: 151.2093, tz: 'Australia/Sydney' },
      ];

      const promises = cities.map(c => 
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${c.lat}&longitude=${c.lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=${encodeURIComponent(c.tz)}`).then(r => r.json()).then(data => ({ ...data, city: c.name }))
      );

      const [resNp, ...resWorld] = await Promise.all([reqNp.then(r => r.json()), ...promises]);
      
      setNepalWeather(resNp.current);
      setWorldWeather(resWorld);
    } catch (e) {
      console.error("Weather error", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const getWeatherIcon = (code: number, size = 32) => {
    if (code === 0) return <Sun className="text-yellow-400" size={size} />;
    if (code >= 1 && code <= 3) return <Cloud className="text-slate-300" size={size} />;
    if (code >= 51 && code <= 67) return <CloudRain className="text-blue-400" size={size} />;
    if (code >= 71 && code <= 86) return <CloudSnow className="text-white" size={size} />;
    if (code >= 80 && code <= 82) return <CloudRain className="text-blue-400" size={size} />;
    if (code >= 95) return <CloudLightning className="text-purple-400" size={size} />;
    return <Sun className="text-yellow-400" size={size} />;
  };

  const getConditionText = (code: number) => {
    if (code === 0) return 'Clear Day';
    if (code === 1) return 'Mainly Clear';
    if (code === 2) return 'Partly Cloudy';
    if (code === 3) return 'Overcast';
    if (code >= 51 && code <= 67) return 'Raining';
    if (code >= 71 && code <= 86) return 'Snowing';
    if (code >= 80 && code <= 82) return 'Showers';
    if (code >= 95) return 'Thunderstorm';
    return 'Clear';
  };

  return (
    <div className="w-full bg-[#1A233A]/80 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-sky-800/40 shadow-xl overflow-hidden relative">
       {/* Background Decor */}
       <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-900/10 rounded-bl-full z-0 pointer-events-none blur-3xl"></div>
       <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-900/10 rounded-tr-full z-0 pointer-events-none blur-3xl"></div>

       <div className="relative z-10">
         <div className="flex flex-col md:flex-row gap-8 items-stretch">
            {/* Nepal Weather Highlight */}
            <div className="flex-1 bg-gradient-to-br from-blue-900/60 to-sky-900/40 border border-blue-500/30 rounded-2xl p-6 shadow-inner relative overflow-hidden group">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=600')] bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity mix-blend-screen"></div>
               
               <div className="flex items-center gap-2 mb-4 relative z-10">
                 <MapPin className="text-orange-400" size={24} />
                 <h3 className="text-2xl font-black text-white tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                    Nepal Weather
                 </h3>
               </div>
               
               {loading ? (
                 <div className="h-24 flex items-center justify-center text-blue-300 animate-pulse">Fetching global atmospheric data...</div>
               ) : nepalWeather ? (
                 <div className="relative z-10 flex items-center gap-6">
                    <div className="p-4 bg-white/5 rounded-full border border-white/10 shrink-0">
                      {getWeatherIcon(nepalWeather.weather_code, 64)}
                    </div>
                    <div>
                       <div className="flex items-baseline gap-2">
                         <span className="text-5xl font-black text-white">{nepalWeather.temperature_2m}°C</span>
                       </div>
                       <p className="text-xl text-blue-200 font-medium capitalize mt-1">
                          {getConditionText(nepalWeather.weather_code)}
                       </p>
                       <div className="flex items-center gap-4 mt-3 text-sm text-slate-300">
                          <span>Hum: {nepalWeather.relative_humidity_2m}%</span>
                          <span>Wind: {nepalWeather.wind_speed_10m} km/h</span>
                       </div>
                    </div>
                 </div>
               ) : (
                  <p className="text-red-400 text-sm">Failed to load local data</p>
               )}
            </div>

            {/* World Weather Grid */}
            <div className="flex-[1.5] flex flex-col justify-center">
               <h4 className="text-lg font-bold text-slate-300 mb-4 flex items-center gap-2">
                 <Globe className="text-cyan-500" size={18} />
                 World Weather Live
               </h4>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {loading ? (
                     [...Array(4)].map((_, i) => (
                       <div key={i} className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/50 h-28 animate-pulse"></div>
                     ))
                  ) : (
                    worldWeather.map((ww, i) => (
                      <div key={i} className="bg-slate-800/40 hover:bg-slate-700/60 rounded-xl p-4 border border-slate-700/50 transition-colors flex flex-col items-center justify-center text-center group cursor-default">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 group-hover:text-cyan-400 transition-colors">{ww.city}</span>
                        <div className="mb-2">
                          {getWeatherIcon(ww.current.weather_code, 28)}
                        </div>
                        <span className="text-xl font-bold text-white">{ww.current.temperature_2m}°</span>
                      </div>
                    ))
                  )}
               </div>
            </div>
         </div>
       </div>
    </div>
  );
}
