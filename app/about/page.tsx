import type { Metadata } from "next";
import Link from "next/link";
import { categories, seasons } from "@/lib/catalog";
import { InfoPage } from "../components/info-page";
import { LineBadge } from "../components/signage";

export const metadata: Metadata = {
  title: "Бидний тухай — Online Shop",
  description: "Online Shop: Солонгосоос оруулж ирсэн бараа, улирлаар нь.",
};

export default function AboutPage() {
  return (
    <InfoPage
      title="Бидний тухай"
      lead="Online Shop нь Солонгосоос оруулж ирсэн барааг Монголд худалдаалдаг онлайн дэлгүүр."
      sections={[
        {
          title: "Юу зардаг вэ",
          body: (
            <>
              <p>Солонгосоос оруулж ирсэн дөрвөн төрлийн бараа:</p>
              <ul className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <li key={c.id}>
                    <Link
                      href={`/category/${c.id}`}
                      className="inline-flex min-h-11 items-center rounded-xl border-[3px] border-ink px-3.5 no-underline hover:bg-platform"
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ),
        },
        {
          title: "Улирлаар нь аялна",
          body: (
            <>
              <p>
                Дэлгүүр метроны газрын зураг шиг: улирал бүр өөрийн дугаар, өнгөтэй шугам, ангилал бүр тухайн шугамын
                буудал. Хэрэгтэй улирлаа сонгоод, тэр шугамаараа бараагаа олоорой.
              </p>
              <ul className="flex flex-wrap gap-2">
                {seasons.map((s) => (
                  <li key={s.id}>
                    <Link
                      href={`/season/${s.id}`}
                      className="inline-flex min-h-11 items-center gap-2 rounded-full border-[3px] border-ink py-1 pl-1 pr-4 no-underline hover:bg-platform"
                    >
                      <LineBadge season={s.id} size={30} />
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ),
        },
        {
          title: "Жинхэнэ Солонгос бараа",
          pending: true,
          body: (
            <p>
              Барааны гарал үүслийг батлах баримт, импортын мэдээллийг дэлгүүр бэлэн болмогц энд нийтэлнэ. Тэр болтол
              ямар ч баталгааг бид урьдчилан бичихгүй.
            </p>
          ),
        },
        { title: "Хэн бэ, хаана байдаг вэ", pending: true },
      ]}
    />
  );
}
