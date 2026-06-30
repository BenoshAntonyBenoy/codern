import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { siteContent } from "@/data/siteContent";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-6">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-600 text-white">
                <GraduationCap className="h-5 w-5" />
              </span>
              <span className="font-display text-lg font-bold">
                {siteContent.brand.name}
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-slate-600">
              {siteContent.brand.description}
            </p>
          </div>
          {siteContent.footer.columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-slate-900">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-slate-600 hover:text-slate-900"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-slate-200 pt-6 text-sm text-slate-500">
          {siteContent.footer.bottom}
        </div>
      </div>
    </footer>
  );
}
