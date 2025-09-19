import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { recentEvents as localEvents } from "@/data/events";
import { useEffect, useMemo, useState } from "react";
import { getEventsList, type EventItem } from "@/lib/api";

function formatEventDate(ev: { date?: string; startDate?: string; endDate?: string }): string {
  const fmtFull = (date: Date) => date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  const monthShort = (date: Date) => date.toLocaleString(undefined, { month: 'short' });
  const day = (date: Date) => date.getDate();
  const year = (date: Date) => date.getFullYear();

  if (ev.date) return fmtFull(new Date(ev.date));

  if (ev.startDate && ev.endDate) {
    const s = new Date(ev.startDate);
    const e = new Date(ev.endDate);
    const sameYear = year(s) === year(e);
    const sameMonth = sameYear && s.getMonth() === e.getMonth();

    if (sameMonth) {
      return `${monthShort(s)} ${day(s)}–${day(e)}, ${year(s)}`;
    }
    if (sameYear) {
      return `${monthShort(s)} ${day(s)} – ${monthShort(e)} ${day(e)}, ${year(s)}`;
    }
    return `${fmtFull(s)} – ${fmtFull(e)}`;
  }

  if (ev.startDate) return fmtFull(new Date(ev.startDate));
  if (ev.endDate) return fmtFull(new Date(ev.endDate));
  return '';
}

export default function Events() {
  const [events, setEvents] = useState<EventItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const data = await getEventsList(controller.signal);
        setEvents(data);
      } catch (err: any) {
        setError(err?.message || "Failed to load events.");
        setEvents(localEvents);
      } finally {
        setLoading(false);
      }
    })();
    return () => controller.abort();
  }, []);

  const sorted = useMemo(() => {
    const list = events ?? localEvents;
    return [...list].sort((a, b) => {
      const aDate = new Date(a.startDate ?? a.date ?? a.endDate ?? 0).getTime();
      const bDate = new Date(b.startDate ?? b.date ?? b.endDate ?? 0).getTime();
      return aDate - bDate;
    });
  }, [events]);

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Events</h1>
        <p className="text-gray-600 mb-10">All upcoming and past events supported by SoAI.</p>
        {loading && <p className="text-gray-500">Loading events…</p>}
        {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
        <div className="grid grid-cols-1 gap-6">
          {sorted.map((ev) => (
            <Card key={ev.id} className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">{ev.title}</CardTitle>
                <CardDescription>
                  {formatEventDate(ev)} {ev.location ? `· ${ev.location}` : ''}
                </CardDescription>
              </CardHeader>
              {(ev.description || ev.link) && (
                <CardContent>
                  {ev.description && (
                    <p className="text-gray-700 mb-3">{ev.description}</p>
                  )}
                  {ev.link && (
                    <a href={ev.link} className="text-[#ee7c01] hover:underline" target="_blank" rel="noreferrer">Learn more</a>
                  )}
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}


