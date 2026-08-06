import { Link } from "react-router-dom";
import intelligenceXBg from "@/assets/IntelligenceX/IntelligenceX_bg.jpg";
import latorreImg from "@/assets/IntelligenceX/Pro.Latorre.png";
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
            {keynoteSpeakers.map((speaker) => (
              <section
                key={speaker.id}
                className="rounded-xl border border-[#cddcf0] bg-[#f4f8ff] p-6 md:p-10 scroll-mt-28 space-y-6"
              >
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
