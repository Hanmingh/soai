import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, Star } from "lucide-react";

export default function Membership() {
  // Ordered to match the requested listing
  const membershipTypes = [
    {
      name: "Regular Member",
      price: "USD 100",
      period: "/ year",
      description: "Ideal for professionals and researchers in the field",
      popular: true,
      features: [
        "Full access to SoAI lectures",
        "Complimentary Coursera Plus subscription",
        "Conference discounts",
        "Priority networking access",
        "Academic-industry project opportunities",
        "Official SoAI Certificate eligibility",
        "Premium support"
      ]
    },
    {
      name: "Permanent Member",
      price: "USD 1,000",
      period: "one-time",
      description: "Lifetime membership with exclusive benefits",
      popular: false,
      features: [
        "Lifetime access to all SoAI content",
        "Premium Coursera Plus subscription",
        "Maximum conference discounts",
        "VIP networking privileges",
        "Advisory board consideration",
        "Exclusive member events",
        "Priority project access",
        "Dedicated support"
      ]
    },
    {
      name: "Developing Countries",
      price: "USD 50",
      period: "/ year",
      description: "Special pricing for developing countries",
      popular: false,
      features: [
        "Full access to SoAI lectures",
        "Complimentary Coursera Plus subscription",
        "Conference discounts",
        "Global collaboration opportunities",
        "Regional networking events",
        "Certificate programs"
      ]
    },
    {
      name: "Student Member",
      price: "USD 30",
      period: "/ year",
      description: "Perfect for students pursuing algorithmic intelligence studies",
      popular: false,
      features: [
        "Access to SoAI lectures",
        "Student discounts on events",
        "Basic networking access",
        "Student resources library",
        "Email support"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="relative py-20 bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url(${import.meta.env.BASE_URL}Membership_banner.jpg)`}}>
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
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Membership Types & Fees
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the membership type that best fits your needs and career stage
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {membershipTypes.map((type, index) => (
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
                    {type.price}
                    <span className="text-sm font-normal text-gray-500">{type.period}</span>
                  </div>
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
                    className={`w-full ${type.popular ? 'bg-[#003d7b] hover:bg-[#002a5c]' : ''}`}
                    variant={type.popular ? "default" : "outline"}
                  >
                    Choose Plan
                  </Button>
                </CardContent>
              </Card>
            ))}
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
                  Registration requires email verification before activation. Only verified accounts can proceed with log in.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>3. Payments & Receipts</AccordionTrigger>
                <AccordionContent>
                  Acceptable payment methods: Telegraphic Transfer, Credit Card, PayPal, PayNow. Automatic receipt issued upon successful payment. Credit card option must support auto-renewal, with an “opt-out” toggle.
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
                  Once payment is confirmed, system should tag the member as Permanent (no renewal reminders).
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  );
}
