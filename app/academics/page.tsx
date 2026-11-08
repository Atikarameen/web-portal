import type { Metadata } from "next";
import { assessments, courses } from "@/lib/data";
import {
  formatPercent,
  gpa,
  letterGrade,
  overallPercent,
  summarise,
} from "@/lib/grades";

export const metadata: Metadata = {
  title: "Academics",
  description: "Quizzes, assignments and marks for the current term.",
};

const statusStyles: Record<string, string> = {
  graded: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  submitted: "border-sky-400/30 bg-sky-400/10 text-sky-300",
  pending: "border-amber-400/30 bg-amber-400/10 text-amber-300",
  late: "border-rose-400/30 bg-rose-400/10 text-rose-300",
};

export default function AcademicsPage() {
  const summaries = summarise(courses, assessments);
  const average = overallPercent(assessments);
  const gpaValue = gpa(summaries);
  const graded = assessments.filter((a) => a.score !== null).length;
  const outstanding = assessments.filter((a) => a.score === null).length;

  const stats = [
    { label: "Overall average", value: formatPercent(average), hint: "all graded items" },
    { label: "GPA (est.)", value: gpaValue ? gpaValue.toFixed(2) : "—", hint: "credit weighted" },
    { label: "Graded", value: `${graded}/${assessments.length}`, hint: "items marked" },
    { label: "Outstanding", value: String(outstanding), hint: "awaiting marks" },
  ];

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Academics
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-slate-400">
          Quizzes, assignments and marks for Fall 2026. Percentages and the GPA
          are calculated from the records below.
        </p>
      </header>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="card space-y-1">
            <p className="text-xs uppercase tracking-widest text-slate-500">
              {stat.label}
            </p>
            <p className="text-3xl font-semibold text-white">{stat.value}</p>
            <p className="text-xs text-slate-500">{stat.hint}</p>
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-white">Courses</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {summaries.map(({ course, percent, grade, gradedCount, totalCount }) => (
            <article key={course.code} className="card space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-sky-400">
                    {course.code}
                  </p>
                  <h3 className="text-base font-semibold text-white">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {course.credits} credits · {course.instructor}
                  </p>
                </div>
                <div className="shrink-0 rounded-xl bg-white/[0.06] px-3 py-1.5 text-center">
                  <p className="text-lg font-semibold leading-none text-white">
                    {grade}
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-widest text-slate-500">
                    grade
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-sky-400 to-indigo-400"
                    style={{ width: `${Math.min(percent ?? 0, 100)}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>{formatPercent(percent)}</span>
                  <span>
                    {gradedCount}/{totalCount} graded
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h2 className="text-lg font-semibold text-white">
            Quizzes &amp; assignments
          </h2>
          <p className="text-xs text-slate-500">
            {assessments.length} records · {letterGrade(average)} average
          </p>
        </div>

        <div className="card overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-white/10 bg-white/[0.03] text-xs uppercase tracking-widest text-slate-500">
                <tr>
                  <th scope="col" className="px-5 py-3 font-semibold">Course</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Item</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Due</th>
                  <th scope="col" className="px-5 py-3 text-right font-semibold">
                    Score
                  </th>
                  <th scope="col" className="px-5 py-3 text-right font-semibold">
                    %
                  </th>
                  <th scope="col" className="px-5 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.07]">
                {assessments.map((item) => {
                  const percent =
                    item.score === null ? null : (item.score / item.max) * 100;
                  return (
                    <tr key={item.id} className="transition hover:bg-white/[0.03]">
                      <td className="whitespace-nowrap px-5 py-3 text-xs font-semibold text-sky-400">
                        {item.courseCode}
                      </td>
                      <td className="px-5 py-3">
                        <p className="font-medium text-slate-200">{item.title}</p>
                        <p className="text-xs capitalize text-slate-500">
                          {item.kind}
                        </p>
                      </td>
                      <td className="whitespace-nowrap px-5 py-3 text-xs text-slate-400">
                        {new Date(item.due).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="whitespace-nowrap px-5 py-3 text-right text-slate-300">
                        {item.score === null ? "—" : `${item.score}/${item.max}`}
                      </td>
                      <td className="whitespace-nowrap px-5 py-3 text-right font-medium text-slate-200">
                        {formatPercent(percent)}
                      </td>
                      <td className="whitespace-nowrap px-5 py-3">
                        <span
                          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${statusStyles[item.status]}`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <p className="text-xs leading-relaxed text-slate-500">
        Data lives in <code className="text-slate-400">lib/data.ts</code> — edit
        that file to add new quizzes, assignments or courses and every figure on
        this page updates automatically.
      </p>
    </div>
  );
}
