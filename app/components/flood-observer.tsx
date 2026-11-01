"use client";

import { useEffect } from "react";
import type { SeasonId } from "@/lib/catalog";
import { setLine } from "./line-flood";

// Any element with data-line takes over the running line while it holds the middle of the screen.
export function FloodObserver() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>("[data-line]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setLine(entry.target.getAttribute("data-line") as SeasonId);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return null;
}
