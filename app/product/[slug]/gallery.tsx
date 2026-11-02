"use client";

import Image from "next/image";
import { useRef, useState, type PointerEvent } from "react";
import { getSeason, type Product } from "@/lib/catalog";
import { seasonDoodles } from "../../components/season-doodles";
import { CloseIcon, SearchIcon } from "../../components/icons";
import { Sample } from "../../components/signage";

// Framings of the one stand-in photo we have. Real product photography replaces these.
const views = [
  { id: "full", label: "Бүтэн" },
  { id: "close", label: "Ойроос" },
  { id: "line", label: "Улирлын өнгөөр" },
] as const;

type ViewId = (typeof views)[number]["id"];

export function Gallery({ product }: { product: Product }) {
  const line = getSeason(product.seasons[0]);
  const Signature = seasonDoodles[line.id].signature;
  const [view, setView] = useState<ViewId>("full");
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const stage = useRef<HTMLDivElement>(null);

  const follow = (e: PointerEvent<HTMLDivElement>) => {
    if (!zoom || !stage.current) return;
    const r = stage.current.getBoundingClientRect();
    const x = Math.min(100, Math.max(0, ((e.clientX - r.left) / r.width) * 100));
    const y = Math.min(100, Math.max(0, ((e.clientY - r.top) / r.height) * 100));
    setOrigin(`${x}% ${y}%`);
  };

  const base = view === "close" ? 1.7 : 1;
  const scale = zoom ? base * 2.2 : base;

  return (
    <div className="lg:sticky lg:top-24 lg:self-start">
      <div
        ref={stage}
        onPointerMove={follow}
        onPointerDown={follow}
        onClick={() => zoom && setZoom(false)}
        className={`relative aspect-square overflow-hidden rounded-[28px] border-[3px] border-ink ${
          view === "line" ? "" : "bg-paper"
        } ${zoom ? "cursor-zoom-out touch-none" : ""}`}
        style={view === "line" ? { background: line.soft } : undefined}
      >
        <div
          className="absolute inset-0 transition-transform duration-300 ease-out motion-reduce:transition-none"
          style={{ transform: `scale(${scale})`, transformOrigin: zoom ? origin : view === "close" ? "50% 30%" : "50% 50%" }}
        >
          <Image
            src={product.image}
            alt={`${product.name}, ${views.find((v) => v.id === view)!.label.toLowerCase()}`}
            fill
            priority
            unoptimized
            sizes="(min-width: 1024px) 40rem, 100vw"
            className={`object-cover ${view === "line" ? "inset-[13%]! size-auto! rounded-[22px] border-[3px] border-ink" : ""} ${product.soldOut ? "opacity-75 grayscale-[60%]" : ""}`}
          />
        </div>

        {/* The line runs along the bottom edge of the photo; the "line" view frames the photo on its soft tone instead. */}
        {view !== "line" && (
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-3 border-t-[3px] border-ink" style={{ background: line.color }} />
        )}
        {view === "line" && <Signature className="absolute bottom-6 right-6 w-16 lg:w-20" />}

        {product.soldOut && (
          <div className="absolute inset-x-0 bottom-0 bg-ink py-2.5 text-center font-display text-xl font-extrabold uppercase tracking-[0.04em] text-white lg:text-2xl">
            Дууссан
          </div>
        )}

        <div role="group" aria-label="Зургийн харагдац" className="absolute left-3 right-16 top-3 z-10 flex gap-1">
          {views.map((v) => {
            const active = v.id === view;
            return (
              <button
                key={v.id}
                type="button"
                aria-pressed={active}
                onClick={(e) => {
                  e.stopPropagation();
                  setView(v.id);
                  setZoom(false);
                }}
                className={`min-h-11 whitespace-nowrap rounded-full border-[3px] px-2.5 text-[0.8rem] font-semibold sm:px-3.5 sm:text-sm ${
                  active ? "border-ink bg-ink text-white" : "border-ink bg-paper hover:bg-platform"
                }`}
              >
                {v.label}
              </button>
            );
          })}
        </div>

        <Sample className="absolute left-3 top-[4.25rem] bg-paper">Жишээ зураг</Sample>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setZoom((z) => !z);
          }}
          aria-pressed={zoom}
          aria-label={zoom ? "Томруулалт хаах" : "Томруулж харах. Томруулсны дараа хуруу эсвэл хулганаараа хөдөлгөнө."}
          className="absolute right-3 top-3 z-10 grid size-12 place-items-center rounded-full border-[3px] border-ink bg-paper hover:bg-platform lg:right-5"
        >
          {zoom ? <CloseIcon /> : <SearchIcon />}
        </button>
      </div>
    </div>
  );
}
