import { Link } from "react-router-dom";

export default function IntelligenceX2026() {
  const bgUrl = `${import.meta.env.BASE_URL}IntelligenceX_bg.jpg`;
  return (
    <div className="min-h-screen bg-white">
      {/* Hero / Title band */}
      <section className="relative py-16 md:py-20 bg-gray-900">
        <img
          src={bgUrl}
          alt="IntelligenceX 2026 background"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
          decoding="sync"
        />
        <div className="absolute inset-0 bg-[#003d7b]/80" />
        <div className="relative container mx-auto px-6 max-w-5xl">
          <p className="text-sm font-semibold text-[#ffcf8c] mb-2 uppercase tracking-wide">
            SoAI Event · 2026
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            IntelligenceX 2026: The Global Quantum×AI Frontier
          </h1>
          <p className="text-white/90 max-w-3xl text-lg leading-relaxed">
            A flagship three-day Global Quantum×AI Conference jointly organized by the National University of Singapore (NUS)
            and the Society of Algorithmic Intelligence (SoAI).
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-6 max-w-5xl space-y-10">
          {/* Event information summary */}
          <section className="border-l-4 border-[#ee7c01] pl-5 py-2 bg-[#f9fafb]">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Event Information</h2>
            <dl className="grid gap-1 text-sm md:text-base text-gray-800 md:grid-cols-2">
              <div>
                <dt className="font-medium">Main Conference</dt>
                <dd>24–26 September 2026 · Singapore</dd>
              </div>
              <div>
                <dt className="font-medium">Executive Track</dt>
                <dd>28 September 2026 · Singapore · By invitation only</dd>
              </div>
            </dl>
          </section>

          {/* Overview */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Overview</h2>
            <p className="text-gray-800 leading-relaxed">
              IntelligenceX 2026 is a flagship three-day Global Quantum×AI Conference jointly organized by the National
              University of Singapore (NUS) and the Society of Algorithmic Intelligence (SoAI). The event brings together
              leading researchers, industry innovators, and decision-makers to explore how quantum computing, artificial
              intelligence, data science, and statistics jointly redefine the future of intelligent systems.
            </p>
            <p className="text-gray-800 leading-relaxed">
              Building on a strong foundation of prior workshops, tutorials, and hackathons, IntelligenceX 2026 is
              designed to bridge frontier research and practical deployment, combining scientific rigor with
              methodological and strategic relevance.
            </p>
          </section>

          {/* Conference Highlights */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Conference Highlights</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-800 leading-relaxed text-sm md:text-base">
              <li>
                Keynote addresses by world-leading researchers and industry pioneers
              </li>
              <li>
                Parallel technical sessions on quantum computing, artificial intelligence, data science, statistics,
                and hybrid Quantum×AI methodologies
              </li>
              <li>
                Hands-on tutorials covering quantum fundamentals, optimization, forecasting, and hybrid Quantum×AI workflows
              </li>
              <li>
                Panel discussions and roundtables fostering dialogue among academia, industry, and policymakers
              </li>
              <li>
                Ecosystem Forum, featuring industry–academia showcases and collaboration opportunities
              </li>
            </ul>
          </section>

          {/* Executive Track */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Executive Track</h2>
            <p className="text-gray-700 text-sm md:text-base">
              <span className="font-semibold">28 September 2026 – By Invitation Only</span>
            </p>
            <p className="text-gray-800 leading-relaxed">
              In addition to the main conference, IntelligenceX 2026 will host a half-day executive program designed
              for senior technology, innovation, and policy leaders. This curated track will offer:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-800 leading-relaxed text-sm md:text-base">
              <li>
                Strategic briefings on Quantum×AI readiness, integration, and long-term impact
              </li>
              <li>
                Moderated roundtables on investment strategy, governance, and organizational transformation
              </li>
              <li>
                Opportunities to engage with global experts in a focused, high-level setting
              </li>
            </ul>
            <p className="text-gray-800 leading-relaxed">
              The executive program complements the public training sessions, which are open to practitioners and
              researchers seeking hands-on exposure to quantum computing, artificial intelligence, and data science
              foundations.
            </p>
          </section>

          {/* Scientific Organizing Committee */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              Scientific Organizing Committee
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-800 leading-relaxed text-sm md:text-base">
              <li>Bastian Bergmann (ETH Zürich, Switzerland)</li>
              <li>Ralf Borndörfer (Freie Universität Berlin &amp; Zuse Institute Berlin, Germany)</li>
              <li>Agostino Capponi (Columbia University, USA)</li>
              <li>Chun-houh Chen (Academia Sinica, Taiwan)</li>
              <li>Ray-Bing Chen (National Tsing Hua University, Taiwan)</li>
              <li>Ying Chen (National University of Singapore, Singapore)</li>
              <li>Paolo Giudici (University of Pavia, Italy)</li>
              <li>Xin Guo (University of California, Berkeley, USA)</li>
              <li>Nikolaus Hautsch (University of Vienna, Austria)</li>
              <li>Tomoyuki Higuchi (The Institute of Statistical Mathematics, Japan)</li>
              <li>Thorsten Koch (Zuse Institute Berlin &amp; TU Berlin, Germany)</li>
              <li>Stefan Lessmann (Humboldt-Universität zu Berlin, Germany)</li>
              <li>Rujira Ouncharoen (Chiang Mai University, Thailand)</li>
              <li>Huyên Pham (École Polytechnique, France)</li>
              <li>Paulo Canas Rodrigues (Federal University of Bahia, Brazil)</li>
              <li>Josef Teichmann (ETH Zürich, Switzerland)</li>
              <li>Simon Trimborn (University of Amsterdam, Netherlands)</li>
              <li>Qiwei Yao (London School of Economics and Political Science, UK)</li>
            </ul>
          </section>

          {/* Back link */}
          <div className="pt-4">
            <Link to="/events" className="text-sm text-[#003d7b] hover:underline">
              ← Back to Events
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}


