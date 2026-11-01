import type { Metadata, Viewport } from "next";
import { Geologica, Golos_Text } from "next/font/google";
import { CartProvider } from "./components/cart";
import { AnnouncementBoard } from "./components/announcement-board";
import { SiteHeader } from "./components/site-header";
import { SiteFooter } from "./components/site-footer";
import "./globals.css";

// Mongolian ү and ө live in cyrillic-ext. Every face must actually draw them (Unbounded did not)
// with standard Cyrillic shapes (Montserrat Alternates turned И into U; Tektur turns д into g).
const display = Geologica({
  variable: "--font-display-face",
  weight: ["600", "700", "800"],
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
});

// Golos Text: built for public-service reading in Cyrillic; keeps 1, l and I distinct in prices and sizes.
const body = Golos_Text({
  variable: "--font-body-face",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
});

export const metadata: Metadata = {
  title: "Online Shop — Солонгосоос оруулж ирсэн бараа",
  description:
    "Солонгосоос оруулж ирсэн хувцас, гутал, гэр ахуйн бараа, тавилгыг улирлаар нь сонгоорой.",
};

export const viewport: Viewport = {
  themeColor: "#121214",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="mn" className={`${display.variable} ${body.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <CartProvider>
          <AnnouncementBoard />
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </CartProvider>
      </body>
    </html>
  );
}
