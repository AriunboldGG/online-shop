"use client";

import { useRouter } from "next/navigation";
import type { Ref } from "react";
import { CloseIcon, SearchIcon } from "./icons";

// Words that each find something in the catalog today; shown before the shopper has typed.
export const searchSuggestions = ["куртик", "гутал", "ноосон", "шаахай", "сандал", "өвлийн"];

// The one search pill: header panel and search page share it. Enter opens the results page.
export function SearchField({
  id,
  value,
  onChange,
  inputRef,
  onSubmitted,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  inputRef?: Ref<HTMLInputElement>;
  onSubmitted?: () => void;
}) {
  const router = useRouter();
  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        const q = value.trim();
        if (!q) return;
        router.push(`/search?q=${encodeURIComponent(q)}`);
        onSubmitted?.();
      }}
    >
      <label htmlFor={id} className="sr-only">
        Бараа хайх
      </label>
      <div className="flex h-14 items-center gap-3 rounded-full border-[3px] border-ink bg-paper pl-5 pr-1.5 focus-within:outline-3 focus-within:outline-offset-3 focus-within:outline-ink">
        <SearchIcon className="shrink-0" />
        <input
          ref={inputRef}
          id={id}
          type="search"
          enterKeyHint="search"
          autoComplete="off"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Жишээ нь: куртик, гутал, сандал"
          className="h-full min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-ink-soft [&::-webkit-search-cancel-button]:hidden"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Хайлтыг арилгах"
            className="grid size-11 shrink-0 place-items-center rounded-full hover:bg-platform"
          >
            <CloseIcon size={20} />
          </button>
        )}
      </div>
    </form>
  );
}
