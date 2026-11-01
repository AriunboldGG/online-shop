# Cart drawer and checkout

Scope: the cart drawer (`app/components/cart.tsx`, opened from any page) and the one-page checkout (`/checkout`). Visitor mode: Operate. Mobile first. Inherits the Season Line world; no new identity.

Audience and job: a phone shopper who has chosen items and wants to confirm what they are paying, give contact and address details once, pick delivery, and place the order without doubt.

Content: cart lines (product, size, colour, quantity) from the browser cart. Delivery methods and fees are example placeholders, labeled ("Улаанбаатар хотод хүргэх", "Орон нутаг руу илгээх", "Очиж авах"). Address: Ulaanbaatar (дүүрэг, хороо, байр/гудамж, тоот) or countryside (аймаг, сум, free-text address). Payment is a placeholder: no methods are invented. Origin wording: "Солонгосоос оруулж ирсэн".

Truth constraints: no order is sent; submitting shows an honest example confirmation. No security, speed, or payment-provider claims.

Open: real delivery terms and fees, payment methods, order backend, pickup location.

## Direction contract

THESIS: Checkout is the last stretch of the line: the cart is the platform you wait on, checkout is four stops ridden in order to the terminus. It refuses the multi-step wizard and the cluttered marketplace checkout.

OWN-WORLD: Inherited Season Line system: white enamel signs with 3px ink borders, the running line colour as floods on primary actions, Geologica display and Golos Text body, the black "you are here" dot reserved for the stop being filled in, dashed Sample tags on every placeholder.

STORY: The visitor checks the cart, sees subtotal and the delivery fee before committing, rides down four stops (contact, address, delivery, payment), sees the total at every moment, and confirms.

FIRST VIEWPORT: (390 wide) a compact order sign with item count, total and a toggle to see the lines; below it the first stop, contact, with its fields; a sticky confirm bar showing the running total at thumb reach.

FORM: Seoul subway line map and station signage (inherited), seed:cd28637a9fe90b2a. Signature interaction: the four sections are stops on one vertical rail; the stop in focus carries the black dot and completed stops fill with the line colour. Motion: the drawer slides in from the right; nothing else moves.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
