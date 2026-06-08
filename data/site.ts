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
    'shipping a consumer health AI tool @ ForMen Digital Clinic',
    'PM & agentic AI cert @ IIT Patna',
    'B.Tech IT @ Vel Tech Chennai',
  ],

  resumeUrl: '/resume.pdf',

  bio: [
    "I'm currently interning at ForMen Digital Clinic, where I'm building a consumer-facing AI tool that turns men's-health lab reports into something you'd actually want to read. IT undergrad at Vel Tech Chennai, doing a Product Management & Agentic AI cert at IIT Patna on the side.",
    "Stack I keep coming back to: TypeScript, React, Supabase, n8n, and Gemini for the agentic stuff.",
    "When I'm not shipping things, I'm writing about the math behind discovery — recommendation systems, network theory, why small changes compound into big ones. Three essays on Medium so far. Oh, and I play too many Souls games and suck at chess.",
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
          'A live AI screener that reads a resume against a JD and returns a typed JSON verdict — score, matched skills, years of experience, interview or reject, and an auto-sent email. Built for the IIT Patna PM & Agentic AI cert.',
        problem:
          'First-pass resume screening is mostly the same loop: open PDF, scan for must-have skills, check years of experience, decide if this is a callback or a no. Most resumes are clearly off-fit. The decision is structured enough that an LLM can do the first pass reliably — if you commit to a typed contract instead of asking it to "summarise the candidate", and let an orchestrator handle the side effects.',
        approach:
          'The form is built in Lovable (full name, email, JD text, resume PDF). On submit it posts to an n8n webhook. The workflow moves the binary, extracts text from the PDF, merges it with the JD, and hands the whole thing to an AI Agent node running Gemini. The agent returns a fixed JSON shape: overall_score, confidence, summary, strengths, matched_skills, years_relevant_experience, recommendation (interview | reject), short_reason, recommended_next_steps. n8n returns the JSON to Lovable. If the recommendation is "interview", an IF + Gmail node fires the invite; if "reject", the polite version.',
        decisions: [
          {
            title: 'Lovable for the UI, real engineering for everything else',
            body: 'A 6-day window meant I had to pick where to spend the days. Hand-coding a form + results page that mostly just shuffles JSON would have eaten half of it. Lovable gave me both in an afternoon. The time that bought back went into the prompt design, the n8n flow, and getting the typed contract right — which is what the project actually demonstrates.',
          },
          {
            title: 'A typed JSON contract beats a "summary"',
            body: 'My first prompt asked Gemini to "summarise the candidate". Useless — the downstream IF node has nothing to branch on when the answer is prose. Rewriting it to demand a fixed shape (overall_score, recommendation, short_reason, matched_skills…) turned the LLM into a callable function. The iteration loop went from "read paragraphs, judge vibes" to "does this JSON validate". Much tighter.',
          },
          {
            title: 'Email branching lives in n8n, not in the prompt',
            body: "Tempting to ask the LLM to write the email too. I didn't. Interview vs rejection routing sits in the n8n IF + Gmail nodes with templated copy. Keeps the model focused on the judgment, keeps the side effects visible in the workflow log, and means a recruiter can edit the templates without anyone touching the prompt.",
          },
        ],
        outcome:
          'Live at talent-spotter-flow.lovable.app — anyone can drop in a PDF and a JD. The workflow runs 7 nodes (webhook → text extraction → Gemini agent → optional Gmail). The agent returns 9 fields. The n8n JSON is in the repo so the whole pipeline is reproducible. Submitted as the course project for the IIT Patna PM & Agentic AI cert.',
        learnings: [
          'Demand a typed JSON contract from the LLM before you start tuning the prompt. Iterating on prose is slow; iterating on a schema is mechanical.',
          "No-code where it doesn't matter, real code where it does. The form was throwaway — the prompt + workflow is what proves the engineering.",
          "n8n's execution log is the prompt debugger. Every input, intermediate, and output is right there without spelunking server logs.",
        ],
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
          "A cross-browser reading toolkit I built for myself — definitions, translation, summaries, knowledge vault. Fully usable without an API key, smarter with one. Not on any store yet; you install it from source.",
        problem:
          'My reading setup used to be four extensions — dictionary, translator, summariser, flashcards. Half of them inject CSS that breaks on Medium and news sites. Half require an API key on first launch and die at the install screen if you don\'t have one. None of them treated "no key" as a real path, so the free experience was always the degraded one.',
        approach:
          "One Manifest V3 extension, zero runtime dependencies, Chrome + Edge + Firefox. Every overlay renders inside a Shadow DOM so the host page can't reach in and the extension can't leak out. Definitions try five sources in order until one resolves. Local TF-IDF summarisation runs offline. Translation routes through whatever AI key you've set, or MyMemory's free tier if you haven't. The Knowledge Vault keeps the last 500 things you saved in local storage with CSV/Markdown export. The API key is AES-GCM-encrypted before it touches storage.",
        decisions: [
          {
            title: 'BYOK — but the free path has to actually work',
            body: "Most LLM extensions demand a key on first launch and die at the install screen. Felt wrong. InfoBlend works completely without one — local summariser, the five-source dictionary chain, MyMemory translation. The key only unlocks the smarter stuff (context-aware lookups, idiom-preserving translation, prose summaries). Users opt in once they understand what they're paying for, not before.",
          },
          {
            title: 'Shadow DOM around every UI element',
            body: "Inject a div and `!important` your way through and you still lose to specific selectors on hostile pages. Shadow DOM is a full style boundary in both directions — the page can't reach into the extension, the extension can't leak out. The learning curve (CSS variables, slot composition, focus traversal) is real, but it pays back the first time you ship to a real browser on a real site and it just works.",
          },
          {
            title: 'Five definition sources, one cascade',
            body: 'No one source covers everything. Dictionary handles common English with phonetics and audio. Datamuse fills in tech terms and CEFR difficulty. Wiktionary covers rare and multilingual. Wikipedia catches proper nouns with a thumbnail. Urban Dictionary is the universal slang catch-all. They\'re tried in order; the user never hits a "no results" page on a word that exists somewhere.',
          },
          {
            title: '"Chat with the Page" — built it, killed it',
            body: 'Spent days on it. Ripped it out before the v3.1.1 ship. It needed an API key, was single-turn, and didn\'t pull its weight against the simpler Summarize and Define flows. Two commits, three days apart: "deepen Chat with the Page" → "rip out Chat with the Page (low value, single-turn, AI-key-only, weak workflow)". Cost ego, saved engineering time.',
          },
        ],
        outcome:
          'Currently at v3.1.1. Installable from source on Chrome, Edge, Brave, and Firefox today. Five-source definition chain. 17 translation languages. 500-item Knowledge Vault. Not on any store yet — currently doing the submission-readiness work (PRIVACY.md, AMO validator fixes, CWS metadata, square icons, no innerHTML). 35+ commits in the most recent ship cycle.',
        learnings: [
          'The MV3 service-worker lifecycle finds creative ways to bite you — stale callbacks, sendResponse races, audio context dying on suspend. Designing for it from day one is way cheaper than retrofitting.',
          '"Zero dependencies" sounded like a constraint and became a feature. Every byte is auditable for store reviewers, and a single dep going sideways can\'t take you down.',
          "A store submission is its own little project. PRIVACY.md, AMO validator rules, data_collection_permissions, square icons, no innerHTML. Worth knowing the checklist upfront — I didn't the first time.",
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
          'A subscription tracker that never asks for your bank credentials. RLS-isolated at the database layer, GenZ-tone copy, and a confetti burst every time you cancel a sub.',
        problem:
          'The existing subscription trackers (Rocket Money, Truebill) want bank access so they can scrape transactions. That works, but it\'s a steep ask for what is fundamentally a "remember what I\'m paying for" tool. The manual-entry alternatives mostly feel like accusations — red bars, budget warnings, copy that reads like your bank statement is yelling at you. Wrong tone for someone trying to take control. I wanted to build the kind version.',
        approach:
          'React + Vite on the front, Supabase Postgres on the back. Per-user isolation lives in the database via Row Level Security — even buggy app code can\'t return another user\'s rows. Forms validated with Zod. shadcn/ui + Tailwind, palette and copy tuned to feel encouraging instead of accusing. Swipe gestures on mobile cards. A canvas-confetti burst plus a "you just saved money" toast every time you cancel a sub — the "Slay moment". Spending Insights breaks monthly cost down by category; the Budgeting Tool lets you set caps with inline validation.',
        decisions: [
          {
            title: 'Tone is the feature',
            body: "The hardest part of personal-finance UX isn't the math — it's making someone feel safe enough to open the app. Red bars and budget warnings don't make people pay attention; they make people close the tab. The GenZ-first copy, the confetti on cancellations, the warm palette — that wasn't a polish pass. It was the actual strategy. Two of my early commits are literally \"Amplify Gen Z Vibe\". The tone work is in version control.",
          },
          {
            title: 'Supabase RLS, not app-layer checks',
            body: "App-layer checks fail open the moment you forget a `WHERE user_id = ?` on one endpoint. RLS pushes the rule into the database — even a buggy or compromised query physically can't return someone else's rows. Costs almost nothing if you design the schema with it in mind from day one, and it's the right default for any consumer app with sensitive data.",
          },
          {
            title: 'No bank linking. Ever.',
            body: "Plaid-style aggregators are a huge privacy ask for a small convenience win. The user worth competing for here is the one who'd rather type subs in than hand off credentials to an aggregator they've never heard of. Saying no to the \"industry-standard\" feature is the wedge — and the only way every other privacy claim on the site stays honest.",
          },
          {
            title: 'Zod as the single source of shape',
            body: 'One schema, two consumers — react-hook-form on the client, the API on the server. Both parse the same Zod object. No drift between client and server validation, types fall out for free. Kills a whole bug class — "the form said valid, the API disagreed" — at the type level.',
          },
        ],
        outcome:
          'Live at ssubsentry.lovable.app. Solo build over roughly three weeks (Nov 11 → Dec 4 2025), 20+ commits across UI/UX, validation, the budgeting tool, and the GenZ-tone pass. Working flows: auth, add/edit/delete subscriptions, budgeting with caps and inline validation, spending insights by category, swipe-gesture mobile controls, and the confetti "Slay" moment.',
        learnings: [
          'Personal finance UX is mostly a tone problem dressed up as a math problem. Fix the tone and people will actually look at the numbers.',
          "Supabase RLS is the right default for any multi-tenant consumer app. Design the schema with policies in mind from day one; it's much cheaper than bolting them on.",
          'Zod-as-source-of-truth eliminates a whole bug class at the type level, not at runtime. The small upfront cost of sharing one schema between the form and the API is worth it.',
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
        "Building a consumer-facing AI tool that turns men's-health lab reports into plain-language, interactive explanations. PRD to working product — research notes, requirements, UI, implementation.",
    },
    {
      role: 'Certification — Product Management & Agentic AI',
      org: 'Indian Institute of Technology (IIT), Patna — Online / Hybrid',
      period: 'Jan 2025 — Present',
      description:
        'Full product lifecycle — market research, MVP scoping, iterative launches. Agentic automation in n8n + LLMs.',
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
    title: 'shaik suhaib — product-minded software engineer',
    description:
      'IT undergrad in Chennai building product-shaped AI things. ForMen Digital Clinic + Vel Tech + IIT Patna.',
    twitterHandle: '@suhaibX0',
  },
};
