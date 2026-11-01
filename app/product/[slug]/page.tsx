import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { catalog, findProduct, getCategory, getSeason, stationCode } from "@/lib/catalog";
import { LineSetter } from "../../components/line-setter";
import { ProductModule } from "../../components/product-module";
import { LineBadge } from "../../components/signage";
import { Gallery } from "./gallery";
import { PurchasePanel, type Neighbour } from "./purchase-panel";

export function generateStaticParams() {
  return catalog.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/product/[slug]">): Promise<Metadata> {
  const product = findProduct((await params).slug);
  if (!product) return {};
  return {
    title: `${product.name} — Online Shop`,
    description: `${product.name}. Солонгосоос оруулж ирсэн.`,
  };
}

export default async function ProductPage({ params }: PageProps<"/product/[slug]">) {
  // proxy.ts answers unknown slugs with a 404 before render; this guards direct renders.
  const product = findProduct((await params).slug);
  if (!product) notFound();

  const line = getSeason(product.seasons[0]);
  const category = getCategory(product.category);

  // The previous and next stops on this product's line, for the station sign's arrows.
  const stops = catalog
    .filter((p) => p.seasons.includes(line.id))
    .sort((a, b) => stationCode(a, line.id).localeCompare(stationCode(b, line.id)) || a.id.localeCompare(b.id));
  const at = stops.findIndex((p) => p.id === product.id);
  const toNeighbour = (i: number): Neighbour | null =>
    i >= 0 && i < stops.length && i !== at
      ? { slug: stops[i].slug, name: stops[i].name, code: stationCode(stops[i], line.id) }
      : null;

  // Same line, other stations: things that go with this item rather than replace it.
  const look = catalog
    .filter((p) => p.id !== product.id && p.category !== product.category && p.seasons.some((s) => product.seasons.includes(s)))
    .sort((a, b) => Number(a.soldOut) - Number(b.soldOut))
    .slice(0, 4);

  return (
    <div style={{ "--line": line.color, "--line-soft": line.soft } as CSSProperties}>
      <LineSetter season={line.id} />

      <nav aria-label="Байршил" className="mx-auto max-w-6xl px-4 pt-3 lg:pt-6">
        <ol className="flex flex-wrap items-center gap-x-2 text-sm font-semibold">
          <li>
            <Link href={`/season/${line.id}`} className="inline-flex min-h-11 items-center gap-2 no-underline hover:underline">
              <LineBadge season={line.id} size={24} />
              {line.of} улирал
            </Link>
          </li>
          <li aria-hidden="true" className="h-1 w-4 rounded-full" style={{ background: line.color }} />
          <li>
            <Link href={`/category/${category.id}`} className="inline-flex min-h-11 items-center no-underline hover:underline">
              {category.name}
            </Link>
          </li>
        </ol>
      </nav>

      <div className="mx-auto mt-2 grid max-w-6xl grid-cols-1 gap-5 px-4 lg:mt-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-12">
        <Gallery product={product} />
        <PurchasePanel
          product={product}
          code={stationCode(product, line.id)}
          prev={toNeighbour(at - 1)}
          next={toNeighbour(at + 1)}
        />
      </div>

      {look.length > 0 && (
        <section aria-labelledby="look-title" className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
          <h2 id="look-title" className="font-display text-3xl font-bold tracking-[-0.03em] lg:text-5xl">
            Хамт хослуул
          </h2>
          <p className="mt-3 max-w-[52ch] text-ink-soft">
            Энэ бараатай ижил улиралын, өөр ангиллын бараа.
          </p>
          <ul className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 lg:gap-5">
            {look.map((p) => (
              <li key={p.id} className="flex">
                <ProductModule product={p} on={product.seasons.find((s) => p.seasons.includes(s))} stock={false} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
