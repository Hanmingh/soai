import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, Star } from "lucide-react";
import { Link } from "react-router-dom";
import membershipBanner from "@/assets/Membership_banner.jpg";
import { membershipTypes } from "@/data/membership";

export default function Membership() {
  const promoEndDisplay = "Dec 31, 2028";
  const isPromoActive = new Date() <= new Date("2028-12-31T23:59:59.999Z");
  const promoEligibleNames = new Set(["Regular Member", "Developing Countries", "Student Member"]);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="relative py-20 bg-gray-200">
        <img src={membershipBanner} alt="" className="absolute inset-0 w-full h-full object-cover" loading="eager" fetchPriority="high" decoding="sync" />
        <div className="absolute inset-0 bg-[#003d7b]/80"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white backdrop-blur-sm">
              Join Us
            </Badge>
            <h1 className="text-4xl font-bold text-white mb-6">
              Become a Member of SoAI
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Joining the Society of Algorithmic Intelligence connects you to a vibrant international 
              community of researchers, practitioners, and industry leaders at the cutting edge of 
              advanced algorithms, artificial intelligence, and emerging technologies.
            </p>
          </div>
        </div>
      </section>

      {/* Member Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Member Benefits</h2>
            <ul className="space-y-4 text-gray-800 text-lg">
              <li><span className="font-semibold">Global Exchange:</span> Collaborate with scholars, professionals, and innovators worldwide.</li>
              <li><span className="font-semibold">Free Access to Knowledge:</span> Enjoy free access to selected SoAI lectures and a complimentary Coursera Plus subscription.</li>
              <li><span className="font-semibold">Exclusive Discounts:</span> Reduced registration fees for SoAI conferences, workshops, and events.</li>
              <li><span className="font-semibold">Real-World Experience:</span> Valuable opportunity to join academic-industry collaborative projects, gaining hands-on experience and an official SoAI Certificate.</li>
              <li><span className="font-semibold">Networking Opportunities:</span> Meet and interact with leading experts shaping the future of algorithmic intelligence.</li>
            </ul>
            <p className="text-lg text-gray-700 leading-relaxed mt-8">
              Membership in SoAI is not just a subscription — it is your gateway to learning, recognition, and contribution in an international community committed to excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Membership Types */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Membership Types & Fees
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the membership type that best fits your needs and career stage
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {membershipTypes.map((type, index) => {
              const isEligible = isPromoActive && promoEligibleNames.has(type.name);
              const isPermanent = type.name === "Permanent Member";
              return (
                <Card key={index} className={`relative border-0 shadow-lg ${type.popular ? 'ring-2 ring-[#003d7b]' : ''}`}>
                  {type.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-[#003d7b] text-white">
                        <Star className="h-3 w-3 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl">{type.name}</CardTitle>
                    <div className="text-3xl font-bold text-[#003d7b]">
                      {isEligible ? (
                        <>
                          <span className="text-gray-400 line-through decoration-red-600">{type.price}</span>
                          <span className="text-sm font-normal text-gray-500">{type.period}</span>
                        </>
                      ) : (
                        <>
                          {type.price}
                          <span className="text-sm font-normal text-gray-500">{type.period}</span>
                        </>
                      )}
                    </div>
                    {isEligible && (
                      <div className="text-xs text-green-700 mt-1">
                        Complimentary SoAI membership valid until  {promoEndDisplay}.
                      </div>
                    )}
                    <CardDescription>{type.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {type.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-2">
                          <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      asChild
                      className={`w-full ${type.popular ? 'bg-[#003d7b] hover:bg-[#002a5c]' : ''}`}
                      variant={type.popular ? "default" : "outline"}
                    >
                      <Link to={isPermanent ? "/coming-soon" : `/membership/checkout?plan=${encodeURIComponent(type.name)}`}>
                        {isPermanent ? 'Coming Soon' : (isEligible ? 'Register Now' : 'Choose Plan')}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      {/* FAQ (Membership Registration System) */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>1. Member ID Generation</AccordionTrigger>
                <AccordionContent>
                  Upon successful registration, system generates a unique Society ID in the format: S000001X (sequential number + initial of last name). Example: John Smith → S000123S.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>2. Email Verification</AccordionTrigger>
                <AccordionContent>
                  Registration requires email verification before activation. Only verified accounts can proceed with Registration.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>3. Payments & Receipts</AccordionTrigger>
                <AccordionContent>
                  Acceptable payment methods: Telegraphic Transfer, Credit Card, PayPal, PayNow. Automatic receipt issued upon successful payment.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>4. Renewals</AccordionTrigger>
                <AccordionContent>
                  Automatic renewal applies to credit card payments unless opted out. Reminder email (with payment link) to be sent 1 month before expiry for members who need manual renewal.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>5. Permanent Members</AccordionTrigger>
                <AccordionContent>
                  Once payment is confirmed, system will tag the member as Permanent.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  );
}
