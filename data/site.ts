import { Github, Linkedin, Twitter } from 'lucide-react';

export const siteConfig = {
  name: 'Shaik Mohammed Suhaib',
  role: 'Software engineer',
  focus: 'Full-stack · AI products · n8n automation',
  location: 'Chennai, India',
  email: 'shaiksuhaib360@gmail.com',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://shaikuhaibdev.vercel.app',
  status: 'Open to internships & freelance',

  now: [
    'wrapping a product & dev internship @ ForMen Digital Clinic',
    'PM & agentic AI cert @ IIT Patna × Masai · 2025',
    'NPTEL elite cert in Big Data Computing @ IIT Kanpur · 2025',
    'B.Tech IT @ Vel Tech Chennai',
  ],

  resumeUrl: '/resume.pdf',

  bio: [
    "I just wrapped an internship at ForMen Digital Clinic, where I spent a few months building an AI tool that explains lab reports in plain English. Most of my time goes into products that take something complicated and make it easier to understand.",
    "Outside coding I'm usually reading about space, messing with browser extensions, or losing at Souls games.",
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
        'A live AI screener built for the IIT Patna PM + Agentic AI cert. Resume PDF + JD in, a typed verdict out (score, matched skills, interview/reject), follow-up email fired automatically.',
      tech: ['n8n', 'Lovable', 'Gemini', 'Gmail API'],
      href: 'https://github.com/RIxiV1/Resume-Screening-Agent',
      liveUrl: 'https://talent-spotter-flow.lovable.app',
      accent: 'oklch(0.8 0.16 75)', // amber
      caseStudy: {
        tagline:
          'Drop in a resume and a job description, get back a typed verdict — score, matched skills, interview or reject — and an email that sends itself. My project for the IIT Patna PM & Agentic AI cert.',
        problem:
          'Recruiters check the same few things first: does this person have the skills, the experience, and does the resume actually match the role. That first pass is repetitive and mostly mechanical. I wanted to automate just that part — not the hiring decision, only the triage in front of it.',
        approach:
          'A form in Lovable (name, email, JD, resume PDF) posts to an n8n webhook. n8n pulls the text out of the PDF, hands it to a Gemini agent, and routes the result. My first version just asked Gemini to "summarise the candidate". That was useless — the answer came back different every run and the workflow had nothing to branch on. So I forced one fixed JSON shape: score, matched skills, years of experience, interview or reject, a short reason. Once the output was predictable, the IF + Gmail nodes could fire the interview or the rejection email on their own.',
        decisions: [
          {
            title: 'Lovable for the form, real work on the pipeline',
            body: 'I had about a week. Hand-coding a form and a results page that mostly shuffle JSON around would have eaten half of it, so I built the UI in Lovable in an afternoon and put the rest into the prompt and the n8n flow — the part that actually proves something.',
          },
          {
            title: 'Email routing stays out of the prompt',
            body: "I could have let the model write the emails too. I didn't. Interview-vs-rejection routing sits in the n8n nodes with plain templates, so the model only makes the call and a recruiter can edit the wording without touching a prompt.",
          },
        ],
        outcome:
          'Live at talent-spotter-flow.lovable.app — drop in a PDF and a JD and it runs end to end. Seven nodes, nine fields back from the agent, and the n8n JSON is in the repo if you want to see the wiring.',
      },
    },
    {
      title: 'InfoBlend',
      year: '2026',
      slug: 'infoblend',
      description:
        "A reading toolkit I built for myself. Manifest V3 extension for Chrome, Edge, and Firefox — double-click to define, right-click to translate, Ctrl+K to summarise. Zero deps, BYOK AI.",
      tech: ['Manifest V3', 'Shadow DOM', 'JavaScript', 'Zero deps', 'BYOK AI'],
      href: 'https://github.com/RIxiV1/InfoBlend',
      accent: 'oklch(0.72 0.18 280)', // indigo
      caseStudy: {
        tagline:
          "A reading toolkit I built for myself — define, translate, summarise, save. Works without an API key, better with one. Not on a store yet; you install it from source.",
        problem:
          "My reading setup was four extensions — dictionary, translator, summariser, flashcards. Half of them inject CSS that breaks on Medium and news sites. The other half demand an API key on first launch and just die at the install screen if you don't have one. Nobody treated \"no key\" as a real path, so the free version was always the worst version. I wanted one tool that didn't do either.",
        approach:
          "One extension, no runtime dependencies, Chrome + Edge + Firefox. Definitions try five sources in order until one resolves. Summarising runs offline; translation uses your AI key if you've set one, or a free tier if you haven't. Everything you save lands in a local vault you can export. The whole thing had to survive the MV3 service worker, which found new ways to bite the entire build — stale callbacks, sendResponse races, the audio context dying whenever the worker went to sleep.",
        decisions: [
          {
            title: 'BYOK, but the free path has to actually work',
            body: "Most AI extensions demand a key on first launch and die at the install screen if you don't have one. That always felt backwards. InfoBlend works completely without a key — offline summariser, the five-source dictionary, free-tier translation. The key only buys the smarter stuff. You opt in once you know what it's for, not before.",
          },
          {
            title: 'Shadow DOM, after normal CSS lost',
            body: "I tried injecting a normal styled div first. It broke on too many sites — the page's own CSS reached in and wrecked the overlay. Shadow DOM was the boring fix that actually worked: a real style boundary both ways, so the page can't touch the extension and the extension can't leak onto the page. The focus and slot handling took a while to get right, but it held everywhere I shipped it.",
          },
          {
            title: 'Built "Chat with the Page", then killed it',
            body: 'Spent a few days on it and ripped it out right before the v3.1.1 ship. It needed an API key, was single-turn, and didn\'t earn its place next to the simpler Define and Summarise flows. Two commits three days apart: "deepen Chat with the Page" → "rip out Chat with the Page". Bruised the ego, saved the time.',
          },
        ],
        outcome:
          "At v3.1.1, installable from source on Chrome, Edge, Brave, and Firefox. Five-source definitions, 17 translation languages, a 500-item vault. Not on a store yet — I'm still grinding through the submission checklist: privacy policy, validator fixes, proper icons, killing every last innerHTML. 35+ commits in the last cycle.",
        learnings: [
          '"Zero dependencies" started as a constraint and became the best part — every byte is auditable and nothing can break from under me.',
          "A store submission is its own little project. I didn't know that going in.",
        ],
      },
    },
    {
      title: 'SubSentry',
      year: '2025',
      slug: 'subsentry',
      description:
        "A subscription tracker that doesn't ask for your bank credentials. Swipe-gesture cards on mobile, confetti every time you cancel a sub.",
      tech: ['React', 'Vite', 'TypeScript', 'Supabase', 'Tailwind', 'Zod', 'shadcn/ui'],
      href: 'https://github.com/RIxiV1/SubSentry',
      liveUrl: 'https://ssubsentry.lovable.app',
      accent: 'oklch(0.74 0.18 15)', // rose
      caseStudy: {
        tagline:
          "A subscription tracker that never asks for your bank login. Per-user isolation in the database, warm copy instead of scolding, and a confetti burst every time you cancel a sub.",
        problem:
          "The trackers everyone uses — Rocket Money, Truebill — want bank access so they can scrape your transactions. That's a big ask for what's really just a \"remember what I'm paying for\" tool. And the manual ones feel like they're scolding you: red bars, budget warnings, copy that reads like your bank statement is yelling. I wanted the version that does neither — no bank login, and a tone that doesn't make you feel bad for opening it.",
        approach:
          "React + Vite, Supabase Postgres. Every user's rows are isolated in the database with Row Level Security, so even a buggy query can't hand back someone else's data. Forms validate with Zod. The part I spent the most time on wasn't the code — it was the tone: warm palette, encouraging copy, swipe gestures on mobile, and a confetti burst plus a \"you just saved money\" toast every time you cancel a sub.",
        decisions: [
          {
            title: 'Tone is the feature, not a polish pass',
            body: "The hard part of a money app isn't the math — it's getting someone to feel okay opening it. Red bars and warnings don't make people pay attention; they make people close the tab. So the warm copy and the confetti weren't decoration, they were the plan. Two of my early commits are literally \"Amplify Gen Z Vibe\" — the tone work is right there in the history.",
          },
          {
            title: 'Isolation in the database, not the app',
            body: "App-layer checks fail open the second you forget a `WHERE user_id = ?` on one endpoint. Row Level Security pushes the rule down into Postgres — even a buggy or compromised query physically can't return another person's rows. It costs almost nothing if you build the schema around it from the start.",
          },
          {
            title: 'No bank linking, ever',
            body: "Plaid-style aggregators are a huge privacy ask for a small convenience win. The person worth building for is the one who'd rather just type their subs in than hand bank credentials to an app they've never heard of. Saying no to the \"industry-standard\" feature is the whole point — it's what keeps every other privacy claim honest.",
          },
        ],
        outcome:
          'Live at ssubsentry.lovable.app. Solo build over about three weeks (Nov 11 – Dec 4, 2025), 20-odd commits. Auth, add/edit/delete subs, budgets with caps, spending by category, swipe gestures on mobile, and the confetti moment all work.',
        learnings: [
          "If I could tell past-me one thing: personal-finance UX is a tone problem wearing a math problem's clothes. Fix the tone first.",
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
        "Built an AI tool that turns men's-health lab reports into plain English. Owned it end to end — PRD, research, UI, and the build.",
    },
    {
      role: 'Certificate Program — Product Management & Agentic AI',
      org: 'IIT Patna × Masai (Vishlesan i-Hub Foundation) — Online / Hybrid',
      period: 'Apr 2025 — Oct 2025',
      description:
        'Full product lifecycle — market research, MVP scoping, iterative launches. Built agentic automation in n8n + LLMs.',
    },
    {
      role: 'NPTEL Elite Certification — Big Data Computing',
      org: 'SWAYAM–NPTEL · IIT Kanpur — Online',
      period: 'Completed Oct 2025',
      description:
        'Elite-track NPTEL course on distributed processing, Hadoop, and large-scale data systems.',
    },
    {
      role: 'B.Tech, Information Technology',
      org: 'Vel Tech High Tech Engineering College, Chennai',
      period: 'Jun 2024 — May 2028 (Expected)',
      description:
        'Full-stack, AI agents, intelligent systems. Five public GitHub repos across web, browser extensions, and AI automation.',
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
        'How Netflix, Spotify, and your feed decide what to show you next. The math without the notation.',
      date: 'Published',
      tag: 'AI/ML',
      url: 'https://medium.com/@shaiksuhaib360/recommendation-systems-the-math-behind-netflix-spotify-and-social-media-feeds-d61cfd501ba0',
    },
    {
      title: 'Network Theory: The Science of Connections',
      description:
        'Six degrees of Kevin Bacon, why diseases spread, and the equations that explain both.',
      date: 'Published',
      tag: 'Math',
      url: 'https://medium.com/@shaiksuhaib360/network-theory-how-everything-connects-56a54ee1265a',
    },
    {
      title: 'Chaos Theory & The Butterfly Effect',
      description:
        'Why a butterfly in Tokyo can shift weather in New York — and what that means for anything we try to predict.',
      date: 'Published',
      tag: 'Science',
      url: 'https://medium.com/@shaiksuhaib360/why-chaos-theory-explains-science-of-the-butterfly-effect-368dd5f34b7f',
    },
  ],

  metadata: {
    title: 'Shaik Suhaib — software engineer',
    description:
      'I build software that makes complicated things easier to understand — most recently an AI tool at ForMen Digital Clinic that explains lab reports in plain English.',
    twitterHandle: '@suhaibX0',
  },
};
