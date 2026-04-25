export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: 'Engineering' | 'Tutorial' | 'Career';
  readTime: string;
  date: string;
  href: string;
  featured?: boolean;
}

export const articles: Article[] = [
  {
    id: "network-theory",
    title: "Network Theory: How Everything Connects",
    excerpt: "The Invisible Threads That Bind Our World — exploring network theory and how interconnected systems shape everything around us.",
    category: "Engineering",
    readTime: "5 min read",
    date: "Sep 2025",
    href: "https://medium.com/@shaiksuhaib360",
    featured: true
  },
  {
    id: "chaos-theory",
    title: "Why Chaos Theory Explains the Science of the Butterfly Effect",
    excerpt: "Diving into chaos theory — the science behind unpredictable systems, sensitive dependence on initial conditions, and why small changes can have massive consequences.",
    category: "Engineering",
    readTime: "5 min read",
    date: "Sep 2025",
    href: "https://medium.com/@shaiksuhaib360"
  }
];
