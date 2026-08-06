#!/usr/bin/env node

/**
 * Generate the exact comp-card artifact used by the landing page.
 *
 * This invokes pholio-app's production composed-card route and PDF renderer,
 * writes the canonical two-sided PDF, and rasterizes the real front-page
 * outputs used by the opening four-card fan.
 */

const { execFileSync } = require("node:child_process");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const APP_ROOT =
  process.env.PHOLIO_APP_ROOT ||
  "/Users/lenquanhone/Projects/pholio-app";
const PORT = Number(process.env.PHOLIO_ARTIFACT_PORT || 3417);
const OUTPUT_DIR = path.resolve(__dirname, "../public/generated/comp-card");
const OUTPUT_PDF = path.join(OUTPUT_DIR, "elara-keats-composed.pdf");

// The app's built-in Elara fixture currently points at four unrelated people.
// For a truthful landing artifact, keep the fixture's roles and metadata but
// substitute a coherent same-person Unsplash series photographed by Brian
// Lawson. Each market variant rotates a different image set and locks a
// different hero frame so the generator is making visibly different
// composition decisions, not just moving type around one picture.
const FIXTURE_IMAGES = [
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=70",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=70",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=70",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=70",
];

const BRIAN_LAWSON_IMAGES = {
  redHero:
    "https://images.unsplash.com/photo-1612904369997-f1f03237d0da?auto=format&fit=crop&q=86&w=1800",
  crossedArm:
    "https://images.unsplash.com/photo-1612904370981-bc1e031ae40e?auto=format&fit=crop&q=84&w=1400",
  profile:
    "https://images.unsplash.com/photo-1612904370193-72d578a78d67?auto=format&fit=crop&q=84&w=1400",
  cup:
    "https://images.unsplash.com/photo-1612904370392-d1dde7a8ddc8?auto=format&fit=crop&q=84&w=1400",
  side:
    "https://images.unsplash.com/photo-1612904372219-885abc44dfa8?auto=format&fit=crop&q=84&w=1400",
  blue:
    "https://images.unsplash.com/photo-1612904370780-fbc1a5a4f46d?auto=format&fit=crop&q=84&w=1400",
  shoulder:
    "https://images.unsplash.com/photo-1612904370314-68f344e324dd?auto=format&fit=crop&q=84&w=1400",
  movement:
    "https://images.unsplash.com/photo-1612904370665-4d5e8a4bf382?auto=format&fit=crop&q=84&w=1400",
};

const img = BRIAN_LAWSON_IMAGES;

const CARD_VARIANTS = [
  {
    id: "canonical",
    name: "Mara Voss",
    handle: "maravoss",
    city: "New York, NY",
    hair: "Blue",
    images: [
      img.redHero,
      img.crossedArm,
      img.profile,
      img.movement,
    ],
    seed: "pholio-landing-brian-lawson-new-york-v3",
    structure: "photo-dominant",
    treatment: "over",
    board: "beauty",
    backArchitecture: "editorial-stagger",
    lockHeroId: "demo-img-1",
    lockGridIds: "demo-img-2,demo-img-3,demo-img-4",
    frontFile: "elara-keats-front",
    keepPdf: true,
  },
  {
    id: "gallery-mat",
    name: "Mara Voss",
    handle: "maravoss",
    city: "New York, NY",
    hair: "Blue",
    images: [
      img.profile,
      img.side,
      img.blue,
      img.redHero,
    ],
    seed: "pholio-landing-brian-lawson-paris-v3",
    structure: "matted",
    treatment: "classic",
    board: "editorial",
    lockHeroId: "demo-img-1",
    lockGridIds: "demo-img-2,demo-img-3,demo-img-4",
    frontFile: "elara-keats-gallery-mat",
  },
  {
    id: "split-field",
    name: "Mara Voss",
    handle: "maravoss",
    city: "New York, NY",
    hair: "Blue",
    images: [
      img.crossedArm,
      img.movement,
      img.cup,
      img.shoulder,
    ],
    seed: "pholio-landing-brian-lawson-milan-v3",
    structure: "split",
    treatment: "classic",
    board: "runway",
    lockHeroId: "demo-img-2",
    lockGridIds: "demo-img-1,demo-img-3,demo-img-4",
    frontFile: "elara-keats-split-field",
  },
  {
    id: "statement",
    name: "Mara Voss",
    handle: "maravoss",
    city: "New York, NY",
    hair: "Blue",
    images: [
      img.blue,
      img.shoulder,
      img.side,
      img.cup,
    ],
    seed: "pholio-landing-brian-lawson-london-v3",
    structure: "photo-dominant",
    treatment: "band",
    board: "commercial",
    lockHeroId: "demo-img-1",
    lockGridIds: "demo-img-2,demo-img-3,demo-img-4",
    frontFile: "elara-keats-statement",
  },
];

let activeImageOverrides = new Map(
  FIXTURE_IMAGES.map((fixtureUrl, index) => [
    fixtureUrl,
    CARD_VARIANTS[0].images[index],
  ]),
);
let activeVariant = CARD_VARIANTS[0];
global.activeVariant = activeVariant;

process.env.NODE_ENV = "development";
process.env.PORT = String(PORT);
process.env.PDF_BASE_URL = `http://127.0.0.1:${PORT}`;
process.env.APP_URL = "https://app.pholio.studio";
process.env.GROQ_API_KEY = "";

const express = require(path.join(APP_ROOT, "node_modules/express"));
const pdfRouter = require(path.join(
  APP_ROOT,
  "src/domains/pdf/routes/pdf",
));
const { renderCompCard } = require(path.join(
  APP_ROOT,
  "src/domains/pdf/generator",
));

async function main() {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use((req, _res, next) => {
    req.session = {};
    next();
  });
  app.use((req, res, next) => {
    if (req.path !== "/pdf/view/elara-k") {
      next();
      return;
    }

    const send = res.send.bind(res);
    res.send = (body) => {
      if (typeof body !== "string") return send(body);

      let output = body;
      for (const [fixtureUrl, coherentUrl] of activeImageOverrides) {
        output = output.replaceAll(fixtureUrl, coherentUrl);
        output = output.replaceAll(
          fixtureUrl.replaceAll("&", "&amp;"),
          coherentUrl.replaceAll("&", "&amp;"),
        );
      }
      output = output
        .replaceAll("Elara Keats", activeVariant.name)
        .replaceAll("ELARA KEATS", activeVariant.name.toUpperCase())
        .replaceAll("elarakeats", activeVariant.handle)
        .replaceAll("ELARAKEATS", activeVariant.handle.toUpperCase())
        .replaceAll("Los Angeles, CA", activeVariant.city)
        .replaceAll("LOS ANGELES, CA", activeVariant.city.toUpperCase())
        .replaceAll(">Blonde<", `>${activeVariant.hair}<`);
      res.set("X-CompCard-Title", `${activeVariant.name} - Comp Card`);
      return send(output);
    };
    next();
  });
  app.use(pdfRouter);

  const server = await new Promise((resolve) => {
    const instance = app.listen(PORT, "127.0.0.1", () => resolve(instance));
  });

  try {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    const requestedVariant = process.env.PHOLIO_ARTIFACT_VARIANT;
    const variants = requestedVariant
      ? CARD_VARIANTS.filter((variant) => variant.id === requestedVariant)
      : CARD_VARIANTS;

    if (variants.length === 0) {
      throw new Error(`Unknown comp-card variant: ${requestedVariant}`);
    }

    for (const variant of variants) {
      activeVariant = variant;
      global.activeVariant = variant;
      activeImageOverrides = new Map(
        FIXTURE_IMAGES.map((fixtureUrl, index) => [
          fixtureUrl,
          variant.images[index],
        ]),
      );

      const pdf = await renderCompCard("elara-k", null, {
        engine: "composed",
        seed: variant.seed,
        structure: variant.structure,
        treatment: variant.treatment,
        board: variant.board,
        backArchitecture: variant.backArchitecture || null,
        lockHeroId: variant.lockHeroId,
        lockGridIds: variant.lockGridIds,
        jury: false,
      });
      const pdfPath = variant.keepPdf
        ? OUTPUT_PDF
        : path.join(os.tmpdir(), `pholio-${variant.id}.pdf`);

      fs.writeFileSync(pdfPath, pdf);
      execFileSync("pdftoppm", [
        "-png",
        "-r",
        "192",
        "-f",
        "1",
        "-l",
        "1",
        "-singlefile",
        pdfPath,
        path.join(OUTPUT_DIR, variant.frontFile),
      ]);

      if (!variant.keepPdf) fs.unlinkSync(pdfPath);
      console.log(`Generated ${variant.frontFile}.png`);
    }

    if (variants.some((variant) => variant.keepPdf)) {
      execFileSync("pdftoppm", [
        "-png",
        "-r",
        "192",
        "-f",
        "2",
        "-l",
        "2",
        "-singlefile",
        OUTPUT_PDF,
        path.join(OUTPUT_DIR, "elara-keats-back"),
      ]);
      console.log(`Generated ${OUTPUT_PDF}`);
    }
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
