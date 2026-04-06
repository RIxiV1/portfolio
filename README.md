# portfolio-suhaib

<div align="center">

### Personal developer portfolio

**Next.js · TypeScript · Tailwind CSS · Framer Motion**

[Live Site](https://portfolio-suhaib.vercel.app/) · [Repository](https://github.com/RIxiV1/portfolio-suhaib)

![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat&logo=framer&logoColor=white)

</div>

---

A dark, minimal, fast portfolio—built to showcase my work, background, and writing in one place without extra noise.

## Preview

> Recommended: keep a preview image at `public/og.png` so it renders here and in social sharing.

![Portfolio preview](public/og.png)

## Why

I wanted a portfolio that’s:

- **Readable first** — content over decoration
- **Easy to update** — most changes live in typed data files
- **Fast** — minimal UI overhead, purposeful animations

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
The landing view shows my name, a short tagline, and links to get in touch or jump straight to my work.

### 🗂 Projects
Projects are split into two groups:

- **Featured** — full-width cards with screenshot, description, tags, and a direct GitHub link.
- **Other** — compact grid with hover effects and a quick-view overlay.

Clicking any card opens a modal with a larger image, full description, and links.

### 👤 About
A bento-style grid with bio, location, focus areas, and what I’m currently doing.

### 🗓 Journey (Experience)
A timeline of work/education/milestones. Each entry includes role, org, time period, description, and tags.

### ⚙️ Toolkit
A marquee of tools I use regularly (JS/TS, React/Next.js, Node, Tailwind, SQL, Git, etc.).

### ✍️ Writing
Cards linking to external posts/articles with title, excerpt, date, and read-time.

### 📬 Contact
A simple section with direct links (no contact form—just a straightforward way to reach out).

## Under the Hood

- **Centralized config** — `data/site.ts` holds personal info, social links, nav, and SEO metadata.
- **Component data files** — `data/projects.ts`, `data/experience.ts`, `data/writing.ts` export typed arrays.
- **Scroll animations** — `lib/useScrollReveal.ts` provides hooks built on `IntersectionObserver`.
- **Aurora background** — `components/ui/AuroraBackground.tsx` uses layered animated gradients.
- **Design utilities** — `globals.css` defines reusable patterns like `.card`, `.glass-card`, and `.badge`.
- **App Router** — single-page layout composed in `app/page.tsx`.

## Quick Start

```bash
git clone https://github.com/RIxiV1/portfolio-suhaib.git
cd portfolio-suhaib
npm install
npm run dev
```

Open http://localhost:3000

## Customize

To customise it for yourself:

1. Update `data/site.ts` (name, intro, socials, SEO).
2. Update `data/projects.ts`, `data/experience.ts`, `data/writing.ts`.
3. Replace images in `public/` and update any references.

## Deploy

Deployed on **Vercel**:

- Import the repo into Vercel
- Choose the **Next.js** preset
- Deploy

## License

If you want this to be reusable as a template, add a `LICENSE` (e.g., MIT) and update this section.
If you don’t want reuse, keep “All rights reserved” (or keep the repo private).

## Contact

- Website: https://portfolio-suhaib.vercel.app/
- GitHub: https://github.com/RIxiV1
- LinkedIn: https://www.linkedin.com/in/shaiksuhaib
- Email: shaiksuhaib360@gmail.com

---

*Built to be readable. Designed to get out of the way.*
