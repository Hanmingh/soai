import { Link } from "react-router-dom";
import intelligenceXBg from "@/assets/IntelligenceX/IntelligenceX_bg.jpg";
import jeremyImg from "@/assets/IntelligenceX/jeremy.jpeg";
import dWaveLogo from "@/assets/IntelligenceX/d-wave_logo.png";

interface ShowcasePresenter {
  name: string;
  title: string;
  affiliation: string;
  bio: string;
  photo: string;
}

interface ShowcaseProject {
  id: string;
  title: string;
  abstract: string;
  organization: string;
  organizationLogo: string;
  presenter: ShowcasePresenter;
}

const showcases: ShowcaseProject[] = [
  {
    id: "dwave-annealing-dual-rail",
    title:
      "Annealing and Dual-Rail Cavity Qubit quantum computers: How do advances in annealing and gate-model quantum computers affect industry?",
    abstract:
      "The quantum computing ecosystem is rapidly evolving, with multiple modalities driving rapid advances. This talk examines the journey toward fault-tolerant gate-model quantum computers that can solve real-world problems, the roadmap to 100,000-qubit annealing systems and the integration of analog-digital quantum capabilities within annealing processors. We will explore how these advances are expanding quantum value creation across optimization, AI, and materials science, demonstrating how today's platforms are solving meaningful problems while accelerating the future of quantum computing.",
    organization: "D-Wave",
    organizationLogo: dWaveLogo,
    presenter: {
      name: "Jeremy Woo",
      title: "Senior Technical Advisor",
      affiliation: "D-Wave",
      bio: "Jeremy Woo is a Senior Technical Advisor at D-Wave, responsible for supporting users in the APAC region to develop applications' real world value and implementing quantum applications into production systems. He previously worked at several major consulting firms as a data scientist, data engineer, and strategy consultant. He holds a master's degree in computer science from the University of Pennsylvania.",
      photo: jeremyImg,
    },
  },
];

export default function IntelligenceX2026Showcase() {
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
            Showcase
          </h1>
          <p className="text-white/85 text-base max-w-2xl">
            Discover the projects, platforms, and people shaping the future of
            Quantum × AI — from breakthrough hardware to production-ready
            applications.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="container mx-auto px-6 max-w-4xl space-y-10">
          {/* Back link */}
          <div>
            <Link
              to="/events/intelligencex-2026"
              className="text-sm text-[#003d7b] hover:underline"
            >
              ← Back to IntelligenceX 2026
            </Link>
          </div>

          {/* Overview */}
          <section className="space-y-4 rounded-lg border border-gray-200 bg-[#f9fafb] p-6 md:p-8">
            <h2 className="text-xl font-semibold text-gray-900">
              About the Showcase
            </h2>
            <p className="text-gray-800 leading-relaxed text-sm md:text-base">
              The IntelligenceX 2026 Showcase brings together leading
              organisations and technologists to present the projects that are
              moving quantum computing and AI from the lab into industry. Each
              showcase highlights a real platform, application, or research
              direction — with time for questions and direct engagement with
              the presenters.
            </p>
          </section>

          {/* Showcase projects */}
          <div className="space-y-10">
            {showcases.map((showcase, index) => (
              <section
                key={showcase.id}
                className="rounded-xl border border-[#cddcf0] bg-[#f4f8ff] p-6 md:p-10 scroll-mt-28 space-y-8"
              >
                {/* Organization header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ee7c01]">
                    Showcase {index + 1}
                  </p>
                  <img
                    src={showcase.organizationLogo}
                    alt={`${showcase.organization} logo`}
                    className="h-10 w-auto object-contain"
                    loading="lazy"
                  />
                </div>

                {/* Title & abstract */}
                <div className="space-y-4">
                  <h2 className="text-2xl md:text-[1.7rem] font-semibold leading-snug text-gray-900">
                    {showcase.title}
                  </h2>
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-[#003d7b]">
                      Abstract
                    </h3>
                    <p className="text-gray-800 leading-relaxed text-sm md:text-base">
                      {showcase.abstract}
                    </p>
                  </div>
                </div>

                {/* Presenter */}
                <div className="space-y-4 border-t border-[#cddcf0] pt-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-[#003d7b]">
                    Presenter
                  </h3>
                  <div className="flex flex-col gap-5 md:flex-row md:items-start">
                    <img
                      src={showcase.presenter.photo}
                      alt={showcase.presenter.name}
                      className="h-48 w-48 shrink-0 rounded-lg object-cover shadow-sm"
                      loading="lazy"
                    />
                    <div className="space-y-2">
                      <p className="text-xl font-semibold text-gray-900">
                        {showcase.presenter.name}
                      </p>
                      <p className="text-sm font-medium text-[#003d7b]">
                        {showcase.presenter.title}
                        {showcase.presenter.affiliation &&
                          ` · ${showcase.presenter.affiliation}`}
                      </p>
                      <p className="text-gray-800 leading-relaxed text-sm md:text-base">
                        {showcase.presenter.bio}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>

          {/* Back link bottom */}
          <div className="pt-4">
            <Link
              to="/events/intelligencex-2026"
              className="text-sm text-[#003d7b] hover:underline"
            >
              ← Back to IntelligenceX 2026
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
