import { Github, Linkedin } from 'lucide-react';

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
    "I'm 20, studying IT at Vel Tech in Chennai. I mostly build things because something annoyed me and I wanted it to stop.",
    "Outside that I'm reading about space, tinkering with browser extensions, or losing at Souls games.",
  ],

  socials: [
    { icon: Github, href: 'https://github.com/RIxiV1', label: 'GitHub', handle: '@RIxiV1' },
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/shaiksuhaib',
      label: 'LinkedIn',
      handle: 'in/shaiksuhaib',
    },
  ],

  navLinks: [
    { name: 'Approach', href: '#approach' },
    { name: 'Work', href: '#work' },
    { name: 'Writing', href: '#writing' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ],

  projects: [
    {
      title: 'ResumeScreen',
      year: '2025',
      slug: 'resumescreen',
      hook: 'My first version just asked the AI to "summarise the candidate." Useless.',
      description:
        "I wanted to see if I could hand the boring first pass of resume screening to an agent. Drop in a resume and a job description, get back a clear interview-or-reject with reasons, and the email sends itself. Built for the IIT Patna PM & Agentic AI cert.",
      tech: ['n8n', 'Lovable', 'Gemini', 'Gmail API'],
      href: 'https://github.com/RIxiV1/Resume-Screening-Agent',
      liveUrl: 'https://talent-spotter-flow.lovable.app',
      accent: '#b0803f', // brass
      caseStudy: {
        tagline:
          'Drop in a resume and a job description, get back a typed verdict — score, matched skills, interview or reject — and an email that sends itself. My project for the IIT Patna PM & Agentic AI cert.',
        problem:
          "The first pass of screening a resume is the same three checks every time: does this person have the skills, the years, and does the resume even match the role. It's repetitive and mechanical — exactly the kind of thing I'd rather not do by hand. So I tried handing just that part to an agent. Not the hiring call, just the triage in front of it.",
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
      hook: 'I built "Chat with the Page," then ripped it out before shipping.',
      description:
        "I was reading with four extensions open and got tired of it, so I built one. Define a word, translate a line, summarise a page — and it still works if you never add an API key. Chrome, Edge, Firefox.",
      tech: ['Manifest V3', 'Shadow DOM', 'JavaScript', 'Zero deps', 'BYOK AI'],
      href: 'https://github.com/RIxiV1/InfoBlend',
      accent: '#59624b', // olive
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
      },
    },
    {
      title: 'SubSentry',
      year: '2025',
      slug: 'subsentry',
      hook: "The hard part was never the code — it was making a money app that doesn't scold you.",
      description:
        "A subscription tracker that never asks for your bank login — I didn't want to hand mine over, so it doesn't ask for yours. It also celebrates when you cancel something instead of nagging you about it.",
      tech: ['React', 'Vite', 'TypeScript', 'Supabase', 'Tailwind', 'Zod', 'shadcn/ui'],
      href: 'https://github.com/RIxiV1/SubSentry',
      liveUrl: 'https://ssubsentry.lovable.app',
      accent: '#a45a3a', // rust
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
      },
    },
  ],

  experience: [
    {
      role: 'Product & Development Intern',
      org: 'ForMen Digital Clinic — Remote',
      period: 'Mar 2026 — Jun 2026',
      description:
        "Built an AI tool that reads a men's-health blood report and explains it in plain English — so someone can open it, see what's going on, and not panic. Did it end to end: research, PRD, UI, and the build.",
    },
    {
      role: 'Certificate Program — Product Management & Agentic AI',
      org: 'IIT Patna × Masai (Vishlesan i-Hub Foundation) — Online / Hybrid',
      period: 'Apr 2025 — Oct 2025',
      description:
        'Six months on the full product loop — research, scoping an MVP, shipping, iterating. The hands-on part was building the agent workflows in n8n + LLMs.',
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
        "Where I'm doing my degree. Honestly most of what I've learned is in the projects — five public repos across web apps, browser extensions, and AI automation.",
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
      'I like building software that takes something confusing and makes it make sense — most recently an AI tool at ForMen Digital Clinic that explains blood reports in plain English.',
  },
};
