import { Link } from "react-router-dom";
import intelligenceXBg from "@/assets/IntelligenceX/IntelligenceX_bg.jpg";

export default function IntelligenceX2026TravelSupport() {
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
            IntelligenceX 2026 · Financial Support
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Travel Support Programme
          </h1>
          <p className="text-white/85 text-base max-w-2xl">
            SoAI is committed to fostering inclusive participation in IntelligenceX 2026 by
            providing partial financial support to early-career researchers.
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

          {/* About */}
          <section className="space-y-4 rounded-lg border border-gray-200 bg-[#f9fafb] p-6 md:p-8">
            <h2 className="text-xl font-semibold text-gray-900">About the Travel Support Programme</h2>
            <p className="text-gray-800 leading-relaxed text-sm md:text-base">
              The Travel Support Programme is launched by SoAI to encourage early-career researchers
              to participate in conferences. The programme is open to PhD students and researchers
              within three years of graduation, with priority given to applicants from developing
              countries.
            </p>
            <p className="text-gray-800 leading-relaxed text-sm md:text-base">
              The Travel Support Programme aims to partially cover the fees that may be incurred
              during the conference itself. The types of fees where partial coverage is available are:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-gray-800 text-sm md:text-base">
              <li>Travel fees</li>
              <li>Conference registration fees</li>
              <li>Accommodation</li>
            </ul>
          </section>

          {/* Submission and Review */}
          <section className="space-y-5">
            <h2 className="text-xl font-semibold text-gray-900">Submission and Review</h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-gray-200 bg-white px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">Submission Deadline</p>
                <p className="text-base font-semibold text-gray-900">31 July 2026</p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">Results Announced</p>
                <p className="text-base font-semibold text-gray-900">15 September 2026</p>
              </div>
            </div>

            <p className="text-gray-800 leading-relaxed text-sm md:text-base">
              As there are limited financial resources available, SoAI may not be able to satisfy all
              applications made under the Travel Support Programme. SoAI reserves the sole right to
              determine the amount and type of support awarded to each applicant. All applications
              will be reviewed by SoAI, and the results will be announced on 15 September 2026. The
              decision of SoAI regarding the provision, amount, and type of financial support is
              final and not subject to appeal.
            </p>

            <div className="space-y-2">
              <h3 className="text-base font-semibold text-gray-900">Applications should include:</h3>
              <ul className="list-disc pl-6 space-y-1.5 text-gray-800 text-sm md:text-base">
                <li>Name, affiliation, and contact details of the applicant</li>
                <li>Up to two types of fees which the applicant wants to apply for a partial subsidy</li>
              </ul>
            </div>
          </section>

          {/* Apply CTA */}
          <section className="rounded-xl border border-[#003d7b]/20 bg-[#f0f6ff] px-6 py-6 space-y-4">
            <h2 className="text-lg font-semibold text-[#003d7b]">Apply for Travel Support</h2>
            <p className="text-sm text-gray-700">
              Submit your application via the link below before <strong>31 July 2026</strong>.
            </p>
            <a
              href="https://forms.gle/qH5vGtjwar6N2UAW6"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#003d7b] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#002a57]"
            >
              Submit Application →
            </a>
          </section>

          {/* Contact & Links */}
          <section className="space-y-3 text-sm text-gray-700">
            <p>
              <span className="font-medium">Enquiries: </span>
              <a href="mailto:info@soc-ai.org" className="text-[#003d7b] hover:underline">
                info@soc-ai.org
              </a>
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
