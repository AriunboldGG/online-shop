import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  catalog,
  categories,
  formatPrice,
  getSeason,
  seasons,
  type Season,
} from "@/lib/catalog";
import { DoodleArrow, DoodleCircle, DoodleSpark, DoodleSquiggle } from "./components/doodles";
import { FloodObserver } from "./components/flood-observer";
import { ArrowIcon } from "./components/icons";
import { DropLine } from "./components/drop-line";
import { Lookbook } from "./components/lookbook";
import { SeasonSignup } from "./components/season-signup";
import { HereDot, LineBadge, RunningLamp, Sample } from "./components/signage";

const featured = catalog.find((p) => p.slug === "puffer-jacket")!;

// One head for every section: title and lead sit tight together, the content starts a clear step below,
// and a section-level action rides top-right from sm up (phones get it at the end of the section instead).
function SectionHead({
  id,
  title,
  lead,
  action,
}: {
  id: string;
  title: ReactNode;
  lead?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-end justify-between gap-6">
      <div className="max-w-[44rem]">
        <h2 id={id} className="font-display text-3xl font-bold tracking-[-0.03em] lg:text-5xl">
          {title}
        </h2>
        {lead && <div className="mt-3 max-w-[52ch] text-ink-soft lg:mt-4 lg:text-lg">{lead}</div>}
      </div>
      {action && <div className="hidden shrink-0 pb-1 sm:block">{action}</div>}
    </div>
  );
}

export default function Home() {
  const newArrivals = [...catalog].sort((a, b) => Number(b.badge === "new") - Number(a.badge === "new")).slice(0, 10);

  return (
    <>
      <FloodObserver />
      <Hero />
      <Marquee />
      <SeasonLines />
      <Stations />
      {/* New arrivals hang on one wire that runs off both screen edges; the lookbook follows as the same browsing stretch. */}
      <section data-line="autumn" aria-labelledby="new-title" className="pb-10 pt-16 lg:pb-14 lg:pt-24">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHead
            id="new-title"
            title="Шинээр ирсэн"
            lead={
              <span className="flex flex-wrap items-center gap-2">
                Гүйлгэж үзээд, сонирхсон бараагаа дараарай. Бараа, үнэ, зураг бүгд жишээ. <Sample />
              </span>
            }
          />
        </div>
        <div className="mt-10 lg:mt-14">
          <DropLine products={newArrivals} />
        </div>
      </section>
      <Lookbook />
      <WhyKorea />
      <SeasonSignup />
    </>
  );
}

function Hero() {
  const autumn = getSeason("autumn");
  const winter = getSeason("winter");
  const stops = categories;
  const here = stops.findIndex((c) => c.id === featured.category);

  return (
    <section data-line="autumn" aria-labelledby="hero-title" className="mx-auto max-w-6xl px-4 pb-6 pt-3 lg:pb-10 lg:pt-8">
      <div className="overflow-hidden rounded-[28px] border-[3px] border-ink">
        <div className="relative px-5 py-5 text-ink lg:px-10 lg:pb-10 lg:pt-8" style={{ background: autumn.soft }}>
          <h1
            id="hero-title"
            className="max-w-[13ch] text-balance pr-20 font-display text-[clamp(2.1rem,9vw,5.5rem)] lg:pr-0 font-extrabold leading-[0.98] tracking-[-0.04em]"
          >
            Хүйтэн улирал, дулаан сонголт
          </h1>
          <span
            role="img"
            aria-label={`${autumn.of} ба ${winter.of} улирал одоо явж байна`}
            className="absolute right-4 top-4 flex items-center rounded-full border-[3px] border-ink bg-paper p-0.5 lg:right-8 lg:top-8"
          >
            <LineBadge season="autumn" size={30} />
            <span aria-hidden="true" className="h-1.5 w-2.5 bg-ink" />
            <LineBadge season="winter" size={30} />
          </span>
        </div>
        <div aria-hidden="true" className="h-3 border-y-[3px] border-ink" style={{ background: winter.color }} />

        <div className="relative bg-paper px-5 pb-5 lg:px-10">
          {/* The product stands over its own stop on the rail below (a third of the way along). */}
          <div className="relative h-[13.5rem] sm:h-[22rem] lg:h-[30rem]">
            <div className="absolute bottom-3 left-1/3 top-4 aspect-square max-w-[62%] -translate-x-1/2 overflow-hidden rounded-[22px] border-[3px] border-ink lg:bottom-6 lg:top-8">
              <Image
                src={featured.image}
                alt={featured.name}
                fill
                priority
                unoptimized
                sizes="(min-width: 1024px) 32rem, 60vw"
                className="object-cover"
              />
            </div>
            <div className="absolute right-0 top-8 flex flex-col items-end lg:left-[62%] lg:right-auto lg:top-20 lg:items-start">
              <span className="rotate-[-5deg] rounded-full border-[3px] border-ink bg-paper px-4 py-1.5 font-display text-lg font-bold tabular lg:text-4xl">
                {formatPrice(featured.price)}
              </span>
              <DoodleArrow className="mr-6 mt-1 w-14 -scale-x-100 lg:-ml-6 lg:mr-0 lg:w-32" />
            </div>
            <DoodleSpark className="absolute bottom-10 right-8 w-10 lg:bottom-20 lg:right-16 lg:w-20" />
            <Sample className="absolute bottom-3 right-0 bg-paper">Жишээ зураг</Sample>
          </div>

          <div>
            <div className="relative h-3 rounded-full" style={{ background: autumn.color }}>
              <ol className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between">
                {stops.map((stop, i) => (
                  <li key={stop.id} className="relative grid place-items-center">
                    {i === here ? (
                      <HereDot />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="block size-6 rounded-full border-[5px] bg-paper"
                        style={{ borderColor: autumn.color }}
                      />
                    )}
                  </li>
                ))}
              </ol>
            </div>
            <ol className="mt-5 flex justify-between text-xs font-semibold sm:text-sm">
              {stops.map((stop, i) => (
                <li key={stop.id} className={i === here ? "font-bold text-ink" : "text-ink-soft"}>
                  <Link href={`/category/${stop.id}`} className="no-underline hover:underline">
                    {stop.name}
                  </Link>
                  {i === here && <span className="sr-only"> (та энд байна)</span>}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-ink-soft">
          <Link href={`/product/${featured.slug}`} className="font-semibold text-ink">
            {featured.name}
          </Link>
          , Солонгосоос оруулж ирсэн
        </p>
        <Link
          href="/season/autumn"
          className="flood inline-flex min-h-14 items-center justify-center gap-3 whitespace-nowrap rounded-full px-6 font-display text-base font-bold text-white sm:px-7 sm:text-base no-underline transition-transform duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]"
        >
          Намар · Өвлийн цуглуулга
          <ArrowIcon />
        </Link>
      </div>
    </section>
  );
}

const marqueeItems = ["Шинэ бараа", "Шинэ улирал", "Үнэгүй хүргэлт"];

function Marquee() {
  const run = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {[...marqueeItems, ...marqueeItems].map((item, i) => (
        <li key={i} className="flex items-center whitespace-nowrap">
          <span className="px-6 font-display text-lg font-bold uppercase lg:text-2xl">{item}</span>
          <span aria-hidden="true" className="size-5 rounded-full border-4 border-(--line) bg-paper" />
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label={marqueeItems.join(", ")} className="marquee flood-soft overflow-hidden border-y-[3px] border-ink py-4">
      <div className="marquee-track flex w-max">
        {run(false)}
        {run(true)}
      </div>
    </section>
  );
}

function SeasonLines() {
  return (
    <section id="seasons" aria-labelledby="seasons-title" className="mx-auto max-w-6xl scroll-mt-24 px-4 pb-16 pt-14 lg:pb-24 lg:pt-20">
      <SectionHead
        id="seasons-title"
        title={
          <span className="relative inline-block">
            Улирлаар нь аял
            <DoodleSquiggle className="absolute -bottom-2.5 left-0 h-3 w-full" />
          </span>
        }
        lead="Улирал бүр өөр өөрийн өнгөтэй. Улирлаа сонгоод тухайн улиралд тохирох бараагаа сонгоорой."
      />
      <ul className="mt-8 grid gap-4 lg:mt-10 lg:grid-cols-2 lg:gap-6">
        {seasons.map((s) => (
          <li key={s.id} data-line={s.id}>
            <SeasonCard season={s} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function SeasonCard({ season }: { season: Season }) {
  const items = catalog.filter((p) => p.seasons.includes(season.id));
  const running = season.id === "autumn" || season.id === "winter";

  return (
    <Link
      href={`/season/${season.id}`}
      className="group relative flex min-h-[26rem] flex-col overflow-hidden rounded-[28px] border-[3px] border-ink p-5 text-ink no-underline lg:min-h-[30rem] lg:p-8"
      style={{ background: season.soft }}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className="grid size-16 place-items-center rounded-full border-[3px] border-ink font-display text-3xl font-extrabold text-white tabular lg:size-20 lg:text-4xl"
          style={{ background: season.color }}
        >
          {season.line}
        </span>
        <span className="text-right font-semibold">
          {season.months}
          {running && (
            <span className="mt-2 flex justify-end">
              <RunningLamp />
            </span>
          )}
        </span>
      </div>

      <h3 className="mt-6 font-display text-[clamp(2.5rem,12vw,4.5rem)] font-extrabold leading-none tracking-[-0.04em]">
        {season.name}
      </h3>
      <p className="mt-2 font-semibold">{season.of} улирал · {items.length} бараа</p>

      <div className="relative mt-auto pt-8">
        <ul className="relative z-10 flex items-end gap-2">
          {items.slice(0, 3).map((p, i) => (
            <li
              key={p.id}
              className="aspect-square w-[30%] max-w-36 overflow-hidden rounded-full border-[3px] border-ink bg-paper transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-2"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <Image src={p.image} alt="" width={160} height={160} unoptimized className="size-full object-cover" />
            </li>
          ))}
        </ul>
        <div aria-hidden="true" className="absolute inset-x-0 bottom-[15%] h-2.5 rounded-full" style={{ background: season.color }} />
      </div>

      <span className="mt-6 inline-flex items-center gap-2 self-start rounded-full bg-paper px-5 py-3 font-display font-bold text-ink">
        Улирал руу очих
        <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

function Stations() {
  return (
    <section aria-labelledby="stations-title" className="bg-platform py-12 lg:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHead
          id="stations-title"
          title="Ангиллаар нь"
          lead="Буудал бүр дээр аль улирлын улирал зогсдгийг өнгөөр нь тэмдэглэсэн."
        />
        <ul className="mt-6 grid grid-cols-2 gap-3 lg:mt-8 lg:grid-cols-4 lg:gap-6">
          {categories.map((c) => {
            const items = catalog.filter((p) => p.category === c.id);
            const lines = seasons.filter((s) => items.some((p) => p.seasons.includes(s.id)));
            return (
              <li key={c.id}>
                <Link
                  href={`/category/${c.id}`}
                  className="group flex h-full flex-col overflow-hidden rounded-[22px] border-[3px] border-ink bg-paper no-underline"
                >
                  <div className="flex items-center justify-between bg-ink px-3 py-2.5 text-white">
                    <span className="font-display text-base font-bold lg:text-lg">{c.name}</span>
                    <ArrowIcon size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={c.image}
                      alt=""
                      fill
                      unoptimized
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="object-cover transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-auto flex items-center justify-between gap-2 border-t-2 border-ink px-3 py-2.5">
                    <span className="flex -space-x-1" aria-label={`улирал: ${lines.map((s) => s.name).join(", ")}`}>
                      {lines.map((s) => (
                        <LineBadge key={s.id} season={s.id} size={20} />
                      ))}
                    </span>
                    <span className="text-sm font-semibold text-ink-soft tabular">{items.length} бараа</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

const route = [
  {
    title: "Жинхэнэ Солонгос бараа",
    body: "Манай дэлгүүрийн бүх бараа Солонгосоос импортлогддог.",
    sample: false,
  },
  {
    title: "Солонгосоос ачигдана",
    body: "info",
    sample: false,
  },
  {
    title: "Буцаалт",
    body: "Буцаалтын нөхцөл удахгүй нийтлэгдэнэ.",
    sample: true,
  },
];

function WhyKorea() {
  return (
    <section aria-labelledby="why-title" className="bg-platform py-14 lg:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHead
          id="why-title"
          title={
            <>
              Яагаад{" "}
              <span className="relative mx-1 inline-block px-4 py-2">
                Солонгос
                <DoodleCircle className="pointer-events-none absolute -inset-x-3 -inset-y-1.5 h-[calc(100%+0.75rem)] w-[calc(100%+1.5rem)]" />
              </span>{" "}
              бараа гэж?
            </>
          }
          lead={
            <p className="flex items-center gap-3 font-display text-sm font-bold text-ink lg:text-base">
              Сөүл <span aria-hidden="true" className="h-1 w-10 rounded-full bg-ink" /> Улаанбаатар
            </p>
          }
        />

        <ol className="relative mt-10 grid gap-10 pl-14 lg:mt-12 lg:grid-cols-3 lg:gap-8 lg:pl-0 lg:pt-14">
          <span
            aria-hidden="true"
            className="absolute bottom-2 left-[19px] top-2 w-2.5 rounded-full bg-ink lg:inset-x-0 lg:top-[19px] lg:bottom-auto lg:h-2.5 lg:w-auto"
          />
          {route.map((stop) => (
            <li key={stop.title} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-14 top-0 block size-12 rounded-full border-[6px] border-ink bg-paper lg:-top-14 lg:left-0"
              />
              <h3 className="font-display text-xl font-bold lg:text-2xl">{stop.title}</h3>
              <p className="mt-2 max-w-[38ch] text-ink-soft">{stop.body}</p>
              {stop.sample && <Sample className="mt-3">Нөхцөл тодорхойгүй</Sample>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
