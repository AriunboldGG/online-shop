import products from "@/data/products.json";

export type SeasonId = "spring" | "summer" | "autumn" | "winter";
export type CategoryId = "furniture" | "clothing" | "shoes" | "home";
export type Badge = "new" | "low" | null;
export type ColorId = keyof typeof colors;

export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  category: CategoryId;
  seasons: SeasonId[];
  // Clothing S–XL; shoes in Korean millimetre sizing (230–290).
  sizes: string[];
  soldOutSizes: string[];
  // Furniture and home goods, W × D × H.
  dimensions: string | null;
  colors: ColorId[];
  badge: Badge;
  soldOut: boolean;
  image: string;
  placeholder: boolean;
};

export type Season = {
  id: SeasonId;
  line: number;
  name: string;
  // Genitive form, e.g. "Намрын улирал" (the autumn line).
  of: string;
  months: string;
  // Deep tone: actions, rails, rings, badges with white text.
  color: string;
  // Soft tone: large regions with ink text.
  soft: string;
};

export type Category = {
  id: CategoryId;
  station: number;
  name: string;
  image: string;
};

export const seasons: Season[] = [
  { id: "spring", line: 1, name: "Хавар", of: "Хаврын", months: "3–5 сар", color: "var(--color-spring)", soft: "var(--color-spring-soft)" },
  { id: "summer", line: 2, name: "Зун", of: "Зуны", months: "6–8 сар", color: "var(--color-summer)", soft: "var(--color-summer-soft)" },
  { id: "autumn", line: 3, name: "Намар", of: "Намрын", months: "9–11 сар", color: "var(--color-autumn)", soft: "var(--color-autumn-soft)" },
  { id: "winter", line: 4, name: "Өвөл", of: "Өвлийн", months: "12–2 сар", color: "var(--color-winter)", soft: "var(--color-winter-soft)" },
];

export const categories: Category[] = [
  { id: "furniture", station: 1, name: "Тавилга", image: "/products/photos/lounge-chair.jpg" },
  { id: "clothing", station: 2, name: "Хувцас", image: "/products/photos/knit-sweater.jpg" },
  { id: "shoes", station: 3, name: "Гутал", image: "/products/photos/ankle-boots.jpg" },
  { id: "home", station: 4, name: "Гэр ахуй", image: "/products/photos/mug-set.jpg" },
];

// Product colours as shoppers name them. Placeholder values until real product data exists.
export const colors = {
  black: { name: "Хар", hex: "#1d1d1f" },
  white: { name: "Цагаан", hex: "#ffffff" },
  grey: { name: "Саарал", hex: "#9a9a9e" },
  beige: { name: "Цайвар бор", hex: "#e7d8c3" },
  brown: { name: "Бор", hex: "#6b3a1e" },
  orange: { name: "Улбар шар", hex: "#d2691e" },
  yellow: { name: "Шар", hex: "#f2c14e" },
  pink: { name: "Ягаан", hex: "#ffb3c8" },
  green: { name: "Ногоон", hex: "#00795a" },
  blue: { name: "Цэнхэр", hex: "#2448c9" },
} as const;

// The line running now. Autumn and winter meet as a transfer station.
export const currentSeasons: SeasonId[] = ["autumn", "winter"];

export const catalog = products as Product[];

export function getSeason(id: SeasonId) {
  return seasons.find((s) => s.id === id)!;
}

export function findProduct(slug: string) {
  return catalog.find((p) => p.slug === slug);
}

export function findSeason(slug: string) {
  return seasons.find((s) => s.id === slug);
}

export function getCategory(id: CategoryId) {
  return categories.find((c) => c.id === id)!;
}

// Station code reads as line-station, e.g. autumn clothing is "3-02".
export function stationCode(product: Product, on: SeasonId = product.seasons[0]) {
  const line = getSeason(on).line;
  const station = getCategory(product.category).station;
  return `${line}-${String(station).padStart(2, "0")}`;
}

export function findCategory(slug: string) {
  return categories.find((c) => c.id === slug);
}

// Every word must hit the product's name, category, season or a colour name, so
// "өвлийн гутал" narrows to winter shoes instead of everything winter plus every shoe.
export function searchCatalog(query: string) {
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];
  return catalog.filter((p) => {
    const haystack = [
      p.name,
      getCategory(p.category).name,
      ...p.seasons.flatMap((s) => [getSeason(s).name, getSeason(s).of]),
      ...p.colors.map((c) => colors[c].name),
    ]
      .join(" ")
      .toLowerCase();
    return words.every((w) => haystack.includes(w));
  });
}

const priceFormat = new Intl.NumberFormat("en-US");

export function formatPrice(value: number) {
  return `₮${priceFormat.format(value)}`;
}
