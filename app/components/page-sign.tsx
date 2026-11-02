import type { ReactNode } from "react";

// Station sign for a page head: the running line's soft band carries the roundel and title,
// an optional paper strip under a 3px rule carries whatever the visitor acts on (search, counts).
export function PageSign({
  title,
  roundel,
  lead,
  aside,
  children,
}: {
  title: ReactNode;
  roundel?: ReactNode;
  lead?: ReactNode;
  aside?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section aria-labelledby="page-title" className="mx-auto max-w-6xl px-4 pt-4 lg:pt-8">
      <div className="overflow-hidden rounded-[28px] border-[3px] border-ink">
        <div className="flood-soft relative px-5 py-5 lg:flex lg:items-end lg:justify-between lg:gap-10 lg:px-10 lg:py-8">
          <div className="min-w-0">
            <h1
              id="page-title"
              className="flex items-center gap-4 text-balance font-display text-[clamp(2.5rem,11vw,4.5rem)] font-extrabold leading-[0.95] tracking-[-0.04em]"
            >
              {roundel}
              <span className="min-w-0">{title}</span>
            </h1>
            {lead && <div className="mt-4 max-w-[48ch] text-lg font-semibold text-pretty">{lead}</div>}
          </div>
          {aside && <div className="mt-5 shrink-0 lg:mt-0">{aside}</div>}
        </div>
        {children && <div className="border-t-[3px] border-ink bg-paper px-4 py-4 lg:px-10 lg:py-5">{children}</div>}
      </div>
    </section>
  );
}

// Paper roundel with an ink ring: a station number, or an icon standing in for one.
export function StationRoundel({ children }: { children: ReactNode }) {
  return (
    <span
      aria-hidden="true"
      className="grid size-14 shrink-0 place-items-center rounded-full border-[5px] border-ink bg-paper text-2xl tracking-normal tabular lg:size-20 lg:text-4xl"
    >
      {children}
    </span>
  );
}
