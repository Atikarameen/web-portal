"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/education", label: "Education" },
  { href: "/academics", label: "Academics" },
];

export default function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 -mx-5 border-b border-white/10 bg-slate-950/70 px-5 backdrop-blur-md sm:-mx-8 sm:px-8">
      <div className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-sky-400 to-indigo-500 text-sm font-bold text-slate-950 shadow-lg shadow-sky-500/20 transition group-hover:scale-105">
            A
          </span>
          <span className="hidden text-sm font-semibold tracking-tight text-slate-200 sm:block">
            Artistan&apos;s Portal
          </span>
        </Link>

        <nav aria-label="Main">
          <ul className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={
                      active
                        ? "block rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-medium text-white shadow-sm sm:px-4"
                        : "block rounded-full px-3.5 py-1.5 text-sm font-medium text-slate-400 transition hover:text-white sm:px-4"
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
