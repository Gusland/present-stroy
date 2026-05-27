"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { village } from "@/data/villages";

const PHOTOS = village.galleryPhotos;

export default function VillageGallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const prev = useCallback(() => {
    setLightbox((i) => (i === null ? null : (i - 1 + PHOTOS.length) % PHOTOS.length));
  }, []);

  const next = useCallback(() => {
    setLightbox((i) => (i === null ? null : (i + 1) % PHOTOS.length));
  }, []);

  const close = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, prev, next, close]);

  // Prevent scroll when lightbox is open
  useEffect(() => {
    if (lightbox !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  return (
    <section className="py-16 bg-white" id="gallery">
      <Container>
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-2">
              Фотогалерея
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-primary">
              Волжский Берег в кадре
            </h2>
          </div>
          <p className="text-muted text-sm hidden sm:block">{PHOTOS.length} фото</p>
        </div>

        {/* Masonry-style grid */}
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
          {PHOTOS.map((src, i) => (
            <button
              key={src}
              className="relative block w-full overflow-hidden border border-border hover:border-accent transition-colors cursor-zoom-in break-inside-avoid focus:outline-none focus:ring-2 focus:ring-accent"
              onClick={() => setLightbox(i)}
              aria-label={`Открыть фото ${i + 1}`}
            >
              <Image
                src={src}
                alt={`Волжский Берег — фото ${i + 1}`}
                width={400}
                height={300}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </Container>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Просмотр фото"
        >
          {/* Close */}
          <button
            onClick={close}
            className="absolute top-4 right-4 text-white/70 hover:text-white p-2 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Закрыть"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Prev */}
          <button
            onClick={prev}
            className="absolute left-3 md:left-6 text-white/70 hover:text-white p-2 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Предыдущее фото"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Image */}
          <div className="max-w-5xl max-h-[90vh] w-full mx-16 relative">
            <Image
              src={PHOTOS[lightbox]}
              alt={`Волжский Берег — фото ${lightbox + 1}`}
              width={1200}
              height={800}
              className="object-contain max-h-[85vh] w-full"
              priority
            />
          </div>

          {/* Next */}
          <button
            onClick={next}
            className="absolute right-3 md:right-6 text-white/70 hover:text-white p-2 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Следующее фото"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            {lightbox + 1} / {PHOTOS.length}
          </div>
        </div>
      )}
    </section>
  );
}
