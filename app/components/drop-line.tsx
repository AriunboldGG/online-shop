"use client";

import Link from "next/link";
import { Children, useCallback, useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import type { Product } from "@/lib/catalog";
import { DoodleSpark, DoodleSquiggle } from "./doodles";
import { HangingProduct } from "./hanging-product";
import { ArrowIcon, ArrowLeftIcon } from "./icons";

const pad = (n: number) => String(n).padStart(2, "0");

// A wire that runs the full width of the screen with things pegged along it. Mouse users drag it,
// touch users swipe it, the arrows step through it, and the counter says which stretch is in view.
export function WireLine({
  label,
  itemClassName,
  action,
  prevLabel,
  nextLabel,
  children,
}: {
  label: string;
  // Width of each stop; stops sit edge to edge so their wire segments join.
  itemClassName: string;
  action?: ReactNode;
  prevLabel: string;
  nextLabel: string;
  children: ReactNode;
}) {
  const items = Children.toArray(children);
  const count = items.length;
  const scroller = useRef<HTMLDivElement>(null);
  const [view, setView] = useState({ first: 1, last: Math.min(count, 2) });

  const measure = useCallback(() => {
    const el = scroller.current;
    const item = el?.querySelector<HTMLElement>("[data-stop]");
    if (!el || !item) return;
    const w = item.offsetWidth;
    const gutter = item.offsetLeft;
    const first = Math.min(count, Math.round(el.scrollLeft / w) + 1);
    const fits = Math.max(1, Math.floor((el.clientWidth - gutter + 8) / w));
    setView({ first, last: Math.min(count, first + fits - 1) });
  }, [count]);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // Mouse users grab the line and pull it left or right; on release it coasts and slows to a stop.
  // Touch keeps the native swipe. A press that barely moves stays a click on the item.
  const drag = useRef({ active: false, moved: false, x: 0, left: 0, v: 0, t: 0, frame: 0, pointer: 0 });
  useEffect(() => () => cancelAnimationFrame(drag.current.frame), []);

  const stopCoast = () => {
    cancelAnimationFrame(drag.current.frame);
    drag.current.frame = 0;
  };

  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0 || !scroller.current) return;
    stopCoast();
    Object.assign(drag.current, {
      active: true,
      moved: false,
      x: e.clientX,
      left: scroller.current.scrollLeft,
      v: 0,
      t: e.timeStamp,
      pointer: e.pointerId,
    });
  };

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    const el = scroller.current;
    if (!d.active || !el) return;
    const dx = e.clientX - d.x;
    if (!d.moved) {
      if (Math.abs(dx) < 5) return;
      // Only now take the pointer, so a plain click still reaches the link underneath.
      d.moved = true;
      el.setPointerCapture(d.pointer);
      el.style.cursor = "grabbing";
    }
    const next = d.left - dx;
    const dt = Math.max(e.timeStamp - d.t, 1);
    // Smoothed velocity in px per ms, for the coast after release.
    d.v = 0.8 * ((next - el.scrollLeft) / dt) + 0.2 * d.v;
    d.t = e.timeStamp;
    el.scrollLeft = next;
  };

  const onUp = () => {
    const d = drag.current;
    const el = scroller.current;
    if (!d.active || !el) return;
    d.active = false;
    el.style.cursor = "";
    if (!d.moved || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let v = d.v * 16; // px per frame
    const coast = () => {
      v *= 0.94;
      if (Math.abs(v) < 0.4) return void (d.frame = 0);
      el.scrollLeft += v;
      d.frame = requestAnimationFrame(coast);
    };
    d.frame = requestAnimationFrame(coast);
  };

  const step = (dir: 1 | -1) => {
    const el = scroller.current;
    const item = el?.querySelector<HTMLElement>("[data-stop]");
    if (!el || !item) return;
    stopCoast();
    const fits = Math.max(1, view.last - view.first + 1);
    el.scrollBy({ left: dir * fits * item.offsetWidth, behavior: "smooth" });
  };

  const atStart = view.first <= 1;
  const atEnd = view.last >= count;

  return (
    <div className="relative">
      <div
        ref={scroller}
        onScroll={measure}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onLostPointerCapture={onUp}
        // A drag that ends over an item must not also open it.
        onClickCapture={(e) => {
          if (drag.current.moved) {
            e.preventDefault();
            e.stopPropagation();
            drag.current.moved = false;
          }
        }}
        onDragStart={(e) => e.preventDefault()}
        className="drop-scroller no-scrollbar snap-x snap-mandatory overflow-x-auto overscroll-x-contain [@media(hover:hover)]:cursor-grab [@media(hover:hover)]:snap-none"
      >
        <ul className="flex w-max select-none pb-2" aria-label={label}>
          {/* Straight wire across the gutters, so the line leaves the screen edge on both sides. */}
          <li aria-hidden="true" className="relative w-(--gutter) shrink-0">
            <span className="flood absolute inset-x-0 top-[2.5px] h-0.75" />
          </li>
          {items.map((item, i) => (
            <li key={i} data-stop className={`flex shrink-0 snap-start ${itemClassName}`}>
              {item}
            </li>
          ))}
          <li aria-hidden="true" className="relative w-(--gutter) shrink-0">
            <span className="flood absolute inset-x-0 top-[2.5px] h-0.75" />
          </li>
        </ul>
      </div>

      <div className="relative mx-auto mt-8 flex max-w-6xl items-center justify-between gap-4 px-4 lg:mt-10">
        <DoodleSquiggle aria-hidden="true" className="pointer-events-none absolute -top-6 left-[38%] hidden w-14 md:block" />
        <p className="font-display text-xs font-bold tracking-[0.14em] tabular" aria-live="polite">
          {pad(view.first)}–{pad(view.last)} / {pad(count)}
        </p>
        <div className="flex items-center gap-2 sm:gap-3">
          {action}
          <button
            type="button"
            onClick={() => step(-1)}
            disabled={atStart}
            aria-label={prevLabel}
            className="grid size-12 place-items-center rounded-full border-[3px] border-ink hover:bg-platform disabled:border-rule disabled:text-ink-soft disabled:hover:bg-transparent"
          >
            <ArrowLeftIcon size={20} />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            disabled={atEnd}
            aria-label={nextLabel}
            className="relative grid size-12 place-items-center rounded-full border-[3px] border-ink hover:bg-platform disabled:border-rule disabled:text-ink-soft disabled:hover:bg-transparent"
          >
            <ArrowIcon size={20} />
            <DoodleSpark aria-hidden="true" className="pointer-events-none absolute -right-5 -top-4 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}

// New arrivals pegged to the line.
export function DropLine({ products }: { products: Product[] }) {
  return (
    <WireLine
      label="Шинээр ирсэн бараа"
      itemClassName="w-[46vw] max-w-60 md:w-60 lg:w-64 lg:max-w-64"
      prevLabel="Өмнөх бараа"
      nextLabel="Дараагийн бараа"
      action={
        <Link
          href="/shop"
          className="inline-flex min-h-12 items-center rounded-full border-[3px] border-ink px-5 font-display text-sm font-bold no-underline hover:bg-platform sm:px-6"
        >
          Бүгдийг үзэх
        </Link>
      }
    >
      {products.map((p) => (
        <HangingProduct key={p.id} product={p} stock={false} />
      ))}
    </WireLine>
  );
}
