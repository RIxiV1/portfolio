import { Github, Linkedin, Twitter } from 'lucide-react';

export const siteConfig = {
  name: 'Shaik Mohammed Suhaib',
  shortName: 'Suhaib',
  role: 'Product Engineer',
  focus: 'Agentic AI · Recommendation Systems',
  location: 'Chennai, India',
  email: 'shaiksuhaib360@gmail.com',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://suhaib.dev',
  status: 'Open to internships & freelance',
  resumeUrl:
    'https://drive.google.com/file/d/1ZaHawnbNC8nFV-uir2fsXjMqfoUzO4YJ/view?usp=sharing',

  bio: [
    "I'm an IT student building agentic AI tools and recommendation systems — turning the math behind discovery, ranking, and reasoning into products people actually use.",
    'Studying B.Tech Information Technology at Vel Tech in Chennai, and shipping side projects in between that sit at the intersection of AI research and product engineering.',
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
    { name: 'Work', href: '#work' },
    { name: 'About', href: '#about' },
    { name: 'Stack', href: '#stack' },
    { name: 'Writing', href: '#writing' },
    { name: 'Contact', href: '#contact' },
  ],

  projects: [
    {
      title: 'Resume Screening Agent',
      year: '2025',
      description:
        'AI-powered resume screening agent built with n8n and Lovable. Candidates upload a PDF resume and JD; the workflow extracts text, scores the match with an LLM, returns a structured report (score, summary, strengths, gaps, next steps), and can optionally send interview or rejection emails automatically.',
      tech: ['n8n', 'Lovable', 'OpenAI', 'TypeScript'],
      href: 'https://github.com/RIxiV1/Resume-Screening-Agent',
    },
    {
      title: 'InfoBlend',
      year: '2026',
      description:
        'InfoBlend is a Manifest V3 Chrome extension that augments web browsing with in-page definitions, extractive page summaries all executed client-side for privacy and performance.',
      tech: ['Chrome MV3', 'JavaScript'],
      href: 'https://github.com/RIxiV1/InfoBlend',
    },
    {
      title: 'Lab Report Explainer',
      year: '2026',
      description:
        'Clinically Precise interpretation of Semen Analysis Reports — Powered by WHO 2021',
      tech: ['JavaScript', 'LLM', 'Vercel'],
      href: 'https://github.com/RIxiV1/Lab_report_explainer',
    },
    {
      title: 'SubSentry',
      year: '2026',
      description:
        'Your fin-bestie for tracking subs. Stop letting them ghost your bank account. 💸 No cap, just clarity. Secure AF.',
      tech: ['TypeScript', 'Lovable'],
      href: 'https://github.com/RIxiV1/SubSentry',
    },
    {
      title: 'Jarvis',
      year: '2025',
      description:
        'A simple voice-activated assistant that responds to your commands using speech recognition and integrates AI (via OpenAI) to answer questions, play music, or open websites all hands-free.',
      tech: ['Python', 'OpenAI', 'SpeechRecognition'],
      href: 'https://github.com/RIxiV1/Jarvis',
    },
  ],

  experience: [
    {
      role: 'Independent Developer & AI Researcher',
      org: 'Self-directed',
      period: '2024 — Present',
      description:
        'Building agentic AI tools, recommendation engines, and full-stack products. Focused on turning research-grade math into shippable software.',
    },
    {
      role: 'B.Tech, Information Technology',
      org: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute, Chennai',
      period: '2024 — 2028',
      description:
        'Core focus on AI, algorithms, and intelligent systems. Side-tracking into systems design and applied math.',
    },
  ],

  stack: [
    { group: 'Languages', items: ['TypeScript', 'Python', 'Go', 'SQL'] },
    { group: 'Frameworks', items: ['Next.js', 'React', 'FastAPI', 'Tailwind'] },
    { group: 'AI / ML', items: ['PyTorch', 'LangGraph', 'Anthropic SDK', 'OpenAI'] },
    { group: 'Infra', items: ['Postgres', 'Redis', 'Vercel', 'Docker'] },
  ],

  writing: [
    {
      title: 'Recommendation Systems: The Math Behind Discovery',
      description:
        'Researching the algorithms that power modern content discovery and personalisation.',
      date: 'In Progress',
      tag: 'AI/ML',
      url: 'https://medium.com/@shaiksuhaib360',
    },
    {
      title: 'Network Theory: The Science of Connections',
      description:
        'The invisible threads that bind our world through mathematical relationships.',
      date: 'Drafting',
      tag: 'Math',
      url: 'https://medium.com/@shaiksuhaib360',
    },
    {
      title: 'Chaos Theory & The Butterfly Effect',
      description:
        'Why small changes lead to dramatically different and unpredictable outcomes.',
      date: 'Drafting',
      tag: 'Science',
      url: 'https://medium.com/@shaiksuhaib360',
    },
  ],

  metadata: {
    title: 'Shaik Mohammed Suhaib — Product Engineer',
    description:
      'Product engineer building agentic AI systems and recommendation engines. Open to internships and freelance.',
    twitterHandle: '@suhaibX0',
  },
};
