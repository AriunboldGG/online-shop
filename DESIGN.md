---
name: Online Shop
description: Korean imports for Mongolia, sold as a Seoul-style metro map where every season is a coloured line.
colors:
  ink: "#1d1d1f"
  ink-soft: "#4a4a50"
  paper: "#ffffff"
  platform: "#f3f2ee"
  rule: "#d9d8d2"
  board: "#121214"
  led: "#ffb020"
  spring: "#bf3d6d"
  spring-soft: "#ffd0db"
  summer: "#08822e"
  summer-soft: "#c1f0c5"
  autumn: "#b85207"
  autumn-soft: "#fccda5"
  winter: "#50667c"
  winter-soft: "#d3e0ec"
typography:
  display:
    fontFamily: "Geologica, Segoe UI, sans-serif"
    fontSize: "clamp(2.1rem, 9vw, 5.5rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  display-line:
    fontFamily: "Geologica, Segoe UI, sans-serif"
    fontSize: "clamp(3rem, 15vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Geologica, Segoe UI, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  headline-lg:
    fontFamily: "Geologica, Segoe UI, sans-serif"
    fontSize: "3rem"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Geologica, Segoe UI, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.3
  price:
    fontFamily: "Geologica, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 700
    fontFeature: "\"tnum\" 1"
  body:
    fontFamily: "Golos Text, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Golos Text, Segoe UI, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.4
  station-code:
    fontFamily: "Geologica, Segoe UI, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    fontFeature: "\"tnum\" 1"
  led:
    fontFamily: "Geologica, Segoe UI, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 700
    letterSpacing: "0.03em"
rounded:
  chip: "12px"
  tile: "16px"
  module: "22px"
  sign: "28px"
  full: "9999px"
spacing:
  gutter: "16px"
  grid-gap: "12px"
  grid-gap-lg: "20px"
  section: "64px"
  section-lg: "96px"
  tap: "44px"
  cta: "56px"
components:
  button-line:
    backgroundColor: "{colors.autumn}"
    textColor: "{colors.paper}"
    typography: "{typography.price}"
    rounded: "{rounded.full}"
    padding: "0 24px"
    height: "56px"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "0 28px"
    height: "56px"
  button-add:
    backgroundColor: "{colors.autumn}"
    textColor: "{colors.paper}"
    rounded: "{rounded.full}"
    size: "44px"
  button-ring:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    size: "48px"
  button-ring-hover:
    backgroundColor: "{colors.platform}"
  chip-filter:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.chip}"
    height: "44px"
    padding: "0 8px"
  chip-filter-active:
    backgroundColor: "{colors.autumn}"
    textColor: "{colors.paper}"
  chip-active-filter:
    backgroundColor: "{colors.platform}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    height: "40px"
  input-pill:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.full}"
    height: "56px"
    padding: "0 20px"
  product-module:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.module}"
  sign-panel:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sign}"
  soft-panel:
    backgroundColor: "{colors.autumn-soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sign}"
  line-roundel:
    backgroundColor: "{colors.autumn}"
    textColor: "{colors.paper}"
    typography: "{typography.price}"
    rounded: "{rounded.full}"
    size: "64px"
  sample-tag:
    textColor: "{colors.ink-soft}"
    typography: "{typography.station-code}"
    rounded: "{rounded.full}"
    padding: "4px 10px"
  running-lamp:
    backgroundColor: "{colors.board}"
    textColor: "{colors.led}"
    rounded: "{rounded.full}"
    padding: "4px 12px 4px 8px"
  led-board:
    backgroundColor: "{colors.board}"
    textColor: "{colors.led}"
    typography: "{typography.led}"
    height: "36px"
---

# Design System: Online Shop

## Overview

**Creative North Star: "The Season Line"**

The store is a Seoul-style metro map. Each season is a numbered, coloured line (1 Spring, 2 Summer, 3 Autumn, 4 Winter); each category is a station on that line (1 Furniture, 2 Clothing, 3 Shoes, 4 Home); each product is a stop with a station code such as `3-02`. The visual language is transit wayfinding read through white enamel signage: thick ink borders, generous rounded corners, two-tone line-colour bands, a rail with ring stops, and a black LED destination board with amber dot-matrix type. It is bold and legible at arm's length on a phone, not soft or editorial.

One line is always "running" on the page. The `--line` and `--line-soft` custom properties (default autumn) are rewritten together as the visitor scrolls past `data-line` sections or enters a season. Everything you act on or follow (primary buttons, the cart button, add buttons, rails, ring stops, the header's line band) takes the deep tone; every region you read (marquee, signup panel, cart drawer header, checkout confirmation header, product station sign) takes the soft tone, and the header band re-opens like platform doors. Colour therefore carries position, not decoration.

Hand-drawn marker doodles in a single ink and a single stroke weight add warmth on top of the signage grid; they never carry meaning. Imagery is authored placeholder illustration (SVG cutouts) standing on the rail, always tagged as an example until real photography exists.

**Key Characteristics:**
- Metro-map metaphor: seasons are lines, categories are stations, products are stops with codes.
- 3px ink borders and 22–28px radii on every sign, module and panel; pills for every control.
- Four season lines, each in two tones of one hue: deep for things you act on or follow (white text), soft for regions you read (ink text).
- One running line (`--line` / `--line-soft`) colours the interactive chrome and changes with context.
- Black LED board with amber dot-matrix type for announcements and "running now" status.
- One black "you are here" dot, reserved for the current selection.
- Flat: depth comes from borders, bands and cutouts, never from drop shadows.

## Colors

A white-enamel signage palette on a neutral base: near-black ink and warm off-white platform greys carry the structure, four seasonal lines (soft spring pink, fresh summer green, warm autumn orange, cool winter grey-blue) carry wayfinding in a deep and a soft tone each, and an amber LED on black carries live status.

### Primary
- **Deep line tones** (spring, summer, autumn, winter): Rose Line Pink, Paddy Green, Ginkgo Orange and Winter Slate. Everything you act on or follow: line badges and number roundels, rails and ring stops, the header line band, primary and add buttons, active chips and the active season tile, the "Цөөн үлдсэн" badge. Text on a deep tone is always white (5.11, 4.95, 4.94 and 5.98:1). Spring deep doubles as the error colour for validation text, error borders and an invalid size rail on paper.
- **Soft line tones** (spring-soft, summer-soft, autumn-soft, winter-soft): Blossom Pink, Mint Leaf, Persimmon Cream and Frost Grey-Blue. Large regions you read: the homepage hero band, the marquee, season cards, the season hero, the signup panel, lookbook circles, the cart drawer header, the checkout confirmation header, the product station-sign band and the gallery's "line" view. Text on a soft tone is always ink (11.57:1 or better). Soft regions keep 3px ink borders; number roundels inside them are deep-filled with white numerals and a 3px ink ring; rails inside them stay deep (deep on its own soft is 3.39 to 4.44:1, enough for graphics, not for text).

### Secondary
- **LED Amber** (led): the dot-matrix announcement type, footer column headings, and the RunningLamp's lamp and label. Only ever on Board black (10.2:1).
- **Board Black** (board): the LED announcement board, the RunningLamp pill, the footer, and the browser theme colour.

### Neutral
- **Signage Ink** (ink): body text, every 3px border, doodle strokes, the "you are here" dot, the "Шинэ" badge, and the ink submit button.
- **Soft Ink** (ink-soft): secondary copy, unselected station labels, counts, placeholders, and the Sample tag outline.
- **Enamel White** (paper): page and sign background, cutout plates behind products, text on deep line tones.
- **Platform Grey** (platform): hover fill for ring buttons and nav pills, notify panel, lookbook frames, active-filter chips.
- **Rail Rule** (rule): 2px dividers between list rows and table rows; disabled chip borders.

### Named Rules
**The Two-Tone Rule.** Each line has exactly two tones of one hue. Deep is for anything you act on or follow, and carries white text. Soft is for regions you read, and carries ink text. No third tint, no opacity wash, and never deep text on a soft region.

**The Running Line Rule.** Interactive chrome uses `var(--line)` and running soft regions use `var(--line-soft)`, not a fixed season colour. A section declares its line with `data-line`; the chrome follows. Season and product pages set both variables on their wrapper.

**The One Black Dot Rule.** The filled black dot with a white ring and ink halo means "you are here" and marks only the current selection: the hero product's stop, the active station filter, the selected size. Status ("running now") uses the amber RunningLamp instead.

## Typography

**Display Font:** Geologica 600/700/800 (with Segoe UI, sans-serif)
**Body Font:** Golos Text 400/500/600/700 (with Segoe UI, sans-serif)

**Character:** Geologica is wide and sturdy with flat, squared terminals: it reads like transit signage, which is the world's own voice, and it draws standard Cyrillic plus Mongolian ү, ө and Ө natively. Golos Text was drawn for public-service reading in Cyrillic; its open forms keep 1, l and I distinct, which matters in prices and sizes. Both load latin, cyrillic and cyrillic-ext subsets. Headings use `text-wrap: balance`; paragraphs, list items and definitions use `text-wrap: pretty`.

### Hierarchy
- **Display** (800, clamp(2.1rem, 9vw, 5.5rem), 0.98, -0.04em): homepage platform-sign headline, max about 13ch, balanced.
- **Display Line** (800, clamp(3rem, 15vw, 6rem), 0.95): season name on a season hero, set beside its ringed line number. Season card names use the same weight at clamp(2.5rem, 12vw, 4.5rem).
- **Headline** (700, 1.875rem rising to 3rem at lg, -0.03em): section titles ("Шинээр ирсэн", "Улирлаар нь аял"), signup and footer statements. Product title uses the same steps (1.875rem rising to 3rem), line-height 1.1.
- **Title** (700, 1.125rem): fieldset legends (Хэмжээ, Өнгө), drawer and panel heads, empty-state lines.
- **Price** (Geologica 700–800, tabular figures): every price, count, station code and line number. Sizes run from 1rem on a module to 2.25rem on the product page.
- **Body** (Golos Text 400, 1rem, 1.55): running copy, capped at 40–52ch. Product names in modules and nav items also sit at 1rem (600).
- **Label** (Golos Text 600, 0.875rem; 0.75rem for tags): nav pills, chips, badges, captions.
- **LED** (Geologica 700, 0.78rem at every width, uppercase, 0.03em): announcement board only. The marquee also sets Geologica 700 uppercase, at 1.125rem rising to 1.5rem.

### Named Rules
**The Two-Check Face Rule.** Any display face must (1) draw Mongolian ү, ө and Ө itself, not through a fallback, and (2) use standard Cyrillic letterforms. Unbounded failed the first check (ү/ө fell back to a scaled substitute). Montserrat Alternates failed the second (И looked like Latin U, д like g, т like m), and so does Tektur (д like g). Rubik passed both and served as an interim face; Geologica replaced it on the user's request for a more distinctive heading voice, and passes both. The body face is held to the same two checks.

**The Tabular Figures Rule.** Every number a shopper compares (price, count, size, station code, line number) is set with tabular figures.

**The Signage Caps Rule.** Uppercase belongs to board-type surfaces only: the LED board, the marquee and the sold-out banner. Headings and labels stay in sentence case.

## Layout

A single 72rem (max-w-6xl) content column with a 16px gutter, mobile first. Sections breathe at 64px vertical padding, 96px at lg (64rem). Product grids run 2 columns on phones, 3 at md (48rem) and 4 at lg, with 12px gaps widening to 20px. The season collection adds a 15rem sticky filter rail at lg; below lg, filters move into a bottom sheet.

Sticky header 64px tall, with a 6px line band under it. Tap targets are at least 44px (ring buttons 44–48px). Primary CTAs are 56px pills placed at thumb reach. Below 64rem the product page carries a fixed buy bar, and the body reserves 5.75rem below the footer for it. The lookbook bleeds to the screen edge while its first frame aligns with the content column (`max(1rem, (100vw - 72rem)/2 + 1rem)` scroll padding).

Rails are the recurring horizontal device. A 6–12px rounded deep line-tone bar carries evenly spaced ring stops: 24–32px paper circles with a 5px deep line-tone border, on paper and on soft regions alike. Products, sizes, stations and price bands all sit on one.

## Elevation & Depth

The system is flat. Depth comes from 3px ink borders, stacked colour bands (a soft season band over a 12px deep band of the next line), and cutout product illustrations standing on rails and paper plates. There are no drop shadows on cards, panels or buttons; modal layers sit on a 50% ink backdrop.

### Shadow Vocabulary
- **Here halo** (`box-shadow: 0 0 0 4px var(--color-ink)`): the solid ink ring around the "you are here" dot. A spread ring, not an offset.
- **LED glow** (`text-shadow: 0 0 6px rgb(255 176 32 / 0.55)`; lamp `box-shadow: 0 0 6px 1px rgb(255 176 32 / 0.7)`): emitted light on the board and the RunningLamp only.

### Named Rules
**The Lit-Only Glow Rule.** Glow means a light source: LED type and lamps on Board black. Nothing on paper glows or casts a shadow.

## Shapes

Enamel signs with generous corners. Large signs and panels (hero, season card, season hero, gallery, lookbook frame, empty state) use 28px. Product modules and info cards (delivery, size guide, notify) use 22px. Inner tiles and segmented choices use 16px, filter chips 12px, and everything pressable is a full pill or circle. Borders are 3px ink on outer containers and 2px ink on internal dividers. Number roundels in soft regions carry a 3px ink ring; the numeral on the active (deep) season tile carries a 3px white ring; the HereDot keeps its 5px white ring. Dashed borders mean "not real yet" (Sample tag) or "unavailable" (sold-out size ring). The one tilted shape is the hero price tag at -5deg.

## Components

### Buttons
Big, round and flooded.
- **Shape:** full pill (9999px); icon buttons are circles.
- **Line (primary):** deep flood of `var(--line)` with white Geologica bold label, 56px tall, 24–28px padding, trailing arrow icon. Hover scales to 1.02, active to 0.98 (200ms ease-out). The flood colour transitions over 500ms on the expo-out curve when the line changes.
- **Add to cart:** 44px deep line-flood circle with a plus icon; hover scales 1.05, active 0.95.
- **Ink:** ink pill, white Golos Text 600 label, 56px tall; used to submit a form sitting on a soft panel (signup) or inside a sign (notify). Hovers to black.
- **Ring:** 44–48px paper circle with a 3px ink border (lookbook arrows, notify bell, gallery zoom); hover fills Platform Grey. Header icon buttons drop the border.
- **Focus:** global 3px ink outline, offset 3px, on every surface including soft regions; the outline follows each element's own radius (the rule sets no border-radius, so pills and signs keep their shape).

### Chips
- **Filter chip:** 44px minimum, 12px radius, 3px ink border, Golos Text 600 tabular. Active is a deep line flood with white text; empty options switch to a Rail Rule border and Soft Ink text.
- **Active-filter chip:** Platform Grey pill, 40px tall, with a trailing close icon; hovers to Rail Rule.
- **Badges:** 0.75rem bold pills. "Шинэ" is ink on white; "Цөөн үлдсэн" uses the deep line tone; "Дууссан" is a paper pill with a 2px ink border.

### Cards / Containers
- **Product module:** 22px radius, 3px ink border, paper. Header strip shows the station code and the stacked line badges (22px) over a 2px ink rule; square art area with 20px inset; a 6px line band with a centred ring stop; then name (1rem semibold, two-line clamp), price and the add button. Hover lifts the art 6px over 500ms. Sold-out art drops to 35% opacity in grayscale.
- **Sign panel:** 28px radius, 3px ink border, paper.
- **Soft panel / soft header:** the same sign with a soft line-tone fill (whole panel: signup, season card, season hero) or a soft head band separated by a 3px ink rule (product station sign, cart drawer, checkout confirmation). Ink text; a deep roundel with a white numeral or icon marks the line.
- **Shadow strategy:** none (see Elevation & Depth).

### Inputs / Fields
- **Style:** 56px pill, 3px ink border, paper fill, 20px inline padding, Soft Ink placeholder. The search field wraps a leading icon inside the same pill. The sort select is a 44px pill with an inline chevron.
- **Error:** on paper, a Spring-deep semibold message with `role="alert"` and a Spring border on the field; an invalid size rail turns Spring. On a soft panel the message stays ink semibold.

### Navigation
- **Desktop:** Golos Text 600 pills (1rem, 12px × 8px) that hover to Platform Grey. The logo is two interlocked rings (running line plus ink) beside a Geologica bold wordmark.
- **Mobile:** the menu is a vertical rail. A deep line-flood bar links 32px ring stops, one per link, each 48px tall.
- **Line band:** a 6px deep band under the header. The `doors` animation opens it from the centre (clip-path, 0.7s expo-out) whenever the running line changes.
- **Season switcher:** four 16px-radius tiles; the active tile floods with its deep line tone, white text and a white-ringed numeral; the others are paper with a line badge.

### LED Board (signature)
A 36px Board-black strip above the header, bordered underneath by 3px of the running line. Amber uppercase Geologica with an LED glow, seen through a 2.5px dot screen. Messages flip vertically every 9s and pause on hover or focus. A running-line dot leads each message.

### RunningLamp and HereDot (signature)
The RunningLamp is a Board-black pill holding a 10px amber glowing lamp and the bold amber label "Одоо явж байна"; it marks lines currently in service. The HereDot is a 28px ink dot (36px on the size rail) with a 5–6px white ring and a 4px ink halo; it marks the current selection only.

### Line Badge
A white Geologica bold line number on a circle of its deep season tone, sized 22–44px (font at 48% of the size). Badges overlap by 4px when a product rides several lines. Larger roundels in soft regions (season card 64–80px, season hero 56–80px, station sign 36px) add a 3px ink ring. Two badges joined by a short ink bar inside a paper capsule mean a transfer between running lines.

### Sample Tag
A pill with a 2px dashed border in Soft Ink, set in 0.75rem semibold; on soft regions it sits on a paper fill, and only on Board black does it turn white. Default text is "Жишээ"; variants include "Жишээ зураг" and "Нөхцөл тодорхойгүй". It goes on every piece of demo data and every unconfirmed claim.

### Doodles
One-ink graphite marker drawings: 3px round-cap strokes in Signage Ink, aria-hidden. Each season owns a signature doodle and two companions that no other season uses (Spring: blossom, sprout, rain; Summer: sun, wave, popsicle; Autumn: leaf, acorn, wind; Winter: snowflake, mitten, breath). Shared marks (arrow, spark, squiggle, loop, circle, star) annotate headings and prices.

### Motion
One curve, expo-out `cubic-bezier(0.16, 1, 0.3, 1)`. Durations: platform doors 0.7s, cart drawer (from the right) and filter sheet (from the bottom) 0.45s, list settle 0.5s from 40% opacity and 8px, staggered 40/80/120ms. The marquee crawls in 28s and pauses on hover. The lookbook adds drag inertia for mouse users. Under `prefers-reduced-motion` every animation and both flood transitions (deep and soft) stop.

## Do's and Don'ts

### Do:
- **Do** route every interactive colour through `var(--line)` (and running soft regions through `var(--line-soft)`), and declare a section's line with `data-line`.
- **Do** use the deep tone with white text for anything you act on or follow, and the soft tone with ink text for regions you read.
- **Do** give every sign, module and panel a 3px ink border with a 22px or 28px radius, and make every control a pill or circle at least 44px.
- **Do** put products, sizes, stations and price bands on a rail with 5px ring stops.
- **Do** mark every piece of demo data or unconfirmed claim with the dashed Sample tag ("Жишээ", "Нөхцөл тодорхойгүй").
- **Do** write origin as "Солонгосоос оруулж ирсэн".
- **Do** set prices, counts, sizes and station codes in Geologica with tabular figures, formatted `₮12,345`.
- **Do** test any new display face for native Mongolian ү/ө/Ө and standard Cyrillic shapes before adopting it.
- **Do** stop all motion under `prefers-reduced-motion`.

### Don't:
- **Don't** use the black "you are here" dot for anything except the current selection; use the amber RunningLamp for "running now".
- **Don't** invent a third tone, fade a line colour with opacity, put white text on a soft tone, or set deep-tone text on a soft region.
- **Don't** add drop shadows to cards, buttons or panels; glow belongs only to the LED board and lamps.
- **Don't** write "Made in Korea" or "Солонгосоос импортолсон".
- **Don't** use Unbounded, Montserrat Alternates or Tektur, or any face that fails the Two-Check Face Rule.
- **Don't** let a doodle carry meaning or use a second stroke weight.
- **Don't** present demo prices, stock, delivery or imagery without the Sample tag.
