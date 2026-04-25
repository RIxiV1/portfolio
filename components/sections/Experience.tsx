'use client';

import { experience, type Experience } from '@/data/experience';
import { Briefcase, GraduationCap, FolderGit2, type LucideIcon } from 'lucide-react';
import { useScrollReveal, useStaggerReveal } from '@/lib/useScrollReveal';

const icons: Record<Experience['type'], LucideIcon> = {
  work: Briefcase,
  education: GraduationCap,
  project: FolderGit2,
};

export default function Experience() {
  const headerRef = useScrollReveal();
  const timelineRef = useStaggerReveal<HTMLDivElement>({ staggerMs: 150 });

  return (
    <section id="experience" className="section-padding container-narrow">
      <div ref={headerRef} className="reveal-up flex flex-col mb-10">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500 mb-3">
          Journey
        </span>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">My Story.</h2>
      </div>

      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-px bg-white/10" />

        <div ref={timelineRef} className="space-y-6">
          {experience.map((exp) => {
            const Icon = icons[exp.type];

            return (
              <div key={exp.id} data-reveal className="relative pl-16 group">
                {/* Node */}
                <div className="absolute left-0 w-12 h-12 rounded-2xl flex items-center justify-center bg-black border border-white/20 text-white group-hover:border-white transition-colors">
                  <Icon className="w-5 h-5" />
                </div>

                {/* Card */}
                <div className="card p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">{exp.role}</h3>
                      <p className="text-sm font-mono text-neutral-400">{exp.org}</p>
                    </div>
                    <span className="badge text-[9px] border-transparent bg-white/5">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-300 leading-relaxed mb-4">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((t) => (
                      <span
                        key={t}
                        className="badge"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
