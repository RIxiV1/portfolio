# portfolio-suhaib

<div align="center">
  <h3>Personal developer portfolio</h3>
  <p>Next.js · TypeScript · Tailwind CSS · Framer Motion</p>
</div>

---

This is my personal portfolio site. It's built to show my work, background, and writing in one place without extra noise. The design leans dark and minimal — fast to load, easy to read, and focused on the content.

## Sections

### 🏠 Hero
The landing view shows my name, a short tagline, and links to get in touch or jump straight to my work. There's an "Available for work" badge that pulses when I'm actively looking.

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
- A "Currently" card with what I'm up to right now.

### 🗓 Journey (Experience)
A vertical timeline of work, education, and project milestones. Each entry has a role, org, time period, description, and tags. Icons distinguish between employment, education, and personal projects.

### ⚙️ Toolkit
An auto-scrolling marquee of the languages and tools I use regularly — JavaScript, TypeScript, Python, React, Next.js, Node.js, Tailwind, SQL, Git, and the Chrome Extension API. The scroll is pure CSS with no JavaScript.

### ✍️ Writing
Cards linking to external posts and articles. Each card shows the title, a short excerpt, the publication date, and a read-time estimate.

### 📬 Contact
A simple section with a direct email link and social links (GitHub, LinkedIn, Twitter/X). No contact form — just a straightforward way to reach out.

## Under the Hood

- **Centralized config** — `data/site.ts` holds all personal info, social links, nav structure, and SEO metadata. Updating the portfolio means touching one file.
- **Component data files** — `data/projects.ts`, `data/experience.ts`, and `data/writing.ts` each export typed arrays. Adding a new entry is as simple as adding an object to the array.
- **Scroll animations** — `lib/useScrollReveal.ts` provides `useScrollReveal` and `useStaggerReveal` hooks built on `IntersectionObserver`. No heavy animation library is needed for the reveal logic.
- **Aurora background** — rendered in `components/ui/AuroraBackground.tsx` using layered animated gradients, keeping the visual load lightweight.
- **Glassmorphism design system** — `globals.css` defines `.card`, `.glass-card`, and `.badge` as reusable Tailwind utilities, keeping component code clean.
- **App Router** — uses Next.js App Router with a single-page layout (`app/page.tsx`) that composes all section components.

## Getting Started

```bash
git clone https://github.com/RIxiV1/portfolio-suhaib.git
cd portfolio-suhaib
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To customise it for yourself, start with `data/site.ts` for personal details, then update `data/projects.ts`, `data/experience.ts`, and `data/writing.ts` with your own content.

---

*Built to be readable. Designed to get out of the way.*
