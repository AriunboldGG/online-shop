"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { formatPrice, getCategory, getSeason, searchCatalog } from "@/lib/catalog";
import { useCart } from "./cart";
import { ArrowIcon, BagIcon, CloseIcon, MenuIcon, SearchIcon } from "./icons";
import { SearchField, searchSuggestions } from "./search-field";
import { useLine } from "./line-flood";
import { LineBadge } from "./signage";

const nav = [
  { label: "Дэлгүүр", href: "/shop" },
  { label: "Улирал", href: "/#seasons" },
  { label: "Тавилга", href: "/category/furniture" },
  { label: "Хувцас", href: "/category/clothing" },
  { label: "Гутал", href: "/category/shoes" },
  { label: "Гэр ахуй", href: "/category/home" },
  { label: "Бидний тухай", href: "/about" },
];

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 no-underline" aria-label="Online Shop, нүүр хуудас">
      <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true">
        <circle cx="11" cy="15" r="8" fill="none" stroke="var(--line)" strokeWidth="5" />
        <circle cx="19" cy="15" r="8" fill="none" stroke="var(--color-ink)" strokeWidth="5" />
      </svg>
      <span className="font-display text-lg font-bold tracking-[-0.03em]">Online Shop</span>
    </Link>
  );
}

export function SiteHeader() {
  const { count, open } = useCart();
  const line = useLine();
  const [panel, setPanel] = useState<"menu" | "search" | null>(null);
  const menuId = useId();
  const searchId = useId();

  useEffect(() => {
    if (!panel) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPanel(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [panel]);

  const toggle = (p: "menu" | "search") => setPanel((cur) => (cur === p ? null : p));

  return (
    <header className="sticky top-0 z-40 bg-paper">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-2 px-4">
        <button
          type="button"
          onClick={() => toggle("menu")}
          aria-expanded={panel === "menu"}
          aria-controls={menuId}
          aria-label="Цэс"
          className="-ml-2 grid size-11 place-items-center rounded-full hover:bg-platform lg:hidden"
        >
          {panel === "menu" ? <CloseIcon /> : <MenuIcon />}
        </button>
        <Logo />

        <nav aria-label="Үндсэн цэс" className="ml-8 hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-full px-3 py-2 text-base font-semibold no-underline hover:bg-platform"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            onClick={() => toggle("search")}
            aria-expanded={panel === "search"}
            aria-controls={searchId}
            aria-label="Хайх"
            className="grid size-11 place-items-center rounded-full hover:bg-platform"
          >
            {panel === "search" ? <CloseIcon /> : <SearchIcon />}
          </button>
          <button
            type="button"
            onClick={open}
            aria-label={`Сагс, ${count} бараа`}
            className="flood relative grid size-11 place-items-center rounded-full text-white"
          >
            <BagIcon size={22} />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid min-w-6 place-items-center rounded-full border-2 border-paper bg-ink px-1 text-xs font-bold tabular">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Line band: platform doors open on it whenever the running line changes. */}
      <div className="h-1.5 bg-platform">
        <div key={line} className="doors h-full" style={{ background: getSeason(line).color }} />
      </div>

      {panel === "menu" && (
        <nav id={menuId} aria-label="Үндсэн цэс" className="border-b-[3px] border-ink bg-paper lg:hidden">
          <ul className="relative mx-4 py-3">
            <span aria-hidden="true" className="flood absolute bottom-7 left-[13px] top-7 w-1.5 rounded-full" />
            {nav.map((item) => (
              <li key={item.href} className="relative">
                <Link
                  href={item.href}
                  onClick={() => setPanel(null)}
                  className="flex min-h-12 items-center gap-4 text-lg font-semibold no-underline"
                >
                  <span aria-hidden="true" className="relative size-8 rounded-full border-[5px] border-[var(--line)] bg-paper" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {panel === "search" && <SearchPanel id={searchId} onDone={() => setPanel(null)} />}
    </header>
  );
}

function SearchPanel({ id, onDone }: { id: string; onDone: () => void }) {
  const [query, setQuery] = useState("");
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => input.current?.focus(), []);

  const q = query.trim();
  const matches = searchCatalog(q);
  const results = matches.slice(0, 5);
  const all = `/search?q=${encodeURIComponent(q)}`;

  return (
    <div id={id} className="border-b-[3px] border-ink bg-paper">
      <div className="mx-auto max-w-3xl px-4 py-4">
        <SearchField id={`${id}-input`} value={query} onChange={setQuery} inputRef={input} onSubmitted={onDone} />

        {!q ? (
          <div className="mt-4">
            <p className="text-sm font-semibold text-ink-soft">Түгээмэл хайлт</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {searchSuggestions.map((word) => (
                <li key={word}>
                  <button
                    type="button"
                    onClick={() => setQuery(word)}
                    className="inline-flex min-h-11 items-center rounded-xl border-[3px] border-ink px-3.5 font-semibold hover:bg-platform"
                  >
                    {word}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div aria-live="polite">
            {results.length === 0 ? (
              <div className="mt-4 rounded-[22px] bg-platform px-4 py-4">
                <p className="font-display font-bold">“{q}” гэсэн бараа олдсонгүй</p>
                <p className="mt-1 text-sm text-ink-soft">
                  Өөр үгээр хайх эсвэл{" "}
                  <Link href="/shop" onClick={onDone} className="font-semibold text-ink">
                    бүх барааг үзээрэй
                  </Link>
                  .
                </p>
              </div>
            ) : (
              <>
                <ul className="mt-3 divide-y-2 divide-rule">
                  {results.map((p) => (
                    <li key={p.id}>
                      <Link
                        href={`/product/${p.slug}`}
                        onClick={onDone}
                        className="flex min-h-16 items-center gap-3 py-2 no-underline hover:bg-platform"
                      >
                        <span className="block size-12 shrink-0 overflow-hidden rounded-full border-2 border-ink bg-platform">
                          <Image src={p.image} alt="" width={40} height={40} unoptimized className="size-full object-cover" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate font-semibold">{p.name}</span>
                          <span className="block text-sm text-ink-soft">{getCategory(p.category).name}</span>
                        </span>
                        <LineBadge season={p.seasons[0]} size={22} />
                        <span className="font-display text-sm font-bold tabular">{formatPrice(p.price)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href={all}
                  onClick={onDone}
                  className="mt-3 flex min-h-12 items-center justify-center gap-2 rounded-full border-[3px] border-ink font-display font-bold no-underline hover:bg-platform"
                >
                  Бүх үр дүн (<span className="tabular">{matches.length}</span>) <ArrowIcon size={20} />
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
