'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { projects, Project } from '@/data/projects';
import { ExternalLink, Github, X, Code2, Eye, ArrowUpRight } from 'lucide-react';
import { useScrollReveal, useStaggerReveal } from '@/lib/useScrollReveal';

/* ─── Modal ─── */

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-5xl max-h-[88vh] overflow-y-auto glass-card"
      >
        <button
          onClick={onClose}
          aria-label="Close project details"
          className="absolute top-5 right-5 p-2 bg-white/5 hover:bg-white/10 rounded-full z-10 transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left */}
          <div className="p-8 md:p-10 border-b lg:border-b-0 lg:border-r border-white/5">
            <div className="aspect-video rounded-2xl overflow-hidden mb-8 border border-white/10 relative">
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <h2 id="project-modal-title" className="text-3xl font-bold mb-2 text-white">
              {project.title}
            </h2>
            <p className="text-sm font-mono text-neutral-400 mb-5">{project.tagline}</p>
            <p className="text-neutral-300 leading-relaxed mb-6">{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="badge"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex gap-3">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 rounded-xl font-mono uppercase tracking-wider text-xs font-bold flex items-center justify-center gap-2 bg-white text-black transition-transform hover:scale-105"
              >
                <ExternalLink className="w-4 h-4" /> View Project
              </a>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} source on GitHub`}
                className="px-5 py-3.5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl flex items-center justify-center transition-colors text-white"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right: Code preview */}
          <div className="p-8 md:p-10 bg-black/40">
            <div className="flex items-center gap-2 text-white mb-6">
              <Code2 className="w-5 h-5" />
              <span className="font-mono text-xs uppercase tracking-widest font-bold">
                Architecture Preview
              </span>
            </div>
            {project.codeSnippet && (
              <div className="relative rounded-2xl overflow-hidden border border-white/10 mb-6 bg-black">
                <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/10">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <pre className="p-5 text-xs md:text-sm leading-relaxed overflow-x-auto text-neutral-300 font-mono">
                  <code>{project.codeSnippet}</code>
                </pre>
              </div>
            )}
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
              <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">
                Status
              </p>
              <p className="text-sm text-neutral-300">
                Production-ready. Built following industrial patterns.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Featured Card ─── */

function FeaturedCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const ref = useScrollReveal();

  return (
    <div
      ref={ref}
      className="reveal-scale"
    >
      <div
        onClick={onClick}
        className="group relative glass-card overflow-hidden cursor-pointer transition-all duration-500"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden">
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a0a]/60 hidden lg:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--card)] to-transparent lg:hidden" />
            <div className="absolute top-5 left-5">
              <span className="px-3 py-1.5 rounded-full text-[9px] font-mono uppercase tracking-widest bg-white text-black font-bold">
                Featured
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 lg:p-10 flex flex-col justify-center">
            <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 mb-4 block">
              {project.category}
            </span>
            <h3 className="text-3xl md:text-4xl font-bold mb-3 text-white tracking-tight">
              {project.title}
            </h3>
            <p className="text-neutral-400 leading-relaxed mb-6 max-w-md">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="badge"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 text-sm font-bold text-white group-hover:gap-3 transition-all">
                View Project <ArrowUpRight className="w-4 h-4" />
              </span>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label={`${project.title} source on GitHub`}
                className="p-2.5 bg-white/5 border border-white/10 rounded-full text-neutral-400 hover:bg-white hover:text-black hover:border-white transition-all"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Project Card ─── */

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <div
      data-reveal
      onClick={onClick}
      className="group glass-card overflow-hidden cursor-pointer transition-all duration-500"
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--card)] via-transparent to-transparent" />

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
          <div className="p-3 rounded-full bg-white text-black">
            <Eye className="w-5 h-5" />
          </div>
        </div>

        {/* GitHub link */}
        <div
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} source on GitHub`}
            className="p-2 bg-black/60 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-black transition-colors border border-white/10 block"
          >
            <Github className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Info */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">{project.title}</h3>
            <p className="text-xs font-mono text-neutral-500">{project.tagline}</p>
          </div>
          <ArrowUpRight className="w-4 h-4 text-neutral-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-1" />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((t) => (
            <span
              key={t}
              className="badge text-[9px]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Projects Section ─── */

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const headerRef = useScrollReveal();
  const gridRef = useStaggerReveal<HTMLDivElement>({ staggerMs: 120 });

  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <>
      <section id="projects" className="section-padding container-narrow">
        <div ref={headerRef} className="reveal-up mb-10">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500 mb-3 block">
            Selected Works
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            What I've built.
          </h2>
        </div>

        {/* Featured — full width */}
        <div className="space-y-6 mb-6">
          {featured.map((project) => (
            <FeaturedCard
              key={project.id}
              project={project}
              onClick={() => setSelected(project)}
            />
          ))}
        </div>

        {/* Rest — staggered grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {rest.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelected(project)}
            />
          ))}
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
