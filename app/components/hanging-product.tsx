import Image from "next/image";
import Link from "next/link";
import { formatPrice, type Product } from "@/lib/catalog";
import { AddToCart } from "./add-to-cart";
import { BellIcon } from "./icons";
import { LineBadge } from "./signage";

const status = { new: "Шинэ", low: "Цөөн үлдсэн" } as const;

// A product hung on the running line: each card draws its own stretch of wire, sagging at its clip,
// so cards set edge to edge (no column gap) read as one continuous line.
export function HangingProduct({
  product,
  stock = true,
}: {
  product: Product;
  stock?: boolean;
}) {
  const label = product.soldOut
    ? "Дууссан"
    : product.badge && (stock || product.badge !== "low")
      ? status[product.badge]
      : null;

  return (
    <article className="hang group relative flex w-full flex-col items-center px-2 pb-1 text-center sm:px-4">
      <Wire />

      {/* Everything below the clip swings from it: a print pegged to the line by its top edge. */}
      <div className="hang-swing relative w-full origin-top">
        <Clip className="left-1/2" />

        <div className="hang-print relative mt-4 rounded-md border-[3px] border-ink bg-paper p-1.5 pb-7 sm:p-2 sm:pb-9">
          <div className="relative aspect-square overflow-hidden rounded-[3px] bg-platform">
            <Image
              src={product.image}
              alt=""
              fill
              unoptimized
              sizes="(min-width: 1024px) 20vw, 45vw"
              className={`object-cover ${product.soldOut ? "opacity-50 grayscale" : ""}`}
            />
          </div>
          <div className="hang-action absolute -bottom-3 -right-2 z-10">
            {product.soldOut ? (
              <Link
                href={`/product/${product.slug}#notify`}
                aria-label={`Ирэхэд мэдэгдэх: ${product.name}`}
                className="grid size-11 place-items-center rounded-full border-[3px] border-ink bg-paper hover:bg-platform"
              >
                <BellIcon size={20} />
              </Link>
            ) : (
              <AddToCart id={product.id} name={product.name} />
            )}
          </div>
        </div>
      </div>

      <h3 className="mt-4 line-clamp-2 max-w-[22ch] text-balance font-display text-[0.8rem] font-bold uppercase leading-tight tracking-[0.04em] sm:text-[0.95rem]">
        {/* The name's link covers the whole card; the cart button sits above it. */}
        <Link href={`/product/${product.slug}`} className="no-underline after:absolute after:inset-0 hover:underline">
          {product.name}
        </Link>
      </h3>
      <p className="mt-1.5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-display text-xs tracking-[0.1em] tabular">
        <span className="font-bold">{formatPrice(product.price)}</span>
        {label && (
          <>
            <span aria-hidden="true" className="text-ink-soft">
              ·
            </span>
            <span className="uppercase text-ink-soft">{label}</span>
          </>
        )}
        <span className="flex -space-x-1 pl-0.5">
          {product.seasons.map((s) => (
            <LineBadge key={s} season={s} size={18} />
          ))}
        </span>
      </p>
    </article>
  );
}

// One card's stretch of the line. It meets its neighbours at the edges (y = 4) and sags to its
// clips: one clip pulls the middle down, a two-clip print holds the wire level between them.
export function Wire({ clips = 1 }: { clips?: 1 | 2 }) {
  const d =
    clips === 1
      ? "M0 4 C 22 4, 34 12, 50 12 C 66 12, 78 4, 100 4"
      : "M0 4 C 12 4, 16 11, 24 11 L 76 11 C 84 11, 88 4, 100 4";
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 20"
      preserveAspectRatio="none"
      className="absolute inset-x-0 top-0 h-5 w-full overflow-visible"
    >
      <path
        d={d}
        fill="none"
        stroke="var(--line)"
        strokeWidth="3"
        vectorEffect="non-scaling-stroke"
        className="transition-[stroke] duration-500"
      />
    </svg>
  );
}

// An ink clothes peg; place it with a left-* class, it centres itself on that point.
export function Clip({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`absolute top-1 z-10 h-7 w-3 -translate-x-1/2 rounded-[4px] bg-ink ${className}`}>
      <span className="absolute inset-x-0.5 top-2.5 h-0.5 rounded-full bg-paper" />
    </span>
  );
}
