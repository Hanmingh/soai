import { Badge } from "@/components/ui/badge";
import { leadershipSections, type Person } from "@/data/leadership";
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

function PeopleGrid({ people }: { people: Person[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {people.map((p, i) => (
        <div key={`${p.name}-${i}`} className="rounded-xl p-6 hover:bg-gray-50 transition-colors">
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

export default function Leadership() {
  return (
    <div className="min-h-screen bg-white scroll-smooth">
      {/* Hero */}
      <section className="relative py-16 bg-gradient-to-br from-[#003d7b] to-[#001e3c] text-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-8">
            <Badge className="bg-white/20 text-white backdrop-blur-sm">Leadership & Governance</Badge>
            <h1 className="text-4xl font-bold mt-4">Leadership & Governance</h1>
            <p className="text-white/80 mt-2">Organizational structure and representatives of Soc-AI.</p>
          </div>
        </div>
      </section>

      {/* Sections */}
      <section className="py-12">
        <div className="container mx-auto px-6 max-w-6xl">
          {leadershipSections.map((section) => (
            <section id={section.id} key={section.id} className="py-10 scroll-mt-28">
              <div className="mb-6">
                <div className="inline-flex items-center gap-2">
                  <span className="h-5 w-1 rounded bg-[#003d7b]" />
                  <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                </div>
              </div>
              {section.people && <PeopleGrid people={section.people} />}
              {section.description && <p className="text-gray-600">{section.description}</p>}
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}


