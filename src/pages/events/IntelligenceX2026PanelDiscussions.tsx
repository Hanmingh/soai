import { Link } from "react-router-dom";
import intelligenceXBg from "@/assets/IntelligenceX/IntelligenceX_bg.jpg";

const panels = [
  {
    title: "The Future of Quantum × AI",
    theme:
      "Shaping the next decade of intelligent computing through the convergence of quantum technologies and artificial intelligence.",
    moderator: "Philippe Codognet",
    moderatorAffiliation: "CNRS / Sorbonne University / University of Tokyo, France",
  },
  {
    title: "Agentic AI and Autonomous Systems",
    theme:
      "Exploring autonomous AI agents that can reason, plan, collaborate, and make decisions in complex real-world environments.",
    moderator: "Thorsten Koch",
    moderatorAffiliation: "Zuse Institute Berlin & TU Berlin, Germany",
  },
  {
    title: "Quantum × AI for Healthcare and Life Sciences",
    theme:
      "Transforming healthcare through AI and quantum-enabled advances in diagnosis, drug discovery, precision medicine, clinical decision support, and healthcare operations.",
    moderator: "Patrick Chia",
    moderatorAffiliation: "National University Health System, Singapore",
  },
  {
    title: "Quantum × AI for Finance and Risk",
    theme:
      "Harnessing AI and quantum computing to advance portfolio optimization, risk management, forecasting, trading, cybersecurity, and financial decision intelligence.",
    moderator: "Paolo Giudici",
    moderatorAffiliation: "University of Pavia, Italy",
  },
  {
    title: "Research, Education, and Talent for the Intelligence Era",
    theme:
      "Preparing the next generation of researchers, professionals, and leaders through interdisciplinary education, lifelong learning, and new models of collaboration in the age of AI and quantum technologies.",
    moderator: "Ying Chen",
    moderatorAffiliation: "National University of Singapore, Singapore",
  },
  {
    title: "The Quantum Advantage and Quantum Supremacy: Myth or Reality?",
    theme:
      "Separating scientific breakthroughs from hype by examining where quantum computing is delivering measurable value today and what remains to be achieved before large-scale practical impact.",
    moderator: null,
    moderatorAffiliation: null,
  },
] as const;

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

          <div className="space-y-6">
            {panels.map((panel, i) => (
              <section
                key={panel.title}
                className="rounded-xl border border-gray-200 bg-[#f9fafb] px-6 py-6 md:px-8 md:py-7 space-y-4"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ee7c01] mb-1">
                    Panel {i + 1}
                  </p>
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                    {panel.title}
                  </h2>
                </div>

                <p className="text-gray-800 leading-relaxed text-sm md:text-base">
                  {panel.theme}
                </p>

                <div className="grid gap-4 sm:grid-cols-2 pt-2 border-t border-gray-200">
                  <div className="pt-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">
                      Moderator
                    </p>
                    {panel.moderator ? (
                      <>
                        <p className="text-base font-semibold text-gray-900">{panel.moderator}</p>
                        <p className="text-sm text-gray-600">{panel.moderatorAffiliation}</p>
                      </>
                    ) : (
                      <p className="text-base font-semibold text-gray-500">To be announced</p>
                    )}
                  </div>
                  <div className="pt-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">
                      Panelists
                    </p>
                    <p className="text-sm text-gray-500">To be announced</p>
                  </div>
                </div>
              </section>
            ))}
          </div>

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
