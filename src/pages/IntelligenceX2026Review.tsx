import { useState } from "react";
import IntelligenceX2026 from "./IntelligenceX2026";

/**
 * PRIVATE REVIEW PAGE (MOS)
 *
 * Renders the EXACT same public conference page, with only the Guest of Honour
 * profile filled in (Ms Rahayu Mahzam). Intentionally NOT linked anywhere on the
 * public site — reachable only via the obscure URL shared privately for MOS review.
 *
 * A lightweight CLIENT-SIDE password gate is applied before the page renders.
 * NOTE: this is deterrence only (the password ships inside the public JS bundle),
 * not real access control — do not rely on it for genuinely sensitive content.
 *
 * To change the password, update REVIEW_PASSWORD below and share the new value
 * with reviewers through a private channel.
 *
 * Upon approval, the public route should simply render
 * `<IntelligenceX2026 showFullGuestOfHonour />` and this draft page can be removed.
 */

const REVIEW_PASSWORD = "soai-mos-2026";
const AUTH_STORAGE_KEY = "soai_goh_review_authed";

export default function IntelligenceX2026Review() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [authed, setAuthed] = useState(
    () => sessionStorage.getItem(AUTH_STORAGE_KEY) === "1"
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password === REVIEW_PASSWORD) {
      sessionStorage.setItem(AUTH_STORAGE_KEY, "1");
      setAuthed(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (authed) {
    return <IntelligenceX2026 showFullGuestOfHonour />;
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6 py-16 bg-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-8 shadow-sm space-y-4"
      >
        <div className="text-center space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#ee7c01]">
            SoAI · Internal
          </p>
          <h1 className="text-xl font-bold text-gray-900">Restricted Review Page</h1>
          <p className="text-sm text-gray-500">
            Enter the review password to continue.
          </p>
        </div>
        <input
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            setError(false);
          }}
          placeholder="Password"
          autoFocus
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#003d7b] focus:outline-none"
        />
        {error && (
          <p className="text-sm text-red-600">Incorrect password. Please try again.</p>
        )}
        <button
          type="submit"
          className="w-full rounded-lg bg-[#003d7b] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#002a57]"
        >
          Unlock Review Page
        </button>
      </form>
    </div>
  );
}
