import type { Metadata } from "next";
import Link from "next/link";
import { education } from "@/lib/data";

export const metadata: Metadata = {
  title: "Education",
  description: "My academic history, from school to university.",
};

export default function EducationPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Education
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-slate-400">
          A timeline of where I studied and what I focused on at each stage.
        </p>
      </header>

      <ol className="relative space-y-6 border-l border-white/10 pl-6 sm:pl-8">
        {education.map((entry) => (
          <li key={entry.qualification} className="relative">
            <span className="absolute -left-[31px] top-6 h-3 w-3 rounded-full border-2 border-slate-950 bg-sky-400 sm:-left-[39px]" />
            <article className="card space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="chip">{entry.period}</span>
                <span className="text-xs text-slate-500">{entry.location}</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">
                  {entry.qualification}
                </h2>
                <p className="text-sm font-medium text-sky-300">
                  {entry.institution}
                </p>
              </div>
              <p className="text-sm leading-relaxed text-slate-400">
                {entry.detail}
              </p>
              <ul className="flex flex-wrap gap-2 pt-1">
                {entry.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="rounded-lg bg-white/[0.05] px-2.5 py-1 text-xs text-slate-300"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ol>

      <section className="card">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-500">
          Currently enrolled
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">
          Fall 2026 semester — four courses covering data structures, databases,
          web engineering and discrete mathematics. The full marks breakdown lives
          on the{" "}
          <Link href="/academics" className="link-quiet">
            academics page
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
