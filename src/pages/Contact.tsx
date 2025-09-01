import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">We’d love to hear from you</h1>
            <p className="text-gray-700">Send us a message below. We typically respond within 1–2 business days.</p>
          </div>
        </div>
      </section>

      {/* Minimal message box */}
      <section className="pb-24">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <Card className="border-0 shadow-xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Message</CardTitle>
                <CardDescription>Tell us what’s on your mind. Include your email if you’d like a reply.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <input
                  type="email"
                  placeholder="Your email (optional)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#003d7b] focus:border-[#003d7b]"
                />
                <textarea
                  rows={6}
                  placeholder="Write your message..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#003d7b] focus:border-[#003d7b]"
                />
                <Button className="w-full bg-[#003d7b] hover:bg-[#002a5c]">
                  <Mail className="h-4 w-4 mr-2" /> Send
                </Button>
                <p className="text-xs text-gray-500 text-center">Or email us directly at <span className="text-[#003d7b]">info@soai.org</span></p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
