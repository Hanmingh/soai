export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Title band */}
      <section className="py-16 bg-[#003d7b]">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
            Society of Algorithmic Intelligence (Soc-AI)
          </h1>
        </div>
      </section>

      {/* Narrative */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-lg leading-8 text-gray-800 space-y-6">
            <p>
              The Society of Algorithmic Intelligence (Soc-AI) is a global community dedicated to advancing the science and practice of intelligent algorithms. We bring together leading minds from academia, industry, and government to explore the frontiers of artificial intelligence, machine learning, optimization, high-performance computing, and quantum technologies.
            </p>
            <p>
              At Soc-AI, we believe that algorithms are the foundation of intelligent systems shaping the future of finance, healthcare, engineering, and beyond. Our mission is to foster international collaboration, interdisciplinary research, and innovative education that empower the next generation of researchers and practitioners.
            </p>
            <p>
              Through world-class conferences, workshops, training programs, and strategic partnerships, the Society creates a unique platform where ideas move seamlessly from theory to real-world impact. By bridging academic rigor with industry application, Soc-AI supports a vibrant ecosystem for knowledge exchange, capacity building, and technological innovation.
            </p>
            <p>
              Join us in building a globally connected, future-ready society where advanced algorithms drive human progress and technological breakthroughs.
            </p>
          </div>
        </div>
      </section>

      {/* Core Team */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Core Team</h2>
            <p className="text-gray-600 mt-2">Meet the core leadership of Soc-AI</p>
          </div>
          <div className="mb-4">
            <h3 id="ec" className="text-2xl font-bold text-gray-900">Executive Committee</h3>
          </div>
          {/* Inline PeopleGrid from Leadership */}
          <CoreTeamGrid />
        </div>
      </section>

      {/* Additional Governance Sections */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          {leadershipSections.filter((s) => s.id !== 'ec').map((section) => (
            <section id={section.id} key={section.id} className="py-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{section.title}</h3>
              {section.description && (
                <p className="text-gray-700">{section.description}</p>
              )}
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}

import { leadershipSections } from "@/data/leadership";
import githubIcon from "@utils/github.svg";
import linkedinIcon from "@utils/linkedin.svg";
import dribbbleIcon from "@utils/dribbble.svg";

function resolvePhotoUrl(photoFileName?: string) {
  if (!photoFileName) return `${import.meta.env.BASE_URL}avatar-placeholder.png`;
  const fromAssets = import.meta.glob('/src/assets/leadership/*', { eager: true }) as Record<string, { default: string }>;
  const assetKey = `/src/assets/leadership/${photoFileName}`;
  const assetUrl = fromAssets[assetKey]?.default;
  return assetUrl ?? `${import.meta.env.BASE_URL}leadership/${photoFileName}`;
}

function CoreTeamGrid() {
  const exec = leadershipSections.find((s) => s.id === 'ec')?.people || [];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {exec.map((p, i) => (
        <div key={`${p.name}-${i}`} className="rounded-xl p-6 hover:bg-gray-100 transition-colors">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4">
              <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full overflow-hidden ring-2 ring-white shadow bg-gray-100">
                <img
                  src={resolvePhotoUrl(p.photoFileName)}
                  alt={`${p.name} photo`}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    (e.currentTarget.parentElement as HTMLElement).classList.add('bg-gray-200');
                  }}
                />
              </div>
            </div>
            <div className="mb-4">
              <h3 className="mb-1 text-lg font-semibold text-gray-900">{p.name}</h3>
              <p className="text-[#003d7b] text-sm font-medium">{p.role}</p>
            </div>
            {(p.github || p.linkedin || p.dribbble) && (
              <div className="flex gap-3">
                {p.github && (
                  <a href={p.github} aria-label="GitHub" className="bg-gray-100 rounded-lg p-2 hover:bg-gray-200 transition">
                    <img src={githubIcon} alt="GitHub" className="h-4 w-4" />
                  </a>
                )}
                {p.linkedin && (
                  <a href={p.linkedin} aria-label="LinkedIn" className="bg-gray-100 rounded-lg p-2 hover:bg-gray-200 transition">
                    <img src={linkedinIcon} alt="LinkedIn" className="h-4 w-4" />
                  </a>
                )}
                {p.dribbble && (
                  <a href={p.dribbble} aria-label="Personal website" className="bg-gray-100 rounded-lg p-2 hover:bg-gray-200 transition">
                    <img src={dribbbleIcon} alt="Personal website" className="h-4 w-4" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
