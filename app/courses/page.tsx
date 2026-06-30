"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CourseCard from "@/components/CourseCard";
import { useCourseStore } from "@/lib/store";
import { categories } from "@/data/seedCourses";
import { cn } from "@/lib/utils";

const LEVELS = ["All", "Beginner", "Intermediate", "Advanced"] as const;
const SORTS = [
  { key: "popular", label: "Most popular" },
  { key: "rating", label: "Top rated" },
  { key: "newest", label: "Newest" },
  { key: "priceAsc", label: "Price: low to high" },
  { key: "priceDesc", label: "Price: high to low" },
];

export default function CoursesPage() {
  const courses = useCourseStore((s) => s.courses);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [level, setLevel] = useState<(typeof LEVELS)[number]>("All");
  const [sort, setSort] = useState("popular");

  const filtered = useMemo(() => {
    let r = courses.slice();
    if (query.trim()) {
      const q = query.toLowerCase();
      r = r.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.subtitle.toLowerCase().includes(q) ||
          c.instructor.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q)
      );
    }
    if (category !== "All") r = r.filter((c) => c.category === category);
    if (level !== "All") r = r.filter((c) => c.level === level);
    switch (sort) {
      case "rating":
        r.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        r.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        break;
      case "priceAsc":
        r.sort((a, b) => a.priceUsd - b.priceUsd);
        break;
      case "priceDesc":
        r.sort((a, b) => b.priceUsd - a.priceUsd);
        break;
      default:
        r.sort((a, b) => b.reviews - a.reviews);
    }
    return r;
  }, [courses, query, category, level, sort]);

  return (
    <>
      <Navbar />
      {/* HEADER */}
      <section className="border-b border-slate-200 bg-white">
        <div className="container-page py-12">
          <h1 className="text-3xl font-bold sm:text-4xl">All courses</h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Browse {courses.length} hand-crafted courses across web, data, AI,
            mobile, cloud and more. Filter and sort to find your next track.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title, instructor or topic…"
                className="input pl-10"
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="input sm:w-56"
            >
              {SORTS.map((s) => (
                <option key={s.key} value={s.key}>
                  Sort: {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* BODY */}
      <section className="bg-slate-50">
        <div className="container-page grid gap-8 py-12 lg:grid-cols-[260px_1fr]">
          {/* Sidebar */}
          <aside className="card h-fit p-5">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </h3>

            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Category
              </p>
              <div className="mt-3 space-y-1">
                <Chip
                  active={category === "All"}
                  onClick={() => setCategory("All")}
                >
                  All categories
                </Chip>
                {categories.map((c) => (
                  <Chip
                    key={c.name}
                    active={category === c.name}
                    onClick={() => setCategory(c.name)}
                  >
                    {c.name}
                  </Chip>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Level
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {LEVELS.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLevel(l)}
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-medium transition",
                      level === l
                        ? "bg-brand-600 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    )}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setQuery("");
                setCategory("All");
                setLevel("All");
                setSort("popular");
              }}
              className="mt-6 w-full btn-ghost text-sm"
            >
              Reset filters
            </button>
          </aside>

          {/* Grid */}
          <div>
            <p className="mb-4 text-sm text-slate-600">
              Showing <span className="font-semibold">{filtered.length}</span>{" "}
              of {courses.length} courses
            </p>
            {filtered.length === 0 ? (
              <div className="card p-12 text-center">
                <p className="font-semibold">No courses match your filters.</p>
                <p className="mt-1 text-sm text-slate-600">
                  Try resetting filters or searching for something different.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((c) => (
                  <CourseCard key={c.id} course={c} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

function Chip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "block w-full rounded-md px-3 py-2 text-left text-sm transition",
        active
          ? "bg-brand-50 font-semibold text-brand-700"
          : "text-slate-700 hover:bg-slate-100"
      )}
    >
      {children}
    </button>
  );
}
