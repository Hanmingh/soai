import { Link } from "react-router-dom";
import intelligenceXBg from "@/assets/IntelligenceX/IntelligenceX_bg.jpg";
import masahiroImg from "@/assets/IntelligenceX/masahiro.png";
import huaxingImg from "@/assets/IntelligenceX/huaxing.jpg";
import { ExpandableBio } from "@/components/ui/ExpandableBio";

type Panel = {
  id: string;
  title: string;
  theme: string;
};

type Moderator = {
  name: string;
  affiliation: string;
  panelTitle: string;
  photo?: string;
};

type Panelist = {
  name: string;
  designation: string;
  affiliation: string;
  photo: string;
  bio: string;
  weblink?: string;
  panelTitle: string;
};

const panels: Panel[] = [
  {
    id: "future-quantum-ai",
    title: "The Future of Quantum × AI",
    theme:
      "Shaping the next decade of intelligent computing through the convergence of quantum technologies and artificial intelligence.",
  },
  {
    id: "agentic-ai",
    title: "Agentic AI and Autonomous Systems",
    theme:
      "Exploring autonomous AI agents that can reason, plan, collaborate, and make decisions in complex real-world environments.",
  },
  {
    id: "healthcare-life-sciences",
    title: "Quantum × AI for Healthcare and Life Sciences",
    theme:
      "Transforming healthcare through AI and quantum-enabled advances in diagnosis, drug discovery, precision medicine, clinical decision support, and healthcare operations.",
  },
  {
    id: "finance-risk",
    title: "Quantum × AI for Finance and Risk",
    theme:
      "Harnessing AI and quantum computing to advance portfolio optimization, risk management, forecasting, trading, cybersecurity, and financial decision intelligence.",
  },
  {
    id: "education-talent",
    title: "Research, Education, and Talent for the Intelligence Era",
    theme:
      "Preparing the next generation of researchers, professionals, and leaders through interdisciplinary education, lifelong learning, and new models of collaboration in the age of AI and quantum technologies.",
  },
  {
    id: "quantum-advantage",
    title: "The Quantum Advantage and Quantum Supremacy: Myth or Reality?",
    theme:
      "Separating scientific breakthroughs from hype by examining where quantum computing is delivering measurable value today and what remains to be achieved before large-scale practical impact.",
  },
];

const moderators: Moderator[] = [
  {
    name: "Ying Chen",
    affiliation: "National University of Singapore, Singapore",
    panelTitle: "Research, Education, and Talent for the Intelligence Era",
    photo: "/leadership/chenying.jpg",
  },
  {
    name: "Patrick Chia",
    affiliation: "National University Health System, Singapore",
    panelTitle: "Quantum × AI for Healthcare and Life Sciences",
  },
  {
    name: "Philippe Codognet",
    affiliation: "CNRS / Sorbonne University / University of Tokyo, France",
    panelTitle: "The Future of Quantum × AI",
  },
  {
    name: "Paolo Giudici",
    affiliation: "University of Pavia, Italy",
    panelTitle: "Quantum × AI for Finance and Risk",
    photo: "/leadership/Giudici.jpg",
  },
  {
    name: "Thorsten Koch",
    affiliation: "Zuse Institute Berlin & TU Berlin, Germany",
    panelTitle: "Agentic AI and Autonomous Systems",
    photo: "/leadership/Thorsten.png",
  },
];

const panelists: Panelist[] = [
  {
    name: "Huaxing Chen",
    designation: "Senior Data Analytics and AI Leader, Regional Bank Wholesale Division",
    affiliation: "Adjunct Faculty, National University of Singapore (NUS) Business School",
    photo: huaxingImg,
    bio: "Huaxing Chen is a senior data analytics and AI leader with extensive experience applying quantitative methods, advanced analytics, machine learning and artificial intelligence to complex financial and business problems. He currently leads data and analytics initiatives in a regional bank wholesale division across areas including client analytics, risk, transaction banking, financial markets and AI-enabled decision support. His career has spanned a diverse range of industries and institutions. Earlier in his career, he worked with the SMU–Carnegie Mellon University Living Analytics Research Centre, focusing on applied optimisation and analytics research, before taking on analytics and revenue optimisation roles with organisations including Marina Bay Sands and Visa, where he worked extensively with large-scale customer, transaction and commercial data. His experience has also included technology, operations research and entrepreneurial leadership roles in quantitative trading before moving into wholesale banking. Alongside his industry career, Huaxing has been an Adjunct Faculty member at the National University of Singapore (NUS) Business School since 2018, teaching postgraduate students in analytics and data engineering with applications in financial services. He is also a regular speaker and panel participant at universities, industry conferences and professional forums, sharing perspectives on quantitative analytics, AI, data and the transformation of financial services. His interests lie at the intersection of artificial intelligence, optimisation and real-world financial decision-making, particularly in translating rigorous quantitative research and emerging technologies into scalable business impact.",
    panelTitle: "Quantum × AI for Finance and Risk",
  },
  {
    name: "Masahiro Horibe",
    designation: "Deputy Director / Executive Chief, G-QuAT",
    affiliation: "National Institute of Advanced Industrial Science and Technology (AIST), Japan",
    photo: masahiroImg,
    bio: "Masahiro Horibe is Deputy Director of the Global Research and Development Center for Business by Quantum-AI Technology (G-QuAT) at the National Institute of Advanced Industrial Science and Technology (AIST), Japan. He leads initiatives in quantum technology strategy, international collaboration, and ecosystem development, fostering partnerships among industry, academia, and government. His work focuses on accelerating the commercialization and societal implementation of quantum technologies through global cooperation, innovation programs, and industry-driven research collaborations.",
    weblink: "https://jp.linkedin.com/in/masahiro-horibe-52604b3a",
    panelTitle: "The Quantum Advantage and Quantum Supremacy: Myth or Reality?",
  },
];

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export default function IntelligenceX2026PanelDiscussions() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative py-14 bg-gray-900">
        <img
          src={intelligenceXBg}
          alt="IntelligenceX 2026 background"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          decoding="sync"
        />
        <div className="absolute inset-0 bg-[#003d7b]/80" />
        <div className="relative container mx-auto px-6 max-w-5xl">
          <p className="text-sm font-semibold text-[#ffcf8c] mb-2 uppercase tracking-wide">
            IntelligenceX 2026 · Main Conference
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Panel Discussions
          </h1>
          <p className="text-white/85 text-base max-w-2xl">
            Six panels bringing together leading voices from academia, industry, and policy to
            debate the frontiers of Quantum × AI.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="container mx-auto px-6 max-w-4xl space-y-10">

          {/* Back link */}
          <div>
            <Link to="/events/intelligencex-2026" className="text-sm text-[#003d7b] hover:underline">
              ← Back to IntelligenceX 2026
            </Link>
          </div>

          {/* Panel Topics */}
          <section className="space-y-5">
            <h2 className="text-2xl font-semibold text-gray-900">Panel Topics</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {panels.map((panel) => (
                <div
                  key={panel.id}
                  className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5 md:p-6"
                >
                  <div className="absolute inset-y-0 left-0 w-1 bg-[#ee7c01]" />
                  <h3 className="pl-2 text-base md:text-lg font-semibold text-gray-900">
                    {panel.title}
                  </h3>
                  <p className="pl-2 mt-2 text-sm text-gray-600 leading-relaxed">
                    {panel.theme}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Moderators */}
          <section className="space-y-5">
            <h2 className="text-2xl font-semibold text-gray-900">Moderators</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {moderators.map((moderator) => (
                <div
                  key={moderator.name}
                  className="rounded-xl border border-gray-200 bg-[#f9fafb] p-6 flex flex-col items-center text-center gap-3"
                >
                  {moderator.photo ? (
                    <img
                      src={moderator.photo}
                      alt={`${moderator.name} photo`}
                      className="h-28 w-28 rounded-full object-cover ring-2 ring-white shadow bg-gray-100"
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-28 w-28 rounded-full bg-[#003d7b]/10 text-[#003d7b] flex items-center justify-center text-3xl font-bold ring-2 ring-white shadow">
                      {initialsOf(moderator.name)}
                    </div>
                  )}
                  <div className="space-y-1">
                    <p className="text-base font-semibold text-gray-900">{moderator.name}</p>
                    <p className="text-sm text-gray-600 leading-snug">{moderator.affiliation}</p>
                    <p className="text-xs font-medium text-[#003d7b]">
                      Moderates: {moderator.panelTitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Panelists */}
          <section className="space-y-5">
            <h2 className="text-2xl font-semibold text-gray-900">Panelists</h2>
            <div className="space-y-6">
              {panelists.map((panelist) => (
                <section
                  key={panelist.name}
                  className="rounded-xl border border-[#cddcf0] bg-[#f4f8ff] p-6 md:p-8"
                >
                  <div className="flex flex-col gap-5 md:flex-row md:items-start">
                    <img
                      src={panelist.photo}
                      alt={panelist.name}
                      className="h-48 w-48 shrink-0 rounded-lg object-cover shadow-sm"
                      loading="lazy"
                    />
                    <div className="space-y-2 flex-1">
                      <p className="text-xl font-semibold text-gray-900">{panelist.name}</p>
                      <p className="text-sm font-medium text-[#003d7b]">
                        {panelist.designation}
                        {panelist.affiliation && ` · ${panelist.affiliation}`}
                      </p>
                      <p className="text-xs text-gray-500">Panel: {panelist.panelTitle}</p>
                      <ExpandableBio text={panelist.bio} fadeFrom="#f4f8ff" />
                      {panelist.weblink && (
                        <a
                          href={panelist.weblink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#003d7b] hover:underline"
                        >
                          LinkedIn →
                        </a>
                      )}
                    </div>
                  </div>
                </section>
              ))}
            </div>
          </section>

          <div className="rounded-lg border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
            Panelist line-ups and speaker biographies are being confirmed and will be published here
            as they become available.
          </div>

          {/* Back link bottom */}
          <div className="pt-2">
            <Link to="/events/intelligencex-2026" className="text-sm text-[#003d7b] hover:underline">
              ← Back to IntelligenceX 2026
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
