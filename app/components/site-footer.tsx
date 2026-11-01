import Link from "next/link";
import { seasons } from "@/lib/catalog";
import { FacebookIcon, InstagramIcon } from "./icons";
import { LineBadge, Sample } from "./signage";

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

export function SiteFooter() {
  return (
    <footer className="bg-board text-white">
      <div className="mx-auto max-w-6xl px-4 pb-10 pt-14">
        <div className="flex flex-wrap items-center gap-3">
          {seasons.map((s) => (
            <LineBadge key={s.id} season={s.id} size={36} />
          ))}
        </div>
        <p className="mt-5 max-w-[18ch] font-display text-3xl font-bold leading-tight tracking-[-0.03em] lg:text-5xl">
          Online Shop
        </p>

        <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-3">
          <nav aria-label="Тусламж">
            <h2 className="font-display text-sm font-bold text-led">Тусламж</h2>
            <ul className="mt-3 space-y-1">
              {help.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-flex min-h-11 items-center no-underline hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Ангилал">
            <h2 className="font-display text-sm font-bold text-led">Ангилал</h2>
            <ul className="mt-3 space-y-1">
              {shop.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-flex min-h-11 items-center no-underline hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h2 className="font-display text-sm font-bold text-led">Биднийг дагаарай</h2>
            <ul className="mt-3 flex gap-2">
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
            <Sample onColor className="mt-3">
              Хаягийн мэдээлэл
            </Sample>
          </div>
        </div>

        <p className="mt-14 border-t border-white/25 pt-6 text-sm text-white/80">
          © 2026 Online Shop.
        </p>
      </div>
    </footer>
  );
}
