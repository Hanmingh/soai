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
    price: "SGD 128",
    period: "/ year",
    description: "Ideal for professionals and researchers in the field",
    popular: true,
    features: [
      "Conference discounts",
      "Certificate programs discounts",
      "Academic-industry project opportunities",
      "Priority networking access",
      "Premium support"
    ]
  },
  {
    name: "Permanent Member",
    price: "SGD 1280",
    period: "one-time",
    description: "Lifetime membership with exclusive benefits",
    popular: false,
    features: [
      "Lifetime access to all So-AI content",
      "Conference discounts",
      "Certificate programs",
      "Academic-industry project opportunities",
      "Priority networking access",
      "VIP networking privileges",
      "Advisory board consideration",
      "Exclusive member events",
      "Dedicated support"
    ]
  },
  {
    name: "Developing Countries",
    price: "SGD 60",
    period: "/ year",
    description: "Special support for developing countries",
    popular: false,
    features: [
      "Conference discounts",
      "Certificate programs discounts",
      "Academic-industry project opportunities",
      "Priority networking access"
    ]
  },
  {
    name: "Student Member",
    price: "SGD 30",
    period: "/ year",
    description: "Perfect for students pursuing algorithmic intelligence studies",
    popular: false,
    features: [
      "Student discounts on events",
      "Networking access",
      "Certificate programs discounts",
      "Academic-industry project opportunities",
      "Email support"
    ]
  }
];


