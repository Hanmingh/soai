import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Wrench } from "lucide-react";

export default function Maintenance() {
  return (
    <div className="min-h-[70vh] bg-gradient-to-b from-white to-gray-50 flex items-center justify-center px-4 py-10">
      <Card className="border border-gray-200/70 shadow-2xl/10 max-w-xl w-full">
        <div className="mx-auto mb-2 h-12 w-12 rounded-xl bg-[#003d7b]/10 text-[#003d7b] flex items-center justify-center">
          <Wrench className="h-6 w-6" />
        </div>
        <CardTitle className="text-2xl text-center tracking-tight">We’ll be right back</CardTitle>
        <CardContent className="text-center space-y-4 pt-0">
          <p className="text-sm text-gray-600 max-w-md mx-auto">
            We’re performing a quick tune‑up to keep things running smoothly.
            This won’t take long. In the meantime, you can return to the homepage.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Button asChild className="bg-[#003d7b] hover:bg-[#002a5c]">
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


