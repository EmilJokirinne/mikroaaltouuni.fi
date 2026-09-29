/**
 * mikroaaltouuni.fi – build.
 * Generoi kaikki sivut staattiseksi HTML:ksi dist-kansioon (yksi tiedosto per sivu,
 * esim. dist/grillimikro.html → https://mikroaaltouuni.fi/grillimikro),
 * sekä sitemap.xml:n ja robots.txt:n. Tailwind-CSS käännetään package.jsonin build-skriptissä.
 *
 * Aja: npm run build
 */

import { mkdirSync, rmSync, writeFileSync, copyFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { site } from "./site.config.ts";
import { products } from "./products.ts";
import { layout } from "./ui.ts";
import type { PageDef } from "./pages-types.ts";
import { homePage } from "./pages-home.ts";
import { guidePage, comparePage, pricePage, faqPage } from "./pages-guides.ts";
import {
  grillPage, convectionPage, builtinPage, smallPage, power700Page, power800Page, power900Page, size20Page, size25Page,
} from "./pages-topics.ts";
import { aboutPage, contactPage, privacyPage, cookiePage, affiliatePage, notFoundPage } from "./pages-info.ts";

const root = dirname(fileURLToPath(import.meta.url));
const out = join(root, "dist");
const buildId = Date.now().toString(36);

/* ---- tarkistukset: ei keksittyjä tai puutteellisia hintatietoja ---- */
const warnings: string[] = [];
for (const p of products) {
  if (p.price !== null && !/^\d{4}-\d{2}-\d{2}$/.test(p.lastUpdated))
    throw new Error(`${p.name}: hinnalla pitää olla tarkistuspäivä muodossa VVVV-KK-PP (lastUpdated).`);
  if (p.price !== null && (p.price <= 0 || !Number.isFinite(p.price))) throw new Error(`${p.name}: virheellinen hinta.`);
  const ageDays = (Date.now() - Date.parse(p.lastUpdated)) / 864e5;
  if (ageDays > 60) warnings.push(`${p.name}: hinta tarkistettu ${Math.round(ageDays)} päivää sitten – päivitä products.ts.`);
}
if (!site.owner.email) warnings.push("site.config.ts: owner.email puuttuu – yhteystiedot-sivu näyttää yleisen tekstin.");
if (!site.owner.name) warnings.push("site.config.ts: owner.name puuttuu – tietosuojaselosteen rekisterinpitäjä on yleisellä tasolla.");

/* ---- sivut ---- */
const pages: PageDef[] = [
  homePage(),
  guidePage(),
  comparePage(),
  pricePage(),
  grillPage(),
  convectionPage(),
  builtinPage(),
  smallPage(),
  power700Page(),
  power800Page(),
  power900Page(),
  size20Page(),
  size25Page(),
  faqPage(),
  aboutPage(),
  contactPage(),
  privacyPage(),
  cookiePage(),
  affiliatePage(),
  notFoundPage(),
];

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

for (const p of pages) {
  const file = p.outFile ?? (p.path === "/" ? "index.html" : `${p.path.slice(1)}.html`);
  writeFileSync(join(out, file), layout({ ...p, buildId }));
}

/* ---- staattiset tiedostot ---- */
const staticFiles = [
  "app.js",
  "favicon.svg",
  "hero-mikroaaltouuni.svg",
  "inter-var-latin.woff2",
  "site.webmanifest",
  "og-image.png",
  "apple-touch-icon.png",
  "icon-192.png",
  "icon-512.png",
  ".htaccess",
];
for (const f of staticFiles) {
  const src = join(root, f);
  if (existsSync(src)) copyFileSync(src, join(out, f));
  else warnings.push(`Puuttuva tiedosto: ${f}`);
}

/* ---- sitemap & robots ---- */
const indexable = pages.filter((p) => !p.noindex && !p.excludeFromSitemap);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable
  .map(
    (p) =>
      `  <url><loc>${p.path === "/" ? site.url + "/" : site.url + p.path}</loc><lastmod>${site.contentUpdated}</lastmod></url>`,
  )
  .join("\n")}
</urlset>
`;
writeFileSync(join(out, "sitemap.xml"), sitemap);
writeFileSync(join(out, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`);

console.log(`✓ ${pages.length} sivua → dist/`);
for (const w of warnings) console.warn(`! ${w}`);
