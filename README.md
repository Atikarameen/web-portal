# Personal Web Portal

A three-page personal portal built with **Next.js (App Router)**, **TypeScript** and **Tailwind CSS v4**. Designed to deploy to **Vercel** with zero configuration.

| Route        | What it shows                                                        |
| ------------ | -------------------------------------------------------------------- |
| `/`          | Profile, quick stats, links to the other pages                       |
| `/education` | Education timeline (school → college → university)                   |
| `/academics` | Quizzes, assignments, marks, per-course averages and estimated GPA   |

## Where to edit your content

Everything is data-driven from one file:

```
lib/data.ts
```

- `profile` — name, role, tagline, email, GitHub, focus list, skills
- `education` — timeline entries (period, qualification, institution, highlights)
- `courses` — course code, title, credits, instructor, term
- `assessments` — quizzes and assignments with `score` / `max` / `status`

Set `score: null` for anything not marked yet and it is excluded from the average.

Grade thresholds, GPA weights and summary maths live in `lib/grades.ts`.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build

```bash
npm run build
npm start
```

## Deploy to Vercel

### Option A — GitHub + Vercel dashboard (recommended)

1. Create an empty repo on GitHub (no README, no .gitignore).
2. In this folder:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: personal portal"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. Go to <https://vercel.com/new>, sign in with GitHub, import the repo.
4. Framework preset is detected automatically (**Next.js**) — leave build/output
   settings as they are and click **Deploy**.

### Option B — Vercel CLI

```bash
npm i -g vercel
vercel        # preview deployment, answer the prompts
vercel --prod # production deployment
```

## Notes

- `next-env.d.ts` is generated on first run and is git-ignored.
- No environment variables are needed for this static portal.
- To add a page, create `app/<route>/page.tsx` and add a link in
  `components/SiteNav.tsx`.
