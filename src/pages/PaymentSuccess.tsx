import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getCheckoutStatus, type HotelBookingCheckoutDetails } from "@/lib/api";

function formatAmount(amountTotal: number | null, currency: string) {
  if (amountTotal == null) return null;
  return `${currency.toUpperCase()} ${(amountTotal / 100).toFixed(2)}`;
}

export default function PaymentSuccess() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const event = params.get("event");
  const sessionId = params.get("session_id");

  const [hotelBooking, setHotelBooking] = useState<HotelBookingCheckoutDetails | null>(null);

  useEffect(() => {
    if (!sessionId) return;
    let cancelled = false;
    getCheckoutStatus(sessionId)
      .then((status) => {
        if (!cancelled && status.booking_type === "hotel" && status.hotel_booking) {
          setHotelBooking(status.hotel_booking);
        }
      })
      .catch(() => {
        // Non-fatal — the generic success message below still applies.
      });
    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  return (
    <div className="min-h-[70vh] bg-gradient-to-b from-white to-gray-50 flex items-center justify-center px-4 py-10">
      <Card className="border border-gray-200/70 shadow-2xl/10 max-w-xl w-full text-center">
        <CardHeader>
          <CardTitle className="text-2xl tracking-tight">Payment successful</CardTitle>
          <CardDescription>
            {hotelBooking
              ? "Thank you. Your hotel booking payment has been received."
              : "Thank you. Your registration payment has been received."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {event && (
            <div className="text-sm text-gray-700">
              Event: <span className="font-medium">{event}</span>
            </div>
          )}

          {hotelBooking && (
            <div className="rounded-lg border border-gray-200 bg-[#f9fafb] p-4 text-left text-sm">
              <p className="mb-2 font-semibold text-gray-900">Booking Confirmation</p>
              <dl className="space-y-1 text-gray-700">
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-500">Guest</dt>
                  <dd className="font-medium">
                    {hotelBooking.first_name} {hotelBooking.last_name}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-500">Room Type</dt>
                  <dd className="font-medium text-right">{hotelBooking.room_type}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-500">Check-in</dt>
                  <dd className="font-medium">{hotelBooking.check_in}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-500">Check-out</dt>
                  <dd className="font-medium">{hotelBooking.check_out}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-500">Total Stay</dt>
                  <dd className="font-medium">
                    {hotelBooking.nights} night{hotelBooking.nights === 1 ? "" : "s"}
                  </dd>
                </div>
                {formatAmount(hotelBooking.amount_total, hotelBooking.currency) && (
                  <div className="flex justify-between gap-4">
                    <dt className="text-gray-500">Amount Paid</dt>
                    <dd className="font-medium">
                      {formatAmount(hotelBooking.amount_total, hotelBooking.currency)}
                    </dd>
                  </div>
                )}
              </dl>
              <p className="mt-3 text-xs text-gray-500">
                A confirmation email has been sent to you. Momentus Hotel Alexandra will send your booking
                voucher and any further documents directly to your email shortly.
              </p>
            </div>
          )}

          <div className="flex items-center justify-center gap-3 pt-2">
            <Button asChild>
              <Link to="/events">Back to Events</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/">Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
