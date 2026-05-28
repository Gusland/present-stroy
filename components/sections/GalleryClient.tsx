"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";

const R = (folder: number, file: string) =>
  `https://present-stroy.ru/netcat_files/multifile/2460/${folder}/${file}`;

const ALBUMS = [
  {
    id: "cottages",
    title: "Готовые коттеджи",
    photos: [
      R(70, "WhatsApp_Image_2024_07_05_at_11.19.02_1_.jpeg"),
      R(70, "WhatsApp_Image_2024_07_05_at_11.19.02.jpeg"),
      R(70, "WhatsApp_Image_2024_07_05_at_11.19.03_3_.jpeg"),
      R(70, "WhatsApp_Image_2024_07_05_at_11.19.03.jpeg"),
      R(70, "WhatsApp_Image_2024_07_05_at_11.19.04_2_.jpeg"),
      R(70, "WhatsApp_Image_2024_07_05_at_11.19.04_4_.jpeg"),
      R(70, "WhatsApp_Image_2024_07_05_at_11.19.04_5_.jpeg"),
      R(70, "WhatsApp_Image_2024_07_05_at_11.19.04.jpeg"),
      R(71, "IMG_4712.jpg"), R(71, "IMG_4720.jpg"), R(71, "5.jpg"), R(71, "2_1_.jpg"), R(71, "IMG_5315.jpg"),
      R(72, "IMG_4708.jpg"), R(72, "1.jpg"), R(72, "5.jpg"), R(72, "IMG_4700.jpg"),
      R(73, "Kottedzh_s_mansardoy.jpg"), R(73, "8.jpg"), R(73, "7.jpg"), R(73, "IMG_4690.jpg"),
    ],
  },
  {
    id: "apartment",
    title: "Ремонт квартир",
    photos: [
      R(62, "WhatsApp_Image_2022_12_20_at_14.04.09.jpeg"),
      R(62, "WhatsApp_Image_2022_12_20_at_14.07.20_1_.jpeg"),
      R(62, "WhatsApp_Image_2022_12_20_at_14.07.20.jpeg"),
      R(62, "WhatsApp_Image_2023_02_10_at_15.21.06_1_.jpeg"),
      R(62, "WhatsApp_Image_2023_02_10_at_15.21.11.jpeg"),
      R(62, "_3_20210204_1177614562.jpg"), R(62, "_2_20210204_1730529426.jpg"),
      R(62, "_1_20210204_1563174618.jpg"), R(62, "_6_20171229_1867883933.jpg"),
      R(62, "_4_20171229_1520967104.jpg"), R(62, "_3_20171229_1779064199.jpg"),
      R(62, "_2_20171229_1151656259.jpg"), R(62, "_5_20171229_1200556616.jpg"),
      R(62, "_2_20230421_1962777843.jpg"), R(62, "WhatsApp_Image_2022_12_21_at_20.48.41_3_.jpeg"),
      R(62, "_3_20211021_1239504517.jpg"),
    ],
  },
  {
    id: "cottage-repair",
    title: "Ремонт коттеджей",
    photos: [
      R(61, "PHOTO_2023_07_19_12_05_40.jpg"), R(61, "PHOTO_2023_07_19_12_05_47.jpg"),
      R(61, "PHOTO_2023_07_19_12_05_48.jpg"), R(61, "_5_20230421_1167430436.jpg"),
      R(61, "_4_20230421_1372045414.jpg"), R(61, "_3_20230421_1721866308.jpg"),
      R(61, "_2_20230421_1523549044.jpg"), R(61, "_1_20230421_1833181656.jpg"),
      R(61, "_2_20211021_1184365129.jpg"), R(61, "_1_20211021_1281177189.jpeg"),
      R(61, "_3_20230421_1710699550.jpg"), R(61, "_1_20230421_1943297134.jpg"),
      R(61, "WhatsApp_Image_2023_02_10_at_15.21.jpg"),
      R(61, "WhatsApp_Image_2022_12_20_at_14.07.09_1_.jpeg"),
      R(61, "WhatsApp_Image_2022_12_20_at_14.07.08_2_.jpeg"),
    ],
  },
  {
    id: "office",
    title: "Ремонт офисов",
    photos: [
      R(77, "_1_20211021_1787569284.webp"), R(77, "_2_20211021_1845570828.webp"),
      R(77, "_5_20211021_1582907147.webp"), R(77, "WhatsApp_Image_2023_04_05_at_10.53.09.jpg"),
    ],
  },
  {
    id: "tile",
    title: "Укладка плитки (пол и стены)",
    photos: [
      R(60, "image_02_04_24_10_15_5.webp"), R(60, "image_02_04_24_10_15.jpeg"),
      R(60, "image_02_04_24_10_15_1.jpeg"), R(60, "image_02_04_24_10_15_4.jpeg"),
      R(60, "WhatsApp_Image_2023_02_03_at_12.40.42.jpeg"),
      R(60, "WhatsApp_Image_2023_02_10_at_15.09.37_1_.jpeg"),
      R(60, "WhatsApp_Image_2023_02_13_at_14.28.17.jpeg"),
    ],
  },
  {
    id: "electric",
    title: "Электрика",
    photos: [
      R(68, "IMG_5089.jpg"), R(68, "IMG_5621.jpg"), R(68, "IMG_5789.jpg"),
      R(68, "IMG_5791.jpg"), R(68, "WhatsApp_Image_2022_12_20_at_14.07.20.jpeg"),
      R(68, "WhatsApp_Image_2023_02_10_at_15.21.11.jpeg"),
    ],
  },
  {
    id: "plumbing",
    title: "Сантехника",
    photos: [
      R(65, "_1_20210204_1296912105.jpg"), R(65, "_2_20210204_1428025360.jpg"),
      R(65, "_3_20210204_1211593084.jpg"), R(65, "_4_20210204_1856525063.jpg"),
      R(65, "_5_20210204_1313504508.jpg"), R(65, "_6_20210204_1308325458.jpg"),
      R(65, "IMG_6476.jpg"), R(65, "IMG_6479.jpg"), R(65, "IMG_6482.jpg"),
    ],
  },
  {
    id: "plaster",
    title: "Механизированная штукатурка",
    photos: [
      R(64, "WhatsApp_Image_2024_07_18_at_15.04.05.jpeg"),
      R(64, "_4_20211023_1832157120.jpg"), R(64, "_3_20211023_1719464961.jpg"),
      R(64, "_7_20211023_1691735285.jpg"), R(64, "_6_20211023_1493903957.jpg"),
      R(64, "_5_20211023_2031945651.jpg"), R(64, "_4_20211023_1860419045.jpg"),
      R(64, "_1_20211023_1394497113.jpg"),
      R(64, "WhatsApp_Image_2024_07_18_at_15.04.05_3_.jpeg"),
      R(64, "WhatsApp_Image_2024_07_18_at_15.04.05_2_.jpeg"),
      R(64, "WhatsApp_Image_2024_07_18_at_15.04.05_1_.jpeg"),
    ],
  },
  {
    id: "foundation",
    title: "Строительство фундаментов",
    photos: [
      R(66, "WhatsApp_Image_2024_07_09_at_14.44.09_0.jpeg"),
      R(66, "_1_20210617_2015007083.jpg"), R(66, "_4_20210617_1392244397.jpg"),
      R(66, "_3_20210617_1825767958.jpg"), R(66, "_2_20210617_1378996227.jpg"),
      R(66, "_1_20210617_1980005341.jpg"), R(66, "PHOTO_2023_04_24_17_57_56.jpg"),
      R(66, "WhatsApp_Image_2023_04_17_at_12.05.22.jpeg"),
      R(66, "WhatsApp_Image_2024_07_09_at_14.44.09.jpeg"),
      R(66, "WhatsApp_Image_2024_07_09_at_14.44.10_1_.jpeg"),
      R(66, "WhatsApp_Image_2024_07_09_at_14.44.10.jpeg"),
      R(66, "WhatsApp_Image_2024_07_09_at_14.44.11_1_.jpeg"),
      R(66, "WhatsApp_Image_2024_07_09_at_14.44.12.jpeg"),
      R(66, "WhatsApp_Image_2024_07_09_at_14.44.13.jpeg"),
      R(66, "WhatsApp_Image_2024_07_09_at_14.44.11.jpeg"),
    ],
  },
  {
    id: "roofing",
    title: "Кровельные работы",
    photos: [
      R(67, "_1_20210204_1096245051.jpg"), R(67, "_5_20210204_1630365441.jpg"),
      R(67, "_2_20210204_1981802794.jpg"),
      R(67, "1c0ea160_906f_4ae2_a1ed_37b768ce84cc.jpg"),
      R(67, "3dcbf8a9_2911_466d_843b_0f38f25a48d4.jpg"),
      R(67, "78aef176_435c_4ef9_98f0_ade8c7df58b3.jpg"),
      R(67, "d9be111c_d175_4ee9_ac6f_61bb20079b02.jpg"),
      R(67, "IMG_5102.webp"), R(67, "IMG_5105.webp"),
      R(67, "krovlya.jpg"), R(67, "IMG_2047.jpg"),
    ],
  },
  {
    id: "brick",
    title: "Кирпич и газосиликат",
    photos: [
      R(78, "a8b7f68a_9db4_4540_95bf_f0b1a70cd483.jpg"),
      R(78, "1efe51fc_3fe3_4891_b282_be1f8f6baeb5.jpg"),
      R(78, "7d3ef22b_3758_4402_b4e5_e19c9c2c46f0.jpg"),
      R(78, "7fa2d744_96e9_467e_a212_00bb411febb4.jpg"),
      R(78, "8b800327_7216_4820_8a45_a6d7c18fff0f.jpg"),
      R(78, "12fc3ba3_b196_4dcc_96d6_caac637a65f0.jpg"),
      R(78, "050d92b0_97f9_433c_b2f9_b4d9c03036bb.jpg"),
      R(78, "51df0581_01c4_4694_b673_0b1c86f6f07f.jpg"),
      R(78, "54cdca8b_1a72_44e4_90ba_04b8cbcd3797.jpg"),
      R(78, "63dbb7cc_8357_4173_9e9e_6f466b6b246c.jpg"),
      R(78, "90ae329c_e7c0_44a3_92f1_706e85a55a92.jpg"),
      R(78, "277b8de9_14cb_42ed_84d4_526baac5ab82.jpg"),
      R(78, "328a11e6_d932_4cce_8b90_4bcd4624bd47.jpg"),
      R(78, "58999e0d_50d1_465d_8f7e_7407ce4cc109.jpg"),
      R(78, "af92d4a9_37b1_4034_9434_7761d1560594.jpg"),
      R(78, "d3baa7fa_7ab3_41b6_a2c1_f95f97c32718.jpg"),
      R(78, "dec51200_70ef_4635_ac1e_ce963a703783.jpg"),
      R(78, "e7313389_928e_483c_9cc6_ecadf02dc852.jpg"),
      R(78, "f83c18bb_0201_43c7_a4cf_7bf84826dd20.jpg"),
      R(78, "15.jpg"),
      R(69, "WhatsApp_Image_2024_07_05_at_20.12.12.jpeg"),
      R(69, "WhatsApp_Image_2024_07_05_at_20.12.12_1_.jpeg"),
      R(69, "WhatsApp_Image_2024_07_05_at_20.12.56.jpeg"),
      R(69, "WhatsApp_Image_2024_07_05_at_20.12.12_2_.jpeg"),
      R(69, "WhatsApp_Image_2024_07_05_at_16.54.42_3_.jpeg"),
      R(69, "WhatsApp_Image_2024_07_05_at_16.53.19.jpeg"),
      R(69, "WhatsApp_Image_2024_07_05_at_20.13.49_1_.jpeg"),
      R(69, "Kottedzh_s_mansardoy.jpg"),
    ],
  },
];

export default function GalleryClient() {
  const [activeAlbumId, setActiveAlbumId] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const activeAlbum = ALBUMS.find((a) => a.id === activeAlbumId);
  const photos = activeAlbum?.photos ?? [];

  const prev = useCallback(
    () => setLightbox((i) => (i === null ? null : (i - 1 + photos.length) % photos.length)),
    [photos.length]
  );
  const next = useCallback(
    () => setLightbox((i) => (i === null ? null : (i + 1) % photos.length)),
    [photos.length]
  );
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

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  return (
    <>
      <section className="bg-primary py-24 pt-36">
        <Container>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Галерея</h1>
          <p className="text-white/70 text-xl max-w-2xl">Фотографии выполненных работ по категориям</p>
        </Container>
      </section>

      <section className="py-20 bg-white">
        <Container>
          {activeAlbumId ? (
            <>
              <div className="flex items-center gap-3 mb-8">
                <button
                  onClick={() => { setActiveAlbumId(null); setLightbox(null); }}
                  className="flex items-center gap-2 text-muted hover:text-accent transition-colors text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Все альбомы
                </button>
                <span className="text-border">/</span>
                <span className="font-semibold text-primary">{activeAlbum?.title}</span>
                <span className="text-muted text-sm ml-auto">{photos.length} фото</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {photos.map((src, i) => (
                  <button
                    key={src}
                    onClick={() => setLightbox(i)}
                    className="relative aspect-square overflow-hidden border border-border hover:border-accent transition-colors cursor-zoom-in group focus:outline-none focus:ring-2 focus:ring-accent"
                    aria-label={`Открыть фото ${i + 1}`}
                  >
                    <Image
                      src={src}
                      alt={`${activeAlbum?.title} — фото ${i + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-primary mb-8">Альбомы</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {ALBUMS.map((album) => (
                  <button
                    key={album.id}
                    onClick={() => setActiveAlbumId(album.id)}
                    className="group text-left border border-border hover:border-accent transition-all duration-300 hover:shadow-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-warm">
                      <Image
                        src={album.photos[0]}
                        alt={album.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-primary group-hover:text-accent transition-colors text-sm leading-snug">
                        {album.title}
                      </h3>
                      <p className="text-muted text-xs mt-1">{album.photos.length} фото</p>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </Container>
      </section>

      {lightbox !== null && photos.length > 0 && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          role="dialog" aria-modal="true" aria-label="Просмотр фото"
        >
          <button onClick={close} className="absolute top-4 right-4 text-white/70 hover:text-white p-2 focus:outline-none focus:ring-2 focus:ring-white" aria-label="Закрыть">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <button onClick={prev} className="absolute left-3 md:left-6 text-white/70 hover:text-white p-2 focus:outline-none focus:ring-2 focus:ring-white" aria-label="Предыдущее фото">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="max-w-5xl max-h-[90vh] w-full mx-16 relative">
            <Image src={photos[lightbox]} alt={`${activeAlbum?.title} — фото ${lightbox + 1}`} width={1200} height={800} className="object-contain max-h-[85vh] w-full" priority />
          </div>
          <button onClick={next} className="absolute right-3 md:right-6 text-white/70 hover:text-white p-2 focus:outline-none focus:ring-2 focus:ring-white" aria-label="Следующее фото">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            {lightbox + 1} / {photos.length}
          </div>
        </div>
      )}
    </>
  );
}
