# Codern

A professional online-course storefront. Next.js 14 + Tailwind + Zustand.
Three surfaces: a marketing **landing page**, a searchable **course catalogue**, and an **admin panel** to create / edit / delete courses.

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Admin

- Go to `/admin/login`
- Email: `admin@codern.io`
- Password: `admin123`

Change both in `data/siteContent.ts → admin`. See [HANDOFF.md](./HANDOFF.md) for full docs.

## Where to edit things

- **All site copy** (brand, hero, footer, nav, admin creds): `data/siteContent.ts`
- **Initial course catalogue**: `data/seedCourses.ts`
- **Pages**: `app/page.tsx`, `app/courses/page.tsx`, `app/courses/[slug]/page.tsx`, `app/admin/*`
- **Components**: `components/`

## Deploy

Works out of the box on **Vercel** — push to GitHub, import the repo, no env vars needed.
