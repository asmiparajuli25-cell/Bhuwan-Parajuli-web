import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import NepaliDate from 'nepali-datetime';

export default function GlobalCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  useEffect(() => {
    // Keep today's date fresh
    const timer = setInterval(() => setCurrentDate(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  let todayNd;
  try {
    todayNd = new NepaliDate(currentDate);
  } catch (e) {
    todayNd = new NepaliDate();
  }

  // Initialize display with current Nepali month and year
  const [displayMonth, setDisplayMonth] = useState(todayNd.getMonth());
  const [displayYear, setDisplayYear] = useState(todayNd.getYear());

  const daysOfWeek = ['आइत', 'सोम', 'मंगल', 'बुध', 'बिही', 'शुक्र', 'शनि'];
  const monthNamesEn = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const getFestival = (gMonth: number, gDate: number, nMonth: number, nDate: number) => {
    // Gregorian (0-indexed)
    if (gMonth === 0 && gDate === 1) return "New Year's Day";
    if (gMonth === 4 && gDate === 1) return "Labor Day";
    if (gMonth === 11 && gDate === 25) return "Christmas";
    if (gMonth === 2 && gDate === 8) return "Women's Day";
    
    // Nepali (1-indexed)
    if (nMonth === 1 && nDate === 1) return "Nepali New Year";
    if (nMonth === 6 && nDate === 3) return "Constitution Day";
    if (nMonth === 10 && nDate === 1) return "Maghe Sankranti";
    if (nMonth === 11 && nDate === 7) return "Prajatantra Diwas";
    if (nMonth === 1 && nDate === 11) return "Loktantra Diwas";

    return null;
  };

  const getDaysInNepaliMonth = (year: number, month: number) => {
    for (let d = 32; d >= 28; d--) {
      try {
        new NepaliDate(year, month, d);
        return d;
      } catch (e) {
        // ignore
      }
    }
    return 30; // fallback
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    try {
      return new NepaliDate(year, month, 1).getDay();
    } catch (e) {
      return 0;
    }
  };

  const handlePrevMonth = () => {
    if (displayMonth === 0) {
      setDisplayMonth(11);
      setDisplayYear(displayYear - 1);
    } else {
      setDisplayMonth(displayMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (displayMonth === 11) {
      setDisplayMonth(0);
      setDisplayYear(displayYear + 1);
    } else {
      setDisplayMonth(displayMonth + 1);
    }
  };

  const resetToToday = () => {
    setDisplayMonth(todayNd.getMonth());
    setDisplayYear(todayNd.getYear());
  };

  const daysInDisplayMonth = getDaysInNepaliMonth(displayYear, displayMonth);
  const firstDay = getFirstDayOfMonth(displayYear, displayMonth);

  const getEnglishRange = () => {
    try {
      const startNd = new NepaliDate(displayYear, displayMonth, 1);
      const endNd = new NepaliDate(displayYear, displayMonth, daysInDisplayMonth);
      const startGd = startNd.getDateObject();
      const endGd = endNd.getDateObject();
      const sm = monthNamesEn[startGd.getMonth()];
      const em = monthNamesEn[endGd.getMonth()];
      const sy = startGd.getFullYear();
      const ey = endGd.getFullYear();
      
      if (sm === em) return `${sm} ${sy}`;
      if (sy !== ey) return `${sm} ${sy} - ${em} ${ey}`;
      return `${sm} - ${em} ${sy}`;
    } catch(e) {
      return '';
    }
  }

  let finalNepaliHeader = '';
  try {
     const temp = new NepaliDate(displayYear, displayMonth, 1);
     finalNepaliHeader = temp.formatNepali('MMMM, YYYY');
  } catch(e) {}

  const renderCalendarDays = () => {
    const days = [];
    
    // Empty slots for previous month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="text-center py-1 opacity-10"></div>);
    }

    // Days of the month
    for (let i = 1; i <= daysInDisplayMonth; i++) {
      const isToday = i === todayNd.getDate() && displayMonth === todayNd.getMonth() && displayYear === todayNd.getYear();
      
      let nepaliDayNum = '';
      let gMonth = 0;
      let gDate = 0;
      let isSaturday = false;
      const nMonth = displayMonth + 1;
      const nDate = i;

      try {
        const loopNd = new NepaliDate(displayYear, displayMonth, i);
        nepaliDayNum = loopNd.formatNepali('D');
        isSaturday = loopNd.getDay() === 6;
        const gd = loopNd.getDateObject();
        gMonth = gd.getMonth();
        gDate = gd.getDate();
      } catch (e) {
        // ignore
      }

      const festival = getFestival(gMonth, gDate, nMonth, nDate);
      const isHoliday = isSaturday || !!festival;

      let bgClass = 'hover:bg-slate-100 text-slate-600';
      if (isToday) {
         bgClass = isHoliday ? 'bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-sm' : 'bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-sm';
      } else if (isHoliday) {
         bgClass = 'text-red-500 hover:bg-red-50';
      }

      let subTextClass = 'text-slate-400';
      if (isToday) subTextClass = 'text-white/80';
      else if (isHoliday) subTextClass = 'text-red-400/80';

      days.push(
        <div 
          key={i} 
          title={festival || (isSaturday ? "शनिबार (Saturday)" : undefined)}
          className={`flex flex-col items-center justify-center py-1 rounded-md cursor-default transition-all h-8 sm:h-9 w-full relative group ${bgClass}`}
        >
          {nepaliDayNum && (
            <span className={`text-[13px] sm:text-[14px] leading-none ${isToday ? 'font-bold' : 'font-bold'}`}>
              {nepaliDayNum}
            </span>
          )}
          <span className={`text-[9px] leading-none mt-0.5 font-medium ${subTextClass}`}>{gDate}</span>
          {festival && !isToday && (
            <div className="absolute top-[2px] right-[2px] w-1 h-1 rounded-full bg-red-400 opacity-70"></div>
          )}
          {festival && isToday && (
            <div className="absolute top-[2px] right-[2px] w-1 h-1 rounded-full bg-white opacity-90"></div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
      className="relative bg-white/90 backdrop-blur-md rounded-2xl p-3 sm:p-4 shadow-xl border border-slate-200/60 w-64 sm:w-72 overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-100/40 to-transparent rounded-bl-full z-0 pointer-events-none pb-2"></div>
      
      {/* Header */}
      <div className="flex justify-between items-center mb-3 sm:mb-4 relative z-10">
        <button 
          onClick={resetToToday}
          className="flex items-center gap-1.5 hover:opacity-80 transition-opacity text-left"
        >
          <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 shrink-0" />
          <div className="flex flex-col leading-tight">
              {finalNepaliHeader && (
                  <span className="text-xs sm:text-sm font-bold text-slate-800">
                      {finalNepaliHeader}
                  </span>
              )}
              <span className="text-[10px] text-slate-500 font-medium">
                {getEnglishRange()}
              </span>
          </div>
        </button>
        
        <div className="flex gap-1 shrink-0">
          <button 
            onClick={handlePrevMonth}
            className="p-1.5 hover:bg-slate-100 rounded-full transition-colors active:scale-95 text-slate-500"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button 
            onClick={handleNextMonth}
            className="p-1.5 hover:bg-slate-100 rounded-full transition-colors active:scale-95 text-slate-500"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 gap-1 mb-1.5 sm:mb-2 relative z-10">
        {daysOfWeek.map((day, idx) => (
          <div key={idx} className={`text-center text-[9px] sm:text-[10px] font-bold uppercase tracking-widest ${idx === 6 ? 'text-red-500' : 'text-slate-500'}`}>
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-y-1 gap-x-1 relative z-10 min-h-[140px] sm:min-h-[160px]">
        {renderCalendarDays()}
      </div>
    </motion.div>
  );
}
