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
  const [membershipStatus, setMembershipStatus] = useState<"existing" | "join" | "nonmember" | "">("");
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

    const isMember = membershipStatus === "existing" || membershipStatus === "join";
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
                  SoAI Membership <span className="text-red-600">*</span>
                </label>
                <p className="text-sm text-gray-600 mb-3">Please indicate your status:</p>
                <div className="space-y-2 text-sm text-gray-700">
                  <label className="flex items-start gap-2">
                    <input
                      type="radio"
                      name="soai-membership"
                      value="existing"
                      checked={membershipStatus === "existing"}
                      onChange={() => setMembershipStatus("existing")}
                      className="mt-1"
                      required
                    />
                    <span>I am an existing SoAI member.</span>
                  </label>
                  <label className="flex items-start gap-2">
                    <input
                      type="radio"
                      name="soai-membership"
                      value="join"
                      checked={membershipStatus === "join"}
                      onChange={() => setMembershipStatus("join")}
                      className="mt-1"
                      required
                    />
                    <span>I consent to join SoAI as a member.</span>
                  </label>
                  <label className="flex items-start gap-2">
                    <input
                      type="radio"
                      name="soai-membership"
                      value="nonmember"
                      checked={membershipStatus === "nonmember"}
                      onChange={() => setMembershipStatus("nonmember")}
                      className="mt-1"
                      required
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
                <Button type="submit">
                  Register
                </Button>
              </div>
              <p className="md:col-span-2 text-xs text-gray-500 leading-relaxed">
                By registering, you consent to the collection and processing of your personal data for conference
                administration, organisation, and statistical reporting, in accordance with applicable data protection
                laws (including the GDPR), and to the use of photographs and video recordings taken during the event for
                official conference communications and reports.
              </p>
            </form>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Registration</h2>
            <p className="text-gray-700 text-sm md:text-base max-w-2xl">
              Registration fees include full conference access and the conference banquet.
            </p>
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
                  All prices inclusive of GST.
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
