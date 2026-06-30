# Codern — Project Handoff & Repurposing Guide

> **AI editor (Claude / ChatGPT / anything else): READ THIS WHOLE FILE before making any changes.**
> This document is self-contained. You can repurpose this project into a completely different e-commerce vertical (phones, ebooks, tickets, courses, anything) using only what's in this file — no further context needed.

---

## 1. What this project actually is

A **professional, modern e-commerce storefront template** with three surfaces:

| Route             | Purpose                                              |
| ----------------- | ---------------------------------------------------- |
| `/`               | Marketing landing page                               |
| `/courses`        | Product catalogue (search · filter · sort)           |
| `/courses/[slug]` | Product detail page                                  |
| `/cart`           | Shopping cart — review items, see totals, "checkout" |
| `/admin/login`    | Admin sign-in (hardcoded demo credentials)           |
| `/admin`          | Admin dashboard — create / edit / delete products    |

**Cart:** state lives in `useCartStore` (`lib/store.ts`), persisted to `localStorage` under `codern-cart-v1`. Add-to-cart buttons live on every `CourseCard` (catalogue) and on the course detail page. A badge with the live count is shown in the navbar.

It currently sells **online computer courses**, but everything is structured so a single AI session can convert it into a phone store, ebook store, ticket booking site, SaaS pricing page, real-estate listing, hotel booking — anything where you have a list of items with prices, an admin who manages them, and a buyer who browses.

No backend. All product data is seeded from a single file (`data/seedCourses.ts`) and persisted to `localStorage` via Zustand. Admin auth is a `localStorage` flag set after matching hardcoded credentials.

---

## 2. Stack (don't add anything not on this list)

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS 3** — utility-first styling
- **Zustand** (with `persist` middleware) — client-side state, persisted to `localStorage`
- **framer-motion** — light entrance animations + 3D-tilt cards
- **lucide-react** — icon set
- Fonts: **Inter** (body) + **Plus Jakarta Sans** (headings), loaded via `next/font/google`

**Do not** add Radix, shadcn, NextAuth, Prisma, a database, payments — unless the user explicitly asks. The whole point of this template is "edit one or two files and the site changes."

---

## 3. Design system (this is what makes it look hand-crafted, not AI-made)

The palette is deliberately rich — four shades of blue, not a single brand-color:

| Token    | Where it's defined                | When to use                                  |
| -------- | --------------------------------- | -------------------------------------------- |
| `sky-*`  | `tailwind.config.ts → colors.sky` | Lighter accents, soft fills                  |
| `brand-*` | `tailwind.config.ts → colors.brand` | Main interactive color (buttons, links)    |
| `navy-*` | `tailwind.config.ts → colors.navy` | Dark sections, text emphasis                 |
| slate-* (Tailwind default) |                       | Neutral text & backgrounds                   |

**Gradient & motion ingredients** (already wired):

- `.gradient-text` — applies the `brand → sky` gradient to text (used for the accent words in every section title).
- `.btn-primary` — has a built-in 3-stop blue gradient + glow shadow on hover.
- `.card-glass` — translucent white card with backdrop blur. Use on top of `<AnimatedBackground />`.
- `.blob`, `.blob-brand`, `.blob-sky`, `.blob-navy` — soft animated colour orbs. See `<AnimatedBackground />`.
- `.pattern-dots`, `.pattern-grid` — subtle background overlays.
- `.animate-blob-float`, `.animate-blob-float-slow` — slow drifting motion for blobs.
- `<Reveal>` — wrap anything to fade-and-lift it in on scroll (uses framer-motion).
- `<TiltCard>` — wrap a card to give it a mouse-following 3D tilt (CSS transforms only, no 3D libs).
- `<AnimatedBackground variant="hero" | "soft" | "navy" />` — drop into any `relative overflow-hidden` section for an animated background.

**Typography rules**

- Headlines use `font-display` (Plus Jakarta) and are large (text-5xl / text-6xl on hero, text-4xl / text-5xl on sections).
- Body uses `font-sans` (Inter).
- Each section has a tiny eyebrow above the heading: `<p className="section-title-eyebrow">…</p>`. Keep this pattern — it's the rhythm that makes the page feel composed.

**Don't break the design** by:
- Replacing the blue palette with a flat single colour
- Removing the eyebrows or the `gradient-text` accents
- Using `<div className="bg-white">` for every section — alternate `bg-white`, `<AnimatedBackground variant="soft" />`, and the navy CTA block
- Importing a UI kit (shadcn, Radix, MUI) — the existing utility classes already cover everything

---

## 4. File map — exactly where to edit

```
courses-platform/
├── app/
│   ├── layout.tsx             ← <html> + global font setup, do not touch unless changing fonts
│   ├── globals.css            ← Tailwind layers, custom utility classes (.btn-primary, .card-glass, .gradient-text, .blob, etc.)
│   ├── page.tsx               ← LANDING PAGE — hero, value props, categories, featured, how-it-works, testimonials, final CTA
│   ├── courses/
│   │   ├── page.tsx           ← CATALOGUE PAGE — search, filter, sort, grid
│   │   └── [slug]/page.tsx    ← PRODUCT DETAIL PAGE — purchase card, highlights, description
│   └── admin/
│       ├── login/page.tsx     ← Admin sign-in form
│       └── page.tsx           ← Admin dashboard — stats + CRUD table + modal form
├── components/
│   ├── Navbar.tsx             ← Sticky transparent → opaque on scroll
│   ├── Footer.tsx             ← 4-column footer
│   ├── CourseCard.tsx         ← Product card used on landing + catalogue
│   ├── Reveal.tsx             ← <Reveal> scroll-in animation wrapper
│   ├── TiltCard.tsx           ← <TiltCard> mouse-tracking 3D tilt wrapper
│   └── AnimatedBackground.tsx ← <AnimatedBackground> blob + pattern background
├── data/
│   ├── siteContent.ts         ← ★ ALL non-product copy: brand, hero, footer, nav, admin creds, testimonials
│   └── seedCourses.ts         ← ★ Course type + initial catalogue + category list
├── lib/
│   ├── store.ts               ← Zustand stores: useCourseStore (CRUD + persist), useAuthStore
│   └── utils.ts               ← cn(), formatPrice(), slugify()
├── tailwind.config.ts         ← Color palette, fonts, gradient utilities, animations
├── HANDOFF.md                 ← (this file)
└── README.md                  ← Run instructions
```

**Two files own almost all editable content:** `data/siteContent.ts` and `data/seedCourses.ts`. If your edit doesn't need to change layout, you can probably get away with editing just these two.

---

## 5. The state layer (read this before touching `lib/store.ts`)

`useCourseStore` (Zustand + `persist`):
- `courses: Course[]` — current catalogue (starts as `seedCourses` on first visit)
- `addCourse(course)` / `updateCourse(id, patch)` / `removeCourse(id)` / `resetToSeed()`
- Persisted to `localStorage` under key `codern-courses-v1`

`useAuthStore`:
- `isAdmin: boolean`, `login()`, `logout()`
- Persisted under `codern-auth-v1`

**Gotcha:** because the store is hydrated from `localStorage` on the client, every page that reads it is `"use client"`. If you move to server components, you must also move state off `localStorage` (e.g. cookies + a database).

**Gotcha:** editing `data/seedCourses.ts` only affects users whose `localStorage` is empty. Existing users keep their saved catalogue. Use **Reset** in the admin panel to re-seed.

---

## 6. Run it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
```

Admin login:

- Email: see `data/siteContent.ts → admin.email` (default `admin@codern.io`)
- Password: see `data/siteContent.ts → admin.password` (default `admin123`)

---

## 7. ★★ Repurposing recipes — convert this template into anything ★★

The trick: this is essentially "a catalogue of typed objects with an admin." Change the type, change the seed list, change the copy. Everything else just works.

### 7.1 Mental model

Whatever you sell:

- becomes the **`Course`** type in `data/seedCourses.ts` (rename it, change fields)
- shows up as the **`CourseCard`** in components
- gets a **detail page** at `/courses/[slug]/page.tsx`
- gets created/edited in the **admin modal form** in `app/admin/page.tsx`

You can either:
- **Keep the names "Course / courses"** in code (fastest — just change displayed text & fields) — or
- **Rename to your vertical** (Phone / phones, Ebook / ebooks, Ticket / tickets) — see 7.6

Recommendation: **keep code names unless you have a specific reason to rename**. The user sees only the text and routes you choose to expose; the file `seedCourses.ts` can hold phones perfectly fine. Only rename if the code itself will be read by a third party.

### 7.2 Generic conversion checklist (works for any vertical)

1. **`data/siteContent.ts`** — rewrite `brand`, `hero`, `valueProps`, `howItWorks`, `testimonials`, `finalCta`, `nav`, `footer`. This alone changes 80% of the landing page.
2. **`data/seedCourses.ts`** — rewrite the `Course` type's fields (or keep & repurpose), rewrite `categories`, rewrite the `seedCourses` array.
3. **`app/admin/page.tsx`** — update the `<Field>` form rows in the modal to match your new fields. The `blank` constant at the top is the empty form state.
4. **`components/CourseCard.tsx`** — update which fields the card shows (image, title, subtitle, price, rating, lessons / pages / seats / GB / whatever).
5. **`app/courses/[slug]/page.tsx`** — update the detail page sections (highlights, description, the purchase card facts).
6. **Routes** (optional) — rename `/courses` to `/phones` etc. by renaming the folder.

### 7.3 Recipe: "Phone selling website" 📱

**`data/siteContent.ts`** — replace brand & copy:

```ts
brand: {
  name: "PhonePoint",
  tagline: "Premium phones, unbeatable prices",
  description: "Buy the latest iPhone, Samsung, Pixel and more — financing in 60 seconds.",
},
hero: {
  eyebrow: "Free next-day shipping",
  title: "Flagship phones, fair prices.",
  subtitle: "Compare every iPhone, Pixel and Samsung Galaxy side by side. Buy outright or pay monthly.",
  primaryCta: { label: "Shop all phones", href: "/courses" },
  secondaryCta: { label: "Compare models", href: "/courses" },
  stats: [
    { label: "Brands", value: "12" },
    { label: "Models in stock", value: "180+" },
    { label: "Happy buyers", value: "120k" },
    { label: "Avg. rating", value: "4.8 / 5" },
  ],
},
valueProps: [
  { icon: "ShieldCheck", title: "2-year warranty", body: "Every phone covered, no questions asked." },
  { icon: "Infinity", title: "0% EMI", body: "Split any phone over 12 months at 0%." },
  { icon: "Users", title: "Trade-in", body: "Send your old phone, get instant credit." },
  { icon: "Code2", title: "Pre-configured", body: "We set it up before shipping — out of the box." },
],
```

**`data/seedCourses.ts`** — repurpose the `Course` type as a `Phone`:

```ts
export type Course = {                // ← keep the name "Course" or rename to Phone
  id: string;
  slug: string;
  title: string;          // e.g. "iPhone 16 Pro Max 256GB"
  subtitle: string;       // e.g. "A18 Pro · Titanium · 5x Telephoto"
  category: string;       // brand: "Apple", "Samsung", "Google", …
  level: "Beginner" | "Intermediate" | "Advanced";  // repurpose as condition: "New" | "Refurbished" | "Pre-owned"
  durationHours: number;  // repurpose as storage GB
  lessons: number;        // repurpose as battery mAh
  priceUsd: number;
  originalPriceUsd?: number;
  rating: number;
  reviews: number;
  instructor: string;     // repurpose as brand
  instructorRole: string; // repurpose as model code
  image: string;
  highlights: string[];   // spec bullets
  description: string;
  featured?: boolean;
  createdAt: string;
};

export const categories = [
  { name: "Apple",   icon: "Smartphone", description: "iPhone 13 through iPhone 16 Pro Max" },
  { name: "Samsung", icon: "Smartphone", description: "Galaxy S, Z Fold, Z Flip" },
  { name: "Google",  icon: "Smartphone", description: "Pixel 8 and 9 series" },
  { name: "OnePlus", icon: "Smartphone", description: "OnePlus 12 / Nord" },
  ...
];

export const seedCourses: Course[] = [
  {
    id: "p-001",
    slug: "iphone-16-pro-256gb",
    title: "iPhone 16 Pro 256GB",
    subtitle: "A18 Pro · Titanium · Camera Control",
    category: "Apple",
    level: "Beginner",         // = "New"
    durationHours: 256,        // = 256 GB
    lessons: 3582,             // = 3582 mAh battery
    priceUsd: 1099,
    originalPriceUsd: 1199,
    rating: 4.9,
    reviews: 1240,
    instructor: "Apple",
    instructorRole: "A3083",
    image: "https://images.unsplash.com/photo-1592286927505-1def25115558?w=900&h=600&fit=crop",
    highlights: ["A18 Pro chip", "256GB storage", "48MP fusion camera", "2-year warranty"],
    description: "The newest iPhone Pro, in stock and ready to ship.",
    featured: true,
    createdAt: "2026-06-30",
  },
  ...
];
```

**`components/CourseCard.tsx`** — change the small icons row to reflect storage / battery, and the "Lessons" label to "Specs" or remove it.

**`app/courses/[slug]/page.tsx`** — relabel "What you'll learn" to "Key specs", "About this course" to "About this phone". Change the purchase card text ("Lifetime access" → "Free shipping", "Certificate" → "1-yr Apple Care+", etc.).

**`app/admin/page.tsx`** — relabel the field labels in the `<Field label="…">` calls (Title → Model, Subtitle → Tagline, Duration → Storage GB, Lessons → Battery mAh, Instructor → Brand, Instructor role → Model code). The `blank` constant's defaults should also be updated.

### 7.4 Recipe: "Ebook selling website" 📚

| `Course` field        | Use as                                |
| --------------------- | ------------------------------------- |
| `title`               | Book title                            |
| `subtitle`            | "by Author Name"                      |
| `category`            | Genre (Fiction, Non-Fiction, Tech, …) |
| `level`               | Length: Short / Medium / Long         |
| `durationHours`       | Pages                                 |
| `lessons`             | Chapters                              |
| `instructor`          | Author                                |
| `instructorRole`      | "Author of N other books"             |
| `highlights`          | What you'll learn / takeaways         |
| `image`               | Book cover (use https://covers.openlibrary.org or any image URL) |

Categories: "Fiction", "Non-Fiction", "Self-Help", "Tech", "Business", "Sci-Fi", "Fantasy", "Biography".

Purchase card label changes: "Enroll now" → "Buy & download". "Lifetime access" → "Read on any device". "Certificate" → "PDF + EPUB + MOBI". "30-day refund" → "14-day refund".

### 7.5 Recipe: "Ticket booking website" 🎟️

| `Course` field        | Use as                                |
| --------------------- | ------------------------------------- |
| `title`               | Event name                            |
| `subtitle`            | Venue + city                          |
| `category`            | Event type (Concert / Theatre / Sport / Comedy) |
| `level`               | Seating: Standard / Premium / VIP     |
| `durationHours`       | Show length in minutes                |
| `lessons`             | Seats remaining                       |
| `instructor`          | Headlining artist / team              |
| `instructorRole`      | Date + time of show                   |
| `priceUsd`            | Ticket price                          |
| `image`               | Event poster                          |
| `highlights`          | "Includes drink", "Standing", "Meet & greet", …|

Categories: "Concerts", "Theatre", "Comedy", "Sport", "Festivals", "Conferences".

Important: the admin form's "Lessons" field should become "Seats remaining" so admin can update inventory.

CTA changes: "Enroll now" → "Book seats". Detail page "What you'll learn" → "What's included".

### 7.6 Optional: rename `Course` → your vertical's name

If you want the **code** to read naturally (`Phone`, `phones`, `usePhoneStore`), do this in order:

1. In `data/seedCourses.ts`: rename `export type Course` → `export type Phone`, rename `seedCourses` → `seedPhones`. Save as `data/seedPhones.ts`.
2. Find-replace across the codebase:
   - `Course` (the type) → `Phone`
   - `course` (the variable / prop) → `phone`
   - `courses` (collections) → `phones`
   - `useCourseStore` → `usePhoneStore`
   - `seedCourses` → `seedPhones`
3. Rename the folder `app/courses/` → `app/phones/`.
4. Update all `<Link href="/courses…">` to `/phones…`.
5. Update the Zustand persist keys in `lib/store.ts` (`codern-courses-v1` → `phonepoint-phones-v1`) so the rename doesn't pick up stale data.

Use your editor's "rename symbol" feature instead of blind find-replace if possible.

---

## 8. Editing-style rules (so the result still looks hand-made)

- **Don't replace the design language**. Keep the eyebrow → gradient headline → body paragraph rhythm. Keep the multi-blue palette. Keep `<Reveal>` wrappers and `<TiltCard>`s.
- **Don't add emojis** to source code unless the user asks. Lucide icons handle visual cues.
- **Don't hardcode strings in components**. New text goes in `data/siteContent.ts` or `data/seedCourses.ts`.
- **Don't add comments that just restate the code**. The conventions live here in HANDOFF.md.
- **Don't introduce new dependencies** unless the user asks. Tailwind + framer-motion + lucide already cover everything.
- **Don't switch to next/image** during edits — plain `<img>` keeps the demo simple.
- **Always run `npm run dev` after a major edit** and check the three core pages (`/`, `/courses`, `/admin/login` → `/admin`).

---

## 9. Common single-prompt edits — copy-paste these into an AI

> **"Convert this template to a phone-selling site for PhonePoint. Use the recipe in HANDOFF.md section 7.3 — replace `data/siteContent.ts`, repurpose the `Course` type fields in `data/seedCourses.ts` to phone attributes, update CourseCard labels (Lessons → Battery mAh), update the admin form labels, update the purchase-card text on the detail page. Do not change the design system, the animations, or the file layout."**

> **"Convert this template into an ebook store for 'Pagebound'. Section 7.4 of HANDOFF.md has the field mapping. Keep the design and animations."**

> **"Convert to a concert ticket site for 'Showpass'. Section 7.5 of HANDOFF.md has the mapping. Update the admin so 'Seats remaining' is editable. Keep the rest of the design."**

> **"Add a new section between Categories and Featured Courses that shows a 'Bestsellers' rail. Pull from `useCourseStore`, sort by `reviews` desc, take the top 4. Wrap each in `<Reveal>` and `<TiltCard>` like the existing CourseCards do."**

> **"Make the hero darker / navy themed. Swap `<AnimatedBackground variant='hero' />` for `variant='navy'`, change the hero text color from `text-navy-950` to `text-white` and `text-slate-600` to `text-slate-200`. Keep the gradient-text on the accent word."**

---

## 10. What's intentionally NOT in this project

- Real authentication (admin is a localStorage flag matched against hardcoded creds)
- Real payments (the "Enroll now" button shows an alert)
- A database (Zustand + localStorage is the entire state layer)
- Email / password reset
- User accounts beyond an admin flag
- A search backend (filtering is in-memory in the catalogue page)

Adding these is straightforward but out of scope for the template. If asked to add them, prefer minimal, well-known choices: Postgres via Supabase, Stripe for payments, NextAuth or Clerk for auth.

---

## 11. Quick verification list before declaring an edit "done"

After any meaningful change, an AI editor should manually check:

1. `/` renders without console errors (open devtools).
2. `/courses` shows the catalogue and the filter sidebar works (try a category + a level).
3. `/courses/[slug]` resolves for at least one product (click into one from the catalogue).
4. `/admin/login` works with the credentials from `data/siteContent.ts`.
5. `/admin` — clicking **+ New course** opens the modal, saving adds a row, deleting a row works.
6. The hero still has the animated blue blob background — no flat-white hero.

If any of these fail, fix before reporting done.
