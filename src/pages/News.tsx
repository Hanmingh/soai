import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { newsItems } from "@/data/news";

export default function News() {
  const items = [...newsItems].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">News</h1>
        <p className="text-gray-600 mb-10">All announcements and updates from SoAI.</p>
        <div className="grid grid-cols-1 gap-6">
          {items.map((n) => (
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


