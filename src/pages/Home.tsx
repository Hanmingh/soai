import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Gallery from "@/components/home/Gallery";
import { recentEvents } from "@/data/events";
import { newsItems } from "@/data/news";

export default function Home() {
  const galleryImages = (() => {
    // Prefer build-time imported assets from src/assets/gallery via Vite glob
    const imported = import.meta.glob(
      "/src/assets/gallery/*.{jpg,jpeg,png,webp,avif,gif}",
      { eager: true }
    ) as Record<string, any>;

    const urls = Object.values(imported)
      .map((m: any) => m?.default as string)
      .filter(Boolean);

    if (urls.length > 0) {
      return urls.map((u) => ({ src: u }));
    }

    // Fallback to public/gallery for now (runtime-served assets)
    const fallback = [
      "/gallery/pexels-jibarofoto-2774556.jpg",
      "/gallery/pexels-divinetechygirl-1181396.jpg",
      "/gallery/waiting-room-with-monitors.jpg",
    ];
    return fallback.map((u) => ({ src: u }));
  })();
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-cover bg-center bg-no-repeat" style={{backgroundImage: 'url(/banner.jpg)'}}>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-[#003d7b]/80"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-[#ee7c01] text-white">
              Leading AI Research Society
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
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Inside SoAI</h2>
              <p className="text-gray-600 mb-6">Glimpses from recent conferences, workshops, and labs.</p>
              <div onMouseEnter={(e) => ((e.currentTarget.firstChild as HTMLElement).style.animationPlayState = 'paused')} onMouseLeave={(e) => ((e.currentTarget.firstChild as HTMLElement).style.animationPlayState = 'running')}>
                <Gallery images={galleryImages} />
              </div>
              {/* News under gallery */}
              <div className="mt-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">News</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {newsItems.slice(0, 4).map((n) => (
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
              </div>
            </div>
            <aside className="lg:col-span-4">
              <div className="sticky top-24">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Events</h3>
                <ul className="space-y-4">
                  {recentEvents.map((ev) => (
                    <li key={ev.id} className="rounded-lg border bg-white p-4 shadow-sm">
                      <div className="text-sm text-[#003d7b] font-medium">{new Date(ev.date).toLocaleDateString()}</div>
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
