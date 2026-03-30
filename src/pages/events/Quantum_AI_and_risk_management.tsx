import { useState } from "react";
import { Link } from "react-router-dom";
import paviaLogo from "@/assets/quantum_ai_and_risk_management/UNIVERSITA_DI_PAVIA_Logo.png";
import slidesYingChen from "@/assets/quantum_ai_and_risk_management/Algorithmic Intelligence in the Quantum-AI Era.pdf";
import slidesThorstenKoch from "@/assets/quantum_ai_and_risk_management/Algorithmic Intelligence.pdf";
import slidesPasqal from "@/assets/quantum_ai_and_risk_management/Quantum computing at Pasqal, and its application to the financial sector.pdf";
import slidesFinancialStability from "@/assets/quantum_ai_and_risk_management/Quantum Computing, Deep Learning and Financial Stability in Good Times.pdf";
import slidesSafeQml from "@/assets/quantum_ai_and_risk_management/SAFE Quantum Machine Learning with Variational Quantum Classifiers.pdf";
import slidesCreditScoring from "@/assets/quantum_ai_and_risk_management/Quantum support vector machines for credit scoring.pdf";
import slidesSoftQuantumKernels from "@/assets/quantum_ai_and_risk_management/Soft Quantum Kernels for Workforce Risk Analytics.pdf";
import { verifyMember } from "@/lib/api";

const soaiLogoUrl = `${import.meta.env.BASE_URL}SoAI_logo.png`;

const VERIFIED_MEMBER_ID_KEY = "soai_verified_member_id";

function downloadPdf(href: string) {
  const link = document.createElement("a");
  link.href = href;
  const fileName = href.split("/").pop()?.split("?")[0];
  link.download = fileName || "slides.pdf";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function SlideDownload({ href, label = "Download slides (PDF)" }: { href: string; label?: string }) {
  const [open, setOpen] = useState(false);
  const [memberId, setMemberId] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onVerifyAndDownload() {
    setBusy(true);
    setError(null);

    try {
      const id = memberId.trim();
      if (!id) {
        setError("Please enter your SoAI member ID.");
        return;
      }

      const res = await verifyMember({ member_id: id });
      if (res?.ok) {
        sessionStorage.setItem(VERIFIED_MEMBER_ID_KEY, id);
        setOpen(false);
        downloadPdf(href);
        return;
      }

      setError("Member ID not found. Please register as a SoAI member first.");
    } catch {
      setError("Unable to verify your member ID right now. Please try again later.");
    } finally {
      setBusy(false);
    }
  }

  function onClickDownload() {
    const verifiedId = sessionStorage.getItem(VERIFIED_MEMBER_ID_KEY);
    if (verifiedId) {
      downloadPdf(href);
      return;
    }
    setOpen(true);
    setError(null);
    setMemberId("");
  }

  return (
    <>
      <button
        type="button"
        onClick={onClickDownload}
        className="text-[#003d7b] font-medium hover:underline whitespace-nowrap"
      >
        {label}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-md rounded-lg bg-white shadow-lg p-5">
            <div className="mb-2">
              <h3 className="text-lg font-semibold text-gray-900">Verify your SoAI member ID</h3>
              <p className="text-sm text-gray-700 leading-relaxed mt-1">
                For slide downloads, please enter your SoAI member ID. If you’re not a member yet, you can register first.
              </p>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">SoAI member ID</label>
              <input
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
                placeholder="e.g., 12345"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-[#003d7b] focus:border-[#003d7b]"
                inputMode="text"
              />
            </div>

            {error && <p className="text-sm text-red-600 mt-3">{error}</p>}

            <div className="flex items-center justify-between gap-3 mt-5">
              <Link
                to="/membership"
                className="text-sm text-[#003d7b] hover:underline whitespace-nowrap"
                onClick={() => setOpen(false)}
              >
                Register as a member
              </Link>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-800 hover:bg-gray-50"
                  onClick={() => setOpen(false)}
                  disabled={busy}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="rounded-md bg-[#003d7b] px-3 py-2 text-sm font-semibold text-white hover:bg-[#002a5c] disabled:opacity-60"
                  onClick={onVerifyAndDownload}
                  disabled={busy}
                >
                  {busy ? "Verifying…" : "Verify & download"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const REG_IN_PERSON =
  "https://www.segreteria-aifirm.it/Eventi/regForm?TID=103";
const REG_ONLINE = "https://www.segreteria-aifirm.it/Eventi/regForm?TID=102";

export default function QuantumAIAndRiskManagement() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative py-16 md:py-20 bg-gray-900 overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#003d7b] via-[#003d7b]/95 to-gray-900"
          aria-hidden
        />
        <div className="relative container mx-auto px-6 max-w-5xl">
          <p className="text-sm font-semibold text-[#ffcf8c] mb-2 uppercase tracking-wide">
            SoAI-supported event · 2026
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Quantum AI and risk management
          </h1>
          <p className="text-white/90 max-w-3xl text-lg leading-relaxed">
            A half-day hybrid workshop bringing together quantum research and practical applications
            for risk analytics, financial stability, and intelligent systems—with sessions chaired by
            leading academics from the University of Pavia, NUS, and AIFIRM.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-6 max-w-5xl space-y-10">
          {/* Registration CTAs */}
          <section className="flex flex-col sm:flex-row flex-wrap gap-3">
            <a
              href={REG_IN_PERSON}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#ee7c01] px-6 py-2.5 text-base font-semibold text-white shadow-md transition hover:bg-[#d66900] hover:shadow-lg"
            >
              Register — in person
            </a>
            <a
              href={REG_ONLINE}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-[#ee7c01] bg-white px-6 py-2.5 text-base font-semibold text-[#ee7c01] shadow-sm transition hover:bg-[#fff3e6]"
            >
              Register — online
            </a>
          </section>

          {/* Event information */}
          <section className="border-l-4 border-[#ee7c01] pl-5 py-2 bg-[#f9fafb]">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Event information</h2>
            <dl className="grid gap-3 text-sm md:text-base text-gray-800">
              <div>
                <dt className="font-medium">Date &amp; time</dt>
                <dd>27 March 2026 · 10:00–13:00 (hybrid)</dd>
              </div>
              <div>
                <dt className="font-medium">Venue (in person)</dt>
                <dd>
                  University of Pavia — Common Room, Department of Economics, Via San Felice 7,
                  27100 Pavia, Italy
                </dd>
              </div>
              <div>
                <dt className="font-medium">Participation</dt>
                <dd>Free of charge; advance registration is required.</dd>
              </div>
            </dl>
          </section>

          {/* Programme */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Programme</h2>
            <p className="text-gray-700 text-sm md:text-base">
              <span className="font-semibold">9:30</span> — Registration and welcome
            </p>
            <p className="text-gray-700 text-sm md:text-base">
              <span className="font-semibold">10:00–11:30</span> —{" "}
              <span className="font-semibold">Session I: Quantum research</span>
            </p>
            <p className="text-gray-800 leading-relaxed text-sm md:text-base">
              Chair: Paolo Giudici (University of Pavia and AIFIRM)
            </p>
            <ul className="list-disc pl-6 space-y-3 text-gray-800 leading-relaxed text-sm md:text-base">
              <li>
                <span className="font-medium">
                  Algorithmic Intelligence in the Quantum-AI Era: Making Smart Decision for Complex
                  Systems
                </span>{" "}
                — Ying Chen (National University of Singapore).{" "}
                <SlideDownload href={slidesYingChen} />
              </li>
              <li>
                <span className="font-medium">
                  Algorithmic Intelligence: Mathematical Optimization from Linear Programming to
                  Quantum Computing
                </span>{" "}
                — Thorsten Koch (Zuse Institute Berlin and Technical University of Berlin).{" "}
                <SlideDownload href={slidesThorstenKoch} />
              </li>
              <li>
                <span className="font-medium">
                  Soft Quantum Kernels for Workforce Risk Analytics: Convergence Guarantees and
                  Operational Cost Analysis
                </span>{" "}
                — Massimiliano Ferrara (University Mediterranea of Reggio Calabria &amp; Bocconi
                University). <SlideDownload href={slidesSoftQuantumKernels} />
              </li>
              <li>
                <span className="font-medium">
                  Quantum computing at Pasqal, and its application to the financial sector
                </span>{" "}
                — Elisabeth Eude (Pasqal, Paris). <SlideDownload href={slidesPasqal} />
              </li>
              <li>Q&amp;A</li>
            </ul>
            <p className="text-gray-700 text-sm md:text-base">
              <span className="font-semibold">11:30–12:00</span> — Coffee break
            </p>
            <p className="text-gray-700 text-sm md:text-base">
              <span className="font-semibold">12:00–13:00</span> —{" "}
              <span className="font-semibold">Session II: Quantum applications</span>
            </p>
            <p className="text-gray-800 leading-relaxed text-sm md:text-base">
              Chair: Ying Chen (National University of Singapore and Society of Algorithmic
              Intelligence)
            </p>
            <ul className="list-disc pl-6 space-y-3 text-gray-800 leading-relaxed text-sm md:text-base">
              <li>
                <span className="font-medium">
                  Quantum Computing, Deep Learning and Financial Stability in Good Times
                </span>{" "}
                — Alexie Alupoaiei (National Bank of Romania).{" "}
                <SlideDownload href={slidesFinancialStability} />
              </li>
              <li>
                <span className="font-medium">Quantum support vector machines for credit scoring</span>{" "}
                — Mattia Bacigalupo (AXPO Italia Spa) &amp; Pier Giuseppe Giribone (Gruppo BPER,
                University of Genoa).{" "}
                <SlideDownload href={slidesCreditScoring} />
              </li>
              <li>
                <span className="font-medium">
                  SAFE Quantum Machine Learning with Variational Quantum Classifiers
                </span>{" "}
                — Paolo Giudici and Vasily Kolesnikov (University of Pavia).{" "}
                <SlideDownload href={slidesSafeQml} />
              </li>
              <li>Q&amp;A</li>
            </ul>
          </section>

          {/* Registration */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Registration</h2>
            <p className="text-gray-800 leading-relaxed text-sm md:text-base">
              Please complete the appropriate form ahead of the event. Separate links are provided
              for on-site attendance and remote participation.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-800 text-sm md:text-base">
              <li>
                <a
                  href={REG_IN_PERSON}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#003d7b] font-medium hover:underline"
                >
                  In-person participation
                </a>
              </li>
              <li>
                <a
                  href={REG_ONLINE}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#003d7b] font-medium hover:underline"
                >
                  Online participation
                </a>
              </li>
            </ul>
          </section>

          {/* AIFIRM credits */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Professional development</h2>
            <p className="text-gray-800 leading-relaxed text-sm md:text-base">
              AIFIRM member participants may be awarded{" "}
              <span className="font-medium">8 training credits</span>, subject to AIFIRM
              accreditation requirements.
            </p>
          </section>

          {/* Host & partner logos */}
          <section className="pt-8">
            <div className="grid gap-10 md:grid-cols-2 items-center">
              <div className="flex flex-col items-center md:items-start gap-3">
                <p className="text-sm md:text-base font-semibold text-gray-700 uppercase tracking-wide">
                  Held at:
                </p>
                <a
                  href="https://www.unipv.it/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Università di Pavia"
                >
                  <img
                    src={paviaLogo}
                    alt="Università di Pavia"
                    className="h-50 md:h-50 w-auto object-contain"
                    loading="lazy"
                  />
                </a>
              </div>
              <div className="flex flex-col items-center md:items-start gap-3">
                <p className="text-sm md:text-base font-semibold text-gray-700 uppercase tracking-wide">
                  Supported by:
                </p>
                <Link to="/" aria-label="Society of Algorithmic Intelligence">
                  <img
                    src={soaiLogoUrl}
                    alt="Society of Algorithmic Intelligence"
                    className="h-50 md:h-50 w-auto object-contain"
                    loading="lazy"
                  />
                </Link>
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
