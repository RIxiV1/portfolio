'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function AuroraBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reducedMotion) return;

    let raf = 0;
    let nextX = 0;
    let nextY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      nextX = (e.clientX / window.innerWidth) * 2 - 1;
      nextY = (e.clientY / window.innerHeight) * 2 - 1;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (containerRef.current) {
          containerRef.current.style.transform = `translate(${nextX * 10}px, ${nextY * 10}px)`;
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-black"
    >
      {/* Background Grid - preserved from original */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      <div
        ref={containerRef}
        className="absolute inset-0 opacity-40 transition-transform duration-1000 ease-out"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.7, 0.4],
            x: ['-10%', '10%', '-10%'],
            y: ['-10%', '10%', '-10%'],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-emerald-500/20 blur-[120px]"
        />

        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
            x: ['10%', '-10%', '10%'],
            y: ['10%', '-10%', '10%'],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-[30%] -right-[20%] w-[60%] h-[60%] rounded-full bg-blue-500/20 blur-[150px]"
        />

        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
            x: ['0%', '15%', '0%'],
            y: ['20%', '-5%', '20%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -bottom-[10%] left-[20%] w-[50%] h-[50%] rounded-full bg-purple-500/20 blur-[120px]"
        />
      </div>
    </div>
  );
}
