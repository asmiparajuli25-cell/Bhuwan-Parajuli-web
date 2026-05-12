import React, { useState, useEffect } from 'react';
import { Coins, X, TrendingUp, TrendingDown, RefreshCw, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from '@google/genai';

export default function GoldSilverWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rates, setRates] = useState<{
    goldFine: string;
    goldTejabi: string;
    silver: string;
    date: string;
    trend: 'up' | 'down' | 'neutral';
  } | null>(null);

  const fetchRates = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const prompt = `Search for the official current gold and silver prices in Nepal for today (in NPR per Tola). Check reliable sources like fenegosida.org (Federation of Nepal Gold and Silver Dealers' Association) or recent Nepali news. 
      Return ONLY a valid JSON object with this exact structure, and absolutely no markdown formatting or other text:
      {
        "goldFine": "price as string with commas",
        "goldTejabi": "price as string with commas",
        "silver": "price as string with commas",
        "date": "Today's date in Nepal",
        "trend": "up" or "down" or "neutral"
      }`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: prompt,
        config: {
          temperature: 0.1,
          tools: [{ googleSearch: {} }],
        }
      });

      const text = response.text || '';
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const data = JSON.parse(jsonMatch[0]);
        setRates(data);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("Failed to fetch gold/silver rates:", err);
      // Set to null to show error state instead of fake data
      setRates(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && !rates) {
      fetchRates();
    }
  }, [isOpen]);

  return (
    <>
      <motion.div
        className="fixed bottom-6 right-[354px] z-40 rounded-full p-[2px] bg-gradient-to-r from-yellow-400 via-amber-500 to-slate-300 hover:z-50 hidden md:block"
        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        style={{ backgroundSize: '200% 200%' }}
      >
        <button
          onClick={() => setIsOpen(true)}
          className="bg-white text-slate-800 h-14 rounded-full flex items-center justify-center hover:bg-slate-50 transition-all duration-300 group overflow-hidden px-4"
        >
          <Coins className="text-yellow-500 shrink-0" size={24} />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-[150px] group-hover:ml-3 transition-all duration-300 font-medium text-sm">
            Gold & Silver
          </span>
        </button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 sm:right-[354px] z-50 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-yellow-500 to-amber-600 p-4 text-white flex justify-between items-center">
              <h3 className="font-bold flex items-center gap-2">
                <Coins size={18} />
                Nepal Bullion Market
              </h3>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="text-sm text-slate-500 flex items-center gap-1">
                  <Sparkles size={14} className="text-amber-500" />
                  Live Rates (Per Tola)
                </div>
                <button 
                  onClick={fetchRates}
                  disabled={loading}
                  className="text-amber-600 hover:text-amber-700 p-1 rounded-md hover:bg-amber-50 transition-colors disabled:opacity-50"
                  title="Refresh Rates"
                >
                  <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
                </button>
              </div>

              {loading && !rates ? (
                <div className="py-8 text-center text-slate-400 text-sm animate-pulse flex flex-col items-center gap-2">
                  <Coins size={32} className="text-slate-300" />
                  Fetching live market rates...
                </div>
              ) : rates ? (
                <div className="space-y-4">
                  {/* Fine Gold */}
                  <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-4 rounded-xl border border-yellow-100 relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 text-yellow-500/10">
                      <Coins size={64} />
                    </div>
                    <div className="text-xs font-bold text-yellow-600 uppercase tracking-wider mb-1">Fine Gold (छापावाल)</div>
                    <div className="flex items-end gap-2">
                      <div className="text-3xl font-bold text-slate-800">रू {rates.goldFine}</div>
                    </div>
                  </div>

                  {/* Tejabi Gold */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex justify-between items-center">
                    <div className="text-sm font-medium text-slate-600">Tejabi Gold (तेजाबी)</div>
                    <div className="font-bold text-slate-800">रू {rates.goldTejabi}</div>
                  </div>

                  {/* Silver */}
                  <div className="bg-gradient-to-br from-slate-50 to-gray-100 p-4 rounded-xl border border-slate-200 relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 text-slate-400/10">
                      <Coins size={64} />
                    </div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Silver (चाँदी)</div>
                    <div className="flex items-end gap-2">
                      <div className="text-2xl font-bold text-slate-800">रू {rates.silver}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 text-xs text-slate-400">
                    <span>Date: {rates.date}</span>
                    <span className="flex items-center gap-1">
                      Trend: 
                      {rates.trend === 'up' && <TrendingUp size={14} className="text-red-500" />}
                      {rates.trend === 'down' && <TrendingDown size={14} className="text-emerald-500" />}
                      {rates.trend === 'neutral' && <span className="text-slate-500">-</span>}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-red-400 text-sm text-center py-4">Failed to load market rates</div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
