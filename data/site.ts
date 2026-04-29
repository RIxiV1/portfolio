import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

export const siteConfig = {
  name: 'Suhaib',
  role: 'Developer',
  location: 'India',
  email: 'shaiksuhaib360@gmail.com',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://suhaib.dev',
  tagline: 'I build (and break) things for the web.',
  bio: "CS student & developer specializing in Product Engineering & AI Systems. Open to internships, full-time roles & freelance. Let's make something worth breaking.",
  
  socials: [
    { icon: Github, href: 'https://github.com/RIxiV1', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/shaiksuhaib', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://x.com/suhaibX0', label: 'Twitter' },
  ],

  learningPath: [
    {
      title: 'Recommendation Systems: The Math Behind Discovery',
      description: 'Currently researching the algorithms that power modern content discovery and personalization.',
      date: 'In Progress',
      tag: 'AI/ML',
      url: 'https://medium.com/@shaiksuhaib360',
    },
    {
      title: 'Network Theory: The Science of Connections',
      description: 'Studying the invisible threads that bind our world through mathematical relationships.',
      date: 'Drafting',
      tag: 'Math',
      url: 'https://medium.com/@shaiksuhaib360',
    },
    {
      title: 'Chaos Theory & The Butterfly Effect',
      description: 'Exploring why small changes can lead to dramatically different and unpredictable outcomes.',
      date: 'Drafting',
      tag: 'Science',
      url: 'https://medium.com/@shaiksuhaib360',
    },
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
