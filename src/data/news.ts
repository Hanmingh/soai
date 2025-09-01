export type NewsItem = {
  id: string;
  title: string;
  date: string; // ISO date
  source?: string;
  summary?: string;
  link?: string;
};

export const newsItems: NewsItem[] = [
  {
    id: "press-foundation-models",
    title: "SoAI launches initiative on energy-efficient foundation models",
    date: "2025-05-20",
    source: "Press",
    summary: "A multi-institution collaboration focused on optimization-driven training.",
    link: "#",
  },
  {
    id: "partnership-hpc",
    title: "Partnership announced with global HPC center",
    date: "2025-04-30",
    source: "Partnerships",
    summary: "Expanding access to petascale compute for research fellows.",
    link: "#",
  },
  {
    id: "call-for-papers",
    title: "Call for Papers: Algorithms for Scientific Discovery",
    date: "2025-06-02",
    source: "Programs",
    summary: "Submissions open for the 2025 workshop track.",
    link: "#",
  },
  {
    id: "fellowships-2025",
    title: "2025 Fellowships announced",
    date: "2025-05-05",
    source: "Fellowships",
    summary: "Cohort covers topics from causal inference to reinforcement learning.",
    link: "#",
  },
];


