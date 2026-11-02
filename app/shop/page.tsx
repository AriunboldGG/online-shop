import type { Metadata } from "next";
import { catalog, categories, seasons } from "@/lib/catalog";
import { Collection } from "../components/collection";
import { PageSign } from "../components/page-sign";
import { LineBadge } from "../components/signage";

export const metadata: Metadata = {
  title: "Бүх бараа — Online Shop",
  description: "Солонгосоос оруулж ирсэн бүх бараа: тавилга, хувцас, гутал, гэр ахуй.",
};

export default function ShopPage() {
  return (
    <>
      <PageSign
        title="Бүх бараа"
        lead={
          <>
            {catalog.length} бараа · {seasons.length} улирал · {categories.length} ангилал
            <span className="mt-1 block font-semibold">Солонгосоос оруулж ирсэн</span>
          </>
        }
        aside={
          // Every line runs through the shop: the four roundels sit on one ink rail.
          <span role="img" aria-label="Дөрвөн улирал" className="relative inline-flex items-center gap-3">
            <span aria-hidden="true" className="absolute inset-x-2 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-ink" />
            {seasons.map((s) => (
              <span key={s.id} className="relative rounded-full border-[3px] border-ink">
                <LineBadge season={s.id} size={44} />
              </span>
            ))}
          </span>
        }
      />
      <Collection products={catalog} label="Бүх бараа" look="hang" />
    </>
  );
}
