import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPrice, getActiveTier, intelligenceX2026Prices } from "@/data/prices";
import { createCheckoutSession, registerMember } from "@/lib/api";
import { unMemberCountries } from "@/data/countries";

export default function IntelligenceX2026Registration() {
  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [email, setEmail] = useState("");
  const [personalWebpage, setPersonalWebpage] = useState("");
  const [membershipStatus, setMembershipStatus] = useState<"existing" | "join" | "isi" | "nusqic" | "nonmember" | "">("");
  const [soaiMemberId, setSoaiMemberId] = useState("");
  // Note: ISI member ID is not currently validated against ISI records, but we collect it for reporting purposes and may reach out to users to verify their ISI membership status if needed.
  const [isiMemberId, setIsiMemberId] = useState("");
  const [nusQicMemberId, setNusQicMemberId] = useState("");
  const [handsOnTutorialPref, setHandsOnTutorialPref] = useState<
    "" | "quantum" | "ai_coding" | "na"
  >("");
  const [formError, setFormError] = useState<string | null>(null);

  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [isBusy, setIsBusy] = useState(false);

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

  const validateForm = () => {
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
    if (membershipStatus === "nusqic" && !nusQicMemberId.trim()) {
      setFormError("Please enter your NUS Quantum Innovation Centre member ID.");
      return false;
    }
    setFormError(null);
    return true;
  };

  const handleStartRegistration = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!validateForm()) return;

    // If user opts to join SoAI, create a membership record first
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
        setFormError(err?.message || "We could not register your SoAI membership. Please try again.");
        return;
      }
    }

    const isMember = membershipStatus === "existing" || membershipStatus === "join" || membershipStatus === "isi" || membershipStatus === "nusqic";
    await startCheckout(isMember);
  };

  const startCheckout = async (isMember: boolean) => {
    const tier = getActiveTier();
    const option = isMember ? tier.member : tier.nonMember;
    if (!option.priceId) {
      setCheckoutError("Registration is not available right now.");
      return;
    }
    setIsBusy(true);
    setCheckoutError(null);
    try {
      const successUrl = `${window.location.origin}/payment-success?event=IntelligenceX%202026`;
      const cancelUrl = `${window.location.origin}/events/intelligencex-2026/register?checkout=cancel`;
      const fullName = [firstName, middleName, lastName].filter(Boolean).join(" ");
      const { url } = await createCheckoutSession({
        priceId: option.priceId,
        successUrl,
        cancelUrl,
        allowPromotionCodes: true,
        customerEmail: email.trim(),
        country: country.trim(),
        metadata: {
          event: "IntelligenceX 2026",
          tier: tier.label,
          member: isMember ? "yes" : "no",
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
          ...(membershipStatus === "existing" && soaiMemberId.trim()
            ? { soai_member_id: soaiMemberId.trim() }
            : {}),
          ...(membershipStatus === "isi" && isiMemberId.trim()
            ? { isi_member_id: isiMemberId.trim() }
            : {}),
          ...(membershipStatus === "nusqic" && nusQicMemberId.trim()
            ? { nusqic_member_id: nusQicMemberId.trim() }
            : {}),
          ...(handsOnTutorialPref
            ? { hands_on_tutorial_preference: handsOnTutorialPref }
            : {}),
        },
      });
      window.location.assign(url);
    } catch (error) {
      console.error("[checkout] failed:", error);
      setCheckoutError("Unable to start checkout. Please try again later.");
      setIsBusy(false);
    }
  };

  const countriesOrdered = useMemo(() => {
    return [...unMemberCountries, "Other"];
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-5xl space-y-10">
          <div>
            <Link to="/events/intelligencex-2026" className="text-sm text-[#003d7b] hover:underline">
              ← Back to Event
            </Link>
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Participant Registration</h1>
            <p className="text-gray-600">
              Please provide your details before proceeding to payment.
            </p>
          </div>

          <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Attendee Information</h2>
            {formError && <p className="text-sm text-red-600 mb-4">{formError}</p>}
            <form onSubmit={handleStartRegistration} className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <option value="" disabled>Title</option>
                    <option value="Dr.">Dr.</option>
                    <option value="Prof.">Prof.</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Mx.">Mx.</option>
                    <option value="Other">Other</option>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Middle name</label>
                  <input
                    type="text"
                    value={middleName}
                    onChange={(e) => setMiddleName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#ee7c01] focus:border-[#ee7c01]"
                  />
                </div>
              </div>

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
                  <option value="" disabled>Country/Region</option>
                  {countriesOrdered.map((c) => (
                    <option key={c} value={c}>{c}</option>
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

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Membership Status <span className="text-red-600">*</span>
                </label>
                <p className="text-sm text-gray-600 mb-3">Please indicate your status:</p>
                <div className="space-y-3 text-sm text-gray-700">
                  {/* Existing SoAI member */}
                  <div>
                    <label className="flex items-start gap-2">
                      <input
                        type="radio"
                        name="soai-membership"
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
                          SoAI member ID{" "}
                          <span className="font-normal text-gray-500">(optional)</span>
                        </label>
                        <input
                          type="text"
                          value={soaiMemberId}
                          onChange={(e) => setSoaiMemberId(e.target.value)}
                          placeholder="Enter your SoAI member ID"
                          className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md focus:ring-[#ee7c01] focus:border-[#ee7c01]"
                        />
                      </div>
                    )}
                  </div>

                  {/* Join SoAI */}
                  <label className="flex items-start gap-2">
                    <input
                      type="radio"
                      name="soai-membership"
                      value="join"
                      checked={membershipStatus === "join"}
                      onChange={() => setMembershipStatus("join")}
                      className="mt-1"
                    />
                    <span>I consent to join SoAI as a member (free membership).</span>
                  </label>

                  {/* ISI member */}
                  <div>
                    <label className="flex items-start gap-2">
                      <input
                        type="radio"
                        name="soai-membership"
                        value="isi"
                        checked={membershipStatus === "isi"}
                        onChange={() => setMembershipStatus("isi")}
                        className="mt-1"
                      />
                      <span>I am an ISI member.</span>
                    </label>
                    {membershipStatus === "isi" && (
                      <div className="mt-2 ml-6">
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

                  {/* NUS QIC member */}
                  <div>
                    <label className="flex items-start gap-2">
                      <input
                        type="radio"
                        name="soai-membership"
                        value="nusqic"
                        checked={membershipStatus === "nusqic"}
                        onChange={() => setMembershipStatus("nusqic")}
                        className="mt-1"
                      />
                      <span>I am a NUS Quantum Innovation Centre member.</span>
                    </label>
                    {membershipStatus === "nusqic" && (
                      <div className="mt-2 ml-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          NUS QIC member ID <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          value={nusQicMemberId}
                          onChange={(e) => setNusQicMemberId(e.target.value)}
                          placeholder="Enter your NUS Member Affiliation ID"
                          className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md focus:ring-[#ee7c01] focus:border-[#ee7c01]"
                        />
                      </div>
                    )}
                  </div>

                  {/* Non-member */}
                  <label className="flex items-start gap-2">
                    <input
                      type="radio"
                      name="soai-membership"
                      value="nonmember"
                      checked={membershipStatus === "nonmember"}
                      onChange={() => setMembershipStatus("nonmember")}
                      className="mt-1"
                    />
                    <span>I do not wish to join SoAI and will attend the conference as a non-SoAI member.</span>
                  </label>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Personal webpage</label>
                <input
                  type="url"
                  value={personalWebpage}
                  onChange={(e) => setPersonalWebpage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#ee7c01] focus:border-[#ee7c01]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hands-on tutorial preference <span className="font-normal text-gray-500">(Seats limited !)</span>
                </label>
                <select
                  value={handsOnTutorialPref}
                  onChange={(e) =>
                    setHandsOnTutorialPref(
                      e.target.value as "" | "quantum" | "ai_coding" | "na",
                    )
                  }
                  className="w-full max-w-xl px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-[#ee7c01] focus:border-[#ee7c01]"
                >
                  
                  <option value="quantum">Quantum Computing — Vishal Bajpe (IBM Quantum)</option>
                  <option value="ai_coding">Agentic Coding — Prof. Dr. Thorsten Koch (TU Berlin &amp; ZIB)</option>
                  <option value="na">No preference / Not attending tutorial</option>
                </select>
                <p className="mt-2 text-xs text-gray-600 leading-relaxed max-w-3xl">
                  While we will do our best to accommodate preferences, we cannot guarantee placement in your selected
                  tutorial due to capacity constraints. Participants who are not allocated a seat will be provided
                  access to a live broadcast of the selected hands-on sessions.
                </p>
              </div>

              <div className="md:col-span-2">
                <Button type="submit" disabled={isBusy}>
                  {isBusy ? "Processing..." : "Register"}
                </Button>
              </div>
              <p className="md:col-span-2 text-xs text-gray-500 leading-relaxed">
                By registering, you consent to the collection and processing of your personal data for conference
                administration, organisation, and statistical reporting, in accordance with applicable data protection
                laws (including the GDPR), and to the use of photographs and video recordings taken during the event for
                official conference communications and reports.
              </p>
              <p className="md:col-span-2 text-xs text-gray-500 leading-relaxed">
                This registration is subject to the Personal Data Protection Act 2012 (Singapore). Personal data
                collected in connection with this registration will be processed in accordance with the Privacy
                Policy. The Client warrants it has obtained all necessary consents from its delegates for the
                Society to process their personal data for the purposes of this registration.
              </p>
            </form>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Registration</h2>
            <div className="text-gray-700 text-sm md:text-base max-w-2xl space-y-2">
              <p>Registration fees include full access to the main conference (24–26 September 2026).</p>
              <p>
                Participants who complete their Early Bird registration by{" "}
                <strong>15 August 2026</strong> are entitled to one complimentary conference banquet ticket.
              </p>
              <p>
                For registrations received after 15 August 2026, the conference banquet is{" "}
                <strong>not</strong> included. Participants who wish to attend the banquet may purchase
                a ticket at their own expense, subject to availability. Banquet seats cannot be
                guaranteed after the Early Bird registration deadline.
              </p>
              <p>Thank you for your kind understanding.</p>
            </div>
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
                  {intelligenceX2026Prices.map((tier) => (
                    <TableRow key={tier.key} className="border-gray-100">
                      <TableCell className="px-4 py-3.5 text-gray-800">
                        <span className="font-medium">{tier.label}</span>
                        {tier.deadline && (
                          <span className="block text-sm text-gray-500 mt-0.5">
                            {tier.deadline}
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="px-4 py-3.5 text-right font-medium text-gray-900">
                        {formatPrice(tier.member)}
                      </TableCell>
                      <TableCell className="px-4 py-3.5 text-right font-medium text-gray-900">
                        {formatPrice(tier.nonMember)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableCaption className="px-4 pb-3 text-left text-sm text-gray-500">
                  All prices shown in SGD.
                </TableCaption>
              </Table>
            </div>
          </section>
        </div>
      </section>

      {checkoutError && (
        <div className="px-6 pb-8">
          <p className="text-sm text-red-600">{checkoutError}</p>
        </div>
      )}
    </div>
  );
}
