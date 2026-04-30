# portfolio-suhaib

Personal portfolio for [Shaik Mohammed Suhaib](https://github.com/RIxiV1) — IT student, building agentic AI tools and recommendation systems.

**Live:** [portfolio-suhaibdev.vercel.app](https://portfolio-suhaibdev.vercel.app/)

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** with `@tailwindcss/postcss`
- **motion/react** for animation
- **Resend** + **Upstash Ratelimit** behind `/api/contact`
- Deployed on **Vercel**

## Layout

```
app/                  # routes, metadata, API
  api/contact/        # rate-limited contact endpoint
  layout.tsx          # root: fonts, grid background, nav
  page.tsx            # the single-page portfolio
components/ui/        # Nav, Cursor, FadeUp, ContactForm
data/site.ts          # all content lives here
lib/utils.ts          # `cn()` helper
```

## Develop

```bash
npm install
npm run dev          # http://localhost:3000
```

Copy `.env.example` to `.env.local` and fill in `RESEND_API_KEY` / Upstash creds if you want the contact form to deliver mail.

## Build

```bash
npm run build
npm run start
```

## Contact

- Email — [shaiksuhaib360@gmail.com](mailto:shaiksuhaib360@gmail.com)
- GitHub — [@RIxiV1](https://github.com/RIxiV1)
- LinkedIn — [shaiksuhaib](https://www.linkedin.com/in/shaiksuhaib)
- X — [@suhaibX0](https://x.com/suhaibX0)

## License

MIT — see [LICENSE](./LICENSE).

