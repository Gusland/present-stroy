"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const R = (folder: number, file: string) =>
  `https://present-stroy.ru/netcat_files/multifile/2460/${folder}/${file}`;

export const STAGES = [
  {
    title: "1 этап строительства",
    photos: [
      R(79, "IMG_1533.jpg"),
      R(79, "IMG_1541.jpg"),
      R(79, "IMG_1553.jpg"),
      R(79, "IMG_1605.jpg"),
      R(79, "IMG_1606.jpg"),
      R(79, "IMG_1837.jpg"),
      R(79, "IMG_1851.jpg"),
      R(79, "IMG_2048.jpg"),
      R(79, "IMG_2564.jpg"),
      R(79, "IMG_2557.jpg"),
    ],
  },
  {
    title: "2 этап строительства эко-посёлка",
    photos: [
      "/images/villages/vb/photos/etap-2/1.jpg",
      "/images/villages/vb/photos/etap-2/2.jpg",
      "/images/villages/vb/photos/etap-2/3.jpg",
      "/images/villages/vb/photos/etap-2/4.jpg",
      "/images/villages/vb/photos/etap-2/5.jpg",
      "/images/villages/vb/photos/etap-2/6.jpg",
      "/images/villages/vb/photos/etap-2/7.jpg",
      "/images/villages/vb/photos/etap-2/8.jpg",
    ],
  },
  {
    title: "Фундамент. Начало строительства",
    photos: [
      R(59, "28507666_1db9_44a5_b011_2c8240b91720.jpg"),
      R(59, "ce666a2e_85b2_4b06_a7b1_19278bc7c01a.jpg"),
      R(59, "2.jpg"),
      R(59, "1.jpg"),
    ],
  },
  {
    title: "Кладка цоколя",
    photos: [
      R(57, "3cd631b5_635f_467a_9f4b_83d0c5668438.jpg"),
      R(57, "3d632328_268a_4ad6_983e_91f1e2e51d6a.jpg"),
      R(57, "828a856b_5944_442e_a8db_ce26ed981795.jpg"),
    ],
  },
  {
    title: "Кладка стен и перегородок",
    photos: [
      R(56, "1efe51fc_3fe3_4891_b282_be1f8f6baeb5.jpg"),
      R(56, "7d3ef22b_3758_4402_b4e5_e19c9c2c46f0.jpg"),
      R(56, "7fa2d744_96e9_467e_a212_00bb411febb4.jpg"),
      R(56, "8b800327_7216_4820_8a45_a6d7c18fff0f.jpg"),
      R(56, "12fc3ba3_b196_4dcc_96d6_caac637a65f0.jpg"),
      R(56, "050d92b0_97f9_433c_b2f9_b4d9c03036bb.jpg"),
      R(56, "51df0581_01c4_4694_b673_0b1c86f6f07f.jpg"),
      R(56, "54cdca8b_1a72_44e4_90ba_04b8cbcd3797.jpg"),
      R(56, "63dbb7cc_8357_4173_9e9e_6f466b6b246c.jpg"),
      R(56, "90ae329c_e7c0_44a3_92f1_706e85a55a92.jpg"),
      R(56, "277b8de9_14cb_42ed_84d4_526baac5ab82.jpg"),
      R(56, "328a11e6_d932_4cce_8b90_4bcd4624bd47.jpg"),
      R(56, "58999e0d_50d1_465d_8f7e_7407ce4cc109.jpg"),
      R(56, "a8b7f68a_9db4_4540_95bf_f0b1a70cd483.jpg"),
      R(56, "af92d4a9_37b1_4034_9434_7761d1560594.jpg"),
      R(56, "d3baa7fa_7ab3_41b6_a2c1_f95f97c32718.jpg"),
      R(56, "dec51200_70ef_4635_ac1e_ce963a703783.jpg"),
      R(56, "e7313389_928e_483c_9cc6_ecadf02dc852.jpg"),
      R(56, "f83c18bb_0201_43c7_a4cf_7bf84826dd20.jpg"),
      R(56, "15.jpg"),
    ],
  },
  {
    title: "Монтаж кровли",
    photos: [
      R(58, "1c0ea160_906f_4ae2_a1ed_37b768ce84cc.jpg"),
      R(58, "3dcbf8a9_2911_466d_843b_0f38f25a48d4.jpg"),
      R(58, "78aef176_435c_4ef9_98f0_ade8c7df58b3.jpg"),
      R(58, "370d40fb_28e9_4851_b70d_0a27406856e1.jpg"),
      R(58, "d9be111c_d175_4ee9_ac6f_61bb20079b02.jpg"),
      R(58, "14.jpg"),
      R(58, "13.jpg"),
    ],
  },
];

type LightboxState = { stageIdx: number; photoIdx: number } | null;

export default function EtapyStages() {
  const [lightbox, setLightbox] = useState<LightboxState>(null);

  const activeLb = lightbox;
  const activePhotos = activeLb !== null ? STAGES[activeLb.stageIdx].photos : [];

  const prev = useCallback(() => {
    if (!activeLb) return;
    setLightbox({
      stageIdx: activeLb.stageIdx,
      photoIdx: (activeLb.photoIdx - 1 + activePhotos.length) % activePhotos.length,
    });
  }, [activeLb, activePhotos.length]);

  const next = useCallback(() => {
    if (!activeLb) return;
    setLightbox({
      stageIdx: activeLb.stageIdx,
      photoIdx: (activeLb.photoIdx + 1) % activePhotos.length,
    });
  }, [activeLb, activePhotos.length]);

  const close = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, prev, next, close]);

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  return (
    <>
      <div className="space-y-16">
        {STAGES.map((stage, si) => (
          <div key={stage.title}>
            <h3 className="text-xl font-bold text-primary mb-4">{stage.title}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {stage.photos.map((src, pi) => (
                <button
                  key={src}
                  onClick={() => setLightbox({ stageIdx: si, photoIdx: pi })}
                  className="relative aspect-[4/3] overflow-hidden border border-border hover:border-accent transition-colors cursor-zoom-in group focus:outline-none focus:ring-2 focus:ring-accent"
                  aria-label={`${stage.title} — фото ${pi + 1}`}
                >
                  <Image
                    src={src}
                    alt={`${stage.title} — фото ${pi + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && activePhotos.length > 0 && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Просмотр фото"
        >
          <button
            onClick={close}
            className="absolute top-4 right-4 text-white/70 hover:text-white p-2 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Закрыть"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button
            onClick={prev}
            className="absolute left-3 md:left-6 text-white/70 hover:text-white p-2 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Предыдущее фото"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="max-w-5xl max-h-[90vh] w-full mx-16 relative">
            <Image
              src={activePhotos[lightbox.photoIdx]}
              alt={`${STAGES[lightbox.stageIdx].title} — фото ${lightbox.photoIdx + 1}`}
              width={1200}
              height={800}
              className="object-contain max-h-[85vh] w-full"
              priority
            />
          </div>

          <button
            onClick={next}
            className="absolute right-3 md:right-6 text-white/70 hover:text-white p-2 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Следующее фото"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            {lightbox.photoIdx + 1} / {activePhotos.length}
          </div>
        </div>
      )}
    </>
  );
}
