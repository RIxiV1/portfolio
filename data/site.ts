import { Github, Linkedin, Twitter } from 'lucide-react';

export const siteConfig = {
  name: 'Shaik Mohammed Suhaib',
  role: 'Product-minded software engineer',
  focus: 'Full-stack · AI products · n8n automation',
  location: 'Chennai, India',
  email: 'shaiksuhaib360@gmail.com',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://portfolio-suhaibdev.vercel.app',
  status: 'Open to internships & freelance',

  now: [
    'just shipped a consumer health AI tool @ ForMen Digital Clinic',
    'cert in product mgmt & agentic AI @ IIT Patna',
    'B.Tech IT @ Vel Tech Chennai',
  ],

  resumeUrl: '/resume.pdf',

  bio: [
    "I'm an IT undergrad in Chennai who builds and ships full-stack AI products end-to-end. Comfortable across React/TypeScript front ends, Supabase backends, and LLM-driven automation in n8n.",
    "I treat building like a product problem — write the PRD, validate with users, ship the MVP. Recently wrapped an internship at ForMen Digital Clinic where I shipped a consumer health AI tool, and I'm pursuing a Product Management & Agentic AI cert from IIT Patna alongside my B.Tech.",
  ],

  socials: [
    { icon: Github, href: 'https://github.com/RIxiV1', label: 'GitHub', handle: '@RIxiV1' },
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/shaiksuhaib',
      label: 'LinkedIn',
      handle: 'in/shaiksuhaib',
    },
    { icon: Twitter, href: 'https://x.com/suhaibX0', label: 'Twitter', handle: '@suhaibX0' },
  ],

  navLinks: [
    { name: 'About', href: '#about' },
    { name: 'Work', href: '#work' },
    { name: 'Lab', href: '#lab' },
    { name: 'Stack', href: '#stack' },
    { name: 'Writing', href: '#writing' },
    { name: 'Contact', href: '#contact' },
  ],

  projects: [
    {
      title: 'ResumeScreen',
      year: '2025',
      description:
        'An end-to-end resume screening pipeline. A React form posts a resume PDF and JD to an n8n webhook; a Gemini agent returns a structured 0–100 match score with matched skills, years of experience, and an interview/reject recommendation. Auto-routes follow-up emails via Gmail based on the verdict. IIT Patna capstone.',
      tech: ['n8n', 'React', 'TypeScript', 'Supabase', 'Gemini'],
      href: 'https://github.com/RIxiV1/Resume-Screening-Agent',
      accent: 'oklch(0.8 0.16 75)', // amber
    },
    {
      title: 'InfoBlend',
      year: '2026',
      description:
        'A Manifest V3 Chrome extension with a service-worker background and content scripts. UI rendered inside a Shadow DOM so styles never leak into the host page. Frequency-based extractive summarizer, instant dictionary definitions with Wikipedia fallback, privacy-focused ad blocking via declarativeNetRequest, and optional LLM (Gemini) explanations.',
      tech: ['JavaScript', 'Manifest V3', 'Shadow DOM'],
      href: 'https://github.com/RIxiV1/InfoBlend',
      accent: 'oklch(0.72 0.18 280)', // indigo
    },
    {
      title: 'SubSentry',
      year: '2026',
      description:
        'A subscription-tracking dashboard with React + Vite and a Supabase Postgres backend — no bank linking required. Per-user data isolation via Supabase Row Level Security. Zod for type-safe form validation, shadcn/ui + Tailwind for the component system.',
      tech: ['React', 'Vite', 'TypeScript', 'Supabase', 'Tailwind', 'Zod'],
      href: 'https://github.com/RIxiV1/SubSentry',
      accent: 'oklch(0.74 0.18 15)', // rose
    },
  ],

  experience: [
    {
      role: 'Product & Development Intern',
      org: 'ForMen Digital Clinic — Remote',
      period: 'Mar 2026 — Jun 2026',
      description:
        "Built a consumer-facing AI tool from scratch that explains men's-health lab reports in plain language, owning it end to end from PRD through working product. Designed and implemented the interface, turning structured health metrics into clear, interactive screens. Authored the research notes and Product Requirements Documents that scoped the digital clinic assessment tool.",
    },
    {
      role: 'Certification — Product Management & Agentic AI',
      org: 'Indian Institute of Technology (IIT), Patna — Online / Hybrid',
      period: 'Jan 2025 — Present',
      description:
        'Working through the full product lifecycle: market research, MVP scoping, and iterative launches. Designed agentic automation workflows in n8n backed by LLMs to reduce manual, repetitive steps.',
    },
    {
      role: 'B.Tech, Information Technology',
      org: 'Vel Tech High Tech Engineering College, Chennai',
      period: 'Jun 2024 — May 2028 (Expected)',
      description:
        'Core focus on full-stack development, AI agents, and intelligent systems. Active contributor to open-source UI libraries; maintain five public GitHub repositories spanning full-stack web, browser extensions, and AI automation.',
    },
  ],

  stack: [
    { group: 'Languages', items: ['TypeScript', 'JavaScript', 'Python', 'SQL'] },
    { group: 'Frontend', items: ['React', 'Vite', 'Tailwind', 'shadcn/ui'] },
    { group: 'Backend', items: ['Supabase', 'Postgres', 'Zod', 'REST'] },
    { group: 'AI / Automation', items: ['n8n', 'OpenAI', 'Gemini', 'LLM prompting'] },
  ],

  writing: [
    {
      title: 'Recommendation Systems: The Math Behind Discovery',
      description:
        'Researching the algorithms that power modern content discovery and personalisation.',
      date: 'Published',
      tag: 'AI/ML',
      url: 'https://medium.com/@shaiksuhaib360/recommendation-systems-the-math-behind-netflix-spotify-and-social-media-feeds-d61cfd501ba0',
    },
    {
      title: 'Network Theory: The Science of Connections',
      description:
        'The invisible threads that bind our world through mathematical relationships.',
      date: 'Published',
      tag: 'Math',
      url: 'https://medium.com/@shaiksuhaib360/network-theory-how-everything-connects-56a54ee1265a',
    },
    {
      title: 'Chaos Theory & The Butterfly Effect',
      description:
        'Why small changes lead to dramatically different and unpredictable outcomes.',
      date: 'Published',
      tag: 'Science',
      url: 'https://medium.com/@shaiksuhaib360/why-chaos-theory-explains-science-of-the-butterfly-effect-368dd5f34b7f',
    },
  ],

  metadata: {
    title: 'shaik suhaib — product-minded software engineer',
    description:
      'Product-minded software engineer building full-stack AI products. Interning at ForMen Digital Clinic, studying IT at Vel Tech Chennai. Open to internships and freelance.',
    twitterHandle: '@suhaibX0',
  },
};
