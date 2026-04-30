const BASE = "https://present-stroy.ru";

export type BuildObject = {
  slug: string;
  name: string;
  address: string;
  image: string;
  projectSlug?: string;
  specs?: {
    жилая?: number;
    общая?: number;
    этажность?: number;
    высота?: number;
  };
};

export const buildObjects: BuildObject[] = [
  {
    slug: "dom-simfoniya",
    name: "Симфония",
    address: "Московская обл., г.о Ступино, с. Шугарово",
    image: `${BASE}/netcat_files/121/237/1_2_.jpg`,
    projectSlug: "simfoniya",
    specs: { жилая: 102.32, общая: 165.93, этажность: 2, высота: 6.942 },
  },
  {
    slug: "dom-flagman",
    name: "Флагман",
    address: "Тверская обл., Калининский р-н, дер. Палкино",
    image: `${BASE}/netcat_files/121/237/06_20_AS_22_3.jpg`,
    projectSlug: "flagman",
    specs: { жилая: 120, общая: 125.38, этажность: 2, высота: 9.892 },
  },
  {
    slug: "dom-mayami",
    name: "Майами",
    address: "Тверская обл., Конаковский р-н, дер. Юрьево, ул. Речная, д. 12",
    image: `${BASE}/netcat_files/121/237/1_1__0.jpg`,
    projectSlug: "miami",
    specs: { жилая: 88.16, общая: 98.24, этажность: 1, высота: 5.213 },
  },
  {
    slug: "dom-garmoniya",
    name: "Гармония",
    address: "Тверская обл., Калининский р-н, дер. Иенево, ул. Ромашковая, д. 1",
    image: `${BASE}/netcat_files/121/237/IMG_5315.jpg`,
    projectSlug: "garmoniya",
    specs: { жилая: 127.75, общая: 150.75, этажность: 1, высота: 5.282 },
  },
  {
    slug: "dom-norvezhskiy",
    name: "Норвежский",
    address: "Тверская обл., Калининский р-н, дер. Иенево, ул. Ромашковая, д. 5",
    image: `${BASE}/netcat_files/121/237/5.jpg`,
    projectSlug: "norvezhskiy",
    specs: { жилая: 158.85, общая: 182.38, этажность: 1, высота: 5.98 },
  },
  {
    slug: "dom-uels",
    name: "Уэльс",
    address: "Тверская обл., Калининский р-н, у дер. Аксинькино",
    image: `${BASE}/netcat_files/generated/2193/2749/360x360/23/8ee2ed92e5bacaac51e5e6bc0fe73d6e.jpg`,
    projectSlug: "wales",
    specs: { жилая: 77.55, общая: 325.15, этажность: 2, высота: 8.15 },
  },
  {
    slug: "dom-skandinaviya-1",
    name: "Скандинавия",
    address: "Московская обл., г. Клин",
    image: `${BASE}/netcat_files/121/237/4_0.jpg`,
    projectSlug: "skandinavia",
    specs: { жилая: 162.13, общая: 318.27, этажность: 2, высота: 9.223 },
  },
  {
    slug: "dom-norvezhskiy-1",
    name: "Норвежский",
    address: "Тверская обл., Калининский р-н, дер. Иенево, ул. Ромашковая, д. 15",
    image: `${BASE}/netcat_files/121/237/2_1_.jpg`,
    projectSlug: "norvezhskiy",
    specs: { жилая: 158.85, общая: 182.38, этажность: 1, высота: 5.98 },
  },
  {
    slug: "dom-etyud",
    name: "Ирландия",
    address: "Тверская обл., Калининский р-н, дер. Иенево, ул. Ромашковая, д. 7",
    image: `${BASE}/netcat_files/121/237/1_2__1.jpg`,
    projectSlug: "irlandia",
    specs: { общая: 125, этажность: 1, высота: 6.138 },
  },
  {
    slug: "dom-irlandiya",
    name: "Ирландия",
    address: "Тверская обл., Калининский р-н, дер. Иенево, ул. Ромашковая, д. 7",
    image: `${BASE}/netcat_files/121/237/1_2__1.jpg`,
    projectSlug: "irlandia",
    specs: { общая: 125, этажность: 1, высота: 6.138 },
  },
  {
    slug: "dom-garmoniya-3",
    name: "Гармония",
    address: "Тверская обл., Калининский р-н, дер. Иенево, ул. Ромашковая, д. 11",
    image: `${BASE}/netcat_files/121/237/IMG_5315_1.jpg`,
    projectSlug: "garmoniya",
    specs: { жилая: 127.75, общая: 150.75, этажность: 1, высота: 5.282 },
  },
  {
    slug: "dom-garmoniya-4",
    name: "Гармония",
    address: "Тверская обл., Калининский р-н, дер. Иенево, ул. Ромашковая, д. 18",
    image: `${BASE}/netcat_files/121/237/IMG_5315_3.jpg`,
    projectSlug: "garmoniya",
    specs: { жилая: 127.75, общая: 150.75, этажность: 1, высота: 5.282 },
  },
  {
    slug: "dom-finlyandiya",
    name: "Финляндия",
    address: "Тверская обл., Калининский р-н, дер. Иенево, д. 57",
    image: `${BASE}/netcat_files/121/237/1.jpg`,
    projectSlug: "finlyandia",
    specs: { жилая: 51.2, общая: 89.29, этажность: 1, высота: 6.214 },
  },
  {
    slug: "dom-garmoniya-5",
    name: "Гармония",
    address: "Тверская обл., Калининский р-н, дер. Иенево, ул. Ромашковая, д. 20",
    image: `${BASE}/netcat_files/121/237/IMG_5315_2.jpg`,
    projectSlug: "garmoniya",
    specs: { жилая: 127.75, общая: 150.75, этажность: 1, высота: 5.282 },
  },
  {
    slug: "dom-irlandiya-1",
    name: "Ирландия",
    address: "Тверская обл., Калининский р-н, дер. Иенево, ул. Ромашковая, д. 4",
    image: `${BASE}/netcat_files/121/237/1_2__2.jpg`,
    projectSlug: "irlandia",
    specs: { общая: 125, этажность: 1, высота: 6.138 },
  },
  {
    slug: "dom-garmoniya-2",
    name: "Гармония",
    address: "Тверская обл., Калининский р-н, дер. Иенево, ул. Ромашковая, д. 3",
    image: `${BASE}/netcat_files/121/237/IMG_5315_0.jpg`,
    projectSlug: "garmoniya",
    specs: { жилая: 127.75, общая: 150.75, этажность: 1, высота: 5.282 },
  },
  {
    slug: "dom-tiramisu-1",
    name: "Тирамису",
    address: "Тверская обл., Калининский р-н, дер. Иенево, ул. Ромашковая, д. 13",
    image: `${BASE}/netcat_files/121/237/1_3__0.jpg`,
    projectSlug: "tiramisu",
    specs: { жилая: 114.21, общая: 120.37, этажность: 1, высота: 5.988 },
  },
  {
    slug: "dom-simfoniya-1",
    name: "Симфония",
    address: "Тверская обл., г. Конаково",
    image: `${BASE}/netcat_files/121/237/1_2__0.jpg`,
    projectSlug: "simfoniya",
    specs: { жилая: 102.32, общая: 165.93, этажность: 2, высота: 6.942 },
  },
  {
    slug: "dom-garmoniya-1",
    name: "Гармония",
    address: "Тверская обл., Калининский р-н, дер. Иенево, ул. Ромашковая, д. 6",
    image: `${BASE}/netcat_files/121/237/IMG_5324.jpg`,
    projectSlug: "garmoniya",
    specs: { жилая: 127.75, общая: 150.75, этажность: 1, высота: 5.282 },
  },
  {
    slug: "dom-adazhio",
    name: "Адажио",
    address: "Тверская обл., Калининский р-н, дер. Палкино, д. 17",
    image: `${BASE}/netcat_files/121/237/1_0.jpg`,
    projectSlug: "adagio",
    specs: { жилая: 129.97, общая: 138.01, этажность: 2, высота: 7.51 },
  },
  {
    slug: "dom-ambassador",
    name: "Амбассадор",
    address: "Тверская обл., Конаковский р-н, пос. Екатериновка, ул. Миллионная, уч. 195",
    image: `${BASE}/netcat_files/121/237/7.jpg`,
    projectSlug: "ambassador",
    specs: { жилая: 43.96, общая: 195.56, этажность: 2 },
  },
  {
    slug: "dom-skandinaviya",
    name: "Скандинавия",
    address: "Тверская обл., г. Торжок",
    image: `${BASE}/netcat_files/121/237/4.jpg`,
    projectSlug: "skandinavia",
    specs: { жилая: 162.13, общая: 318.27, этажность: 2, высота: 9.223 },
  },
  {
    slug: "dom-florida",
    name: "Флорида",
    address: "Тверская обл., Калининский р-н, дер. Кривцово",
    image: `${BASE}/netcat_files/121/237/1_4_.jpg`,
    projectSlug: "florida",
    specs: { жилая: 59.52, общая: 63.18, этажность: 1, высота: 5.248 },
  },
  {
    slug: "dom-kaliforniya",
    name: "Калифорния",
    address: "Тверская обл., Калининский р-н, дер. Иенево, д. 66",
    image: `${BASE}/netcat_files/121/237/1_5_.jpg`,
    projectSlug: "kaliforniya",
    specs: { общая: 325.15, этажность: 2, высота: 8.587 },
  },
];
