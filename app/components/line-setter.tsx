"use client";

import { useEffect } from "react";
import type { SeasonId } from "@/lib/catalog";
import { setLine } from "./line-flood";

// A page that belongs to one line claims it for the header band and buttons.
export function LineSetter({ season }: { season: SeasonId }) {
  useEffect(() => setLine(season), [season]);
  return null;
}
