import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "../components/info-page";

export const metadata: Metadata = {
  title: "Түгээмэл асуулт — Online Shop",
};

export default function FaqPage() {
  return (
    <InfoPage
      stop="faq"
      title="Түгээмэл асуулт"
      lead="Үнэ, хэмжээ, хүргэлтийн талаар хамгийн их асуудаг зүйлс."
      sections={[
        {
          title: "Үнийг ямар мөнгөн тэмдэгтээр харуулдаг вэ?",
          body: <p>Бүх үнийг төгрөгөөр (₮) харуулна.</p>,
        },
        {
          title: "Хэмжээгээ яаж сонгох вэ?",
          body: (
            <p>
              Хувцас S–XL, гутал Солонгос миллиметрийн хэмжээгээр (230–290). Хувцас, гутал бүрийн хуудсанд «Хэмжээний
              заавар» байгаа. Тавилга, гэр ахуйн бараанд хэмжээний оронд урт, өргөн, өндрийг бичнэ.
            </p>
          ),
        },
        {
          title: "Бараа нь үнэхээр Солонгосынх уу?",
          body: (
            <p>
              Манай бүх бараа Солонгосоос оруулж ирсэн. Баталгааны баримтыг <Link href="/about">Бидний тухай</Link>{" "}
              хуудсанд нэмнэ.
            </p>
          ),
        },
        { title: "Ямар аргаар төлбөр төлөх вэ?", pending: true },
        {
          title: "Хүргэлт хэд хоног болох вэ?",
          pending: true,
          body: (
            <p>
              Хугацаа, үнийг тодорхой болмогц <Link href="/shipping">Хүргэлт</Link> хуудсанд нийтэлнэ.
            </p>
          ),
        },
        {
          title: "Барааг буцааж болох уу?",
          pending: true,
          body: (
            <p>
              Буцаалтын нөхцөлийг <Link href="/returns">Буцаалт</Link> хуудсанд нийтэлнэ.
            </p>
          ),
        },
      ]}
    />
  );
}
