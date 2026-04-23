'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/data/site';

export default function Loader() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('seenIntro') === '1') return;
    setLoading(true);
    sessionStorage.setItem('seenIntro', '1');
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
        >
          {/* Grid background on loader */}
          <div className="absolute inset-0 grid-bg opacity-[0.03]" />

          <div className="flex flex-col items-center gap-6">
            {/* Animated name reveal */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.05 }}
              className="text-4xl md:text-6xl font-bold tracking-tighter text-white uppercase"
            >
              {siteConfig.name}<span className="text-neutral-600">.</span>
            </motion.h1>

            {/* Loading bar */}
            <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="h-full bg-white rounded-full"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
