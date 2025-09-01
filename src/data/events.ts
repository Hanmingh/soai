export type EventItem = {
  id: string;
  title: string;
  date: string; // ISO date
  location?: string;
  description?: string;
  link?: string;
};

export const recentEvents: EventItem[] = [
  {
    id: "soai-2025-summit",
    title: "SoAI Global Summit 2025",
    date: "2025-06-18",
    location: "Singapore / Hybrid",
    description: "Keynotes on optimization at scale, foundation models, and quantum-prime solvers.",
    link: "#",
  },
  {
    id: "workshop-mlops",
    title: "Workshop: Reliable MLOps for Regulated Industries",
    date: "2025-07-10",
    location: "London",
    description: "Hands-on sessions on evaluation, monitoring, and governance.",
    link: "#",
  },
  {
    id: "summer-school",
    title: "Summer School: Algorithms for Scientific Discovery",
    date: "2025-08-05",
    location: "Boston",
    description: "One-week intensive lab with invited faculty and industry mentors.",
    link: "#",
  },
];


