/**
 * mikroaaltouuni.fi – sivuston perusasetukset.
 *
 * Tätä tiedostoa muokkaamalla voit vaihtaa sivuston nimen, osoitteen,
 * yhteystiedot, hintaoppaan päivämäärät ja jälleenmyyjien linkit
 * (myös kumppanuus-/affiliate-linkit) koskematta sivupohjiin.
 */

export const site = {
  name: "mikroaaltouuni.fi",
  url: "https://mikroaaltouuni.fi",
  lang: "fi",
  locale: "fi_FI",
  defaultTitle: "Mikroaaltouuni – opas, vertailu ja hinnat | mikroaaltouuni.fi",
  defaultDescription:
    "Etsitkö mikroaaltouunia? Tutustu mikroaaltouunien hintoihin, ominaisuuksiin ja eri tyyppeihin. Vertaile malleja ja löydä sopiva mikro Suomesta.",
  ogImage: "/og-image.png",

  /** Sivuston ylläpitäjä. Täytä ennen julkaisua – näkyy tietosuojaselosteessa ja yhteystiedoissa. */
  owner: {
    name: "", // esim. "Yritys Oy" tai ylläpitäjän nimi
    businessId: "", // Y-tunnus, jos on
    email: "", // esim. "toimitus@mikroaaltouuni.fi"
  },

  /**
   * Käytetäänkö sivustolla kaupallisia kumppanuuslinkkejä.
   * Kun jollekin jälleenmyyjälle asetetaan affiliateUrl, tämä kannattaa pitää true:na,
   * jolloin linkkien läheisyydessä näytetään avoin maininta.
   */
  usesAffiliateLinks: true,

  /** Päivämäärä, jolloin sisältöä (oppaita) on viimeksi päivitetty. Muoto VVVV-KK-PP. */
  contentUpdated: "2026-09-29",

  /**
   * Product-schema (JSON-LD) on oletuksena pois päältä, koska sivusto ei myy tuotteita
   * eikä hintoja päivitetä reaaliajassa. Ota käyttöön vain, jos tuotetiedot pidetään ajan tasalla.
   */
  enableProductSchema: false,
} as const;

/** Hintatasotaulukko (suuntaa-antavat hintahaarukat). Päivitä `updated`, kun tarkistat haarukat. */
export const priceRanges: { label: string; range: string; note: string; href?: string; updated: string }[] = [
  {
    label: "Edullinen perusmikro",
    range: "noin 50–100 €",
    note: "Lämmitys ja sulatus, usein mekaaninen säädin ja 17–20 litraa.",
    href: "/pieni-mikroaaltouuni",
    updated: "2026-09-29",
  },
  {
    label: "Keskihintainen mikro",
    range: "noin 100–200 €",
    note: "Digitaalinen näyttö, automaattiohjelmat, 20–25 litraa.",
    href: "/mikroaaltouuni-vertailu",
    updated: "2026-09-29",
  },
  {
    label: "Grillimikro",
    range: "noin 100–250 €",
    note: "Mikroaaltojen lisäksi grillivastus pinnan ruskistamiseen.",
    href: "/grillimikro",
    updated: "2026-09-29",
  },
  {
    label: "Kiertoilmalla / monitoiminnoilla",
    range: "noin 150–400 €",
    note: "Kiertoilma, grilli ja yhdistelmätoiminnot – toimii myös pienenä uunina.",
    href: "/kiertoilmamikro",
    updated: "2026-09-29",
  },
  {
    label: "Integroitava mikro",
    range: "noin 250–600 €+",
    note: "Asennetaan keittiökalusteisiin. Hintaan voi tulla asennus ja kehys.",
    href: "/integroitava-mikroaaltouuni",
    updated: "2026-09-29",
  },
];

export type RetailerId =
  | "gigantti"
  | "verkkokauppa"
  | "power"
  | "prisma"
  | "kcitymarket"
  | "krauta"
  | "tokmanni"
  | "ikea"
  | "euronics"
  | "clasohlson"
  | "veikonkone";

export interface Retailer {
  id: RetailerId;
  name: string;
  /** Lyhyt, neutraali kuvaus. Älä lupaa tietyn mallin saatavuutta. */
  description: string;
  /** Julkinen osoite (etusivu tai mikroaaltouunikategoria). */
  url: string;
  /**
   * Kumppanuuslinkki. Jätä tyhjäksi, kunnes sinulla on oikea, jälleenmyyjän tai
   * kumppaniverkoston antama linkki. Kun kenttä on täytetty, sitä käytetään `url`:n sijaan
   * ja linkki merkitään rel="sponsored".
   */
  affiliateUrl: string;
  /** Näytetäänkö "Mistä ostaa" -osiossa. */
  featured: boolean;
  /** Vertailusivun myyjäsuodattimen ryhmä. */
  filterGroup: "Gigantti" | "Verkkokauppa.com" | "POWER" | "Prisma" | "Tokmanni" | "IKEA" | "muut";
}

export const retailers: Retailer[] = [
  {
    id: "gigantti",
    name: "Gigantti",
    description: "Laaja valikoima tavallisia, grillillisiä ja integroitavia mikroaaltouuneja sekä myymälöitä ympäri Suomea.",
    url: "https://www.gigantti.fi/",
    affiliateUrl: "",
    featured: true,
    filterGroup: "Gigantti",
  },
  {
    id: "verkkokauppa",
    name: "Verkkokauppa.com",
    description: "Mikroaaltouuneja eri hintaluokissa sekä integroitavia malleja. Tuotesivuilla on yleensä mitat ja käyttäjäarvioita.",
    url: "https://www.verkkokauppa.com/",
    affiliateUrl: "",
    featured: true,
    filterGroup: "Verkkokauppa.com",
  },
  {
    id: "power",
    name: "POWER",
    description: "Kodinkoneisiin ja elektroniikkaan keskittyvä jälleenmyyjä, jonka valikoimassa on mikroaaltouuneja.",
    url: "https://www.power.fi/kodinkoneet/mikroaaltouunit-ja-tarvikkeet/mikroaaltouunit/",
    affiliateUrl: "",
    featured: true,
    filterGroup: "POWER",
  },
  {
    id: "prisma",
    name: "Prisma",
    description: "S-ryhmän hypermarketeista ja Prisman verkkokaupasta löytyy erityisesti edullisia ja keskihintaisia pöytämikroja.",
    url: "https://www.prisma.fi/kategoriat/1424/mikroaaltouunit",
    affiliateUrl: "",
    featured: true,
    filterGroup: "Prisma",
  },
  {
    id: "kcitymarket",
    name: "K-Citymarket",
    description: "Pöytämalleja arjen tarpeisiin. Valikoima vaihtelee myymälöittäin.",
    url: "https://www.k-citymarket.fi/",
    affiliateUrl: "",
    featured: true,
    filterGroup: "muut",
  },
  {
    id: "krauta",
    name: "K-Rauta",
    description: "Rautakaupan kodinkoneosastolla on myös integroitavia mikroaaltouuneja keittiöremonttia varten.",
    url: "https://www.k-rauta.fi/",
    affiliateUrl: "",
    featured: true,
    filterGroup: "muut",
  },
  {
    id: "tokmanni",
    name: "Tokmanni",
    description: "Edullisempia perusmikroja. Valikoima ja saatavuus vaihtelevat myymälöittäin.",
    url: "https://www.tokmanni.fi/",
    affiliateUrl: "",
    featured: true,
    filterGroup: "Tokmanni",
  },
  {
    id: "ikea",
    name: "IKEA",
    description: "Integroitavia mikroaaltouuneja, jotka on suunniteltu IKEAn keittiökalusteisiin.",
    url: "https://www.ikea.com/fi/fi/",
    affiliateUrl: "",
    featured: true,
    filterGroup: "IKEA",
  },
  {
    id: "euronics",
    name: "Euronics",
    description: "Kodinkone- ja elektroniikkaketju, jonka valikoimassa on sekä pöytämalleja että integroitavia mikroja.",
    url: "https://www.euronics.fi/",
    affiliateUrl: "",
    featured: true,
    filterGroup: "muut",
  },
  {
    id: "clasohlson",
    name: "Clas Ohlson",
    description: "Pöytämalleja ja mikroaaltouunin tarvikkeita, kuten kupuja ja lautasia.",
    url: "https://www.clasohlson.com/fi/",
    affiliateUrl: "",
    featured: false,
    filterGroup: "muut",
  },
  {
    id: "veikonkone",
    name: "Veikon Kone",
    description: "Kodinkoneliike, jonka valikoimassa on vapaasti sijoitettavia ja integroitavia mikroja.",
    url: "https://www.veikonkone.fi/",
    affiliateUrl: "",
    featured: false,
    filterGroup: "muut",
  },
];

export function getRetailer(id: RetailerId): Retailer {
  const r = retailers.find((x) => x.id === id);
  if (!r) throw new Error(`Tuntematon jälleenmyyjä: ${id}`);
  return r;
}

/** Palauttaa linkin, jota sivustolla käytetään: kumppanuuslinkki, jos sellainen on asetettu. */
export function retailerHref(r: Retailer): { href: string; sponsored: boolean } {
  if (r.affiliateUrl) return { href: r.affiliateUrl, sponsored: true };
  return { href: r.url, sponsored: false };
}
