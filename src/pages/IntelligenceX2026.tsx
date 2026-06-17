import { useEffect, useState, type FormEvent, type MouseEvent } from "react";
import { Link } from "react-router-dom";
import intelligenceXBg from "@/assets/IntelligenceX/IntelligenceX_bg.jpg";
import spmpLogo from "@/assets/IntelligenceX/SPMP_Logo.jpg";
import secbLogo from "@/assets/IntelligenceX/SECB_Logo.png";
import isiLogo from "@/assets/IntelligenceX/isi_logo.png";
import hotelLobby from "@/assets/IntelligenceX/lobby.jpg";
import hotelPoolBar from "@/assets/IntelligenceX/pool_bar.jpg";
import hotelPremierRoom from "@/assets/IntelligenceX/premier_room.jpg";
import hotelSuperiorRoom from "@/assets/IntelligenceX/superior_room.jpg";
import hotelDeluxeRoom from "@/assets/IntelligenceX/deluxe_room.jpg";
import momentusLogo from "@/assets/IntelligenceX/Momentus_logo.jpg";
import { ApiError, bookHotel } from "@/lib/api";
import modalLogo    from "@/logo/Logo_MODAL.png";
import columbiaLogo from "@/logo/logo_columbia.png";
import iofLogo      from "@/logo/logo_IOF.jpg.jpeg";
import fuelttureLogo from "@/logo/logo_fuelture_new.jpg";
import i2damoLogo   from "@/logo/logo_I2DAMO-gh-e07cc61c.webp";
import quantonLogo  from "@/logo/Logo_Quanton.png";
import tubLogo      from "@/logo_TUB.jpeg";
import finsureTechLogo from "@/logo/logo_finsuretech_hub.png";
import chuoLogo from "@/logo/logo_chuo.svg";
import rmiLogo from "@/logo/0244cc1c-d6ea-4544-bde5-50acfeb75831.jpg";
import zibLogo from "@/logo/ZIB-Primary-Logo_Blue-RGB.png";

const sectionLinks = [
  { id: "registration", label: "Registration & Calls" },
  { id: "event-information", label: "Event Information" },
  { id: "overview", label: "Overview" },
  { id: "conference-highlights", label: "Conference Highlights" },
  { id: "executive-track", label: "Executive Track" },
  { id: "scientific-committee", label: "Scientific Committee" },
] as const;

type SectionId = (typeof sectionLinks)[number]["id"];

const HOTEL_BOOKING_MIN_DATE = "2026-09-20";
const HOTEL_BOOKING_MAX_DATE = "2026-10-01";

const hotelRoomOptions = [
  "Superior Room (24sqm) SGD 229 inclusive of taxes  (Single occupancy) Per day",
  "Superior Room (24sqm) SGD 261 inclusive of taxes (Double occupancy) Per day",
  "Deluxe Room (24sqm) SGD 254 inclusive of taxes (Single occupancy) Per day",
  "Deluxe Room (24sqm) SGD 286 inclusive of taxes (Double occupancy) Per day",
  "Premier Room (26sqm) SGD 280 inclusive of taxes (Single occupancy) Per day",
  "Premier Room (26sqm) SGD 312 inclusive of taxes (Double occupancy) Per day",
];

type HotelBookingFormState = {
  firstName: string;
  lastName: string;
  email: string;
  checkIn: string;
  arrivalFlightDetails: string;
  checkOut: string;
  departureFlightDetails: string;
  roomType: string;
  remarks: string;
};

const emptyHotelBookingForm: HotelBookingFormState = {
  firstName: "",
  lastName: "",
  email: "",
  checkIn: "",
  arrivalFlightDetails: "",
  checkOut: "",
  departureFlightDetails: "",
  roomType: "",
  remarks: "",
};

function AccommodationModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState<"info" | "form">("info");
  const [form, setForm] = useState<HotelBookingFormState>(emptyHotelBookingForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setStep("info");
      setForm(emptyHotelBookingForm);
      setError(null);
      setSubmitting(false);
      setRedirecting(false);
    }
  }, [open]);

  if (!open) return null;

  const updateField = (field: keyof HotelBookingFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!form.firstName.trim() || !form.lastName.trim()) {
      setError("Please enter your first and last name as per your passport.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!form.checkIn || !form.checkOut) {
      setError("Please select your check-in and check-out dates.");
      return;
    }
    if (form.checkIn < HOTEL_BOOKING_MIN_DATE || form.checkIn > HOTEL_BOOKING_MAX_DATE) {
      setError("Check-in date must be between 20 September and 1 October 2026.");
      return;
    }
    if (form.checkOut < HOTEL_BOOKING_MIN_DATE || form.checkOut > HOTEL_BOOKING_MAX_DATE) {
      setError("Check-out date must be between 20 September and 1 October 2026.");
      return;
    }
    if (new Date(form.checkOut) <= new Date(form.checkIn)) {
      setError("Check-out date must be after check-in date.");
      return;
    }
    if (!form.roomType) {
      setError("Please select a room type.");
      return;
    }

    setSubmitting(true);
    try {
      const result = await bookHotel({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        checkIn: form.checkIn,
        checkOut: form.checkOut,
        roomType: form.roomType,
        arrivalFlightDetails: form.arrivalFlightDetails.trim() || undefined,
        departureFlightDetails: form.departureFlightDetails.trim() || undefined,
        remarks: form.remarks.trim() || undefined,
      });
      setRedirecting(true);
      window.location.href = result.url;
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  const inclusions = [
    "Room rate is inclusive of buffet breakfast and unlimited internet access",
    "Complimentary one (1) welcome drink per guest per stay at Verandah Pool Bar",
    "Complimentary early check-in from 11:00 AM, subject to room availability",
    "Complimentary late check-out till 4:00 PM, subject to room availability",
    "20% discount on Food & Beverage and 20% discount on laundry services",
  ];

  const terms = [
    "Check-In Time 3:00 PM. Early check-in is subject to availability.",
    "To guarantee early check-in, a reservation for the preceding night is required at the prevailing rate.",
    "Check-Out Time 11:00 AM. Late check-out until 6:00 PM: 50% of agreed room rate. After 6:00 PM: 100% of agreed room rate.",
    "Early Departure — guests departing earlier than their confirmed check-out date are chargeable for the full duration of stay.",
    "No Show — confirmed reservations not utilized will be charged the full room rate, inclusive of prevailing taxes, for the entire stay.",
    "All charges incurred during the stay will be settled directly by individual guests.",
  ];

  const rooms = [
    { src: hotelSuperiorRoom, label: "Superior Room", size: "24 sqm", single: 229, double: 261 },
    { src: hotelDeluxeRoom, label: "Deluxe Room", size: "24 sqm", single: 254, double: 286 },
    { src: hotelPremierRoom, label: "Premier Room", size: "26 sqm", single: 280, double: 312 },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="accommodation-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-start"
          style={{
            width: "200%",
            transform: step === "form" ? "translateX(-50%)" : "translateX(0%)",
            transition: "transform 320ms ease-in-out",
          }}
        >
          {/* ---------- Panel 1: Accommodation info ---------- */}
          <div className="max-h-[90vh] w-1/2 shrink-0 overflow-y-auto">
            {/* Hero */}
            <div className="relative h-48 md:h-56">
              <img
                src={hotelLobby}
                alt="Momentus Hotel Alexandra lobby"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#003d7b]/90 via-[#003d7b]/40 to-transparent" />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#003d7b] shadow-md transition hover:bg-white"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#ffcf8c]">
                  Official Accommodation Partner
                </p>
                <h2 id="accommodation-modal-title" className="text-xl md:text-2xl font-bold text-white">
                  Momentus Hotel Alexandra
                </h2>
              </div>
            </div>

            <div className="space-y-8 p-6 md:p-8">
              <p className="text-gray-800 leading-relaxed">
                SoAI is pleased to partner with{" "}
                <span className="font-semibold text-[#003d7b]">Momentus Hotel Alexandra</span> to offer
                preferential accommodation rates for{" "}
                <span className="font-semibold">
                  IntelligenceX 2026: Global Quantum×AI Frontier, Singapore, September 2026
                </span>
                .
              </p>

              {/* Room gallery & rates */}
              <div>
                <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-gray-400">
                    Room Types &amp; Rates
                  </h3>
                  <p className="text-xs text-gray-500">Rates are per room, per night</p>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {rooms.map((room) => (
                    <div key={room.label} className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                      <img
                        src={room.src}
                        alt={room.label}
                        className="h-32 w-full object-cover sm:h-28"
                        loading="lazy"
                      />
                      <div className="px-3 py-2.5">
                        <p className="text-sm font-semibold text-gray-900">{room.label}</p>
                        <p className="mb-1.5 text-xs text-gray-500">{room.size}</p>
                        <div className="space-y-0.5 text-sm text-gray-700">
                          <div className="flex items-center justify-between">
                            <span>Single Occupancy</span>
                            <span className="font-semibold text-[#003d7b]">SGD {room.single}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Double Occupancy</span>
                            <span className="font-semibold text-[#003d7b]">SGD {room.double}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Rates are inclusive of prevailing GST and service charge.
                </p>
              </div>

              {/* Pool bar banner */}
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={hotelPoolBar}
                  alt="Verandah Pool Bar & Grill"
                  className="h-36 w-full object-cover md:h-44"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <p className="absolute bottom-3 left-4 text-sm font-medium text-white">
                  Verandah Pool Bar &amp; Grill — complimentary welcome drink included
                </p>
              </div>

              {/* Inclusions */}
              <div>
                <h3 className="mb-3 text-base font-semibold text-gray-900">Inclusions</h3>
                <ul className="space-y-2">
                  {inclusions.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm md:text-base text-gray-800">
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#ee7c01]"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Terms & Conditions */}
              <div className="rounded-xl border border-gray-200 bg-[#f9fafb] p-4 md:p-5">
                <h3 className="mb-3 text-base font-semibold text-gray-900">Terms &amp; Conditions</h3>
                <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-600 leading-relaxed">
                  {terms.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* CTA to booking form */}
              <div className="flex justify-center pt-2">
                <button
                  type="button"
                  onClick={() => setStep("form")}
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#ee7c01] px-6 py-3 text-base font-semibold text-white shadow-md transition hover:bg-[#d66900] hover:shadow-lg sm:w-auto"
                >
                  Book This Rate
                </button>
              </div>
            </div>
          </div>

          {/* ---------- Panel 2: Booking form ---------- */}
          <div className="max-h-[90vh] w-1/2 shrink-0 overflow-y-auto">
            <div className="flex items-center justify-between bg-[#003d7b] px-6 py-4 md:px-8">
              <button
                type="button"
                onClick={() => setStep("info")}
                aria-label="Back to accommodation details"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18 9 12l6-6" />
                </svg>
              </button>
              <img src={momentusLogo} alt="Momentus Hotel Alexandra" className="h-12 w-auto rounded-md bg-white p-1.5" />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 p-6 md:p-8">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Book Your Stay</h3>
                <p className="text-sm text-gray-500">Momentus Hotel Alexandra · IntelligenceX 2026</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-800">
                    First Name (as per your Passport) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.firstName}
                    onChange={(e) => updateField("firstName", e.target.value)}
                    placeholder="Enter your answer"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#ee7c01] focus:border-[#ee7c01]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-800">
                    Last Name (as per your Passport) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.lastName}
                    onChange={(e) => updateField("lastName", e.target.value)}
                    placeholder="Enter your answer"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#ee7c01] focus:border-[#ee7c01]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-800">
                  Your Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="Enter your answer"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#ee7c01] focus:border-[#ee7c01]"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-800">
                    Check-in Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    min={HOTEL_BOOKING_MIN_DATE}
                    max={HOTEL_BOOKING_MAX_DATE}
                    value={form.checkIn}
                    onChange={(e) => updateField("checkIn", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-[#ee7c01] focus:border-[#ee7c01]"
                  />
                  <p className="text-xs text-gray-500">Available 20 Sep – 1 Oct 2026</p>
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-800">Arrival Flight Details</label>
                  <input
                    type="text"
                    value={form.arrivalFlightDetails}
                    onChange={(e) => updateField("arrivalFlightDetails", e.target.value)}
                    placeholder="Flight no. &amp; arrival time"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#ee7c01] focus:border-[#ee7c01]"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-800">
                    Check-out Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    min={HOTEL_BOOKING_MIN_DATE}
                    max={HOTEL_BOOKING_MAX_DATE}
                    value={form.checkOut}
                    onChange={(e) => updateField("checkOut", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-[#ee7c01] focus:border-[#ee7c01]"
                  />
                  <p className="text-xs text-gray-500">Available 20 Sep – 1 Oct 2026</p>
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-800">Departure Flight Details</label>
                  <input
                    type="text"
                    value={form.departureFlightDetails}
                    onChange={(e) => updateField("departureFlightDetails", e.target.value)}
                    placeholder="Flight no. &amp; departure time"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#ee7c01] focus:border-[#ee7c01]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-800">
                  Preferred Room Type <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2 rounded-md border border-gray-200 p-3">
                  {hotelRoomOptions.map((option) => (
                    <label key={option} className="flex items-start gap-2 text-sm text-gray-800">
                      <input
                        type="radio"
                        name="roomType"
                        value={option}
                        checked={form.roomType === option}
                        onChange={() => updateField("roomType", option)}
                        required
                        className="mt-0.5 accent-[#ee7c01]"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-800">Remarks</label>
                <textarea
                  value={form.remarks}
                  onChange={(e) => updateField("remarks", e.target.value)}
                  placeholder="Enter your answer"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#ee7c01] focus:border-[#ee7c01]"
                />
              </div>

              {error && <p className="text-sm font-medium text-red-600">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex w-full items-center justify-center rounded-full bg-[#ee7c01] px-6 py-3 text-base font-semibold text-white shadow-md transition hover:bg-[#d66900] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
              >
                {redirecting ? "Redirecting to secure payment…" : submitting ? "Submitting…" : "Continue to Payment"}
              </button>
              <p className="text-center text-xs text-gray-500">
                You will be redirected to a secure Stripe checkout to complete payment. A confirmation email
                with your booking details will be sent to you.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function IntelligenceX2026() {
  const bgUrl = intelligenceXBg;
  const [activeSection, setActiveSection] = useState<SectionId>(sectionLinks[0].id);
  const [showAccommodation, setShowAccommodation] = useState(false);

  useEffect(() => {
    const sections = sectionLinks
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const updateActiveSection = () => {
      const currentSection =
        [...sections]
          .reverse()
          .find((section) => section.getBoundingClientRect().top <= 128) ?? sections[0];

      if (currentSection) {
        setActiveSection(currentSection.id as SectionId);
      }
    };

    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    updateActiveSection();

    const initialSection = window.location.hash.slice(1);
    if (sectionLinks.some(({ id }) => id === initialSection)) {
      window.setTimeout(() => {
        document.getElementById(initialSection)?.scrollIntoView({ block: "start" });
        updateActiveSection();
      }, 0);
    }

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  const scrollToSection = (event: MouseEvent<HTMLAnchorElement>, sectionId: SectionId) => {
    event.preventDefault();
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    window.history.replaceState(null, "", `#${sectionId}`);
    setActiveSection(sectionId);
  };

  /* Wikimedia Commons Special:FilePath — browser follows 302 redirect, no hash needed */
  const sfp = (f: string) => `https://commons.wikimedia.org/wiki/Special:FilePath/${f}`;

  // SOC institution logos — NUS first, then universities A–Z, then startups
  // gridPx: pixel height for the static grid; marquee always uses 36px
  // Values calibrated by natural image dimensions (aspect ratio) + visual weight
  const institutionLogos = [
    // ── NUS first ──────────────────────────────────────────────────────────
    { abbr: "NUS",      name: "National University of Singapore",           src: "https://nus.edu.sg/images/default-source/base/logo.png",                                                     gridPx: 40, href: "https://www.nus.edu.sg" },
    { abbr: "RMI",      name: "NUS Risk Management Institute",               src: rmiLogo,                                                                                                     gridPx: 68, href: "https://rmi.nus.edu.sg/" },
    // ── Universities / research institutes A–Z ────────────────────────────
    { abbr: "AS",       name: "Academia Sinica",                            src: "https://upload.wikimedia.org/wikipedia/en/2/21/Academia_Sinica_logo.svg",                                  gridPx: 40, href: "https://www.sinica.edu.tw/en" },
    { abbr: "ANL",      name: "Argonne National Laboratory",                src: sfp("ArgonneLaboratoryLogo.png"),                                                                             gridPx: 41, href: "https://www.anl.gov" },
    { abbr: "CMU",      name: "Chiang Mai University",                      src: sfp("CMU_sub-logo.svg"),                                                                                      gridPx: 36, href: "https://www.cmu.ac.th/en/home" },
    { abbr: "CHU",      name: "Chuo University",                            src: chuoLogo,                                                                                             gridPx: 50, href: "https://www.chuo-u.ac.jp/english/" },
    { abbr: "CNRS",     name: "CNRS",                                       src: "https://upload.wikimedia.org/wikipedia/en/f/f5/Centre_national_de_la_recherche_scientifique_%28logo%29.svg", gridPx: 58, href: "https://www.cnrs.fr/en" },
    { abbr: "CU",       name: "Columbia University",                        src: columbiaLogo,                                                                                                gridPx: 90, href: "https://www.columbia.edu" },
    { abbr: "EP",       name: "École Polytechnique",                        src: sfp("%C3%89cole_polytechnique_signature.svg"),                                                               gridPx: 120, href: "https://www.polytechnique.edu/en" },
    { abbr: "ETH",      name: "ETH Zürich",                                 src: "https://upload.wikimedia.org/wikipedia/commons/9/99/ETH_Z%C3%BCrich_Logo_black.svg",                        gridPx: 25,  href: "https://ethz.ch/en.html" },
    { abbr: "UFBA",     name: "Federal University of Bahia",                src: sfp("Bras%C3%A3o_da_UFBA.png"),                                                                              gridPx: 72, href: "https://aai.ufba.br/en/about-ufba" },
    { abbr: "FUB",      name: "Freie Universität Berlin",                   src: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Freie_Universit%C3%A4t_Berlin_Logo_05.2024.svg",        gridPx: 40, href: "https://www.fu-berlin.de/en/index.html" },
    { abbr: "HUB",      name: "Humboldt-Universität zu Berlin",             src: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Huberlin-logo.svg",                                    gridPx: 80, href: "https://www.hu-berlin.de/en" },
    { abbr: "IST",      name: "Institute of Science Tokyo",                 src: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Institute_of_Science_Tokyo_logo%2C_basic.svg",          gridPx: 30, href: "https://www.isct.ac.jp/en" },
    { abbr: "LSE",      name: "London School of Economics",                 src: sfp("LSE_Logo.svg"),                                                                                         gridPx: 46, href: "https://www.lse.ac.uk" },
    { abbr: "MODAL",    name: "MODAL Forschungscampus",                     src: modalLogo,                                                                                                   gridPx: 35, href: "https://forschungscampus-modal.de/?lang=en" },
    { abbr: "NTHU",     name: "National Tsing Hua University",              src: sfp("NTHU_Round_Seal.svg"),                                                                                  gridPx: 65, href: "https://nthu-en.site.nthu.edu.tw/" },
    { abbr: "NUHS",     name: "National University Health System",          src: "https://www.nuhs.edu.sg/images/nuhslibraries/default-album/footer-logo/nuhs.png?sfvrsn=7838e2df_17",        gridPx: 60, href: "https://www.nuhs.edu.sg" },
    { abbr: "RU",       name: "Radboud University",                         src: "https://upload.wikimedia.org/wikipedia/commons/7/76/Logo_Radboud_University.svg",                           gridPx: 65, href: "https://www.ru.nl/en" },
    { abbr: "TUB",      name: "TU Berlin",                                  src: tubLogo,                                                                                                     gridPx: 63, href: "https://www.tu.berlin/en/" },
    { abbr: "UCB",      name: "UC Berkeley",                                src: "https://upload.wikimedia.org/wikipedia/commons/a/a1/Seal_of_University_of_California%2C_Berkeley.svg",      gridPx: 63, href: "https://www.berkeley.edu" },
    { abbr: "UvA",      name: "University of Amsterdam",                    src: "https://upload.wikimedia.org/wikipedia/commons/d/d1/Amsterdamuniversitylogo.svg",                           gridPx: 50, href: "https://www.uva.nl/en" },
    { abbr: "UP",       name: "University of Pavia",                        src: "https://upload.wikimedia.org/wikipedia/commons/d/dc/Logo_UNIPV.svg",                                        gridPx: 60, href: "https://en.unipv.it/en" },
    { abbr: "UVie",     name: "University of Vienna",                       src: "https://upload.wikimedia.org/wikipedia/commons/1/13/University_of_Vienna_wordmark.svg",                    gridPx: 47, href: "https://www.univie.ac.at/en/" },
    { abbr: "ZIB",      name: "Zuse Institute Berlin",                      src: zibLogo,                                                                                                     gridPx: 65, href: "https://www.zib.de/" },
    // ── ISI ───────────────────────────────────────────────────────────────
    { abbr: "ISI",      name: "International Statistical Institute",        src: isiLogo,                                                                                                     gridPx: 40, href: "https://isi-web.org/" },
    // ── Startups / industry partners ─────────────────────────────────────
    { abbr: "iOF",      name: "iOF Algorithmic Solutions",                  src: iofLogo,                                                                                                     gridPx: 45, href: "https://www.iof.sg" },
    { abbr: "Fuelture",  name: "Fuelture",                                  src: fuelttureLogo,                                                                                               gridPx: 60, href: "https://www.fuelture.tech/" },
    { abbr: "I2DAMO",   name: "I²DAMO",                                     src: i2damoLogo,                                                                                                  gridPx: 45, href: "https://www.i2damo.de/en" },
    { abbr: "Quanton",  name: "Quanton Technologies",                       src: quantonLogo,                                                                                                 gridPx: 60, href: "https://www.quanton.tech/" },
    { abbr: "FTH",      name: "FinsureTech Hub",                            src: finsureTechLogo,                                                                                             gridPx: 28, href: "https://finsuretech.ethz.ch/" },
    // ── Singapore tourism / convention partners ───────────────────────────
    { abbr: "SECB",     name: "Singapore Exhibition & Convention Bureau",   src: secbLogo,                                                                                                    gridPx: 65, href: "https://www.visitsingapore.com/mice/en/" },
    { abbr: "SPMP",     name: "Singapore – Passion Made Possible",          src: spmpLogo,                                                                                                    gridPx: 85, href: "https://www.visitsingapore.com" },
  ];

  // Marquee reuses the same source as the grid — always in sync
  const marqueeLogos = institutionLogos;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero / Title band */}
      <section className="relative py-16 md:py-20 bg-gray-900">
        <img
          src={bgUrl}
          alt="IntelligenceX 2026 background"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
          decoding="sync"
        />
        <div className="absolute inset-0 bg-[#003d7b]/80" />
        <div className="relative container mx-auto px-6 max-w-5xl">
          <p className="text-sm font-semibold text-[#ffcf8c] mb-2 uppercase tracking-wide">
            SoAI Event · 2026
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            IntelligenceX 2026: The Global Quantum×AI Frontier
          </h1>
          <p className="text-white/90 max-w-3xl text-lg leading-relaxed">
            A flagship three-day Global Quantum×AI Conference jointly organized by the National University of Singapore (NUS)
            and the Society of Algorithmic Intelligence (SoAI).
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto max-w-7xl px-6">
          <details className="group sticky top-16 z-30 mb-8 rounded-xl border border-gray-200 bg-white/95 shadow-sm backdrop-blur lg:hidden">
            <summary className="cursor-pointer list-none px-4 py-3 text-sm font-semibold text-[#003d7b]">
              On this page
              <span className="ml-2 font-normal text-gray-500">
                {sectionLinks.find(({ id }) => id === activeSection)?.label}
              </span>
            </summary>
            <div className="border-t border-gray-100 p-3">
              <nav aria-label="Page sections" className="grid gap-1">
                {sectionLinks.map(({ id, label }) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    onClick={(event) => scrollToSection(event, id)}
                    aria-current={activeSection === id ? "location" : undefined}
                    className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                      activeSection === id
                        ? "bg-[#003d7b]/10 font-semibold text-[#003d7b]"
                        : "text-gray-600 hover:bg-gray-50 hover:text-[#003d7b]"
                    }`}
                  >
                    {label}
                  </a>
                ))}
              </nav>
              <div className="mt-3 border-t border-gray-100 pt-3">
                <a
                  href="/trading-competition/index.html"
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-[#003d7b]/10 hover:text-[#003d7b]"
                >
                  AI Algorithmic Trading Competition
                </a>
                <button
                  type="button"
                  onClick={() => setShowAccommodation(true)}
                  className="block w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-gray-700 hover:bg-[#003d7b]/10 hover:text-[#003d7b]"
                >
                  Accommodation
                </button>
              </div>
            </div>
          </details>

          <div className="lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:items-start lg:gap-10">
            <aside className="sticky top-20 hidden max-h-[calc(100vh-6rem)] overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-sm lg:block">
              <div className="border-b border-gray-100 px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">On This Page</p>
              </div>
              <nav aria-label="Page sections" className="p-3">
                {sectionLinks.map(({ id, label }) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    onClick={(event) => scrollToSection(event, id)}
                    aria-current={activeSection === id ? "location" : undefined}
                    className={`block border-l-2 px-3 py-2.5 text-sm transition-colors ${
                      activeSection === id
                        ? "border-[#ee7c01] bg-[#003d7b]/5 font-semibold text-[#003d7b]"
                        : "border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-[#003d7b]"
                    }`}
                  >
                    {label}
                  </a>
                ))}
              </nav>
              <div className="border-t border-gray-100 p-3">
                <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                  Quick Links
                </p>
                <a
                  href="/trading-competition/index.html"
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-[#003d7b]/10 hover:text-[#003d7b]"
                >
                  AI Algorithmic Trading Competition
                </a>
                <button
                  type="button"
                  onClick={() => setShowAccommodation(true)}
                  className="block w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-[#003d7b]/10 hover:text-[#003d7b]"
                >
                  Accommodation
                </button>
              </div>
            </aside>

            <div className="min-w-0 space-y-10">

          {/* Partner logos – scrolling marquee */}
          <section className="pb-2">
            <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
              <div
                className="marquee flex items-center gap-14"
                style={{ animationDuration: "80s" }}
              >
                {[...marqueeLogos, ...marqueeLogos].map((logo, i) => (
                  <a
                    key={i}
                    href={logo.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={logo.name}
                    className="shrink-0 transition-opacity hover:opacity-70"
                  >
                    <img
                      src={logo.src}
                      alt={logo.name}
                      className="w-auto object-contain"
                      style={{ height: `${logo.gridPx ?? 40}px`, maxWidth: "200px" }}
                      loading="lazy"
                      onError={(e) => {
                        const anchor = (e.currentTarget as HTMLElement).closest("a") as HTMLElement | null;
                        if (anchor) anchor.style.display = "none";
                      }}
                    />
                  </a>
                ))}
              </div>
            </div>
          </section>

          <section id="registration" className="scroll-mt-24 flex flex-col items-start gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/events/intelligencex-2026/register"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-[#ee7c01] px-6 py-2.5 text-base font-semibold text-white shadow-md transition hover:bg-[#d66900] hover:shadow-lg"
              >
                Conference Registration
              </Link>
              <a
                href="https://forms.gle/kKcYxG6PDgyvrSNk8"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-[#ee7c01] bg-white px-6 py-2.5 text-base font-semibold text-[#ee7c01] shadow-sm transition hover:bg-[#fff3e6]"
              >
                Invited Session Submission
              </a>
              <button
                type="button"
                onClick={() => setShowAccommodation(true)}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-[#003d7b] bg-white px-6 py-2.5 text-base font-semibold text-[#003d7b] shadow-sm transition hover:bg-[#f0f6ff]"
              >
                🏨 Accommodation
              </button>
              <a
                href="/trading-competition/index.html"
                target="_blank"
                rel="noreferrer"
                className="btn-blink inline-flex items-center justify-center whitespace-nowrap rounded-full bg-[#003d7b] px-6 py-2.5 text-base font-semibold text-white shadow-md transition hover:bg-[#002a57] hover:shadow-lg"
              >
                🏆 AI Algorithmic Trading Competition
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
              <a
                href="/events/Call%20for%20Invited%20Sessions.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-base font-semibold text-[#003d7b] hover:text-[#002a57]"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6" />
                </svg>
                Call for Invited Sessions
              </a>
              <a
                href="/events/Call%20for%20Hackathon%20Participation.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-base font-semibold text-[#003d7b] hover:text-[#002a57]"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6" />
                </svg>
                Call for Hackathon Participation
              </a>
            </div>
          </section>

          {/* Event information summary */}
          <section
            id="event-information"
            className="scroll-mt-24 border-l-4 border-[#ee7c01] bg-[#f9fafb] py-2 pl-5"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Event Information</h2>
            <dl className="grid gap-1 text-sm md:text-base text-gray-800 md:grid-cols-2">
              <div>
                <dt className="font-medium">Main Conference</dt>
                <dd>24–26 September 2026 · Singapore</dd>
              </div>
              <div>
                <dt className="font-medium">Executive Track</dt>
                <dd>28 September 2026 · Singapore · By invitation only</dd>
              </div>
            </dl>
          </section>

          {/* Overview */}
          <section id="overview" className="scroll-mt-24 space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Overview</h2>
            <p className="text-gray-800 leading-relaxed">
              IntelligenceX 2026 is a flagship three-day Global Quantum×AI Conference jointly organized by the National
              University of Singapore (NUS) and the Society of Algorithmic Intelligence (SoAI). The event brings together
              leading researchers, industry innovators, and decision-makers to explore how quantum computing, artificial
              intelligence, data science, and statistics jointly redefine the future of intelligent systems.
            </p>
            <p className="text-gray-800 leading-relaxed">
              This flagship conference also integrates{" "}
              <span className="font-bold">
                The 10th NUS-ZIB-ISCT-ISM-MODAL Workshop on Algorithmic Intelligence: Optimization, Data Science & Decision-Making
                in the Quantum–AI Era
              </span>
              , continuing{" "}
              <a
                href="https://sites.google.com/view/optds2025/"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-[#003d7b] underline hover:text-[#002a57]"
              >
                a long-standing international workshop series
              </a>{" "}
              on optimization, data science, and decision intelligence, and extending it into the emerging Quantum × AI frontier.
            </p>
            <p className="text-gray-800 leading-relaxed">
              Building on a strong foundation of prior workshops, tutorials, and hackathons, IntelligenceX 2026 is
              designed to bridge frontier research and practical deployment, combining scientific rigor with
              methodological and strategic relevance.
            </p>
          </section>

          {/* Conference Highlights */}
          <section id="conference-highlights" className="scroll-mt-24 space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Conference Highlights</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-800 leading-relaxed text-sm md:text-base">
              <li>
                Keynote addresses by world-leading researchers and industry pioneers
              </li>
              <li>
                Parallel technical sessions on quantum computing, artificial intelligence, data science, statistics,
                and hybrid Quantum×AI methodologies
              </li>
              <li>
                <Link to="/events/intelligencex-2026/tutorials" className="text-[#003d7b] font-medium hover:underline">
                  Hands-on tutorials on quantum computing, Agentic coding, and AI algorithmic trading (Limited Seats!)
                </Link>
              </li>
              <li>
                Panel discussions and roundtables fostering dialogue among academia, industry, and policymakers
              </li>
              <li>
                <a
                  href="/trading-competition/index.html"
                  className="text-[#003d7b] font-medium hover:underline"
                >
                  AI Algorithmic Trading Competition
                </a>
              </li>
              <li>
                Ecosystem Forum, featuring industry–academia showcases and collaboration opportunities
              </li>

            </ul>
          </section>


          {/* Executive Track */}
          <section id="executive-track" className="scroll-mt-24 space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Executive Track</h2>
            <p className="text-gray-700 text-sm md:text-base">
              <span className="font-semibold">28 September 2026 – By Invitation Only</span>
            </p>
            <p className="text-gray-800 leading-relaxed">
              In addition to the main conference, IntelligenceX 2026 will host a half-day executive program designed
              for senior technology, innovation, and policy leaders. This curated track will offer:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-800 leading-relaxed text-sm md:text-base">
              <li>
                Strategic briefings on Quantum×AI readiness, integration, and long-term impact
              </li>
              <li>
                Moderated roundtables on investment strategy, governance, and organizational transformation
              </li>
              <li>
                Opportunities to engage with global experts in a focused, high-level setting
              </li>
            </ul>
            <p className="text-gray-800 leading-relaxed">
              The executive program complements the public training sessions, which are open to practitioners and
              researchers seeking hands-on exposure to quantum computing, artificial intelligence, and data science
              foundations.
            </p>
          </section>

          {/* Scientific Organizing Committee */}
          <section id="scientific-committee" className="scroll-mt-24 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Scientific Organizing Committee
            </h2>
            {/* Member list – last name A–Z */}
            <ul className="list-disc pl-6 space-y-2 text-gray-800 leading-relaxed text-sm md:text-base">
              <li>Bastian Bergmann (ETH Zürich, Switzerland)</li>
              <li>Ralf Borndörfer (Freie Universität Berlin &amp; Zuse Institute Berlin, Germany)</li>
              <li>Agostino Capponi (Columbia University, USA)</li>
              <li>Chun-houh Chen (Academia Sinica, Taiwan)</li>
              <li>Ray-Bing Chen (National Tsing Hua University, Taiwan)</li>
              <li>Ying Chen (National University of Singapore, Singapore)</li>
              <li>Patrick Chia (National University Health System, Singapore)</li>
              <li>Philippe Codognet (CNRS / Sorbonne University / University of Tokyo, France)</li>
              <li>Katsuki Fujisawa (Institute of Science Tokyo, Japan)</li>
              <li>Paolo Giudici (University of Pavia, Italy)</li>
              <li>Xin Guo (University of California, Berkeley, USA)</li>
              <li>Nikolaus Hautsch (University of Vienna, Austria)</li>
              <li>Tomoyuki Higuchi (Chuo University, Japan)</li>
              <li>Satoshi Ito (The Institute of Statistical Mathematics, Japan)</li>
              <li>Tal Kachman (Humboldt-Universität zu Berlin, Germany)</li>
              <li>Thorsten Koch (Zuse Institute Berlin &amp; TU Berlin, Germany)</li>
              <li>Stefan Lessmann (Humboldt-Universität zu Berlin, Germany)</li>
              <li>Sven Leyffer (Argonne National Laboratory, USA)</li>
              <li>Rujira Ouncharoen (Chiang Mai University, Thailand)</li>
              <li>Huyên Pham (École Polytechnique, France)</li>
              <li>Paulo Canas Rodrigues (Federal University of Bahia, Brazil)</li>
              <li>Xun Shen (Tokyo University of Agriculture and Technology, Japan)</li>
              <li>Yuji Shinano (Zuse Institute Berlin, Germany)</li>
              <li>Josef Teichmann (ETH Zürich, Switzerland)</li>
              <li>Simon Trimborn (University of Amsterdam, Netherlands)</li>
              <li>Qiwei Yao (London School of Economics and Political Science, UK)</li>
            </ul>

            {/* Institution logos — full colour horizontal wrap */}
            <div className="pt-2" style={{ display: "flex", flexWrap: "wrap", gap: "20px 28px", alignItems: "flex-start" }}>
              {institutionLogos.filter(inst => inst.src).map((inst) => (
                <a
                  key={inst.abbr}
                  href={inst.href}
                  target="_blank"
                  rel="noreferrer"
                  title={inst.name}
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "90px" }}
                  className="opacity-80 hover:opacity-100 transition-opacity"
                >
                  <img
                    src={inst.src}
                    alt={inst.name}
                    style={{ maxHeight: `${inst.gridPx ?? 40}px`, maxWidth: "220px", width: "auto", height: "auto" }}
                    className="object-contain"
                    loading="lazy"
                    onError={(e) => {
                      const anchor = (e.currentTarget as HTMLElement).closest("a") as HTMLElement | null;
                      if (anchor) anchor.style.display = "none";
                    }}
                  />
                </a>
              ))}
            </div>
          </section>

          {/* Back link */}
          <div className="pt-4">
            <Link to="/events" className="text-sm text-[#003d7b] hover:underline">
              ← Back to Events
            </Link>
          </div>
            </div>
          </div>
        </div>
      </section>

      <AccommodationModal open={showAccommodation} onClose={() => setShowAccommodation(false)} />
    </div>
  );
}


