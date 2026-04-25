'use client';

import { ArrowRight, BookOpen, Clock, Calendar } from 'lucide-react';
import { articles, Article } from '@/data/writing';
import { useScrollReveal, useStaggerReveal } from '@/lib/useScrollReveal';

function WritingCard({ article, featured }: { article: Article; featured?: boolean }) {
  return (
    <a
      href={article.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative card flex flex-col h-full overflow-hidden transition-colors ${
        featured ? 'p-8 lg:p-10' : 'p-6'
      }`}
    >
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <span className="badge">
          {article.category}
        </span>
        <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-neutral-500">
          <Clock className="w-3 h-3" />
          {article.readTime}
        </div>
      </div>

      <h3
        className={`${
          featured ? 'text-2xl md:text-3xl' : 'text-xl'
        } font-bold mb-4 text-white group-hover:text-neutral-300 transition-colors leading-tight`}
      >
        {article.title}
      </h3>

      <p
        className={`text-neutral-400 leading-relaxed mb-8 flex-grow ${
          featured ? 'text-base' : 'text-sm'
        }`}
      >
        {article.excerpt}
      </p>

      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-neutral-500">
          <Calendar className="w-3 h-3" />
          {article.date}
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-white">
          READ ARTICLE
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </a>
  );
}

export default function Writing() {
  const headerRef = useScrollReveal();
  const featuredRef = useScrollReveal();
  const stackRef = useStaggerReveal<HTMLDivElement>({ staggerMs: 120 });

  const featuredArticle = articles.find((a) => a.featured) || articles[0];
  const otherArticles = articles.filter((a) => a.id !== featuredArticle.id);

  return (
    <section id="writing" className="section-padding container-narrow relative">
      <div ref={headerRef} className="reveal-up flex flex-col mb-10">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500 mb-3 flex items-center gap-2">
          <BookOpen className="w-3 h-3" />
          Thoughts
        </span>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
          What I write.
        </h2>
        <p className="mt-4 text-neutral-400 max-w-xl">
          Essays, tutorials, and rants from the browser console. Sharing what I learn while
          building and breaking things.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Featured — Left */}
        <div ref={featuredRef} className="reveal-left">
          <WritingCard article={featuredArticle} featured />
        </div>

        {/* Stacked — Right */}
        <div ref={stackRef} className="flex flex-col gap-6">
          {otherArticles.map((article) => (
            <div key={article.id} data-reveal className="flex-1">
              <WritingCard article={article} />
            </div>
          ))}

          <div data-reveal className="flex justify-end mt-2">
            <a
              href="https://medium.com/@shaiksuhaib360"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-neutral-500 hover:text-white transition-colors"
            >
              View all writing
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
