"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import Placeholder from "@/components/ui/Placeholder";

const albums = [
  { id: "cottages", title: "Готовые коттеджи", count: 4 },
  { id: "apartment", title: "Ремонт квартир", count: 8 },
  { id: "cottage-repair", title: "Ремонт коттеджей", count: 6 },
  { id: "office", title: "Ремонт офисов", count: 5 },
  { id: "tile", title: "Укладка плитки (пол и стены)", count: 10 },
  { id: "electric", title: "Электрика", count: 7 },
  { id: "plumbing", title: "Сантехника", count: 6 },
  { id: "plaster", title: "Механизированная штукатурка", count: 8 },
  { id: "foundation", title: "Строительство фундаментов", count: 5 },
  { id: "roofing", title: "Кровельные работы", count: 6 },
  { id: "brick", title: "Кирпич и газосиликат", count: 7 },
];

export default function GalleryPage() {
  const [activeAlbum, setActiveAlbum] = useState<string | null>(null);

  const currentAlbum = albums.find((a) => a.id === activeAlbum);

  return (
    <>
      <section className="bg-primary py-24 pt-36">
        <Container>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Галерея</h1>
          <p className="text-white/70 text-xl max-w-2xl">
            Фотографии выполненных работ по категориям
          </p>
        </Container>
      </section>

      <section className="py-20 bg-white">
        <Container>
          {activeAlbum ? (
            <>
              {/* Album view */}
              <div className="flex items-center gap-3 mb-8">
                <button
                  onClick={() => setActiveAlbum(null)}
                  className="flex items-center gap-2 text-muted hover:text-accent transition-colors text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Все альбомы
                </button>
                <span className="text-border">/</span>
                <span className="font-semibold text-primary">{currentAlbum?.title}</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {Array.from({ length: currentAlbum?.count ?? 8 }, (_, i) => (
                  <div
                    key={i}
                    className="aspect-square overflow-hidden border border-border hover:border-accent transition-colors cursor-pointer group"
                  >
                    <Placeholder
                      className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                      label={`Фото ${i + 1}`}
                    />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              {/* Albums grid */}
              <h2 className="text-2xl font-bold text-primary mb-8">Альбомы</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {albums.map((album) => (
                  <button
                    key={album.id}
                    onClick={() => setActiveAlbum(album.id)}
                    className="group text-left border border-border hover:border-accent transition-all duration-300 hover:shadow-md overflow-hidden"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <Placeholder
                        className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-primary group-hover:text-accent transition-colors text-sm leading-snug">
                        {album.title}
                      </h3>
                      <p className="text-muted text-xs mt-1">{album.count} фото</p>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </Container>
      </section>
    </>
  );
}
