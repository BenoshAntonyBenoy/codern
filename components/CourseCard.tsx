"use client";

import Link from "next/link";
import { Clock, Star, BookOpen, ShoppingCart, Check } from "lucide-react";
import { Course } from "@/data/seedCourses";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/lib/store";
import TiltCard from "./TiltCard";

export default function CourseCard({ course }: { course: Course }) {
  const inCart = useCartStore((s) => s.items.some((i) => i.courseId === course.id));
  const addToCart = useCartStore((s) => s.addToCart);
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  return (
    <TiltCard className="rounded-2xl">
      <Link
        href={`/courses/${course.slug}`}
        className="group block overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card transition hover:shadow-cardHover"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={course.image}
            alt={course.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]"
          />
          {/* gradient veil for legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/40 via-transparent to-transparent" />
          <div className="absolute left-3 top-3">
            <span className="badge-brand">{course.category}</span>
          </div>
          {course.featured && (
            <div className="absolute right-3 top-3">
              <span className="rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-700 shadow">
                Featured
              </span>
            </div>
          )}
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="badge">{course.level}</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {course.durationHours}h
            </span>
            <span className="inline-flex items-center gap-1">
              <BookOpen className="h-3.5 w-3.5" /> {course.lessons} lessons
            </span>
          </div>
          <h3 className="mt-3 line-clamp-2 text-base font-bold text-slate-900 group-hover:text-brand-700">
            {course.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-slate-600">
            {course.subtitle}
          </p>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-slate-900">
                {course.rating}
              </span>
              <span className="text-slate-500">
                ({course.reviews.toLocaleString()})
              </span>
            </div>
            <div className="text-right">
              {course.originalPriceUsd && (
                <span className="mr-1 text-xs text-slate-400 line-through">
                  {formatPrice(course.originalPriceUsd)}
                </span>
              )}
              <span className="font-bold text-slate-900">
                {formatPrice(course.priceUsd)}
              </span>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <p className="text-xs text-slate-500">
              by{" "}
              <span className="font-medium text-slate-700">
                {course.instructor}
              </span>
            </p>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                inCart ? removeFromCart(course.id) : addToCart(course.id);
              }}
              aria-label={inCart ? "Remove from cart" : "Add to cart"}
              className={
                "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold transition " +
                (inCart
                  ? "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200"
                  : "bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-200/60 hover:bg-brand-100")
              }
            >
              {inCart ? (
                <>
                  <Check className="h-3.5 w-3.5" /> In cart
                </>
              ) : (
                <>
                  <ShoppingCart className="h-3.5 w-3.5" /> Add
                </>
              )}
            </button>
          </div>
        </div>
      </Link>
    </TiltCard>
  );
}
