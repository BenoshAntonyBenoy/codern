import "server-only";
import { cookies } from "next/headers";
import { COOKIE, validSession } from "./admin-crypto.mjs";

export function hasAdminSession() {
  return validSession(cookies().get(COOKIE)?.value, process.env.CODERN_ADMIN_SESSION_SECRET, process.env.CODERN_ADMIN_PASSWORD_HASH);
}
