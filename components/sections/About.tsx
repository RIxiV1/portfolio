'use client';

import { MapPin, Code2, Coffee, Rocket } from 'lucide-react';
import { useScrollReveal, useStaggerReveal } from '@/lib/useScrollReveal';
import { siteConfig } from '@/data/site';

const focusAreas = ['Full-stack web apps', 'AI tooling & automation', 'Chrome extensions'];

export default function About() {
  const headerRef = useScrollReveal();
  const gridRef = useStaggerReveal<HTMLDivElement>({ staggerMs: 100 });

  return (
    <section id="about" className="section-padding container-narrow">
      {/* Section header */}
      <div ref={headerRef} className="reveal-up flex flex-col mb-10">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500 mb-3">
          About
        </span>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
          A bit about me.
        </h2>
      </div>

      {/* Bento grid */}
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-6 gap-4">
        {/* Main bio */}
        <div
          data-reveal
          className="md:col-span-4 card p-6 md:p-8"
        >
          <div className="flex items-center gap-2 mb-5 text-neutral-300">
            <Code2 className="w-4 h-4" />
            <span className="font-mono text-[10px] uppercase tracking-widest">Who I am</span>
          </div>
          <p className="text-xl md:text-2xl leading-relaxed font-light mb-5 text-white">
            CS student & developer. Based in {siteConfig.location}. I like to{' '}
            <span className="font-medium">build and break stuff</span>.
          </p>
          <p className="text-sm leading-relaxed text-neutral-400">
            {siteConfig.bio}
          </p>
        </div>

        {/* Location */}
        <div
          data-reveal
          className="md:col-span-2 card p-6 flex flex-col justify-between gap-4"
        >
          <div className="flex items-center gap-2 text-neutral-300">
            <MapPin className="w-4 h-4" />
            <span className="font-mono text-[10px] uppercase tracking-widest">Location</span>
          </div>
          <div>
            <p className="text-2xl font-bold mb-1 text-white">{siteConfig.location}</p>
            <p className="text-sm text-neutral-400">Working remotely. Available worldwide.</p>
          </div>
        </div>

        {/* Open to work */}
        <div
          data-reveal
          className="md:col-span-2 card p-6 flex flex-col items-center justify-center text-center gap-3"
        >
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-400">
              Open to work
            </span>
          </div>
          <div className="text-5xl font-bold text-white">4</div>
          <p className="font-mono text-xs uppercase tracking-widest text-neutral-500">
            public projects
          </p>
        </div>

        {/* Focus */}
        <div
          data-reveal
          className="md:col-span-2 card p-6"
        >
          <div className="flex items-center gap-2 mb-4 text-neutral-300">
            <Rocket className="w-4 h-4" />
            <span className="font-mono text-[10px] uppercase tracking-widest">Focus</span>
          </div>
          <ul className="text-sm space-y-2 text-neutral-400">
            {focusAreas.map((area) => (
              <li key={area} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                {area}
              </li>
            ))}
          </ul>
        </div>

        {/* Currently */}
        <div
          data-reveal
          className="md:col-span-2 card p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Coffee className="w-4 h-4 text-amber-500" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-300">Currently</span>
          </div>
          <p className="text-sm leading-relaxed text-neutral-400">
            Building side projects, contributing to open-source, and learning every day.
            Fuelled by caffeine and curiosity.
          </p>
        </div>
      </div>
    </section>
  );
}
