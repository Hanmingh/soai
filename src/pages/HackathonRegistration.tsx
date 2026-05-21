import { useMemo, useState, useEffect } from "react";
import type { FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { hackathonPrices } from "@/data/prices";
import { createCheckoutSession, registerMember } from "@/lib/api";
import { unMemberCountries } from "@/data/countries";
const soaiLogo = "/SoAI_logo.svg";

// ─── Types ────────────────────────────────────────────────────────────────────
type RegistrationType = "individual" | "team";
type MembershipStatus = "existing" | "join" | "isi" | "nonmember" | "";

// ─── Component ────────────────────────────────────────────────────────────────
export default function HackathonRegistration() {
  const [searchParams] = useSearchParams();

  // Registration type
  const [regType, setRegType] = useState<RegistrationType>("individual");

  // Personal info
  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [email, setEmail] = useState("");
  const [personalWebpage, setPersonalWebpage] = useState("");
  const [membershipStatus, setMembershipStatus] = useState<MembershipStatus>("");
  const [isiMemberId, setIsiMemberId] = useState("");

  // Team-only fields
  const [teamName, setTeamName] = useState("");
  const [teamSize, setTeamSize] = useState<number>(2);
  const [teamNonMemberCount, setTeamNonMemberCount] = useState<number>(1);

  // Pre-select membership from URL param ?m=member|nonmember
  useEffect(() => {
    const m = searchParams.get("m");
    if (m === "member") setMembershipStatus("existing");
    else if (m === "nonmember") setMembershipStatus("nonmember");
  }, [searchParams]);

  // UI state
  const [formError, setFormError] = useState<string | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [isBusy, setIsBusy] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);

  // ─── Derived ──────────────────────────────────────────────────────────────
  const isMember =
    membershipStatus === "existing" ||
    membershipStatus === "join" ||
    membershipStatus === "isi";

  // For individual: free if member, $100 if non-member
  // For team: $100 per non-member in the team
  const totalAmount = useMemo(() => {
    if (regType === "individual") {
      return isMember ? 0 : hackathonPrices.nonMember.amount;
    }
    // Team: non-member count × $100
    return teamNonMemberCount * hackathonPrices.nonMember.amount;
  }, [regType, isMember, teamNonMemberCount]);

  const countriesOrdered = useMemo(() => [...unMemberCountries, "Other"], []);

  // ─── Validation ───────────────────────────────────────────────────────────
  function isValidUrlLike(input: string): boolean {
    const v = input.trim();
    if (!v) return false;
    try {
      const url = new URL(v.match(/^https?:\/\//) ? v : `https://${v}`);
      return Boolean(url.hostname);
    } catch {
      return false;
    }
  }

  const validateForm = (): boolean => {
    if (
      !title.trim() ||
      !firstName.trim() ||
      !lastName.trim() ||
      !country.trim() ||
      !affiliation.trim() ||
      !email.trim() ||
      !membershipStatus
    ) {
      setFormError("Please complete all required fields before continuing.");
      return false;
    }
    if (personalWebpage.trim() && !isValidUrlLike(personalWebpage)) {
      setFormError("Please enter a valid personal webpage URL.");
      return false;
    }
    if (membershipStatus === "isi" && !isiMemberId.trim()) {
      setFormError("Please enter your ISI member ID.");
      return false;
    }
    if (regType === "team") {
      if (!teamName.trim()) {
        setFormError("Please enter your team name.");
        return false;
      }
      if (teamSize < 2 || teamSize > 10) {
        setFormError("Team size must be between 2 and 10.");
        return false;
      }
      if (teamNonMemberCount < 0 || teamNonMemberCount > teamSize) {
        setFormError("Number of non-members cannot exceed team size.");
        return false;
      }
    }
    setFormError(null);
    return true;
  };

  // ─── Submit ───────────────────────────────────────────────────────────────
  const handleSubmit = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!validateForm()) return;

    // Optionally register as SoAI member
    if (membershipStatus === "join") {
      try {
        await registerMember({
          email: email.trim(),
          first_name: firstName.trim(),
          middle_name: middleName.trim() || undefined,
          last_name: lastName.trim(),
          country: country.trim(),
          affiliation: affiliation.trim(),
          title: title.trim(),
          personal_webpage: personalWebpage.trim() || undefined,
          plan: "Regular Member",
        });
      } catch (err: any) {
        setFormError(
          err?.message ||
            "We could not register your SoAI membership. Please try again."
        );
        return;
      }
    }

    // If total is $0 (free), mark complete without Stripe
    if (totalAmount === 0) {
      setRegistrationComplete(true);
      return;
    }

    // Stripe checkout — priceId will be filled in when Stripe is configured
    const priceId = hackathonPrices.nonMember.priceId;
    if (!priceId) {
      setCheckoutError(
        "Payment is not yet configured. Please contact info@soc-ai.org to complete registration."
      );
      return;
    }

    setIsBusy(true);
    setCheckoutError(null);
    try {
      const fullName = [firstName, middleName, lastName].filter(Boolean).join(" ");
      const quantity =
        regType === "individual" ? 1 : teamNonMemberCount;

      const { url } = await createCheckoutSession({
        priceId,
        quantity,
        successUrl: `${window.location.origin}/payment-success?event=IntelligenceX%202026%20Hackathon`,
        cancelUrl: `${window.location.origin}/events/intelligencex-2026/hackathon-register?checkout=cancel`,
        allowPromotionCodes: true,
        customerEmail: email.trim(),
        metadata: {
          event: "IntelligenceX 2026 AI Trading Hackathon",
          registration_type: regType,
          full_name: fullName,
          first_name: firstName.trim(),
          middle_name: middleName.trim(),
          last_name: lastName.trim(),
          title: title.trim(),
          country: country.trim(),
          affiliation: affiliation.trim(),
          email: email.trim(),
          personal_webpage: personalWebpage.trim(),
          membership_status: membershipStatus,
          ...(membershipStatus === "isi" && isiMemberId.trim()
            ? { isi_member_id: isiMemberId.trim() }
            : {}),
          ...(regType === "team"
            ? {
                team_name: teamName.trim(),
                team_size: String(teamSize),
                team_non_member_count: String(teamNonMemberCount),
              }
            : {}),
        },
      });
      window.location.assign(url);
    } catch (error) {
      console.error("[hackathon-checkout] failed:", error);
      setCheckoutError("Unable to start checkout. Please try again later.");
      setIsBusy(false);
    }
  };

  // ─── Success state ────────────────────────────────────────────────────────
  if (registrationComplete) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center px-6 space-y-4">
          <img src={soaiLogo} alt="SoAI" className="h-12 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900">
            Registration Confirmed!
          </h1>
          <p className="text-gray-600 max-w-md">
            Thank you for registering for the AI Algorithmic Trading Hackathon
            at IntelligenceX 2026. As a SoAI member, your registration is
            complimentary. A confirmation will be sent to{" "}
            <span className="font-medium">{email}</span>.
          </p>
          <Link
            to="/events/intelligencex-2026"
            className="inline-block mt-4 text-sm text-[#003d7b] hover:underline"
          >
            ← Back to Event
          </Link>
        </div>
      </div>
    );
  }

  // ─── Form ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-white">
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-5xl space-y-10">

          {/* Back link */}
          <div>
            <Link
              to="/events/intelligencex-2026"
              className="text-sm text-[#003d7b] hover:underline"
            >
              ← Back to Event
            </Link>
          </div>

          {/* Header */}
          <div className="flex items-start gap-4">
            <img src={soaiLogo} alt="SoAI" className="h-10 mt-1 hidden sm:block" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                AI Trading Hackathon — Registration
              </h1>
              <p className="text-gray-600">
                IntelligenceX 2026 · AI Algorithmic Trading Hackathon
              </p>
            </div>
          </div>

          {/* Pricing summary */}
          <div className="rounded-lg border border-[#ee7c01]/40 bg-[#fff8f0] p-5">
            <h2 className="text-base font-semibold text-gray-900 mb-2">
              Registration Fees
            </h2>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>
                <span className="font-medium">SoAI members</span> (existing,
                joining, or ISI): <span className="font-semibold text-green-700">Free</span>
              </li>
              <li>
                <span className="font-medium">Non-SoAI members</span>: SGD 100
                per person
              </li>
              <li>
                <span className="font-medium">Team registration</span>: SGD 100
                per non-member in the team
              </li>
            </ul>
            {totalAmount > 0 && (
              <p className="mt-3 text-sm font-semibold text-gray-900">
                Estimated total:{" "}
                <span className="text-[#ee7c01]">SGD {totalAmount}</span>
              </p>
            )}
            {totalAmount === 0 && membershipStatus !== "" && (
              <p className="mt-3 text-sm font-semibold text-green-700">
                Your registration is complimentary as a SoAI member.
              </p>
            )}
          </div>

          {/* Registration type toggle */}
          <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Registration Type
            </h2>
            <div className="flex gap-4">
              {(["individual", "team"] as const).map((type) => (
                <label
                  key={type}
                  className={`flex-1 cursor-pointer rounded-lg border-2 p-4 transition ${
                    regType === type
                      ? "border-[#ee7c01] bg-[#fff8f0]"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="regType"
                    value={type}
                    checked={regType === type}
                    onChange={() => setRegType(type)}
                    className="sr-only"
                  />
                  <span className="font-medium capitalize text-gray-900">
                    {type === "individual" ? "Individual" : "Team / Group"}
                  </span>
                  <span className="block text-xs text-gray-500 mt-0.5">
                    {type === "individual"
                      ? "Register yourself only"
                      : "Register a team (2–10 members)"}
                  </span>
                </label>
              ))}
            </div>
          </section>

          {/* Main form */}
          <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {regType === "individual"
                ? "Registrant Information"
                : "Team Lead Information"}
            </h2>
            {formError && (
              <p className="text-sm text-red-600 mb-4">{formError}</p>
            )}

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {/* Name row */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:col-span-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-[#ee7c01] focus:border-[#ee7c01]"
                    required
                  >
                    <option value="" disabled>
                      Title
                    </option>
                    {["Dr.", "Prof.", "Mr.", "Ms.", "Mx.", "Other"].map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#ee7c01] focus:border-[#ee7c01]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#ee7c01] focus:border-[#ee7c01]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Middle name
                  </label>
                  <input
                    type="text"
                    value={middleName}
                    onChange={(e) => setMiddleName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#ee7c01] focus:border-[#ee7c01]"
                  />
                </div>
              </div>

              {/* Country + Affiliation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country/Region <span className="text-red-600">*</span>
                </label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-[#ee7c01] focus:border-[#ee7c01]"
                  required
                >
                  <option value="" disabled>
                    Country/Region
                  </option>
                  {countriesOrdered.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Affiliation <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={affiliation}
                  onChange={(e) => setAffiliation(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#ee7c01] focus:border-[#ee7c01]"
                  required
                />
              </div>

              {/* Email */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#ee7c01] focus:border-[#ee7c01]"
                  required
                />
              </div>

              {/* Personal webpage */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Personal webpage{" "}
                  <span className="font-normal text-gray-500">(optional)</span>
                </label>
                <input
                  type="url"
                  value={personalWebpage}
                  onChange={(e) => setPersonalWebpage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#ee7c01] focus:border-[#ee7c01]"
                />
              </div>

              {/* Membership status */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Membership Status <span className="text-red-600">*</span>
                </label>
                <p className="text-sm text-gray-600 mb-3">
                  SoAI members register for free.
                </p>
                <div className="space-y-2 text-sm text-gray-700">
                  <label className="flex items-start gap-2">
                    <input
                      type="radio"
                      name="membership"
                      value="existing"
                      checked={membershipStatus === "existing"}
                      onChange={() => setMembershipStatus("existing")}
                      className="mt-1"
                    />
                    <span>I am an existing SoAI member.</span>
                  </label>
                  <label className="flex items-start gap-2">
                    <input
                      type="radio"
                      name="membership"
                      value="join"
                      checked={membershipStatus === "join"}
                      onChange={() => setMembershipStatus("join")}
                      className="mt-1"
                    />
                    <span>I consent to join SoAI as a member.</span>
                  </label>
                  <label className="flex items-start gap-2">
                    <input
                      type="radio"
                      name="membership"
                      value="isi"
                      checked={membershipStatus === "isi"}
                      onChange={() => setMembershipStatus("isi")}
                      className="mt-1"
                    />
                    <span>I am an ISI member.</span>
                  </label>
                  <label className="flex items-start gap-2">
                    <input
                      type="radio"
                      name="membership"
                      value="nonmember"
                      checked={membershipStatus === "nonmember"}
                      onChange={() => setMembershipStatus("nonmember")}
                      className="mt-1"
                    />
                    <span>
                      I do not wish to join SoAI and will participate as a
                      non-member (SGD 100).
                    </span>
                  </label>
                </div>
                {membershipStatus === "isi" && (
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ISI member ID <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={isiMemberId}
                      onChange={(e) => setIsiMemberId(e.target.value)}
                      placeholder="Enter your ISI member ID"
                      className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md focus:ring-[#ee7c01] focus:border-[#ee7c01]"
                    />
                  </div>
                )}
              </div>

              {/* ── Team fields ─────────────────────────────────────────── */}
              {regType === "team" && (
                <>
                  <div className="md:col-span-2 border-t border-gray-100 pt-4">
                    <h3 className="text-base font-semibold text-gray-900 mb-3">
                      Team Details
                    </h3>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Team name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-md focus:ring-[#ee7c01] focus:border-[#ee7c01]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Total team size (2–10){" "}
                      <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="number"
                      min={2}
                      max={10}
                      value={teamSize}
                      onChange={(e) => {
                        const v = Number(e.target.value);
                        setTeamSize(v);
                        if (teamNonMemberCount > v)
                          setTeamNonMemberCount(v);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#ee7c01] focus:border-[#ee7c01]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Number of non-SoAI members in team{" "}
                      <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={teamSize}
                      value={teamNonMemberCount}
                      onChange={(e) =>
                        setTeamNonMemberCount(Number(e.target.value))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#ee7c01] focus:border-[#ee7c01]"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Each non-member: SGD 100 · SoAI members: free
                    </p>
                  </div>
                </>
              )}

              {/* Submit */}
              <div className="md:col-span-2 pt-2">
                <Button type="submit" disabled={isBusy}>
                  {isBusy
                    ? "Processing..."
                    : totalAmount === 0 && membershipStatus !== ""
                    ? "Complete Registration (Free)"
                    : `Proceed to Payment — SGD ${totalAmount}`}
                </Button>
              </div>

              {/* Consent note */}
              <p className="md:col-span-2 text-xs text-gray-500 leading-relaxed">
                By registering, you consent to the collection and processing of
                your personal data for hackathon administration and
                communications, in accordance with applicable data protection
                laws (including the GDPR). The organizers reserve the right to
                modify, suspend, or adjust the hackathon rules, evaluation
                criteria, participation requirements, or related settings at
                their discretion if deemed necessary for operational, technical,
                regulatory, or fairness considerations.
              </p>

              {checkoutError && (
                <p className="md:col-span-2 text-sm text-red-600">
                  {checkoutError}
                </p>
              )}
            </form>
          </section>
        </div>
      </section>
    </div>
  );
}
