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
  const [busy, setBusy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true); setError(null);
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch("/api/admin-session", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        signal: controller.signal,
      });
      const result = await response.json();
      if (!response.ok) { setError(result.error || "Sign-in failed."); return; }
      login();
      router.replace("/admin"); router.refresh();
    } catch { setError("Could not reach sign-in. Please try again."); }
    finally { window.clearTimeout(timeout); setBusy(false); }
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

          <form onSubmit={handleSubmit} className="mt-8 space-y-4" aria-busy={busy} aria-describedby="admin-login-note">
            <div>
              <label htmlFor="admin-email" className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Email
              </label>
              <div className="relative mt-2">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="admin-email"
                  name="email"
                  autoComplete="username"
                  autoCapitalize="none"
                  spellCheck={false}
                  disabled={busy}
                  aria-describedby={error ? "admin-login-error" : undefined}
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
              <label htmlFor="admin-password" className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Password
              </label>
              <div className="relative mt-2">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="admin-password"
                  name="password"
                  autoComplete="current-password"
                  disabled={busy}
                  aria-describedby={error ? "admin-login-error" : undefined}
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input pl-10"
                />
              </div>
              <button type="button" className="mt-2 text-sm font-medium text-slate-700 underline underline-offset-4" aria-controls="admin-password" aria-pressed={showPassword} disabled={busy} onClick={() => setShowPassword((current) => !current)}>
                {showPassword ? "Hide password" : "Show password"}
              </button>
            </div>

            {error && (
              <div id="admin-login-error" role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </div>
            )}

            <button type="submit" className="btn-primary w-full" disabled={busy}>
              {busy ? "Signing in…" : "Sign in"}
            </button>
            <p className="sr-only" role="status">{busy ? "Signing in. Please wait." : ""}</p>
          </form>

          <div id="admin-login-note" className="mt-6 rounded-lg bg-slate-50 p-4 text-xs text-slate-600">
            <p className="font-semibold text-slate-700">Admin account</p>
            <p className="mt-1 font-mono">{siteContent.admin.email}</p>
            <p className="mt-2 text-slate-500">
              Use your private admin password.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
