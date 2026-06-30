"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Clock,
  BookOpen,
  Star,
  CheckCircle2,
  ArrowLeft,
  GraduationCap,
  ShoppingCart,
  Check,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCourseStore, useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";

export default function CourseDetailPage() {
  const params = useParams<{ slug: string }>();
  const courses = useCourseStore((s) => s.courses);
  const isHydrated = useCourseStore((s) => s.isHydrated);
  const course = courses.find((c) => c.slug === params.slug);
  const cartHas = useCartStore((s) => s.items.some((i) => i.courseId === (course?.id ?? "")));
  const addToCart = useCartStore((s) => s.addToCart);
  const removeFromCart = useCartStore((s) => s.removeFromCart);

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

  if (!course) {
    return (
      <>
        <Navbar />
        <div className="container-page py-20">
          <h1 className="text-2xl font-bold">Course not found</h1>
          <p className="mt-2 text-slate-600">
            This course may have been removed.
          </p>
          <Link href="/courses" className="btn-primary mt-6">
            <ArrowLeft className="h-4 w-4" /> Back to all courses
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section className="border-b border-slate-200 bg-white">
        <div className="container-page py-12">
          <Link
            href="/courses"
            className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" /> All courses
          </Link>
          <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_360px]">
            <div>
              <span className="badge-brand">{course.category}</span>
              <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
                {course.title}
              </h1>
              <p className="mt-3 text-lg text-slate-600">{course.subtitle}</p>
              <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-slate-600">
                <span className="inline-flex items-center gap-1">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="font-semibold text-slate-900">
                    {course.rating}
                  </span>
                  ({course.reviews.toLocaleString()} reviews)
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-4 w-4" /> {course.durationHours}h total
                </span>
                <span className="inline-flex items-center gap-1">
                  <BookOpen className="h-4 w-4" /> {course.lessons} lessons
                </span>
                <span className="badge">{course.level}</span>
              </div>
              <div className="mt-6 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-brand-100 text-brand-700">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div className="text-sm">
                  <p className="font-semibold">{course.instructor}</p>
                  <p className="text-slate-500">{course.instructorRole}</p>
                </div>
              </div>
            </div>

            {/* Purchase card */}
            <aside className="card h-fit overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={course.image}
                alt={course.title}
                className="aspect-[16/10] w-full object-cover"
              />
              <div className="p-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">
                    {formatPrice(course.priceUsd)}
                  </span>
                  {course.originalPriceUsd && (
                    <span className="text-sm text-slate-400 line-through">
                      {formatPrice(course.originalPriceUsd)}
                    </span>
                  )}
                </div>
                <Link href="/cart" className="btn-primary mt-5 w-full">
                  Buy now
                </Link>
                {cartHas ? (
                  <button
                    onClick={() => removeFromCart(course.id)}
                    className="btn-secondary mt-2 w-full"
                  >
                    <Check className="h-4 w-4 text-emerald-600" />
                    In cart — remove
                  </button>
                ) : (
                  <button
                    onClick={() => addToCart(course.id)}
                    className="btn-secondary mt-2 w-full"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Add to cart
                  </button>
                )}
                <ul className="mt-6 space-y-2 text-sm text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    Lifetime access
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    Certificate of completion
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    30-day money-back guarantee
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="container-page py-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
            <div className="space-y-10">
              <div>
                <h2 className="text-2xl font-bold">What you'll learn</h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {course.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-2xl font-bold">About this course</h2>
                <p className="mt-4 leading-relaxed text-slate-700">
                  {course.description}
                </p>
              </div>
            </div>
            <div />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
