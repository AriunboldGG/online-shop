import type { SVGProps } from "react";

// One ink, one stroke weight, everywhere. Doodles never carry meaning on their own.
const ink = {
  fill: "none",
  stroke: "var(--color-ink)",
  strokeWidth: 3,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

type DoodleProps = SVGProps<SVGSVGElement>;

export const DoodleArrow = (p: DoodleProps) => (
  <svg viewBox="0 0 120 90" {...ink} {...p}>
    <path d="M8 12c34 0 72 14 90 56" />
    <path d="M84 60l14 10 6-17" />
  </svg>
);

export const DoodleSpark = (p: DoodleProps) => (
  <svg viewBox="0 0 60 60" {...ink} {...p}>
    <path d="M30 6v14M30 40v14M6 30h14M40 30h14M14 14l8 8M38 38l8 8M46 14l-8 8M22 38l-8 8" />
  </svg>
);

export const DoodleLoop = (p: DoodleProps) => (
  <svg viewBox="0 0 160 70" {...ink} {...p}>
    <path d="M12 52c22 8 50-2 58-22 6-14-10-22-18-10-10 16 14 34 40 30 22-3 38-18 56-30" />
  </svg>
);

export const DoodleSquiggle = (p: DoodleProps) => (
  <svg viewBox="0 0 200 24" {...ink} preserveAspectRatio="none" {...p}>
    <path d="M4 14c14-12 26 10 40 0s26-12 40 0 26 10 40 0 26-12 40 0 22 6 32 2" />
  </svg>
);

export const DoodleCircle = (p: DoodleProps) => (
  <svg viewBox="0 0 200 120" {...ink} preserveAspectRatio="none" {...p}>
    <path d="M150 18C100 2 26 14 12 52c-12 34 50 58 112 52 54-5 76-36 62-62-8-15-30-24-58-26" />
  </svg>
);

export const DoodleBlossom = (p: DoodleProps) => (
  <svg viewBox="0 0 60 60" {...ink} {...p}>
    <path d="M30 24c-6-12 6-18 6-8M36 28c12-4 14 8 4 7M34 36c6 11-6 15-6 6M26 36c-11 6-15-6-6-7M24 28c-11-5-6-16 4-6" />
    <circle cx="30" cy="30" r="3" />
  </svg>
);

export const DoodleSun = (p: DoodleProps) => (
  <svg viewBox="0 0 60 60" {...ink} {...p}>
    <path d="M30 20a10 10 0 1 1-.1 0" />
    <path d="M30 4v7M30 49v7M4 30h7M49 30h7M12 12l5 5M43 43l5 5M48 12l-5 5M17 43l-5 5" />
  </svg>
);

export const DoodleLeaf = (p: DoodleProps) => (
  <svg viewBox="0 0 60 60" {...ink} {...p}>
    <path d="M10 50C8 26 24 10 50 10c1 24-14 40-40 40z" />
    <path d="M10 50 38 22M22 38l-2-10M30 30l10 1" />
  </svg>
);

export const DoodleSnowflake = (p: DoodleProps) => (
  <svg viewBox="0 0 60 60" {...ink} {...p}>
    <path d="M30 6v48M9 18l42 24M51 18 9 42" />
    <path d="M24 10l6 6 6-6M24 50l6-6 6 6M10 26l8-2-2-8M50 34l-8 2 2 8M50 26l-8-2 2-8M10 34l8 2-2 8" />
  </svg>
);

export const DoodleSprout = (p: DoodleProps) => (
  <svg viewBox="0 0 60 60" {...ink} {...p}>
    <path d="M30 54V28M30 34c-4-12-16-14-20-10 4 8 14 12 20 10zM30 28c4-12 16-16 22-12-4 10-14 14-22 12z" />
  </svg>
);

export const DoodleRain = (p: DoodleProps) => (
  <svg viewBox="0 0 60 60" {...ink} {...p}>
    <path d="M14 10c-4 8-6 12-2 14s6-4-2-14zM34 22c-4 8-6 12-2 14s6-4-2-14zM48 6c-4 8-6 12-2 14s6-4-2-14z" />
  </svg>
);

export const DoodleWave = (p: DoodleProps) => (
  <svg viewBox="0 0 80 50" {...ink} {...p}>
    <path d="M4 20c8-10 16-10 24 0s16 10 24 0 16-10 24 0M4 38c8-10 16-10 24 0s16 10 24 0 16-10 24 0" />
  </svg>
);

export const DoodlePopsicle = (p: DoodleProps) => (
  <svg viewBox="0 0 60 60" {...ink} {...p}>
    <path d="M20 40V16a10 10 0 0 1 20 0v24zM30 40v14M26 22l8 8M26 30l8-8" />
  </svg>
);

export const DoodleAcorn = (p: DoodleProps) => (
  <svg viewBox="0 0 60 60" {...ink} {...p}>
    <path d="M14 26c0-10 32-10 32 0zM18 26c0 16 6 24 12 26 6-2 12-10 12-26M30 16v-8" />
  </svg>
);

export const DoodleWind = (p: DoodleProps) => (
  <svg viewBox="0 0 80 50" {...ink} {...p}>
    <path d="M4 18h46c8 0 10-12 2-12-5 0-6 6-3 7M4 32h60c8 0 10 12 2 12-5 0-6-6-3-7" />
  </svg>
);

export const DoodleMitten = (p: DoodleProps) => (
  <svg viewBox="0 0 60 60" {...ink} {...p}>
    <path d="M20 46V22c0-12 22-12 22 0v24zM20 30c-8-4-12 4-8 10l8 4M18 46h26v8H18z" />
  </svg>
);

export const DoodleBreath = (p: DoodleProps) => (
  <svg viewBox="0 0 80 50" {...ink} {...p}>
    <path d="M8 30c0-8 10-10 14-6 2-10 18-10 20 0 6-6 18-2 16 8-1 8-12 8-14 4-4 6-16 6-18 0-6 4-18 2-18-6z" />
  </svg>
);

export const DoodleStar = (p: DoodleProps) => (
  <svg viewBox="0 0 60 60" {...ink} {...p}>
    <path d="M30 6l6 16 17 2-13 11 4 17-14-9-14 9 4-17-13-11 17-2z" />
  </svg>
);
