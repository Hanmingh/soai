import { leadershipSections, type LeadershipSection } from "@/data/leadership";
import githubIcon from "@utils/github.svg";
import linkedinIcon from "@utils/linkedin.svg";
import dribbbleIcon from "@utils/dribbble.svg";

export default function LeadershipNetwork() {
  const sectionsToShow: LeadershipSection[] = leadershipSections.filter(s =>
    s.id === 'steering-council' || s.id === 'ab' || s.id === 'operational'
  );

  return (
    <div className="min-h-screen bg-white">
      <section className="py-16 bg-[#003d7b]">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Leadership Network</h1>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-6 max-w-6xl space-y-12">
          {sectionsToShow.map((section) => (
            <div key={section.id}>
              <h2 className="text-2xl font-semibold text-gray-900">{section.title}</h2>
              {section.description && (
                <p className="text-gray-700 mt-2">{section.description}</p>
              )}
              {!section.people && !section.description && (
                <p className="text-gray-600 mt-2">Details TBA.</p>
              )}
              {section.people && (
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {section.people.map((p, i) => (
                    <div key={`${section.id}-${p.name}-${i}`} className="rounded-xl p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col items-center text-center">
                        <div className="mb-4">
                          <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-full overflow-hidden ring-2 ring-white shadow bg-gray-100">
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
                        <div className="mb-2">
                          <h3 className="mb-1 text-base font-semibold text-gray-900">
                            {p.title && <span className="text-gray-500 italic mr-1">{p.title}</span>}
                            {p.name}
                          </h3>
                          {p.role && (
                            <p className="text-[#003d7b] text-sm font-medium truncate">{p.role}</p>
                          )}
                          {p.position && (
                            p.name === "Paolo Giudici" && p.position.includes(" · ") ? (
                              <div className="text-gray-600 text-xs mt-1">
                                {p.position.split(" · ").map((part, idx) => (
                                  <p key={idx} className="whitespace-normal break-words leading-snug">{part}</p>
                                ))}
                              </div>
                            ) : (
                              <p className="text-gray-600 text-xs mt-1 truncate">{p.position}</p>
                            )
                          )}
                          {p.affiliation && (
                            <p className="text-gray-600 text-xs mt-1 truncate">{p.affiliation}</p>
                          )}
                        </div>
                        {(p.github || p.linkedin || p.dribbble) && (
                          <div className="flex gap-3 mt-2">
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
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function resolvePhotoUrl(photoFileName?: string) {
  if (!photoFileName) return `${import.meta.env.BASE_URL}avatar-placeholder.png`;
  const fromAssets = import.meta.glob('/src/assets/leadership/*', { eager: true }) as Record<string, { default: string }>;
  const assetKey = `/src/assets/leadership/${photoFileName}`;
  const assetUrl = fromAssets[assetKey]?.default;
  return assetUrl ?? `${import.meta.env.BASE_URL}leadership/${photoFileName}`;
}


