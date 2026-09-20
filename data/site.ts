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
    { name: 'Work', href: '#work' },
    { name: 'Experience', href: '#experience' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ],

  projects: [
    {
      title: 'InfoBlend',
      year: '2026',
      slug: 'infoblend',
      status: 'LIVE',
      builtBecause: 'I was reading with four extensions open and got tired of it.',
      description: 'A browser extension to define, translate, and summarize text.',
      tech: ['Manifest V3', 'Shadow DOM', 'JavaScript'],
      heroMetric: { value: '17', label: 'languages' },
      href: 'https://github.com/RIxiV1/InfoBlend',
      liveUrl: 'https://addons.mozilla.org/en-US/firefox/addon/infoblend/',
      image: '/projects/infoblend-live.png',
      imagePosition: 'center',
      caseStudy: {
        tagline: 'A reading toolkit. It defines, translates, and summarizes. It also actually works if you don’t have an API key.',
        problem: "I was reading with four extensions open and got tired of it, so I built one. Half of the old ones injected CSS that broke websites, and the rest refused to work at all unless you gave them an API key right away.",
        approach: "I built one extension that just works. If you don't plug in a key, it uses a free tier for translation and runs the summarizer offline. If you do add a key, it uses your AI. Figuring out Manifest V3 service workers was a headache, but I got it working.",
        decisions: [
          { title: 'Making it work for free', body: "It's annoying when extensions are dead weight until you add a key. InfoBlend works fine without one. You only add an API key if you want better translations." },
          { title: 'Shadow DOM', body: "At first, every website's CSS would accidentally style my extension and break it. I learned about Shadow DOM and used it to completely wall off my extension's code from the rest of the page." },
          { title: 'Deleting features', body: 'I built a "Chat with the Page" feature. It sounded cool, but it was slow and clunky. I ended up just deleting the whole thing before launch.' }
        ],
        outcome: 'It’s published on Firefox Add-ons. It supports 17 languages and it doesn\'t break the websites you use it on.'
      },
    },
    {
      title: 'Caliber',
      year: '2026',
      slug: 'caliber',
      status: 'EXPERIMENT',
      builtBecause: 'I wanted to see if an LLM could actually screen resumes consistently.',
      description: 'An AI resume screener. Upload a CV and job description, and it spits out a score with reasoning.',
      tech: ['React', 'Supabase', 'Postgres', 'Gemini'],
      heroMetric: { value: '0.87', label: "Cohen's κ" },
      href: 'https://github.com/RIxiV1/CVibe',
      liveUrl: 'https://cvibe.lovable.app',
      image: '/projects/caliber.png',
      caseStudy: {
        tagline: 'Upload a resume and a job description, get a score and some reasoning back. I built it to see if an LLM could actually do a recruiter’s first pass without completely messing it up.',
        problem: "The first pass of reading a resume is basically just checking boxes—skills, years of experience, etc. It's perfectly suited for an LLM. I tried building this with n8n first, but relying on a hosted webhook that kept expiring was annoying.",
        approach: "I rebuilt it from scratch as a proper app. It uses React on the front end and Supabase on the back. It extracts text from a PDF, sends it to Gemini for scoring, and drops the result into a Postgres database. Nothing happens automatically unless a human actually hits 'send'.",
        decisions: [
          { title: 'Dropping n8n', body: "The original webhook kept expiring, which meant I couldn't even share a link to the project without worrying it would break. Rebuilding it with edge functions was more work, but now it actually stays alive." },
          { title: 'Locking it down', body: "I didn't want random people submitting garbage to the database, so I locked the resumes behind Row Level Security in Postgres. Only 'admins' can see them." },
          { title: '"Vibes" aren\'t a metric', body: 'At first I just eyeballed the AI\'s output and thought it looked fine. Then I ran a real test on 12 resumes and realized the LLM was wildly inconsistent at deciding who gets an interview. I had to hardcode the final decision based strictly on the raw score.' }
        ],
        outcome: 'It works and it\'s live. On my test set, it agreed with my own human labels 11 out of 12 times. Mostly I learned that getting the AI to work is easy, but making it reliable is the hard part.'
      },
    },
    {
      title: 'SubSentry',
      year: '2025',
      slug: 'subsentry',
      status: 'LIVE',
      builtBecause: "I didn't want to hand my bank login over to an app, so this one doesn't ask for yours.",
      description: "A simple subscription tracker.",
      tech: ['React', 'Supabase', 'Tailwind'],
      heroMetric: { value: 'RLS', label: 'ISOLATION' },
      href: 'https://github.com/RIxiV1/SubSentry',
      liveUrl: 'https://ssubsentry.lovable.app',
      image: '/projects/subsentry.png',
      caseStudy: {
        tagline: 'A subscription tracker that never asks for your bank login. It also throws confetti when you cancel something.',
        problem: "Every finance app wants your bank login to scrape your transactions. I didn't want to hand mine over, so I built a tracker that doesn't ask for yours. I also got tired of finance apps yelling at me with red budget warnings.",
        approach: 'I put it together with React and Supabase. The main focus was making sure the data was securely isolated in the database, and making the app feel positive instead of stressful to use.',
        decisions: [
          { title: 'No bank logins', body: "I decided it would never link to a bank. It's for people who would rather spend 30 seconds typing in their Netflix subscription manually than hand over their credentials to a random app." },
          { title: 'Database isolation', body: "I used Row Level Security in Postgres to isolate everyone's data. That way, even if I write a bad API call on the frontend, the database physically won't let one user see another user's stuff." },
          { title: 'Confetti', body: "Money apps are stressful. I wanted this one to feel good, so I added swipe gestures and a confetti burst when you delete a subscription." }
        ],
        outcome: 'It’s live. You can add your subs, set budgets, and it works securely.'
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
