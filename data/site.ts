import { Github, Linkedin } from 'lucide-react'
import { Medium } from '@/components/ui/medium-icon'

export const siteConfig = {
  name: 'Shaik Mohammed Suhaib',
  role: 'I build stuff',
  focus: 'Web, AI, and figuring things out',
  location: 'Chennai, India',
  email: 'shaiksuhaib360@gmail.com',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://shaiksuhaibdev.vercel.app',
  status: 'Looking for an internship',

  resumeUrl: '/Shaik_Mohammed_Suhaib_Resume.pdf',

  bio: [
    "I'm an IT student in Chennai. I mostly build things because something annoyed me and I wanted it to stop.",
    "I learn by making things. Usually I break them, spend a few hours figuring out why, and then fix them. I like messing with Linux, web dev, and AI.",
    "I don't know everything, but I'm pretty good at figuring it out."
  ],

  socials: [
    {
      icon: Github,
      href: 'https://github.com/RIxiV1',
      label: 'GitHub',
      handle: '@RIxiV1',
    },
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/shaiksuhaib',
      label: 'LinkedIn',
      handle: 'in/shaiksuhaib',
    },
    {
      icon: Medium,
      href: 'https://medium.com/@shaiksuhaib360',
      label: 'Medium',
      handle: '@shaiksuhaib360',
    },
  ],

  navLinks: [
    { name: 'Overview', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'Journey', href: '/journey' },
    { name: 'Stack', href: '/stack' },
    { name: 'Contact', href: '/contact' },
  ],

  stackCategories: [
    {
      name: 'Languages & Core',
      description: 'The tools I reach for to build logic that actually works.',
      items: [
        { name: 'TypeScript', role: 'Daily driver for typed web apps and interfaces' },
        { name: 'JavaScript (ES6+)', role: 'Browser extensions, DOM manipulation, scripting' },
        { name: 'Python', role: 'Data scripts, automation, AI agent experiments' },
        { name: 'Bash / Shell', role: 'Automation, Linux scripting, quick server tooling' },
        { name: 'SQL (PostgreSQL)', role: 'Relational data modeling and Row-Level Security policies' }
      ]
    },
    {
      name: 'Frontend & Frameworks',
      description: 'Building fast, responsive, and tactile web interfaces.',
      items: [
        { name: 'React', role: 'Component architecture and state management' },
        { name: 'Next.js 16 (App Router)', role: 'Server components, SSG, routing, SEO' },
        { name: 'Tailwind CSS', role: 'Design systems, micro-interactions, responsive design' },
        { name: 'Motion (Framer)', role: 'Smooth fluid animations and layout transitions' },
        { name: 'Web Extensions (Manifest V3)', role: 'Shadow DOM isolation, background service workers' }
      ]
    },
    {
      name: 'Backend & Infrastructure',
      description: 'Databases, security rules, and serverless backends.',
      items: [
        { name: 'Supabase', role: 'Auth, Edge functions, PostgreSQL hosting' },
        { name: 'PostgreSQL & RLS', role: 'Multi-tenant data isolation at the DB layer' },
        { name: 'Node.js', role: 'Backend APIs and serverless workflows' },
        { name: 'MongoDB', role: 'Document storage for log parsing experiments' }
      ]
    },
    {
      name: 'AI & Machine Learning Tooling',
      description: 'Practical AI integration without the hype.',
      items: [
        { name: 'Gemini API', role: 'Structured rubric evaluation, resume scoring, extraction' },
        { name: 'Ollama & Local LLMs', role: 'Local inference and privacy-first document analysis' },
        { name: 'Tesseract.js OCR', role: 'Browser-based optical character recognition for lab PDFs' },
        { name: 'LangChain / n8n', role: 'Agentic workflow automation and prompt chaining' }
      ]
    },
    {
      name: 'System & Workflow',
      description: 'My daily developer environment.',
      items: [
        { name: 'Linux / Arch', role: 'Preferred OS environment for deep tweaking and terminal speed' },
        { name: 'Git & GitHub', role: 'Version control, open-source projects, PR workflows' },
        { name: 'Figma', role: 'UI wireframing and product prototyping' },
        { name: 'Postman & Insomnia', role: 'API testing and payload debugging' }
      ]
    }
  ],

  projects: [
    {
      title: 'InfoBlend',
      year: '2026',
      slug: 'infoblend',
      status: 'LIVE',
      builtBecause: 'I was reading with four extensions open and got tired of it, so I built one that summarizes and defines without demanding API keys.',
      description: 'A Manifest V3 browser extension for in-page definitions, translations, and summaries executed client-side.',
      tech: ['JavaScript', 'Manifest V3', 'Shadow DOM'],
      href: 'https://github.com/RIxiV1/InfoBlend',
      liveUrl: 'https://addons.mozilla.org/en-US/firefox/addon/infoblend/',
      image: '/projects/infoblend-live.png',
      imagePosition: 'center',
      caseStudy: {
        tagline: 'A reading toolkit that defines, translates, and summarizes client-side without breaking website styles or requiring an API key.',
        problem: "I was reading with four extensions open and got tired of it, so I built one. Half of the existing extensions injected global CSS that broke websites, and the rest refused to work at all unless you gave them an API key right away.",
        approach: "I built one unified extension. If you don't provide a key, it uses a free tier for translation and runs extractive summarization offline. Figuring out Manifest V3 service workers and Shadow DOM isolation took work, but it keeps the extension completely isolated from host page styles.",
        decisions: [
          { title: 'Making it work for free', body: "It's annoying when extensions are dead weight until you add a key. InfoBlend works fine out of the box with offline fallbacks." },
          { title: 'Shadow DOM isolation', body: "At first, host website stylesheets bled into the extension UI. I used Shadow DOM to completely wall off InfoBlend from the rest of the page." },
          { title: 'Deleting bloat', body: 'I prototyped a full "chat with the page" feature, but it was sluggish and bloated. I scrapped it to keep the core reading flow instant.' }
        ],
        outcome: 'Published on Firefox Add-ons, supporting 17 languages with zero page layout interference.'
      },
    },
    {
      title: 'Digital Clinic',
      year: '2026',
      slug: 'digital-clinic',
      status: 'LIVE',
      builtBecause: 'Lab blood reports are confusing and terrifying to read. I built a tool that translates biomarker jargon into plain English.',
      description: 'Client-side lab report interpreter using multi-strategy PDF parsing and OCR fallback to explain medical results.',
      tech: ['React', 'TypeScript', 'Tesseract OCR', 'Tailwind'],
      href: 'https://github.com/RIxiV1/DIGITAL-CLINIC',
      liveUrl: 'https://digital-clinic-formen.vercel.app/',
      image: '/projects/digital-clinic.png',
      imagePosition: 'center',
      caseStudy: {
        tagline: 'Turns dense blood and hormone lab reports into clear, panic-free English right in the browser.',
        problem: 'Medical lab reports are full of cryptic ranges and clinical jargon that leave patients panicking and Googling symptoms unnecessarily.',
        approach: 'Built a browser-based parser that extracts biomarker tables directly from PDFs and scanned images using client-side OCR, scoring values against clinical reference standards without uploading patient data to external servers.',
        decisions: [
          { title: 'Client-side processing', body: 'Healthcare data is sensitive. Running OCR and parsing directly in the browser ensures patient lab files never leave their machine.' },
          { title: 'Dual OCR & text parser', body: 'Different labs export PDFs differently. If digital text extraction fails on scanned receipts, it falls back to OCR automatically.' },
          { title: 'Plain English explanations', body: 'Instead of just showing red flags, the app explains what each marker actually means in simple terms.' }
        ],
        outcome: 'Live on the web, parsing multi-page hormone and metabolic reports in seconds with zero backend storage requirements.'
      },
    },
    {
      title: 'Caliber',
      year: '2026',
      slug: 'caliber',
      status: 'LIVE',
      builtBecause: 'I wanted to see if an LLM could screen resumes consistently without hallucinating arbitrary hiring decisions.',
      description: 'An AI resume screener that scores CVs against job descriptions with structured rubric reasoning.',
      tech: ['React', 'TypeScript', 'Supabase', 'Gemini'],
      href: 'https://github.com/RIxiV1/Caliber',
      liveUrl: 'https://caliberio.lovable.app',
      image: '/projects/caliber.png',
      caseStudy: {
        tagline: 'Upload a resume and a job description, get a score and some reasoning back. Built to see if an LLM could actually do a recruiter’s first pass reliably.',
        problem: "The first pass of reading a resume is mostly checking qualifications, experience, and domain skills. I wanted to see if LLMs could evaluate candidates with structured rubrics rather than generic vibe checks.",
        approach: "Rebuilt from scratch with React and Supabase. It extracts text from PDFs, evaluates key criteria against the JD via Gemini, and stores candidate scorecards behind Postgres Row-Level Security.",
        decisions: [
          { title: 'Dropping n8n webhooks', body: "The original prototype relied on third-party webhooks that expired. Rebuilding with custom serverless functions made it fast and reliable." },
          { title: 'Database isolation', body: "Implemented Row Level Security in Postgres so candidate resumes and scores are strictly protected." },
          { title: 'Benchmarking consistency', body: 'Evaluated against a test set of 12 labeled CVs to fine-tune the prompt rubric, achieving high agreement with human screening.' }
        ],
        outcome: 'Live app with candidate dashboard, candidate rubric scoring, and structured interview feedback.'
      },
    },
    {
      title: 'SubSentry',
      year: '2025',
      slug: 'subsentry',
      status: 'LIVE',
      builtBecause: 'I wanted a subscription tracker that respects privacy instead of asking for raw bank credentials.',
      description: 'A clean subscription tracker and budget management app with PostgreSQL Row-Level Security.',
      tech: ['React', 'TypeScript', 'Supabase', 'PostgreSQL'],
      href: 'https://github.com/RIxiV1/SubSentry',
      liveUrl: 'https://ssubsentry.lovable.app',
      image: '/projects/subsentry.png',
      caseStudy: {
        tagline: 'A subscription tracker that never asks for your bank login and makes expense tracking feel stress-free.',
        problem: "Every finance app demands bank credentials to scrape transactions. I wanted a simple tool for people who prefer manually logging subscriptions without handing over account access.",
        approach: 'Built with React and Supabase, prioritizing security with PostgreSQL RLS and designing a delightful, responsive mobile-first UI.',
        decisions: [
          { title: 'Zero bank integration', body: "Strictly offline/manual inputs to ensure zero financial credential exposure." },
          { title: 'Data isolation with RLS', body: "Every user row is locked down at the database level so data leaks are architecturally impossible." },
          { title: 'Delightful micro-interactions', body: "Added celebration feedback when canceling subscriptions to turn money management into a positive habit." }
        ],
        outcome: 'Live application actively tracking recurring budgets with complete user privacy.'
      },
    },
  ],

  experience: [
    {
      role: 'Product & Development Intern',
      org: 'ForMen Digital Clinic — Remote',
      period: 'Mar 2026 — Jul 2026',
      description:
        "I worked on a healthcare product from research through implementation. I built an AI tool that reads complicated men's health blood reports and explains them in plain English so patients don't panic.",
      details: {
        actions: [
          "Talked through the core problem before writing any code",
          "Worked on the PRD to figure out what actually mattered",
          "Designed parts of the user experience",
          "Built the actual product",
          "Iterated based on what was (and wasn't) working"
        ],
        learned: "Building something is easy compared to deciding what should be built."
      }
    },
    {
      role: 'Certificate Program — Product Management & Agentic AI',
      org: 'IIT Patna × Masai (Vishlesan i-Hub Foundation)',
      period: 'Apr 2025 — Oct 2025',
      description:
        'A six-month program where we researched an idea and shipped an MVP. I spent most of my time setting up AI agent workflows with n8n and LLMs.',
    },
    {
      role: 'NPTEL Elite Certification — Big Data Computing',
      org: 'SWAYAM–NPTEL · IIT Kanpur',
      period: 'Completed Oct 2025',
      description:
        'A course where I learned the basics of distributed processing and how large-scale data systems actually work.',
    },
  ],

  education: {
    degree: 'B.Tech, Information Technology',
    school: 'Vel Tech High Tech Engineering College, Chennai',
    period: 'Jun 2024 — May 2028 (Expected)',
  },

  metadata: {
    description:
      'My personal site. I build stuff, try to figure things out, and occasionally write code that works.',
  },
}
