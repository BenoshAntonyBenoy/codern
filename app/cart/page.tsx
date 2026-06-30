"use client";

import Link from "next/link";
import {
  ShoppingCart,
  Trash2,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Tag,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCartStore, useCourseStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const clearCart = useCartStore((s) => s.clearCart);
  const courses = useCourseStore((s) => s.courses);
  const isHydrated = useCourseStore((s) => s.isHydrated);

  const rows = items
    .map((i) => {
      const course = courses.find((c) => c.id === i.courseId);
      return course ? { ...course, addedAt: i.addedAt } : null;
    })
    .filter(Boolean) as (NonNullable<ReturnType<typeof Array.prototype.find>> &
    { addedAt: string })[];

  const subtotal = rows.reduce((acc, c: any) => acc + c.priceUsd, 0);
  const savings = rows.reduce(
    (acc, c: any) =>
      acc + (c.originalPriceUsd ? c.originalPriceUsd - c.priceUsd : 0),
    0
  );
  const total = subtotal;

  if (!isHydrated) {
    return (
      <>
        <Navbar />
        <div className="container-page py-32 text-center text-slate-500">
          Loading…
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section className="border-b border-slate-200 bg-white">
        <div className="container-page py-10">
          <p className="section-title-eyebrow">Your bag</p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
            Shopping{" "}
            <span className="gradient-text">cart</span>{" "}
            <span className="text-slate-400 text-2xl font-medium">
              ({rows.length} {rows.length === 1 ? "item" : "items"})
            </span>
          </h1>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="container-page py-12">
          {rows.length === 0 ? (
            <div className="card mx-auto max-w-xl p-12 text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-600">
                <ShoppingCart className="h-6 w-6" />
              </div>
              <h2 className="mt-6 text-xl font-bold">Your cart is empty</h2>
              <p className="mt-2 text-sm text-slate-600">
                Browse our catalogue and add a course to get started.
              </p>
              <Link href="/courses" className="btn-primary mt-6">
                Browse courses <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
              {/* Items */}
              <div className="space-y-4">
                {rows.map((c: any) => (
                  <div
                    key={c.id}
                    className="card flex flex-col gap-4 p-5 sm:flex-row"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={c.image}
                      alt={c.title}
                      className="aspect-[16/10] w-full rounded-xl object-cover sm:w-44"
                    />
                    <div className="flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <span className="badge-brand">{c.category}</span>
                          <Link
                            href={`/courses/${c.slug}`}
                            className="mt-2 block text-base font-bold hover:text-brand-700"
                          >
                            {c.title}
                          </Link>
                          <p className="mt-1 text-sm text-slate-600">
                            by{" "}
                            <span className="font-medium text-slate-800">
                              {c.instructor}
                            </span>{" "}
                            · {c.lessons} lessons · {c.durationHours}h
                          </p>
                        </div>
                        <div className="text-right">
                          {c.originalPriceUsd && (
                            <p className="text-xs text-slate-400 line-through">
                              {formatPrice(c.originalPriceUsd)}
                            </p>
                          )}
                          <p className="text-lg font-bold text-slate-900">
                            {formatPrice(c.priceUsd)}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center gap-3">
                        <button
                          onClick={() => removeFromCart(c.id)}
                          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-3.5 w-3.5" /> Remove
                        </button>
                        <Link
                          href={`/courses/${c.slug}`}
                          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-100"
                        >
                          View details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  onClick={clearCart}
                  className="text-sm text-slate-500 hover:text-red-600"
                >
                  Clear cart
                </button>
              </div>

              {/* Summary */}
              <aside className="card h-fit p-6">
                <h2 className="text-lg font-bold">Order summary</h2>
                <dl className="mt-5 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-slate-600">Subtotal</dt>
                    <dd className="font-medium">{formatPrice(subtotal)}</dd>
                  </div>
                  {savings > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <dt className="inline-flex items-center gap-1">
                        <Tag className="h-3.5 w-3.5" /> Savings
                      </dt>
                      <dd className="font-medium">
                        − {formatPrice(savings)}
                      </dd>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <dt className="text-slate-600">Tax</dt>
                    <dd className="text-slate-500">Calculated at checkout</dd>
                  </div>
                  <div className="my-3 border-t border-slate-200" />
                  <div className="flex items-baseline justify-between">
                    <dt className="text-base font-semibold">Total</dt>
                    <dd className="text-2xl font-bold">
                      {formatPrice(total)}
                    </dd>
                  </div>
                </dl>
                <button
                  className="btn-primary mt-6 w-full"
                  onClick={() =>
                    alert(
                      "Demo only — checkout isn't wired up. Plug in Stripe / Razorpay in lib/ for real payments."
                    )
                  }
                >
                  Checkout <ArrowRight className="h-4 w-4" />
                </button>
                <ul className="mt-5 space-y-2 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    Lifetime access on every course
                  </li>
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                    30-day money-back guarantee
                  </li>
                </ul>
              </aside>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
