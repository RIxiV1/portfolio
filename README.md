# portfolio-suhaib

<div align="center">

### Personal developer portfolio

**Next.js · TypeScript · Tailwind CSS · Framer Motion**

[Live Site](https://portfolio-suhaib.vercel.app/) · [Repository](https://github.com/RIxiV1/portfolio-suhaib)

<!-- Tech badges (optional) -->
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat&logo=framer&logoColor=white)

</div>

---

This is my personal portfolio site—built to showcase my work, background, and writing in one place without extra noise. The design leans dark and minimal: fast to load, easy to read, and focused on the content.

## Preview

> Add a screenshot/GIF here (recommended): `public/og.png` or a short screen capture.

## Table of Contents

- [Features](#features)
- [Sections](#sections)
- [Under the Hood](#under-the-hood)
- [Quick Start](#quick-start)
- [Customize](#customize)
- [Deploy](#deploy)
- [License](#license)
- [Contact](#contact)

## Features

- **Single-page layout** with clearly separated sections
- **Project modals** for deep dives without leaving the page
- **Scroll reveals** powered by `IntersectionObserver`
- **Reusable design utilities** (glass cards, badges)
- **Centralized data/config** for easy updates

## Sections

### 🏠 Hero

The landing view shows my name, a short tagline, and links to get in touch or jump straight to my work. An “Available for work” badge pulses when I’m actively looking.

### 🗂 Projects

Projects are split into two groups:

- **Featured** — full-width cards with a screenshot, description, tag list, and a direct GitHub link.
- **Other** — a compact grid with hover effects and a quick-view overlay.

Clicking any card opens a modal with a larger image, a full description, a live code snippet showing the architecture, and links to the repository.

### 👤 About

A bento-style grid with:

- A bio card with a short personal description.
- A location tile (India, remote-friendly).
- An open-to-work indicator with a count of public projects.
- A focus area list: full-stack, AI tooling, browser extensions.
- A “Currently” card with what I’m up to right now.

### 🗓 Journey (Experience)

A vertical timeline of work, education, and project milestones. Each entry includes a role, org, time period, description, and tags. Icons distinguish between employment, education, and personal projects.

### ⚙️ Toolkit

An auto-scrolling marquee of the languages and tools I use regularly — JavaScript, TypeScript, Python, React, Next.js, Node.js, Tailwind, SQL, Git, and the Chrome Extension API. The scroll pauses on hover.

### ✍️ Writing

Cards linking to external posts and articles. Each card shows the title, a short excerpt, the publication date, and a read-time estimate.

### 📬 Contact

A simple section with a direct email link and social links (GitHub, LinkedIn, Twitter/X). No contact form—just a straightforward way to reach out.

## Under the Hood

- **Centralized config** — `data/site.ts` holds all personal info, social links, nav structure, and SEO metadata. Updating the portfolio usually means touching one file.
- **Component data files** — `data/projects.ts`, `data/experience.ts`, and `data/writing.ts` each export typed arrays. Adding a new entry is as simple as adding an object to the array.
- **Scroll animations** — `lib/useScrollReveal.ts` provides `useScrollReveal` and `useStaggerReveal` hooks built on `IntersectionObserver`.
- **Aurora background** — rendered in `components/ui/AuroraBackground.tsx` using layered animated gradients, keeping the visual load lightweight.
- **Glassmorphism design system** — `globals.css` defines `.card`, `.glass-card`, and `.badge` as reusable Tailwind utilities, keeping component code clean.
- **App Router** — uses Next.js App Router with a single-page layout (`app/page.tsx`) that composes all section components.

## Quick Start

```bash
git clone https://github.com/RIxiV1/portfolio-suhaib.git
cd portfolio-suhaib
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customize

To customise it for yourself:

1. Start with `data/site.ts` for personal details.
2. Update `data/projects.ts`, `data/experience.ts`, and `data/writing.ts` with your own content.
3. Replace any images in `public/` (and update any references).

## Deploy

This portfolio is deployed on **Vercel**. The simplest approach:

- Import the repository into Vercel
- Set the framework preset to **Next.js**
- Deploy

## License

Add a license if you plan to make this template reusable (e.g., MIT). If you don’t want reuse, consider keeping it private.

## Contact

- Website: https://portfolio-suhaib.vercel.app/
- GitHub: https://github.com/RIxiV1
- LinkedIn: (add link)
- Email: (add email)

---

*Built to be readable. Designed to get out of the way.*