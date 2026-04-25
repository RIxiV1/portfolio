'use client';

import { siteConfig } from '@/data/site';

export default function Footer() {
  return (
    <footer className="py-10 border-t border-white/10 bg-[#050505]">
      <div className="container-narrow flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-neutral-500">
          Built by <span className="text-white font-medium">{siteConfig.name}</span> · Designed with care · {new Date().getFullYear()}
        </p>
        <div className="flex items-center gap-4">
          {siteConfig.socials.map(({ href, icon: Icon, label }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              className="text-neutral-500 hover:text-white transition-colors"
              aria-label={label}>
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
