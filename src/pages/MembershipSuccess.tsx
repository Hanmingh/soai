import { Link, useLocation } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function MembershipSuccess() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const memberId = params.get("member_id") || undefined;
  const plan = params.get("plan") || undefined;
  const email = params.get("email") || undefined;

  return (
    <div className="min-h-[70vh] bg-gradient-to-b from-white to-gray-50 flex items-center justify-center px-4 py-10">
      <Card className="border border-gray-200/70 shadow-2xl/10 max-w-xl w-full text-center">
        <CardHeader>
          <CardTitle className="text-2xl tracking-tight">Submission received</CardTitle>
          <CardDescription>
            Thank you for registering. We’ve received your information.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {(memberId || plan || email) && (
            <div className="text-sm text-gray-700 space-y-1">
              {memberId && <div>Member ID: <span className="font-medium">{memberId}</span></div>}
              {plan && <div>Plan: <span className="font-medium">{plan}</span></div>}
              {email && <div>Email: <span className="font-medium">{email}</span></div>}
            </div>
          )}
          <div className="flex items-center justify-center gap-3 pt-2">
            <Button asChild className="bg-[#003d7b] hover:bg-[#002a5c]">
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


