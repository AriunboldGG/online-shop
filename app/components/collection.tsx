"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import {
  categories,
  colors,
  getSeason,
  seasons,
  type CategoryId,
  type ColorId,
  type Product,
  type SeasonId,
} from "@/lib/catalog";
import { CloseIcon } from "./icons";
import { useLine } from "./line-flood";
import { HangingProduct } from "./hanging-product";
import { ProductModule } from "./product-module";
import { seasonDoodles } from "./season-doodles";
import { HereDot, LineBadge, Sample } from "./signage";

type PriceId = "all" | "under50" | "50to150" | "150to300" | "over300";
type SortId = "featured" | "price-asc" | "price-desc" | "name";

const prices: { id: PriceId; label: string; min: number; max: number }[] = [
  { id: "all", label: "Бүх үнэ", min: 0, max: Infinity },
  { id: "under50", label: "₮50 мянга хүртэл", min: 0, max: 50000 },
  { id: "50to150", label: "₮50–150 мянга", min: 50000, max: 150000 },
  { id: "150to300", label: "₮150–300 мянга", min: 150000, max: 300000 },
  { id: "over300", label: "₮300 мянгаас дээш", min: 300000, max: Infinity },
];

const sorts: { id: SortId; label: string }[] = [
  { id: "featured", label: "Онцлох" },
  { id: "price-asc", label: "Үнэ: багаас их" },
  { id: "price-desc", label: "Үнэ: ихээс бага" },
  { id: "name", label: "Нэрээр (А–Я)" },
];

const letterSizes = ["XS", "S", "M", "L", "XL", "XXL"];

type Filters = {
  category: CategoryId | "all";
  line: SeasonId | "all";
  price: PriceId;
  sizes: string[];
  colors: ColorId[];
};

const EMPTY: Filters = { category: "all", line: "all", price: "all", sizes: [], colors: [] };

function matches(p: Product, f: Filters, skip?: keyof Filters) {
  const range = prices.find((r) => r.id === f.price)!;
  return (
    (skip === "category" || f.category === "all" || p.category === f.category) &&
    (skip === "line" || f.line === "all" || p.seasons.includes(f.line)) &&
    (skip === "price" || (p.price >= range.min && p.price < range.max)) &&
    (skip === "sizes" || f.sizes.length === 0 || p.sizes.some((s) => f.sizes.includes(s))) &&
    (skip === "colors" || f.colors.length === 0 || p.colors.some((c) => f.colors.includes(c)))
  );
}

function sortProducts(list: Product[], sort: SortId) {
  const sorted = [...list];
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "name":
      return sorted.sort((a, b) => a.name.localeCompare(b.name, "mn"));
    default:
      // New arrivals first, sold-out items stay visible at the end of the line.
      return sorted.sort(
        (a, b) =>
          Number(a.soldOut) - Number(b.soldOut) || Number(b.badge === "new") - Number(a.badge === "new"),
      );
  }
}

const toggle = <T,>(list: T[], value: T) =>
  list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

// One collection for every list of products. On a season page the rail is that line's stations;
// on a category page the station is fixed and the rail becomes the lines that stop there;
// on the shop and search pages the stations ride the rail and the lines move into the filters.
export function Collection({
  products,
  season,
  rail = "category",
  label = "Бараа",
  look = "module",
}: {
  products: Product[];
  season?: SeasonId;
  rail?: "category" | "line";
  label?: string;
  // "hang" strings the results on wire, row by row; the columns butt together so each row is one line.
  look?: "module" | "hang";
}) {
  const running = useLine();
  const line = season ? getSeason(season) : null;
  const Signature = seasonDoodles[season ?? running].signature;
  const lineFilter = !season && rail === "category";
  const [filters, setFilters] = useState<Filters>(EMPTY);
  const [sort, setSort] = useState<SortId>("featured");
  const [sheetOpen, setSheetOpen] = useState(false);
  const sortId = useId();

  const results = useMemo(
    () => sortProducts(products.filter((p) => matches(p, filters)), sort),
    [products, filters, sort],
  );

  const sizeOptions = useMemo(() => {
    const all = [...new Set(products.flatMap((p) => p.sizes))];
    const letters = letterSizes.filter((s) => all.includes(s));
    const numbers = all.filter((s) => !letterSizes.includes(s)).sort((a, b) => Number(a) - Number(b));
    return [...letters, ...numbers];
  }, [products]);

  const colorOptions = useMemo(
    () => (Object.keys(colors) as ColorId[]).filter((c) => products.some((p) => p.colors.includes(c))),
    [products],
  );

  const count = (f: Filters, skip: keyof Filters) => products.filter((p) => matches(p, f, skip)).length;
  const activeCount =
    (filters.price !== "all" ? 1 : 0) +
    (lineFilter && filters.line !== "all" ? 1 : 0) +
    filters.sizes.length +
    filters.colors.length;

  const chips = [
    ...(filters.category !== "all"
      ? [{ key: "cat", label: categories.find((c) => c.id === filters.category)!.name, clear: { category: "all" as const } }]
      : []),
    ...(filters.line !== "all"
      ? [{ key: "line", label: `${getSeason(filters.line).of} улирал`, clear: { line: "all" as const } }]
      : []),
    ...(filters.price !== "all"
      ? [{ key: "price", label: prices.find((p) => p.id === filters.price)!.label, clear: { price: "all" as const } }]
      : []),
    ...filters.sizes.map((s) => ({ key: `s-${s}`, label: `Хэмжээ ${s}`, clear: { sizes: filters.sizes.filter((x) => x !== s) } })),
    ...filters.colors.map((c) => ({ key: `c-${c}`, label: colors[c].name, clear: { colors: filters.colors.filter((x) => x !== c) } })),
  ];

  const fieldProps = { filters, setFilters, products, sizeOptions, colorOptions, count, lineFilter };

  return (
    <section aria-label={line ? `${line.of} цуглуулга` : label} className="mx-auto max-w-6xl px-4 pb-16 pt-6">
      {rail === "category" ? (
        <RailFilter
          title="Ангилал"
          stops={[{ id: "all", name: "Бүгд" }, ...categories]}
          value={filters.category}
          onChange={(category) => setFilters((f) => ({ ...f, category: category as Filters["category"] }))}
          counts={Object.fromEntries(
            [{ id: "all" }, ...categories].map((c) => [
              c.id,
              products.filter((p) => matches(p, { ...filters, category: c.id as Filters["category"] })).length,
            ]),
          )}
          rail={line?.color ?? "var(--line)"}
        />
      ) : (
        // A transfer station: the rail carries every line that stops here, each ring in its own colour.
        <RailFilter
          title="Улирал"
          stops={[{ id: "all", name: "Бүгд", color: "var(--color-ink)" }, ...seasons.map((s) => ({ id: s.id, name: s.name, color: s.color }))]}
          value={filters.line}
          onChange={(id) => setFilters((f) => ({ ...f, line: id as Filters["line"] }))}
          counts={Object.fromEntries(
            [{ id: "all" }, ...seasons].map((s) => [
              s.id,
              products.filter((p) => matches(p, { ...filters, line: s.id as Filters["line"] })).length,
            ]),
          )}
          rail={`linear-gradient(90deg, var(--color-ink) 0 12.5%, ${seasons
            .map((s, i) => `${s.color} ${12.5 + i * 25}% ${37.5 + i * 25}%`)
            .join(", ")})`}
        />
      )}

      <div className="mt-8 lg:grid lg:grid-cols-[15rem_1fr] lg:gap-10">
        <aside aria-label="Шүүлтүүр" className="hidden lg:block">
          <div className="sticky top-24">
            <FilterFields {...fieldProps} />
          </div>
        </aside>

        <div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-display text-lg font-bold tabular" aria-live="polite">
              {results.length} бараа
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSheetOpen(true)}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border-[3px] border-ink px-4 font-semibold lg:hidden"
              >
                Шүүлтүүр
                {activeCount > 0 && (
                  <span className="flood grid min-w-6 place-items-center rounded-full px-1.5 text-xs font-bold text-white tabular">
                    {activeCount}
                  </span>
                )}
              </button>
              <label htmlFor={sortId} className="sr-only">
                Эрэмбэлэх
              </label>
              <select
                id={sortId}
                value={sort}
                onChange={(e) => setSort(e.target.value as SortId)}
                className="min-h-11 appearance-none rounded-full border-[3px] border-ink bg-paper bg-[length:14px] bg-[right_14px_center] bg-no-repeat py-0 pl-4 pr-10 font-semibold"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%231d1d1f' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
                }}
              >
                {sorts.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {chips.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Идэвхтэй шүүлтүүр">
              {chips.map((chip) => (
                <li key={chip.key}>
                  <button
                    type="button"
                    onClick={() => setFilters((f) => ({ ...f, ...chip.clear }))}
                    aria-label={`${chip.label} шүүлтүүрийг арилгах`}
                    className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-platform pl-3.5 pr-2.5 text-sm font-semibold hover:bg-rule"
                  >
                    {chip.label}
                    <CloseIcon size={16} />
                  </button>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => setFilters(EMPTY)}
                  className="min-h-10 px-2 text-sm font-semibold underline"
                >
                  Бүгдийг арилгах
                </button>
              </li>
            </ul>
          )}

          <p className="mt-3 flex flex-wrap items-center gap-2 text-sm text-ink-soft">
            Бараа, үнэ, хэмжээ, өнгө бүгд жишээ. <Sample />
          </p>

          {results.length === 0 ? (
            <div className="mt-8 overflow-hidden rounded-[28px] border-[3px] border-ink px-6 pb-12 pt-10 text-center">
              <div aria-hidden="true" className="relative mx-auto mb-6 h-24 max-w-xs">
                <Signature className="absolute left-1/2 top-0 w-16 -translate-x-1/2" />
                <span className="flood absolute inset-x-0 bottom-3 h-2.5 rounded-full" />
                <span className="absolute bottom-0 left-[20%] size-8 rounded-full border-[5px] border-[var(--line)] bg-paper" />
                <span className="absolute bottom-0 right-[20%] size-8 rounded-full border-[5px] border-[var(--line)] bg-paper" />
              </div>
              <p className="font-display text-xl font-bold">Энэ буудал дээр бараа алга</p>
              <p className="mx-auto mt-2 max-w-[40ch] text-ink-soft">
                {line
                  ? `Сонгосон шүүлтүүрт тохирох бараа ${line.of} улиралд алга. Шүүлтүүрээ цөөлөх эсвэл өөр улиралаар аялаад үзээрэй.`
                  : "Сонгосон шүүлтүүрт тохирох бараа алга. Шүүлтүүрээ цөөлөөд үзээрэй."}
              </p>
              <button
                type="button"
                onClick={() => setFilters(EMPTY)}
                className="flood mt-6 min-h-12 rounded-full px-6 font-semibold text-white"
              >
                Шүүлтүүр арилгах
              </button>
            </div>
          ) : (
            <ul
              key={JSON.stringify(filters) + sort}
              className={`settle mt-6 grid grid-cols-2 md:grid-cols-3 ${
                look === "hang" ? "gap-y-12 lg:mt-8 lg:gap-y-16" : "gap-3 lg:gap-5"
              }`}
            >
              {results.map((p) => (
                <li key={p.id} className="flex">
                  {look === "hang" ? <HangingProduct product={p} /> : <ProductModule product={p} on={season} />}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <FilterSheet open={sheetOpen} onClose={() => setSheetOpen(false)} resultCount={results.length}>
        <FilterFields {...fieldProps} />
      </FilterSheet>
    </section>
  );
}

// The rail is the filter: each stop is an option, "you are here" marks the active one.
function RailFilter({
  title,
  stops,
  value,
  onChange,
  counts,
  rail,
}: {
  title: string;
  stops: { id: string; name: string; color?: string }[];
  value: string;
  onChange: (v: string) => void;
  counts: Record<string, number>;
  rail: string;
}) {
  return (
    <div className="rounded-[28px] border-[3px] border-ink bg-paper px-3 pb-3 pt-5 sm:px-6">
      <h2 className="sr-only">{title}</h2>
      <div className="relative">
        <div aria-hidden="true" className="absolute inset-x-[10%] top-4.5 h-2.5 rounded-full" style={{ background: rail }} />
        <ul className="relative grid grid-cols-5">
          {stops.map((stop) => {
            const active = value === stop.id;
            const empty = counts[stop.id] === 0;
            return (
              <li key={stop.id}>
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => onChange(stop.id)}
                  className={`flex w-full flex-col items-center gap-2 rounded-2xl px-1 pb-1 pt-1 text-center ${
                    empty && !active ? "text-ink-soft" : ""
                  }`}
                >
                  <span className="grid h-10 place-items-center">
                    {active ? (
                      <HereDot />
                    ) : (
                      <span
                        className="block size-6 rounded-full border-[5px] bg-paper"
                        style={{ borderColor: empty ? "var(--color-rule)" : (stop.color ?? rail) }}
                      />
                    )}
                  </span>
                  <span className={`text-xs leading-tight sm:text-sm ${active ? "font-bold" : "font-semibold"}`}>
                    {stop.name}
                  </span>
                  <span className="text-xs text-ink-soft tabular">{counts[stop.id]}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

type FieldProps = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  products: Product[];
  sizeOptions: string[];
  colorOptions: ColorId[];
  count: (f: Filters, skip: keyof Filters) => number;
  lineFilter: boolean;
};

function FilterFields({ filters, setFilters, products, sizeOptions, colorOptions, lineFilter }: FieldProps) {
  const priceCount = (id: PriceId) => products.filter((p) => matches(p, { ...filters, price: id })).length;
  const sizeCount = (s: string) => products.filter((p) => matches(p, { ...filters, sizes: [s] })).length;
  const colorCount = (c: ColorId) => products.filter((p) => matches(p, { ...filters, colors: [c] })).length;
  const lineCount = (id: Filters["line"]) => products.filter((p) => matches(p, { ...filters, line: id })).length;

  return (
    <div className="space-y-8">
      {lineFilter && (
        <fieldset>
          <legend className="font-display text-base font-bold">Улирал</legend>
          <ul className="mt-3 space-y-1">
            {[{ id: "all" as const, name: "Бүх улирал" }, ...seasons].map((s) => {
              const active = filters.line === s.id;
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    aria-pressed={active}
                    onClick={() => setFilters((f) => ({ ...f, line: s.id }))}
                    className={`flex min-h-12 w-full items-center gap-3 rounded-xl px-2 text-left ${
                      active ? "bg-platform font-bold" : "hover:bg-platform"
                    }`}
                  >
                    {s.id === "all" ? (
                      <span aria-hidden="true" className="grid size-7 shrink-0 place-items-center">
                        <span className="size-5 rounded-full border-[4px] border-ink bg-paper" />
                      </span>
                    ) : (
                      <LineBadge season={s.id} size={28} />
                    )}
                    <span className="flex-1">{s.name}</span>
                    <span className="text-sm text-ink-soft tabular">{lineCount(s.id)}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </fieldset>
      )}

      {/* Price as fare zones: stops on a short rail. The chosen zone floods; the black dot stays with the station. */}
      <fieldset>
        <legend className="font-display text-base font-bold">Үнийн бүс</legend>
        <ul className="relative mt-3">
          <span aria-hidden="true" className="flood absolute bottom-7 left-2 top-7 w-2 rounded-full" />
          {prices.map((range) => {
            const active = filters.price === range.id;
            return (
              <li key={range.id} className="relative">
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilters((f) => ({ ...f, price: range.id }))}
                  className={`flex min-h-14 w-full items-center gap-3 rounded-xl pr-3 text-left ${
                    active ? "font-bold" : "hover:bg-platform"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`relative size-6 shrink-0 rounded-full border-[5px] border-(--line) ${active ? "flood" : "bg-paper"}`}
                  />
                  <span className="flex-1 whitespace-nowrap tabular">{range.label}</span>
                  <span className="text-sm text-ink-soft tabular">{priceCount(range.id)}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </fieldset>

      {sizeOptions.length > 0 && (
        <fieldset>
          <legend className="font-display text-base font-bold">Хэмжээ</legend>
          <p className="mt-1 text-sm text-ink-soft">
            Хувцас S–XL, гутал миллиметрээр (230–290). Тавилга, гэр ахуйн бараанд хэмжээ байхгүй.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {sizeOptions.map((s) => {
              const active = filters.sizes.includes(s);
              const none = sizeCount(s) === 0;
              return (
                <button
                  key={s}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilters((f) => ({ ...f, sizes: toggle(f.sizes, s) }))}
                  className={`grid min-h-11 min-w-11 place-items-center rounded-xl border-[3px] px-2 font-semibold tabular ${
                    active ? "flood border-ink text-white" : none ? "border-rule text-ink-soft" : "border-ink hover:bg-platform"
                  }`}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </fieldset>
      )}

      <fieldset>
        <legend className="font-display text-base font-bold">Өнгө</legend>
        <div className="mt-3 grid grid-cols-2 gap-1">
          {colorOptions.map((c) => {
            const active = filters.colors.includes(c);
            return (
              <button
                key={c}
                type="button"
                aria-pressed={active}
                onClick={() => setFilters((f) => ({ ...f, colors: toggle(f.colors, c) }))}
                className={`flex min-h-11 items-center gap-2.5 rounded-xl px-2 text-left text-sm ${
                  active ? "bg-platform font-bold" : "hover:bg-platform"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`size-7 shrink-0 rounded-full border-2 ${active ? "border-ink ring-2 ring-ink ring-offset-2" : "border-ink/40"}`}
                  style={{ background: colors[c].hex }}
                />
                <span className="min-w-0 flex-1">{colors[c].name}</span>
                <span className="text-xs text-ink-soft tabular">{colorCount(c)}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <button
        type="button"
        onClick={() => setFilters(EMPTY)}
        className="min-h-11 font-semibold underline"
      >
        Бүх шүүлтүүр арилгах
      </button>
    </div>
  );
}

function FilterSheet({
  open,
  onClose,
  resultCount,
  children,
}: {
  open: boolean;
  onClose: () => void;
  resultCount: number;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      aria-labelledby="filter-title"
      className="m-0 mt-auto max-h-[88dvh] w-full max-w-none bg-transparent p-0 backdrop:bg-ink/50 lg:hidden"
    >
      <div className="sheet-in flex max-h-[88dvh] flex-col overflow-hidden rounded-t-[28px] border-t-[3px] border-ink bg-paper">
        <div aria-hidden="true" className="flood h-2.5" />
        <div className="flex items-center justify-between px-4 py-3">
          <h2 id="filter-title" className="font-display text-xl font-bold">
            Шүүлтүүр
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Шүүлтүүр хаах"
            className="grid size-11 place-items-center rounded-full hover:bg-platform"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="overflow-y-auto px-4 pb-4">{children}</div>
        <div className="border-t-[3px] border-ink p-4">
          <button
            type="button"
            onClick={onClose}
            className="flood min-h-13 w-full rounded-full font-semibold text-white"
          >
            {resultCount} бараа харах
          </button>
        </div>
      </div>
    </dialog>
  );
}
