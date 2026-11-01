"use client";

import { useSyncExternalStore } from "react";
import { getSeason, type SeasonId } from "@/lib/catalog";

// The running line floods the header band, buttons and marquee with its colour.
let current: SeasonId = "autumn";
const listeners = new Set<() => void>();

export function setLine(id: SeasonId) {
  if (id === current) return;
  current = id;
  const season = getSeason(id);
  document.documentElement.style.setProperty("--line", season.color);
  document.documentElement.style.setProperty("--line-soft", season.soft);
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useLine() {
  return useSyncExternalStore(
    subscribe,
    () => current,
    () => "autumn" as SeasonId,
  );
}
