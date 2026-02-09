import { Link, useLocation } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PaymentSuccess() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const event = params.get("event");

  return (
    <div className="min-h-[70vh] bg-gradient-to-b from-white to-gray-50 flex items-center justify-center px-4 py-10">
      <Card className="border border-gray-200/70 shadow-2xl/10 max-w-xl w-full text-center">
        <CardHeader>
          <CardTitle className="text-2xl tracking-tight">Payment successful</CardTitle>
          <CardDescription>
            Thank you. Your registration payment has been received.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {event && (
            <div className="text-sm text-gray-700">
              Event: <span className="font-medium">{event}</span>
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
