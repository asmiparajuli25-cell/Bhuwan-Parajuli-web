import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock } from 'lucide-react';
import GlobalCalendar from './GlobalCalendar';
import NepaliDate from 'nepali-datetime';

export default function SmartInfoWidget() {
  const [time, setTime] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [nepaliDateStr, setNepaliDateStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date());
      try {
        const nd = new NepaliDate();
        setNepaliDateStr(nd.formatNepali('MMMM D, YYYY'));
      } catch (e) {
        // ignore
      }
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <div className="relative flex flex-col items-end">
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
        className="bg-white/80 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-slate-200/60 w-auto min-w-[280px] overflow-hidden flex flex-col gap-3 cursor-pointer hover:bg-white transition-colors relative z-20"
        onClick={() => setShowCalendar(!showCalendar)}
      >
        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-500" />
            <div className="flex flex-col leading-tight">
              {nepaliDateStr && (
                <span className="text-xs font-bold text-red-600">
                  {nepaliDateStr}
                </span>
              )}
              <span className="text-[10px] text-slate-500 font-medium">
                {days[time.getDay()]}, {time.getDate()} {months[time.getMonth()]}
              </span>
            </div>
          </div>
          <div className="relative p-[1.5px] rounded-lg animate-gradient-x bg-gradient-to-r from-blue-600 via-blue-300 to-blue-600 shadow-sm">
            <div className="flex items-center gap-2 bg-slate-100 px-2 rounded-[6.5px] py-1 shadow-inner h-full w-full">
            <div className="relative w-[22px] h-[22px] rounded-full border-[1.5px] border-slate-700 bg-white shadow-sm flex items-center justify-center">
               {/* Center Dot */}
               <div className="absolute w-[2px] h-[2px] bg-slate-800 rounded-full z-30"></div>
               {/* Hour Hand */}
               <div 
                 className="absolute bottom-1/2 left-[calc(50%-1px)] w-[2px] h-[25%] bg-slate-800 rounded-full z-10 origin-bottom"
                 style={{ transform: `rotate(${(time.getHours() % 12) * 30 + time.getMinutes() * 0.5}deg)` }}
               />
               {/* Minute Hand */}
               <div 
                 className="absolute bottom-1/2 left-[calc(50%-0.75px)] w-[1.5px] h-[35%] bg-slate-600 rounded-full z-20 origin-bottom"
                 style={{ transform: `rotate(${time.getMinutes() * 6 + time.getSeconds() * 0.1}deg)` }}
               />
               {/* Second Hand */}
               <div 
                 className="absolute bottom-1/2 left-[calc(50%-0.5px)] w-[1px] h-[45%] bg-red-500 z-30 origin-bottom"
                 style={{ transform: `rotate(${time.getSeconds() * 6}deg)` }}
               />
            </div>
            <span className="text-sm font-bold font-mono text-slate-800 tracking-tight">
              {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showCalendar && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 z-10"
          >
            <GlobalCalendar />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

