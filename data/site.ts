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
      slug: 'resumescreen',
      description:
        'An end-to-end resume screening pipeline. A React form posts a resume PDF and JD to an n8n webhook; a Gemini agent returns a structured 0–100 match score with matched skills, years of experience, and an interview/reject recommendation. Auto-routes follow-up emails via Gmail based on the verdict. IIT Patna capstone.',
      tech: ['n8n', 'React', 'TypeScript', 'Supabase', 'Gemini'],
      href: 'https://github.com/RIxiV1/Resume-Screening-Agent',
      accent: 'oklch(0.8 0.16 75)', // amber
      caseStudy: {
        tagline:
          'Triage a stack of resumes against a JD in seconds with a structured 0–100 verdict — built for the IIT Patna Product Management & Agentic AI capstone.',
        problem:
          'Recruiters at small companies spend hours on first-pass screening where most resumes are clearly off-fit. The "is this candidate worth a call" decision is structured enough — must-have skills, years of experience, role match — that an LLM can extract it reliably if you commit to a structured contract instead of free-form text.',
        approach:
          'A React form posts a resume PDF and the JD text to an n8n webhook. The workflow extracts the resume text, calls a Gemini agent with a JSON-output prompt asking for matched_skills, years_of_experience, score, and verdict. Based on the verdict, n8n branches and routes a follow-up email via Gmail — interview invites and polite rejections handled as separate templated paths. Supabase logs every screening for auditability.',
        decisions: [
          {
            title: 'n8n over a custom Node backend',
            body: 'The pipeline needed retry logic, conditional branching on the LLM verdict, Gmail integration, and per-step observability. Building that from scratch in Node would have been weeks of plumbing for a 4-week capstone. n8n gave me the orchestration for free, with a visual execution log that made the LLM prompt-iteration loop roughly 10× faster than tail -f on server logs.',
          },
          {
            title: 'Structured JSON output, not free text',
            body: 'The first prompt version asked Gemini to "summarise the candidate" — useless for downstream branching. Rewriting it to demand a strict JSON shape (matched_skills, score, verdict) turned the LLM into a callable function instead of a chatbot. The workflow downstream became a straightforward switch on verdict.',
          },
          {
            title: 'Supabase as the audit trail',
            body: 'Storing every screening — input JD, candidate, score, verdict, agent reasoning — means a recruiter who cares about hiring fairness can re-audit any decision later. RLS-protected per-recruiter so multiple users share infra without sharing data.',
          },
        ],
        outcome:
          'Working end-to-end pipeline submitted as the IIT Patna Product Management & Agentic AI capstone. [TODO: add metrics — e.g. how many resumes tested, agreement rate vs your own intuition.]',
        learnings: [
          'Structured-output prompts beat regex/text parsing every time. Design the agent\'s response as a typed contract from the start.',
          'n8n is genuinely faster than code for branching pipelines with multiple SaaS integrations — and the execution log doubles as your debugger.',
          'The first prompt version always scores too generously. Adding a "list 3 reasons this candidate isn\'t a fit" step before the score calibrated the verdict sharply.',
        ],
      },
    },
    {
      title: 'InfoBlend',
      year: '2026',
      slug: 'infoblend',
      description:
        'A Manifest V3 Chrome extension with a service-worker background and content scripts. UI rendered inside a Shadow DOM so styles never leak into the host page. Frequency-based extractive summarizer, instant dictionary definitions with Wikipedia fallback, privacy-focused ad blocking via declarativeNetRequest, and optional LLM (Gemini) explanations.',
      tech: ['JavaScript', 'Manifest V3', 'Shadow DOM'],
      href: 'https://github.com/RIxiV1/InfoBlend',
      accent: 'oklch(0.72 0.18 280)', // indigo
      caseStudy: {
        tagline:
          'A small browser toolkit for reading: highlight to summarise, hover to define, block ads quietly, optionally ask an LLM. Built for Manifest V3, isolated via Shadow DOM.',
        problem:
          'Most "highlighter" extensions feel cheap because their injected CSS fights with the host site\'s stylesheets. And most of them only do one thing — summarise, or dictionary, or ad-block — instead of being a small, fast toolkit for actually reading on the web.',
        approach:
          'Manifest V3 with a service-worker background and content scripts. Every visible UI element renders inside a Shadow DOM root so host page styles can\'t reach in and the extension can\'t leak out. A frequency-based extractive summariser runs locally for instant feedback; dictionary tooltips ship with a Wikipedia fallback so obscure terms still resolve; declarativeNetRequest handles ad blocking with zero JS runtime cost; optional Gemini explanations are gated behind an explicit user toggle.',
        decisions: [
          {
            title: 'Shadow DOM for every injected UI element',
            body: 'Inject a div and !important your way through host CSS and you still lose to higher-specificity selectors on hostile pages. Shadow DOM gives you a complete style boundary — content scripts feel native, even on Medium or news sites with aggressive global styles. The learning curve (CSS variables, slot composition, focus traversal) pays back the moment you ship to real browsers.',
          },
          {
            title: 'Extractive summary locally, LLM only on demand',
            body: 'A user highlighting a paragraph wants the summary in <100ms, not after a 2-second LLM round-trip. Frequency-based extractive summarisation is fast and good-enough for skim. LLM explanations are opt-in for the cases where the user actually wants depth — keeps latency expectations honest and costs near zero.',
          },
          {
            title: 'declarativeNetRequest over webRequest',
            body: 'Manifest V3 mandates it, but it\'s also the right choice — rules are compiled once and enforced in the browser\'s network layer with no JS overhead per request. The old webRequest API was both slower and a real performance hit on tab CPU usage.',
          },
        ],
        outcome:
          'Working extension that runs on arbitrary sites without breaking layouts. [TODO: link to Chrome Web Store listing if published, or note install-from-source for now.]',
        learnings: [
          'Shadow DOM is the right default for any extension that injects UI — designing for it from day one is much cheaper than retrofitting.',
          'Manifest V3\'s restrictions are mostly fine if you adopt them up front; the painful migrations are people retrofitting MV2 codebases.',
          'Gating LLM features behind explicit user intent (a button, not autopilot) keeps both latency expectations and API costs in check.',
        ],
      },
    },
    {
      title: 'SubSentry',
      year: '2026',
      slug: 'subsentry',
      description:
        'A subscription-tracking dashboard with React + Vite and a Supabase Postgres backend — no bank linking required. Per-user data isolation via Supabase Row Level Security. Zod for type-safe form validation, shadcn/ui + Tailwind for the component system.',
      tech: ['React', 'Vite', 'TypeScript', 'Supabase', 'Tailwind', 'Zod'],
      href: 'https://github.com/RIxiV1/SubSentry',
      accent: 'oklch(0.74 0.18 15)', // rose
      caseStudy: {
        tagline:
          'Track your subscriptions without handing a bank-linking aggregator the keys to your accounts.',
        problem:
          'Established subscription trackers (Rocket Money, Truebill) require you to link your bank account so they can scrape transactions. That works, but it\'s a steep privacy ask for what is fundamentally a "remember what I\'m paying for" tool. The user willing to type their subscriptions manually in exchange for not sharing credentials hasn\'t had a clean product built for them.',
        approach:
          'React + Vite frontend, Supabase Postgres backend. Per-user data isolation enforced at the database layer with Row Level Security — your subscriptions are physically un-queryable by anyone but you, regardless of what the app code does. Forms validated end-to-end with Zod schemas shared between client and server. shadcn/ui + Tailwind for a fast, consistent component layer.',
        decisions: [
          {
            title: 'Supabase RLS instead of app-layer auth checks',
            body: 'App-layer checks fail open the moment you forget a `WHERE user_id = ?` on one endpoint. RLS pushes the rule into the database — even a buggy or malicious query physically cannot return another user\'s rows. It\'s the right default for any consumer app where data is sensitive, and it costs almost nothing if you design your schema with it in mind from day one.',
          },
          {
            title: 'No bank linking, ever',
            body: 'Bank linking is a 10× privacy ask for a 1× convenience win. The users worth competing for are the ones who\'d rather type in their subscriptions than hand off credentials to a Plaid-style aggregator they\'ve never heard of. Saying no to the "industry standard" feature is the wedge.',
          },
          {
            title: 'Zod as the single source of truth for shape',
            body: 'One schema, two consumers — react-hook-form on the client and the API route on the server both parse the same Zod schema. No drift between client and server validation, and the types fall out for free. Eliminates a whole category of "the form said it was valid but the API disagreed" bugs.',
          },
        ],
        outcome:
          'Working dashboard with auth, add/edit/delete subscription flows, monthly cost projection, and per-category breakdown. [TODO: add usage details — solo project, time invested, hosted URL if live.]',
        learnings: [
          'Supabase RLS is the right answer for almost any multi-tenant consumer app — designing schema with it in mind from day one is much cheaper than retrofitting policies later.',
          'Zod-as-source-of-truth eliminates "client and server disagree about valid" bugs at the type level, not just at runtime.',
          'Subscription tracking is mostly a data-entry problem dressed up as a finance problem — the UX win is in fast entry and clean recurring summaries, not in the math.',
        ],
      },
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
