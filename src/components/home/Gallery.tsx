import { useMemo, useState, useCallback, useEffect } from "react";
import { Pause, Play, X, ChevronLeft, ChevronRight } from "lucide-react";

type GalleryProps = {
  images: Array<{ src: string; alt?: string; caption?: string }>;
  speedMs?: number;
};

export default function Gallery({ images, speedMs = 30000 }: GalleryProps) {
  const [isPaused, setIsPaused] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const sequence = useMemo(() => [...images, ...images], [images]);

  const openLightbox = useCallback((index: number) => {
    // Normalize index to original image set
    setLightboxIndex(index % (images.length || 1));
    setIsPaused(true);
  }, [images.length]);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    setIsPaused(false);
  }, []);

  const showPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => {
      const next = (prev! - 1 + images.length) % images.length;
      return next;
    });
  }, [images.length, lightboxIndex]);

  const showNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => ((prev! + 1) % images.length));
  }, [images.length, lightboxIndex]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, closeLightbox, showPrev, showNext]);

  return (
    <div className="relative overflow-hidden">
      {/* Controls */}
      <div className="absolute right-3 top-3 z-10 flex gap-2">
        <button
          aria-label={isPaused ? "Play gallery" : "Pause gallery"}
          onClick={() => setIsPaused((v) => !v)}
          className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-black/40 text-white hover:bg-black/60 transition"
        >
          {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
        </button>
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 mask-fade-left" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 mask-fade-right" />

      <div
        className="flex gap-6 marquee"
        style={{ animationDuration: `${speedMs}ms`, animationPlayState: isPaused ? "paused" : "running" }}
      >
        {sequence.map((item, idx) => (
          <figure
            key={`${item.src}-${idx}`}
            className="shrink-0 w-[280px] h-[170px] sm:w-[340px] sm:h-[200px] rounded-xl overflow-hidden border bg-white/5 backdrop-blur-sm cursor-pointer"
            onClick={() => openLightbox(idx)}
            role="button"
            aria-label="Open image"
          >
            <img
              src={item.src}
              alt={item.alt ?? "Gallery image"}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </figure>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center">
          <button
            aria-label="Close"
            onClick={closeLightbox}
            className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/10 text-white hover:bg-white/20 inline-flex items-center justify-center"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            aria-label="Previous image"
            onClick={showPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/10 text-white hover:bg-white/20 inline-flex items-center justify-center"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            aria-label="Next image"
            onClick={showNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/10 text-white hover:bg-white/20 inline-flex items-center justify-center"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="max-w-5xl w-full px-6">
            <img
              src={images[lightboxIndex].src}
              alt={images[lightboxIndex].alt ?? "Gallery image"}
              className="w-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
              loading="eager"
            />
            {images[lightboxIndex].caption && (
              <figcaption className="mt-3 text-center text-white/80">
                {images[lightboxIndex].caption}
              </figcaption>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


