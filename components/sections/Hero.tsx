'use client';

import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { siteConfig } from '@/data/site';

const socials = siteConfig.socials;

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 container-narrow flex flex-col items-center text-center gap-8"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="badge badge-accent mb-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Available for work
        </motion.span>

        {/* Heading */}
        <div className="flex flex-col gap-4">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none text-white uppercase">
            {siteConfig.name}
          </h1>
          <p className="text-xl md:text-2xl font-light text-neutral-400 tracking-tight">
            {siteConfig.tagline}
          </p>
        </div>

        {/* Tagline */}
        <p className="max-w-xl text-sm md:text-base leading-relaxed text-neutral-400">
          {siteConfig.bio}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-4 justify-center mt-4">
          <a
            href="#projects"
            className="px-8 py-3.5 rounded-full font-mono uppercase tracking-wider text-sm font-bold bg-white text-black transition-transform hover:scale-105"
          >
            View my work
          </a>
          <a
            href="#contact"
            className="px-8 py-3.5 rounded-full font-mono uppercase tracking-wider text-sm font-bold border border-white/20 text-white transition-all hover:bg-white/10"
          >
            Get in touch
          </a>
        </div>

        {/* Socials */}
        <div className="flex items-center gap-4 mt-4">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="p-3 bg-white/5 rounded-full border border-white/10 transition-colors hover:bg-white hover:text-black hover:border-white text-neutral-400"
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-500"
      >
        <span className="text-[10px] font-mono uppercase tracking-widest">scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
