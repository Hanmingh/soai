import { useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { membershipTypes } from "@/data/membership";
import { useState } from "react";

export default function MembershipCheckout() {
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const planName = params.get("plan") || "Regular Member";

  const plan = useMemo(() => {
    return membershipTypes.find((p) => p.name === planName) || membershipTypes[0];
  }, [planName]);

  const promoEndDisplay = "Jun 30, 2026";
  const isPromoActive = new Date() <= new Date("2026-06-30T23:59:59.999Z");
  const promoEligibleNames = new Set(["Regular Member", "Developing Countries", "Student Member"]);
  const isEligible = isPromoActive && promoEligibleNames.has(plan.name);

  return (
    <div className="min-h-screen bg-white">
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="mb-6">
            <Link to="/membership" className="text-sm text-[#003d7b] hover:underline">← Back to Membership</Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600 mb-8">Complete your payment to join as a {plan.name.toLowerCase()}.</p>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>Confirm your selected plan</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2 text-sm">
                  <div className="flex items-center justify-between"><span>Plan</span><span>{plan.name}</span></div>
                  <div className="flex items-center justify-between"><span>Billing</span><span>{isEligible ? '/ month (trial)' : (plan.period || 'one-time')}</span></div>
                </div>
                <div className="border-t pt-4 flex items-center justify-between font-semibold">
                  <span>Total</span>
                  <span className="flex items-center gap-2">
                    {isEligible && (
                      <span className="text-gray-400 line-through">{plan.price}</span>
                    )}
                    {isEligible ? 'SGD 0' : plan.price}
                  </span>
                </div>
                {isEligible && (
                  <div className="text-xs text-green-700">
                    Free trial until {promoEndDisplay}. Then {plan.price}
                    <span className="text-gray-500">{plan.period}</span>.
                  </div>
                )}
                <Button asChild className="w-full bg-[#003d7b] hover:bg-[#002a5c]">
                  <Link to={`/membership/register?plan=${encodeURIComponent(plan.name)}`}>Proceed to Payment</Link>
                </Button>
                <p className="text-xs text-gray-500 text-center">By continuing, you agree to the <button type="button" onClick={() => setIsDisclaimerOpen(true)} className="underline text-[#003d7b]">privacy disclaimer</button>.</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>What happens next?</CardTitle>
                <CardDescription>Payment and activation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-gray-700">
                <p>1. You will be redirected to our secure payment provider.</p>
                <p>2. Upon success, you will receive a confirmation email.</p>
                <p>3. Your member ID will be generated and emailed to you.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Registration moved to dedicated page */}

      {isDisclaimerOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60" onClick={() => setIsDisclaimerOpen(false)} />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-3xl rounded-lg shadow-2xl overflow-hidden">
              <div className="px-6 py-4 border-b flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Privacy Disclaimer for Membership Registration</h2>
                <button className="text-gray-500 hover:text-gray-700" onClick={() => setIsDisclaimerOpen(false)} aria-label="Close">✕</button>
              </div>
              <div className="px-6 py-5 max-h-[70vh] overflow-y-auto text-gray-700">
                <p className="mb-4">
                  By registering for membership, you acknowledge and agree that your personal data will be collected, used, and stored for the purposes of processing your membership application, managing your membership, communicating with you regarding society activities, and fulfilling any related legal or regulatory obligations.
                </p>
                <p className="mb-4">
                  We are committed to protecting your personal data in accordance with applicable data protection laws, including the Singapore Personal Data Protection Act (PDPA).
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-semibold">Data Collected:</span> Information provided in your registration form, including your name, contact details, institutional affiliation, and any other information necessary for membership administration.
                  </li>
                  <li>
                    <span className="font-semibold">Use of Data:</span> Your data will be used strictly for membership management, communication (including newsletters, event invitations, and administrative notices), and statistical or reporting purposes in anonymized form.
                  </li>
                  <li>
                    <span className="font-semibold">Data Sharing:</span> We do not sell your data. Your information may be shared only with trusted service providers or partners as required to administer membership benefits, and only under appropriate confidentiality and data protection safeguards.
                  </li>
                  <li>
                    <span className="font-semibold">Data Retention:</span> Your personal data will be retained only for as long as necessary to fulfil the purposes stated above, or as required by law.
                  </li>
                  <li>
                    <span className="font-semibold">Your Rights:</span> You have the right to request access to, correction of, or deletion of your personal data, and to withdraw your consent to the use of your data at any time, subject to applicable legal and contractual restrictions.
                  </li>
                  <li>
                    <span className="font-semibold">Contact:</span> For any questions or to exercise your rights, please contact us at <a href="mailto:info@soc-ai.org" className="text-[#003d7b] underline">info@soc-ai.org</a>.
                  </li>
                </ul>
                <p className="mt-4">
                  By submitting your registration, you confirm that you have read and understood this Privacy Disclaimer and consent to the collection, use, and disclosure of your personal data as described above.
                </p>
              </div>
              <div className="px-6 py-4 border-t bg-gray-50 text-right">
                <button className="px-4 py-2 text-sm rounded bg-[#003d7b] text-white hover:bg-[#002a5c]" onClick={() => setIsDisclaimerOpen(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


