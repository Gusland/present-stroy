const BASE = "https://present-stroy.ru/netcat_files/multifile/2865";

export type ProjectSpec = {
  жилая?: number;
  застройка?: number;
  общая: number;
  объём?: number;
  этажность: number;
  высота?: number;
};

export type Project = {
  id: string;
  slug: string;
  name: string;
  area: number;
  images: string[];
  specs: ProjectSpec;
  featured: boolean;
};

export const projects: Project[] = [
  {
    id: "garmoniya",
    slug: "garmoniya",
    name: "Гармония",
    area: 150.75,
    images: ["1", "2", "3", "4", "5"].map((n) => `${BASE}/14/${n}.jpg`),
    specs: { жилая: 127.75, застройка: 181.15, общая: 150.75, объём: 918.85, этажность: 1, высота: 5.282 },
    featured: true,
  },
  {
    id: "norvezhskiy",
    slug: "norvezhskiy",
    name: "Норвежский",
    area: 182.38,
    images: ["1", "2", "3", "4", "5", "6"].map((n) => `${BASE}/15/${n}.jpg`),
    specs: { жилая: 158.85, застройка: 210.73, общая: 182.38, объём: 1238.44, этажность: 1, высота: 5.98 },
    featured: true,
  },
  {
    id: "simfoniya",
    slug: "simfoniya",
    name: "Симфония",
    area: 165.93,
    images: ["1", "2", "3", "4", "5", "6"].map((n) => `${BASE}/30/${n}.jpg`),
    specs: { жилая: 102.32, застройка: 143.67, общая: 165.93, объём: 730.47, этажность: 2, высота: 6.942 },
    featured: true,
  },
  {
    id: "kaliforniya",
    slug: "kaliforniya",
    name: "Калифорния",
    area: 323.19,
    images: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map((n) => `${BASE}/16/${n}.jpg`),
    specs: { общая: 323.19, этажность: 2, высота: 8.587 },
    featured: true,
  },
  {
    id: "flagman",
    slug: "flagman",
    name: "Флагман",
    area: 125.38,
    images: [
      `${BASE}/19/06_20_AS_22_3.jpg`,
      `${BASE}/19/06_20_AS_22_2.jpg`,
      `${BASE}/19/06_20_AS_22_1.jpg`,
      `${BASE}/19/06_20_AS_22.jpg`,
      `${BASE}/19/1.jpg`,
      `${BASE}/19/2.jpg`,
    ],
    specs: { жилая: 120, застройка: 86.3, общая: 125.38, этажность: 2, высота: 9.892 },
    featured: true,
  },
  {
    id: "florida",
    slug: "florida",
    name: "Флорида",
    area: 63.18,
    images: ["1", "2", "3", "4", "5"].map((n) => `${BASE}/20/${n}.jpg`),
    specs: { жилая: 59.52, застройка: 85, общая: 63.18, объём: 315.75, этажность: 1, высота: 5.248 },
    featured: false,
  },
  {
    id: "tiramisu",
    slug: "tiramisu",
    name: "Тирамису",
    area: 120.37,
    images: ["1", "2", "3", "4", "5"].map((n) => `${BASE}/21/${n}.jpg`),
    specs: { жилая: 114.21, застройка: 144, общая: 120.37, объём: 342.6, этажность: 1, высота: 5.988 },
    featured: false,
  },
  {
    id: "miami",
    slug: "miami",
    name: "Майами",
    area: 98.24,
    images: ["1", "2", "3", "4", "5"].map((n) => `${BASE}/22/${n}.jpg`),
    specs: { жилая: 88.16, застройка: 124.92, общая: 98.24, объём: 346.9, этажность: 1, высота: 5.213 },
    featured: false,
  },
  {
    id: "skandinavia",
    slug: "skandinavia",
    name: "Скандинавия",
    area: 318.27,
    images: ["1", "2", "3", "4", "5", "6", "7"].map((n) => `${BASE}/23/${n}.jpg`),
    specs: { жилая: 162.13, застройка: 252.9, общая: 318.27, объём: 2023.2, этажность: 2, высота: 9.223 },
    featured: false,
  },
  {
    id: "etud",
    slug: "etud",
    name: "Этюд",
    area: 182.38,
    images: [
      `${BASE}/24/1.jpg`,
      `${BASE}/24/2.jpg`,
      `${BASE}/24/3.jpg`,
      `${BASE}/24/3_0.jpg`,
      `${BASE}/24/4.jpg`,
      `${BASE}/24/5.jpg`,
    ],
    specs: { жилая: 158.85, застройка: 210.73, общая: 182.38, объём: 1238.44, этажность: 1, высота: 5.98 },
    featured: false,
  },
  {
    id: "ambassador",
    slug: "ambassador",
    name: "Амбассадор",
    area: 195.56,
    images: [
      `${BASE}/25/7.jpg`,
      `${BASE}/25/Ekaterinovka_31.jpg`,
      `${BASE}/25/Ekaterinovka_32.jpg`,
    ],
    specs: { жилая: 43.96, общая: 195.56, этажность: 2 },
    featured: false,
  },
  {
    id: "maestro",
    slug: "maestro",
    name: "Маэстро",
    area: 164.94,
    images: ["1", "2", "3"].map((n) => `${BASE}/26/${n}.jpg`),
    specs: { жилая: 88.29, застройка: 143.28, общая: 164.94, этажность: 2, высота: 9.251 },
    featured: false,
  },
  {
    id: "adagio",
    slug: "adagio",
    name: "Адажио",
    area: 138.01,
    images: ["1", "2", "3", "4", "5", "6"].map((n) => `${BASE}/27/${n}.jpg`),
    specs: { жилая: 129.97, застройка: 115.82, общая: 138.01, этажность: 2, высота: 7.51 },
    featured: false,
  },
  {
    id: "wales",
    slug: "wales",
    name: "Уэльс",
    area: 325.15,
    images: ["1", "2"].map((n) => `${BASE}/28/${n}.jpg`),
    specs: { жилая: 77.55, общая: 325.15, объём: 2127, этажность: 2, высота: 8.15 },
    featured: false,
  },
  {
    id: "libretto",
    slug: "libretto",
    name: "Либретто",
    area: 91.56,
    images: ["1", "2", "3", "4", "5"].map((n) => `${BASE}/29/${n}.jpg`),
    specs: { жилая: 53.6, застройка: 162.94, общая: 91.56, объём: 651.76, этажность: 1, высота: 5.666 },
    featured: false,
  },
  {
    id: "irlandia",
    slug: "irlandia",
    name: "Ирландия",
    area: 125,
    images: ["1", "2", "3", "4", "5"].map((n) => `${BASE}/31/${n}.jpg`),
    specs: { общая: 125, этажность: 1, высота: 6.138 },
    featured: false,
  },
  {
    id: "finlyandia",
    slug: "finlyandia",
    name: "Финляндия",
    area: 89.29,
    images: ["1", "2", "3", "4", "5"].map((n) => `${BASE}/32/${n}.jpg`),
    specs: { жилая: 51.2, застройка: 151.45, общая: 89.29, объём: 906.75, этажность: 1, высота: 6.214 },
    featured: false,
  },
];
