'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Click {
  id: number;
  x: number;
  y: number;
}

export default function ClickEffect() {
  const [clicks, setClicks] = useState<Click[]>([]);
  const timersRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    const timers = timersRef.current;

    const handleClick = (e: MouseEvent) => {
      const newClick = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      };
      setClicks((prev) => [...prev, newClick]);

      const id = window.setTimeout(() => {
        timers.delete(id);
        setClicks((prev) => prev.filter((c) => c.id !== newClick.id));
      }, 1000);
      timers.add(id);
    };

    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
      timers.forEach((id) => clearTimeout(id));
      timers.clear();
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[90]">
      <AnimatePresence>
        {clicks.map((click) => (
          <div key={click.id} style={{ position: 'fixed', left: click.x, top: click.y }}>
            
            {/* 1. Core Flash (Emerald Glow) */}
            <motion.div
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: 2.5, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-emerald-500/30 blur-md"
            />

            {/* 2. Primary Fast Ring */}
            <motion.div
              initial={{ scale: 0, opacity: 0.6 }}
              animate={{ scale: 4, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} 
              className="absolute -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/40"
            />

            {/* 3. Tech Dashed Ring */}
            <motion.div
              initial={{ scale: 0.2, opacity: 0.4, rotate: 0 }}
              animate={{ scale: 5.5, opacity: 0, rotate: 45 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-dashed border-emerald-400/50"
            />

            {/* 4. Outer Subtle Shockwave */}
            <motion.div
              initial={{ scale: 1, opacity: 0.2 }}
              animate={{ scale: 12, opacity: 0 }}
              transition={{ duration: 1, ease: "circOut" }}
              className="absolute -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-white/5"
            />

            {/* 5. Center Point (Precise dot) */}
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: [1.5, 0], opacity: [1, 0] }}
              transition={{ duration: 0.5, times: [0, 1] }}
              className="absolute -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full shadow-[0_0_10px_white]"
            />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
