"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Stop = { x: number; y: number; label: string | null; side: "left" | "right"; at: number };
type LineMap = { d: string; width: number; height: number; stops: Stop[]; labels: boolean; scale: number };

// The homepage as one metro journey. A line runs down the margins beside the content and crosses
// the page only inside each section's empty top padding, so it never runs over text or cards.
// Each section with a heading is a station; the visitor's car rides the line, gliding to wherever
// they have scrolled, and the stretch already travelled fills with the running line's colour.
export function MetroJourney({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<SVGPathElement>(null);
  const travelled = useRef<SVGPathElement>(null);
  const car = useRef<SVGGElement>(null);
  const [map, setMap] = useState<LineMap | null>(null);
  const [passed, setPassed] = useState(0);

  // Lay the line out from the real section boxes; redo it whenever the page reflows.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const build = () => {
      const width = el.clientWidth;
      const height = el.scrollHeight;
      const base = el.getBoundingClientRect().top;
      const contentLeft = Math.max(16, (width - 1152) / 2 + 16);
      const inset = Math.max(7, contentLeft - 44);
      const xs = { left: inset, right: width - inset };
      const sections = [...el.querySelectorAll<HTMLElement>(":scope > section")];
      if (sections.length === 0) return;

      let side: "left" | "right" = "left";
      let y = sections[0].getBoundingClientRect().top - base;
      let d = `M ${xs[side]} ${y}`;
      const stops: Stop[] = [];

      sections.forEach((s, i) => {
        const box = s.getBoundingClientRect();
        const top = box.top - base;
        const band = parseFloat(getComputedStyle(s).paddingTop);
        // Cross over inside the padding band when it is tall enough to hold a curve.
        if (i > 0 && band >= 40) {
          const next = side === "left" ? "right" : "left";
          const y0 = top + band * 0.15;
          const y1 = top + band * 0.85;
          d += ` L ${xs[side]} ${y0} C ${xs[side]} ${y0 + (y1 - y0) * 0.75}, ${xs[next]} ${y1 - (y1 - y0) * 0.75}, ${xs[next]} ${y1}`;
          side = next;
          y = y1;
        }
        const label = s.dataset.journey ?? s.querySelector("h1, h2")?.textContent?.trim() ?? null;
        if (label) stops.push({ x: xs[side], y: Math.max(y, top + band) + 6, label, side, at: 0 });
      });
      d += ` L ${xs[side]} ${height}`;
      // On phones the line hugs a 16px margin, so the car shrinks to stay inside it.
      setMap({ d, width, height, stops, labels: contentLeft >= 150, scale: inset < 20 ? 0.62 : 1 });
    };

    build();
    const observer = new ResizeObserver(build);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Ride the line: the car's target is the point on the line level with the middle of the screen.
  useEffect(() => {
    const el = root.current;
    const path = track.current;
    if (!map || !el || !path) return;
    const total = path.getTotalLength();
    const samples: { len: number; y: number }[] = [];
    for (let len = 0; len <= total; len += 6) samples.push({ len, y: path.getPointAtLength(len).y });
    samples.push({ len: total, y: path.getPointAtLength(total).y });
    const lengthAt = (y: number) => {
      let lo = 0;
      let hi = samples.length - 1;
      while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (samples[mid].y < y) lo = mid + 1;
        else hi = mid;
      }
      return samples[lo].len;
    };
    const stopAt = map.stops.map((s) => lengthAt(s.y));
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let current = -1;
    let frame = 0;
    const draw = (len: number) => {
      const p = path.getPointAtLength(len);
      const q = path.getPointAtLength(Math.min(total, len + 2));
      const angle = (Math.atan2(q.y - p.y, q.x - p.x) * 180) / Math.PI;
      car.current?.setAttribute("transform", `translate(${p.x} ${p.y}) rotate(${angle}) scale(${map.scale})`);
      travelled.current?.style.setProperty("stroke-dashoffset", String(total - len));
      setPassed(stopAt.filter((s) => s <= len + 1).length);
    };
    const tick = () => {
      const target = lengthAt(window.scrollY + window.innerHeight * 0.5 - (el.getBoundingClientRect().top + window.scrollY));
      if (current < 0 || still) current = target;
      else current += (target - current) * 0.09;
      draw(current);
      frame = Math.abs(target - current) > 0.5 ? requestAnimationFrame(tick) : 0;
    };
    const wake = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };
    travelled.current?.style.setProperty("stroke-dasharray", String(total));
    tick();
    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("resize", wake);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", wake);
      window.removeEventListener("resize", wake);
    };
  }, [map]);

  return (
    <div ref={root} className="relative">
      {children}
      {map && (
        <svg
          aria-hidden="true"
          width={map.width}
          height={map.height}
          className="pointer-events-none absolute left-0 top-0 z-20 overflow-visible"
        >
          {/* The whole line, still ahead, in rail grey; the travelled stretch over it in the running colour. */}
          <path ref={track} d={map.d} fill="none" stroke="var(--color-rule)" strokeWidth="4" strokeLinecap="round" />
          <path
            ref={travelled}
            d={map.d}
            fill="none"
            stroke="var(--line)"
            strokeWidth="6"
            strokeLinecap="round"
            className="transition-[stroke] duration-500"
          />
          {map.stops.map((s, i) => {
            const reached = i < passed;
            return (
              <g key={`${s.label}-${i}`}>
                <circle
                  cx={s.x}
                  cy={s.y}
                  r={map.scale < 1 ? 5 : 8}
                  fill="var(--color-paper)"
                  stroke={reached ? "var(--line)" : "var(--color-rule)"}
                  strokeWidth={map.scale < 1 ? 3 : 4}
                  className="transition-[stroke] duration-500"
                />
                {map.labels && s.label && (
                  <text
                    x={s.side === "left" ? s.x - 16 : s.x + 16}
                    y={s.y + 4}
                    textAnchor={s.side === "left" ? "end" : "start"}
                    className={`font-display text-xs font-bold ${reached ? "fill-ink" : "fill-ink-soft"}`}
                  >
                    {s.label}
                  </text>
                )}
              </g>
            );
          })}
          <g ref={car}>
            <MetroCar />
          </g>
        </svg>
      )}
    </div>
  );
}

// The visitor's car: a one-ink doodle of a metro carriage, drawn nose-first along +x so it can be
// rotated to the line's direction. The stripe takes the running line's colour.
function MetroCar() {
  return (
    <g transform="translate(-22 -11)" strokeLinecap="round" strokeLinejoin="round">
      <path
        d="M4 3 H34 C40 3 44 8 44 13 V17 C44 18.5 43 19 41.5 19 H4 C2.5 19 2 18 2 16.5 V5.5 C2 4 2.8 3 4 3 Z"
        fill="var(--color-paper)"
        stroke="var(--color-ink)"
        strokeWidth="2.5"
      />
      <rect x="2" y="12" width="42" height="3.5" fill="var(--line)" className="transition-[fill] duration-500" />
      <rect x="7" y="6" width="6" height="4.5" rx="1" fill="var(--color-ink)" />
      <rect x="16" y="6" width="6" height="4.5" rx="1" fill="var(--color-ink)" />
      <rect x="25" y="6" width="6" height="4.5" rx="1" fill="var(--color-ink)" />
      <path d="M35 6 H37.5 C39.5 6.5 41 8.5 41.5 10.5 H35 Z" fill="var(--color-ink)" />
      <circle cx="11" cy="20.5" r="2.4" fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="2" />
      <circle cx="35" cy="20.5" r="2.4" fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="2" />
    </g>
  );
}
