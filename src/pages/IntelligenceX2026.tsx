import { Link } from "react-router-dom";
import intelligenceXBg from "@/assets/IntelligenceX/IntelligenceX_bg.jpg";
import spmpLogo from "@/assets/IntelligenceX/SPMP_Logo.jpg";
import secbLogo from "@/assets/IntelligenceX/SECB_Logo.png";
import isiLogo from "@/assets/IntelligenceX/isi_logo.png";

export default function IntelligenceX2026() {
  const bgUrl = intelligenceXBg;

  /* Wikimedia Commons Special:FilePath — browser follows 302 redirect, no hash needed */
  const sfp = (f: string) => `https://commons.wikimedia.org/wiki/Special:FilePath/${f}`;

  const institutionLogos = [
    { abbr: "ANL",  name: "Argonne National Laboratory",    src: sfp("ArgonneLaboratoryLogo.png"),                                                                                                                      href: "https://www.anl.gov" },
    { abbr: "AS",   name: "Academia Sinica",                 src: "https://upload.wikimedia.org/wikipedia/en/2/21/Academia_Sinica_logo.svg",                                                               href: "https://www.sinica.edu.tw" },
    { abbr: "CHU",  name: "Chuo University",                 src: sfp("%E4%B8%AD%E5%A4%AE%E5%A4%A7%E5%AD%A6.svg"),                                                                                                     href: "https://www.chuo-u.ac.jp/en/" },
    { abbr: "CMU",  name: "Chiang Mai University",           src: sfp("CMU_sub-logo.svg"),                                                                                                                              href: "https://www.cmu.ac.th" },
    { abbr: "CNRS", name: "CNRS",                            src: "https://upload.wikimedia.org/wikipedia/en/f/f5/Centre_national_de_la_recherche_scientifique_%28logo%29.svg",                                        href: "https://www.cnrs.fr" },
    { abbr: "CU",   name: "Columbia University",             src: "https://upload.wikimedia.org/wikipedia/commons/3/33/Coat_of_Arms_of_Columbia_University.svg",                                                       href: "https://www.columbia.edu" },
    { abbr: "EP",   name: "École Polytechnique",             src: sfp("%C3%89cole_polytechnique_signature.svg"),                                                                                                        href: "https://www.polytechnique.edu" },
    { abbr: "ETH",  name: "ETH Zürich",                     src: "https://upload.wikimedia.org/wikipedia/commons/9/99/ETH_Z%C3%BCrich_Logo_black.svg",                                                                href: "https://ethz.ch" },
    { abbr: "FUB",  name: "Freie Universität Berlin",       src: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Freie_Universit%C3%A4t_Berlin_Logo_05.2024.svg",                                               href: "https://www.fu-berlin.de" },
    { abbr: "HUB",  name: "Humboldt-Universität zu Berlin", src: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Huberlin-logo.svg",                                                                             href: "https://www.hu-berlin.de" },
    { abbr: "ISM",  name: "Inst. Statistical Mathematics",  src: "https://upload.wikimedia.org/wikipedia/commons/e/e6/ISM_logo.svg",                                                                                  href: "http://www.ism.ac.jp/index_e.html" },
    { abbr: "IST",  name: "Institute of Science Tokyo",     src: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Institute_of_Science_Tokyo_logo%2C_basic.svg",                                                  href: "https://www.isct.ac.jp/en" },
    { abbr: "LSE",  name: "London School of Economics",     src: sfp("LSE_Logo.svg"),                                                                                                                                   href: "https://www.lse.ac.uk" },
    { abbr: "NTHU", name: "National Tsing Hua University",  src: sfp("NTHU_Round_Seal.svg"),                                                                                                                            href: "https://www.nthu.edu.tw" },
    { abbr: "NUS",  name: "National Univ. of Singapore",   src: "https://nus.edu.sg/images/default-source/base/logo.png",                                                                                              href: "https://www.nus.edu.sg" },
    { abbr: "NUHS", name: "NUS Health System",              src: "https://www.nuhs.edu.sg/images/nuhslibraries/default-album/footer-logo/nuhs.png?sfvrsn=7838e2df_17",                                                href: "https://www.nuhs.edu.sg" },
    { abbr: "TUAT", name: "Tokyo Univ. Agri. & Tech.",     src: sfp("Logo_Tokyo_University_of_Agriculture_and_Technology.svg"),                                                                                        href: "https://www.tuat.ac.jp/en/" },
    { abbr: "UCB",  name: "UC Berkeley",                    src: "https://upload.wikimedia.org/wikipedia/commons/a/a1/Seal_of_University_of_California%2C_Berkeley.svg",                                              href: "https://www.berkeley.edu" },
    { abbr: "UFBA", name: "Federal Univ. of Bahia",        src: sfp("Bras%C3%A3o_da_UFBA.png"),                                                                                                                       href: "https://www.ufba.br" },
    { abbr: "UP",   name: "University of Pavia",            src: "https://upload.wikimedia.org/wikipedia/commons/d/dc/Logo_UNIPV.svg",                                                                                href: "https://www.unipv.it/en" },
    { abbr: "UvA",  name: "Univ. of Amsterdam",            src: "https://upload.wikimedia.org/wikipedia/commons/d/d1/Amsterdamuniversitylogo.svg",                                                                    href: "https://www.uva.nl/en" },
    { abbr: "UVie", name: "University of Vienna",           src: "https://upload.wikimedia.org/wikipedia/commons/1/13/University_of_Vienna_wordmark.svg",                                                             href: "https://www.univie.ac.at/en/" },
    { abbr: "ZIB",  name: "Zuse Institute Berlin",         src: "https://upload.wikimedia.org/wikipedia/en/6/69/Logo_of_the_Zuse_Institute_Berlin.png",                                                               href: "https://www.zib.de/en" },
  ];
  //to do由原来的机构首字母排序改成人名 首字母形式重排

  const marqueeLogos = [
    { abbr: "CNRS", name: "CNRS",                                     src: "https://upload.wikimedia.org/wikipedia/en/f/f5/Centre_national_de_la_recherche_scientifique_%28logo%29.svg",   href: "https://www.cnrs.fr" },
    { abbr: "CU",   name: "Columbia University",                      src: "https://upload.wikimedia.org/wikipedia/commons/3/33/Coat_of_Arms_of_Columbia_University.svg",                  href: "https://www.columbia.edu" },
    { abbr: "ETH",  name: "ETH Zürich",                              src: "https://upload.wikimedia.org/wikipedia/commons/9/99/ETH_Z%C3%BCrich_Logo_black.svg",                            href: "https://ethz.ch" },
    { abbr: "ISI",  name: "International Statistical Institute",      src: isiLogo,                                                                                                         href: "https://isi-web.org/" },
    { abbr: "ISM",  name: "Inst. Statistical Mathematics",            src: "https://upload.wikimedia.org/wikipedia/commons/e/e6/ISM_logo.svg",                                              href: "http://www.ism.ac.jp/index_e.html" },
    { abbr: "IST",  name: "Institute of Science Tokyo",               src: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Institute_of_Science_Tokyo_logo%2C_basic.svg",             href: "https://www.isct.ac.jp/en" },
    { abbr: "LSE",  name: "London School of Economics",               src: sfp("LSE_Logo.svg"),                                                                                             href: "https://www.lse.ac.uk" },
    { abbr: "NUS",  name: "National University of Singapore",         src: "https://nus.edu.sg/images/default-source/base/logo.png",                                                        href: "https://www.nus.edu.sg" },
    { abbr: "SECB", name: "Singapore Exhibition & Convention Bureau", src: secbLogo,                                                                                                        href: "https://www.visitsingapore.com/mice" },
    { abbr: "SPMP", name: "Singapore – Passion Made Possible",        src: spmpLogo,                                                                                                        href: "https://www.visitsingapore.com" },
    { abbr: "UCB",  name: "UC Berkeley",                              src: "https://upload.wikimedia.org/wikipedia/commons/a/a1/Seal_of_University_of_California%2C_Berkeley.svg",         href: "https://www.berkeley.edu" },
    { abbr: "UvA",  name: "Univ. of Amsterdam",                      src: "https://upload.wikimedia.org/wikipedia/commons/d/d1/Amsterdamuniversitylogo.svg",                               href: "https://www.uva.nl/en" },
    { abbr: "ZIB",  name: "Zuse Institute Berlin",                    src: "https://upload.wikimedia.org/wikipedia/en/6/69/Logo_of_the_Zuse_Institute_Berlin.png",                         href: "https://www.zib.de/en" },
  ];

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

          {/* Partner logos – scrolling marquee */}
          <section className="pb-2">
            <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
              <div
                className="marquee flex items-center gap-14"
                style={{ animationDuration: "38s" }}
              >
                {[...marqueeLogos, ...marqueeLogos].map((logo, i) => (
                  <a
                    key={i}
                    href={logo.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={logo.name}
                    className="shrink-0 transition-opacity hover:opacity-70"
                  >
                    <img
                      src={logo.src}
                      alt={logo.name}
                      className="h-10 w-auto max-w-[130px] object-contain transition"
                      loading="lazy"
                      onError={(e) => {
                        const anchor = (e.currentTarget as HTMLElement).closest("a") as HTMLElement | null;
                        if (anchor) anchor.style.display = "none";
                      }}
                    />
                  </a>
                ))}
              </div>
            </div>
          </section>

          <section className="flex flex-wrap items-start gap-4">
            {/* 左侧：会议两个按钮 + PDF链接 */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/events/intelligencex-2026/register"
                  className="inline-flex items-center justify-center rounded-full bg-[#ee7c01] px-6 py-2.5 text-base font-semibold text-white shadow-md transition hover:bg-[#d66900] hover:shadow-lg"
                >
                  Conference Registration
                </Link>
                <a
                  href="https://forms.gle/kKcYxG6PDgyvrSNk8"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-[#ee7c01] bg-white px-6 py-2.5 text-base font-semibold text-[#ee7c01] shadow-sm transition hover:bg-[#fff3e6]"
                >
                  Invited Session Submission
                </a>
              </div>
              <a
                href="/events/Call%20for%20Invited%20Sessions.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-base font-semibold text-[#003d7b] hover:text-[#002a57]"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6" />
                </svg>
                Call for Invited Sessions
              </a>
            </div>

            {/* 右侧：Hackathon按钮 + PDF链接，正下方对齐 */}
            <div className="flex flex-col items-start gap-3 ml-4">
              <a
                href="/trading-competition/index.html"
                target="_blank"
                rel="noreferrer"
                className="btn-blink inline-flex items-center justify-center rounded-lg bg-[#003d7b] px-16 py-5 text-xl font-bold text-white transition hover:bg-[#002a57]"
              >
                🏆 AI Trading Hackathon
              </a>
              <a
                href="/events/Call%20for%20Hackathon%20Participation.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-base font-semibold text-[#003d7b] hover:text-[#002a57]"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6" />
                </svg>
                Call for Hackathon Participation
              </a>
            </div>
          </section>

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
              This flagship conference also integrates{" "}
              <span className="font-bold">
                The 10th NUS-ZIB-ISCT-ISM-MODAL Workshop on Algorithmic Intelligence: Optimization, Data Science & Decision-Making
                in the Quantum–AI Era
              </span>
              , continuing{" "}
              <a
                href="https://sites.google.com/view/optds2025/"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-[#003d7b] underline hover:text-[#002a57]"
              >
                a long-standing international workshop series
              </a>{" "}
              on optimization, data science, and decision intelligence, and extending it into the emerging Quantum × AI frontier.
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
                Hands-on tutorials on quantum computing, AI-assisted coding, and AI algorithmic trading
              </li>
              <li>
                Panel discussions and roundtables fostering dialogue among academia, industry, and policymakers
              </li>
              <li>
                Ecosystem Forum, featuring industry–academia showcases and collaboration opportunities
              </li>
            </ul>
          </section>

          {/* Hands-On Tutorials — link card */}
          <section className="rounded-lg border border-gray-200 bg-[#f9fafb] p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Hands-On Tutorials @ IntelligenceX 2026
                </h2>
                <p className="text-sm md:text-base font-medium text-[#003d7b]">
                  Limited Seats · 3 tutorials · 25 September 2026
                </p>
                <p className="text-sm text-gray-600">
                  Quantum Computing · AI for Coding · AI Algorithmic Trading
                </p>
              </div>
              <Link
                to="/events/intelligencex-2026/tutorials"
                className="shrink-0 inline-flex items-center justify-center rounded-full bg-[#003d7b] px-6 py-2.5 text-base font-semibold text-white shadow-md transition hover:bg-[#002a57] hover:shadow-lg"
              >
                View Tutorials →
              </Link>
            </div>
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
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Scientific Organizing Committee
            </h2>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Left: list sorted by last name A–Z */}
              <ul className="list-disc pl-6 space-y-2 text-gray-800 leading-relaxed text-sm md:text-base flex-1 min-w-0">
                <li>Bastian Bergmann (ETH Zürich, Switzerland)</li>
                <li>Ralf Borndörfer (Freie Universität Berlin &amp; Zuse Institute Berlin, Germany)</li>
                <li>Agostino Capponi (Columbia University, USA)</li>
                <li>Paulo Canas Rodrigues (Federal University of Bahia, Brazil)</li>
                <li>Patrick Chia (National University Health System, Singapore)</li>
                <li>Chun-houh Chen (Academia Sinica, Taiwan)</li>
                <li>Ray-Bing Chen (National Tsing Hua University, Taiwan)</li>
                <li>Ying Chen (National University of Singapore, Singapore)</li>
                <li>Katsuki Fujisawa (Institute of Science Tokyo, Japan)</li>
                <li>Paolo Giudici (University of Pavia, Italy)</li>
                <li>Xin Guo (University of California, Berkeley, USA)</li>
                <li>Nikolaus Hautsch (University of Vienna, Austria)</li>
                <li>Tomoyuki Higuchi (Chuo University, Japan)</li>
                <li>Satoshi Ito (The Institute of Statistical Mathematics, Japan)</li>
                <li>Tal Kachman (Radboud University, Netherlands)</li>
                <li>Thorsten Koch (Zuse Institute Berlin &amp; TU Berlin, Germany)</li>
                <li>Stefan Lessmann (Humboldt-Universität zu Berlin, Germany)</li>
                <li>Sven Leyffer (Argonne National Laboratory, USA)</li>
                <li>Rujira Ouncharoen (Chiang Mai University, Thailand)</li>
                <li>Huyên Pham (École Polytechnique, France)</li>
                <li>Xun Shen (Tokyo University of Agriculture and Technology, Japan)</li>
                <li>Yuji Shinano (Zuse Institute Berlin, Germany)</li>
                <li>Josef Teichmann (ETH Zürich, Switzerland)</li>
                <li>Simon Trimborn (University of Amsterdam, Netherlands)</li>
                <li>Qiwei Yao (London School of Economics and Political Science, UK)</li>
              </ul>

              {/* Right: institution logo grid (desktop only) */}
              <div className="hidden md:grid grid-cols-2 gap-x-4 gap-y-3 shrink-0 w-52">
                {institutionLogos.map((inst) => (
                  <a
                    key={inst.abbr}
                    href={inst.href}
                    target="_blank"
                    rel="noreferrer"
                    title={inst.name}
                    className="flex items-center justify-center h-10 opacity-60 hover:opacity-100 transition-opacity"
                  >
                    {inst.src ? (
                      <>
                        <img
                          src={inst.src}
                          alt={inst.abbr}
                          className="h-8 w-full object-contain grayscale hover:grayscale-0 transition"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            const sib = e.currentTarget.nextElementSibling as HTMLElement | null;
                            if (sib) sib.style.display = "";
                          }}
                        />
                        <span
                          className="text-[9px] font-bold text-gray-400 text-center leading-tight border border-gray-200 rounded px-1.5 py-0.5"
                          style={{ display: "none" }}
                        >
                          {inst.abbr}
                        </span>
                      </>
                    ) : (
                      <span className="text-[9px] font-bold text-gray-400 text-center leading-tight border border-gray-200 rounded px-1.5 py-0.5">
                        {inst.abbr}
                      </span>
                    )}
                  </a>
                ))}
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


