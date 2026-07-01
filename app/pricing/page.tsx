"use client";

import Link from "next/link";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import AnimatedBackground from "@/components/AnimatedBackground";
import { siteContent } from "@/data/siteContent";
import { formatPrice } from "@/lib/utils";

export default function PricingPage() {
  const p = siteContent.pricing;

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <AnimatedBackground variant="hero" />
        <div className="container-page py-20 text-center">
          <Reveal>
            <span className="section-title-eyebrow">{p.eyebrow}</span>
            <h1 className="mt-3 text-5xl font-bold sm:text-6xl">
              Pay once.{" "}
              <span className="gradient-text">Own it forever.</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              {p.subtitle}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Tiers */}
      <section className="relative isolate overflow-hidden">
        <AnimatedBackground variant="soft" />
        <div className="container-page pb-20">
          <div className="grid gap-6 lg:grid-cols-3">
            {p.tiers.map((t, i) => (
              <Reveal key={t.name} delay={0.06 * i}>
                <TiltCard maxTilt={t.featured ? 5 : 3} className="rounded-2xl">
                  <div
                    className={
                      "relative flex h-full flex-col p-7 " +
                      (t.featured
                        ? "rounded-2xl border-2 border-brand-500/40 bg-white shadow-cardHover ring-1 ring-brand-200/40"
                        : "card lift")
                    }
                  >
                    {t.featured && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-500 to-brand-700 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow">
                        <Sparkles className="mr-1 inline h-3 w-3" /> Most popular
                      </span>
                    )}
                    <div>
                      <p
                        className={
                          "text-sm font-semibold " +
                          (t.featured ? "text-brand-700" : "text-slate-500")
                        }
                      >
                        {t.name}
                      </p>
                      <div className="mt-3 flex items-baseline gap-1">
                        <span className="text-4xl font-bold">
                          {formatPrice(t.priceUsd)}
                        </span>
                        <span className="text-sm text-slate-500">
                          {t.cadence}
                        </span>
                      </div>
                      <p className="mt-3 text-sm text-slate-600">
                        {t.description}
                      </p>
                    </div>
                    <ul className="mt-6 space-y-3 text-sm text-slate-700">
                      {t.features.map((f) => (
                        <li key={f} className="flex items-start gap-2">
                          <Check
                            className={
                              "mt-0.5 h-4 w-4 flex-shrink-0 " +
                              (t.featured
                                ? "text-brand-600"
                                : "text-emerald-600")
                            }
                          />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={t.cta.href}
                      className={
                        "mt-8 " +
                        (t.featured ? "btn-primary w-full" : "btn-secondary w-full")
                      }
                    >
                      {t.cta.label}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-white">
        <div className="container-page py-20">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="section-title-eyebrow">Questions</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Frequently <span className="gradient-text">asked</span>
            </h2>
          </Reveal>
          <div className="mx-auto mt-12 grid max-w-3xl gap-4">
            {p.faqs.map((f, i) => (
              <Reveal key={f.q} delay={0.05 * i}>
                <details className="card group p-5 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold text-slate-900">
                    <span>{f.q}</span>
                    <span className="ml-4 text-brand-600 transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm text-slate-600">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
