# Product detail page

Scope: `/product/[slug]` for every catalogue item. Visitor mode: Operate (decide on one item, choose size and colour, add to cart). Mobile first. Inherits the Season Line world; no new identity.

Audience and job: a phone shopper who tapped a product and needs to see it closely, be sure of the size, see what is sold out, and add it to the cart.

Content: `data/products.json`. Clothing sizes S–XL; shoes in Korean millimetre sizing 230–290; furniture and home goods carry dimensions (W×D×H cm). Per-size sell-outs in `soldOutSizes`; whole-item sell-out in `soldOut`. All sizes, measurements and stock are placeholder data, labeled.

Pinned by the user: image gallery with zoom, price, size selector, colour swatches, add to cart, origin badge, delivery estimate, collapsible size guide, "complete the look". Sizes clear; sold-out states obvious.

Truth constraints: origin badge reads "Солонгосоос оруулж ирсэн" (imported from Korea), not "Made in Korea", per the user's earlier answer. Delivery estimate is a marked placeholder until terms exist. Gallery views are placeholder framings of one illustration.

Open: real photography and multiple angles, real size charts, delivery terms, back-in-stock notifications backend.

## Direction contract

THESIS: A product page is one station sign: the product stands on its stop, and the sign tells you its line, station and origin before you choose anything. It refuses the generic two-column template with a grey thumbnail strip.

OWN-WORLD: Inherited Season Line system: white enamel signs, 3px ink borders, the product's line colour as floods, Geologica display, Golos Text body, one-ink doodles, the black "you are here" dot reserved for the selected size, the amber LED lamp for live status.

STORY: The visitor sees the product big, zooms in, reads its stop (line, station, origin), picks a size from a clearly labelled set where sold-out sizes are struck and say so, checks the guide if unsure, and adds to cart; then sees what else rides the same line.

FIRST VIEWPORT: (390 wide) station strip with line roundels and station code; the gallery as a white platform sign with the product large on its rail and a zoom control; directly under it name, price, origin badge; size selector begins at the fold; a sticky add-to-cart bar holds the price and primary action at thumb reach.

FORM: Seoul subway line map and station signage (inherited), seed:cd28637a9fe90b2a. Signature interaction: size buttons are stops on a short rail and the chosen one takes the "you are here" dot; sold-out stops are hollow, struck and labelled. Motion: zoom follows the pointer; still under reduced motion.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
