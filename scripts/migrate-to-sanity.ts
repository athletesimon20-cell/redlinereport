/**
 * One-time seed script: recreates the two original reviews (Cardo Freecom 4X,
 * Nexx XR3R) directly as Sanity documents, so you don't have to retype them
 * by hand in the Studio. Safe to re-run (uses createOrReplace with fixed IDs).
 *
 * Run with: npm run migrate:sanity
 * Requires NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, and
 * SANITY_WRITE_TOKEN in .env.local (token needs "Editor" permissions —
 * generate one at sanity.io/manage -> your project -> API -> Tokens).
 */
import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_WRITE_TOKEN.\n" +
      "Set them in .env.local, then run: npm run migrate:sanity"
  );
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion: "2026-01-01", token, useCdn: false });

let n = 0;
const key = () => `k${++n}`;

const block = (text: string, style: "normal" | "h2" | "h3" = "normal") => ({
  _type: "block",
  _key: key(),
  style,
  markDefs: [],
  children: [{ _type: "span", _key: key(), text, marks: [] }],
});

const pro = (title: string, body: string, story?: string) => ({
  _type: "proBlock",
  _key: key(),
  title,
  body,
  ...(story ? { story } : {}),
});

const con = (title: string, body: string, extra?: { silverLining?: string; alternative?: string }) => ({
  _type: "conBlock",
  _key: key(),
  title,
  body,
  ...extra,
});

const figure = (alt: string, caption?: string) => ({ _type: "figureBlock", _key: key(), alt, caption });

const specCompare = (label: string, unit: string, rows: { name: string; value: number; highlight?: boolean }[]) => ({
  _type: "specCompareBlock",
  _key: key(),
  label,
  unit,
  rows: rows.map((r) => ({ ...r, _key: key(), _type: "specCompareRow" })),
});

const competitor = (name: string, brand: string, verdict: string, body: string) => ({
  _type: "competitorCardBlock",
  _key: key(),
  name,
  brand,
  verdict,
  body,
});

const buyBox = (vendor?: string, label?: string, priceOverride?: number) => ({
  _type: "buyBoxBlock",
  _key: key(),
  ...(vendor ? { vendor } : {}),
  ...(label ? { label } : {}),
  ...(priceOverride ? { priceOverride } : {}),
});

const ref = (id: string) => ({ _type: "reference", _key: key(), _ref: id });

const authors = [
  {
    _id: "author-mara-voss",
    _type: "author",
    name: "Mara Voss",
    slug: { _type: "slug", current: "mara-voss" },
    role: "Gear Editor",
    bio: "Mara has spent a decade splitting time between track days and 5 a.m. commutes, and tests every helmet, jacket, and glove in both conditions before it earns a verdict stamp.",
  },
  {
    _id: "author-dex-okafor",
    _type: "author",
    name: "Dex Okafor",
    slug: { _type: "slug", current: "dex-okafor" },
    role: "Bikes Editor",
    bio: "Dex covers adventure and touring machines, usually from somewhere with worse cell signal than the address on the press release.",
  },
];

const cardoReview = {
  _id: "review-cardo-freecom-4x",
  _type: "communicatorReview",
  title: "Cardo Freecom 4X Review: The Sweet Spot Communicator?",
  slug: { _type: "slug", current: "cardo-freecom-4x" },
  brand: "Cardo",
  model: "Freecom 4X",
  excerpt:
    "A year and thousands of miles with Cardo's mid-range communicator — JBL audio, dead-simple 4-way intercom, and a couple of honest gripes.",
  rating: {
    overall: 8.6,
    breakdown: [
      { _key: key(), label: "Audio", value: 9.4 },
      { _key: key(), label: "Connectivity", value: 8.6 },
      { _key: key(), label: "Range", value: 7 },
      { _key: key(), label: "Value", value: 9.2 },
    ],
  },
  pros: [
    "JBL-tuned audio that's genuinely great for the price",
    "Auto-reconnecting 4-way intercom that just works",
    "IP67 weatherproofing that means it",
    "13-hour battery with a 20-minute fast-charge top-up",
  ],
  cons: [
    "Real-world Bluetooth range tops out around 800m, not the claimed 1.2km",
    "The control wheel feels small and fiddly with thick gloves",
  ],
  intercomRiders: 4,
  rangeMeters: 1200,
  batteryLifeHours: 13,
  waterproofRating: "IP67",
  meshTech: false,
  price: { amount: 199.95, currency: "USD", asOf: "2026-08-01" },
  affiliateLinks: [
    { _key: key(), vendor: "primary", region: "DEFAULT", url: "https://www.revzilla.com/motorcycle/cardo-freecom-4x" },
  ],
  relatedReviews: [ref("review-nexx-xr3r")],
  author: { _type: "reference", _ref: "author-mara-voss" },
  publishedAt: "2026-06-12T00:00:00.000Z",
  seoDescription:
    "A year and thousands of miles with the Cardo Freecom 4X: JBL audio, 4-way intercom, and where its Bluetooth range actually falls short.",
  body: [
    block(
      "You know that feeling when gear just works? No fiddling, no pulling over to check the app, just seamless performance. That's rare with tech — but after a year and thousands of miles with the Cardo Freecom 4X, it might be the real deal."
    ),
    block(
      "I've wrestled with budget communicators that crackle more than they connect, premium units loaded with features I never touch, and the Sena-based system built into my old HJC helmet. Finding the right balance matters. So when a riding buddy picked one up and talked me into grabbing one too — JBL sound, Live Intercom for up to four riders, without the flagship price tag — I bit the bullet. I've run it on commutes, weekend blasts through twisty roads, and a few downpours I didn't see coming."
    ),
    figure(
      "Rider wearing a helmet with the Cardo Freecom 4X mounted, giving a thumbs up",
      "A year in, still the unit I reach for on group rides."
    ),
    block("So why does this mid-range unit hit the mark for so many riders? Let's get into it."),
    block("What I Love About the Freecom 4X", "h2"),
    pro(
      "Live Intercom connection",
      "Cardo calls its auto-reconnecting Bluetooth intercom \"Live Intercom,\" and for small groups (up to four riders) it lives up to the name. It's Bluetooth, not Cardo's flagship Mesh tech, but the auto-reconnect works well — my regular riding buddies and I paired our units once (about a minute), and they connect automatically almost every time we power on. The Cardo Connect app lets you name your group, and the unit announces who's joining. If someone drops out of range, they generally rejoin automatically once back in it.",
      "We were riding through rolling hills, Jas fell behind, and his voice dropped out. A minute later, cresting the next rise, he was back mid-sentence about a stray dog. Seamless."
    ),
    pro(
      "Punchy JBL audio",
      "Cardo's JBL partnership isn't just marketing fluff. These are the 40mm speakers, not the 45mm units in Cardo's flagship Packtalk line, but the sound is genuinely impressive for a helmet communicator. Music adds a real soundtrack to a ride, and — more importantly — voices come through clearly, whether it's a riding buddy on the intercom or a call. Podcasts and GPS directions stay crisp even at speed, helmet noise permitting.",
      "I take calls while riding fairly often, and the person on the other end usually has no clue I'm on the bike until I tell them. The noise-canceling mic is fantastic."
    ),
    pro(
      "Smart audio mixing",
      "The Freecom 4X intelligently ducks background audio — your music — whenever a priority source kicks in, like intercom chat or a GPS direction. Your tunes dip smoothly, let you hear what matters, then fade back in. Miles better than older systems that just cut the music dead."
    ),
    pro(
      "Seamless phone connection",
      "Turn it on and it connects to your phone almost instantly — no digging through Bluetooth settings to force a pairing. If you're into phone automation (iOS Shortcuts, Android Routines), you can chain a whole \"getting ready to ride\" sequence off the connection event. It makes the five minutes before a ride noticeably smoother."
    ),
    pro(
      "Rock-solid weatherproofing",
      "This thing feels genuinely sturdy. It carries an IP67 rating, and it means it — I rode through an hour-long downpour I could barely see through, and the Freecom 4X didn't miss a beat. Pulled it apart later and the contacts were bone dry."
    ),
    pro(
      "Great battery life and fast charging",
      "Cardo claims 13 hours of talk time, and that tracks with two full riding days (6-8 hours total) between charges for me. A 20-minute fast charge buys two hours of talk time — handy at a rest stop. You can charge over USB-C while riding too, though with this battery life I have never actually needed to."
    ),
    pro(
      "Simple button controls",
      "Voice commands are great, but sometimes you just want to press a button. Cardo kept the physical controls simple — volume, track skip, answering calls are all easy to learn, even gloved, once you're used to the smaller wheel.",
      "My mother borrowed my bike and helmet for a short trip. She'd never used a helmet comm before and was answering calls and adjusting volume without fuss after one quick explanation. If she can pick it up that fast, most riders will."
    ),
    block("What Could Be Better", "h2"),
    con(
      "Optimistic range claims",
      "Cardo states a 1.2km range, and that's lab conditions with perfect line of sight. Lose that line of sight — buildings, hills, a bend in the road — and the connection drops, same as any Bluetooth unit. In real-world testing on open roads, I found the connection got unreliable around 800m even with a clear line of sight, and that range drops further when filtering through heavy traffic."
    ),
    con(
      "Bluetooth intercom limitations vs. Mesh",
      "Live Intercom works well for its purpose, but Bluetooth range is inherently limited next to Mesh systems, and it relies on a daisy-chain connection — if the middle rider drops out, the chain can split the group.",
      {
        alternative:
          "For groups of five or more, or maximum range and stability, you need Mesh — Cardo Packtalk Edge or Sena 50S. The Freecom 4X is built for pairs or small groups where line-of-sight is realistic.",
      }
    ),
    con(
      "The control wheel is just okay",
      "Functional, but the small jog dial lacks the tactile feel of larger wheels, especially with gloves on. It takes practice and can feel fiddly when you're trying to operate it quickly on the move.",
      {
        silverLining:
          "Muscle memory for the button presses bypasses the wheel entirely for the functions you'll use most.",
      }
    ),
    block("Installation: Simple and Secure", "h2"),
    block(
      "Installing the Freecom 4X is straightforward. The included clamp mount is robust and fits most helmets; an adhesive mount is available if the clamp doesn't work for your lid. Routing the speaker and mic wires is simple, with enough cable length provided, and the speakers nestle into standard helmet cutouts. Expect to be done in under 15 minutes with no special tools — even if this is your first comm unit."
    ),
    figure("Cardo Freecom 4X clamp mount attached to a helmet shell", "The clamp mount takes minutes and needs no tools."),
    block("How It Stacks Up", "h2"),
    competitor(
      "Spirit HD",
      "Cardo",
      "Choose for tight budgets",
      "Cardo's budget king has good (non-JBL) speakers but only a two-rider, shorter-range Bluetooth intercom, and no voice commands. Pick the Spirit HD for solo or passenger use on a tight budget; pick the Freecom 4X for small groups, better audio, and voice control."
    ),
    competitor(
      "5S",
      "Sena",
      "Choose for a jog dial and screen",
      "Sena's direct rival adds an LCD screen and a proper jog dial, which the Freecom lacks. But it's 2-way only, capped around 700m, and skips the JBL sound and 4-way Live Intercom. Pick the 5S if you only need two-way comms and want the screen; pick the Freecom 4X for JBL audio and four-way capability."
    ),
    competitor(
      "Packtalk Edge / Pro / Neo",
      "Cardo",
      "Choose for large groups",
      "Cardo's flagship line runs Dynamic Mesh for up to 15 riders with far more range, and the Edge adds a magnetic Air Mount. It shares the same JBL audio. Pick the Edge for large groups and maximum range; pick the Freecom 4X if you ride in smaller groups and don't want to pay for Mesh you won't use."
    ),
    block("The Bottom Line", "h2"),
    block(
      "After a year of use, the Cardo Freecom 4X has proven itself. It nails the essentials for the average rider: genuinely good audio, dead-simple small-group intercom, real weatherproofing, and battery life that doesn't need babying. It does exactly what it promises, without fuss."
    ),
    block(
      "It's the right call if you usually ride solo, with a passenger, or in occasional small groups up to four; you care about audio quality for music, calls, and GPS; and you want a dependable, weatherproof unit without paying for Mesh features you won't use. It's probably not the right call if you regularly join group rides of five or more, need maximum intercom range, or only need the most basic solo features on the tightest possible budget."
    ),
    block(
      "It isn't flashy, but it delivers reliably and disappears into the ride — which, for a piece of gear you strap to your head, is exactly the point."
    ),
    buyBox(),
  ],
};

const nexxReview = {
  _id: "review-nexx-xr3r",
  _type: "helmetReview",
  title: "Nexx X.R3R Helmet Review: Bridging Track and Street",
  slug: { _type: "slug", current: "nexx-xr3r" },
  brand: "Nexx",
  model: "X.R3R",
  excerpt:
    "A 225° field of view, a sub-1,350g carbon shell, and six months split between street and track — does the XR3R really bridge both worlds?",
  rating: {
    overall: 9.2,
    breakdown: [
      { _key: key(), label: "Comfort", value: 9 },
      { _key: key(), label: "Safety", value: 9.6 },
      { _key: key(), label: "Ventilation", value: 9 },
      { _key: key(), label: "Value", value: 9.4 },
    ],
  },
  pros: [
    "Featherweight X-Pro Carbon shell that rivals dedicated race lids",
    "225°/85° field of view — huge for street situational awareness",
    "Five-layer EPS and ECE 22.06 across every variant, FIM available",
    "Magnetic X-Lock chin strap buckle, one-handed even with gloves",
  ],
  cons: [
    "Plasticky vents that don't match the shell's build quality",
    "Double-lock visor mechanism is fiddly to operate with gloves",
  ],
  weightGrams: 1350,
  shellMaterial: "X-Matrix 2 composite (X-Pro Carbon variant: full carbon fiber)",
  certification: "ECE 22.06, DOT, FIM (Pro FIM EVO variant)",
  fieldOfViewHorizontal: 225,
  ventPorts: 10,
  pinlockIncluded: true,
  sizes: "2XS-2XL",
  price: { amount: 599, currency: "USD", asOf: "2026-08-01" },
  affiliateLinks: [
    { _key: key(), vendor: "standard", region: "DEFAULT", url: "https://www.revzilla.com/motorcycle/nexx-xr3r-helmet" },
    {
      _key: key(),
      vendor: "carbon",
      region: "DEFAULT",
      url: "https://www.revzilla.com/motorcycle/nexx-xr3r-zero-pro-2-carbon-helmet",
    },
    { _key: key(), vendor: "primary", region: "DEFAULT", url: "https://www.revzilla.com/motorcycle/nexx-xr3r-helmet" },
  ],
  relatedReviews: [ref("review-cardo-freecom-4x")],
  author: { _type: "reference", _ref: "author-mara-voss" },
  publishedAt: "2026-07-01T00:00:00.000Z",
  seoDescription:
    "The Nexx XR3R sets a new standard for both street and track helmets — six months of testing on why it could be the best helmet for sportbike riders.",
  body: [
    block("An FIM-adjacent street helmet for sportbike riders? Color me cautious — but I was excited to try the Nexx XR3R."),
    block(
      "As a street rider who also enjoys the odd track day, I'm always chasing a lid that balances comfort and quiet with light weight and aerodynamics. Wear a racing helmet on the street and you're asking for a headache; wear a street helmet on track and you're asking for worse. The XR3R claims to bridge that gap, so I picked up the X-Pro Carbon variant and put it through street runs and track sessions across a European winter and a brutally hot, humid Thailand summer."
    ),
    figure("Rider tucked into a corner on a sportbike wearing the Nexx XR3R helmet", "Six months, two hemispheres, one lid."),
    block(
      "What struck me immediately was the construction. The XR3R comes in Nexx's standard X-Matrix build — fiberglass, aramid fiber, and carbon reinforcement — or the lighter, pricier X-Pro Carbon, which is what I've been living in. The shell feels robust despite the low weight, and the stitching and seams are tight enough that this doesn't feel like a helmet from a brand most American riders haven't heard of yet."
    ),
    block(
      "I confirmed with Nexx that only the range-topping Pro FIM EVO carries official FIM racing certification — but every other XR3R variant, including the Carbon I use, is built to the same standard and shares the same full-carbon shell. They simply weren't run through FIM's testing process."
    ),
    block("This lid is loaded with features you can read about on the product page all day, so I want to focus on what those features actually deliver for riders."),
    block("What to Love", "h2"),
    block("Weight and aerodynamic perfection", "h3"),
    block(
      "The XR3R's featherweight design is one of its most impressive traits, especially in carbon trim, where it tips the scale at just under 1,350g. That makes it one of the lightest helmets in its class, and the benefit is immediately noticeable — whether you're carving a track day or logging hours on a cross-city commute, less weight means less neck strain over a long ride."
    ),
    specCompare("Helmet weight", "g", [
      { name: "Nexx XR3R (Carbon)", value: 1350, highlight: true },
      { name: "Scorpion EXO-R1 Air Carbon", value: 1380 },
      { name: "KYT KX-1 Race GP", value: 1400 },
      { name: "Shoei X-SPR Pro", value: 1450 },
      { name: "AGV Pista GP RR", value: 1450 },
      { name: "HJC RPHA 1", value: 1450 },
      { name: "Alpinestars Supertech R10", value: 1540 },
    ]),
    block(
      "The lightness doesn't come at the cost of comfort — more on that below. It's down to Nexx's X-Matrix 2 composite shell, which mixes multiaxial fiberglass, 3D organic fibers, aramid, and carbon reinforcement for impact dispersion without piling on weight. Weight distribution matters just as much as the number on the box: after six months in all conditions, the XR3R feels balanced, with no sense of being top-heavy at speed. Nexx claims the shell goes weightless at 160km/h thanks to its aerodynamics; I tested past 250km/h on track and found the stability genuinely excellent, with no buffeting popping my head out of tuck into a braking zone."
    ),
    block("Visibility", "h3"),
    block(
      "Eye ports are usually a trade-off on track helmets — thin ports buy a bit of extra safety on a closed circuit, but make zero sense once you're back in traffic, where situational awareness matters more than a few grams of EPS foam. My outgoing Shoei X-Fourteen was never great here."
    ),
    block(
      "The XR3R breaks that mold: even the FIM-rated variant carries a panoramic visor with a 225° horizontal and 85° vertical field of view. A Pinlock ships in the box, tear-off posts are included, and switching between the included clear and tinted shields is tool-less and fast. The visor detents hold firm at speed, and the \"anti-vibration rubber visor plate\" Nexx makes a fuss about actually delivers — it seals down tight, cutting wind noise and adding a real sense of stability with one less distraction at extreme speed."
    ),
    block("Ventilation", "h3"),
    block(
      "Nexx nailed the ventilation. Six adjustable intake vents across the chin bar, forehead, and crown feed large channels in the EPS, pulling air over the top of the head and out through sizable exhaust vents sitting right in the airstream by the rear spoiler — which, by the way, comes off with three screws and no adhesive."
    ),
    block(
      "I tested this properly in Thailand: ride a sportbike in 40°C-plus heat at 100% humidity and you will get wet, helmet or not. The moisture-wicking X-MART Dry padding paired with a breathable mesh at the crown managed heat and moisture well enough that I never noticed the liner feeling damp, even stuck in Chiang Mai rush hour. The liner is fully removable and washable."
    ),
    block("Safety", "h3"),
    block(
      "I didn't crash in this helmet, so I can't speak to its certifications from experience — but every XR3R variant passes ECE 22.06, the newer European standard that adds high-velocity, low-velocity, and rotational-impact tests on top of the old 7.5m/s drop test. It's DOT certified for the US, and the range-topping variant carries FIM homologation, the same standard used in MotoGP."
    ),
    block(
      "The cheapest XR3R, at well under $600, is nearly identical to the $800-plus FIM-rated variant — the only real difference is shell material. Nexx also went beyond the certification checklist with a five-layer EPS liner (two layers is the industry standard) and an emergency strap system that lets first responders pull the cheek pads and remove the helmet with minimal neck movement."
    ),
    block("Comfort, customization, and the chin strap", "h3"),
    block(
      "Fit is a tightrope on a sport/track helmet: snug enough for a track day, not a vice grip for lunch across town. The XR3R ships with extra cheek pad foam inserts for a tighter track fit, plus an adjustable crown strap. After long track sessions and spirited street rides alike, it stayed comfortable with no pressure points. It runs an intermediate oval fit that should suit most riders out of the box."
    ),
    block(
      "My favorite detail: the magnetic X-Lock chin strap buckle. It replaces the usual mechanical snap button, so the final fastening step is effortless even gloved — bring the ends close and the magnets guide them home with a satisfying click."
    ),
    block("What Not to Love", "h2"),
    block(
      "No helmet is perfect. My gripes here are minor, and this is still, overall, a better track helmet than most street lids and a better street helmet than most track lids."
    ),
    con(
      "Flimsy vents",
      "The shell exudes premium quality; the plastic vents don't quite match it. They're functional and easy to operate gloved, but they lack the solid, polished feel of something like the HJC RPHA line's vent hardware."
    ),
    con(
      "Cheek pad locks",
      "Unlike the button-click system most manufacturers use, the XR3R's cheek pads slide in — a design that takes some getting used to, likely in service of the emergency-release system."
    ),
    con(
      "Fiddly visor lock",
      "The double-locking visor mechanism keeps it shut at high speed, which is exactly what you want — but it can be tricky to operate with gloves on. Worth knowing, too: this is tuned as a track and spirited-street helmet, so \"quiet\" here is relative to other performance lids, not a touring helmet."
    ),
    figure("Close-up of the Nexx XR3R chin vent and vent hardware", "The vents are the one place the hardware feels a step below the shell."),
    block("Comparisons", "h2"),
    competitor(
      "Pista GP RR",
      "AGV",
      "Choose for pure track focus",
      "A track-focused juggernaut with FIM certification and a favorite among professional racers. It matches the XR3R on aerodynamics and safety, but trades away street-friendly ventilation and all-day comfort. The XR3R's carbon build is lighter (1,350g vs. 1,450g) and its eye port is significantly wider, so it edges ahead for anyone who needs the helmet to work off the track too."
    ),
    competitor(
      "X-15",
      "Shoei",
      "Choose for the screen-free purist build",
      "Known in Europe as the X-SPR Pro, this is another FIM-certified track weapon with excellent build quality and aerodynamic stability. At 1,450g it's noticeably heavier than the XR3R, which adds up over a long day, and its field of view is narrower. Fit is excellent but lacks the XR3R's adjustable cheek pads and crown system — you'd need a dealer visit for a truly custom fit."
    ),
    competitor(
      "EXO-R1 Air Carbon",
      "Scorpion",
      "Choose on price, if liner comfort is secondary",
      "One of the XR3R's closest weight rivals at 1,380g, with a similarly light, aerodynamic build. The XR3R pulls ahead on liner comfort — the X-MART Dry material beats Scorpion's more basic padding — and on ventilation, with a more sophisticated six-intake, four-exhaust system."
    ),
    competitor(
      "Supertech R10",
      "Alpinestars",
      "Choose for track-only riders",
      "A newer, track-exclusive premium helmet with strong aerodynamics and safety credentials, but at 1,540g it's the heaviest in this group by a wide margin. It lacks the street-friendly versatility, adjustable fit system, and build quality the XR3R offers at a lower price."
    ),
    block("A Marriage of Street and Track", "h2"),
    block(
      "The Nexx XR3R is for the rider who wants one high-quality helmet for both street and track, not two separate lids. Nexx managed to compromise almost nothing in either direction while building something that competes with helmets built purely for one or the other — genuinely impressive."
    ),
    block(
      "Nexx also cut speaker pockets into the EPS foam, so slotting in a comms unit — I run a Cardo Freecom 4X in mine — is trivial. Every fully European-made XR3R ships with a 5-year warranty, which says something about how confident Nexx is in the build."
    ),
    block("Both the standard and Carbon variants are worth a look, along with several more colorways across both:"),
    buyBox("standard", "Check price — Standard"),
    buyBox("carbon", "Check price — Carbon", 799),
  ],
};

async function run() {
  console.log("Seeding authors...");
  for (const author of authors) {
    await client.createOrReplace(author);
    console.log(`  ✓ ${author.name}`);
  }

  console.log("Seeding reviews...");
  // The two reviews reference each other (relatedReviews), so they must be
  // created together in one transaction — creating them one at a time rejects
  // the first with "references non-existent document" since the second
  // doesn't exist yet.
  const reviews: Record<string, unknown>[] = [cardoReview, nexxReview];
  const tx = client.transaction();
  for (const doc of reviews) {
    tx.createOrReplace(doc as Parameters<typeof client.createOrReplace>[0]);
  }
  await tx.commit();
  for (const doc of reviews) console.log(`  ✓ ${doc.title}`);

  console.log("\nDone. Open /studio to see them (they publish immediately since this uses the write API directly).");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
