import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import { sendContact } from "@/lib/api";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    const emailValue = email.trim();
    if (!/^\S+@\S+\.\S+$/.test(emailValue)) {
      setError("Please enter a valid email address (e.g., name@example.com).");
      return;
    }
    if (!message.trim()) {
      setError("Please enter a message.");
      return;
    }
    setSubmitting(true);
    try {
      await sendContact({ email: emailValue, name: name.trim(), message: message.trim() });
      setSuccess("Message sent. We'll get back to you soon.");
      setEmail("");
      setName("");
      setMessage("");
    } catch (err: any) {
      setError(err?.message || "Failed to send. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }
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
                <form onSubmit={onSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#003d7b] focus:border-[#003d7b]"
                  />
                  <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#003d7b] focus:border-[#003d7b]"
                  />
                  <textarea
                    rows={6}
                    placeholder="Write your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#003d7b] focus:border-[#003d7b]"
                  />
                  {error && <p className="text-sm text-red-600">{error}</p>}
                  {success && <p className="text-sm text-green-700">{success}</p>}
                  <Button type="submit" disabled={submitting} className="w-full bg-[#003d7b] hover:bg-[#002a5c] disabled:opacity-60">
                    <Mail className="h-4 w-4 mr-2" /> {submitting ? "Sending..." : "Send"}
                  </Button>
                </form>
                <p className="text-xs text-gray-500 text-center">Or email us directly at <span className="text-[#003d7b]">info@soc-ai.org</span></p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
