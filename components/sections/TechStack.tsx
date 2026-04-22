'use client';

import { useScrollReveal } from '@/lib/useScrollReveal';

const techs = [
  { name: 'JavaScript', icon: '⚡' },
  { name: 'TypeScript', icon: '🔷' },
  { name: 'Python', icon: '🐍' },
  { name: 'React', icon: '⚛️' },
  { name: 'Next.js', icon: '▲' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'Tailwind', icon: '🎨' },
  { name: 'HTML', icon: '🌐' },
  { name: 'CSS', icon: '🖌️' },
  { name: 'SQL', icon: '🗄️' },
  { name: 'Git', icon: '🔗' },
  { name: 'Chrome API', icon: '🌍' },
  { name: 'Agentic AI', icon: '🤖' },
  { name: 'MCP', icon: '🛠️' },
];

export default function TechStack() {
  const headerRef = useScrollReveal();

  return (
    <section className="py-24 md:py-32 border-y border-white/10 bg-[#020202] overflow-hidden cv-auto">
      <div className="container-narrow mb-12">
        <div ref={headerRef} className="reveal-up flex flex-col">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500 mb-3 block">
            Toolkit
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
            Tools of the trade.
          </h2>
          <p className="text-neutral-400 max-w-xl md:text-lg leading-relaxed">
            A look at the languages, frameworks, and libraries I use to build robust, scalable
            applications and seamless user experiences.
          </p>
        </div>
      </div>

      {/* Infinite scroll — CSS animation (no JS needed) */}
      <div className="relative flex overflow-x-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-[#020202] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-[#020202] to-transparent pointer-events-none" />

        <div className="flex gap-4 py-4 whitespace-nowrap animate-marquee">
          {[...techs, ...techs].map((tech, i) => (
            <div
              key={`${tech.name}-${i}`}
              className="group flex items-center justify-center gap-3 px-8 py-5 glass-card min-w-[200px] transition-all duration-300"
            >
              <span className="text-2xl grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100 transition-all duration-300">
                {tech.icon}
              </span>
              <span className="font-medium text-sm text-neutral-400 group-hover:text-white transition-colors duration-300">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
