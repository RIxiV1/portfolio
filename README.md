# Shaik Mohammed Suhaib — portfolio

Personal site at **[portfolio-suhaib.vercel.app](https://portfolio-suhaib.vercel.app)**.

Single-page scroll with deeper case studies for each project. Tech-minimalist on a warm-amber-on-charcoal palette. Dark-mode only by design.

---

## What's in it

- **One-page scroll**: hero, about, work, lab, stack, journey, writing, contact.
- **Case study pages** at `/projects/[slug]` — statically generated. Each lays out problem, approach, three to four keyed decisions with rationale, outcome, and takeaways.
- **Stack ↔ Work cross-link** — hover any tech in the Stack section to highlight where it's shipped on the project cards (and vice versa). Keyboard-reachable, `aria-pressed` for screen readers.
- **Recommendation Lab** — a 12-node similarity graph with N-body physics and `requestAnimationFrame` energy-gating to park the simulation when it settles. Custom-built, no D3 or Sigma. Nodes are keyboard-navigable.
- **Magnetic CTAs** — "Hire me" and "Download résumé" track the cursor with spring physics.
- **Scramble text** on the hero name.
- **Hardened contact form**: Zod-validated, Resend-delivered, Upstash-rate-limited (in-memory fallback for local dev), honeypot anti-spam, control-character stripping to defend against header injection, strict CORS validation.
- **Accessibility**: keyboard-navigable interactive SVG, `prefers-reduced-motion` respected, focus-visible outlines, semantic HTML.

## Tech stack

- **Framework**: Next.js 16 App Router (Turbopack)
- **UI**: React 19, Tailwind CSS v4 with `oklch` design tokens, `motion` for animations
- **Backend**: Resend (transactional email), Upstash Redis (distributed rate limiting), Zod (request validation)
- **Hosting**: Vercel
- **Fonts**: Geist Sans + Geist Mono via `next/font/google`

## Local development

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and fill in the keys for `RESEND_API_KEY`, `UPSTASH_REDIS_REST_URL`, and `UPSTASH_REDIS_REST_TOKEN` if you want the contact form to deliver mail and rate-limit against a shared store. Without them, the form still works locally — Resend cleanly 503s and the limiter falls back to per-worker in-memory.

## Layout

```
app/
├── api/contact/          POST endpoint: Zod + rate limit + Resend
├── projects/[slug]/      Statically generated case study pages
├── layout.tsx            Geist fonts, OG metadata, grid background
└── page.tsx              The one-page scroll
components/ui/
├── work-stack-link.tsx   Cross-link provider, ProjectsList, StackList
├── recommendation-lab.tsx  Custom physics graph
├── magnetic-link.tsx     Cursor-following springs
├── nav.tsx, contact-form.tsx, status-pill.tsx, ...
data/site.ts              Single source of truth for all content
```

## Contact

- Email: [shaiksuhaib360@gmail.com](mailto:shaiksuhaib360@gmail.com)
- GitHub: [@RIxiV1](https://github.com/RIxiV1)
- LinkedIn: [in/shaiksuhaib](https://www.linkedin.com/in/shaiksuhaib)
- X: [@suhaibX0](https://x.com/suhaibX0)

---

MIT © Shaik Mohammed Suhaib
