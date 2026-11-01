import Link from "next/link";

const messages = [
  { text: "Шинэ улирал: Намар · Өвөл", href: "/season/autumn" },
  { text: "Үнэгүй хүргэлт", href: "/shipping" },
];

export function AnnouncementBoard() {
  return (
    <aside aria-label="Мэдээлэл" className="led-board border-b-[3px] border-[var(--line)] bg-board transition-colors duration-500">
      <div className="led-dots mx-auto h-9 max-w-6xl overflow-hidden px-4">
        <ul className="led-track">
          {messages.map((m) => (
            <li key={m.text} className="flex h-9 items-center justify-center">
              <Link
                href={m.href}
                className="led-glow flex items-center gap-2 whitespace-nowrap font-display text-[0.78rem] font-bold uppercase tracking-[0.03em] no-underline"
              >
                <span aria-hidden="true" className="flood size-2.5 rounded-full shadow-[0_0_6px_1px_var(--line)]" />
                {m.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
