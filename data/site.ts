import { Github, Linkedin, Twitter } from 'lucide-react';

export const siteConfig = {
  name: 'Shaik Mohammed Suhaib',
  role: 'Product-minded software engineer',
  focus: 'Full-stack · AI products · n8n automation',
  location: 'Chennai, India',
  email: 'shaiksuhaib360@gmail.com',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://shaikuhaibdev.vercel.app',
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
        'An end-to-end AI resume screener. A Lovable-built form posts a resume PDF and job description to an n8n webhook; a Gemini agent returns a typed JSON verdict — overall score, confidence, matched skills, years of relevant experience, an interview/reject recommendation, and recommended next steps. Optional Gmail nodes auto-route interview or rejection emails. IIT Patna Product Management & Agentic AI capstone.',
      tech: ['n8n', 'Lovable', 'Gemini', 'Gmail API'],
      href: 'https://github.com/RIxiV1/Resume-Screening-Agent',
      liveUrl: 'https://talent-spotter-flow.lovable.app',
      accent: 'oklch(0.8 0.16 75)', // amber
      caseStudy: {
        tagline:
          'A live AI resume screener that takes a PDF + JD and returns a typed JSON verdict — overall score, matched skills, years of experience, interview/reject recommendation, and auto-routed follow-up emails. Built as the IIT Patna Product Management & Agentic AI capstone.',
        problem:
          'Recruiters at small companies spend hours on first-pass screening where most resumes are clearly off-fit. The "is this candidate worth a call" decision is structured enough — must-have skills, years of experience, role match — that an LLM can extract it reliably, if you commit to a typed contract instead of free-form text and let an orchestrator handle the side effects.',
        approach:
          'A Lovable-built form (full name, email, JD text, resume PDF) posts to an n8n webhook. The workflow moves the binary, extracts text from the PDF, merges it with the JD into a clean object, and hands it to an AI Agent node running Gemini. The agent returns a strict JSON shape: overall_score, confidence, summary, strengths, matched_skills, years_relevant_experience, recommendation (interview | reject), short_reason, recommended_next_steps. n8n returns the JSON to Lovable for display, and an optional IF + Gmail branch sends either an interview invite or a polite rejection based on the recommendation.',
        decisions: [
          {
            title: 'Lovable for the UI, hand-tuned everything else',
            body: 'A 6-day capstone window meant front-end yak-shaving would cost the actual engineering work. Lovable gave me a working form + results page with field mapping to the webhook — usable in an afternoon. That bought back days for the part of this project that actually proves the skill: the prompt design, the n8n flow, the typed contract.',
          },
          {
            title: 'A typed JSON contract, not a summary string',
            body: 'The first prompt asked Gemini to "summarise the candidate". Useless — the downstream IF node can\'t branch on prose. Rewriting it to demand a fixed JSON shape — overall_score, recommendation, short_reason, matched_skills — turned the LLM into a callable function. The workflow downstream became a straightforward switch on recommendation; the prompt iteration loop became "fix the schema until the JSON validates", which is a tighter feedback loop than reading paragraphs.',
        },
          {
            title: 'Email branching at the workflow layer, not in the prompt',
            body: 'It would be tempting to ask the LLM to also draft the email. I didn\'t — interview vs rejection routing lives in the n8n IF + Gmail nodes, with templated copy. Keeps the LLM focused on judgment, keeps side effects auditable in the workflow execution log, and means a recruiter can edit the email templates without touching the prompt.',
          },
        ],
        outcome:
          'Live deployment at talent-spotter-flow.lovable.app, accepting PDF uploads and returning a full JSON screening in seconds. Submitted as the IIT Patna Product Management & Agentic AI capstone. The n8n workflow JSON is in the repo so the pipeline is reproducible end-to-end.',
        learnings: [
          'Demand a typed JSON contract from the LLM upfront. Iterating on prose outputs is slow; iterating on a schema is mechanical.',
          'No-code where it doesn\'t matter, code where it does. The form was throwaway; the prompt + workflow is what proves the engineering.',
          'n8n\'s execution log doubles as the prompt debugger — every input, output, and intermediate transform is inspectable without server logs.',
        ],
      },
    },
    {
      title: 'InfoBlend',
      year: '2026',
      slug: 'infoblend',
      description:
        'A Manifest V3 reading toolkit for Chrome, Edge, and Firefox. Double-click any word for definitions cascaded across Dictionary, Datamuse, Wiktionary, Wikipedia, and Urban Dictionary. Right-click to translate selections (17 languages) with idiom-aware AI or a MyMemory free fallback. Ctrl+K summarises the page locally via TF-IDF, upgraded by Gemini/OpenAI when a BYOK key is set. Knowledge Vault saves any overlay to local storage with CSV/Markdown export. Zero dependencies, AES-GCM-encrypted API key, Shadow DOM isolation.',
      tech: ['Manifest V3', 'Shadow DOM', 'JavaScript', 'Zero deps', 'BYOK AI'],
      href: 'https://github.com/RIxiV1/InfoBlend',
      accent: 'oklch(0.72 0.18 280)', // indigo
      caseStudy: {
        tagline:
          'A BYOK cross-browser reading toolkit — definitions, translation, summaries, knowledge vault — fully usable without an API key, smarter with one, and physically unable to leak page styles. Not yet published; installable from source today.',
        problem:
          'Reading tools are fragmented: dictionary, translator, summariser, and flashcards are four extensions. Most of them inject CSS that fights with the host site\'s styles, leaving a UI that breaks on Medium, news sites, and anywhere with aggressive global styling. And the ones that bolt on an LLM usually do it badly — required API key upfront, no free path, no fallback when the call fails.',
        approach:
          'A single Manifest V3 extension targeting Chrome, Edge, and Firefox with zero runtime dependencies. Every visible overlay renders inside a Shadow DOM root for complete style isolation in both directions. Definitions cascade through five sources in a sensible order — Dictionary → Datamuse → Wiktionary → Wikipedia → Urban Dictionary — falling back automatically until one resolves. Local TF-IDF extractive summarisation runs offline for instant feedback; AI providers (Gemini, OpenAI, or any custom endpoint) upgrade quality when configured. Translation routes through the user\'s AI key when present, MyMemory\'s free tier when not. Knowledge Vault saves overlays to chrome.storage.local (500-item LRU) with CSV/Markdown export. The AI key is AES-GCM encrypted before storage.',
        decisions: [
          {
            title: 'BYOK with a real free path',
            body: 'Most LLM extensions require an API key on first launch and die at the install screen. InfoBlend is fully functional without one — local TF-IDF summaries, the five-source dictionary chain, MyMemory translation. The AI key only unlocks context-aware lookups, idiom-preserving translation, and prose summaries. Users opt in once they understand the value, not before.',
          },
          {
            title: 'Shadow DOM around every UI element',
            body: 'Inject a div and !important your way through and you still lose to higher-specificity selectors on hostile pages. Shadow DOM gives complete style isolation in both directions — the page can\'t reach in, the extension can\'t leak out. The learning curve (CSS variables, slot composition, focus traversal) pays back the moment you ship to a real browser on a real site.',
          },
          {
            title: 'Cascade of definition sources, not a single API',
            body: 'No one source covers everything. Dictionary handles common English with phonetics and audio. Datamuse fills in technical terms and CEFR difficulty badges. Wiktionary handles rare and multilingual. Wikipedia catches proper nouns with thumbnails. Urban Dictionary is the universal slang catch-all. Each is tried in order; the user never sees a "no results" page on a word that exists anywhere.',
          },
          {
            title: 'Killing "Chat with the Page" before shipping it',
            body: 'Built it, then ripped it out before the v3.1.1 ship. It required an API key, was single-turn, and didn\'t pull its weight against the simpler Summarize + Define flows. Two commits — "deepen Chat with the Page" → "rip out Chat with the Page (low value, single-turn, AI-key-only, weak workflow)". The right call costs ego, not engineering time.',
          },
        ],
        outcome:
          'Version 3.1.1, installable from source today on Chrome, Edge, Brave, and Firefox. Not yet published to either store — currently doing the submission-readiness work: PRIVACY.md added, AMO validator fixes landed, CWS-required metadata in place, square icons, no innerHTML. 35+ commits in the most recent ship cycle alone.',
        learnings: [
          'The MV3 service-worker lifecycle bites you in subtle ways — stale callbacks, sendResponse races, audio context loss on suspend. Designing for it from day one is much cheaper than retrofitting an MV2 codebase.',
          '"Zero dependencies" sounded like a constraint and became a feature — every byte is auditable for store reviewers, and the extension survives any single dependency\'s breaking change.',
          'A store submission is its own engineering project: PRIVACY.md, AMO validator rules, data_collection_permissions, square icons, no innerHTML. Worth doing up-front the second time around.',
        ],
      },
    },
    {
      title: 'SubSentry',
      year: '2025',
      slug: 'subsentry',
      description:
        'Your fin-bestie for tracking subscriptions — no bank linking, ever. React + Vite + Supabase with Row Level Security for physical per-user isolation. Budgeting tool, spending insights, swipe-gesture card controls, and a canvas-confetti "Slay moment" every time you cancel a sub. Tuned for empowerment, not alarm.',
      tech: ['React', 'Vite', 'TypeScript', 'Supabase', 'Tailwind', 'Zod', 'shadcn/ui'],
      href: 'https://github.com/RIxiV1/SubSentry',
      liveUrl: 'https://ssubsentry.lovable.app',
      accent: 'oklch(0.74 0.18 15)', // rose
      caseStudy: {
        tagline:
          'A subscription tracker that never asks for your bank credentials — RLS-enforced isolation, GenZ-tone copy, and a confetti animation every time you cancel a sub.',
        problem:
          'Established subscription trackers (Rocket Money, Truebill) require bank linking to scrape transactions. That works, but it\'s a steep privacy ask for what is fundamentally a "remember what I\'m paying for" tool. And the manual-entry alternatives tend to feel cold — red bars, budget warnings, accusatory copy — which is exactly the wrong tone for someone trying to take control. The user who\'d rather type in subscriptions in exchange for not sharing credentials hasn\'t had a kind product built for them.',
        approach:
          'React + Vite frontend on Supabase Postgres. Per-user data isolation enforced at the database layer with Row Level Security — subscriptions are physically unqueryable by anyone but their owner, independent of what the app code does. Forms validated with Zod schemas. shadcn/ui + Tailwind for the design system, tuned to feel "empowering, not alarming". Mobile swipe gestures on subscription cards. A canvas-confetti burst plus a "you just saved money" toast fires every time a sub is cancelled — the "Slay moment". A Spending Insights page breaks monthly cost down by category; a Budgeting Tool lets users set caps with inline validation.',
        decisions: [
          {
            title: 'Tone as a product feature, not decoration',
            body: 'The hardest part of personal-finance UX isn\'t the math — it\'s making someone feel safe enough to open the app. Red bars and budget warnings don\'t make people pay attention; they make people close the tab. The "vibe-coded" copy (GenZ-first validation messages, confetti for cancellations, an "empowering, not alarming" palette) wasn\'t a polish pass. It was the product strategy. Two of my early commits are literally "Amplify Gen Z Vibe" — the tone work is in version control.',
          },
          {
            title: 'Supabase RLS instead of app-layer auth checks',
            body: 'App-layer checks fail open the moment you forget a `WHERE user_id = ?` on one endpoint. RLS pushes the rule into the database — even a buggy or malicious query physically cannot return another user\'s rows. It\'s the right default for any consumer app where data is sensitive, and it costs almost nothing if you design your schema with it in mind from day one.',
          },
          {
            title: 'No bank linking, ever',
            body: 'Plaid-style aggregators are a 10× privacy ask for a 1× convenience win. The wedge is the user who\'d rather type a subscription than hand off credentials to a third-party aggregator they\'ve never heard of. Saying no to the "industry-standard" feature is the differentiator — and it\'s the single decision that lets every other privacy claim be honest.',
          },
          {
            title: 'Zod schemas as the single source of truth for shape',
            body: 'One schema, two consumers — react-hook-form on the client and the API on the server both parse the same Zod schema. No drift between client and server validation; types fall out for free. Eliminates a whole bug class — "form said it was valid, API disagreed" — at the type level, not at runtime.',
          },
        ],
        outcome:
          'Live demo at ssubsentry.lovable.app. Solo build over roughly three weeks (Nov 11 → Dec 4 2025). Working flows: auth, add/edit/delete subscriptions, budgeting tool with caps and inline validation, spending insights by category, swipe-gesture mobile controls, and the confetti "Slay" moment on cancellation.',
        learnings: [
          'Personal finance UX is mostly a tone problem dressed up as a math problem. Solve the tone, the math follows — users won\'t look at the numbers if the app shames them for the numbers.',
          'Supabase RLS is the right answer for any multi-tenant consumer app — designing schema with policies in mind from day one is much cheaper than bolting them on later.',
          'Zod-as-source-of-truth eliminates "client and server disagree about valid" bugs at the type level. Sharing one schema between react-hook-form and the API is worth the small upfront cost.',
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
