import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Languages, ArrowRight, Loader2, Copy, CheckCircle2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface TranslatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const COMMON_LANGUAGES = [
  'Auto Detect', 'English', 'Spanish', 'French', 'German', 'Chinese (Simplified)',
  'Japanese', 'Korean', 'Hindi', 'Arabic', 'Russian', 'Portuguese', 'Italian', 'Nepali'
];

export default function TranslatorModal({ isOpen, onClose }: TranslatorModalProps) {
  const [sourceLang, setSourceLang] = useState('Auto Detect');
  const [targetLang, setTargetLang] = useState('English');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    
    setIsTranslating(true);
    setOutputText('');
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const prompt = `Translate the following text to ${targetLang}. 
      ${sourceLang !== 'Auto Detect' ? `The source language is ${sourceLang}.` : 'Automatically detect the source language.'}
      Only return the translated text without any conversational filler or quotes.
      
      Text to translate:
      ${inputText}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      setOutputText(response.text?.trim() || 'Failed to translate.');
    } catch (error) {
      console.error('Translation error:', error);
      setOutputText('An error occurred during translation. Please check the API key or try again.');
    } finally {
      setIsTranslating(false);
    }
  };

  const copyToClipboard = () => {
    if (outputText) {
      navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] flex flex-col overflow-hidden w-full max-w-4xl text-slate-800"
        style={{ maxHeight: '85vh' }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 p-4 sm:p-5 flex justify-between items-center text-white shrink-0 border-b border-indigo-500/30">
          <div className="flex items-center gap-3">
            <div className="bg-white/10 backdrop-blur-sm p-2 rounded-xl border border-white/20 shadow-sm">
              <Languages size={22} className="text-white drop-shadow-md" />
            </div>
            <div>
              <h3 className="font-bold text-lg tracking-wide text-white drop-shadow-sm">Universal Translator</h3>
              <p className="text-xs font-medium text-indigo-100/90 tracking-wide uppercase">AI-powered language bridge</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/20 hover:scale-105 active:scale-95 rounded-full transition-all"
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex flex-col md:flex-row bg-slate-50 relative">
          
          {/* Input Area */}
          <div className="flex-1 flex flex-col p-4 sm:p-6 border-b md:border-b-0 md:border-r border-slate-200/80 bg-white shadow-[inset_-10px_0_20px_-15px_rgba(0,0,0,0.05)]">
            <div className="mb-3">
              <label className="block text-[11px] uppercase tracking-widest font-bold text-slate-500 mb-2">Translate From</label>
              <select 
                value={sourceLang}
                onChange={(e) => setSourceLang(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 outline-none transition-all shadow-sm"
              >
                {COMMON_LANGUAGES.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
                <option disabled>──────</option>
                <option value="Any other language">Any other language (AI Detect)</option>
              </select>
            </div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter text to translate..."
              className="w-full min-h-[140px] md:min-h-[200px] bg-white border border-slate-200 rounded-2xl p-4 resize-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 outline-none text-slate-700 text-[15px] leading-relaxed placeholder:text-slate-400 shadow-sm transition-all"
            />
          </div>

          {/* Center visual indicator (Desktop) */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white border border-indigo-100 rounded-full items-center justify-center shadow-lg text-indigo-500">
            <ArrowRight size={18} />
          </div>

          {/* Output Area */}
          <div className="flex-1 flex flex-col p-4 sm:p-6 bg-slate-50 md:bg-transparent">
            <div className="mb-3 flex justify-between items-end">
              <div className="flex-1">
                <label className="block text-[11px] uppercase tracking-widest font-bold text-slate-500 mb-2">Translate To</label>
                <select 
                  value={targetLang}
                  onChange={(e) => setTargetLang(e.target.value)}
                  className="w-full bg-indigo-50/50 border border-indigo-100 text-indigo-900 rounded-xl p-2.5 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 outline-none transition-all shadow-sm"
                >
                  {COMMON_LANGUAGES.filter(l => l !== 'Auto Detect').map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                  <option disabled>──────</option>
                  <option value="Latin">Latin</option>
                  <option value="Esperanto">Esperanto</option>
                  <option value="Any language">Other (Type below)</option>
                </select>
              </div>
            </div>
            
            {targetLang === 'Any language' && (
              <input 
                type="text" 
                placeholder="Type target language name..."
                onChange={(e) => setTargetLang(e.target.value)}
                className="mb-3 w-full bg-white border border-slate-200 rounded-xl p-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-sm"
              />
            )}

            <div className="relative flex-1 flex flex-col">
              <textarea
                readOnly
                value={outputText}
                placeholder="Translation will appear here instantly..."
                className="w-full min-h-[140px] md:min-h-[200px] h-full bg-gradient-to-br from-indigo-50/50 to-purple-50/30 border border-indigo-100 rounded-2xl p-4 resize-none outline-none text-slate-800 text-[15px] leading-relaxed shadow-sm transition-all"
              />
              
              {outputText && (
                <button 
                  onClick={copyToClipboard}
                  className="absolute bottom-3 right-3 p-2 bg-white rounded-xl shadow-md border border-indigo-50 text-indigo-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all hover:scale-105 active:scale-95"
                  title="Copy to clipboard"
                >
                  {copied ? <CheckCircle2 size={18} className="text-emerald-500" /> : <Copy size={18} />}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-white border-t border-slate-100 shrink-0 flex justify-end items-center shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.02)]">
          <button 
            onClick={handleTranslate}
            disabled={isTranslating || !inputText.trim()}
            className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 hover:from-indigo-500 hover:via-purple-500 hover:to-violet-500 text-white font-bold py-2.5 px-8 rounded-xl shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-indigo-600/40 active:scale-[0.98]"
          >
            {isTranslating ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Translating...
              </>
            ) : (
              <>
                <Languages size={18} />
                Translate text
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
