import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowIcon, FacebookIcon, InstagramIcon } from "./icons";
import { Sample } from "./signage";

const help = [
  { label: "Түгээмэл асуулт", href: "/faq" },
  { label: "Хүргэлт", href: "/shipping" },
  { label: "Буцаалт", href: "/returns" },
  { label: "Холбоо барих", href: "/contact" },
];

const shop = [
  { label: "Тавилга", href: "/category/furniture" },
  { label: "Хувцас", href: "/category/clothing" },
  { label: "Гутал", href: "/category/shoes" },
  { label: "Гэр ахуй", href: "/category/home" },
];

const announcements = ["Эцсийн буудал · Online Shop", "Тавтай сайхан аялаарай"];

// The footer is the terminus: the board announces the last stop, the rail runs into a buffer stop,
// and the link columns are the station's exits.
export function SiteFooter() {
  return (
    <footer className="overflow-hidden bg-board text-white">
      <div className="led-board border-b-[3px] border-(--line) transition-colors duration-500">
        <div className="led-dots mx-auto h-9 max-w-6xl overflow-hidden px-4">
          <ul className="led-track">
            {announcements.map((text) => (
              <li key={text} className="flex h-9 items-center justify-center gap-2">
                <span aria-hidden="true" className="flood size-2.5 rounded-full shadow-[0_0_6px_1px_var(--line)]" />
                <span className="led-glow whitespace-nowrap font-display text-[0.78rem] font-bold uppercase tracking-[0.03em]">
                  {text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-10 pt-12 lg:pt-16">
        {/* The line arrives from off-screen and stops dead at the buffer. */}
        <div aria-hidden="true" className="relative mb-6 h-14">
          <span className="flood absolute -left-[100vw] right-12 top-1/2 h-2.5 -translate-y-1/2 transition-colors duration-500" />
          <span className="absolute right-[4.5rem] top-1/2 size-7 -translate-y-1/2 rounded-full border-[5px] border-(--line) bg-board transition-colors duration-500" />
          <BufferStop className="absolute right-0 top-0 h-14" />
        </div>

        {/* Exits, numbered the way station exits are. */}
        <div className="mt-4 grid gap-10 sm:grid-cols-3 lg:mt-6">
          <Exit number={1} title="Тусламж">
            <ul className="space-y-1">
              {help.map((l) => (
                <li key={l.href}>
                  <ExitLink href={l.href}>{l.label}</ExitLink>
                </li>
              ))}
            </ul>
          </Exit>
          <Exit number={2} title="Ангилал">
            <ul className="space-y-1">
              {shop.map((l) => (
                <li key={l.href}>
                  <ExitLink href={l.href}>{l.label}</ExitLink>
                </li>
              ))}
            </ul>
          </Exit>
          <Exit number={3} title="Биднийг дагаарай">
            <ul className="flex gap-2">
              <li>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="grid size-12 place-items-center rounded-full border-2 border-white/60 hover:bg-white/10"
                >
                  <InstagramIcon />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  aria-label="Facebook"
                  className="grid size-12 place-items-center rounded-full border-2 border-white/60 hover:bg-white/10"
                >
                  <FacebookIcon />
                </a>
              </li>
            </ul>
            <Sample onColor className="mt-4">
              Хаягийн мэдээлэл
            </Sample>
          </Exit>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/25 pt-6 text-sm text-white/80 sm:flex-row sm:items-center sm:justify-between">
          <p>Аялалд баярлалаа. </p>
          <p>© 2026 Online Shop.</p>
        </div>
      </div>
    </footer>
  );
}

function Exit({ number, title, children }: { number: number; title: string; children: ReactNode }) {
  return (
    <nav aria-label={title}>
      <h2 className="flex items-center gap-3 font-display text-base font-bold">
        <span className="flex h-8 items-center gap-1.5 rounded-md bg-led px-2 font-display text-sm font-extrabold text-board tabular">
          <ExitMark />
          {number}
        </span>
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </nav>
  );
}

function ExitLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="group inline-flex min-h-11 items-center gap-2 no-underline hover:underline">
      <ArrowIcon size={16} className="text-led transition-transform duration-300 group-hover:translate-x-0.5" />
      {children}
    </Link>
  );
}

// A small walking-out figure, the way exit signs draw it.
function ExitMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="2.8" r="1.6" fill="currentColor" stroke="none" />
      <path d="M8.5 6 6 9.5l3 1.5V15M8.5 6l2.5 2.5 2.5.5M6 9.5 3.5 15M8.5 6 5 6.5 3.5 9" />
    </svg>
  );
}

// End of the line: a buffer stop drawn in white on the board, its face in hazard stripes.
function BufferStop({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 56 56" className={className} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 46 L26 14 M46 46 L30 14" stroke="var(--color-paper)" strokeWidth="3" />
      <path d="M4 46 H52" stroke="var(--color-paper)" strokeWidth="3" />
      <rect x="14" y="8" width="28" height="14" rx="3" fill="var(--color-led)" stroke="var(--color-paper)" strokeWidth="3" />
      <path d="M20 9.5 16 20.5 M27 9.5 23 20.5 M34 9.5 30 20.5 M41 9.5 37 20.5" stroke="var(--color-board)" strokeWidth="2.5" />
    </svg>
  );
}
