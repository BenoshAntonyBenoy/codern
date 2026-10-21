import { NextRequest, NextResponse } from "next/server";
import { COOKIE, TTL, verifyPassword, createSession } from "@/lib/admin-crypto.mjs";
import { siteContent } from "@/data/siteContent";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const failures = new Map<string, { count: number; until: number }>();

function sameOrigin(req: NextRequest) {
  try {
    const origin = new URL(req.headers.get("origin") || "");
    return origin.host === req.headers.get("host") && (origin.protocol === "https:" || process.env.NODE_ENV !== "production");
  } catch { return false; }
}
function reply(error: string, status: number) {
  return NextResponse.json({ error }, { status, headers: { "Cache-Control": "no-store" } });
}
export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) return reply("Submit the form from this website.", 403);
  const hash = process.env.CODERN_ADMIN_PASSWORD_HASH;
  const secret = process.env.CODERN_ADMIN_SESSION_SECRET;
  if (!hash || !secret || secret.length < 32) return reply("Admin sign-in is not configured.", 503);
  if (Number(req.headers.get("content-length") || 0) > 4096) return reply("Request too large.", 413);
  const ip = req.headers.get("x-vercel-forwarded-for") || "unknown";
  const now = Date.now();
  for (const [key, item] of failures) if (item.until < now) failures.delete(key);
  const attempts = failures.get(ip) || { count: 0, until: now + 60000 };
  if (attempts.count >= 10) return reply("Too many attempts. Wait a minute.", 429);
  let body;
  try {
    const text = await req.text();
    if (Buffer.byteLength(text, "utf8") > 4096) return reply("Request too large.", 413);
    body = JSON.parse(text);
  } catch { return reply("Invalid form.", 400); }
  attempts.count++; failures.set(ip, attempts);
  if (!body || typeof body.email !== "string" || body.email.trim().toLowerCase() !== siteContent.admin.email.toLowerCase() || !await verifyPassword(body.password, hash)) return reply("Invalid email or password.", 401);
  failures.delete(ip);
  const res = NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  res.cookies.set(COOKIE, createSession(secret, hash), { httpOnly: true, secure: true, sameSite: "strict", path: "/", maxAge: TTL });
  return res;
}
export async function DELETE(req: NextRequest) {
  if (!sameOrigin(req)) return reply("Sign out from this website.", 403);
  const res = NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  res.cookies.set(COOKIE, "", { httpOnly: true, secure: true, sameSite: "strict", path: "/", maxAge: 0 });
  return res;
}
