"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Lock, Mail, ArrowLeft, GraduationCap } from "lucide-react";
import { siteContent } from "@/data/siteContent";
import { useAuthStore } from "@/lib/store";

export default function AdminLoginPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      email.trim().toLowerCase() === siteContent.admin.email.toLowerCase() &&
      password === siteContent.admin.password
    ) {
      login();
      router.push("/admin");
    } else {
      setError("Invalid credentials. See README for demo login.");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="container-page py-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" /> Back to site
        </Link>
      </div>
      <div className="container-page grid place-items-center pb-20">
        <div className="card w-full max-w-md p-8">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand-600 text-white">
              <GraduationCap className="h-5 w-5" />
            </span>
            <div>
              <h1 className="text-xl font-bold">{siteContent.brand.name}</h1>
              <p className="text-xs text-slate-500">Admin sign-in</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Email
              </label>
              <div className="relative mt-2">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={siteContent.admin.email}
                  className="input pl-10"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Password
              </label>
              <div className="relative mt-2">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input pl-10"
                />
              </div>
            </div>

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </div>
            )}

            <button type="submit" className="btn-primary w-full">
              Sign in
            </button>
          </form>

          <div className="mt-6 rounded-lg bg-slate-50 p-4 text-xs text-slate-600">
            <p className="font-semibold text-slate-700">Demo credentials</p>
            <p className="mt-1 font-mono">{siteContent.admin.email}</p>
            <p className="font-mono">{siteContent.admin.password}</p>
            <p className="mt-2 text-slate-500">
              Change these in <code>data/siteContent.ts</code>.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
