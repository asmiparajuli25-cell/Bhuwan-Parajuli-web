import React, { useState, useEffect } from 'react';
import { Coins, X, ArrowRightLeft, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CurrencyConverterWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CurrencyConverterWidget({ isOpen, onClose }: CurrencyConverterWidgetProps) {
  const [rates, setRates] = useState<Record<string, number>>({});
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [amount, setAmount] = useState<number | string>(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('NPR');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && currencies.length === 0) {
      fetchRates();
    }
  }, [isOpen]);

  const fetchRates = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://open.er-api.com/v6/latest/USD');
      const data = await res.json();
      if (data.result === 'success') {
        setRates(data.rates);
        setCurrencies(Object.keys(data.rates));
      }
    } catch (error) {
      console.error("Failed to fetch exchange rates", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const convertedAmount = () => {
    if (!rates[fromCurrency] || !rates[toCurrency] || !amount) return 0;
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    if (isNaN(numAmount)) return 0;
    
    // Convert to USD first (base), then to target currency
    const inUSD = numAmount / rates[fromCurrency];
    return (inUSD * rates[toCurrency]).toFixed(2);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-80 bg-white/95 backdrop-blur-xl rounded-[24px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-white/40 overflow-hidden flex flex-col max-h-[75dvh]"
        >
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-4 text-white flex justify-between items-center shadow-sm relative z-10 shrink-0">
            <h3 className="font-bold flex items-center gap-2 text-[15px]">
              <Coins size={16} className="text-white/90" />
              Currency Converter
            </h3>
            <button onClick={onClose} className="text-white/80 hover:text-white transition-all p-1.5 rounded-full hover:bg-white/20 active:scale-95">
              <X size={18} />
            </button>
          </div>
            
            <div className="p-5 space-y-5 overflow-y-auto bg-slate-50/50">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-8 text-slate-500">
                  <Loader2 className="animate-spin mb-2" size={32} />
                  <p>Loading exchange rates...</p>
                </div>
              ) : (
                <>
                  {/* Amount Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-600">Amount</label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-colors text-lg font-medium"
                      placeholder="Enter amount"
                      min="0"
                    />
                  </div>

                  {/* Currency Selectors */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 space-y-2">
                      <label className="text-sm font-medium text-slate-600">From</label>
                      <select
                        value={fromCurrency}
                        onChange={(e) => setFromCurrency(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-slate-800 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-colors font-medium"
                      >
                        {currencies.map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <button 
                      onClick={handleSwap}
                      className="mt-6 p-3 bg-slate-100 text-slate-600 rounded-full hover:bg-slate-200 transition-colors"
                      title="Swap currencies"
                    >
                      <ArrowRightLeft size={18} />
                    </button>

                    <div className="flex-1 space-y-2">
                      <label className="text-sm font-medium text-slate-600">To</label>
                      <select
                        value={toCurrency}
                        onChange={(e) => setToCurrency(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-slate-800 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-colors font-medium"
                      >
                        {currencies.map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Result */}
                  <div className="pt-4 border-t border-slate-100 text-center">
                    <p className="text-sm text-slate-500 mb-1">
                      {amount || 0} {fromCurrency} =
                    </p>
                    <div className="text-4xl font-bold text-slate-800 break-all">
                      {convertedAmount()} <span className="text-2xl text-slate-500">{toCurrency}</span>
                    </div>
                    {rates[fromCurrency] && rates[toCurrency] && (
                      <p className="text-xs text-slate-400 mt-3">
                        1 {fromCurrency} = {(rates[toCurrency] / rates[fromCurrency]).toFixed(4)} {toCurrency}
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
