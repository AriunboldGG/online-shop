import Image from "next/image";
import Link from "next/link";
import { formatPrice, getSeason, stationCode, type Product, type SeasonId } from "@/lib/catalog";
import { AddToCart } from "./add-to-cart";
import { BellIcon } from "./icons";
import { LineBadge } from "./signage";

const badgeLabel = { new: "Шинэ", low: "Цөөн үлдсэн" } as const;

// Every product is the same module: a stop on its line, lined up like stations on one rail.
// On a season page every card is a stop on that page's line; elsewhere it rides its first line.
// `stock={false}` hides the low-stock badge where an example-data stock claim would be out of place.
export function ProductModule({ product, on, stock = true }: { product: Product; on?: SeasonId; stock?: boolean }) {
  const lineId = on ?? product.seasons[0];
  const line = getSeason(lineId);
  return (
    <article className="group relative flex w-full flex-col overflow-hidden rounded-[22px] border-[3px] border-ink bg-paper">
      <div className="flex items-center justify-between border-b-2 border-ink px-3 py-1.5">
        <span className="font-display text-xs font-bold text-ink-soft tabular">{stationCode(product, lineId)}</span>
        <span className="flex -space-x-1">
          {product.seasons.map((s) => (
            <LineBadge key={s} season={s} size={22} />
          ))}
        </span>
      </div>

      <div className="relative aspect-square">
        <Image
          src={product.image}
          alt={product.name}
          fill
          unoptimized
          sizes="(min-width: 1024px) 25vw, 50vw"
          className={`object-contain p-4 sm:p-5 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-1.5 ${
            product.soldOut ? "opacity-35 grayscale" : ""
          }`}
        />
        {product.soldOut ? (
          <span className="absolute left-3 top-3 rounded-full border-2 border-ink bg-paper px-2.5 py-1 text-xs font-bold">
            Дууссан
          </span>
        ) : (
          product.badge &&
          (stock || product.badge !== "low") && (
            <span
              className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-bold text-white"
              style={{ background: product.badge === "new" ? "var(--color-ink)" : line.color }}
            >
              {badgeLabel[product.badge]}
            </span>
          )
        )}
      </div>

      <div aria-hidden="true" className="relative h-1.5" style={{ background: line.color }}>
        <span
          className="absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] bg-paper"
          style={{ borderColor: line.color }}
        />
      </div>

      {/* Name, then price: the price is the strongest line, and rows of cards align on it. */}
      <div className="flex flex-1 flex-col gap-3 px-3 pb-3 pt-2.5 sm:px-4 sm:pb-4">
        <h3 className="line-clamp-3 min-h-[2.75em] text-sm font-semibold leading-snug sm:line-clamp-2 sm:text-base">
          <Link href={`/product/${product.slug}`} className="no-underline hover:underline">
            {product.name}
          </Link>
        </h3>
        <div className="mt-auto flex items-center justify-between gap-2">
          <span className="font-display text-lg font-extrabold tabular">{formatPrice(product.price)}</span>
          {product.soldOut ? (
            <Link
              href={`/product/${product.slug}#notify`}
              aria-label={`Ирэхэд мэдэгдэх: ${product.name}`}
              className="grid size-11 shrink-0 place-items-center rounded-full border-[3px] border-ink hover:bg-platform"
            >
              <BellIcon size={20} />
            </Link>
          ) : (
            <AddToCart id={product.id} name={product.name} />
          )}
        </div>
      </div>
    </article>
  );
}
