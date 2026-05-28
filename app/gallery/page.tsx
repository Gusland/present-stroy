import type { Metadata } from "next";
import GalleryClient from "@/components/sections/GalleryClient";

export const metadata: Metadata = {
  title: "Галерея выполненных работ в Твери — Презент-Строй",
  description:
    "Фотогалерея строительных работ Презент-Строй в Твери: коттеджи, ремонт квартир и офисов, кровля, фасады, фундаменты, электрика, сантехника. 11 альбомов, 150+ фото.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return <GalleryClient />;
}
