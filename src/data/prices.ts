type Currency = "SGD";

export type PriceOption = {
  amount: number;
  currency: Currency;
  priceId?: string;
};

export type PriceTier = {
  key: "early" | "regular" | "onsite";
  label: string;
  deadline?: string;
  cutoffDate?: string;
  member: PriceOption;
  nonMember: PriceOption;
};

export const intelligenceX2026Prices: PriceTier[] = [
  {
    key: "early",
    label: "Early bird",
    deadline: "Open till 31 Jul 2026",
    cutoffDate: "2026-07-31",
    member: {
      amount: 300,
      currency: "SGD",
      priceId: "price_1T6O8fRoKuwmRueSr4aaZAig",
    },
    nonMember: {
      amount: 600,
      currency: "SGD",
      priceId: "price_1T6O8gRoKuwmRueS5yaUMuAq",
    },
  },
  {
    key: "regular",
    label: "Later registration",
    deadline: "Open till 15 Sep 2026",
    cutoffDate: "2026-09-15",
    member: {
      amount: 380,
      currency: "SGD",
      priceId: "price_1T6O8gRoKuwmRueS2e77bN5k",
    },
    nonMember: {
      amount: 850,
      currency: "SGD",
      priceId: "price_1T6O8fRoKuwmRueSofCGxxTC",
    },
  },
  {
    key: "onsite",
    label: "On-site registration",
    member: {
      amount: 380,
      currency: "SGD",
      priceId: "price_1T6O8gRoKuwmRueSRrTiTkbz",
    },
    nonMember: {
      amount: 900,
      currency: "SGD",
      priceId: "price_1T6O8gRoKuwmRueS6c5jZB3v",
    },
  },
];

export function formatPrice(option: PriceOption) {
  return `${option.amount} ${option.currency}`;
}

function endOfDay(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map((value) => Number(value));
  return new Date(y, m - 1, d, 23, 59, 59, 999);
}

export function getActiveTier(date: Date = new Date()) {
  const early = intelligenceX2026Prices.find((tier) => tier.key === "early");
  if (early?.cutoffDate && date <= endOfDay(early.cutoffDate)) {
    return early;
  }
  const regular = intelligenceX2026Prices.find((tier) => tier.key === "regular");
  if (regular?.cutoffDate && date <= endOfDay(regular.cutoffDate)) {
    return regular;
  }
  return intelligenceX2026Prices.find((tier) => tier.key === "onsite")!;
}
