import React, { useState, useEffect, useRef } from 'react';

interface ScrambleTextProps {
  text: string;
  className?: string;
  delay?: number;
  revealSpeed?: number; // ms per character fix
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&!?<>";

const ScrambleText: React.FC<ScrambleTextProps> = ({ 
  text, 
  className = "", 
  delay = 0,
  revealSpeed = 50 
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setStarted(true);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    let iteration = 0;
    
    intervalRef.current = window.setInterval(() => {
      setDisplayedText(prev => {
        return text
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("");
      });

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
      
      iteration += 1 / 3; // Slow down the reveal index increment
    }, revealSpeed);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [started, text, revealSpeed]);

  return <span className={className}>{displayedText}</span>;
};

export default ScrambleText;