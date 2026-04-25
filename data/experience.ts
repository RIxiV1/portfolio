export interface Experience {
  id: string;
  role: string;
  org: string;
  period: string;
  description: string;
  tags: string[];
  type: 'work' | 'education' | 'project';
}

export const experience: Experience[] = [
  {
    id: "1",
    role: "Junior Developer",
    org: "Open Source & Freelance",
    period: "2026 – Present",
    description: "Building AI-powered tools, Chrome extensions, and full-stack web apps. Open to internships and full-time roles.",
    tags: ["JavaScript", "Python", "React", "AI"],
    type: 'work'
  },
  {
    id: "2",
    role: "Self-taught Developer",
    org: "Independent",
    period: "2024 – 2026",
    description: "Dove deep into full-stack development. Built multiple projects from scratch to understand product thinking and engineering.",
    tags: ["Fundamentals", "Projects", "Problem Solving"],
    type: 'project'
  },
  {
    id: "3",
    role: "Student",
    org: "Computer Science Studies",
    period: "2024 – 2028",
    description: "Formal education in computer science fundamentals while simultaneously building real-world projects and sharpening practical skills.",
    tags: ["CS Fundamentals", "Algorithms", "Data Structures"],
    type: 'education'
  }
];
