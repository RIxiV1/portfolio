'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion';
import Image from 'next/image';
import { Menu, X, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import ScrollProgress from '@/components/ui/ScrollProgress';
import { siteConfig } from '@/data/site';

const navLinks = siteConfig.navLinks;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const next = latest > 20;
    setScrolled((prev) => (prev === next ? prev : next));
  });

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      className="fixed top-0 left-0 w-full z-50 flex justify-center py-6 pointer-events-none"
    >
      <div
        className={cn(
          'pointer-events-auto flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]',
          scrolled
            ? 'glass-card px-4 py-2 w-[95%] max-w-4xl rounded-3xl'
            : 'w-full container-narrow px-6 py-0 rounded-none border-transparent bg-transparent shadow-none',
        )}
      >
        {/* Logo */}
        <a href="#hero" aria-label="Back to top" className="flex items-center gap-2.5 group pl-1">
          <div className="relative w-8 h-8 overflow-hidden rounded-xl border border-white/10 group-hover:border-white/30 transition-all duration-300">
            <Image
              src="/logo.png"
              alt="Logo"
              fill
              priority
              sizes="32px"
              className="object-contain p-1.5 bg-black/40 group-hover:scale-110 transition-transform duration-500"
            />
            {/* Live indicator pulse */}
            <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          </div>
          <span className="hidden sm:block font-bold tracking-tight text-white/90 group-hover:text-white transition-colors">
            {siteConfig.name.toLowerCase()}
          </span>
        </a>

        {/* Desktop Nav - Floating Pill */}
        <nav className="hidden md:flex items-center gap-1 p-1 bg-white/5 border border-white/5 rounded-2xl relative">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={cn(
                'relative px-4 py-1.5 text-sm font-medium transition-all duration-300',
                hoveredLink === link.name
                  ? 'text-white'
                  : 'text-neutral-400 hover:text-neutral-200',
              )}
              onPointerEnter={(e) => {
                if (e.pointerType === 'mouse') setHoveredLink(link.name);
              }}
              onPointerLeave={(e) => {
                if (e.pointerType === 'mouse') setHoveredLink(null);
              }}
            >
              {/* Background Pill Indicator */}
              {hoveredLink === link.name && (
                <motion.div
                  layoutId="nav-pill"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  className="absolute inset-0 bg-white/10 rounded-xl -z-10"
                />
              )}
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-2 pr-1">
          <a
            href={`mailto:${siteConfig.email}`}
            className={cn(
              'hidden sm:flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition-all duration-300',
              scrolled
                ? 'bg-white text-black hover:bg-neutral-200'
                : 'bg-white/10 text-white border border-white/10 hover:bg-white/20',
            )}
          >
            <Mail className="w-3.5 h-3.5" />
            Get in touch
          </a>

          <button
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="p-2.5 bg-white/5 border border-white/10 rounded-2xl md:hidden text-white hover:bg-white/10 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <ScrollProgress />
      </div>

      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[85px] left-[2.5%] right-[2.5%] md:hidden glass-card p-6 rounded-3xl z-[-1]"
          >
            <div className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-2xl font-bold tracking-tight text-neutral-400 hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="h-px bg-white/10 my-2" />
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-3 text-lg font-medium text-emerald-400"
              >
                <Mail className="w-5 h-5" />
                {siteConfig.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
