import { Link } from "react-router-dom";
import intelligenceXBg from "@/assets/IntelligenceX/IntelligenceX_bg.jpg";
import latorreImg from "@/assets/IntelligenceX/Pro.Latorre.png";
import wilhelmImg from "@/assets/IntelligenceX/Dirk-Wilhelm_2026.jpg";
import julianTanImg from "@/assets/IntelligenceX/Julian_Tan.png";
import lukasHuberImg from "@/assets/IntelligenceX/Lukas Huber Portrait.jpg";
import satoImg from "@/assets/IntelligenceX/sato.png";

interface KeynoteSpeaker {
  id: string;
  name: string;
  role: string;
  affiliation: string;
  photo: string;
  weblink?: string;
  talkTitle?: string;
  abstract?: string;
  bio: string;
}

const keynoteSpeakers: KeynoteSpeaker[] = [
  {
    id: "jose-ignacio-latorre",
    name: "Professor José Ignacio Latorre",
    role: "Director",
    affiliation: "Centre for Quantum Technologies (CQT), Singapore",
    photo: latorreImg,
    weblink: "https://www.cqt.sg/director/",
    talkTitle: "Factorization and Quantum",
    abstract:
      "A novel idea for factorization using a quantum computer is presented. The aim is to address factorization from an angle, different from modular arithmetics, related to quadratic Gauss sums.",
    bio: "José Ignacio Latorre is the Director of the Centre for Quantum Technologies in Singapore. He got his PhD in elementary particle physics and has worked extensively in quantum field theory, particle phenomenology, renormalization group, quantum information and artificial intelligence. His outreach activity includes the writing of three popular books, one theater play, and the production of two documentaries. He has also co-founded Qilimanjaro Quantum Tech. He also produces some nice wine.",
  },
  {
    id: "dirk-wilhelm",
    name: "Prof Dr. Dirk Wilhelm",
    role: "Dean of the School of Engineering",
    affiliation: "ZHAW Zurich University of Applied Sciences",
    photo: wilhelmImg,
    weblink: "https://www.zhaw.ch/en/about-us/person/wilk",
    bio: "Dirk Wilhelm is professor of Medical Physics and Dean of the ZHAW School of Engineering. He has more than 10 years of industrial experience and more than 20 years of academic experience in a variety of operational, managerial, and academic positions. During his industrial career he has developed several innovative products for chemical and biomedical analysis, e.g. Nuclear Magnetic Resonance (NMR) probes. In academia, he has continued his research with industrial partners and is involved in teaching bachelor, master and doctoral students at ZHAW and University of Zurich. He has initiated and directed the collaborative PhD program in Data Science between University of Zurich (UZH) and ZHAW. Furthermore, he initiated the collaborative PhD program in Biomedical Science and Health Innovation with ETH Zurich. Thanks to his initiative, ZHAW became a full member of the European University Alliance EELISA. He was instrumental in setting up the DIZH (Digitalization Initiative of the Canton of Zurich) Innovation Program, as chair of the Innovation Panel. He is member of the ZHAW university board and dean of one of the largest Engineering Schools of any Swiss University of Applied Sciences. Moreover, he is Head of the ZHAW Resort International (function of vice rector for international). His focus is on practice-orientated, high-quality engineering education for Swiss industry and economy. He is involved in the promotion of young talents through his work at the Swiss Academy of Sciences' STEM Commission (Fachkommission MINT). He is a full member of the Swiss Academy of Engineering Sciences (SATW) and patron of the Swiss Engineers' Day.",
  },
  {
    id: "julian-tan",
    name: "Julian Tan",
    role: "Quantum Business Development Executive, ASEAN/India",
    affiliation: "IBM",
    photo: julianTanImg,
    bio: "Julian has a strong passion for harnessing leading edge technologies in building Next-Gen enterprise capabilities. Over the course of his career, he has held several technical and management leadership roles, such as in Quantum, AI, Semiconductor and Electronics technology qualification, Supplier Management, New Product Introduction and Quality. He has won many global awards. In 2025, he led the IBM Supply Chain Transformation team as Gold Stevie Winner for Technology Team of the Year. He was also recognized as Global 2024 National Association of Manufacturer's Manufacturing Leadership Council (MLC) Digital Transformation Leadership Award, Global 2017 Frost & Sullivan (F&S) Visionary Leadership Award, and 2018 F&S Transformation award for his work around AI in the quality practice, which also contributed to IBM being named 2018 F&S Large Enterprise Manufacturer of the Year Award. Julian is a committee member in SemiconSEA's Smart Manufacturing council, owns 8 patents around technology and analytics, and has also published 9 technical papers. He is a recognized IBM Outstanding People Manager and is also IBM 2021 Recognition Experience Honoree.",
  },
  {
    id: "lukas-huber",
    name: "Lukas Huber",
    role: "Managing Director (CEO)",
    affiliation: "Greater Zurich Area AG",
    photo: lukasHuberImg,
    weblink: "https://www.greaterzuricharea.com/en",
    bio: "Lukas Huber is Managing Director at Greater Zurich Area AG, the Investment Promotion Agency for Zurich, Switzerland, with over 20 years in investment promotion and business development, overseeing global operations across Switzerland, the U.S., and China. He has advised companies and entrepreneurs on global expansion and market entry into Europe, supporting incorporation and technology partnerships, with deep expertise in Technology and Life Sciences and over a decade working with Chinese companies as Executive Director China. He studied economics and business administration at the University of Zurich and HWZ University of Applied Sciences Zurich, holding an MBA and Executive MBA in International Management. He joined Greater Zurich Area AG in 2003, working on U.S. market activities, then heading the Life Sciences Division, before serving over 10 years as Executive Director China and Deputy Managing Director. He previously worked as a strategy consultant.",
  },
  {
    id: "mitsuhisa-sato",
    name: "Mitsuhisa Sato",
    role: "Division Director, Quantum HPC Hybrid Computing Platform Division",
    affiliation: "RIKEN Center for Computational Science (R-CCS) · Professor, Juntendo University",
    photo: satoImg,
    weblink: "https://jhpc-quantum.org/en/",
    bio: "Mitsuhisa Sato is a division director of Quantum HPC Hybrid Computing Platform Division in RIKEN Center for Computational Science (R-CCS) since 2023. He received the M.S. degree and the Ph.D. degree in information science from the University of Tokyo in 1984 and 1990. From 2001, he was a professor of Graduate School of Systems and Information Engineering, University of Tsukuba. He was a director of Center for computational sciences, University of Tsukuba from 2007 to 2013. From 2010 to 2024, he was leading programming environment research team as the research team leader in R-CCS. From 2014 to 2020, he was working as a team leader of architecture development team in FLAGSHIP 2020 project to develop Japanese flagship supercomputer, Fugaku. He was appointed to a deputy Director of R-CCS from 2018 to 2023. Since 2023, he is a Professor of Juntendo University, and Professor Emeritus of University of Tsukuba.",
  },
];

export default function IntelligenceX2026KeynoteSpeakers() {
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
            Keynote Speakers
          </h1>
          <p className="text-white/85 text-base max-w-2xl">
            World-leading researchers and industry pioneers set the stage for the
            Quantum × AI frontier.
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

          {/* Keynote speaker cards */}
          <div className="space-y-10">
            {keynoteSpeakers.map((speaker, index) => (
              <section
                key={speaker.id}
                className="rounded-xl border border-[#cddcf0] bg-[#f4f8ff] p-6 md:p-10 scroll-mt-28 space-y-6"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ee7c01]">
                  Keynote Speaker {index + 1}
                </p>

                {speaker.talkTitle && (
                  <div className="space-y-4">
                    <h2 className="text-2xl md:text-[1.7rem] font-semibold leading-snug text-gray-900">
                      {speaker.talkTitle}
                    </h2>
                    {speaker.abstract && (
                      <div className="space-y-2">
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-[#003d7b]">
                          Abstract
                        </h3>
                        <p className="text-gray-800 leading-relaxed text-sm md:text-base">
                          {speaker.abstract}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                <div
                  className={
                    speaker.talkTitle
                      ? "space-y-4 border-t border-[#cddcf0] pt-6"
                      : "space-y-4"
                  }
                >
                  {speaker.talkTitle && (
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-[#003d7b]">
                      Speaker
                    </h3>
                  )}
                  <div className="flex flex-col gap-5 md:flex-row md:items-start">
                    <img
                      src={speaker.photo}
                      alt={speaker.name}
                      className="h-48 w-48 shrink-0 rounded-lg object-cover shadow-sm"
                      loading="lazy"
                    />
                    <div className="space-y-2">
                      <p className="text-xl font-semibold text-gray-900">
                        {speaker.name}
                      </p>
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
