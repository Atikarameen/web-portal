import Link from "next/link";
import { profile, assessments, courses } from "@/lib/data";
import { formatPercent, gpa, overallPercent, summarise } from "@/lib/grades";

export default function HomePage() {
  const summaries = summarise(courses, assessments);
  const average = formatPercent(overallPercent(assessments));
  const gpaValue = gpa(summaries);

  const cards = [
    {
      href: "/education",
      title: "Education",
      description:
        "Degrees, institutions and the milestones along the way — from school to university.",
      cta: "View my education",
      accent: "from-sky-400/20 to-transparent",
    },
    {
      href: "/academics",
      title: "Academics",
      description:
        "Every quiz, assignment and graded mark for the current term, with running averages.",
      cta: "Open my marks",
      accent: "from-indigo-400/20 to-transparent",
    },
  ];

  return (
    <div className="space-y-12">
      <section className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
        <div className="space-y-5">
          <span className="chip">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Available for collaboration
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-sky-300 via-indigo-300 to-emerald-300 bg-clip-text text-transparent">
              {profile.name}
            </span>
          </h1>
          <p className="text-base font-medium text-sky-300/90">{profile.role}</p>
          <p className="max-w-xl text-base leading-relaxed text-slate-400">
            {profile.tagline}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/academics"
              className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-sky-200"
            >
              See my marks
            </Link>
            <a
              href={`mailto:${profile.email}`}
              className="rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-sky-400/40 hover:text-white"
            >
              Get in touch
            </a>
          </div>
        </div>

        <div className="card space-y-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            At a glance
          </p>
          <dl className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-white/[0.04] p-4">
              <dt className="text-xs text-slate-400">Average</dt>
              <dd className="mt-1 text-2xl font-semibold text-white">{average}</dd>
            </div>
            <div className="rounded-xl bg-white/[0.04] p-4">
              <dt className="text-xs text-slate-400">GPA</dt>
              <dd className="mt-1 text-2xl font-semibold text-white">
                {gpaValue ? gpaValue.toFixed(2) : "—"}
              </dd>
            </div>
            <div className="rounded-xl bg-white/[0.04] p-4">
              <dt className="text-xs text-slate-400">Courses</dt>
              <dd className="mt-1 text-2xl font-semibold text-white">
                {courses.length}
              </dd>
            </div>
            <div className="rounded-xl bg-white/[0.04] p-4">
              <dt className="text-xs text-slate-400">Assessments</dt>
              <dd className="mt-1 text-2xl font-semibold text-white">
                {assessments.length}
              </dd>
            </div>
          </dl>
          <p className="text-xs leading-relaxed text-slate-500">
            Figures are computed live from the records on the academics page.
          </p>
        </div>
      </section>

      <section className="grid gap-5 sm:grid-cols-2">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="card group relative overflow-hidden transition hover:border-white/25"
          >
            <div
              className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${card.accent} opacity-0 transition group-hover:opacity-100`}
            />
            <div className="relative space-y-2">
              <h2 className="text-lg font-semibold text-white">{card.title}</h2>
              <p className="text-sm leading-relaxed text-slate-400">
                {card.description}
              </p>
              <p className="pt-2 text-sm font-medium text-sky-300">
                {card.cta} <span aria-hidden>→</span>
              </p>
            </div>
          </Link>
        ))}
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="card space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-500">
            What I&apos;m working on
          </h2>
          <ul className="space-y-2.5">
            {profile.focus.map((item) => (
              <li key={item} className="flex gap-2.5 text-sm text-slate-300">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="card space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-500">
            Tools I use
          </h2>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill) => (
              <span key={skill} className="chip">
                {skill}
              </span>
            ))}
          </div>
          <p className="pt-2 text-sm text-slate-400">
            Based in {profile.location}. Find me on{" "}
            <a href={profile.github} className="link-quiet" target="_blank" rel="noreferrer">
              GitHub
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
