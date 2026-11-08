export type EducationEntry = {
  period: string;
  qualification: string;
  institution: string;
  location: string;
  detail: string;
  highlights: string[];
};

export type Course = {
  code: string;
  title: string;
  credits: number;
  instructor: string;
  term: string;
};

export type Assessment = {
  id: string;
  courseCode: string;
  title: string;
  kind: "quiz" | "assignment";
  due: string;
  score: number | null;
  max: number;
  status: "graded" | "submitted" | "pending" | "late";
};

export const profile = {
  name: "Artistan",
  role: "Computer Science Student",
  tagline:
    "I build small, useful web things — and use this portal to keep my coursework, quizzes and marks in one place.",
  location: "Pakistan",
  email: "artistan39@gmail.com",
  github: "https://github.com",
  focus: [
    "Learning full-stack TypeScript with Next.js",
    "Practising data structures and algorithms",
    "Building this portal as my first Vercel deployment",
  ],
  skills: ["TypeScript", "React", "Next.js", "Tailwind CSS", "SQL", "Python"],
};

export const education: EducationEntry[] = [
  {
    period: "2024 — Present",
    qualification: "BS Computer Science",
    institution: "Your University",
    location: "City, Country",
    detail:
      "Currently in the second year, focused on data structures, databases and web engineering.",
    highlights: ["CGPA 3.6 / 4.0", "Dean's list — Fall 2025", "Web dev society member"],
  },
  {
    period: "2022 — 2024",
    qualification: "Intermediate (Pre-Engineering)",
    institution: "Your College",
    location: "City, Country",
    detail: "Mathematics, physics and computer science with a strong emphasis on problem solving.",
    highlights: ["Grade A", "Top 5% of class"],
  },
  {
    period: "2020 — 2022",
    qualification: "Matriculation (Science)",
    institution: "Your School",
    location: "City, Country",
    detail: "Science group with computer studies as an elective.",
    highlights: ["Grade A+", "Science fair runner-up"],
  },
];

export const courses: Course[] = [
  {
    code: "CS201",
    title: "Data Structures & Algorithms",
    credits: 4,
    instructor: "Dr. A. Khan",
    term: "Fall 2026",
  },
  {
    code: "CS210",
    title: "Database Systems",
    credits: 3,
    instructor: "Ms. S. Riaz",
    term: "Fall 2026",
  },
  {
    code: "CS220",
    title: "Web Engineering",
    credits: 3,
    instructor: "Mr. H. Ahmed",
    term: "Fall 2026",
  },
  {
    code: "MA201",
    title: "Discrete Mathematics",
    credits: 3,
    instructor: "Dr. N. Fatima",
    term: "Fall 2026",
  },
];

export const assessments: Assessment[] = [
  { id: "q1", courseCode: "CS201", title: "Quiz 1 — Arrays & Linked Lists", kind: "quiz", due: "2026-09-12", score: 18, max: 20, status: "graded" },
  { id: "q2", courseCode: "CS201", title: "Quiz 2 — Trees & Traversals", kind: "quiz", due: "2026-10-10", score: 16, max: 20, status: "graded" },
  { id: "a1", courseCode: "CS201", title: "Assignment 1 — Sorting Visualiser", kind: "assignment", due: "2026-09-25", score: 27, max: 30, status: "graded" },
  { id: "a2", courseCode: "CS201", title: "Assignment 2 — Graph Shortest Paths", kind: "assignment", due: "2026-11-05", score: null, max: 30, status: "submitted" },

  { id: "q3", courseCode: "CS210", title: "Quiz 1 — Normalisation", kind: "quiz", due: "2026-09-18", score: 19, max: 20, status: "graded" },
  { id: "a3", courseCode: "CS210", title: "Assignment 1 — ER Modelling", kind: "assignment", due: "2026-10-02", score: 28, max: 30, status: "graded" },
  { id: "a4", courseCode: "CS210", title: "Lab 3 — Indexing & Query Plans", kind: "assignment", due: "2026-11-12", score: null, max: 25, status: "pending" },

  { id: "q4", courseCode: "CS220", title: "Quiz 1 — HTTP & REST", kind: "quiz", due: "2026-09-20", score: 17, max: 20, status: "graded" },
  { id: "a5", courseCode: "CS220", title: "Assignment 1 — Responsive Portfolio", kind: "assignment", due: "2026-10-08", score: 29, max: 30, status: "graded" },
  { id: "a6", courseCode: "CS220", title: "Project — Personal Portal", kind: "assignment", due: "2026-11-20", score: null, max: 50, status: "submitted" },

  { id: "q5", courseCode: "MA201", title: "Quiz 1 — Logic & Proofs", kind: "quiz", due: "2026-09-15", score: 14, max: 20, status: "graded" },
  { id: "a7", courseCode: "MA201", title: "Assignment 1 — Set Theory", kind: "assignment", due: "2026-10-01", score: 22, max: 30, status: "graded" },
  { id: "a8", courseCode: "MA201", title: "Assignment 2 — Graph Theory", kind: "assignment", due: "2026-11-08", score: null, max: 30, status: "late" },
];
