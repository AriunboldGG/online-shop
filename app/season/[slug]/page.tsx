import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { catalog, currentSeasons, findSeason, seasons, type Season, type SeasonId } from "@/lib/catalog";
import { ArrowIcon } from "../../components/icons";
import { LineSetter } from "../../components/line-setter";
import { seasonDoodles } from "../../components/season-doodles";
import { LineBadge, RunningLamp } from "../../components/signage";
import { Collection } from "../../components/collection";

export function generateStaticParams() {
  return seasons.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({ params }: PageProps<"/season/[slug]">): Promise<Metadata> {
  const season = findSeason((await params).slug);
  if (!season) return {};
  return {
    title: `${season.of} цуглуулга — Online Shop`,
    description: `${season.of} улиралд зориулсан бараа.`,
  };
}

export default async function SeasonPage({ params }: PageProps<"/season/[slug]">) {
  // proxy.ts answers unknown slugs with a 404 before render; this guards direct renders.
  const season = findSeason((await params).slug);
  if (!season) notFound();

  const products = catalog.filter((p) => p.seasons.includes(season.id));
  const next = seasons[(seasons.indexOf(season) + 1) % seasons.length];

  return (
    <div style={{ "--line": season.color, "--line-soft": season.soft } as CSSProperties}>
      <LineSetter season={season.id} />
      <SeasonSwitcher current={season.id} />
      <SeasonHero season={season} count={products.length} images={products.slice(0, 3).map((p) => p.image)} />
      <Collection season={season.id} products={products} />

      <section className="mx-auto max-w-6xl px-4 pb-20">
        <Link
          href={`/season/${next.id}`}
          className="group flex items-center justify-between gap-4 rounded-[28px] border-[3px] border-ink px-5 py-5 no-underline hover:bg-platform lg:px-8"
        >
          <span className="flex items-center gap-4">
            <LineBadge season={next.id} size={44} />
            <span className="font-display text-lg font-bold lg:text-2xl">{next.of} улирал руу шилжих</span>
          </span>
          <ArrowIcon className="shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </section>
    </div>
  );
}

function SeasonSwitcher({ current }: { current: SeasonId }) {
  return (
    <nav aria-label="Улирлын улирал" className="mx-auto max-w-6xl px-4 pt-4 lg:pt-8">
      <ul className="grid grid-cols-4 gap-2">
        {seasons.map((s) => {
          const active = s.id === current;
          return (
            <li key={s.id}>
              <Link
                href={`/season/${s.id}`}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-12 flex-col items-center justify-center gap-1 rounded-2xl border-[3px] px-1 py-2 font-semibold no-underline transition-colors sm:flex-row sm:gap-2 lg:min-h-14 ${
                  active ? "border-ink text-white" : "border-rule bg-paper hover:border-ink"
                }`}
                style={active ? { background: s.color } : undefined}
              >
                {active ? (
                  <span className="grid size-7 place-items-center rounded-full border-[3px] border-white font-display text-sm font-bold tabular">
                    {s.line}
                  </span>
                ) : (
                  <LineBadge season={s.id} size={28} />
                )}
                <span className="text-sm sm:text-base">{s.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function SeasonHero({ season, count, images }: { season: Season; count: number; images: string[] }) {
  const { signature: Signature, companions } = seasonDoodles[season.id];
  const [First, Second] = companions;
  const running = currentSeasons.includes(season.id);

  return (
    <section aria-labelledby="season-title" className="mx-auto max-w-6xl px-4 pt-4">
      <div
        className="relative overflow-hidden rounded-[28px] border-[3px] border-ink px-5 pb-5 pt-5 text-ink lg:grid lg:grid-cols-[1fr_auto] lg:items-end lg:gap-10 lg:px-10 lg:pb-8 lg:pt-8"
        style={{ background: season.soft }}
      >
        <div className="relative z-10">
          <h1
            id="season-title"
            className="flex items-center gap-4 font-display text-[clamp(3rem,15vw,6rem)] font-extrabold leading-[0.95] tracking-[-0.04em]"
          >
            <span
              aria-hidden="true"
              className="grid size-14 shrink-0 place-items-center rounded-full border-[3px] border-ink text-2xl tracking-normal text-white tabular lg:size-20 lg:text-4xl"
              style={{ background: season.color }}
            >
              {season.line}
            </span>
            {season.name}
          </h1>
          <p className="mt-4 max-w-[40ch] text-lg font-semibold">
            {season.of} улирал · {season.months} · {count} бараа
          </p>
          <p className="mt-1 font-semibold">Солонгосоос оруулж ирсэн</p>
          <div className="mt-3 flex min-h-20 items-end justify-between gap-4">
            {running ? <RunningLamp /> : <span />}
            <span className="flex min-w-0 items-end gap-2 lg:gap-4">
              <First className="w-8 shrink lg:w-14" />
              <Second className="w-10 shrink lg:w-16" />
              <Signature className="w-16 shrink-0 sm:w-20 lg:w-28" />
            </span>
          </div>
        </div>

        <div className="relative mt-6 lg:mt-0 lg:w-104">
          <ul className="relative z-10 flex items-end gap-2">
            {images.map((src) => (
              <li
                key={src}
                className="aspect-square w-[30%] max-w-32 overflow-hidden rounded-full border-[3px] border-ink bg-paper"
              >
                <Image src={src} alt="" width={128} height={128} unoptimized className="size-full object-cover" />
              </li>
            ))}
          </ul>
          <div aria-hidden="true" className="absolute inset-x-0 bottom-[15%] h-2.5 rounded-full" style={{ background: season.color }} />
        </div>
      </div>
    </section>
  );
}
