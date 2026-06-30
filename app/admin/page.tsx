"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  LogOut,
  Pencil,
  X,
  GraduationCap,
  RefreshCw,
  Search,
} from "lucide-react";
import { useAuthStore, useCourseStore } from "@/lib/store";
import { Course, categories } from "@/data/seedCourses";
import { formatPrice, slugify } from "@/lib/utils";

const blank: Omit<Course, "id" | "createdAt"> = {
  slug: "",
  title: "",
  subtitle: "",
  category: categories[0].name,
  level: "Beginner",
  durationHours: 10,
  lessons: 50,
  priceUsd: 49,
  originalPriceUsd: undefined,
  rating: 4.8,
  reviews: 0,
  instructor: "",
  instructorRole: "",
  image:
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&h=600&fit=crop",
  highlights: ["Hands-on project", "Lifetime access"],
  description: "",
  featured: false,
};

export default function AdminDashboard() {
  const router = useRouter();
  const isAdmin = useAuthStore((s) => s.isAdmin);
  const logout = useAuthStore((s) => s.logout);
  const { courses, addCourse, removeCourse, updateCourse, resetToSeed } =
    useCourseStore();

  const [query, setQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Course, "id" | "createdAt">>(blank);

  // Guard
  useEffect(() => {
    if (!isAdmin) router.push("/admin/login");
  }, [isAdmin, router]);

  if (!isAdmin) return null;

  const filtered = courses.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.category.toLowerCase().includes(query.toLowerCase())
  );

  const openCreate = () => {
    setEditingId(null);
    setForm(blank);
    setShowForm(true);
  };

  const openEdit = (c: Course) => {
    setEditingId(c.id);
    setForm({
      slug: c.slug,
      title: c.title,
      subtitle: c.subtitle,
      category: c.category,
      level: c.level,
      durationHours: c.durationHours,
      lessons: c.lessons,
      priceUsd: c.priceUsd,
      originalPriceUsd: c.originalPriceUsd,
      rating: c.rating,
      reviews: c.reviews,
      instructor: c.instructor,
      instructorRole: c.instructorRole,
      image: c.image,
      highlights: c.highlights,
      description: c.description,
      featured: c.featured,
    });
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = form.slug.trim() || slugify(form.title);
    const payload = { ...form, slug };
    if (editingId) {
      updateCourse(editingId, payload);
    } else {
      const newCourse: Course = {
        ...payload,
        id: "c-" + Math.random().toString(36).slice(2, 8),
        createdAt: new Date().toISOString().slice(0, 10),
      };
      addCourse(newCourse);
    }
    setShowForm(false);
    setEditingId(null);
    setForm(blank);
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <header className="border-b border-slate-200 bg-white">
        <div className="container-page flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-600 text-white">
              <GraduationCap className="h-5 w-5" />
            </span>
            <div>
              <p className="font-display text-base font-bold leading-tight">
                Admin panel
              </p>
              <p className="text-xs text-slate-500">Manage your catalog</p>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (
                  confirm(
                    "Reset to seed catalogue? All admin-added courses will be lost."
                  )
                )
                  resetToSeed();
              }}
              className="btn-ghost text-sm"
            >
              <RefreshCw className="h-4 w-4" /> Reset
            </button>
            <button
              onClick={() => {
                logout();
                router.push("/");
              }}
              className="btn-secondary text-sm"
            >
              <LogOut className="h-4 w-4" /> Log out
            </button>
          </div>
        </div>
      </header>

      <div className="container-page py-10">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-4">
          {[
            { label: "Total courses", value: courses.length },
            {
              label: "Categories",
              value: new Set(courses.map((c) => c.category)).size,
            },
            {
              label: "Featured",
              value: courses.filter((c) => c.featured).length,
            },
            {
              label: "Avg. price",
              value: courses.length
                ? formatPrice(
                    Math.round(
                      courses.reduce((a, b) => a + b.priceUsd, 0) /
                        courses.length
                    )
                  )
                : "—",
            },
          ].map((s) => (
            <div key={s.label} className="card p-5">
              <p className="text-xs uppercase tracking-wider text-slate-500">
                {s.label}
              </p>
              <p className="mt-2 text-2xl font-bold">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-sm flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search courses…"
              className="input pl-10"
            />
          </div>
          <button onClick={openCreate} className="btn-primary">
            <Plus className="h-4 w-4" /> New course
          </button>
        </div>

        {/* Table */}
        <div className="card mt-6 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-5 py-3">Course</th>
                  <th className="px-5 py-3">Category</th>
                  <th className="px-5 py-3">Level</th>
                  <th className="px-5 py-3">Price</th>
                  <th className="px-5 py-3">Rating</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/50">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={c.image}
                          alt=""
                          className="h-10 w-14 rounded object-cover"
                        />
                        <div>
                          <p className="font-semibold text-slate-900">
                            {c.title}
                          </p>
                          <p className="text-xs text-slate-500">
                            {c.instructor}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className="badge">{c.category}</span>
                    </td>
                    <td className="px-5 py-3">{c.level}</td>
                    <td className="px-5 py-3 font-medium">
                      {formatPrice(c.priceUsd)}
                    </td>
                    <td className="px-5 py-3">{c.rating}</td>
                    <td className="px-5 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEdit(c)}
                          className="rounded-md p-2 text-slate-600 hover:bg-slate-100"
                          aria-label="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete "${c.title}"?`))
                              removeCourse(c.id);
                          }}
                          className="rounded-md p-2 text-red-600 hover:bg-red-50"
                          aria-label="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-12 text-center text-slate-500"
                    >
                      No courses match your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showForm && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-slate-900/50 p-4"
          onClick={() => setShowForm(false)}
        >
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit}
            className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-cardHover"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">
                {editingId ? "Edit course" : "New course"}
              </h2>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-md p-1 text-slate-500 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-5 grid max-h-[70vh] gap-4 overflow-y-auto pr-1 sm:grid-cols-2">
              <Field label="Title">
                <input
                  required
                  className="input"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </Field>
              <Field label="Slug (auto if blank)">
                <input
                  className="input"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                />
              </Field>
              <Field label="Subtitle" colSpan={2}>
                <input
                  required
                  className="input"
                  value={form.subtitle}
                  onChange={(e) =>
                    setForm({ ...form, subtitle: e.target.value })
                  }
                />
              </Field>
              <Field label="Category">
                <select
                  className="input"
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                >
                  {categories.map((c) => (
                    <option key={c.name}>{c.name}</option>
                  ))}
                </select>
              </Field>
              <Field label="Level">
                <select
                  className="input"
                  value={form.level}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      level: e.target.value as Course["level"],
                    })
                  }
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </Field>
              <Field label="Duration (hours)">
                <input
                  type="number"
                  className="input"
                  value={form.durationHours}
                  onChange={(e) =>
                    setForm({ ...form, durationHours: +e.target.value })
                  }
                />
              </Field>
              <Field label="Lessons">
                <input
                  type="number"
                  className="input"
                  value={form.lessons}
                  onChange={(e) =>
                    setForm({ ...form, lessons: +e.target.value })
                  }
                />
              </Field>
              <Field label="Price (USD)">
                <input
                  type="number"
                  className="input"
                  value={form.priceUsd}
                  onChange={(e) =>
                    setForm({ ...form, priceUsd: +e.target.value })
                  }
                />
              </Field>
              <Field label="Original price (USD, optional)">
                <input
                  type="number"
                  className="input"
                  value={form.originalPriceUsd ?? ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      originalPriceUsd: e.target.value
                        ? +e.target.value
                        : undefined,
                    })
                  }
                />
              </Field>
              <Field label="Rating (0-5)">
                <input
                  type="number"
                  step="0.1"
                  className="input"
                  value={form.rating}
                  onChange={(e) =>
                    setForm({ ...form, rating: +e.target.value })
                  }
                />
              </Field>
              <Field label="Reviews">
                <input
                  type="number"
                  className="input"
                  value={form.reviews}
                  onChange={(e) =>
                    setForm({ ...form, reviews: +e.target.value })
                  }
                />
              </Field>
              <Field label="Instructor">
                <input
                  required
                  className="input"
                  value={form.instructor}
                  onChange={(e) =>
                    setForm({ ...form, instructor: e.target.value })
                  }
                />
              </Field>
              <Field label="Instructor role">
                <input
                  className="input"
                  value={form.instructorRole}
                  onChange={(e) =>
                    setForm({ ...form, instructorRole: e.target.value })
                  }
                />
              </Field>
              <Field label="Image URL" colSpan={2}>
                <input
                  className="input"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                />
              </Field>
              <Field label="Highlights (one per line)" colSpan={2}>
                <textarea
                  rows={3}
                  className="input"
                  value={form.highlights.join("\n")}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      highlights: e.target.value
                        .split("\n")
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                />
              </Field>
              <Field label="Description" colSpan={2}>
                <textarea
                  rows={4}
                  className="input"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </Field>
              <label className="col-span-2 inline-flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={!!form.featured}
                  onChange={(e) =>
                    setForm({ ...form, featured: e.target.checked })
                  }
                />
                Mark as featured (shown on landing page)
              </label>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                {editingId ? "Save changes" : "Create course"}
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}

function Field({
  label,
  children,
  colSpan = 1,
}: {
  label: string;
  children: React.ReactNode;
  colSpan?: 1 | 2;
}) {
  return (
    <div className={colSpan === 2 ? "sm:col-span-2" : ""}>
      <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </label>
      <div className="mt-1">{children}</div>
    </div>
  );
}
