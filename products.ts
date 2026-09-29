/**
 * mikroaaltouuni.fi – esimerkkituotteet.
 *
 * Päivitä hinnat ja päivämäärät tässä tiedostossa. Sivut (etusivu, vertailu,
 * teho- ja kokosivut) lukevat tuotteet täältä automaattisesti.
 *
 * SÄÄNNÖT
 * - Älä koskaan keksi hintaa. Jos hintaa ei ole tarkistettu, aseta price: null,
 *   jolloin sivulla näkyy "Hinta ei saatavilla – tarkista jälleenmyyjältä."
 * - Päivitä lastUpdated aina, kun tarkistat hinnan (muoto VVVV-KK-PP).
 * - Teho (power) = valmistajan ilmoittama suurin mikroaaltoteho watteina.
 * - Tilavuus (capacity) = sisätilavuus litroina.
 * - Jos jokin tekninen tieto ei ole varmistettu, aseta se null:ksi – sivu näyttää
 *   silloin "Tarkista jälleenmyyjältä".
 * - url: tuotesivun osoite jälleenmyyjällä. Tyhjä = käytetään jälleenmyyjän
 *   yleislinkkiä site.config.ts:stä. affiliateUrl: kumppanuuslinkki tälle tuotteelle.
 */

import type { RetailerId } from "./site.config.ts";

export type MicrowaveType = "tavallinen" | "grilli" | "kiertoilma" | "integroitu";

export interface Product {
  id: string;
  name: string;
  brand: string;
  model: string;
  /** Hinta euroina tai null, jos hintaa ei ole tarkistettu. */
  price: number | null;
  currency: "EUR";
  /** Suurin mikroaaltoteho, W. */
  power: number | null;
  /** Sisätilavuus, litraa. */
  capacity: number | null;
  type: MicrowaveType;
  retailer: RetailerId;
  url: string;
  affiliateUrl: string;
  /** Päivä, jolloin hinta on tarkistettu (VVVV-KK-PP). */
  lastUpdated: string;
  /** Lyhyet, varmistetut lisätiedot. */
  highlights: string[];
  /** Ulkomitat K × L × S mm, jos varmistettu. */
  dimensions?: string;
}

export const typeLabels: Record<MicrowaveType, string> = {
  tavallinen: "Tavallinen",
  grilli: "Grilli",
  kiertoilma: "Kiertoilma",
  integroitu: "Integroitu",
};

export const products: Product[] = [
  {
    id: "house-mw1720s",
    name: "House Compact MW1720S",
    brand: "House",
    model: "MW1720S",
    price: 59.95,
    currency: "EUR",
    power: 700,
    capacity: 20,
    type: "tavallinen",
    retailer: "prisma",
    url: "",
    affiliateUrl: "",
    lastUpdated: "2026-09-29",
    highlights: ["Mekaaniset säätimet", "6 tehotasoa", "30 min ajastin", "Lasilautanen Ø 24,5 cm"],
  },
  {
    id: "upo-mo20de",
    name: "UPO MO20DE",
    brand: "UPO",
    model: "MO20DE",
    price: 79.99,
    currency: "EUR",
    power: 800,
    capacity: 20,
    type: "tavallinen",
    retailer: "verkkokauppa",
    url: "https://www.verkkokauppa.com/fi/product/574639/Upo-MO20DE-mikroaaltouuni-teras",
    affiliateUrl: "",
    lastUpdated: "2026-09-29",
    highlights: ["Digitaalinen näyttö", "5 tehotasoa", "Automaattiohjelmat", "AquaClean-puhdistus", "Lapsilukko"],
    dimensions: "257 × 451 × 343 mm",
  },
  {
    id: "samsung-ms23k3523ak",
    name: "Samsung MS23K3523AK/EE",
    brand: "Samsung",
    model: "MS23K3523AK/EE",
    price: 134,
    currency: "EUR",
    power: 800,
    capacity: 23,
    type: "tavallinen",
    retailer: "prisma",
    url: "https://www.prisma.fi/tuotteet/100201813/samsung-mikroaaltouuni-ms23k3523akee-100201813",
    affiliateUrl: "",
    lastUpdated: "2026-09-29",
    highlights: ["Keraaminen sisäpinta", "Pyörivä lautanen Ø 28,8 cm", "Automaattiset sulatusohjelmat", "Lapsilukko", "Musta"],
  },
  {
    id: "bosch-ffl023mw0",
    name: "Bosch FFL023MW0",
    brand: "Bosch",
    model: "FFL023MW0",
    price: 139,
    currency: "EUR",
    power: 800,
    capacity: 20,
    type: "tavallinen",
    retailer: "gigantti",
    url: "https://www.gigantti.fi/product/kodinkoneet/uunit-ja-liedet/mikroaaltouunit/bosch-mikroaaltouuni-ffl023mw0-valkoinen/387081",
    affiliateUrl: "",
    lastUpdated: "2026-09-29",
    highlights: ["Serie 2", "5 tehotasoa", "7 automaattiohjelmaa (AutoPilot 7)", "Valkoinen"],
    dimensions: "260 × 442 × 345 mm",
  },
  {
    id: "electrolux-emz725mmw",
    name: "Electrolux EMZ725MMW",
    brand: "Electrolux",
    model: "EMZ725MMW",
    price: 179,
    currency: "EUR",
    power: 900,
    capacity: 25,
    type: "grilli",
    retailer: "power",
    url: "",
    affiliateUrl: "",
    lastUpdated: "2026-09-29",
    highlights: ["Grilli 1000 W", "Invertteritekniikka", "SteamPot-höyrytysastia", "Pyörivä lautanen Ø 28,8 cm", "Valkoinen"],
    dimensions: "280 × 469 × 357 mm",
  },
  {
    id: "electrolux-lms2173nb",
    name: "Electrolux LMS2173NB",
    brand: "Electrolux",
    model: "LMS2173NB",
    price: 349,
    currency: "EUR",
    power: 700,
    capacity: 17,
    type: "integroitu",
    retailer: "krauta",
    url: "https://www.k-rauta.fi/tuote/mikroaaltouuni-electrolux-lms2173nb-integroitava-musta/7333394010601",
    affiliateUrl: "",
    lastUpdated: "2026-09-29",
    highlights: ["Kalusteisiin integroitava", "Asennusaukko 380 × 560 × 300 mm", "Automaattiohjelmat", "Musta"],
  },
];

/* ---------- Suodatusluokat (vertailusivu) ---------- */

export function priceBand(p: number | null): string {
  if (p === null) return "tuntematon";
  if (p < 75) return "alle-75";
  if (p < 150) return "75-150";
  if (p <= 250) return "150-250";
  return "yli-250";
}

export function powerBand(w: number | null): string {
  if (w === null) return "tuntematon";
  if (w < 700) return "alle-700";
  if (w < 800) return "700-800";
  if (w < 900) return "800-900";
  return "900-plus";
}

export function capacityBand(l: number | null): string {
  if (l === null) return "tuntematon";
  if (l < 20) return "alle-20";
  if (l <= 25) return "20-25";
  if (l <= 30) return "25-30";
  return "yli-30";
}
