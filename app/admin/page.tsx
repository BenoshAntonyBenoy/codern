import { redirect } from "next/navigation";
import { hasAdminSession } from "@/lib/admin-auth";
import Dashboard from "./Dashboard";

export default function AdminPage() {
  if (!hasAdminSession()) redirect("/admin/login");
  return <Dashboard />;
}
