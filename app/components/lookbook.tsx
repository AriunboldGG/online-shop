"use client";

import Image from "next/image";
import { useRef, type PointerEvent } from "react";
import { getSeason, type SeasonId } from "@/lib/catalog";
import { DoodleLoop, DoodleSpark, DoodleStar } from "./doodles";
import { ArrowIcon, ArrowLeftIcon } from "./icons";
import { LineBadge, Sample } from "./signage";

type Frame = { title: string; season: SeasonId; images: [string, string]; Doodle: typeof DoodleSpark };

const frames: Frame[] = [
  { title: "Намрын амралтын өдөр", season: "autumn", images: ["/products/knit-sweater.svg", "/products/lounge-chair.svg"], Doodle: DoodleSpark },
  { title: "Өвлийн өглөө", season: "winter", images: ["/products/puffer-jacket.svg", "/products/ankle-boots.svg"], Doodle: DoodleStar },
  { title: "Гэрийн дулаан орой", season: "winter", images: ["/products/mug-set.svg", "/products/house-slippers.svg"], Doodle: DoodleLoop },
  { title: "Хаврын алхалт", season: "spring", images: ["/products/light-jacket.svg", "/products/canvas-sneakers.svg"], Doodle: DoodleSpark },
  { title: "Зуны тагт", season: "summer", images: ["/products/side-table.svg", "/products/floor-lamp.svg"], Doodle: DoodleStar },
  { title: "Намрын ном унших булан", season: "autumn", images: ["/products/floor-lamp.svg", "/products/wool-blanket.svg"], Doodle: DoodleLoop },
];

export function Lookbook() {
  const scroller = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number; v: number; t: number; moved: boolean } | null>(null);

  const step = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    const frame = el.querySelector("li");
    el.scrollBy({ left: dir * ((frame?.clientWidth ?? 300) + 16), behavior: "smooth" });
  };

  // Mouse drag with a little inertia; touch keeps the native swipe.
  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !scroller.current) return;
    drag.current = { x: e.clientX, left: scroller.current.scrollLeft, v: 0, t: e.timeStamp, moved: false };
    scroller.current.style.scrollSnapType = "none";
    scroller.current.setPointerCapture(e.pointerId);
  };

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    const el = scroller.current;
    if (!d || !el) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 4) d.moved = true;
    const next = d.left - dx;
    const dt = Math.max(e.timeStamp - d.t, 1);
    d.v = (el.scrollLeft - next) / dt;
    d.t = e.timeStamp;
    el.scrollLeft = next;
  };

  const onUp = () => {
    const d = drag.current;
    const el = scroller.current;
    drag.current = null;
    if (!d || !el) return;
    el.scrollBy({ left: d.v * 260, behavior: "smooth" });
    window.setTimeout(() => (el.style.scrollSnapType = ""), 420);
  };

  return (
    <section aria-labelledby="lookbook-title" className="overflow-hidden pb-16 pt-10 lg:pb-24 lg:pt-14">
      <div className="mx-auto flex max-w-6xl items-end justify-between gap-6 px-4">
        <div className="min-w-0">
          <h2 id="lookbook-title" className="font-display text-3xl font-bold tracking-[-0.03em] lg:text-5xl">
            Хосломол
          </h2>
          <p className="mt-2 max-w-[52ch] text-ink-soft lg:mt-3 lg:text-lg">Улирал бүрийн хослолыг чирж, гүйлгэж үзээрэй.</p>
        </div>
        <div className="flex shrink-0 gap-2 pb-1">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Өмнөх зураг"
            className="grid size-12 place-items-center rounded-full border-[3px] border-ink hover:bg-platform"
          >
            <ArrowLeftIcon />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Дараагийн зураг"
            className="grid size-12 place-items-center rounded-full border-[3px] border-ink hover:bg-platform"
          >
            <ArrowIcon />
          </button>
        </div>
      </div>

      <div
        ref={scroller}
        tabIndex={0}
        role="region"
        aria-label="Лукбүүкийн зургууд, баруун зүүн тийш гүйлгэнэ"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onClickCapture={(e) => drag.current?.moved && e.preventDefault()}
        className="lookbook-scroller no-scrollbar mt-8 cursor-grab snap-x snap-mandatory overflow-x-auto overscroll-x-contain active:cursor-grabbing"
      >
        <ul className="flex w-max gap-4">
          {frames.map(({ title, season, images, Doodle }, i) => {
            const s = getSeason(season);
            return (
              <li key={title} className="w-[78vw] max-w-[22rem] snap-start select-none">
                <figure>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border-[3px] border-ink bg-platform">
                    <div
                      aria-hidden="true"
                      className="absolute -right-10 top-10 size-[85%] rounded-full"
                      style={{ background: s.soft }}
                    />
                    <div className="absolute inset-x-0 bottom-[18%] h-3" style={{ background: s.color }} />
                    <Image
                      src={images[0]}
                      alt=""
                      width={400}
                      height={400}
                      unoptimized
                      draggable={false}
                      className="absolute left-[4%] top-[10%] w-[66%]"
                      style={{ rotate: i % 2 ? "-6deg" : "5deg" }}
                    />
                    <Image
                      src={images[1]}
                      alt=""
                      width={400}
                      height={400}
                      unoptimized
                      draggable={false}
                      className="absolute bottom-[6%] right-[2%] w-[52%]"
                    />
                    <Doodle className="absolute left-5 bottom-8 w-14" />
                    <Sample className="absolute left-4 top-4 bg-paper">Жишээ зураг</Sample>
                  </div>
                  <figcaption className="mt-3 flex items-center gap-2 font-semibold">
                    <LineBadge season={season} size={24} />
                    {title}
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
