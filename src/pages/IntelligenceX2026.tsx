import { Link } from "react-router-dom";
import intelligenceXBg from "@/assets/IntelligenceX/IntelligenceX_bg.jpg";
import spmpLogo from "@/assets/IntelligenceX/SPMP_Logo.jpg";
import secbLogo from "@/assets/IntelligenceX/SECB_Logo.png";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function IntelligenceX2026() {
  const bgUrl = intelligenceXBg;
  return (
    <div className="min-h-screen bg-white">
      {/* Hero / Title band */}
      <section className="relative py-16 md:py-20 bg-gray-900">
        <img
          src={bgUrl}
          alt="IntelligenceX 2026 background"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
          decoding="sync"
        />
        <div className="absolute inset-0 bg-[#003d7b]/80" />
        <div className="relative container mx-auto px-6 max-w-5xl">
          <p className="text-sm font-semibold text-[#ffcf8c] mb-2 uppercase tracking-wide">
            SoAI Event · 2026
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            IntelligenceX 2026: The Global Quantum×AI Frontier
          </h1>
          <p className="text-white/90 max-w-3xl text-lg leading-relaxed">
            A flagship three-day Global Quantum×AI Conference jointly organized by the National University of Singapore (NUS)
            and the Society of Algorithmic Intelligence (SoAI).
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-6 max-w-5xl space-y-10">
          {/* Event information summary */}
          <section className="border-l-4 border-[#ee7c01] pl-5 py-2 bg-[#f9fafb]">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Event Information</h2>
            <dl className="grid gap-1 text-sm md:text-base text-gray-800 md:grid-cols-2">
              <div>
                <dt className="font-medium">Main Conference</dt>
                <dd>24–26 September 2026 · Singapore</dd>
              </div>
              <div>
                <dt className="font-medium">Executive Track</dt>
                <dd>28 September 2026 · Singapore · By invitation only</dd>
              </div>
            </dl>
          </section>

          {/* Ticket pricing */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Ticket Pricing</h2>
            <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-200 bg-gray-50 hover:bg-gray-50">
                    <TableHead className="h-12 px-4 font-semibold text-gray-900">
                      Registration type
                    </TableHead>
                    <TableHead className="h-12 px-4 font-semibold text-gray-900 text-right">
                      SoAI member
                    </TableHead>
                    <TableHead className="h-12 px-4 font-semibold text-gray-900 text-right">
                      Non-SoAI member
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="border-gray-100">
                    <TableCell className="px-4 py-3.5 text-gray-800">
                      <span className="font-medium">Early bird</span>
                      <span className="block text-sm text-gray-500 mt-0.5">
                        Open till 31 Jul 2026
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-3.5 text-right font-medium text-gray-900">
                      300 SGD
                    </TableCell>
                    <TableCell className="px-4 py-3.5 text-right font-medium text-gray-900">
                      600 SGD
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-gray-100">
                    <TableCell className="px-4 py-3.5 text-gray-800">
                      <span className="font-medium">Later registration</span>
                      <span className="block text-sm text-gray-500 mt-0.5">
                        Open till 15 Sep 2026
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-3.5 text-right font-medium text-gray-900">
                      380 SGD
                    </TableCell>
                    <TableCell className="px-4 py-3.5 text-right font-medium text-gray-900">
                      850 SGD
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-gray-100">
                    <TableCell className="px-4 py-3.5 text-gray-800">
                      <span className="font-medium">On-site registration</span>
                    </TableCell>
                    <TableCell className="px-4 py-3.5 text-right font-medium text-gray-900">
                      380 SGD
                    </TableCell>
                    <TableCell className="px-4 py-3.5 text-right font-medium text-gray-900">
                      900 SGD
                    </TableCell>
                  </TableRow>
                </TableBody>
                <TableCaption className="px-4 pb-3 text-left text-sm text-gray-500">
                  All prices are GST included.
                </TableCaption>
              </Table>
            </div>
          </section>

          {/* Overview */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Overview</h2>
            <p className="text-gray-800 leading-relaxed">
              IntelligenceX 2026 is a flagship three-day Global Quantum×AI Conference jointly organized by the National
              University of Singapore (NUS) and the Society of Algorithmic Intelligence (SoAI). The event brings together
              leading researchers, industry innovators, and decision-makers to explore how quantum computing, artificial
              intelligence, data science, and statistics jointly redefine the future of intelligent systems.
            </p>
            <p className="text-gray-800 leading-relaxed">
              Building on a strong foundation of prior workshops, tutorials, and hackathons, IntelligenceX 2026 is
              designed to bridge frontier research and practical deployment, combining scientific rigor with
              methodological and strategic relevance.
            </p>
          </section>

          {/* Conference Highlights */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Conference Highlights</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-800 leading-relaxed text-sm md:text-base">
              <li>
                Keynote addresses by world-leading researchers and industry pioneers
              </li>
              <li>
                Parallel technical sessions on quantum computing, artificial intelligence, data science, statistics,
                and hybrid Quantum×AI methodologies
              </li>
              <li>
                Hands-on tutorials covering quantum fundamentals, optimization, forecasting, and hybrid Quantum×AI workflows
              </li>
              <li>
                Panel discussions and roundtables fostering dialogue among academia, industry, and policymakers
              </li>
              <li>
                Ecosystem Forum, featuring industry–academia showcases and collaboration opportunities
              </li>
            </ul>
          </section>

          {/* Executive Track */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Executive Track</h2>
            <p className="text-gray-700 text-sm md:text-base">
              <span className="font-semibold">28 September 2026 – By Invitation Only</span>
            </p>
            <p className="text-gray-800 leading-relaxed">
              In addition to the main conference, IntelligenceX 2026 will host a half-day executive program designed
              for senior technology, innovation, and policy leaders. This curated track will offer:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-800 leading-relaxed text-sm md:text-base">
              <li>
                Strategic briefings on Quantum×AI readiness, integration, and long-term impact
              </li>
              <li>
                Moderated roundtables on investment strategy, governance, and organizational transformation
              </li>
              <li>
                Opportunities to engage with global experts in a focused, high-level setting
              </li>
            </ul>
            <p className="text-gray-800 leading-relaxed">
              The executive program complements the public training sessions, which are open to practitioners and
              researchers seeking hands-on exposure to quantum computing, artificial intelligence, and data science
              foundations.
            </p>
          </section>

          {/* Scientific Organizing Committee */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              Scientific Organizing Committee
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-800 leading-relaxed text-sm md:text-base">
              <li>Bastian Bergmann (ETH Zürich, Switzerland)</li>
              <li>Ralf Borndörfer (Freie Universität Berlin &amp; Zuse Institute Berlin, Germany)</li>
              <li>Agostino Capponi (Columbia University, USA)</li>
              <li>Chun-houh Chen (Academia Sinica, Taiwan)</li>
              <li>Ray-Bing Chen (National Tsing Hua University, Taiwan)</li>
              <li>Ying Chen (National University of Singapore, Singapore)</li>
              <li>Paolo Giudici (University of Pavia, Italy)</li>
              <li>Xin Guo (University of California, Berkeley, USA)</li>
              <li>Nikolaus Hautsch (University of Vienna, Austria)</li>
              <li>Tomoyuki Higuchi (The Institute of Statistical Mathematics, Japan)</li>
              <li>Thorsten Koch (Zuse Institute Berlin &amp; TU Berlin, Germany)</li>
              <li>Stefan Lessmann (Humboldt-Universität zu Berlin, Germany)</li>
              <li>Rujira Ouncharoen (Chiang Mai University, Thailand)</li>
              <li>Huyên Pham (École Polytechnique, France)</li>
              <li>Paulo Canas Rodrigues (Federal University of Bahia, Brazil)</li>
              <li>Josef Teichmann (ETH Zürich, Switzerland)</li>
              <li>Simon Trimborn (University of Amsterdam, Netherlands)</li>
              <li>Qiwei Yao (London School of Economics and Political Science, UK)</li>
            </ul>
          </section>

          {/* Host & Support logos */}
          <section className="pt-8">
            <div className="grid gap-10 md:grid-cols-2 items-center">
              <div className="flex flex-col items-center md:items-start gap-3">
                <p className="text-sm md:text-base font-semibold text-gray-700 uppercase tracking-wide">
                  Held in:
                </p>
                <a
                  href="https://www.visitsingapore.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="VisitSingapore – Singapore, Passion Made Possible"
                >
                  <img
                    src={spmpLogo}
                    alt="Singapore – Passion Made Possible"
                    className="h-50 md:h-50 w-auto"
                    loading="lazy"
                  />
                </a>
              </div>
              <div className="flex flex-col items-center md:items-start gap-3">
                <p className="text-sm md:text-base font-semibold text-gray-700 uppercase tracking-wide">
                  Supported by:
                </p>
                <a
                  href="https://www.visitsingapore.com/mice"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="VisitSingapore – Singapore Exhibition & Convention Bureau"
                >
                  <img
                    src={secbLogo}
                    alt="Singapore Exhibition & Convention Bureau"
                    className="h-50 md:h-50 w-auto"
                    loading="lazy"
                  />
                </a>
              </div>
            </div>
          </section>

          {/* Back link */}
          <div className="pt-4">
            <Link to="/events" className="text-sm text-[#003d7b] hover:underline">
              ← Back to Events
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}


