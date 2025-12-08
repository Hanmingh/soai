import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Gallery from "@/components/home/Gallery";
import { recentEvents } from "@/data/events";
import { newsItems } from "@/data/news";
import bannerUrl from "@/assets/banner.jpg";

export default function Home() {
  const formatEventDate = (ev: { date?: string; startDate?: string; endDate?: string }): string => {
    const fmtFull = (date: Date) => date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    const monthShort = (date: Date) => date.toLocaleString(undefined, { month: 'short' });
    const day = (date: Date) => date.getDate();
    const year = (date: Date) => date.getFullYear();

    if (ev.date) return fmtFull(new Date(ev.date));

    if (ev.startDate && ev.endDate) {
      const s = new Date(ev.startDate);
      const e = new Date(ev.endDate);
      const sameYear = year(s) === year(e);
      const sameMonth = sameYear && s.getMonth() === e.getMonth();

      if (sameMonth) {
        // Oct 5–9, 2025
        return `${monthShort(s)} ${day(s)}–${day(e)}, ${year(s)}`;
      }
      if (sameYear) {
        // Sep 24 – Oct 2, 2025
        return `${monthShort(s)} ${day(s)} – ${monthShort(e)} ${day(e)}, ${year(s)}`;
      }
      // Dec 30, 2025 – Jan 2, 2026
      return `${fmtFull(s)} – ${fmtFull(e)}`;
    }

    if (ev.startDate) return fmtFull(new Date(ev.startDate));
    if (ev.endDate) return fmtFull(new Date(ev.endDate));
    return '';
  };
  const latestNews = useMemo(
    () =>
      [...newsItems]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 4),
    []
  );

  // Prefer build-time imported assets from src/assets/gallery via Vite glob
  const galleryImages = (() => {
    const imported = import.meta.glob(
      // include uppercase extensions so newly added photos are picked up on case-sensitive builds
      "/src/assets/gallery/*.{jpg,jpeg,png,webp,avif,gif,JPG,JPEG,PNG,WEBP,AVIF,GIF}",
      { eager: true }
    ) as Record<string, { default: string }>

    const urls = Object.values(imported)
      .map((m) => m?.default)
      .filter(Boolean)

    if (urls.length > 0) {
      return urls.map((u) => ({ src: u }))
    }

    // Fallback to public/gallery for now (runtime-served assets)
    const fallback = [
      `${import.meta.env.BASE_URL}gallery/The-3rd-Quantum-Computing-Workshop.png`,
    ]
    return fallback.map((u) => ({ src: u }))
  })()
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gray-200">
        <img src={bannerUrl} alt="" className="absolute inset-0 w-full h-full object-cover" loading="eager" fetchPriority="high" decoding="sync" />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-[#003d7b]/80"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 mx-auto bg-[#ee7c01] text-white text-[11px] sm:text-sm md:text-base leading-snug px-2.5 py-0.5 sm:px-3 sm:py-1 md:px-4 md:py-1.5 rounded-full max-w-[18rem] sm:max-w-none whitespace-normal break-words">
              Leading Emerging Technology & Algorithms Research Society
            </Badge>
            <h1 className="text-5xl font-bold text-white mb-6">
              Society of Algorithmic Intelligence
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              A global community dedicated to advancing the science and practice of intelligent algorithms. 
              We bring together leading minds from academia, industry, and government to explore the frontiers 
              of artificial intelligence, machine learning, and quantum technologies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-[#ee7c01] hover:bg-[#d66900] text-white" asChild>
                <Link to="/membership">
                  Become a Member
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" className="bg-white/10 text-white border border-white hover:bg-white hover:text-[#003d7b] backdrop-blur-sm" asChild>
                <Link to="/about">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery + Events */}
      <section className="py-24 bg-gray-50 overflow-x-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 min-w-0">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Inside SoAI</h2>
              <div className="-mx-6 sm:mx-0" onMouseEnter={(e) => ((e.currentTarget.firstChild as HTMLElement).style.animationPlayState = 'paused')} onMouseLeave={(e) => ((e.currentTarget.firstChild as HTMLElement).style.animationPlayState = 'running')}>
                <Gallery images={galleryImages} />
              </div>
              {/* News under gallery */}
              <div className="mt-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">News</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {latestNews.map((n) => (
                    <Card key={n.id} className="border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-lg">{n.title}</CardTitle>
                        <CardDescription>{new Date(n.date).toLocaleDateString()} {n.source ? `· ${n.source}` : ''}</CardDescription>
                      </CardHeader>
                      {n.summary && (
                        <CardContent>
                          <p className="text-sm text-gray-700">{n.summary}</p>
                          {n.link && (
                            <a href={n.link} className="text-sm text-[#ee7c01] hover:underline mt-3 inline-block">Read more</a>
                          )}
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>
                <div className="mt-4 text-right">
                  <Link to="/news" className="text-sm text-[#ee7c01] hover:underline">More news &gt;&gt;</Link>
                </div>
              </div>
            </div>
            <aside className="lg:col-span-4 min-w-0">
              <div className="sticky top-24">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Events</h3>
                <ul className="space-y-4">
                  {recentEvents.slice(0, 3).map((ev) => (
                    <li key={ev.id} className="rounded-lg border bg-white p-4 shadow-sm">
                      <div className="text-sm text-[#003d7b] font-medium">{formatEventDate(ev)}</div>
                      <div className="font-semibold text-gray-900">{ev.title}</div>
                      {ev.location && (
                        <div className="text-sm text-gray-600">{ev.location}</div>
                      )}
                      {ev.description && (
                        <p className="text-sm text-gray-700 mt-2">{ev.description}</p>
                      )}
                      {ev.link && (
                        <a href={ev.link} className="text-sm text-[#ee7c01] hover:underline mt-2 inline-block">Learn more</a>
                      )}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 text-right">
                  <Link to="/events" className="text-sm text-[#ee7c01] hover:underline">More events &gt;&gt;</Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      

      {/* Call to Action */}
      <section className="py-20 bg-[#003d7b]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Join the Future?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join us in building a globally connected, future-ready society where advanced 
            algorithms drive human progress and technological breakthroughs.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/membership">
              Explore Membership Options
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
