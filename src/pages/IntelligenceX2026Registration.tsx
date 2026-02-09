import { useState } from "react";
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
import { createCheckoutSession, verifyMember } from "@/lib/api";

export default function IntelligenceX2026Registration() {
  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [email, setEmail] = useState("");
  const [personalWebpage, setPersonalWebpage] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogStep, setDialogStep] = useState<"member" | "nonmember">("member");
  const [memberCheckReady, setMemberCheckReady] = useState(false);
  const [memberInput, setMemberInput] = useState("");
  const [memberMatch, setMemberMatch] = useState<{ member_id: string; email: string } | null>(null);
  const [memberError, setMemberError] = useState<string | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [isBusy, setIsBusy] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

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

  const resetDialog = () => {
    setDialogStep("member");
    setMemberCheckReady(false);
    setMemberInput("");
    setMemberMatch(null);
    setMemberError(null);
    setCheckoutError(null);
    setIsBusy(false);
    setIsVerifying(false);
  };

  const openDialog = () => {
    resetDialog();
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    resetDialog();
  };

  const validateForm = () => {
    if (
      !title.trim() ||
      !firstName.trim() ||
      !middleName.trim() ||
      !lastName.trim() ||
      !affiliation.trim() ||
      !email.trim() ||
      !personalWebpage.trim()
    ) {
      setFormError("Please complete all fields before continuing.");
      return false;
    }
    if (!isValidUrlLike(personalWebpage)) {
      setFormError("Please enter a valid personal webpage URL.");
      return false;
    }
    setFormError(null);
    return true;
  };

  const handleStartRegistration = (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!validateForm()) return;
    openDialog();
  };

  const startCheckout = async (isMember: boolean, memberMeta?: { member_id?: string; email?: string }) => {
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
          affiliation: affiliation.trim(),
          email: email.trim(),
          personal_webpage: personalWebpage.trim(),
          ...(memberMeta?.member_id ? { member_id: memberMeta.member_id } : {}),
          ...(memberMeta?.email ? { member_email: memberMeta.email } : {}),
        },
      });
      window.location.assign(url);
    } catch (error) {
      console.error("[checkout] failed:", error);
      setCheckoutError("Unable to start checkout. Please try again later.");
      setIsBusy(false);
    }
  };

  const handleVerifyMember = async () => {
    const value = memberInput.trim();
    if (!value) {
      setMemberError("Please enter your member ID or email.");
      return;
    }
    setMemberError(null);
    setMemberMatch(null);
    setCheckoutError(null);
    setIsVerifying(true);
    try {
      const payload = value.includes("@") ? { email: value } : { member_id: value };
      const data = await verifyMember(payload);
      if (!data.ok || !data.member_id) {
        throw new Error("not_found");
      }
      setMemberMatch({ member_id: data.member_id, email: data.email || value });
    } catch (error: any) {
      const message =
        String(error?.message || "")
          .toLowerCase()
          .includes("not_active")
          ? "Your membership is not active."
          : "We could not verify your membership.";
      setMemberError(message);
    } finally {
      setIsVerifying(false);
    }
  };

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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title <span className="text-red-600">*</span></label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">First name <span className="text-red-600">*</span></label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#ee7c01] focus:border-[#ee7c01]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Middle name <span className="text-red-600">*</span></label>
                <input
                  type="text"
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#ee7c01] focus:border-[#ee7c01]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last name <span className="text-red-600">*</span></label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#ee7c01] focus:border-[#ee7c01]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Affiliation <span className="text-red-600">*</span></label>
                <input
                  type="text"
                  value={affiliation}
                  onChange={(e) => setAffiliation(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#ee7c01] focus:border-[#ee7c01]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-red-600">*</span></label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#ee7c01] focus:border-[#ee7c01]"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Personal webpage <span className="text-red-600">*</span></label>
                <input
                  type="url"
                  value={personalWebpage}
                  onChange={(e) => setPersonalWebpage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#ee7c01] focus:border-[#ee7c01]"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <Button type="submit" disabled className="bg-gray-300 text-gray-600 hover:bg-gray-300">
                  Continue to payment
                </Button>
              </div>
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

      {dialogOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            {dialogStep === "member" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Are you a SoAI member?</h3>
                <p className="text-sm text-gray-600">
                  We will apply the member or non-member rate automatically based on your choice.
                </p>
                {checkoutError && <p className="text-sm text-red-600">{checkoutError}</p>}
                <div className="flex flex-wrap gap-2">
                  <Button type="button" disabled={isBusy} onClick={() => setMemberCheckReady(true)}>
                    Yes, I am a member
                  </Button>
                  <Button type="button" variant="outline" disabled={isBusy} onClick={() => setDialogStep("nonmember")}>
                    No, I am not
                  </Button>
                  <Button type="button" variant="ghost" onClick={closeDialog}>
                    Cancel
                  </Button>
                </div>
                {memberCheckReady && (
                  <div className="space-y-3 rounded-md border border-gray-200 p-3">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="member-lookup">
                      Member ID or Email
                    </label>
                    <input
                      id="member-lookup"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#ee7c01] focus:outline-none"
                      placeholder="e.g. SG0001X2026000001 or name@email.com"
                      value={memberInput}
                      onChange={(event) => setMemberInput(event.target.value)}
                    />
                    {memberError && <p className="text-sm text-red-600">{memberError}</p>}
                    {memberMatch && (
                      <p className="text-sm text-emerald-600">
                        Membership verified.
                      </p>
                    )}
                    <div className="flex flex-wrap gap-2">
                      <Button type="button" variant="outline" disabled={isVerifying} onClick={handleVerifyMember}>
                        {isVerifying ? "Verifying..." : "Verify"}
                      </Button>
                      <Button
                        type="button"
                        disabled={!memberMatch || isBusy}
                        onClick={() => startCheckout(true, memberMatch || undefined)}
                      >
                        Continue to payment
                      </Button>
                    </div>
                  </div>
                )}
                <p className="text-xs text-gray-500">
                  Current tier: {getActiveTier().label} · {formatPrice(getActiveTier().member)} (member) /{" "}
                  {formatPrice(getActiveTier().nonMember)} (non-member)
                </p>
              </div>
            )}
            {dialogStep === "nonmember" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Not a member yet?</h3>
                <p className="text-sm text-gray-600">
                  You can register as a SoAI member first, or continue with a non-member ticket.
                </p>
                {checkoutError && <p className="text-sm text-red-600">{checkoutError}</p>}
                <div className="flex flex-wrap gap-2">
                  <Button asChild>
                    <Link to="/membership">Register as member</Link>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    disabled={isBusy}
                    onClick={() => startCheckout(false)}
                  >
                    Continue as non-member
                  </Button>
                  <Button type="button" variant="ghost" onClick={closeDialog}>
                    Cancel
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  Current tier: {getActiveTier().label} · {formatPrice(getActiveTier().nonMember)} (non-member)
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
