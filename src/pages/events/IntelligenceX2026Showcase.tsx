import { Link } from "react-router-dom";
import intelligenceXBg from "@/assets/IntelligenceX/IntelligenceX_bg.jpg";
import jeremyImg from "@/assets/IntelligenceX/jeremy.jpeg";
import dWaveLogo from "@/assets/IntelligenceX/d-wave_logo.png";
import ritaImg from "@/assets/IntelligenceX/rita.jpeg";
import uhlImg from "@/assets/IntelligenceX/Uhl_Matthias_Portrait.png";
import ethZurichLogo from "@/assets/IntelligenceX/ETH-Zurich_logo.png";
import ubsLogo from "@/assets/IntelligenceX/UBS_Logo.png";

interface ShowcasePresenter {
  name: string;
  title: string;
  affiliation: string;
  bio: string;
  photo: string;
  linkedin?: string;
}

interface ShowcaseProject {
  id: string;
  title: string;
  abstract: string;
  organization: string;
  organizationLogo?: string;
  presenter: ShowcasePresenter;
}

const showcases: ShowcaseProject[] = [
  {
    id: "dwave-annealing-dual-rail",
    title:
      "Annealing and Dual-Rail Cavity Qubit quantum computers: How do advances in annealing and gate-model quantum computers affect industry?",
    abstract:
      "The quantum computing ecosystem is rapidly evolving, with multiple modalities driving rapid advances. This talk examines the journey toward fault-tolerant gate-model quantum computers that can solve real-world problems, the roadmap to 100,000-qubit annealing systems and the integration of analog-digital quantum capabilities within annealing processors. We will explore how these advances are expanding quantum value creation across optimization, AI, and materials science, demonstrating how today's platforms are solving meaningful problems while accelerating the future of quantum computing.",
    organization: "D-Wave",
    organizationLogo: dWaveLogo,
    presenter: {
      name: "Jeremy Woo",
      title: "Senior Technical Advisor",
      affiliation: "D-Wave",
      bio: "Jeremy Woo is a Senior Technical Advisor at D-Wave, responsible for supporting users in the APAC region to develop applications' real world value and implementing quantum applications into production systems. He previously worked at several major consulting firms as a data scientist, data engineer, and strategy consultant. He holds a master's degree in computer science from the University of Pennsylvania.",
      photo: jeremyImg,
    },
  },
  {
    id: "target-trial-upper-limb-rehabilitation",
    title:
      "A Multi-Technology, Self-Administered At-Home Upper-Limb Training Program for Post-Stroke Recovery — The TARGeT Trial",
    abstract:
      "Stroke commonly causes lasting upper-limb impairment, yet the high training doses linked to recovery are hard to deliver after discharge given limited clinic capacity, therapist availability, travel, and cost. Home-based, technology-assisted rehabilitation could extend intensive therapy beyond the clinic, but its feasibility and safety in real home settings remain unproven. We evaluated TARGeT (Technology-Assisted Rehabilitation Gym for at-home Training), an unsupervised, high-dose, home-based program for stroke survivors in Singapore. In this single-centre, single-group pilot, 26 subacute and chronic participants completed six weeks of daily self-administered upper-limb training using three complementary technologies (i.e., H-Man, RehandyBot, and MyoGuide) targeting different limb segments with remote clinician monitoring. Primary outcomes were adherence and safety; secondary outcomes were clinical impact (Fugl-Meyer Assessment, FMA-UE; Action Research Arm Test, ARAT), usability (System Usability Scale), and cost relative to conventional therapy. The program proved feasible and safe, with good adherence and almost no adverse events. Participants showed significant improvements in FMA-UE and ARAT, reported favourable usability, and incurred lower costs than duration-matched conventional therapy. These findings suggest that a multi-technology, self-administered home program can deliver safe, well-tolerated, and clinically meaningful upper-limb rehabilitation while reducing the demand on therapists, thereby supporting the scalability of technology-assisted stroke care. Future work should identify who benefits most and define a cost-effective delivery model.",
    organization: "Future Health Technologies, Singapore-ETH Centre",
    organizationLogo: ethZurichLogo,
    presenter: {
      name: "Dr Hsiao-ju (Rita) Cheng",
      title: "Postdoctoral Researcher",
      affiliation: "Future Health Technologies, Singapore-ETH Centre",
      bio: "Dr Hsiao-ju (Rita) Cheng is a Postdoctoral Researcher with the Future Health Technologies (FHT) programme at the Singapore-ETH Centre, where she works on connected rehabilitation and assistive technologies for stroke survivors. She received her PhD in 2020 from the Department of Biomedical Engineering at the National University of Singapore (NUS), where her work focused on rehabilitation robots for post-stroke gait recovery and brain changes following stroke. Before joining FHT, she was a Research Fellow in the Multimodal Neuroimaging in Neuropsychiatric Disorders Laboratory at NUS, investigating functional and structural brain changes associated with motor and cognitive impairment after stroke. She earned her Bachelor's and Master's degrees in Occupational Therapy from National Taiwan University and is a licensed occupational therapist in Taiwan. Her research centres on the effects and mechanisms of neurorehabilitation, bridging occupational therapy, rehabilitation engineering, and neuroscience.",
      photo: ritaImg,
    },
  },
  {
    id: "ubs-am-ai-investment-process",
    title: "AI in the Investment Process of a Global Asset Manager",
    abstract:
      "Artificial intelligence is reshaping investment management, but its greatest impact lies beyond generative AI. This keynote explores how machine learning, natural language processing, optimization techniques, and increasingly agentic AI systems are transforming the investment process—from research and asset allocation to portfolio construction and implementation. Drawing on practical experience from institutional investing, the session will highlight how intelligent systems can augment human judgment, enhance scalability and consistency, and unlock new sources of insight while maintaining robust governance and transparency.",
    organization: "UBS Asset Management",
    organizationLogo: ubsLogo,
    presenter: {
      name: "PD Dr. Matthias W. Uhl",
      title: "Managing Director",
      affiliation: "UBS Asset Management",
      bio: "Matthias is the head of Analytics & Quant Solutions at UBS Asset Management. In his role, Matthias is responsible for leading the analytics, performance KPI and attribution, quant research, portfolio construction and optimization work, quant development, and systematic active multi-asset portfolio management within Investments. Previously, Matthias was Chief Investment Officer at FLYNT Bank AG and has worked in various roles in the CIO Office at UBS Wealth Management, at UBS Investment Bank, at Deutsche Bank, and at the KOF Swiss Economic Institute of the ETH Zurich. Matthias has a habilitation in quant finance from the University of Zurich, holds a Ph.D. in applied macroeconomics and behavioral finance from ETH Zurich, a Master of Science from Oxford University and two Bachelor of Arts degrees from the American University of Paris. Matthias lectures on portfolio management and sentiment analytics at the University of Zurich and at the University of St. Gallen (HSG), and he teaches executive classes at the Swiss Finance Institute. His research has been published in various leading academic journals, such as in the Journal of Portfolio Management, Finance Research Letters, and Economics Letters, among others.",
      photo: uhlImg,
      linkedin: "https://www.linkedin.com/in/matthias-w-uhl/",
    },
  },
];

export default function IntelligenceX2026Showcase() {
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
            Showcase
          </h1>
          <p className="text-white/85 text-base max-w-2xl">
            Discover the projects, platforms, and people shaping the future of
            Quantum × AI — from breakthrough hardware to production-ready
            applications.
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

          {/* Overview */}
          <section className="space-y-4 rounded-lg border border-gray-200 bg-[#f9fafb] p-6 md:p-8">
            <h2 className="text-xl font-semibold text-gray-900">
              About the Showcase
            </h2>
            <p className="text-gray-800 leading-relaxed text-sm md:text-base">
              The IntelligenceX 2026 Showcase brings together leading
              organisations and technologists to present the projects that are
              moving quantum computing and AI from the lab into industry. Each
              showcase highlights a real platform, application, or research
              direction — with time for questions and direct engagement with
              the presenters.
            </p>
          </section>

          {/* Showcase projects */}
          <div className="space-y-10">
            {showcases.map((showcase, index) => (
              <section
                key={showcase.id}
                className="rounded-xl border border-[#cddcf0] bg-[#f4f8ff] p-6 md:p-10 scroll-mt-28 space-y-8"
              >
                {/* Organization header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ee7c01]">
                    Showcase {index + 1}
                  </p>
                  {showcase.organizationLogo ? (
                    <img
                      src={showcase.organizationLogo}
                      alt={`${showcase.organization} logo`}
                      className="h-10 w-auto object-contain"
                      loading="lazy"
                    />
                  ) : (
                    <p className="text-sm font-semibold text-[#003d7b]">
                      {showcase.organization}
                    </p>
                  )}
                </div>

                {/* Title & abstract */}
                <div className="space-y-4">
                  <h2 className="text-2xl md:text-[1.7rem] font-semibold leading-snug text-gray-900">
                    {showcase.title}
                  </h2>
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-[#003d7b]">
                      Abstract
                    </h3>
                    <p className="text-gray-800 leading-relaxed text-sm md:text-base">
                      {showcase.abstract}
                    </p>
                  </div>
                </div>

                {/* Presenter */}
                <div className="space-y-4 border-t border-[#cddcf0] pt-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-[#003d7b]">
                    Presenter
                  </h3>
                  <div className="flex flex-col gap-5 md:flex-row md:items-start">
                    <img
                      src={showcase.presenter.photo}
                      alt={showcase.presenter.name}
                      className="h-48 w-48 shrink-0 rounded-lg object-cover shadow-sm"
                      loading="lazy"
                    />
                    <div className="space-y-2">
                      <p className="text-xl font-semibold text-gray-900">
                        {showcase.presenter.name}
                      </p>
                      <p className="text-sm font-medium text-[#003d7b]">
                        {showcase.presenter.title}
                        {showcase.presenter.affiliation &&
                          ` · ${showcase.presenter.affiliation}`}
                      </p>
                      <p className="text-gray-800 leading-relaxed text-sm md:text-base">
                        {showcase.presenter.bio}
                      </p>
                      {showcase.presenter.linkedin && (
                        <a
                          href={showcase.presenter.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#003d7b] hover:underline"
                        >
                          LinkedIn →
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
