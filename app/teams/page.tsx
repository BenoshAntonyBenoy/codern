"use client";

import Link from "next/link";
import {
  ArrowRight,
  Users,
  ShieldCheck,
  BarChart3,
  Sparkles,
  Building2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import AnimatedBackground from "@/components/AnimatedBackground";
import { siteContent } from "@/data/siteContent";

const iconMap: Record<string, any> = {
  Users,
  ShieldCheck,
  BarChart3,
  Sparkles,
};

export default function TeamsPage() {
  const t = siteContent.teams;

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <AnimatedBackground variant="hero" />
        <div className="container-page grid items-center gap-12 py-20 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <span className="section-title-eyebrow">
              <Building2 className="mr-1 inline h-3.5 w-3.5" /> {t.eyebrow}
            </span>
            <h1 className="mt-3 text-5xl font-bold leading-[1.05] sm:text-6xl">
              Level up your{" "}
              <span className="gradient-text">engineering org</span>.
            </h1>
            <p className="mt-4 max-w-xl text-lg text-slate-600">
              {t.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={t.finalCta.primary.href}
                className="btn-primary"
              >
                {t.finalCta.primary.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={t.finalCta.secondary.href}
                className="btn-secondary"
              >
                {t.finalCta.secondary.label}
              </Link>
            </div>
            <dl className="mt-12 grid max-w-lg grid-cols-2 gap-6 sm:grid-cols-4">
              {t.stats.map((s, i) => (
                <Reveal key={s.label} delay={0.05 * (i + 1)}>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                    {s.label}
                  </dt>
                  <dd className="mt-1 text-2xl font-bold">{s.value}</dd>
                </Reveal>
              ))}
            </dl>
          </Reveal>

          {/* Hero visual: mock dashboard card */}
          <Reveal delay={0.15}>
            <TiltCard className="rounded-3xl" maxTilt={5}>
              <div className="card overflow-hidden">
                <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-5 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  <span className="ml-3 text-xs font-medium text-slate-500">
                    codern.app / team-dashboard
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Team progress
                      </p>
                      <p className="mt-1 text-2xl font-bold">
                        73% <span className="text-sm font-medium text-emerald-600">↑ 12%</span>
                      </p>
                    </div>
                    <span className="badge-brand">Q3 sprint</span>
                  </div>
                  <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: "73%",
                        backgroundImage:
                          "linear-gradient(90deg, #3563ff, #066bcb)",
                      }}
                    />
                  </div>
                  <div className="mt-6 grid gap-3">
                    {[
                      { name: "Aanya K.", track: "React Track", pct: 92 },
                      { name: "Marcus W.", track: "Python for Data", pct: 68 },
                      { name: "Priya M.", track: "AWS SA Prep", pct: 54 },
                    ].map((r) => (
                      <div
                        key={r.name}
                        className="flex items-center justify-between rounded-xl border border-slate-100 px-3 py-2"
                      >
                        <div>
                          <p className="text-sm font-semibold">{r.name}</p>
                          <p className="text-xs text-slate-500">{r.track}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-100">
                            <div
                              className="h-full rounded-full bg-brand-500"
                              style={{ width: `${r.pct}%` }}
                            />
                          </div>
                          <span className="w-9 text-right text-xs font-semibold">
                            {r.pct}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </section>

      {/* Logo strip */}
      <section className="border-y border-slate-200/70 bg-white/70 backdrop-blur">
        <div className="container-page py-8">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Trusted by engineering teams at
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-12 gap-y-3">
            {t.logos.map((logo) => (
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

      {/* Highlights */}
      <section className="relative isolate overflow-hidden">
        <AnimatedBackground variant="soft" />
        <div className="container-page py-20">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="section-title-eyebrow">What you get</p>
            <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
              Everything a{" "}
              <span className="gradient-text">learning-and-development</span>{" "}
              team needs
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.highlights.map((h, i) => {
              const Icon = iconMap[h.icon] ?? Users;
              return (
                <Reveal key={h.title} delay={0.05 * i}>
                  <TiltCard className="rounded-2xl" maxTilt={4}>
                    <div className="card-glass lift h-full p-6">
                      <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="mt-5 text-base font-bold">{h.title}</h3>
                      <p className="mt-2 text-sm text-slate-600">{h.body}</p>
                    </div>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final navy CTA */}
      <section className="bg-white">
        <div className="container-page py-20">
          <Reveal>
            <div className="relative isolate overflow-hidden rounded-[2rem] px-8 py-16 text-center text-white sm:px-16">
              <AnimatedBackground variant="navy" />
              <div className="relative">
                <h2 className="text-4xl font-bold sm:text-5xl">
                  {t.finalCta.title}
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-brand-100/90">
                  {t.finalCta.body}
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <Link
                    href={t.finalCta.primary.href}
                    className="btn bg-white text-brand-700 hover:bg-brand-50"
                  >
                    {t.finalCta.primary.label}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href={t.finalCta.secondary.href}
                    className="btn border border-white/30 text-white hover:bg-white/10"
                  >
                    {t.finalCta.secondary.label}
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
