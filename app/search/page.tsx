import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchView } from "./search-view";

export async function generateMetadata({ searchParams }: PageProps<"/search">): Promise<Metadata> {
  const q = (await searchParams).q;
  const query = typeof q === "string" ? q.trim() : "";
  return { title: query ? `“${query}” — Хайлт — Online Shop` : "Хайлт — Online Shop" };
}

// The shell (sign and search pill) prerenders; the query streams in behind it.
export default function SearchPage({ searchParams }: PageProps<"/search">) {
  return (
    <Suspense fallback={<SearchView initial="" />}>
      <Results searchParams={searchParams} />
    </Suspense>
  );
}

async function Results({ searchParams }: Pick<PageProps<"/search">, "searchParams">) {
  const q = (await searchParams).q;
  return <SearchView initial={typeof q === "string" ? q : ""} />;
}
