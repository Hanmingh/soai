import { Link } from "react-router-dom";
import intelligenceXBg from "@/assets/IntelligenceX/IntelligenceX_bg.jpg";

export default function SwitzerlandSingaporePremeeting() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative py-16 md:py-20 bg-gray-900">
        <img
          src={intelligenceXBg}
          alt="IntelligenceX 2026 background"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
          decoding="sync"
        />
        <div className="absolute inset-0 bg-[#003d7b]/80" />
        <div className="relative container mx-auto px-6 max-w-5xl">
          <p className="text-sm font-semibold text-[#ffcf8c] mb-2 uppercase tracking-wide">
            IntelligenceX 2026 Pre-meeting · 10 September 2026
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-snug">
            Switzerland–Singapore AI &amp; Quantum Pre-meeting
          </h1>
          <p className="text-white/90 text-lg leading-relaxed max-w-3xl">
            Deep-Tech Innovation Management: AI, Data Science and Quantum Computing
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto max-w-3xl px-6 space-y-10">

          {/* Quick info */}
          <div className="border-l-4 border-[#ee7c01] bg-[#f9fafb] py-4 pl-5">
            <dl className="grid gap-2 text-sm md:text-base text-gray-800 sm:grid-cols-2">
              <div>
                <dt className="font-semibold">Date</dt>
                <dd>10 September 2026</dd>
              </div>
              <div>
                <dt className="font-semibold">Time</dt>
                <dd>2:00 pm – 4:15 pm</dd>
              </div>
              <div>
                <dt className="font-semibold">Venue</dt>
                <dd>National University of Singapore (NUS)</dd>
              </div>
              <div>
                <dt className="font-semibold">Format</dt>
                <dd>By Invitation Only</dd>
              </div>
            </dl>
          </div>

          {/* Description */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">About This Session</h2>
            <p className="text-gray-800 leading-relaxed">
              Innovation does not happen linearly — it follows S-curves. To sustain industrial value creation, the
              next wave of technology must already be gaining momentum before the current one reaches maturity. This
              creates a fundamental challenge: investments in emerging technologies are needed long before their value
              and success are fully proven — the classic Innovator's Dilemma.
            </p>
            <p className="text-gray-800 leading-relaxed">
              In deep-tech innovation management, universities and governments play a critical role in shaping this
              transition. Universities act at the forefront of innovation, providing environments where new
              technologies can be explored and matured. At the same time, governments can strategically enable and
              accelerate these developments.
            </p>
            <p className="text-gray-800 leading-relaxed">
              In this session, we dive into Data Science, AI, and Quantum Computing — technologies with different
              levels of maturity and disruptive potential for global industries and societies. We will explore the
              deep-tech ecosystem in Singapore and compare it with Switzerland. What can we learn from different
              approaches to fostering innovation? How can we better bridge the gap between research and industrial
              impact?
            </p>
          </section>

          {/* Programme */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Programme</h2>
            <div className="divide-y divide-gray-100 border border-gray-200 rounded-xl overflow-hidden text-sm md:text-base">
              <div className="flex gap-4 px-5 py-4 bg-white">
                <span className="shrink-0 w-36 font-medium text-[#003d7b]">2:00 pm – 2:10 pm</span>
                <span className="text-gray-800">
                  Opening remarks by <span className="font-semibold">Prof. Tan Eng Chye</span>, President of NUS,
                  and <span className="font-semibold">Prof. Regula Jöhl</span>, Rector of ZHAW
                </span>
              </div>
              <div className="flex gap-4 px-5 py-4 bg-[#f9fafb]">
                <span className="shrink-0 w-36 font-medium text-[#003d7b]">2:10 pm – 2:40 pm</span>
                <span className="text-gray-800">Technology showcase</span>
              </div>
              <div className="flex gap-4 px-5 py-4 bg-white">
                <span className="shrink-0 w-36 font-medium text-[#003d7b]">2:40 pm – 3:15 pm</span>
                <span className="text-gray-800">Group photo, tea break, and networking</span>
              </div>
              <div className="flex gap-4 px-5 py-4 bg-[#f9fafb]">
                <span className="shrink-0 w-36 font-medium text-[#003d7b]">3:15 pm – 4:15 pm</span>
                <span className="text-gray-800">Panel discussion</span>
              </div>
            </div>
          </section>

          {/* Organisers */}
          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-gray-900">Organisers</h2>
            <ul className="space-y-1 text-gray-800 text-sm md:text-base">
              <li><span className="font-semibold">Prof. Dr. Nikola Pascher</span>, ZHAW</li>
              <li><span className="font-semibold">A/Prof. Ying Chen</span>, NUS</li>
            </ul>
          </section>

          {/* Back link */}
          <div className="pt-2">
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
