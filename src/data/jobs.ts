export type JobOpening = {
  id: string;
  title: string;
  organization: string;
  location?: string;
  description?: string;
  link?: string;
};

export const jobOpenings: JobOpening[] = [
  {
    id: "research-engineer-ml-ops",
    title: "Research Engineer, ML Systems",
    organization: "SoAI Applied Labs",
    location: "Singapore / Remote",
    description: "Own training pipelines and evaluation for optimization-heavy models.",
    link: "#",
  },
  {
    id: "postdoc-quantum-optimization",
    title: "Postdoctoral Fellow, Quantum Optimization",
    organization: "University Partner",
    location: "Boston, USA",
    description: "Focus on combinatorial solvers and quantum-inspired heuristics.",
    link: "#",
  },
  {
    id: "product-manager-ai-education",
    title: "Product Manager, AI Education",
    organization: "SoAI Education",
    location: "London, UK",
    description: "Design and scale hands-on curricula for industry upskilling.",
    link: "#",
  },
];


