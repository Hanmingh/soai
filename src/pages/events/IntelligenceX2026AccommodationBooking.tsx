import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import momentusLogo from "@/assets/IntelligenceX/Momentus_logo.jpg";
import { ApiError, bookHotel } from "@/lib/api";

const HOTEL_BOOKING_MIN_DATE = "2026-09-20";
const HOTEL_BOOKING_MAX_DATE = "2026-10-01";

const hotelRoomOptions = [
  "Superior Room (24sqm) SGD 229 (Single occupancy) Per day",
  "Superior Room (24sqm) SGD 261 (Double occupancy) Per day",
  "Deluxe Room (24sqm) SGD 254 (Single occupancy) Per day",
  "Deluxe Room (24sqm) SGD 286 (Double occupancy) Per day",
  "Premier Room (26sqm) SGD 280 (Single occupancy) Per day",
  "Premier Room (26sqm) SGD 312 (Double occupancy) Per day",
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

export default function IntelligenceX2026AccommodationBooking() {
  const [form, setForm] = useState<HotelBookingFormState>(emptyHotelBookingForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [redirecting, setRedirecting] = useState(false);

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

  return (
    <div className="min-h-screen bg-white">
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-3xl space-y-8">
          {/* Back link */}
          <div>
            <Link
              to="/events/intelligencex-2026/accommodation"
              className="text-sm text-[#003d7b] hover:underline"
            >
              ← Back to Accommodation Details
            </Link>
          </div>

          {/* Header */}
          <div className="flex items-center gap-4">
            <img
              src={momentusLogo}
              alt="Momentus Hotel Alexandra"
              className="h-14 w-auto rounded-md border border-gray-200 bg-white p-1.5"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Book Your Stay</h1>
              <p className="text-sm text-gray-500">Momentus Hotel Alexandra · IntelligenceX 2026</p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-lg border border-gray-200 bg-white p-6 shadow-sm md:p-8"
          >
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
                  placeholder="Flight no. & arrival time"
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
                  placeholder="Flight no. & departure time"
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
      </section>
    </div>
  );
}
