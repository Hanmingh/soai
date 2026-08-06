import { Link } from "react-router-dom";
import intelligenceXBg from "@/assets/IntelligenceX/IntelligenceX_bg.jpg";
import wilhelmImg from "@/assets/IntelligenceX/Dirk-Wilhelm_2026.jpg";
import julianTanImg from "@/assets/IntelligenceX/Julian_Tan.png";
import lukasHuberImg from "@/assets/IntelligenceX/Lukas Huber Portrait.jpg";

interface PremeetingSpeaker {
  name: string;
  role: string;
  affiliation: string;
  photo: string;
  weblink?: string;
  bio: string;
}

const speakers: PremeetingSpeaker[] = [
  {
    name: "Prof Dr. Dirk Wilhelm",
    role: "Dean of the School of Engineering",
    affiliation: "ZHAW Zurich University of Applied Sciences",
    photo: wilhelmImg,
    weblink: "https://www.zhaw.ch/en/about-us/person/wilk",
    bio: "Dirk Wilhelm is professor of Medical Physics and Dean of the ZHAW School of Engineering. He has more than 10 years of industrial experience and more than 20 years of academic experience in a variety of operational, managerial, and academic positions. During his industrial career he has developed several innovative products for chemical and biomedical analysis, e.g. Nuclear Magnetic Resonance (NMR) probes. In academia, he has continued his research with industrial partners and is involved in teaching bachelor, master and doctoral students at ZHAW and University of Zurich. He has initiated and directed the collaborative PhD program in Data Science between University of Zurich (UZH) and ZHAW. Furthermore, he initiated the collaborative PhD program in Biomedical Science and Health Innovation with ETH Zurich. Thanks to his initiative, ZHAW became a full member of the European University Alliance EELISA. He was instrumental in setting up the DIZH (Digitalization Initiative of the Canton of Zurich) Innovation Program, as chair of the Innovation Panel. He is member of the ZHAW university board and dean of one of the largest Engineering Schools of any Swiss University of Applied Sciences. Moreover, he is Head of the ZHAW Resort International (function of vice rector for international). His focus is on practice-orientated, high-quality engineering education for Swiss industry and economy. He is involved in the promotion of young talents through his work at the Swiss Academy of Sciences' STEM Commission (Fachkommission MINT). He is a full member of the Swiss Academy of Engineering Sciences (SATW) and patron of the Swiss Engineers' Day.",
  },
  {
    name: "Julian Tan",
    role: "Quantum Business Development Executive, ASEAN/India",
    affiliation: "IBM",
    photo: julianTanImg,
    bio: "Julian has a strong passion for harnessing leading edge technologies in building Next-Gen enterprise capabilities. Over the course of his career, he has held several technical and management leadership roles, such as in Quantum, AI, Semiconductor and Electronics technology qualification, Supplier Management, New Product Introduction and Quality. He has won many global awards. In 2025, he led the IBM Supply Chain Transformation team as Gold Stevie Winner for Technology Team of the Year. He was also recognized as Global 2024 National Association of Manufacturer's Manufacturing Leadership Council (MLC) Digital Transformation Leadership Award, Global 2017 Frost & Sullivan (F&S) Visionary Leadership Award, and 2018 F&S Transformation award for his work around AI in the quality practice, which also contributed to IBM being named 2018 F&S Large Enterprise Manufacturer of the Year Award. Julian is a committee member in SemiconSEA's Smart Manufacturing council, owns 8 patents around technology and analytics, and has also published 9 technical papers. He is a recognized IBM Outstanding People Manager and is also IBM 2021 Recognition Experience Honoree.",
  },
  {
    name: "Lukas Huber",
    role: "Managing Director (CEO)",
    affiliation: "Greater Zurich Area AG",
    photo: lukasHuberImg,
    weblink: "https://www.greaterzuricharea.com/en",
    bio: "Lukas Huber is Managing Director at Greater Zurich Area AG, the Investment Promotion Agency for Zurich, Switzerland, with over 20 years in investment promotion and business development, overseeing global operations across Switzerland, the U.S., and China. He has advised companies and entrepreneurs on global expansion and market entry into Europe, supporting incorporation and technology partnerships, with deep expertise in Technology and Life Sciences and over a decade working with Chinese companies as Executive Director China. He studied economics and business administration at the University of Zurich and HWZ University of Applied Sciences Zurich, holding an MBA and Executive MBA in International Management. He joined Greater Zurich Area AG in 2003, working on U.S. market activities, then heading the Life Sciences Division, before serving over 10 years as Executive Director China and Deputy Managing Director. He previously worked as a strategy consultant.",
  },
];

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

          {/* Speakers */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Speakers</h2>
            <div className="space-y-6">
              {speakers.map((speaker) => (
                <div
                  key={speaker.name}
                  className="rounded-xl border border-gray-200 p-5 md:p-6 flex flex-col gap-5 md:flex-row md:items-start"
                >
                  <img
                    src={speaker.photo}
                    alt={speaker.name}
                    className="h-40 w-40 shrink-0 rounded-lg object-cover shadow-sm"
                    loading="lazy"
                  />
                  <div className="space-y-2">
                    <p className="text-lg font-semibold text-gray-900">{speaker.name}</p>
                    <p className="text-sm font-medium text-[#003d7b]">
                      {speaker.role}
                      {speaker.affiliation && ` · ${speaker.affiliation}`}
                    </p>
                    <p className="text-gray-800 leading-relaxed text-sm md:text-base">
                      {speaker.bio}
                    </p>
                    {speaker.weblink && (
                      <a
                        href={speaker.weblink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#003d7b] hover:underline"
                      >
                        Learn more →
                      </a>
                    )}
                  </div>
                </div>
              ))}
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
