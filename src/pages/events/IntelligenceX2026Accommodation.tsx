import { Link } from "react-router-dom";
import hotelLobby from "@/assets/IntelligenceX/lobby.jpg";
import hotelPoolBar from "@/assets/IntelligenceX/pool_bar.jpg";
import hotelPremierRoom from "@/assets/IntelligenceX/premier_room.jpg";
import hotelSuperiorRoom from "@/assets/IntelligenceX/superior_room.jpg";
import hotelDeluxeRoom from "@/assets/IntelligenceX/deluxe_room.jpg";

const rooms = [
  { src: hotelSuperiorRoom, label: "Superior Room", size: "24 sqm", single: 229, double: 261 },
  { src: hotelDeluxeRoom, label: "Deluxe Room", size: "24 sqm", single: 254, double: 286 },
  { src: hotelPremierRoom, label: "Premier Room", size: "26 sqm", single: 280, double: 312 },
];

const inclusions = [
  "Daily buffet breakfast",
  "Complimentary unlimited internet access",
  "One (1) welcome drink per guest per stay at Verandah Pool Bar & Grill",
  "Early check-in from 11:00 AM, subject to room availability",
  "Late check-out until 4:00 PM, subject to room availability",
  "20% discount on Food & Beverage consumption",
  "20% discount on laundry services",
];

const hotelPolicies = [
  "Standard check-in time is 3:00 PM.",
  "Standard check-out time is 11:00 AM.",
  "Early check-in and late check-out are subject to room availability and cannot be guaranteed.",
  "To guarantee early check-in, guests may reserve the preceding night at the applicable room rate.",
  "Late check-out beyond the complimentary period may be subject to additional charges in accordance with the hotel's prevailing policies.",
  "Guests departing earlier than their confirmed departure date may be charged for the full duration of the confirmed stay in accordance with the hotel's booking conditions.",
  "Confirmed reservations not utilised may be subject to no-show charges in accordance with the hotel's booking conditions.",
];

export default function IntelligenceX2026Accommodation() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative py-16 md:py-20 bg-gray-900">
        <img
          src={hotelLobby}
          alt="Momentus Hotel Alexandra lobby"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
          decoding="sync"
        />
        <div className="absolute inset-0 bg-[#003d7b]/80" />
        <div className="relative container mx-auto px-6 max-w-5xl">
          <p className="text-sm font-semibold text-[#ffcf8c] mb-2 uppercase tracking-wide">
            IntelligenceX 2026 · Official Accommodation Partner
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Momentus Hotel Alexandra
          </h1>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-6 max-w-5xl space-y-10">
          {/* Back link */}
          <div>
            <Link to="/events/intelligencex-2026" className="text-sm text-[#003d7b] hover:underline">
              ← Back to Event
            </Link>
          </div>

          {/* Official Conference Hotel */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Official Conference Hotel</h2>
            <p className="text-gray-800 leading-relaxed">
              SoAI is pleased to collaborate with{" "}
              <a
                href="https://www.momentushotels.com/hotel-alexandra-singapore"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-[#003d7b] underline hover:text-[#002a57]"
              >
                Momentus Hotel Alexandra
              </a>{" "}
              to facilitate preferential accommodation rates for delegates attending{" "}
              <Link
                to="/events/intelligencex-2026"
                className="font-semibold text-[#003d7b] underline hover:text-[#002a57]"
              >
                IntelligenceX 2026: Global Quantum × AI Frontier
              </Link>
              .
            </p>
          </section>

          {/* Room Types & Rates */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Room Types &amp; Rates</h2>
            <p className="text-gray-800 leading-relaxed">
              Rates are quoted per room per night and are inclusive of prevailing service charge and GST.
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {rooms.map((room) => (
                <div key={room.label} className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                  <img
                    src={room.src}
                    alt={room.label}
                    className="h-40 w-full object-cover"
                    loading="lazy"
                  />
                  <div className="p-4">
                    <p className="text-base font-semibold text-gray-900">{room.label}</p>
                    <p className="mb-2 text-sm text-gray-500">{room.size}</p>
                    <div className="space-y-1 text-sm text-gray-700">
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
          </section>

          {/* Pool bar banner */}
          <div className="relative overflow-hidden rounded-xl">
            <img
              src={hotelPoolBar}
              alt="Verandah Pool Bar & Grill"
              className="h-48 w-full object-cover md:h-56"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <p className="absolute bottom-4 left-5 text-base font-medium text-white">
              Verandah Pool Bar &amp; Grill — complimentary welcome drink included
            </p>
          </div>

          {/* Inclusions */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Inclusions</h2>
            <ul className="space-y-2">
              {inclusions.map((item) => (
                <li key={item} className="flex items-start gap-2 text-gray-800 leading-relaxed">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="mt-1 h-4 w-4 shrink-0 text-[#ee7c01]"
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
          </section>

          {/* Conference Accommodation Period */}
          <section className="space-y-3 rounded-lg border border-gray-200 bg-[#f9fafb] p-6 md:p-8">
            <h2 className="text-xl font-semibold text-gray-900">Conference Accommodation Period</h2>
            <p className="text-gray-800 leading-relaxed">The official conference accommodation period is:</p>
            <p className="text-lg font-semibold text-[#003d7b]">23 September 2026 – 26 September 2026</p>
            <p className="text-gray-800 leading-relaxed">
              Delegates may request stays before or after the conference period at the same conference rates,
              subject to room availability and hotel confirmation.
            </p>
          </section>

          {/* Booking Window */}
          <section className="space-y-3 rounded-lg border border-gray-200 bg-[#f9fafb] p-6 md:p-8">
            <h2 className="text-xl font-semibold text-gray-900">Booking Window</h2>
            <p className="text-gray-800 leading-relaxed">
              The conference accommodation booking window will close on:
            </p>
            <p className="text-lg font-semibold text-[#003d7b]">30 August 2026, 23:59 Singapore Time</p>
            <p className="text-gray-800 leading-relaxed">
              No new reservations will be accepted after the booking window closes.
            </p>
          </section>

          {/* Amendments and Cancellations */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Amendments and Cancellations</h2>
            <p className="text-gray-800 leading-relaxed">
              Prior to 30 August 2026, delegates may request amendments, extensions, reductions, substitutions, or
              cancellations of their reservations.
            </p>
            <p className="text-gray-800 leading-relaxed">
              After 30 August 2026, all bookings will be considered final and any amendment, cancellation, reduction
              of stay, or booking modification shall be subject to the approval of the hotel.
            </p>
          </section>

          {/* Hotel Policies */}
          <section className="rounded-xl border border-gray-200 bg-[#f9fafb] p-6 md:p-8 space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Hotel Policies</h2>
            <ul className="list-disc space-y-2 pl-5 text-gray-700 leading-relaxed">
              {hotelPolicies.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Payment and Guest Responsibility */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Payment and Guest Responsibility</h2>
            <p className="text-gray-800 leading-relaxed">
              All accommodation charges, incidental expenses, food and beverage charges, laundry charges,
              transportation charges, room service charges, and any other personal expenses are the sole
              responsibility of the guest and shall be settled in accordance with the applicable booking and
              payment arrangements.
            </p>
            <p className="text-gray-800 leading-relaxed">
              Guests are responsible for ensuring the accuracy of their booking information and complying with
              the hotel's policies.
            </p>
            <p className="text-gray-800 leading-relaxed">
              For reimbursement and administrative purposes, SoAI will issue the payment receipt for the
              accommodation booking. Upon request, Momentus Hotel Alexandra may provide a stay confirmation
              letter indicating the guest's accommodation period and check-in/check-out details.
            </p>
          </section>

          {/* Disclaimer */}
          <section className="space-y-4 rounded-lg border border-gray-200 bg-[#f9fafb] p-6 md:p-8">
            <h2 className="text-xl font-semibold text-gray-900">Disclaimer</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Conference accommodation is provided by Momentus Hotel Alexandra.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Room availability, booking confirmation, amendments, cancellations, refunds, no-show policies,
              accommodation services, and all hotel-related matters are governed by the hotel's policies and
              operating procedures.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              While SoAI facilitates access to conference accommodation rates and coordinates the group booking
              process, SoAI does not own, operate, manage, or control the hotel and shall not be liable for any
              accommodation-related claims, losses, service interruptions, booking disputes, room availability
              issues, cancellations, refunds, personal injury, property loss, or other matters arising from a
              delegate's stay at the hotel.
            </p>
          </section>

          {/* CTA */}
          <div className="flex justify-center pt-2">
            <Link
              to="/events/intelligencex-2026/accommodation/book"
              className="inline-flex w-full items-center justify-center rounded-full bg-[#ee7c01] px-8 py-3 text-base font-semibold text-white shadow-md transition hover:bg-[#d66900] hover:shadow-lg sm:w-auto"
            >
              Book This Rate
            </Link>
          </div>

          {/* Back link bottom */}
          <div className="pt-4">
            <Link to="/events/intelligencex-2026" className="text-sm text-[#003d7b] hover:underline">
              ← Back to Event
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
