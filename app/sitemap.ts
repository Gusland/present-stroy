import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { buildObjects } from "@/data/objects";
import { news } from "@/data/news";
import { village } from "@/data/villages";

const BASE = "https://present-stroy.ru";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/about/sertifikaty`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE}/about/review`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/about/ipoteka`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/about/karta-obektov`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/services/stroitelstvo-chastnyh-domov-i-kottedzhey-iz-kirpicha`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/services/stroitelstvo-iz-gazosilikatnogo-bloka`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/services/remont-i-otdelka-kvartir-i-ofisov`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/services/mehanizirovannaya-shtukaturka-sten`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/services/elektromontazhnye-raboty`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/services/santehnicheskie-raboty`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/services/krovelnye-raboty`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/services/fasadnye-raboty`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/services/stroitelstvo-fundamenta`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/volzhsky-bereg`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/volzhsky-bereg/etapy`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/volzhsky-bereg/kottedzhi`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/volzhsky-bereg/plan`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${BASE}/projects`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/gallery`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/news`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/contacts`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${BASE}/projects/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const objectRoutes: MetadataRoute.Sitemap = buildObjects.map((o) => ({
    url: `${BASE}/about/karta-obektov/${o.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  const newsRoutes: MetadataRoute.Sitemap = news.map((n) => ({
    url: `${BASE}/news/${n.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const lotRoutes: MetadataRoute.Sitemap = village.lots.map((lot) => ({
    url: `${BASE}/volzhsky-bereg/lot/${lot.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: lot.status === "available" ? 0.9 : 0.5,
  }));

  return [...staticRoutes, ...projectRoutes, ...objectRoutes, ...newsRoutes, ...lotRoutes];
}
