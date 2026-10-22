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
- Password: the private site-admin password set by the owner.

The password is checked on the server using `CODERN_ADMIN_PASSWORD_HASH`.
Set `CODERN_ADMIN_SESSION_SECRET` as well. Both are secret Vercel environment
variables. The admin page requires a signed HttpOnly session cookie.
The course catalogue remains the existing browser-local demo store.
Public pages label fictional course/business content and unavailable services.
Student accounts, payments and certificates are not implemented.

## Where to edit things

- **Site copy and public admin account label**: `data/siteContent.ts`
- **Initial course catalogue**: `data/seedCourses.ts`
- **Pages**: `app/page.tsx`, `app/courses/page.tsx`, `app/courses/[slug]/page.tsx`, `app/admin/*`
- **Components**: `components/`

## Deploy

Deploy on **Vercel** with `CODERN_ADMIN_PASSWORD_HASH` and
`CODERN_ADMIN_SESSION_SECRET` set as secret environment variables. The public
storefront works without them; admin sign-in fails closed until configured.

Run `npm test` for password/session checks. Privately set `CODERN_ADMIN_PASSWORD`
and run `node scripts/verify-admin.mjs` to check the deployed sign-in, protected
page, cookie attributes, tampered-session rejection and sign-out.
Never put passwords, password hashes or session secrets in Git.
