export type MembershipType = {
  name: string;
  price: string;
  period?: string;
  description: string;
  popular: boolean;
  features: string[];
};

export const membershipTypes: MembershipType[] = [
  {
    name: "Regular Member",
    price: "USD 100",
    period: "/ year",
    description: "Ideal for professionals and researchers in the field",
    popular: true,
    features: [
      "Full access to Soc-AI lectures",
      "Complimentary Coursera Plus subscription",
      "Conference discounts",
      "Priority networking access",
      "Academic-industry project opportunities",
      "Official Soc-AI Certificate eligibility",
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
      "Lifetime access to all Soc-AI content",
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
      "Full access to Soc-AI lectures",
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
      "Access to Soc-AI lectures",
      "Student discounts on events",
      "Basic networking access",
      "Student resources library",
      "Email support"
    ]
  }
];


