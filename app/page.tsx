"use client";

import Link from "next/link";
import {
  ArrowRight,
  Code2,
  Users,
  ShieldCheck,
  Infinity as InfinityIcon,
  Globe2,
  BarChart3,
  BrainCircuit,
  Smartphone,
  Cloud,
  Gamepad2,
  CheckCircle2,
  Quote,
  Sparkles,
  PlayCircle,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CourseCard from "@/components/CourseCard";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import AnimatedBackground from "@/components/AnimatedBackground";
import { siteContent } from "@/data/siteContent";
import { categories } from "@/data/seedCourses";
import { useCourseStore } from "@/lib/store";

const iconMap: Record<string, any> = {
  Code2,
  Users,
  ShieldCheck,
  Infinity: InfinityIcon,
  Globe2,
  BarChart3,
  BrainCircuit,
  Smartphone,
  Cloud,
  Gamepad2,
};

export default function LandingPage() {
  const courses = useCourseStore((s) => s.courses);
  const featured = courses.filter((c) => c.featured).slice(0, 3);
  const fallback = featured.length ? featured : courses.slice(0, 3);
  const preview = courses[0];

  return (
    <>
      <Navbar />

      {/* ───────────────────────── HERO ───────────────────────── */}
      <section className="relative isolate overflow-hidden">
        <AnimatedBackground variant="hero" />
        <div className="container-page grid items-center gap-16 py-24 lg:grid-cols-[1.05fr_1fr] lg:py-32">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-brand-700 ring-1 ring-inset ring-brand-200/60 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              {siteContent.hero.eyebrow}
            </span>
            <h1 className="mt-5 text-5xl font-bold leading-[1.05] text-navy-950 sm:text-6xl lg:text-7xl">
              Build a tech career{" "}
              <span className="gradient-text">one project</span> at a time.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-slate-600">
              {siteContent.hero.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href={siteContent.hero.primaryCta.href}
                className="btn-primary"
              >
                {siteContent.hero.primaryCta.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={siteContent.hero.secondaryCta.href}
                className="btn-secondary group"
              >
                <PlayCircle className="h-4 w-4 text-brand-600 transition group-hover:scale-110" />
                {siteContent.hero.secondaryCta.label}
              </Link>
            </div>
            <dl className="mt-14 grid max-w-xl grid-cols-2 gap-6 sm:grid-cols-4">
              {siteContent.hero.stats.map((s, i) => (
                <Reveal key={s.label} delay={0.05 * (i + 1)}>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                    {s.label}
                  </dt>
                  <dd className="mt-1 text-2xl font-bold text-navy-950">
                    {s.value}
                  </dd>
                </Reveal>
              ))}
            </dl>
          </Reveal>

          {/* DEPTH-STACKED HERO VISUAL */}
          <Reveal delay={0.15} className="relative">
            <div className="relative" style={{ perspective: 1500 }}>
              {/* main floating card */}
              <TiltCard className="rounded-3xl">
                <div className="relative overflow-hidden rounded-3xl shadow-glow ring-1 ring-brand-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=900&fit=crop"
                    alt="Student learning"
                    className="aspect-[5/4] w-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy-950/70 via-navy-950/30 to-transparent" />
                  {preview && (
                    <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/95 p-4 shadow-card backdrop-blur">
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={preview.image}
                          alt=""
                          className="h-12 w-16 rounded-lg object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-slate-900">
                            {preview.title}
                          </p>
                          <p className="text-xs text-slate-500">
                            {preview.instructor} · {preview.lessons} lessons
                          </p>
                        </div>
                        <span className="rounded-full bg-brand-600 px-2.5 py-1 text-xs font-bold text-white">
                          ${preview.priceUsd}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </TiltCard>

              {/* floating "Project shipped" chip */}
              <div className="absolute -left-6 -top-4 hidden sm:block">
                <Reveal delay={0.4}>
                  <div className="flex items-center gap-3 rounded-2xl border border-white/70 bg-white/90 p-3 pr-5 shadow-cardHover backdrop-blur">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-100 text-emerald-700">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Project shipped</p>
                      <p className="text-xs text-slate-500">
                        Day 14 — React track
                      </p>
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* floating rating chip */}
              <div className="absolute -bottom-6 -right-6 hidden sm:block">
                <Reveal delay={0.55}>
                  <div className="rounded-2xl border border-white/70 bg-white/90 p-4 shadow-cardHover backdrop-blur">
                    <div className="flex items-center gap-1 text-amber-400">
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                    </div>
                    <p className="mt-1 text-xs font-semibold text-slate-900">
                      4.8 average
                    </p>
                    <p className="text-[11px] text-slate-500">
                      from 84k reviews
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ──────────────── PARTNER LOGOS STRIP ──────────────── */}
      <section className="relative border-y border-slate-200/70 bg-white/70 backdrop-blur">
        <div className="container-page py-10">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.18em] shimmer-text">
            Graduates working at
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
            {siteContent.partnerLogos.map((logo) => (
              <span
                key={logo}
                className="font-display text-lg font-semibold text-slate-400 transition hover:text-slate-600"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── VALUE PROPS ──────────────── */}
      <section className="relative isolate overflow-hidden">
        <AnimatedBackground variant="soft" />
        <div className="container-page py-24">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="section-title-eyebrow">Why us</p>
            <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
              Built by engineers, <span className="gradient-text">for engineers</span>
            </h2>
            <p className="mt-4 text-slate-600">
              Project-first, mentor-led, and verified — the way technical
              learning should feel.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {siteContent.valueProps.map((v, i) => {
              const Icon = iconMap[v.icon] ?? Code2;
              return (
                <Reveal key={v.title} delay={0.05 * i}>
                  <TiltCard className="rounded-2xl" maxTilt={4}>
                    <div className="card-glass lift h-full p-6">
                      <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-glow">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="mt-5 text-base font-bold">{v.title}</h3>
                      <p className="mt-2 text-sm text-slate-600">{v.body}</p>
                    </div>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ──────────────── CATEGORIES ──────────────── */}
      <section className="relative bg-white">
        <div className="container-page py-24">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="section-title-eyebrow">Categories</p>
              <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
                Pick your <span className="gradient-text">track</span>
              </h2>
              <p className="mt-3 max-w-lg text-slate-600">
                Eight learning tracks. One platform. Find what fits the career
                you actually want.
              </p>
            </div>
            <Link
              href="/courses"
              className="text-sm font-semibold text-brand-700 hover:underline"
            >
              See all categories →
            </Link>
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c, i) => {
              const Icon = iconMap[c.icon] ?? Globe2;
              return (
                <Reveal key={c.name} delay={0.04 * i}>
                  <Link
                    href={`/courses?category=${encodeURIComponent(c.name)}`}
                    className="group block h-full overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-card lift hover:shadow-cardHover"
                  >
                    <div className="relative">
                      <div className="absolute -right-3 -top-3 h-16 w-16 rounded-full bg-brand-100/60 opacity-0 blur-2xl transition group-hover:opacity-100" />
                      <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-sky-100 to-brand-100 text-brand-700 ring-1 ring-inset ring-brand-200/60 transition group-hover:from-brand-500 group-hover:to-brand-700 group-hover:text-white">
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>
                    <h3 className="mt-5 text-base font-bold">{c.name}</h3>
                    <p className="mt-1 text-xs text-slate-500">
                      {c.description}
                    </p>
                    <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand-700 opacity-0 transition group-hover:opacity-100">
                      Browse <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ──────────────── FEATURED COURSES ──────────────── */}
      <section className="relative isolate overflow-hidden">
        <AnimatedBackground variant="soft" />
        <div className="container-page py-24">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="section-title-eyebrow">Featured</p>
              <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
                This month's <span className="gradient-text">most-loved</span> courses
              </h2>
            </div>
            <Link href="/courses" className="btn-secondary">
              Browse all courses
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
          <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {fallback.map((c, i) => (
              <Reveal key={c.id} delay={0.05 * i}>
                <CourseCard course={c} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── HOW IT WORKS ──────────────── */}
      <section className="relative overflow-hidden bg-white">
        <div className="container-page py-24">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="section-title-eyebrow">How it works</p>
            <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
              From sign-up to your{" "}
              <span className="gradient-text">first portfolio piece</span>
            </h2>
            <p className="mt-4 text-slate-600">
              Three steps. No fluff.
            </p>
          </Reveal>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {siteContent.howItWorks.map((h, i) => (
              <Reveal key={h.step} delay={0.08 * i}>
                <div className="card lift relative h-full overflow-hidden p-7">
                  <span className="absolute -right-2 -top-2 font-display text-7xl font-bold text-brand-50">
                    {h.step}
                  </span>
                  <span className="relative font-display text-3xl font-bold text-brand-600">
                    {h.step}
                  </span>
                  <h3 className="relative mt-4 text-xl font-bold">{h.title}</h3>
                  <p className="relative mt-2 text-sm text-slate-600">
                    {h.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── TESTIMONIALS ──────────────── */}
      <section className="relative isolate overflow-hidden">
        <AnimatedBackground variant="soft" />
        <div className="container-page py-24">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="section-title-eyebrow">Wall of love</p>
            <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
              250,000+ learners,{" "}
              <span className="gradient-text">real outcomes</span>
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {siteContent.testimonials.map((t, i) => (
              <Reveal key={t.name} delay={0.07 * i}>
                <TiltCard maxTilt={4} className="rounded-2xl">
                  <figure className="card-glass lift h-full p-6">
                    <Quote className="h-6 w-6 text-brand-400" />
                    <blockquote className="mt-3 text-sm leading-relaxed text-slate-700">
                      "{t.quote}"
                    </blockquote>
                    <figcaption className="mt-5 flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="h-10 w-10 rounded-full object-cover ring-2 ring-white"
                      />
                      <div>
                        <p className="text-sm font-semibold">{t.name}</p>
                        <p className="text-xs text-slate-500">{t.role}</p>
                      </div>
                    </figcaption>
                  </figure>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── FINAL CTA (NAVY) ──────────────── */}
      <section className="relative overflow-hidden bg-white">
        <div className="container-page py-24">
          <Reveal>
            <div className="relative isolate overflow-hidden rounded-[2rem] px-8 py-16 text-center text-white sm:px-16">
              <AnimatedBackground variant="navy" />
              <div className="relative">
                <h2 className="text-4xl font-bold sm:text-5xl">
                  {siteContent.finalCta.title}
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-brand-100/90">
                  {siteContent.finalCta.body}
                </p>
                <div className="mt-10 flex flex-wrap justify-center gap-3">
                  <Link
                    href={siteContent.finalCta.primary.href}
                    className="btn bg-white text-brand-700 hover:bg-brand-50"
                  >
                    {siteContent.finalCta.primary.label}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href={siteContent.finalCta.secondary.href}
                    className="btn border border-white/30 text-white hover:bg-white/10"
                  >
                    {siteContent.finalCta.secondary.label}
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}

// Tiny inline icon (avoids one more import)
function Star(props: any) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M12 2l2.92 6.91L22 9.97l-5.36 4.78L18.18 22 12 18.27 5.82 22l1.54-7.25L2 9.97l7.08-1.06L12 2z" />
    </svg>
  );
}
