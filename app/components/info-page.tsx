import Link from "next/link";
import type { ReactNode } from "react";
import { PageSign, StationRoundel } from "./page-sign";
import { HereDot, Sample } from "./signage";

// The help pages are one short line: the footer lists them, and each page shows where it sits.
export const helpStops = [
  { id: "faq", label: "Түгээмэл асуулт", href: "/faq" },
  { id: "shipping", label: "Хүргэлт", href: "/shipping" },
  { id: "returns", label: "Буцаалт", href: "/returns" },
  { id: "contact", label: "Холбоо барих", href: "/contact" },
] as const;

type HelpId = (typeof helpStops)[number]["id"];

export type InfoSection = {
  title: string;
  body?: ReactNode;
  // Terms the shop has not settled yet: shown, labelled, never filled with guesses.
  pending?: boolean;
};

export function InfoPage({
  stop,
  title,
  lead,
  sections,
}: {
  stop?: HelpId;
  title: string;
  lead: ReactNode;
  sections: InfoSection[];
}) {
  const station = helpStops.findIndex((s) => s.id === stop) + 1;
  return (
    <>
      <PageSign
        title={title}
        roundel={station > 0 ? <StationRoundel>{station}</StationRoundel> : undefined}
        lead={lead}
      />

      <div className="mx-auto max-w-6xl px-4 pb-20 pt-10 lg:grid lg:grid-cols-[1fr_15rem] lg:gap-16 lg:pt-14">
        {/* Sections are stops on a rail; the reader travels down it. */}
        <ol className="max-w-[44rem]">
          {sections.map((s) => (
            <li key={s.title} className="group relative pb-10 pl-14 last:pb-0">
              {/* Each stop draws the rail down to the next one, so the line ends at the last stop. */}
              <span aria-hidden="true" className="flood absolute bottom-0 left-[13px] top-4 w-1.5 group-last:hidden" />
              <span
                aria-hidden="true"
                className={`absolute left-0 top-0.5 size-8 rounded-full border-[5px] bg-paper ${
                  s.pending ? "border-dashed border-ink-soft" : "border-(--line)"
                }`}
              />
              <h2 className="flex flex-wrap items-center gap-x-3 gap-y-2 font-display text-xl font-bold text-balance lg:text-2xl">
                {s.title}
                {s.pending && <Sample>Нөхцөл тодорхойгүй</Sample>}
              </h2>
              <div className="mt-2 max-w-[60ch] space-y-3 text-pretty text-ink-soft [&_a]:font-semibold [&_a]:text-ink">
                {s.body ?? <p>Энэ мэдээллийг дэлгүүр тодорхой болмогц энд нэмнэ.</p>}
              </div>
            </li>
          ))}
        </ol>

        {stop && (
          <nav aria-label="Тусламж" className="mt-14 lg:mt-0">
            <div className="rounded-[22px] border-[3px] border-ink p-4 lg:sticky lg:top-24">
              <h2 className="font-display text-base font-bold">Тусламж</h2>
              <ul className="relative mt-2">
                <span aria-hidden="true" className="flood absolute bottom-6 left-[13px] top-6 w-1.5 rounded-full" />
                {helpStops.map((h) => {
                  const here = h.id === stop;
                  return (
                    <li key={h.id} className="relative">
                      <Link
                        href={h.href}
                        aria-current={here ? "page" : undefined}
                        className={`flex min-h-12 items-center gap-3 no-underline ${here ? "font-bold" : "font-semibold hover:underline"}`}
                      >
                        <span className="grid size-8 shrink-0 place-items-center">
                          {here ? (
                            <HereDot />
                          ) : (
                            <span aria-hidden="true" className="size-6 rounded-full border-[5px] border-(--line) bg-paper" />
                          )}
                        </span>
                        {h.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>
        )}
      </div>
    </>
  );
}
