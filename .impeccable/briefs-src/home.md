# Homepage

Scope: storefront homepage (`app/page.tsx`) plus the shared chrome it introduces (announcement board, header, footer). Visitor mode: Persuade. Mobile first.

Audience and job: phone shoppers in Mongolia arriving to see what Korean imports are in this season and add something to the cart. Action: add to cart from the hero and new-arrivals modules; secondary: enter a season line.

Content: placeholder catalogue in `data/products.json`, every item labeled "Жишээ" (example). Copy in Mongolian. Origin wording: "Солонгосоос оруулж ирсэн" (imported from Korea), never "Made in Korea". Free delivery and returns are unconfirmed: shown only as marked placeholders. No invented reviews, prizes, or guarantees.

Section order is pinned by the user: announcement bar, header (Дэлгүүр, Улирал, Тавилга, Хувцас, Гутал, Гэр ахуй, Бидний тухай, search, cart), hero (current season: autumn/winter), marquee, shop by season (4 large), shop by category (4), new arrivals, lookbook drag gallery, why Korean products, email signup, footer.

Open: delivery fees and regions, return policy, social account URLs, real photography.

## Direction contract

THESIS: The store is a Seoul-style metro map. Seasons are coloured lines, categories are stations, every product has a stop. It refuses the banner-plus-tile-grid shop template.

OWN-WORLD: White enamel signage with 3px ink borders and generous radii; four season lines (soft spring pink, fresh summer green, warm autumn orange, cool winter grey-blue), each in two tones: a soft tone owns large regions with ink text, a deep tone carries actions, rails and rings with white text (colorize pass, user-requested); a black LED destination board with amber dot-matrix type; Geologica display (chosen in the typeset pass; see DESIGN.md Two-Check Face Rule), Golos Text body; one-ink graphite marker doodles at a single stroke weight; a rail with stop markers, and one black "you are here" dot reserved for the current selection.

STORY: The visitor sees which line is running now (autumn/winter), grabs a product off the platform sign, understands everything is imported from Korea, then rides another line or category.

FIRST VIEWPORT: (390 wide) LED board top; header with logo and cart; the autumn line platform sign fills the width: line band with the headline, a big cutout product standing over the rail, the "you are here" dot under it, price and the one button "Намрын улирал руу" (enter the autumn line) at thumb reach. Marquee board starts at the fold.

FORM: Seoul subway line map and station signage, candidate 7 of 7 on the grounded list. seed:cd28637a9fe90b2a. Signature interaction: the line switcher floods the header, buttons and board with the chosen line colour; season cards ride the rail. Motion grammar: LED crawl, platform-door wipe on line change, drag inertia in the lookbook; all still under reduced motion.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
