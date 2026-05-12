import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export default function AnalogClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  // Subtracting 90 degrees to make 0 degrees point to 12 o'clock
  const secondDegrees = (seconds * 6) - 90;
  const minuteDegrees = (minutes * 6) + (seconds * 0.1) - 90;
  const hourDegrees = ((hours % 12) * 30) + (minutes * 0.5) - 90;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
      className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-slate-800 bg-white drop-shadow-xl flex items-center justify-center p-2"
    >
      <div className="absolute inset-0 rounded-full bg-white shadow-inner pointer-events-none"></div>

      {/* Clock Face Markers */}
      {[...Array(12)].map((_, i) => (
        <div 
          key={i} 
          className="absolute inset-0 flex justify-center py-2"
          style={{ transform: `rotate(${i * 30}deg)` }}
        >
          <div className={`w-1 rounded-full ${i % 3 === 0 ? 'h-3 bg-slate-800' : 'h-1.5 bg-slate-400'}`}></div>
        </div>
      ))}

      {/* Center Dot */}
      <div className="absolute w-3 h-3 bg-slate-800 rounded-full z-30 shadow-sm top-1/2 left-1/2 -ml-1.5 -mt-1.5"></div>
      
      {/* Hour Hand */}
      <div 
        className="absolute top-1/2 left-1/2 h-1.5 sm:h-2 w-[25%] sm:w-[30%] bg-slate-800 rounded-full z-10 origin-[0%_50%] transition-transform duration-200"
        style={{ transform: `translateY(-50%) rotate(${hourDegrees}deg)` }}
      />

      {/* Minute Hand */}
      <div 
        className="absolute top-1/2 left-1/2 h-1 sm:h-1.5 w-[35%] sm:w-[40%] bg-slate-600 rounded-full z-20 origin-[0%_50%] transition-transform duration-200"
        style={{ transform: `translateY(-50%) rotate(${minuteDegrees}deg)` }}
      />

      {/* Second Hand */}
      <div 
        className="absolute top-1/2 left-1/2 h-[2px] w-[40%] sm:w-[45%] bg-red-500 z-30 origin-[0%_50%] transition-transform duration-100 ease-linear"
        style={{ transform: `translateY(-50%) rotate(${secondDegrees}deg)` }}
      />
      
      {/* Glass overlay */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/40 to-transparent pointer-events-none"></div>
    </motion.div>
  );
}
