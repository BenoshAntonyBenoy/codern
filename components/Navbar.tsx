"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, GraduationCap, Search, UserCog, ShoppingCart } from "lucide-react";
import { siteContent } from "@/data/siteContent";
import { useAuthStore, useCartStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isAdmin = useAuthStore((s) => s.isAdmin);
  const cartCount = useCartStore((s) => s.items.length);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all",
        scrolled
          ? "border-b border-slate-200/70 bg-white/85 backdrop-blur-xl shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-glow transition group-hover:scale-105">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            {siteContent.brand.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {siteContent.nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link href="/courses" className="btn-ghost" aria-label="Search">
            <Search className="h-4 w-4" />
          </Link>
          <Link
            href="/cart"
            className="relative btn-ghost"
            aria-label="Cart"
          >
            <ShoppingCart className="h-4 w-4" />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-brand-600 px-1 text-[10px] font-bold text-white shadow ring-2 ring-white">
                {cartCount}
              </span>
            )}
          </Link>
          {isAdmin ? (
            <Link href="/admin" className="btn-secondary">
              <UserCog className="h-4 w-4" /> Admin
            </Link>
          ) : (
            <Link href="/admin/login" className="btn-ghost text-sm">
              Sign in
            </Link>
          )}
          <Link href="/courses" className="btn-primary text-sm">
            Get started
          </Link>
        </div>

        <button
          className="rounded-lg p-2 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="container-page space-y-1 py-3">
            {siteContent.nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/cart"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              <span className="inline-flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" /> Cart
              </span>
              {cartCount > 0 && (
                <span className="rounded-full bg-brand-600 px-2 py-0.5 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>
            <div className="flex gap-2 pt-2">
              {isAdmin ? (
                <Link href="/admin" className="btn-secondary flex-1">
                  Admin panel
                </Link>
              ) : (
                <Link href="/admin/login" className="btn-secondary flex-1">
                  Sign in
                </Link>
              )}
              <Link href="/courses" className="btn-primary flex-1">
                Get started
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
