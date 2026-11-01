# Season collection page

Scope: `/season/[slug]` for spring, summer, autumn, winter; one shared layout. Visitor mode: Operate (browse and narrow a collection), with a short Persuade hero. Mobile first. Inherits the Season Line world established on the homepage; no new identity.

Audience and job: a phone shopper who chose a season line and now wants to narrow to what fits them (category, price, size, colour), compare, and add to cart.

Content: `data/products.json`; products carry a `seasons` list (an item can run on several lines), `category`, placeholder `sizes` and `colors`. All items, prices, sizes and colours are example data, labeled. Furniture and home goods have no size.

Requirements (pinned by the user): season switcher at the top, season hero, filters for category, price, size, colour, sort, product grid; each season has its own accent colour and doodle set; one layout for all four.

Open: real size charts, real colour names per product, URL-shareable filter state.

## Direction contract

THESIS: A season page is one metro line seen end to end: the line switcher picks the line, the line's own stations are the category filter, and products are the stops. It refuses the generic sidebar-of-checkboxes collection template.

OWN-WORLD: Inherited Season Line system: white enamel signs, 3px ink borders, the season's soft tone on large regions and its deep tone on actions and rails, Geologica display (chosen in the typeset pass; see DESIGN.md Two-Check Face Rule) and Golos Text body, one-ink doodles at one stroke weight, the black "you are here" dot reserved for the current line and current station.

STORY: The visitor confirms which line they are on, taps a station to narrow by category, refines price, size and colour, and adds to cart without leaving the line.

FIRST VIEWPORT: (390 wide) line switcher of four roundel tabs with the current one flooded; a compact hero band in the line colour with the giant roundel number, season name, months, item count and the season's doodles; directly under it the category line map (stations with counts, "you are here" on the active one); then the filter and sort bar.

FORM: Seoul subway line map and station signage (inherited), seed:cd28637a9fe90b2a. Signature interaction: the category line map is the category filter; switching lines opens the platform doors on the header band. Motion: platform-door wipe on line change, cards settle in on filter change; still under reduced motion.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
