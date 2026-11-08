import type { Metadata } from "next";
import "./globals.css";
import SiteNav from "@/components/SiteNav";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: {
    default: `${profile.name} · Personal Portal`,
    template: `%s · ${profile.name}`,
  },
  description:
    "A personal web portal with my profile, education history, and academic record.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen text-slate-100 antialiased">
        <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-5 sm:px-8">
          <SiteNav />
          <main className="flex-1 py-10 sm:py-14">{children}</main>
          <footer className="border-t border-white/10 py-6 text-xs text-slate-500">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p>
                © {new Date().getFullYear()} {profile.name}. Built with Next.js &
                Tailwind CSS.
              </p>
              <a href={`mailto:${profile.email}`} className="link-quiet">
                {profile.email}
              </a>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
