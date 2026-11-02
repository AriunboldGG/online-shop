import type { Metadata } from "next";
import { Suspense } from "react";
import { PageFallback } from "../../components/page-fallback";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { catalog, categories, findCategory, seasons } from "@/lib/catalog";
import { Collection } from "../../components/collection";
import { ArrowIcon } from "../../components/icons";
import { PageSign, StationRoundel } from "../../components/page-sign";
import { LineBadge } from "../../components/signage";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.id }));
}

export async function generateMetadata({ params }: PageProps<"/category/[slug]">): Promise<Metadata> {
  const category = findCategory((await params).slug);
  if (!category) return {};
  return {
    title: `${category.name} — Online Shop`,
    description: `Солонгосоос оруулж ирсэн ${category.name.toLowerCase()}, улирлаар нь.`,
  };
}

// The URL is read inside Suspense so every link to this route can share one prefetched shell.
export default function CategoryPage({ params }: PageProps<"/category/[slug]">) {
  return (
    <Suspense fallback={<PageFallback />}>
      <CategoryContent params={params} />
    </Suspense>
  );
}

async function CategoryContent({ params }: Pick<PageProps<"/category/[slug]">, "params">) {
  // proxy.ts answers unknown slugs with a 404 before render; this guards direct renders.
  const category = findCategory((await params).slug);
  if (!category) notFound();

  const products = catalog.filter((p) => p.category === category.id);
  const lines = seasons.filter((s) => products.some((p) => p.seasons.includes(s.id)));
  const next = categories[(categories.indexOf(category) + 1) % categories.length];

  return (
    <>
      <PageSign
        title={category.name}
        roundel={<StationRoundel>{category.station}</StationRoundel>}
        lead={
          <>
            {products.length} бараа · Солонгосоос оруулж ирсэн
            {lines.length > 0 && (
              <span className="mt-3 flex flex-wrap items-center gap-2 text-base">
                Энэ буудлаар дайрдаг улирал:
                <span className="flex -space-x-1">
                  {lines.map((s) => (
                    <LineBadge key={s.id} season={s.id} size={28} />
                  ))}
                </span>
              </span>
            )}
          </>
        }
        aside={
          <span className="block size-28 overflow-hidden rounded-full border-[3px] border-ink bg-paper lg:size-40">
            <Image src={category.image} alt="" width={160} height={160} unoptimized className="size-full object-cover" />
          </span>
        }
      />

      <Collection products={products} rail="line" label={category.name} />

      <section className="mx-auto max-w-6xl px-4 pb-20">
        <Link
          href={`/category/${next.id}`}
          className="group flex items-center justify-between gap-4 rounded-[28px] border-[3px] border-ink px-5 py-5 no-underline hover:bg-platform lg:px-8"
        >
          <span className="flex items-center gap-4">
            <span
              aria-hidden="true"
              className="grid size-11 place-items-center rounded-full border-[4px] border-ink font-display font-bold tabular"
            >
              {next.station}
            </span>
            <span className="font-display text-lg font-bold lg:text-2xl">Дараагийн буудал: {next.name}</span>
          </span>
          <ArrowIcon className="shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </section>
    </>
  );
}
