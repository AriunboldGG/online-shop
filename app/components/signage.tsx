import { getSeason, type SeasonId } from "@/lib/catalog";

// Line roundel: the season's number in its colour, like a metro line badge.
export function LineBadge({ season, size = 28 }: { season: SeasonId; size?: number }) {
  const s = getSeason(season);
  return (
    <span
      className="inline-grid shrink-0 place-items-center rounded-full font-display font-bold text-white tabular"
      style={{ background: s.color, width: size, height: size, fontSize: size * 0.48 }}
      title={`${s.of} улирал`}
    >
      {s.line}
    </span>
  );
}

// Marks content that stands in for something the shop has not supplied yet.
export function Sample({
  children = "Жишээ",
  onColor = false,
  className = "",
}: {
  children?: string;
  onColor?: boolean;
  className?: string;
}) {
  const tone = onColor ? "border-white text-white" : "border-ink-soft text-ink-soft";
  return (
    <span
      className={`inline-flex items-center rounded-full border-2 border-dashed px-2.5 py-1 text-xs font-semibold ${tone} ${className}`}
    >
      {children}
    </span>
  );
}

// Amber board lamp for lines currently in service. Never the black dot, which belongs to the selection.
export function RunningLamp({ label = "Одоо явж байна" }: { label?: string }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-board py-1 pl-2 pr-3 text-sm font-bold text-led">
      <span aria-hidden="true" className="size-2.5 rounded-full bg-led shadow-[0_0_6px_1px_rgb(255_176_32/0.7)]" />
      {label}
    </span>
  );
}

// "You are here": the one black mark, reserved for the current selection.
export function HereDot({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`block size-7 rounded-full border-[5px] border-white bg-ink shadow-[0_0_0_4px_var(--color-ink)] ${className}`}
    />
  );
}
