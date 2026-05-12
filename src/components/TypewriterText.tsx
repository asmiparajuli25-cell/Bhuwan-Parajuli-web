import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'motion/react';

interface TypewriterTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

export default function TypewriterText({ text, className = "", delay = 0, speed = 10 }: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView && !hasStarted) {
      if (delay > 0) {
        const timer = setTimeout(() => setHasStarted(true), delay);
        return () => clearTimeout(timer);
      } else {
        setHasStarted(true);
      }
    }
  }, [isInView, delay, hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let timeoutId: NodeJS.Timeout;

    if (currentIndex < text.length) {
      timeoutId = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);
    }

    return () => clearTimeout(timeoutId);
  }, [currentIndex, hasStarted, speed, text]);

  return (
    <p ref={ref} className={className}>
      {hasStarted ? displayedText : ""}
      <span 
        className="animate-pulse border-r-2 border-currentColor ml-1" 
        style={{ opacity: currentIndex < text.length ? 1 : 0 }}
      ></span>
    </p>
  );
}
