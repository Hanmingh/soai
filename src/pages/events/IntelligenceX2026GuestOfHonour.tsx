import { Link } from "react-router-dom";
import intelligenceXBg from "@/assets/IntelligenceX/IntelligenceX_bg.jpg";

export default function IntelligenceX2026GuestOfHonour() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative py-16 md:py-20 bg-gray-900">
        <img
          src={intelligenceXBg}
          alt="IntelligenceX 2026 background"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          decoding="sync"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#003d7b]/90 to-[#002a57]/90" />
        <div className="relative container mx-auto px-6 max-w-4xl">
          <p className="text-sm font-semibold text-[#ffcf8c] mb-3 uppercase tracking-[0.16em]">
            Guest of Honour · Main Conference
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Ms Rahayu Mahzam
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-white/90">
            Minister of State, Ministry of Digital Development and Information (MDDI)
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

          {/* Bio pending notice */}
          <section className="space-y-4 rounded-lg border border-amber-200 bg-amber-50 p-6 md:p-8">
            <h2 className="text-xl font-semibold text-gray-900">Photograph &amp; Biography</h2>
            <p className="text-gray-800 leading-relaxed text-sm md:text-base">
              Ms Rahayu Mahzam, Minister of State, Ministry of Digital Development and Information (MDDI),
              will be the Guest of Honour for the IntelligenceX 2026 Main Conference. Her official photograph
              and biography are pending confirmation from MDDI and will be published on this page once available.
            </p>
          </section>

          {/* Event context */}
          <section className="space-y-3 text-sm text-gray-700">
            <p>
              <span className="font-medium">Role: </span>
              Guest of Honour, IntelligenceX 2026 Main Conference
            </p>
            <p>
              <span className="font-medium">Main Conference: </span>
              24–26 September 2026 · Singapore
            </p>
            <p>
              <span className="font-medium">Conference website: </span>
              <Link to="/events/intelligencex-2026" className="text-[#003d7b] hover:underline">
                soc-ai.org/events/intelligencex-2026
              </Link>
            </p>
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
