import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

export const siteConfig = {
  name: 'Suhaib',
  role: 'Developer',
  location: 'India',
  email: 'shaiksuhaib360@gmail.com',
  tagline: 'I build (and break) things for the web.',
  bio: "CS student & developer specializing in Product Engineering & AI Systems. Open to internships, full-time roles & freelance. Let's make something worth breaking.",
  
  socials: [
    { icon: Github, href: 'https://github.com/RIxiV1', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/shaiksuhaib', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://x.com/suhaibX0', label: 'Twitter' },
  ],

  navLinks: [
    { name: 'Work', href: '#projects' },
    { name: 'About', href: '#about' },
    { name: 'Journey', href: '#experience' },
    { name: 'Writing', href: '#writing' },
    { name: 'Contact', href: '#contact' },
  ],

  metadata: {
    title: 'Suhaib — Developer',
    description: 'Developer specializing in Product & AI Systems. Minimalist, high-performance architecture.',
    keywords: ['developer', 'portfolio', 'React', 'Next.js', 'TypeScript', 'Python', 'AI', 'Developer'],
    ogTitle: 'Suhaib — Developer Portfolio',
    ogDescription: 'Junior developer. I build (and break) things for the web.',
    twitterHandle: '@suhaibX0',
  }
};
