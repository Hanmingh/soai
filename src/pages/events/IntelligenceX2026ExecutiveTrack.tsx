import { Link } from "react-router-dom";
import intelligenceXBg from "@/assets/IntelligenceX/IntelligenceX_bg.jpg";

export default function IntelligenceX2026ExecutiveTrack() {
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
            SoAI Event · 2026
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            IntelligenceX 2026: The Global Quantum×AI Frontier
          </h1>
          <p className="text-white/85 text-base max-w-2xl">
            A flagship three-day Global Quantum×AI Conference jointly organized by the National University of Singapore (NUS)
            and the Society of Algorithmic Intelligence (SoAI).
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="container mx-auto px-6 max-w-3xl space-y-10">

          {/* Back link */}
          <div>
            <Link to="/events/intelligencex-2026" className="text-sm text-[#003d7b] hover:underline">
              ← Back to IntelligenceX 2026
            </Link>
          </div>

          {/* Quick info */}
          <div className="border-l-4 border-[#ee7c01] bg-[#f9fafb] py-4 pl-5">
            <dl className="grid gap-2 text-sm md:text-base text-gray-800 sm:grid-cols-2">
              <div>
                <dt className="font-semibold">Date</dt>
                <dd>28 September 2026</dd>
              </div>
              <div>
                <dt className="font-semibold">Time</dt>
                <dd>2:00 pm – 4:00 pm</dd>
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

          {/* About */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Executive Track 2026</h2>
            <p className="text-gray-800 leading-relaxed text-sm md:text-xl">
              IntelligenceX 2026: The Global Quantum×AI Frontier
            </p>
            <p className="text-gray-800 leading-relaxed text-sm md:text-lg">
              Invitation-Only Executive Forum
            </p>
            <p className="text-gray-800 leading-relaxed text-sm md:text-base">
              28 September 2026 | National University of Singapore
            </p>
          </section>

          {/* Description */}
          <section className="space-y-5">
            <h2 className="text-xl font-semibold text-gray-900">From Ideas to Impact: Leading the Next Wave of AI and
              Quantum Innovation</h2>

            <p className="text-gray-800 leading-relaxed text-sm md:text-base">
              Following the successful <b>IntelligenceX 2026</b> conference (24–26 September), the <b>Executive Track</b> brings
              together a select group of senior executives, government leaders, investors, entrepreneurs, and
              distinguished researchers for an exclusive day of strategic dialogue and collaboration.
              Unlike a traditional conference, the Executive Track is designed as a highly interactive forum where
              participants exchange perspectives, explore emerging opportunities, and build partnerships that accelerate
              innovation across industry, government, and academia.
            </p>
          </section>

          {/* Discussion Themes */}
          <section className="space-y-5">
            <h2 className="text-xl font-semibold text-gray-900">Discussion Themes</h2>

            <ul className="list-disc pl-6 space-y-1.5 text-gray-800 text-sm md:text-base">
              <li>AI and Quantum Computing: Strategic Outlook and Future Opportunities</li>
              <li>AI for Enterprise Transformation and Decision Intelligence</li>
              <li>Digital Healthcare and Precision Medicine</li>
              <li>Financial Services, Quantitative Finance, and Risk</li>
              <li>Smart Manufacturing and Industrial AI</li>
              <li>National AI Strategies and Innovation Ecosystems</li>
              <li>Venture Creation, Investment, and Technology Commercialisation</li>
            </ul>
          </section>

          {/* Highlights */}
          <section className="space-y-5">
            <h2 className="text-xl font-semibold text-gray-900">Highlights</h2>

            <ul className="list-disc pl-6 space-y-1.5 text-gray-800 text-sm md:text-base">
              <li>Executive keynote addresses</li>
              <li>Interactive roundtable dialogues</li>
              <li>Technology and innovation showcases</li>
              <li>Partnership and investment networking</li>
              <li>Exclusive engagement with international thought leaders</li>
            </ul>
          </section>

          {/* Who Should Attend */}
          <section className="space-y-5">
            <h2 className="text-xl font-semibold text-gray-900">Who Should Attend</h2>
            <p className="text-gray-800 leading-relaxed text-sm md:text-base">By invitation only:</p>
            <ul className="list-disc pl-6 space-y-1.5 text-gray-800 text-sm md:text-base">
              <li>C-suite executives</li>
              <li>Government and public-sector leaders</li>
              <li>Research institute directors</li>
              <li>Corporate innovation leaders</li>
              <li>Venture capital and investment professionals</li>
              <li>Technology entrepreneurs</li>
              <li>Distinguished academic leaders</li>
            </ul>
          </section>

          {/* Why Attend */}
          <section className="space-y-5">
            <h2 className="text-xl font-semibold text-gray-900">Why Attend?</h2>
            <ul className="list-disc pl-6 space-y-1.5 text-gray-800 text-sm md:text-base">
              <li>Gain strategic insights into the convergence of AI and Quantum Computing.</li>
              <li>Exchange ideas with internationally recognised leaders.</li>
              <li>Explore collaborations across academia, industry, government, and investment communities.</li>
              <li>Discover emerging technologies and commercialisation opportunities.</li>
              <li>Expand your global network through meaningful executive-level discussions.</li>
            </ul>
          </section>
          {/* Additional info */}
          <section className="space-y-3 text-sm text-gray-700">
            <p>
              <span className="font-medium">Date: </span>
              Monday, 28 September 2026, 2:00 pm – 4:00 pm
            </p>
            <p>
              <span className="font-medium">Venue: </span>
              National University of Singapore
            </p>
            <p>
              <span className="font-medium">Organised by: </span>
              National University of Singapore (NUS) &amp; Society of Algorithmic Intelligence (SoAI)
            </p>
            <p>
              <span className="font-medium">More information: </span>
              <Link to="/events/intelligencex-2026" className="text-[#003d7b] hover:underline">
                https://www.soc-ai.org/events/intelligencex-2026
              </Link>
            </p>
            <p>
              <i>Attendance is by invitation only.</i>
            </p>
          </section>

          {/* Organisers */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-gray-900">Organisers</h2>
            <ul className="list-disc pl-6 space-y-1.5 text-gray-800 text-sm md:text-base">
              <li>
                <a
                  href="https://www.nus.edu.sg/about/management/george-loh"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-[#003d7b] underline hover:text-[#002a57]"
                >
                  George Loh Chee Ping
                </a>
              </li>
              <li>
                <a
                  href="https://yingchen.org"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-[#003d7b] underline hover:text-[#002a57]"
                >
                  Ying Chen
                </a>
              </li>
            </ul>
          </section>

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
