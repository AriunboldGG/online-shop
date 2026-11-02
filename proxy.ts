import { NextResponse, type NextRequest } from "next/server";
import products from "@/data/products.json";

const seasons = new Set(["spring", "summer", "autumn", "winter"]);
const categories = new Set(["furniture", "clothing", "shoes", "home"]);
const slugs = new Set(products.map((p) => p.slug));

// Unknown seasons, categories and products get a real 404 status. Without this, the streamed
// page renders its not-found UI after a 200 has already been sent.
export function proxy(request: NextRequest) {
  const [, section, slug] = request.nextUrl.pathname.split("/");
  const known =
    section === "season" ? seasons.has(slug) : section === "category" ? categories.has(slug) : slugs.has(slug);
  if (known) return NextResponse.next();
  return NextResponse.rewrite(new URL("/_missing", request.url), { status: 404 });
}

export const config = {
  matcher: ["/season/:slug", "/category/:slug", "/product/:slug"],
};
