import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, Copy, CheckCircle2, Quote as QuoteIcon, Filter } from 'lucide-react';
import { quotes, QuoteCategory } from '../data/quotes';

interface QuotesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuotesModal({ isOpen, onClose }: QuotesModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<QuoteCategory | 'All'>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories: (QuoteCategory | 'All')[] = ['All', 'Motivation', 'Life', 'Success', 'Love', 'Wisdom'];

  const filteredQuotes = useMemo(() => {
    return quotes.filter(q => {
      const matchesSearch = q.textEn.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            q.textNe.includes(searchTerm) || 
                            q.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || q.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const handleCopy = (quote: typeof quotes[0]) => {
    const textToCopy = `"${quote.textEn}"\n"${quote.textNe}"\n— ${quote.author}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(quote.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-100"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                <QuoteIcon size={20} />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800">BiNTec Quotes</h2>
                <p className="text-sm text-slate-500">Find inspiration, copy, and share.</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Controls */}
          <div className="p-6 border-b border-slate-100 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text"
                placeholder="Search quotes by keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar shrink-0">
              <Filter className="text-slate-400 mr-2 shrink-0" size={18} />
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === cat 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Quotes List */}
          <div className="flex-grow overflow-y-auto p-6 bg-slate-50 custom-scrollbar">
            {filteredQuotes.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-400">
                <QuoteIcon size={48} className="mb-4 opacity-20" />
                <p className="text-lg font-medium text-slate-600">No quotes found</p>
                <p className="text-sm">Try adjusting your search or category filter.</p>
              </div>
            ) : (
              <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {filteredQuotes.map((quote) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key={quote.id}
                    className="break-inside-avoid bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-50 to-transparent -mr-12 -mt-12 rounded-full z-0 opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
                    <QuoteIcon className="text-blue-100 w-8 h-8 absolute top-4 left-4 z-0" />
                    
                    <div className="relative z-10 flex-grow mt-2">
                       <p className="text-slate-800 font-medium text-lg leading-snug mb-3">"{quote.textEn}"</p>
                       <p className="text-slate-600 text-[15px] font-nepali leading-relaxed mb-4 pb-4 border-b border-slate-100">"{quote.textNe}"</p>
                    </div>
                    
                    <div className="relative z-10 flex items-center justify-between mt-auto pt-2">
                      <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">— {quote.author}</span>
                      <button 
                        onClick={() => handleCopy(quote)}
                        className={`p-2 rounded-lg transition-colors ${
                          copiedId === quote.id ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400 hover:text-blue-600 hover:bg-blue-50'
                        }`}
                        title="Copy to clipboard"
                      >
                        {copiedId === quote.id ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                      </button>
                    </div>
                    
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full px-2 py-0.5 bg-slate-100 text-[10px] font-medium text-slate-400">
                       {quote.category}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
          
          {/* Footer stats */}
          <div className="p-4 border-t border-slate-100 bg-white text-center text-sm font-medium text-slate-500">
             Showing {filteredQuotes.length} of {quotes.length} quotes
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
