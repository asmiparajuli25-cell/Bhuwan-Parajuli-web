import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export default function DigitalClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');
  const ampm = time.getHours() >= 12 ? 'PM' : 'AM';
  const day = time.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
  const date = time.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase();

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
      className="relative rounded-2xl p-[3px] overflow-hidden drop-shadow-lg"
    >
      {/* Animated Border Background */}
      <div 
        className="absolute w-[200%] h-[200%] -left-1/2 -top-1/2 animate-spin z-0 pointer-events-none opacity-80"
        style={{ 
           animationDuration: '4s',
           backgroundImage: 'conic-gradient(transparent, transparent, transparent, #22d3ee, #c026d3, #22d3ee)'
        }}
      />
      
      {/* Fallback border for absolute clarity */}
      <div className="absolute inset-0 bg-slate-800 rounded-2xl z-0 m-[1px]"></div>

      {/* Clock Face */}
      <div className="bg-slate-900/95 backdrop-blur-xl rounded-[14px] p-2.5 sm:p-3 relative z-10 flex flex-col items-center justify-center text-white min-w-[100px] sm:min-w-[120px]">
        <div className="text-[10px] sm:text-xs font-semibold tracking-wider text-fuchsia-400 mb-0.5">
          {day} • {date}
        </div>
        <div className="flex items-baseline gap-0.5">
          <span className="text-2xl sm:text-3xl font-mono font-bold tracking-tighter bg-gradient-to-br from-white via-slate-100 to-cyan-200 bg-clip-text text-transparent">
            {hours}:{minutes}
          </span>
          <div className="flex flex-col items-start ml-1">
            <span className="text-[10px] sm:text-xs font-mono font-bold text-slate-400 tabular-nums leading-none">
              {seconds}
            </span>
            <span className="text-[8px] sm:text-[9px] font-bold text-cyan-400 mt-0.5 leading-none">
              {ampm}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
