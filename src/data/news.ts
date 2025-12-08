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
    id: "introduction-of-a-ground-breaking-quantum-algorithm-for-multi-objective-optimization",
    title: "Introduction of a Ground-Breaking Quantum Algorithm for Multi-Objective Optimization New Quantum Algorithm Tackles Multi-Objective Optimization",
    date: "2025-10-24",
    source: "Nature Computational Science",
    summary: "A major step forward in quantum computing research has been achieved by Quantum approximate multi‑objective optimization (published 24 October 2025 in Nature Computational Science), which presents a novel quantum algorithm that tackles complex optimisation tasks with multiple competing objectives.",
    link: "https://www.nature.com/articles/s43588-025-00873-y",
  },
  {
    id: "the-9th-ism-isct-nii-zib-nus-modal-workshop",
    title: "The 9th ISM-ISCT-NII-ZIB-NUS-MODAL Workshop",
    date: "2025-09-24",
    source: "Society of Algorithmic Intelligence",
    summary: "So-AI supported the 9th ISM-ISCT-NII-ZIB-NUS-MODAL Workshop on Optimization and Machine Learning for Data Science and Future Computing, held in Tokyo on 24–29 September 2025.",
    link: "https://sites.google.com/view/optds2025",
  },
  {
    id: "new-quantum-optimization-benchmarking-library",
    title: "New Quantum Optimization Benchmarking Library",
    date: "2025-08-28",
    source: "Society of Algorithmic Intelligence",
    summary: "New Quantum Optimization Benchmarking Library (QOBLIB) invited researchers to test algorithms on ten problem classes—an “intractable decathlon”—for comparing quantum and classical methods and advancing the search for quantum advantage in combinatorial optimization.",
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
  {
    id: "soai-awards-iasc-ars-2025",
    title: "SoAI Award Winners at IASC-ARS 2025 Announced",
    date: "2025-12-08",
    source: "Society of Algorithmic Intelligence",
    summary:
      "At the 13th Conference of the IASC-ARS 2025 hosted by VIASM, SoAI sponsored three awards: the SoAI Early-Career Research Excellence Award, the SoAI Excellence in ASEAN Research Award, and the SoAI Women Innovator Award. The Early-Career Research Excellence Award went to Kanji Goto (Doshisha University) for \"Reduced Rank Regression with pcLasso Penalty\"; the Excellence in ASEAN Research Award was given to Hanqiu Peng (National University of Singapore) for \"Optimizing Quantum Annealing Schedules with Neural Network Quantum State Digital Twins\"; and the Women Innovator Award was presented to Nguyen Thi Hoa (National University of Singapore) for \"Optimal Market Making under Model Uncertainty: A Reinforcement Learning Approach.\"",
    link: "https://viasm.edu.vn/hdkh/iasc-ars-2025?userkey=soai-award",
  },
];


