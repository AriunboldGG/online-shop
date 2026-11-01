"use client";

import Link from "next/link";
import { useId, useRef, useState, type FormEvent } from "react";
import { colors, formatPrice, getSeason, type ColorId, type Product } from "@/lib/catalog";
import { useCart } from "../../components/cart";
import { ArrowIcon, ArrowLeftIcon, BagIcon, BellIcon, PlusIcon } from "../../components/icons";
import { LineBadge, RunningLamp, Sample } from "../../components/signage";

export type Neighbour = { slug: string; name: string; code: string };

const letterSizes = ["XS", "S", "M", "L", "XL", "XXL"];

// Placeholder measurements until the shop supplies real size charts.
const clothingChart = [
  { size: "S", chest: 92, length: 66 },
  { size: "M", chest: 100, length: 69 },
  { size: "L", chest: 108, length: 72 },
  { size: "XL", chest: 116, length: 75 },
];

const shoeChart = [
  { mm: 230, eu: "36" },
  { mm: 240, eu: "37–38" },
  { mm: 250, eu: "39" },
  { mm: 260, eu: "40–41" },
  { mm: 270, eu: "42" },
  { mm: 280, eu: "43–44" },
  { mm: 290, eu: "45" },
];

export function PurchasePanel({
  product,
  code,
  prev,
  next,
}: {
  product: Product;
  code: string;
  prev: Neighbour | null;
  next: Neighbour | null;
}) {
  const { add } = useCart();
  const line = getSeason(product.seasons[0]);
  const ids = useId();
  const sizeGroup = useRef<HTMLDivElement>(null);

  const [color, setColor] = useState<ColorId>(product.colors[0]);
  const [size, setSize] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState(false);

  const isShoe = product.category === "shoes";
  const unit = isShoe ? " мм" : "";
  const hasSizes = product.sizes.length > 0;
  const sizes = isShoe
    ? [...product.sizes].sort((a, b) => Number(a) - Number(b))
    : letterSizes.filter((s) => product.sizes.includes(s));
  const available = sizes.filter((s) => !product.soldOutSizes.includes(s));

  const addToCart = () => {
    if (hasSizes && !size) {
      setSizeError(true);
      sizeGroup.current?.querySelector<HTMLButtonElement>("button:not(:disabled)")?.focus();
      return;
    }
    add(product.id, { size: size ?? undefined, color });
  };

  return (
    <div className="flex flex-col gap-7">
      {/* The station sign: line band with this stop's code and its neighbours, then name, price, origin. */}
      <div className="overflow-hidden rounded-[28px] border-[3px] border-ink">
        <div className="flood-soft flex items-stretch border-b-[3px] border-ink">
          {prev ? (
            <Link
              href={`/product/${prev.slug}`}
              aria-label={`Өмнөх буудал ${prev.code}: ${prev.name}`}
              className="flex min-h-14 items-center gap-1.5 px-3 font-semibold tabular no-underline hover:bg-black/5"
            >
              <ArrowLeftIcon size={20} />
              <span className="text-sm sm:hidden">Өмнөх</span><span className="hidden max-w-[8rem] truncate text-sm sm:inline">{prev.name}</span>
            </Link>
          ) : (
            <span className="w-14" />
          )}
          <span className="flex shrink-0 grow items-center justify-center gap-2 whitespace-nowrap px-1 py-2">
            <span className="flood grid size-9 place-items-center rounded-full border-[3px] border-ink font-display text-base font-bold text-white tabular">
              {line.line}
            </span>
            <span className="font-display text-2xl font-extrabold tabular tracking-[-0.02em]">{code}</span>
          </span>
          {next ? (
            <Link
              href={`/product/${next.slug}`}
              aria-label={`Дараагийн буудал ${next.code}: ${next.name}`}
              className="flex min-h-14 items-center gap-1.5 px-3 font-semibold tabular no-underline hover:bg-black/5"
            >
              <span className="text-sm sm:hidden">Дараах</span><span className="hidden max-w-[8rem] truncate text-sm sm:inline">{next.name}</span>
              <ArrowIcon size={20} />
            </Link>
          ) : (
            <span className="w-14" />
          )}
        </div>
        <div className="bg-paper px-5 pb-5 pt-4">
          <h1 className="text-balance font-display text-3xl font-bold leading-[1.1] tracking-[-0.03em] lg:text-5xl">
            {product.name}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span className="font-display text-3xl font-extrabold tabular lg:text-4xl">{formatPrice(product.price)}</span>
            <Sample>Жишээ үнэ</Sample>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border-[3px] border-ink py-1 pl-1 pr-3.5 font-semibold">
              <span className="grid size-7 place-items-center rounded-full bg-ink font-display text-xs font-bold text-white">
                KR
              </span>
              Солонгосоос оруулж ирсэн
            </span>
            {product.soldOut ? (
              <span className="inline-flex items-center rounded-full bg-ink px-3.5 py-1.5 text-sm font-bold text-white">
                Бүх хэмжээ дууссан
              </span>
            ) : (
              <RunningLamp label={available.length < sizes.length ? "Зарим хэмжээ дууссан" : "Бэлэн байгаа"} />
            )}
          </div>
        </div>
      </div>

      {hasSizes ? (
        <fieldset className="min-w-0" aria-describedby={sizeError ? `${ids}-size-error` : `${ids}-size-hint`}>
          <legend className="font-display text-lg font-bold">
            Хэмжээ{isShoe && <span className="font-body font-semibold"> (мм)</span>}
            {size && (
              <span className="font-body font-semibold">
                : {size}
                {unit}
              </span>
            )}
          </legend>
          <p id={`${ids}-size-hint`} className="mt-1 text-sm text-ink-soft">
            {isShoe
              ? "Солонгос хэмжээ: хөлийн уртыг миллиметрээр. Хоосон, зураастай буудал дууссан."
              : "Хоосон, зураастай буудал дууссан."}
            {isShoe && sizes.length > 6 && " Хажуу тийш гүйлгэж бүх хэмжээг харна уу."}
          </p>
          <SizeRail
            ref={sizeGroup}
            sizes={sizes}
            soldOut={(s) => product.soldOut || product.soldOutSizes.includes(s)}
            selected={size}
            unit={unit}
            invalid={sizeError}
            scroll={isShoe && sizes.length > 6}
            onSelect={(s) => {
              setSize(s);
              setSizeError(false);
            }}
          />
          {sizeError && (
            <p id={`${ids}-size-error`} role="alert" className="mt-2 font-semibold text-spring">
              Хэмжээгээ сонгоно уу.
            </p>
          )}
        </fieldset>
      ) : (
        product.dimensions && (
          <div>
            <h2 className="font-display text-lg font-bold">Хэмжээс</h2>
            <p className="mt-2 font-display text-2xl font-bold tabular">{product.dimensions}</p>
            <p className="mt-1 text-sm text-ink-soft">Өргөн × Гүн × Өндөр. Жишээ хэмжээс.</p>
          </div>
        )
      )}

      <fieldset className="min-w-0">
        <legend className="font-display text-lg font-bold">
          Өнгө: <span className="font-body font-semibold">{colors[color].name}</span>
        </legend>
        <div className="mt-3 flex flex-wrap gap-3">
          {product.colors.map((c) => {
            const active = c === color;
            return (
              <button
                key={c}
                type="button"
                aria-pressed={active}
                aria-label={colors[c].name}
                onClick={() => setColor(c)}
                className={`grid size-12 place-items-center rounded-full ${
                  active ? "ring-[3px] ring-ink ring-offset-2" : "hover:ring-2 hover:ring-rule hover:ring-offset-2"
                }`}
              >
                <span className="size-10 rounded-full border-2 border-ink/40" style={{ background: colors[c].hex }} />
              </button>
            );
          })}
        </div>
      </fieldset>

      {product.soldOut ? (
        <NotifyForm productName={product.name} />
      ) : (
        <button
          type="button"
          onClick={addToCart}
          className="flood hidden min-h-14 items-center justify-center gap-3 rounded-full font-display text-lg font-bold text-white transition-transform duration-200 ease-out hover:scale-[1.01] active:scale-[0.98] lg:flex"
        >
          <BagIcon />
          Сагсанд нэмэх
        </button>
      )}

      <div className="rounded-[22px] border-[3px] border-ink">
        <div className="flex items-center gap-3 border-b-2 border-ink px-4 py-3">
          <LineBadge season={line.id} size={28} />
          <h2 className="font-display font-bold">Хүргэлт</h2>
        </div>
        <div className="px-4 py-3">
          <p className="font-semibold">Хүргэлтийн хугацаа ба төлбөр удахгүй тодорхой болно.</p>
          <p className="mt-1 text-sm text-ink-soft">Бараа Солонгосоос Монгол руу тээвэрлэгдэн ирдэг.</p>
          <Sample className="mt-3">Нөхцөл тодорхойгүй</Sample>
        </div>
      </div>

      {hasSizes && (
        <details className="group rounded-[22px] border-[3px] border-ink">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 px-4 font-display font-bold [&::-webkit-details-marker]:hidden">
            Хэмжээний заавар
            <span
              aria-hidden="true"
              className="grid size-9 place-items-center rounded-full border-[3px] border-ink transition-transform duration-300 group-open:rotate-45"
            >
              <PlusIcon size={18} />
            </span>
          </summary>
          <div className="border-t-2 border-ink px-4 pb-5 pt-4">
            {isShoe ? (
              <>
                <p className="text-ink-soft">
                  Өсгийнөөсөө хамгийн урт хурууны үзүүр хүртэл хөлөө миллиметрээр хэмжээрэй. Хоёр хэмжээний дунд бол томыг нь сонго.
                </p>
                <SizeTable head={["Солонгос (мм)", "Европ (EU)"]} rows={shoeChart.map((r) => [String(r.mm), r.eu])} />
              </>
            ) : (
              <>
                <p className="text-ink-soft">Цээжээ хамгийн өргөн хэсгээр нь, уртыг мөрнөөс доош хэмжинэ.</p>
                <SizeTable
                  head={["Хэмжээ", "Цээж (см)", "Урт (см)"]}
                  rows={clothingChart.map((r) => [r.size, String(r.chest), String(r.length)])}
                />
              </>
            )}
            <Sample className="mt-4">Жишээ хэмжээ</Sample>
          </div>
        </details>
      )}

      {!product.soldOut && (
        <div className="buy-bar fixed inset-x-0 bottom-0 z-30 border-t-[3px] border-ink bg-paper px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 lg:hidden">
          <div className="flex items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">
                {size ? `Хэмжээ ${size}${unit}` : hasSizes ? "Хэмжээ сонгоогүй" : colors[color].name}
              </p>
              <p className="font-display text-lg font-extrabold tabular">{formatPrice(product.price)}</p>
            </div>
            <button
              type="button"
              onClick={addToCart}
              className="flood inline-flex min-h-13 items-center gap-2 rounded-full px-6 font-display font-bold text-white"
            >
              <BagIcon size={20} />
              Сагсанд нэмэх
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Sizes are stops on a short line. The chosen stop takes the black "you are here" dot;
// sold-out stops are hollow rings, struck through and labelled.
function SizeRail({
  ref,
  sizes,
  soldOut,
  selected,
  unit,
  invalid,
  scroll,
  onSelect,
}: {
  ref: React.Ref<HTMLDivElement>;
  sizes: string[];
  soldOut: (s: string) => boolean;
  selected: string | null;
  unit: string;
  invalid: boolean;
  scroll: boolean;
  onSelect: (s: string) => void;
}) {
  return (
    <div
      ref={ref}
      className={`mt-3 ${scroll ? "no-scrollbar -mx-4 snap-x overflow-x-auto overscroll-x-contain px-4" : ""}`}
    >
      <ul className={`relative flex ${scroll ? "w-max" : "w-full"}`}>
        <span
          aria-hidden="true"
          className={`absolute left-6 right-6 top-[19px] h-2 rounded-full ${invalid ? "bg-spring" : "flood"}`}
        />
        {sizes.map((s) => {
          const out = soldOut(s);
          const active = s === selected;
          return (
            <li key={s} className={`relative snap-start ${scroll ? "w-[4.25rem]" : "flex-1"}`}>
              <button
                type="button"
                disabled={out}
                aria-pressed={active}
                aria-label={`${s}${unit}${out ? ", дууссан" : ""}`}
                onClick={() => onSelect(s)}
                className={`group flex w-full flex-col items-center gap-1.5 rounded-2xl pb-1.5 pt-1 ${
                  out ? "cursor-not-allowed" : "hover:bg-platform"
                }`}
              >
                <span className="grid h-9 place-items-center">
                  {active ? (
                    <span className="block size-9 rounded-full border-[6px] border-paper bg-ink shadow-[0_0_0_4px_var(--color-ink)]" />
                  ) : out ? (
                    <span className="block size-7 rounded-full border-[3px] border-dashed border-ink-soft bg-paper" />
                  ) : (
                    <span className="block size-7 rounded-full border-[5px] border-(--line) bg-paper transition-transform duration-200 group-hover:scale-110" />
                  )}
                </span>
                <span
                  className={`font-display text-lg font-bold tabular ${
                    out ? "text-ink-soft line-through decoration-2" : active ? "text-ink" : ""
                  }`}
                >
                  {s}
                </span>
                <span className={`h-4 text-xs font-semibold ${out ? "text-ink-soft" : "invisible"}`}>
                  дууссан
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function SizeTable({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <table className="mt-4 w-full border-collapse text-left tabular">
      <thead>
        <tr>
          {head.map((h) => (
            <th key={h} scope="col" className="border-b-[3px] border-ink py-2 pr-3 text-sm font-bold">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r[0]} className="border-b-2 border-rule">
            {r.map((cell, i) => (
              <td key={i} className={`py-2 pr-3 ${i === 0 ? "font-display font-bold" : ""}`}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function NotifyForm({ productName }: { productName: string }) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "done">("idle");

  // No notification backend yet: the form validates and confirms, nothing is sent.
  const submit = (e: FormEvent) => {
    e.preventDefault();
    setState(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ? "done" : "error");
  };

  return (
    <section id="notify" aria-labelledby={`${id}-title`} className="scroll-mt-24 rounded-[22px] border-[3px] border-ink bg-platform p-4">
      <h2 id={`${id}-title`} className="flex items-center gap-2 font-display text-lg font-bold">
        <BellIcon /> Дахин ирэхэд мэдэгдэх
      </h2>
      <p className="mt-1 text-ink-soft">{productName} одоогоор дууссан. Имэйлээ үлдээвэл ирэхэд нь мэдэгдэнэ.</p>
      {state === "done" ? (
        <p role="status" className="mt-4 rounded-2xl bg-paper px-4 py-3 font-semibold">
          Баярлалаа! Ирэхэд нь {email.trim()} хаяг руу мэдэгдэнэ.
        </p>
      ) : (
        <form onSubmit={submit} noValidate className="mt-4 flex flex-col gap-2 sm:flex-row">
          <label htmlFor={`${id}-email`} className="sr-only">
            Имэйл хаяг
          </label>
          <input
            id={`${id}-email`}
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (state === "error") setState("idle");
            }}
            aria-invalid={state === "error"}
            aria-describedby={state === "error" ? `${id}-error` : undefined}
            placeholder="tany@email.mn"
            className="h-13 min-w-0 rounded-full border-[3px] border-ink bg-paper px-5 text-base placeholder:text-ink-soft sm:flex-1"
          />
          <button type="submit" className="h-13 rounded-full bg-ink px-6 font-semibold text-white hover:bg-black">
            Мэдэгдэл авах
          </button>
        </form>
      )}
      {state === "error" && (
        <p id={`${id}-error`} role="alert" className="mt-2 font-semibold">
          Имэйл хаяг буруу байна. Жишээ нь: name@mail.mn
        </p>
      )}
      <Sample className="mt-3">Имэйл одоогоор хадгалагдахгүй</Sample>
    </section>
  );
}
