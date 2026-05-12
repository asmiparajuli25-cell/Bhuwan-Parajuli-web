import React from 'react';
import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';

export default function NepalMapGPS() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.4, delay: 0.2 }}
      className="relative bg-white/80 backdrop-blur-md border border-slate-200/50 rounded-2xl p-3 shadow-lg flex flex-col items-center justify-center overflow-hidden group"
    >
      {/* Title */}
      <div className="flex items-center gap-1.5 mb-2 relative z-10 w-full justify-between">
        <span className="text-[9px] sm:text-[10px] font-semibold tracking-widest text-[#006989] uppercase">Nepal</span>
        <div className="flex items-center gap-1 bg-rose-50 px-1.5 py-0.5 rounded-full border border-rose-100">
           <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
           <span className="text-[8px] font-medium text-rose-600">GPS ACTIVE</span>
        </div>
      </div>

      {/* Map SVG Container */}
      <div className="relative w-24 h-14 sm:w-28 sm:h-16 flex items-center justify-center p-1">
        {/* Simplified outline of Nepal for aesthetic purposes */}
        <svg viewBox="0 0 100 50" className="w-full h-full drop-shadow-sm opacity-80" preserveAspectRatio="xMidYMid meet">
          <path 
            d="M5,25 Q15,10 30,15 T50,20 T70,18 Q85,15 90,25 Q95,30 85,40 T60,45 T30,42 T10,35 Q5,30 5,25 Z" 
            fill="url(#nepal-gradient)" 
            stroke="#006989" 
            strokeWidth="1"
            className="transition-all duration-500 group-hover:fill-blue-100/50"
          />
          <defs>
            <linearGradient id="nepal-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e0f2fe" />
              <stop offset="100%" stopColor="#d1fae5" />
            </linearGradient>
          </defs>
        </svg>

        {/* GPS Dot (Kathmandu roughly) */}
        <div className="absolute top-[45%] left-[55%]">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [1, 2.5, 1], opacity: [0.8, 0, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-rose-400 rounded-full"
          />
          <MapPin className="relative z-10 w-3 h-3 text-rose-600 -mt-1.5 -ml-1.5 drop-shadow-sm" />
        </div>
      </div>

      {/* Coordinates */}
      <div className="mt-1.5 flex flex-col items-center relative z-10">
        <span className="text-[8px] sm:text-[9px] font-mono font-medium text-slate-500">27.7172° N, 85.3240° E</span>
        <span className="text-[7px] sm:text-[8px] font-medium text-slate-400 mt-0.5">KATHMANDU, NP</span>
      </div>
    </motion.div>
  );
}
