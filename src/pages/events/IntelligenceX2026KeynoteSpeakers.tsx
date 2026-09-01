import { Link } from "react-router-dom";
import intelligenceXBg from "@/assets/IntelligenceX/IntelligenceX_bg.jpg";
import latorreImg from "@/assets/IntelligenceX/Pro.Latorre.png";
import satoImg from "@/assets/IntelligenceX/sato.png";
import stefanImg from "@/assets/IntelligenceX/stefan.jpeg";
import simonImg from "@/assets/IntelligenceX/simon.jpeg";

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
    id: "xin-guo",
    name: "Xin Guo",
    role: "Coleman Fung Chair Professor · Chair, IEOR Department",
    affiliation: "University of California, Berkeley, USA",
    photo: "/leadership/xinguo.jpg",
    talkTitle: "Signature-based time series statistical analysis",
    abstract:
      "Signature transform has recently gained significant attention in the theory of stochastic analysis. In this talk, I will discuss how the signature transform can be exploited to address several long standing challenges in analyzing time series data, which are typically non-stationary, nonlinear and often fragmented, and for which modern deep learning models are inappropriate due to limited interpretability and in principle require large volumes of training data. In particular, we propose a simple signature-based adaptive Lasso approach that has been successfully developed and implemented in industry. This method addresses many of the challenges mentioned above while demonstrating strong potential for a wide range of applications. The talk will begin with a brief introduction to the signature transform, which has its origins in topology and has been extensively developed within the rough path theory. We will then review the key properties of the signature transform that are most relevant to our statistical methodology. The talk is intended to be self-contained.",
    bio: "Xin Guo holds the Coleman Fung Chair professorship and chairs the IEOR department at UC Berkeley. She previously held positions at Cornell (2003-2006) and IBM research (1999-2003). She is a well-recognized and influential scholar whose research spans stochastic processes, control and games, machine learning, and financial and medical time series analysis. She has served on the editorial boards of a number of leading journals, including Operations Research, Mathematics of Operations Research, SIAM Control and Optimization, and Mathematical Finance. Her work connects rigorous mathematical methods with important applications in finance, data science, biology, and healthcare. Notably, her work has been adopted by industry, with hundreds of millions of dollars in cost savings. She has also laid the mathematical foundation for some early-cancer-detection methodologies, approved by FDA.",
  },
  {
    id: "jose-ignacio-latorre",
    name: "José Ignacio Latorre",
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
  {
    id: "simon-see",
    name: "Simon See",
    role: "Chief Solution Architect & Global Head, NVIDIA AI Technology Center (NVAITC)",
    affiliation: "NVIDIA Corporation · Adjunct Professor, Nanyang Technological University (NTU), Singapore",
    photo: simonImg,
    talkTitle: "From Language to Reality: The Road from Foundation Models to World Models and Quantum Computing",
    abstract:
      "Artificial intelligence is evolving beyond language understanding towards modelling and interacting with the real world. This talk explores the progression from foundation models and large language models to world models that can learn, predict, and simulate the dynamics of physical and digital environments. We examine how advances in multimodal AI, robotics, and scientific computing are enabling machines to move from predicting the next word to predicting the next state of the world. Finally, we discuss the emerging role of quantum computing, and how AI is proving to be a key technology for scaling quantum processors into useful quantum-GPU supercomputing devices.",
    bio: "Simon See is the Solution Architecture and Engineering Director, Chief Solution Architect, and Global Head of the NVIDIA AI Technology Centre (NVAITC), AI Nation, at NVIDIA Corporation. He also holds adjunct professorships at Nanyang Technological University, Shanghai Jiao Tong University, the University of Surrey, Coventry University, Universitas Indonesia, and Newcastle University in Singapore. He is a Distinguished Fellow at Fudan University and an elected Fellow of the Institution of Engineering and Technology (IET). See leads numerous international AI, high-performance computing (HPC), and computational science initiatives, and plays a key role in advancing AI ecosystems across the Asia-Pacific region. His research interests include HPC, artificial intelligence, machine learning, big data, computational science, applied mathematics, and simulation methodologies. He has published over 200 technical papers and received multiple awards for his contributions to the field. He serves on numerous international advisory boards and conference committees, including as a Steering Committee member of Supercomputing Asia (SCA). Prior to joining NVIDIA, See held senior technical and leadership positions at SGI, IBM, Oracle, Sun Microsystems, DSO National Laboratories, and other technology organizations, and continues to advise national research institutes and supercomputing centres worldwide.",
  },
  {
    id: "stefan-woerner",
    name: "Stefan Woerner",
    role: "Principal Research Scientist & Senior Manager, Applied Quantum Optimization Research",
    affiliation: "IBM Research, Switzerland",
    photo: stefanImg,
    bio: "Stefan Woerner is a Principal Research Scientist and Senior Manager of Applied Quantum Optimization Research at IBM Research, Switzerland. He leads a global team advancing quantum optimization algorithms and their applications to deliver practical quantum advantage for real-world challenges in industry and science. Stefan received his PhD from ETH Zurich and is internationally recognized for his contributions to quantum optimization, quantum finance, and quantum machine learning. He has authored influential scientific publications and collaborates extensively with leading partners in academia and industry.",
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
