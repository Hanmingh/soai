import { useMemo, useState, useEffect } from "react";
import type { FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { hackathonPrices } from "@/data/prices";
import { createCheckoutSession, registerMember, registerHackathon } from "@/lib/api";
import { unMemberCountries } from "@/data/countries";
const soaiLogo = "/SoAI_logo.svg";

// ─── Types ────────────────────────────────────────────────────────────────────
type RegistrationType = "individual" | "team";
type MembershipStatus = "existing" | "join" | "nonmember" | "";

const FORM_STORAGE_KEY = "soai_hackathon_reg_draft";

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
  const [memberId, setMemberId] = useState("");

  // Team-only fields
  const [teamName, setTeamName] = useState("");
  const [teamSize, setTeamSize] = useState<number>(2);
  const [teamNonMemberCount, setTeamNonMemberCount] = useState<number>(1);
  const [teamMembers, setTeamMembers] = useState<
    { name: string; affiliation: string; email: string }[]
  >([{ name: "", affiliation: "", email: "" }]);

  // Set browser tab title + force favicon refresh for this route
  useEffect(() => {
    document.title = "AI Algorithmic Trading Hackathon — Registration | SoAI";
    const link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
    if (link) {
      const prev = link.getAttribute("href") ?? "";
      link.setAttribute("href", "");
      link.setAttribute("href", prev);
    }
    return () => {
      document.title = "Society of Algorithmic Intelligence";
    };
  }, []);

  // Restore saved form state (returning from Stripe) OR pre-select from URL param
  useEffect(() => {
    const saved = sessionStorage.getItem(FORM_STORAGE_KEY);
    if (saved) {
      try {
        const d = JSON.parse(saved);
        if (d.regType)              setRegType(d.regType);
        if (d.title)                setTitle(d.title);
        if (d.firstName)            setFirstName(d.firstName);
        if (d.middleName  != null)  setMiddleName(d.middleName);
        if (d.lastName)             setLastName(d.lastName);
        if (d.country)              setCountry(d.country);
        if (d.affiliation)          setAffiliation(d.affiliation);
        if (d.email)                setEmail(d.email);
        if (d.personalWebpage != null) setPersonalWebpage(d.personalWebpage);
        if (d.membershipStatus)     setMembershipStatus(d.membershipStatus);
        if (d.memberId    != null)  setMemberId(d.memberId);
        if (d.teamName    != null)  setTeamName(d.teamName);
        if (d.teamSize)             setTeamSize(d.teamSize);
        if (d.teamNonMemberCount != null) setTeamNonMemberCount(d.teamNonMemberCount);
        if (d.teamMembers)          setTeamMembers(d.teamMembers);
      } catch { /* ignore corrupted data */ }
      sessionStorage.removeItem(FORM_STORAGE_KEY);
      return; // skip URL-param pre-select when restoring a draft
    }
    // Pre-select membership from URL param ?m=member|nonmember
    const m = searchParams.get("m");
    if (m === "member")    setMembershipStatus("existing");
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
    membershipStatus === "join";

  // For individual: free if member, $100 if non-member
  // For team: lead fee (auto from membership status) + other non-member count × $100
  const totalAmount = useMemo(() => {
    if (regType === "individual") {
      return isMember ? 0 : hackathonPrices.nonMember.amount;
    }
    // Team lead fee + additional non-member teammates × $100
    return (!isMember ? hackathonPrices.nonMember.amount : 0) +
      teamNonMemberCount * hackathonPrices.nonMember.amount;
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
    if (membershipStatus === "existing" && !memberId.trim()) {
      setFormError("Please enter your SoAI member ID.");
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
      if (teamNonMemberCount < 0 || teamNonMemberCount > teamSize - 1) {
        setFormError("Number of non-member teammates cannot exceed team size minus 1 (Team Lead not included here).");
        return false;
      }
      for (let i = 0; i < teamSize - 1; i++) {
        const m = teamMembers[i];
        if (!m?.name?.trim() || !m?.affiliation?.trim() || !m?.email?.trim()) {
          setFormError(`Please complete all required fields for Team Member ${i + 2}.`);
          return false;
        }
      }
    }
    setFormError(null);
    return true;
  };

  // ─── Submit ───────────────────────────────────────────────────────────────
  const handleSubmit = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!validateForm()) return;
    setIsBusy(true);
    setCheckoutError(null);

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
      } catch (err) {
        setFormError(
          (err instanceof Error && err.message) ||
            "We could not register your SoAI membership. Please try again."
        );
        setIsBusy(false);
        return;
      }
    }

    let hackathonRegistrationId = "";
    try {
      const registration = await registerHackathon({
        email: email.trim(),
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        middle_name: middleName.trim() || undefined,
        title: title.trim(),
        country: country.trim(),
        affiliation: affiliation.trim(),
        personal_webpage: personalWebpage.trim() || undefined,
        membership_status: membershipStatus,
        soai_member_id: membershipStatus === "existing" && memberId.trim() ? memberId.trim() : undefined,
        registration_type: regType,
        team_name: regType === "team" ? teamName.trim() : undefined,
        team_size: regType === "team" ? teamSize : undefined,
        team_non_member_count: regType === "team" ? teamNonMemberCount : undefined,
        team_members: regType === "team" ? teamMembers.slice(0, teamSize - 1) : undefined,
        amount_total: Math.round(totalAmount * 100),
        currency: "sgd",
      });
      hackathonRegistrationId = registration.registration_id;
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : "We could not save your registration. Please try again.",
      );
      setIsBusy(false);
      return;
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
      setIsBusy(false);
      return;
    }

    try {
      const fullName = [firstName, middleName, lastName].filter(Boolean).join(" ");
      const quantity =
        regType === "individual"
          ? 1
          : teamNonMemberCount + (!isMember ? 1 : 0);

      // Save form state so it can be restored if user returns from Stripe
      sessionStorage.setItem(FORM_STORAGE_KEY, JSON.stringify({
        regType, title, firstName, middleName, lastName,
        country, affiliation, email, personalWebpage,
        membershipStatus, memberId,
        teamName, teamSize, teamNonMemberCount, teamMembers,
      }));

      const { url } = await createCheckoutSession({
        priceId,
        quantity,
        ...(regType === "team" ? { amount: totalAmount } : {}),
        successUrl: `${window.location.origin}/payment-success?event=IntelligenceX%202026%20Hackathon`,
        cancelUrl: `${window.location.origin}/events/intelligencex-2026/hackathon-register?checkout=cancel`,
        allowPromotionCodes: true,
        customerEmail: email.trim(),
        metadata: {
          event: "IntelligenceX 2026 AI Trading Hackathon",
          hackathon_registration_id: hackathonRegistrationId,
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
          ...(membershipStatus === "existing" && memberId.trim()
            ? { soai_member_id: memberId.trim() }
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
              <h1 className="text-3xl font-bold text-gray-900">
                AI Algorithmic Trading Hackathon — Registration
              </h1>
            </div>
          </div>

          {/* Pricing summary */}
          <div className="rounded-lg border border-[#ee7c01]/40 bg-[#fff8f0] p-5">
            <h2 className="text-base font-semibold text-gray-900 mb-2">
              Registration Fees
            </h2>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>
                <span className="font-medium">SoAI members</span> (existing and joining): <span className="font-semibold text-green-700">Free</span>
              </li>
              <li>
                <span className="font-medium">Non-SoAI members</span>: SGD 100
                per person
              </li>
              <li>
                <span className="font-medium">Team registration</span>: SGD 100
                per non-member (Team Lead + other members counted separately)
              </li>
            </ul>
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
                  <Link
                    to="/membership/register"
                    className="text-[#003d7b] font-medium hover:underline"
                  >
                    SoAI members register for free.
                  </Link>
                </p>
                <div className="space-y-2 text-sm text-gray-700">
                  <div>
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
                    {membershipStatus === "existing" && (
                      <div className="mt-2 ml-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          SoAI Member ID <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          value={memberId}
                          onChange={(e) => setMemberId(e.target.value)}
                          placeholder="Enter your SoAI member ID"
                          className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md focus:ring-[#ee7c01] focus:border-[#ee7c01]"
                          required
                        />
                      </div>
                    )}
                  </div>
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
                        if (teamNonMemberCount > v) setTeamNonMemberCount(v);
                        // Resize teamMembers to hold additional members (v - 1)
                        setTeamMembers((prev) =>
                          Array.from({ length: Math.max(0, v - 1) }, (_, i) =>
                            prev[i] ?? { name: "", affiliation: "", email: "" }
                          )
                        );
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#ee7c01] focus:border-[#ee7c01]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Non-SoAI members among other team members{" "}
                      <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={teamSize - 1}
                      value={teamNonMemberCount}
                      onChange={(e) =>
                        setTeamNonMemberCount(Number(e.target.value))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#ee7c01] focus:border-[#ee7c01]"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Excluding Team Lead — Team Lead fee is determined by the membership status selected above.
                      Each non-member: SGD 100 · SoAI members: free
                    </p>
                  </div>

                  {/* Additional team members */}
                  {teamSize > 1 && (
                    <div className="md:col-span-2 space-y-4 border-t border-gray-100 pt-4">
                      <h3 className="text-sm font-semibold text-gray-800">
                        Additional Team Members
                      </h3>
                      {Array.from({ length: teamSize - 1 }, (_, i) => (
                        <div key={i} className="space-y-2">
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Member {i + 2}
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">
                                Name <span className="text-red-600">*</span>
                              </label>
                              <input
                                type="text"
                                value={teamMembers[i]?.name ?? ""}
                                onChange={(e) =>
                                  setTeamMembers((prev) =>
                                    prev.map((m, idx) =>
                                      idx === i
                                        ? { ...m, name: e.target.value }
                                        : m
                                    )
                                  )
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#ee7c01] focus:border-[#ee7c01] text-sm"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">
                                Affiliation <span className="text-red-600">*</span>
                              </label>
                              <input
                                type="text"
                                value={teamMembers[i]?.affiliation ?? ""}
                                onChange={(e) =>
                                  setTeamMembers((prev) =>
                                    prev.map((m, idx) =>
                                      idx === i
                                        ? { ...m, affiliation: e.target.value }
                                        : m
                                    )
                                  )
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#ee7c01] focus:border-[#ee7c01] text-sm"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">
                                Email <span className="text-red-600">*</span>
                              </label>
                              <input
                                type="email"
                                value={teamMembers[i]?.email ?? ""}
                                onChange={(e) =>
                                  setTeamMembers((prev) =>
                                    prev.map((m, idx) =>
                                      idx === i
                                        ? { ...m, email: e.target.value }
                                        : m
                                    )
                                  )
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#ee7c01] focus:border-[#ee7c01] text-sm"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
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
