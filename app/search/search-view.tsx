"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { categories, searchCatalog, seasons } from "@/lib/catalog";
import { Collection } from "../components/collection";
import { useLine } from "../components/line-flood";
import { PageSign, StationRoundel } from "../components/page-sign";
import { SearchField, searchSuggestions } from "../components/search-field";
import { SearchIcon } from "../components/icons";
import { seasonDoodles } from "../components/season-doodles";
import { LineBadge } from "../components/signage";

export function SearchView({ initial }: { initial: string }) {
  const router = useRouter();
  const id = useId();
  const [query, setQuery] = useState(initial);
  const [synced, setSynced] = useState(initial);

  // Header search and back/forward navigation both arrive as a new `initial`. Our own replace
  // echoes back trimmed, so leave the field alone then or a typed trailing space would vanish.
  if (initial !== synced) {
    setSynced(initial);
    if (query.trim() !== initial.trim()) setQuery(initial);
  }

  const q = query.trim();
  const results = searchCatalog(q);

  // Keep the address shareable without stacking a history entry per keystroke.
  useEffect(() => {
    const t = setTimeout(() => {
      if (q === initial.trim()) return;
      router.replace(q ? `/search?q=${encodeURIComponent(q)}` : "/search", { scroll: false });
    }, 300);
    return () => clearTimeout(t);
  }, [q, initial, router]);

  return (
    <>
      <PageSign
        title="Хайлт"
        roundel={
          <StationRoundel>
            <SearchIcon size={28} strokeWidth={3} />
          </StationRoundel>
        }
        lead={
          <span aria-live="polite">
            {q && results.length === 0 ? (
              <>“{q}” — бараа олдсонгүй</>
            ) : q ? (
              <>
                “{q}” — <span className="tabular">{results.length}</span> бараа олдлоо
              </>
            ) : (
              "Нэр, ангилал, улирал эсвэл өнгөөр хайгаарай."
            )}
          </span>
        }
      >
        <SearchField id={id} value={query} onChange={setQuery} />
      </PageSign>

      {!q ? (
        <Start onPick={setQuery} />
      ) : results.length === 0 ? (
        <NoResults query={q} onPick={setQuery} />
      ) : (
        <Collection key={q} products={results} label={`“${q}” хайлтын үр дүн`} />
      )}
    </>
  );
}

function Suggestions({ onPick, label }: { onPick: (q: string) => void; label: string }) {
  return (
    <div>
      <h2 className="font-display text-lg font-bold">{label}</h2>
      <ul className="mt-3 flex flex-wrap gap-2">
        {searchSuggestions.map((word) => (
          <li key={word}>
            <button
              type="button"
              onClick={() => onPick(word)}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border-[3px] border-ink px-3.5 font-semibold hover:bg-platform"
            >
              <SearchIcon size={16} strokeWidth={2.8} />
              {word}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Before anything is typed: words that find something, then the two ways into the catalog.
function Start({ onPick }: { onPick: (q: string) => void }) {
  return (
    <section aria-label="Хайлтын санал" className="mx-auto max-w-6xl px-4 pb-20 pt-8 lg:pt-10">
      <Suggestions onPick={onPick} label="Түгээмэл хайлт" />
      <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-10">
        <Lines />
        <Stations />
      </div>
    </section>
  );
}

function Lines() {
  return (
    <div>
      <h2 className="font-display text-lg font-bold">Улирлаар нь</h2>
      <ul className="mt-3 grid grid-cols-2 gap-2">
        {seasons.map((s) => (
          <li key={s.id}>
            <Link
              href={`/season/${s.id}`}
              className="flex min-h-16 items-center gap-3 rounded-2xl border-[3px] border-ink px-3 font-display text-lg font-bold no-underline hover:bg-platform"
            >
              <LineBadge season={s.id} size={36} />
              {s.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Stations() {
  return (
    <div>
      <h2 className="font-display text-lg font-bold">Ангиллаар нь</h2>
      <ul className="mt-3 grid grid-cols-2 gap-2">
        {categories.map((c) => (
          <li key={c.id}>
            <Link
              href={`/category/${c.id}`}
              className="flex min-h-16 items-center gap-3 rounded-2xl border-[3px] border-ink py-1 pl-1.5 pr-3 font-display text-lg font-bold no-underline hover:bg-platform"
            >
              <span className="block size-12 shrink-0 overflow-hidden rounded-full border-2 border-ink bg-platform">
                <Image src={c.image} alt="" width={40} height={40} unoptimized className="size-full object-cover" />
              </span>
              {c.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Nothing matched: the rail stops short, and the way forward is right under it.
function NoResults({ query, onPick }: { query: string; onPick: (q: string) => void }) {
  const Signature = seasonDoodles[useLine()].signature;
  return (
    <section aria-label="Үр дүн олдсонгүй" className="mx-auto max-w-6xl px-4 pb-20 pt-8 lg:pt-10">
      <div className="rounded-[28px] border-[3px] border-ink px-5 pb-8 pt-8 lg:px-10">
        <div aria-hidden="true" className="relative mb-6 h-20 max-w-sm">
          <Signature className="absolute right-[12%] top-0 w-14" />
          <span className="flood absolute bottom-3 left-0 h-2.5 w-[58%] rounded-full" />
          <span className="absolute bottom-3 left-[64%] h-2.5 w-[10%] rounded-full bg-rule" />
          <span className="absolute bottom-0 left-[6%] size-8 rounded-full border-[5px] border-(--line) bg-paper" />
          <span className="absolute bottom-0 left-[44%] size-8 rounded-full border-[5px] border-(--line) bg-paper" />
          <span className="absolute bottom-0 left-[82%] size-8 rounded-full border-[5px] border-dashed border-ink-soft bg-paper" />
        </div>
        <p className="font-display text-2xl font-bold text-balance">“{query}” гэсэн бараа олдсонгүй</p>
        <p className="mt-2 max-w-[48ch] text-ink-soft text-pretty">
          Үгээ богиносгох, өөр үгээр бичих эсвэл ангилал, улирлаар нь үзээрэй.
        </p>
        <div className="mt-6">
          <Suggestions onPick={onPick} label="Эдгээрийг оролдоод үзээрэй" />
        </div>
        <Link
          href="/shop"
          className="flood mt-8 inline-flex min-h-13 items-center rounded-full px-6 font-display font-bold text-white no-underline"
        >
          Бүх барааг үзэх
        </Link>
      </div>
      <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-10">
        <Lines />
        <Stations />
      </div>
    </section>
  );
}
