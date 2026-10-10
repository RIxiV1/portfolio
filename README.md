# Shaik Mohammed Suhaib — Portfolio

Personal portfolio and engineering case studies: [shaiksuhaibdev.vercel.app](https://shaiksuhaibdev.vercel.app).

An editorial, high-contrast developer portfolio inspired by technical publications and modern developer tools. Built with Next.js 16, React 19, Tailwind CSS v4, and Motion.

---

## Overview

The site serves as a focused index of production projects, engineering journey breakdowns, and technical case studies:

- **Editorial Monospace Aesthetic**: High-contrast typography with a dedicated Monochrome Stealth dark mode (`#000000` base) and clean light mode.
- **Deep-Dive Case Studies**: Dynamic routes under `/projects/[slug]` statically generated at build time (`SSG`), breaking down problem statements, architecture decisions, and measured outcomes.
- **Interactive Directory & Stack**: Dedicated routes for `/projects`, `/journey`, and `/stack` with filtering and deep-linked PRDs.
- **Hardened Contact Pipeline**: Edge rate-limiting via Upstash Redis with local in-memory fallback, Zod schema validation, honeypot spam protection, header injection sanitation, and transactional delivery via Resend.
- **Accessibility & SEO**: WCAG-compliant contrast ratios, `prefers-reduced-motion` compliance across all animation primitives, skip-to-content bypass, and Schema.org `Person` JSON-LD structured data.

---

## Tech Stack

| Layer             | Technology                                             |
| :---------------- | :----------------------------------------------------- |
| **Framework**     | Next.js 16 (App Router, Turbopack)                     |
| **Runtime & UI**  | React 19, TypeScript                                   |
| **Styling**       | Tailwind CSS v4, CSS Variables                         |
| **Motion**        | Motion (`motion/react`)                                |
| **Validation**    | Zod                                                    |
| **Rate Limiting** | Upstash Redis (`@upstash/ratelimit`, `@upstash/redis`) |
| **Email Service** | Resend                                                 |
| **Icons**         | Lucide React                                           |
| **Deployment**    | Vercel                                                 |

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Installation

```bash
git clone https://github.com/RIxiV1/portfolio.git
cd portfolio
npm install
```

### Environment Configuration

Create a `.env.local` file in the project root:

```bash
cp .env.example .env.local
```

Required keys for live email forwarding and distributed rate limiting:

```env
RESEND_API_KEY=re_...
CONTACT_TO_EMAIL=your-email@example.com
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...
```

_Note: In development, missing Upstash credentials automatically fall back to an in-memory sliding window rate limiter, and missing Resend keys return a simulated 503 response without breaking the UI._

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### Production Build & Verification

```bash
npm run lint          # Run ESLint rules
npm run format:check  # Verify Prettier formatting
npx tsc --noEmit      # Run TypeScript typecheck
npm run build         # Generate static production build
```

---

## Project Structure

```text
portfolio/
├── app/
│   ├── api/contact/route.ts       # Validated edge API handler
│   ├── projects/[slug]/page.tsx   # Statically generated case studies
│   ├── projects/page.tsx          # Filterable projects directory
│   ├── journey/page.tsx           # Career timeline & documentation
│   ├── stack/page.tsx             # Technologies & tools index
│   ├── contact/page.tsx           # Contact form page
│   ├── layout.tsx                 # Root layout, theme script, JSON-LD
│   ├── globals.css                # Tailwind v4 theme definitions
│   └── page.tsx                   # Index page
├── components/
│   └── ui/                        # Reusable primitives (nav, cards, forms)
├── data/
│   └── site.ts                    # Centralized project data & site configuration
└── public/                        # Static assets (favicons, project media)
```

---

## Contact

- **Website**: [shaiksuhaibdev.vercel.app](https://shaiksuhaibdev.vercel.app)
- **GitHub**: [@RIxiV1](https://github.com/RIxiV1)
- **LinkedIn**: [in/shaiksuhaib](https://www.linkedin.com/in/shaiksuhaib)
- **Email**: [shaiksuhaib360@gmail.com](mailto:shaiksuhaib360@gmail.com)

---

## License

MIT © Shaik Mohammed Suhaib
