import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { newsItems as localNews } from "@/data/news";
import { useEffect, useMemo, useState } from "react";
import { getNewsList, type NewsItem } from "@/lib/api";

export default function News() {
  const [items, setItems] = useState<NewsItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const data = await getNewsList(controller.signal);
        setItems(data);
      } catch (err: any) {
        setError(err?.message || "Failed to load news.");
        setItems(localNews);
      } finally {
        setLoading(false);
      }
    })();
    return () => controller.abort();
  }, []);

  const sorted = useMemo(() => {
    const list = items ?? localNews;
    return [...list].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [items]);

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">News</h1>
        <p className="text-gray-600 mb-10">All announcements and updates from SoAI.</p>
        {loading && <p className="text-gray-500">Loading news…</p>}
        {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
        <div className="grid grid-cols-1 gap-6">
          {sorted.map((n) => (
            <Card key={n.id} className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">{n.title}</CardTitle>
                <CardDescription>
                  {new Date(n.date).toLocaleDateString()} {n.source ? `· ${n.source}` : ''}
                </CardDescription>
              </CardHeader>
              {(n.summary || n.link) && (
                <CardContent>
                  {n.summary && (
                    <p className="text-gray-700 mb-3">{n.summary}</p>
                  )}
                  {n.link && (
                    <a href={n.link} className="text-[#ee7c01] hover:underline" target="_blank" rel="noreferrer">Read more</a>
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


