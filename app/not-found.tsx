import Link from "next/link";
import { seasons } from "@/lib/catalog";
import { ArrowIcon, SearchIcon } from "./components/icons";
import { LineBadge } from "./components/signage";

export const metadata = { title: "Хуудас олдсонгүй — Online Shop" };

// A wrong stop: the board says so, the rail ends short, and the ways back are all within reach.
export default function NotFound() {
  return (
    <section aria-labelledby="missing-title" className="mx-auto max-w-6xl px-4 pb-20 pt-4 lg:pt-8">
      <div className="overflow-hidden rounded-[28px] border-[3px] border-ink">
        <div className="led-board led-dots relative flex h-12 items-center gap-3 overflow-hidden bg-board px-5 lg:px-10">
          <span aria-hidden="true" className="size-2.5 shrink-0 rounded-full bg-led shadow-[0_0_6px_1px_rgb(255_176_32/0.7)]" />
          <p className="led-glow truncate font-display text-[0.78rem] font-bold uppercase tracking-[0.03em]">
            404 · Энэ буудал байхгүй
          </p>
        </div>

        <div className="px-5 pb-8 pt-8 lg:px-10 lg:pb-12 lg:pt-10">
          <div aria-hidden="true" className="relative mb-8 h-10 max-w-md">
            <span className="flood absolute left-0 top-1/2 h-2.5 w-[62%] -translate-y-1/2 rounded-full" />
            <span className="absolute left-[6%] top-1/2 size-8 -translate-y-1/2 rounded-full border-[5px] border-(--line) bg-paper" />
            <span className="absolute left-[34%] top-1/2 size-8 -translate-y-1/2 rounded-full border-[5px] border-(--line) bg-paper" />
            <span className="absolute left-[70%] top-1/2 h-2.5 w-[12%] -translate-y-1/2 rounded-full bg-rule" />
            <span className="absolute left-[88%] top-1/2 size-8 -translate-y-1/2 rounded-full border-[5px] border-dashed border-ink-soft bg-paper" />
          </div>

          <h1
            id="missing-title"
            className="max-w-[14ch] text-balance font-display text-[clamp(2.1rem,9vw,4.5rem)] font-extrabold leading-[0.98] tracking-[-0.04em]"
          >
            Ийм хуудас алга
          </h1>
          <p className="mt-4 max-w-[46ch] text-lg text-ink-soft text-pretty">
            Холбоос буруу эсвэл хуудас шилжсэн байж магадгүй. Хайх эсвэл доорх шугамуудаас сонгоорой.
          </p>

          {/* A plain GET form: search works here even before scripts load. */}
          <form action="/search" role="search" className="mt-6 max-w-xl">
            <label htmlFor="missing-search" className="sr-only">
              Бараа хайх
            </label>
            <div className="flex h-14 items-center gap-3 rounded-full border-[3px] border-ink bg-paper pl-5 pr-1.5 focus-within:outline-3 focus-within:outline-offset-3 focus-within:outline-ink">
              <SearchIcon className="shrink-0" />
              <input
                id="missing-search"
                name="q"
                type="search"
                enterKeyHint="search"
                placeholder="Бараа хайх"
                className="h-full min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-ink-soft"
              />
              <button type="submit" className="flood min-h-11 shrink-0 rounded-full px-5 font-semibold text-white">
                Хайх
              </button>
            </div>
          </form>

          <ul className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {seasons.map((s) => (
              <li key={s.id}>
                <Link
                  href={`/season/${s.id}`}
                  className="flex min-h-14 items-center gap-3 rounded-2xl border-[3px] border-ink px-3 font-display font-bold no-underline hover:bg-platform"
                >
                  <LineBadge season={s.id} size={32} />
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href="/"
              className="flood inline-flex min-h-14 items-center gap-2 rounded-full px-7 font-display font-bold text-white no-underline"
            >
              Нүүр хуудас руу <ArrowIcon size={20} />
            </Link>
            <Link href="/shop" className="inline-flex min-h-11 items-center font-semibold">
              Бүх барааг үзэх
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
