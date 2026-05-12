import React, { useState } from 'react';
import { Calculator, X, Delete } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ScientificCalculatorWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ScientificCalculatorWidget({ isOpen, onClose }: ScientificCalculatorWidgetProps) {
  const [display, setDisplay] = useState('');
  const [hasError, setHasError] = useState(false);

  const handlePress = (val: string) => {
    if (hasError) {
      setDisplay(val);
      setHasError(false);
      return;
    }
    setDisplay((prev) => prev + val);
  };

  const handleClear = () => {
    setDisplay('');
    setHasError(false);
  };

  const handleDelete = () => {
    if (hasError) {
      handleClear();
      return;
    }
    setDisplay((prev) => prev.slice(0, -1));
  };

  const handleCalculate = () => {
    try {
      if (!display) return;
      
      // Replace symbols with JavaScript Math equivalents
      let expr = display
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π/g, 'Math.PI')
        .replace(/e/g, 'Math.E')
        .replace(/%/g, '/100')
        .replace(/sin\(/g, 'Math.sin(')
        .replace(/cos\(/g, 'Math.cos(')
        .replace(/tan\(/g, 'Math.tan(')
        .replace(/log\(/g, 'Math.log10(')
        .replace(/ln\(/g, 'Math.log(')
        .replace(/√\(/g, 'Math.sqrt(')
        .replace(/\^/g, '**');

      // Safe evaluation using Function
      // eslint-disable-next-line no-new-func
      const result = new Function('return ' + expr)();
      
      if (!isFinite(result) || isNaN(result)) {
        throw new Error('Invalid calculation');
      }

      // Format to avoid long decimals
      const formattedResult = Number.isInteger(result) 
        ? result.toString() 
        : parseFloat(result.toFixed(8)).toString();

      setDisplay(formattedResult);
    } catch (error) {
      setDisplay('Error');
      setHasError(true);
    }
  };

  const buttons = [
    ['sin(', 'cos(', 'tan(', 'AC', 'DEL'],
    ['log(', 'ln(', '(', ')', '÷'],
    ['√(', '7', '8', '9', '×'],
    ['^', '4', '5', '6', '-'],
    ['π', '1', '2', '3', '+'],
    ['%', '0', '.', '=', '=']
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: 20, scale: 0.9, filter: 'blur(10px)' }}
          className="fixed bottom-24 right-4 sm:right-6 z-50 w-[260px] bg-[#323232] rounded-3xl shadow-[0_8px_32px_rgba(255,219,0,0.15)] border border-[#FFDB00]/20 overflow-hidden"
        >
          <div className="px-4 py-3 flex justify-between items-center select-none border-b border-[#FFDB00]/10 bg-[#323232]">
            <h3 className="font-medium flex items-center gap-2 text-[#FFDB00] text-xs tracking-wider uppercase">
              <Calculator size={14} className="text-[#FFDB00]" />
              Calculator
            </h3>
            <button onClick={onClose} className="text-[#FFDB00]/60 hover:text-[#FFDB00] transition-colors p-1 rounded-full hover:bg-[#FFDB00]/10">
              <X size={14} />
            </button>
          </div>
            
          <div className="p-3">
            {/* Display */}
            <div className="relative mb-3 rounded-2xl overflow-hidden p-[2px]">
              {/* Animated Gradient Border */}
              <div
                className="absolute inset-0 z-0 bg-gradient-to-r from-[#FF1493] via-[#00BFFF] to-[#FFD700] animate-gradient-x"
                style={{ backgroundSize: '200% 200%' }}
              />
              
              <div className="bg-[#4169E1] rounded-[14px] px-3 h-12 flex items-center justify-between overflow-hidden relative shadow-inner z-10 w-full">
                <div className="text-[9px] text-[#87CEEB]/70 font-mono tracking-widest uppercase mt-1 select-none">DEG</div>
                <div className={`text-2xl font-light tracking-wide whitespace-nowrap overflow-x-auto text-right ${hasError ? 'text-rose-400' : 'text-[#87CEEB]'}`}>
                  {display || '0'}
                </div>
              </div>
            </div>

            {/* Keypad */}
            <div className="grid grid-cols-5 gap-1.5">
              {buttons.map((row, rowIndex) => (
                <React.Fragment key={rowIndex}>
                  {row.map((btn, colIndex) => {
                    // Skip the second '=' to make the first one span 2 columns
                    if (rowIndex === 5 && colIndex === 4) return null;
                    
                    const isOperator = ['÷', '×', '-', '+', '='].includes(btn);
                    const isAction = ['AC', 'DEL'].includes(btn);
                    const isScientific = ['sin(', 'cos(', 'tan(', 'log(', 'ln(', '√(', '^', 'π', '%', '(', ')'].includes(btn);
                    
                    let btnClass = "h-9 rounded-xl font-medium text-[13px] flex items-center justify-center transition-colors border outline-none select-none ";
                    
                    if (isAction) {
                      btnClass += "bg-[#FFDB00]/20 text-[#FFDB00] border-[#FFDB00]/20";
                    } else if (isOperator) {
                      btnClass += "bg-[#FFDB00] text-[#323232] border-[#FFDB00] shadow-md shadow-[#FFDB00]/20 font-bold";
                    } else if (isScientific) {
                      btnClass += "bg-[#2A2A2A] text-white/50 border-white/5";
                    } else {
                      btnClass += "bg-[#404040] text-white/90 border-[#FFDB00]/5";
                    }

                    if (btn === '=') {
                      btnClass += " col-span-2";
                    }

                    return (
                      <motion.button
                        key={colIndex}
                        whileTap={{ scale: 0.85 }}
                        onClick={() => {
                          // Provide haptic feedback if browser supports it
                          if (navigator.vibrate) navigator.vibrate(5);
                          
                          if (btn === 'AC') handleClear();
                          else if (btn === 'DEL') handleDelete();
                          else if (btn === '=') handleCalculate();
                          else handlePress(btn);
                        }}
                        className={btnClass}
                      >
                        {btn === 'DEL' ? <Delete size={14} /> : btn.replace('(', '')}
                      </motion.button>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
