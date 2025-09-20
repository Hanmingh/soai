import { useMemo, useState, useEffect } from "react";
import type { FormEvent } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { membershipTypes } from "@/data/membership";
import { registerMember } from "@/lib/api";
import { unMemberCountries } from "@/data/countries";

export default function MembershipRegister() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const planName = params.get("plan") || "Regular Member";

  const plan = useMemo(() => {
    return membershipTypes.find((p) => p.name === planName) || membershipTypes[0];
  }, [planName]);

  useEffect(() => {
    if (plan.name === "Permanent Member") {
      navigate("/coming-soon", { replace: true });
    }
  }, [plan.name, navigate]);

  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [personalWebpage, setPersonalWebpage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const isPromoActive = new Date() <= new Date("2026-06-30T23:59:59.999Z");
  const isEligible = isPromoActive && new Set(["Regular Member", "Developing Countries", "Student Member"]).has(plan.name);

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

  async function onRegister(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      setError("Please fill in first name, last name and email.");
      return;
    }
    if (!country.trim() || !affiliation.trim() || !title.trim()) {
      setError("Country, affiliation and title are required.");
      return;
    }
    if (personalWebpage.trim() && !isValidUrlLike(personalWebpage)) {
      setError("Enter a valid URL (e.g., https://example.com).");
      return;
    }

    setSubmitting(true);
    try {
      const res = await registerMember({
        email: email.trim(),
        first_name: firstName.trim(),
        middle_name: middleName.trim() || undefined,
        last_name: lastName.trim(),
        country: country.trim(),
        affiliation: affiliation.trim(),
        title: title.trim(),
        personal_webpage: personalWebpage.trim() || undefined,
        plan: plan.name,
      });
      const msg = res?.message || (res?.success ? "Registration submitted successfully." : "Registration submitted.");
      setSuccess(msg);
      const memberId = (res as any)?.member_id;
      const qs = new URLSearchParams({ plan: plan.name, email });
      if (memberId) qs.set("member_id", String(memberId));
      navigate(`/membership/success?${qs.toString()}`);
    } catch (err: any) {
      setError(err?.message || "Registration failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const countriesOrdered = useMemo(() => {
    return [
      "Singapore",
      ...unMemberCountries.filter((c) => c !== "Singapore"),
      "Other",
    ];
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="mb-6">
            <Link to={`/membership/checkout?plan=${encodeURIComponent(plan.name)}`} className="text-sm text-[#003d7b] hover:underline">← Back to Checkout</Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Registration</h1>
          <p className="text-gray-600 mb-8">After successful payment, enter your details to activate your membership.</p>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg md:col-span-2">
              <CardHeader>
                <CardTitle>Member Information</CardTitle>
                <CardDescription>Provide your details below</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={onRegister} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Title + Names (same row on md+) */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:col-span-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title <span className="text-red-600">*</span></label>
                      <select
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-[#003d7b] focus:border-[#003d7b]"
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
                        placeholder="First name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#003d7b] focus:border-[#003d7b]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last name <span className="text-red-600">*</span></label>
                      <input
                        type="text"
                        placeholder="Last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#003d7b] focus:border-[#003d7b]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Middle name</label>
                      <input
                        type="text"
                        placeholder="Middle name"
                        value={middleName}
                        onChange={(e) => setMiddleName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#003d7b] focus:border-[#003d7b]"
                      />
                    </div>
                  </div>

                  {/* Country & Affiliation */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country <span className="text-red-600">*</span></label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-[#003d7b] focus:border-[#003d7b]"
                      required
                    >
                      <option value="" disabled>Country</option>
                      {countriesOrdered.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Affiliation <span className="text-red-600">*</span></label>
                    <input
                      type="text"
                      placeholder="Affiliation (e.g., University / Company)"
                      value={affiliation}
                      onChange={(e) => setAffiliation(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#003d7b] focus:border-[#003d7b]"
                      required
                    />
                  </div>

                  {/* Member Type (fixed) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Member type</label>
                    <input
                      type="text"
                      value={plan.name}
                      readOnly
                      aria-readonly
                      className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50 text-gray-700"
                    />
                  </div>

                  {/* Email */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-red-600">*</span></label>
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#003d7b] focus:border-[#003d7b]"
                      required
                    />
                  </div>

                  {/* Personal Webpage (optional) */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Personal Webpage</label>
                    <input
                      type="url"
                      placeholder="https://example.com"
                      value={personalWebpage}
                      onChange={(e) => setPersonalWebpage(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#003d7b] focus:border-[#003d7b]"
                    />
                  </div>

                  {error && <p className="text-sm text-red-600 md:col-span-2">{error}</p>}
                  {success && <p className="text-sm text-green-700 md:col-span-2">{success}</p>}
                  <div className="md:col-span-2">
                    <Button type="submit" disabled={submitting} className="w-full bg-[#003d7b] hover:bg-[#002a5c] disabled:opacity-60">
                      {submitting ? "Submitting…" : `Register ${isEligible ? "(Free Trial)" : ""}`}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}


