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
    id: "the-9th-ism-isct-nii-zib-nus-modal-workshop",
    title: "The 9th ISM-ISCT-NII-ZIB-NUS-MODAL Workshop",
    date: "2025-09-24",
    source: "Society of Algorithmic Intelligence",
    summary: "So-AI will support the 9th ISM-ISCT-NII-ZIB-NUS-MODAL Workshop on Optimization and Machine Learning for Data Science and Future Computing, to be held in Tokyo on 24–29 September 2025.",
    link: "https://sites.google.com/view/optds2025",
  },
  {
    id: "new-quantum-optimization-benchmarking-library",
    title: "New Quantum Optimization Benchmarking Library",
    date: "2025-08-28",
    source: "Society of Algorithmic Intelligence",
    summary: "New Quantum Optimization Benchmarking Library (QOBLIB) invites researchers to test algorithms on ten problem classes—an “intractable decathlon”—for comparing quantum and classical methods and advancing the search for quantum advantage in combinatorial optimization.",
    link: "https://arxiv.org/abs/2504.03832 ",
  },
  {
    id: "iasc-ars-2026-conference",
    title: "IASC-ARS 2026 Conference",
    date: "2026-12-09",
    source: "Society of Algorithmic Intelligence",
    summary: "So-AI will support the IASC-ARS 2026 Conference, Shaping the Future: AI, Big Data, and Emerging Technologies for a Smarter World, to be held on 9–11 December 2026 in Chiang Mai, Thailand.",
    link: "https://iasc-ars2026.icdi.cmu.ac.th/Home.aspx",
  },
  {
    id: "functional-neural-tangent-kernel-improves-implied-volatility-forecasting",
    title: "Functional Neural Tangent Kernel Improves Implied Volatility Forecasting",
    date: "2026-05-23",
    source: "Society of Algorithmic Intelligence",
    summary: "A new study shows that a functional Neural Tangent Kernel (fNTK) significantly improves implied volatility forecasting on over 6 million S&P 500 options, achieving Sharpe ratios of 1.30–1.83 and up to 675% higher returns than benchmark models.",
    link: "https://www.tandfonline.com/doi/full/10.1080/07350015.2025.2489087",
  },
];


