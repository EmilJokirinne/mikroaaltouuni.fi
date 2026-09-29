/**
 * mikroaaltouuni.fi – sivupohja ja uudelleenkäytettävät komponentit.
 * Komponentit ovat puhtaita funktioita, jotka palauttavat HTML:ää.
 */

import { site, retailers, priceRanges, getRetailer, retailerHref, type Retailer } from "./site.config.ts";
import { products, typeLabels, priceBand, powerBand, capacityBand, type Product } from "./products.ts";
import type { FaqItem } from "./faq.ts";

/* ---------------------------------------------------------------- apurit */

export const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const stripTags = (s: string) =>
  s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

export function fmtDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d}.${m}.${y}`;
}

export function fmtPrice(n: number): string {
  const hasCents = Math.round(n * 100) % 100 !== 0;
  return (
    n.toLocaleString("fi-FI", { minimumFractionDigits: hasCents ? 2 : 0, maximumFractionDigits: 2 }).replace(/\u00a0/g, " ") +
    " €"
  );
}

export const abs = (path: string) => (path === "/" ? `${site.url}/` : `${site.url}${path}`);

export const html = (strings: TemplateStringsArray, ...values: unknown[]) =>
  strings.reduce((acc, s, i) => {
    const v = values[i - 1];
    return acc + (Array.isArray(v) ? v.join("") : v === undefined || v === null || v === false ? "" : String(v)) + s;
  });

/* ---------------------------------------------------------------- ikonit */

const svg = (d: string, cls = "h-5 w-5") =>
  `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;

export const icon = {
  arrow: (c = "h-4 w-4") => svg(`<path d="M5 12h14M13 6l6 6-6 6"/>`, c),
  external: (c = "h-4 w-4") => svg(`<path d="M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/>`, c),
  check: (c = "h-5 w-5") => svg(`<path d="M5 12.5l4.5 4.5L19 7.5"/>`, c),
  dash: (c = "h-5 w-5") => svg(`<path d="M7 12h10"/>`, c),
  plus: (c = "h-5 w-5") => svg(`<path d="M12 5v14M5 12h14"/>`, c),
  menu: (c = "h-6 w-6") => svg(`<path d="M4 7h16M4 12h16M4 17h16"/>`, c),
  chevron: (c = "h-4 w-4") => svg(`<path d="M6 9l6 6 6-6"/>`, c),
  info: (c = "h-5 w-5") => svg(`<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>`, c),
  shield: (c = "h-5 w-5") => svg(`<path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"/><path d="M9 12l2 2 4-4"/>`, c),
  // Tyyppikuvakkeet
  micro: (c = "h-7 w-7") => svg(`<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><rect x="5" y="7.5" width="10" height="9" rx="1.2"/><path d="M18 8.5v.01M18 11.5v.01M18 14.5h.01"/>`, c),
  grill: (c = "h-7 w-7") => svg(`<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M5.5 8.5c1 .8 1.5.8 2.5 0s1.5-.8 2.5 0 1.5.8 2.5 0"/><path d="M5.5 16h9"/><path d="M18 8.5v.01M18 11.5v.01"/>`, c),
  fan: (c = "h-7 w-7") => svg(`<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><circle cx="10" cy="12" r="3.5"/><path d="M10 8.5c1.2 1.1 1.2 2.4 0 3.5M13.5 12c-1.1 1.2-2.4 1.2-3.5 0M10 15.5c-1.2-1.1-1.2-2.4 0-3.5"/><path d="M18 8.5v.01M18 11.5v.01"/>`, c),
  builtin: (c = "h-7 w-7") => svg(`<path d="M3 3h18v18H3z"/><path d="M3 9h18"/><rect x="5.5" y="11" width="13" height="7.5" rx="1"/><path d="M7.5 6h3"/>`, c),
  // Ominaisuuskuvakkeet
  bolt: (c = "h-6 w-6") => svg(`<path d="M13 3L5 13.5h6L10 21l8-10.5h-6z"/>`, c),
  box: (c = "h-6 w-6") => svg(`<path d="M3.5 7.5L12 3l8.5 4.5v9L12 21l-8.5-4.5z"/><path d="M3.5 7.5L12 12l8.5-4.5M12 12v9"/>`, c),
  auto: (c = "h-6 w-6") => svg(`<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>`, c),
  flame: (c = "h-6 w-6") => svg(`<path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2.5 1.5-4 2.5-5 .3 1.5 1 2.5 2 3 .5-2.5 0-5.5.5-8z"/>`, c),
  wind: (c = "h-6 w-6") => svg(`<path d="M3 9h11a3 3 0 1 0-3-3M3 13h15a3 3 0 1 1-3 3M3 17h7"/>`, c),
  wave: (c = "h-6 w-6") => svg(`<path d="M2.5 12c2-4 4-4 6 0s4 4 6 0 4-4 6 0"/><path d="M2.5 18h19" opacity=".4"/>`, c),
  plate: (c = "h-6 w-6") => svg(`<ellipse cx="12" cy="13" rx="9" ry="4.5"/><ellipse cx="12" cy="12.5" rx="5" ry="2.2"/><path d="M12 4v3M9.5 5.5L12 7l2.5-1.5"/>`, c),
  sparkle: (c = "h-6 w-6") => svg(`<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"/>`, c),
  // Skenaariot
  student: (c = "h-6 w-6") => svg(`<path d="M2.5 9L12 4.5 21.5 9 12 13.5z"/><path d="M6.5 11v4.5c1.5 1.5 3.5 2.2 5.5 2.2s4-.7 5.5-2.2V11M21.5 9v5"/>`, c),
  kitchen: (c = "h-6 w-6") => svg(`<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M4 10h16M8 6.5h2M8 13.5v3"/>`, c),
  family: (c = "h-6 w-6") => svg(`<circle cx="8" cy="7" r="2.5"/><circle cx="16.5" cy="8.5" r="2"/><path d="M3.5 19c0-3 2-5 4.5-5s4.5 2 4.5 5M13 19c0-2.5 1.5-4 3.5-4s3.5 1.5 3.5 4"/>`, c),
  chef: (c = "h-6 w-6") => svg(`<path d="M7 14.5V20h10v-5.5"/><path d="M7 14.5a4 4 0 0 1-.8-7.9 5 5 0 0 1 11.6 0A4 4 0 0 1 17 14.5z"/><path d="M7 17h10"/>`, c),
};

/* ---------------------------------------------------------------- navigaatio */

export const nav = {
  main: [
    { label: "Osto-opas", href: "/mikroaaltouuni-osto-opas" },
    { label: "Vertailu", href: "/mikroaaltouuni-vertailu" },
    { label: "Hinnat", href: "/mikroaaltouuni-hinta" },
    { label: "FAQ", href: "/usein-kysytyt-kysymykset" },
  ],
  types: [
    { label: "Grillimikro", href: "/grillimikro" },
    { label: "Kiertoilmamikro", href: "/kiertoilmamikro" },
    { label: "Integroitava mikroaaltouuni", href: "/integroitava-mikroaaltouuni" },
    { label: "Pieni mikroaaltouuni", href: "/pieni-mikroaaltouuni" },
  ],
  power: [
    { label: "Mikroaaltouuni 700 W", href: "/mikroaaltouuni-700w" },
    { label: "Mikroaaltouuni 800 W", href: "/mikroaaltouuni-800w" },
    { label: "Mikroaaltouuni 900 W", href: "/mikroaaltouuni-900w" },
  ],
  size: [
    { label: "Mikroaaltouuni 20 l", href: "/mikroaaltouuni-20l" },
    { label: "Mikroaaltouuni 25 l", href: "/mikroaaltouuni-25l" },
    { label: "Pieni mikroaaltouuni", href: "/pieni-mikroaaltouuni" },
  ],
};

function navLink(href: string, label: string, current: string, cls: string) {
  const active = current === href;
  return `<a href="${href}" class="${cls}${active ? " text-navy-950" : ""}"${active ? ' aria-current="page"' : ""}>${label}</a>`;
}

function header(current: string): string {
  const linkCls = "rounded-lg px-3 py-2 text-[0.95rem] font-medium text-ink-soft hover:bg-navy-50 hover:text-navy-950";
  const typesActive = nav.types.some((t) => t.href === current);
  return html`
<a href="#sisalto" class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:shadow-lift">Siirry sisältöön</a>
<header class="site-header sticky top-0 z-50 border-b border-transparent bg-white/90 backdrop-blur" data-header>
  <div class="container-page flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
    <a href="/" class="flex items-center gap-2.5 text-navy-950" aria-label="mikroaaltouuni.fi – etusivu">
      <span class="grid h-9 w-9 place-items-center rounded-xl bg-navy-900 text-accent-300">${icon.micro("h-5 w-5")}</span>
      <span class="text-[1.05rem] font-bold tracking-tight">mikroaaltouuni<span class="text-accent-600">.fi</span></span>
    </a>

    <nav class="hidden items-center gap-1 lg:flex" aria-label="Päävalikko">
      ${navLink(nav.main[0].href, nav.main[0].label, current, linkCls)}
      ${navLink(nav.main[1].href, nav.main[1].label, current, linkCls)}
      ${navLink(nav.main[2].href, nav.main[2].label, current, linkCls)}
      <details class="relative" data-dropdown>
        <summary class="${linkCls} inline-flex items-center gap-1 list-none${typesActive ? " text-navy-950" : ""}">Tyypit ${icon.chevron("h-4 w-4")}</summary>
        <div class="absolute left-0 top-full mt-2 w-72 rounded-2xl border border-line bg-white p-2 shadow-lift">
          ${nav.types.map((t) => `<a href="${t.href}" class="block rounded-xl px-3 py-2.5 text-sm font-medium text-ink hover:bg-navy-50"${t.href === current ? ' aria-current="page"' : ""}>${t.label}</a>`)}
          <div class="my-2 border-t border-line"></div>
          <p class="px-3 pb-1 pt-1 text-xs font-semibold uppercase tracking-wide text-ink-muted">Teho ja koko</p>
          <div class="grid grid-cols-2 gap-1">
            ${[...nav.power, ...nav.size.slice(0, 2)].map((t) => `<a href="${t.href}" class="rounded-xl px-3 py-2 text-sm text-ink-soft hover:bg-navy-50 hover:text-navy-950">${t.label.replace("Mikroaaltouuni ", "")}</a>`)}
          </div>
        </div>
      </details>
      ${navLink(nav.main[3].href, nav.main[3].label, current, linkCls)}
    </nav>

    <div class="flex items-center gap-2">
      <a href="/mikroaaltouuni-vertailu" class="btn-accent btn-sm hidden sm:inline-flex">Vertaile mikroja</a>
      <details class="lg:hidden" data-mobile-menu>
        <summary class="grid h-10 w-10 list-none place-items-center rounded-xl border border-line text-navy-900" aria-label="Avaa valikko">${icon.menu()}</summary>
        <div class="absolute inset-x-0 top-full border-b border-line bg-white shadow-lift">
          <nav class="container-page grid gap-1 py-4" aria-label="Mobiilivalikko">
            ${[...nav.main.slice(0, 3), ...nav.types, nav.main[3]].map((l) => `<a href="${l.href}" class="rounded-xl px-3 py-3 text-base font-medium text-ink hover:bg-navy-50"${l.href === current ? ' aria-current="page"' : ""}>${l.label}</a>`)}
            <a href="/mikroaaltouuni-vertailu" class="btn-accent mt-2">Vertaile mikroja</a>
          </nav>
        </div>
      </details>
    </div>
  </div>
</header>`;
}

function footer(): string {
  const col = (title: string, links: { label: string; href: string }[]) => html`
    <div>
      <p class="text-sm font-semibold text-white">${title}</p>
      <ul class="mt-4 space-y-2.5">
        ${links.map((l) => `<li><a href="${l.href}" class="text-sm text-navy-200 hover:text-white">${l.label}</a></li>`)}
      </ul>
    </div>`;
  const year = site.contentUpdated.slice(0, 4);
  return html`
<footer class="site-footer mt-24 bg-navy-950 text-navy-200">
  <div class="container-page grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
    <div>
      <a href="/" class="flex items-center gap-2.5 text-white">
        <span class="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-accent-300">${icon.micro("h-5 w-5")}</span>
        <span class="text-lg font-bold tracking-tight">Mikroaaltouuni.fi</span>
      </a>
      <div class="mt-6 space-y-5 text-sm leading-relaxed">
        <div>
          <p class="font-semibold text-white">Tietoa sivustosta</p>
          <p class="mt-1">mikroaaltouuni.fi on suomalainen tietosivusto, joka auttaa kuluttajia tutustumaan mikroaaltouuneihin, niiden ominaisuuksiin ja hintoihin.</p>
        </div>
        <div>
          <p class="font-semibold text-white">Hinnat ja saatavuus</p>
          <p class="mt-1">Tuotteiden hinnat ja saatavuus voivat muuttua. Tarkista aina ajantasaiset tiedot jälleenmyyjän verkkokaupasta ennen ostamista.</p>
        </div>
        ${site.usesAffiliateLinks ? `<p class="text-navy-300">Osa sivuston linkeistä voi olla kaupallisia kumppanuuslinkkejä. Linkin käyttäminen ei maksa sinulle ylimääräistä. <a href="/kumppanuuslinkit" class="underline underline-offset-4 hover:text-white">Lue lisää</a></p>` : ""}
      </div>
    </div>
    ${col("Oppaat", [
      { label: "Osto-opas", href: "/mikroaaltouuni-osto-opas" },
      { label: "Vertailu", href: "/mikroaaltouuni-vertailu" },
      { label: "Hinnat", href: "/mikroaaltouuni-hinta" },
      { label: "FAQ", href: "/usein-kysytyt-kysymykset" },
    ])}
    ${col("Mikrotyypit", [
      { label: "Grillimikrot", href: "/grillimikro" },
      { label: "Kiertoilmamikrot", href: "/kiertoilmamikro" },
      { label: "Integroitavat mikroaaltouunit", href: "/integroitava-mikroaaltouuni" },
      { label: "Pienet mikroaaltouunit", href: "/pieni-mikroaaltouuni" },
      { label: "700 W · 800 W · 900 W", href: "/mikroaaltouuni-800w" },
      { label: "20 l · 25 l", href: "/mikroaaltouuni-20l" },
    ])}
    ${col("Sivusto", [
      { label: "Tietoa sivustosta", href: "/tietoa-sivustosta" },
      { label: "Yhteystiedot", href: "/yhteystiedot" },
      { label: "Tietosuojaseloste", href: "/tietosuojaseloste" },
      { label: "Evästekäytännöt", href: "/evastekaytannot" },
      { label: "Kumppanuuslinkit", href: "/kumppanuuslinkit" },
    ])}
  </div>
  <div class="border-t border-white/10">
    <div class="container-page flex flex-col gap-2 py-6 text-xs text-navy-300 sm:flex-row sm:items-center sm:justify-between">
      <p>© ${year} Mikroaaltouuni.fi · Riippumaton kuluttajaopas, ei verkkokauppa.</p>
      <p>Sisältö päivitetty ${fmtDate(site.contentUpdated)}</p>
    </div>
  </div>
</footer>`;
}

/* ---------------------------------------------------------------- sivupohja */

export interface Crumb { name: string; path: string }

export interface PageInput {
  path: string;
  title: string;
  description: string;
  body: string;
  jsonLd?: object[];
  crumbs?: Crumb[];
  noindex?: boolean;
  ogType?: "website" | "article";
  buildId: string;
}

export function breadcrumbsHtml(crumbs: Crumb[]): string {
  const all = [{ name: "Etusivu", path: "/" }, ...crumbs];
  return html`
<nav aria-label="Murupolku" class="container-page pt-6">
  <ol class="flex flex-wrap items-center gap-1.5 text-sm text-ink-muted">
    ${all.map((c, i) =>
      i === all.length - 1
        ? `<li aria-current="page" class="font-medium text-ink-soft">${esc(c.name)}</li>`
        : `<li><a href="${c.path}" class="hover:text-navy-900 hover:underline">${esc(c.name)}</a></li><li aria-hidden="true" class="text-line">/</li>`,
    )}
  </ol>
</nav>`;
}

export function breadcrumbLd(crumbs: Crumb[]) {
  const all = [{ name: "Etusivu", path: "/" }, ...crumbs];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: abs(c.path) })),
  };
}

export const orgLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${site.url}/#organization`,
  name: "Mikroaaltouuni.fi",
  url: `${site.url}/`,
  logo: `${site.url}/icon-512.png`,
};

export const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  name: "mikroaaltouuni.fi",
  url: `${site.url}/`,
  inLanguage: "fi-FI",
  publisher: { "@id": `${site.url}/#organization` },
};

export function articleLd(path: string, headline: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    inLanguage: "fi-FI",
    mainEntityOfPage: abs(path),
    dateModified: site.contentUpdated,
    author: { "@id": `${site.url}/#organization` },
    publisher: { "@id": `${site.url}/#organization` },
    image: `${site.url}${site.ogImage}`,
  };
}

export function faqLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: stripTags(f.a) },
    })),
  };
}

export function productLd(list: Product[]) {
  return list
    .filter((p) => p.price !== null)
    .map((p) => ({
      "@context": "https://schema.org",
      "@type": "Product",
      name: p.name,
      brand: { "@type": "Brand", name: p.brand },
      model: p.model,
      offers: {
        "@type": "Offer",
        price: p.price,
        priceCurrency: p.currency,
        url: productHref(p).href,
        seller: { "@type": "Organization", name: getRetailer(p.retailer).name },
        priceValidUntil: undefined,
      },
    }));
}

export function layout(p: PageInput): string {
  const canonical = abs(p.path);
  const ld = [...(p.jsonLd ?? []), ...(p.crumbs ? [breadcrumbLd(p.crumbs)] : [])];
  return `<!doctype html>
<html lang="fi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.description)}">
<link rel="canonical" href="${canonical}">
${p.noindex ? '<meta name="robots" content="noindex, follow">' : '<meta name="robots" content="index, follow, max-image-preview:large">'}
<meta name="theme-color" content="#14213a">
<meta property="og:type" content="${p.ogType ?? "website"}">
<meta property="og:locale" content="${site.locale}">
<meta property="og:site_name" content="mikroaaltouuni.fi">
<meta property="og:title" content="${esc(p.title)}">
<meta property="og:description" content="${esc(p.description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${site.url}${site.ogImage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preload" href="/inter-var-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/styles.css?v=${p.buildId}">
${ld.map((o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, "\\u003c")}</script>`).join("\n")}
<script src="/app.js?v=${p.buildId}" defer></script>
</head>
<body>
${header(p.path)}
<main id="sisalto">
${p.crumbs ? breadcrumbsHtml(p.crumbs) : ""}
${p.body}
</main>
${footer()}
</body>
</html>
`;
}

/* ---------------------------------------------------------------- osiot */

export function sectionHead(o: { eyebrow?: string; title: string; intro?: string; id?: string; center?: boolean; level?: 2 | 1 }) {
  const tag = o.level === 1 ? "h1" : "h2";
  return html`
<div class="${o.center ? "mx-auto text-center" : ""} max-w-3xl">
  ${o.eyebrow ? `<p class="eyebrow">${o.eyebrow}</p>` : ""}
  <${tag} ${o.id ? `id="${o.id}-otsikko"` : ""} class="${o.level === 1 ? "text-3xl font-bold tracking-tight text-navy-950 sm:text-4xl" : "h2"} ${o.eyebrow ? "mt-2" : ""}">${o.title}</${tag}>
  ${o.intro ? `<p class="lead mt-4">${o.intro}</p>` : ""}
</div>`;
}

export function section(id: string, inner: string, opts: { tint?: boolean; tight?: boolean } = {}) {
  return `<section id="${id}" aria-labelledby="${id}-otsikko" class="${opts.tint ? "bg-surface" : ""} ${opts.tight ? "py-12 sm:py-16" : "py-16 sm:py-20"}"><div class="container-page">${inner}</div></section>`;
}

/** Alasivun hero */
export function pageHero(o: { eyebrow: string; title: string; intro: string; updated?: boolean; ctas?: string }) {
  return html`
<section class="border-b border-line bg-gradient-to-b from-white to-surface">
  <div class="container-page pb-12 pt-8 sm:pb-16 sm:pt-10">
    <div class="max-w-3xl">
      <p class="eyebrow">${o.eyebrow}</p>
      <h1 class="mt-3 text-[2rem] font-bold leading-tight tracking-tight text-navy-950 sm:text-5xl">${o.title}</h1>
      <p class="lead mt-5">${o.intro}</p>
      ${o.updated !== false ? `<p class="meta mt-5">Päivitetty viimeksi: <time datetime="${site.contentUpdated}">${fmtDate(site.contentUpdated)}</time></p>` : ""}
      ${o.ctas ? `<div class="mt-7 flex flex-wrap gap-3">${o.ctas}</div>` : ""}
    </div>
  </div>
</section>`;
}

/* --- Mikrotyyppikortit */
export const typeCardsData = [
  { title: "Tavallinen mikro", text: "Helppo ja edullinen ratkaisu ruoan lämmittämiseen ja sulattamiseen.", href: "/mikroaaltouuni-osto-opas#teho", ic: icon.micro(), meta: "noin 50–200 €" },
  { title: "Grillimikro", text: "Mikroaaltotoiminnon lisäksi grillitoiminto esimerkiksi pinnan ruskistamiseen.", href: "/grillimikro", ic: icon.grill(), meta: "noin 100–250 €" },
  { title: "Kiertoilmamikro", text: "Yhdistää mikroaaltotoiminnon ja kiertoilman. Sopii monipuolisempaan ruoanlaittoon.", href: "/kiertoilmamikro", ic: icon.fan(), meta: "noin 150–400 €" },
  { title: "Integroitava mikro", text: "Keittiökalusteisiin asennettava ratkaisu, jossa ulkonäkö ja mitoitus ovat erityisen tärkeitä.", href: "/integroitava-mikroaaltouuni", ic: icon.builtin(), meta: "noin 250–600 €+" },
];

export function typeCards(headingLevel: 2 | 3 = 3) {
  const h = `h${headingLevel}`;
  return html`
<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
  ${typeCardsData.map(
    (c) => html`
  <article class="card card-hover group relative flex flex-col p-6">
    <div class="grid h-12 w-12 place-items-center rounded-xl bg-navy-50 text-navy-800">${c.ic}</div>
    <${h} class="mt-5 text-lg font-semibold text-navy-950">${c.title}</${h}>
    <p class="mt-2 flex-1 text-[0.95rem] leading-relaxed text-ink-soft">${c.text}</p>
    <p class="meta mt-4">Tyypillinen hintataso <span class="whitespace-nowrap">${c.meta}</span></p>
    <a href="${c.href}" class="link-arrow mt-4 after:absolute after:inset-0 after:content-['']">Lue lisää <span aria-hidden="true">→</span><span class="sr-only">: ${c.title}</span></a>
  </article>`,
  )}
</div>`;
}

/* --- Hintataso */
export function priceRangeTable() {
  const updated = priceRanges.reduce((a, r) => (r.updated > a ? r.updated : a), "0000");
  return html`
<div class="table-wrap">
  <table class="table">
    <caption class="sr-only">Mikroaaltouunien tyypilliset hintatasot Suomessa</caption>
    <thead><tr><th scope="col">Luokka</th><th scope="col" class="text-right">Tyypillinen hintataso</th><th scope="col" class="hidden md:table-cell">Mitä hintaan yleensä kuuluu</th><th scope="col" class="hidden sm:table-cell">Päivitetty viimeksi</th></tr></thead>
    <tbody>
      ${priceRanges.map(
        (r) => html`<tr>
        <th scope="row">${r.href ? `<a href="${r.href}" class="hover:underline">${r.label}</a>` : r.label}<span class="mt-1 block text-xs font-normal text-ink-muted sm:hidden">Päivitetty viimeksi: ${fmtDate(r.updated)}</span></th>
        <td class="whitespace-nowrap text-right font-semibold tabular-nums text-navy-900">${r.range}</td>
        <td class="hidden text-ink-soft md:table-cell">${r.note}</td>
        <td class="hidden whitespace-nowrap text-ink-muted sm:table-cell"><time datetime="${r.updated}">${fmtDate(r.updated)}</time></td>
      </tr>`,
      )}
    </tbody>
  </table>
</div>
<p class="note mt-4 flex gap-3">${icon.info("mt-0.5 h-5 w-5 shrink-0 text-accent-700")}<span><strong class="font-semibold">Hinnat ovat suuntaa-antavia</strong> ja voivat muuttua tarjousten, mallien ja jälleenmyyjien mukaan. Tarkista aina ajantasainen hinta jälleenmyyjän verkkokaupasta. <span class="text-ink-muted">Päivitetty viimeksi: <time datetime="${updated}">${fmtDate(updated)}</time>.</span></span></p>`;
}

/* --- Tuotteet */
export function productHref(p: Product): { href: string; sponsored: boolean } {
  if (p.affiliateUrl) return { href: p.affiliateUrl, sponsored: true };
  if (p.url) return { href: p.url, sponsored: false };
  return retailerHref(getRetailer(p.retailer));
}

function relFor(sponsored: boolean) {
  return sponsored ? "sponsored nofollow noopener" : "nofollow noopener";
}

function priceCell(p: Product) {
  if (p.price === null)
    return `<span class="text-sm text-ink-soft">Hinta ei saatavilla – tarkista jälleenmyyjältä.</span>`;
  return html`<span class="block whitespace-nowrap text-base font-bold tabular-nums text-navy-950">noin ${fmtPrice(p.price)}</span>
  <span class="meta mt-0.5 block whitespace-nowrap">Hinta tarkistettu: <time datetime="${p.lastUpdated}">${fmtDate(p.lastUpdated)}</time></span>`;
}

const unknown = `<span class="text-ink-muted">Tarkista jälleenmyyjältä</span>`;
const fmtPower = (p: Product) => (p.power ? `${p.power} W` : unknown);
const fmtCap = (p: Product) => (p.capacity ? `${p.capacity} l` : unknown);

function dataAttrs(p: Product) {
  return `data-product data-price="${priceBand(p.price)}" data-type="${p.type}" data-power="${powerBand(p.power)}" data-capacity="${capacityBand(p.capacity)}" data-retailer="${getRetailer(p.retailer).filterGroup}"`;
}

function buyLink(p: Product, small = true) {
  const r = getRetailer(p.retailer);
  const { href, sponsored } = productHref(p);
  return `<a href="${esc(href)}" rel="${relFor(sponsored)}" target="_blank" class="${small ? "btn-ghost btn-sm" : "btn-ghost"} whitespace-nowrap">${p.url || p.affiliateUrl ? "Katso tuote" : "Katso valikoima"} ${icon.external("h-3.5 w-3.5")}<span class="sr-only">: ${esc(p.name)}, ${esc(r.name)} (avautuu uuteen välilehteen)</span></a>`;
}

export function productTable(list: Product[] = products, opts: { caption?: string; cards?: boolean } = {}) {
  const rows = list.map((p) => {
    const r = getRetailer(p.retailer);
    return html`<tr ${dataAttrs(p)}>
      <th scope="row" class="!py-4"><span class="block font-semibold text-navy-950">${esc(p.name)}</span></th>
      <td class="!py-4">${priceCell(p)}</td>
      <td class="!py-4 whitespace-nowrap tabular-nums">${fmtPower(p)}</td>
      <td class="!py-4 whitespace-nowrap tabular-nums">${fmtCap(p)}</td>
      <td class="!py-4"><span class="${p.type === "tavallinen" ? "badge" : "badge-accent"}">${typeLabels[p.type]}</span></td>
      <td class="!py-4"><span class="block whitespace-nowrap">${esc(r.name)}</span><span class="mt-2 block">${buyLink(p)}</span></td>
      <td class="!py-4 text-ink-soft"><span class="block text-[0.8125rem] leading-snug">${p.highlights.slice(0, 3).map(esc).join(" · ")}${p.dimensions ? `<span class="mt-1 block text-ink-muted">Mitat (K×L×S): ${p.dimensions}</span>` : ""}</span></td>
    </tr>`;
  });

  const cards = list.map((p) => {
    const r = getRetailer(p.retailer);
    return html`<li class="card p-5" ${dataAttrs(p)}>
      <div class="flex items-start justify-between gap-3">
        <div>
          <h3 class="font-semibold text-navy-950">${esc(p.name)}</h3>
          <p class="meta mt-0.5">${esc(r.name)}</p>
        </div>
        <span class="${p.type === "tavallinen" ? "badge" : "badge-accent"}">${typeLabels[p.type]}</span>
      </div>
      <dl class="mt-4 grid grid-cols-3 gap-3 rounded-xl bg-surface p-3 text-center">
        <div><dt class="meta">Hinta</dt><dd class="mt-0.5 font-bold tabular-nums text-navy-950">${p.price === null ? "–" : fmtPrice(p.price)}</dd></div>
        <div><dt class="meta">Teho</dt><dd class="mt-0.5 font-semibold tabular-nums">${p.power ? `${p.power} W` : "–"}</dd></div>
        <div><dt class="meta">Tilavuus</dt><dd class="mt-0.5 font-semibold tabular-nums">${p.capacity ? `${p.capacity} l` : "–"}</dd></div>
      </dl>
      <p class="mt-3 text-sm text-ink-soft">${p.highlights.slice(0, 3).map(esc).join(" · ")}</p>
      <div class="mt-4 flex items-center justify-between gap-3">
        <p class="meta">${p.price === null ? "Hinta ei saatavilla – tarkista jälleenmyyjältä." : `Hinta tarkistettu: <time datetime="${p.lastUpdated}">${fmtDate(p.lastUpdated)}</time>`}</p>
        ${buyLink(p)}
      </div>
    </li>`;
  });

  if (opts.cards)
    return html`<ul class="grid gap-4 sm:grid-cols-2" aria-label="${opts.caption ?? "Esimerkkituotteet"}">${cards}</ul>${priceDisclaimer()}`;

  return html`
<div class="hidden lg:block">
  <div class="table-wrap">
    <table class="table">
      <caption class="sr-only">${opts.caption ?? "Esimerkkejä Suomessa myytävistä mikroaaltouuneista"}</caption>
      <thead><tr>
        <th scope="col" class="w-[11rem]">Tuote</th><th scope="col">Hinta</th><th scope="col">Teho</th><th scope="col">Tilavuus</th><th scope="col">Tyyppi</th><th scope="col">Myyjä</th><th scope="col">Lisätiedot</th>
      </tr></thead>
      <tbody>${rows}</tbody>
    </table>
  </div>
</div>
<ul class="grid gap-4 md:grid-cols-2 lg:hidden" aria-label="${opts.caption ?? "Esimerkkituotteet"}">${cards}</ul>
${priceDisclaimer()}`;
}

export function priceDisclaimer() {
  return html`<div class="mt-4 flex flex-col gap-2 text-sm text-ink-soft sm:flex-row sm:items-start sm:justify-between">
  <p class="flex gap-2">${icon.info("mt-0.5 h-4 w-4 shrink-0 text-accent-700")}<span><strong class="font-semibold text-ink">Hinta voi muuttua.</strong> Tarkista ajantasainen hinta jälleenmyyjältä. Teho = suurin mikroaaltoteho, tilavuus = sisätilavuus.</span></p>
  ${site.usesAffiliateLinks ? `<p class="meta sm:max-w-xs sm:text-right">Osa linkeistä voi olla <a href="/kumppanuuslinkit" class="underline underline-offset-2">kumppanuuslinkkejä</a>.</p>` : ""}
</div>`;
}

/* --- Tehotaulukko */
export function powerTable() {
  const rows = [
    ["600–700 W", "Peruskäyttö", "Yksittäisten annosten ja juomien lämmitys, sulatus. Hieman pidemmät lämmitysajat.", "/mikroaaltouuni-700w"],
    ["700–900 W", "Tavallinen kotikäyttö", "Yleisin tehoalue. Riittää useimpiin arjen tarpeisiin ja valmisruokien ohjeisiin.", "/mikroaaltouuni-800w"],
    ["900–1000 W+", "Nopeampi ja tehokkaampi käyttö", "Isot annokset, perheen ruoat ja mikrossa kokkaaminen. Usein isommissa malleissa.", "/mikroaaltouuni-900w"],
  ];
  return html`<div class="grid gap-4 md:grid-cols-3">
  ${rows.map(
    ([w, t, d, href], i) => html`<a href="${href}" class="card card-hover block p-6">
      <div class="flex items-center gap-2" aria-hidden="true">${[0, 1, 2].map((n) => `<span class="h-2 flex-1 rounded-full ${n <= i ? "bg-accent-400" : "bg-line"}"></span>`)}</div>
      <p class="mt-5 text-2xl font-bold tabular-nums text-navy-950">${w}</p>
      <p class="mt-1 font-semibold text-navy-800">${t}</p>
      <p class="mt-3 text-sm leading-relaxed text-ink-soft">${d}</p>
    </a>`,
  )}
</div>`;
}

/* --- Kokotaulukko */
export function sizeTable() {
  const rows = [
    ["noin 17–20 l", "Pieni ja kompakti", "1–2 hengen talous, pieni keittiö, toimisto", "/pieni-mikroaaltouuni"],
    ["noin 20–25 l", "Tavallinen kotikäyttö", "Useimmat kotitaloudet, tavalliset lautaset ja rasiat", "/mikroaaltouuni-20l"],
    ["noin 25–30 l", "Enemmän tilaa", "Perheet, isommat vuoat ja kulhot", "/mikroaaltouuni-25l"],
    ["yli 30 l", "Suuri / monitoimisempi laite", "Grilli- ja kiertoilmamallit, mikro uunin korvikkeena", "/kiertoilmamikro"],
  ];
  return html`<div class="table-wrap">
  <table class="table">
    <caption class="sr-only">Mikroaaltouunin koko litroina ja käyttötarkoitus</caption>
    <thead><tr><th scope="col">Sisätilavuus</th><th scope="col">Kokoluokka</th><th scope="col" class="hidden sm:table-cell">Sopii esimerkiksi</th></tr></thead>
    <tbody>${rows.map(
      ([l, c, s, href]) => `<tr><th scope="row" class="whitespace-nowrap">${l}</th><td><a href="${href}" class="font-medium text-navy-800 hover:underline">${c}</a><span class="mt-1 block text-xs text-ink-muted sm:hidden">${s}</span></td><td class="hidden text-ink-soft sm:table-cell">${s}</td></tr>`,
    )}</tbody>
  </table>
</div>`;
}

/* --- Tavallinen vs grilli */
export function grillVsNormalTable() {
  const yes = `<span class="inline-flex items-center gap-1.5 font-medium text-navy-900">${icon.check("h-5 w-5 text-emerald-600")}<span class="sr-only">Kyllä</span></span>`;
  const no = `<span class="inline-flex items-center text-ink-muted">${icon.dash("h-5 w-5")}<span class="sr-only">Ei</span></span>`;
  const rows: [string, string, string][] = [
    ["Lämmitys", yes, yes],
    ["Sulatus", yes, yes],
    ["Grillaus", no, yes],
    ["Ruskistus", no, yes],
    ["Hinta", "yleensä edullisempi", "yleensä korkeampi"],
  ];
  return html`<div class="table-wrap">
  <table class="table">
    <caption class="sr-only">Tavallisen mikroaaltouunin ja grillimikron vertailu</caption>
    <thead><tr><th scope="col">Ominaisuus</th><th scope="col">Tavallinen</th><th scope="col">Grillimikro</th></tr></thead>
    <tbody>${rows.map(([a, b, c]) => `<tr><th scope="row">${a}</th><td>${b}</td><td>${c}</td></tr>`)}</tbody>
  </table>
</div>`;
}

/* --- Ominaisuuskortit */
export const featureData = [
  { t: "Teho", ic: icon.bolt(), d: "Wattimäärä vaikuttaa lämmitysnopeuteen. 800–900 W riittää useimpiin koteihin; pakkausten ohjeet annetaan usein 750–800 W:lle." },
  { t: "Tilavuus", ic: icon.box(), d: "Litrat kertovat uunin sisätilan koosta. Katso myös lautasen halkaisija – se ratkaisee, mahtuuko oma lautanen pyörimään." },
  { t: "Automaattiohjelmat", ic: icon.auto(), d: "Helpottavat esimerkiksi sulatusta ja lämmitystä: valitset ruoan ja painon, uuni laskee ajan ja tehon." },
  { t: "Grillitoiminto", ic: icon.flame(), d: "Mahdollistaa pinnan ruskistamisen. Hyödyllinen gratiineissa, lämpimissä voileivissä ja pizzan lämmityksessä." },
  { t: "Kiertoilma", ic: icon.wind(), d: "Lisää käyttömahdollisuuksia: mikrolla voi paistaa ja leipoa kuin pienellä uunilla. Nostaa hintaa ja kokoa." },
  { t: "Invertteritekniikka", ic: icon.wave(), d: "Tuottaa pienen tehon tasaisesti eikä katkonaisesti. Sulatus onnistuu tasaisemmin, eivätkä reunat kypsy ennen keskustaa." },
  { t: "Pyörivä lautanen", ic: icon.plate(), d: "Pyörittää ruokaa, jotta mikroaallot jakautuvat tasaisemmin. Tasapohjaisissa malleissa ei ole lautasta, joten isokin vuoka mahtuu ja puhdistus on helpompaa." },
  { t: "Helppo puhdistettavuus", ic: icon.sparkle(), d: "Keraaminen tai emaloitu sisäpinta, irrotettava lautanen ja höyrypuhdistusohjelma säästävät vaivaa arjessa." },
];

export function featureCards(cols: 2 | 4 = 4) {
  return html`<div class="grid gap-4 sm:grid-cols-2 ${cols === 4 ? "lg:grid-cols-4" : ""}">
  ${featureData.map(
    (f) => html`<article class="card p-6">
      <div class="grid h-11 w-11 place-items-center rounded-xl bg-accent-50 text-accent-700">${f.ic}</div>
      <h3 class="mt-4 font-semibold text-navy-950">${f.t}</h3>
      <p class="mt-2 text-sm leading-relaxed text-ink-soft">${f.d}</p>
    </article>`,
  )}
</div>`;
}

/* --- Skenaariot */
export function scenarioCards() {
  const data = [
    { t: "Opiskelijalle", ic: icon.student(), d: "Kompakti, edullinen ja helppokäyttöinen. 17–20 litraa ja 700–800 W riittävät hyvin eväiden ja valmisruokien lämmittämiseen.", tip: "Mekaaniset säätimet ovat yksinkertaiset ja kestävät.", href: "/pieni-mikroaaltouuni" },
    { t: "Pieneen keittiöön", ic: icon.kitchen(), d: "Kiinnitä erityisesti huomiota ulkomittoihin. Mittaa tason syvyys ja yläkaappien korkeus ja jätä tilaa tuuletukselle ja luukun avaamiselle.", tip: "Katso myös, kummalle puolelle luukku aukeaa.", href: "/pieni-mikroaaltouuni" },
    { t: "Perheelle", ic: icon.family(), d: "Suurempi tilavuus ja tehokas lämmitys voivat olla hyödyllisiä. 23–25 litraa ja 900 W nopeuttavat isojen annosten lämmittämistä.", tip: "Tarkista, mahtuuko perheen suurin vuoka lautaselle.", href: "/mikroaaltouuni-25l" },
    { t: "Monipuoliseen ruoanlaittoon", ic: icon.chef(), d: "Grilli-, kiertoilma- tai monitoimimalli voi sopia paremmin, jos mikrolla halutaan myös ruskistaa, paistaa tai korvata toinen uuni.", tip: "Monitoimimalli on usein isompi – varaa tilaa.", href: "/kiertoilmamikro" },
  ];
  return html`<div class="grid gap-4 md:grid-cols-2">
  ${data.map(
    (s) => html`<article class="card flex gap-5 p-6">
      <div class="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-navy-900 text-accent-300">${s.ic}</div>
      <div>
        <h3 class="text-lg font-semibold text-navy-950">${s.t}</h3>
        <p class="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">${s.d}</p>
        <p class="mt-3 text-sm text-ink"><span class="font-semibold">Vinkki:</span> ${s.tip}</p>
        <a href="${s.href}" class="link-arrow mt-4 text-sm">Lue lisää <span aria-hidden="true">→</span><span class="sr-only">: ${s.t}</span></a>
      </div>
    </article>`,
  )}
</div>
<p class="mt-5 text-sm text-ink-muted">Mikään mallityyppi ei ole paras kaikille. Oikea valinta riippuu siitä, mihin mikroa käytät ja paljonko sille on tilaa.</p>`;
}

/* --- Jälleenmyyjät */
export function retailerCards(list: Retailer[] = retailers.filter((r) => r.featured)) {
  return html`<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
  ${list.map((r) => {
    const { href, sponsored } = retailerHref(r);
    return html`<article class="card flex flex-col p-6">
      <h3 class="text-lg font-semibold text-navy-950">${r.name}</h3>
      <p class="mt-2 flex-1 text-[0.95rem] leading-relaxed text-ink-soft">${r.description}</p>
      <div class="mt-5">
        <a href="${esc(href)}" rel="${relFor(sponsored)}" target="_blank" class="btn-ghost btn-sm">Katso valikoima ${icon.external("h-3.5 w-3.5")}<span class="sr-only">: ${r.name} (avautuu uuteen välilehteen)</span></a>
      </div>
    </article>`;
  })}
</div>
<p class="mt-5 text-sm text-ink-muted">Valikoima ja saatavuus vaihtelevat kaupoittain ja myymälöittäin – yksittäinen malli ei välttämättä ole aina saatavilla.${site.usesAffiliateLinks ? ` Osa linkeistä voi olla <a href="/kumppanuuslinkit" class="underline underline-offset-2">kumppanuuslinkkejä</a>.` : ""}</p>`;
}

/* --- Turvallisuus */
export function safetyList() {
  const items = [
    ["Käytä sopivia astioita", "Lasi, keramiikka ja mikroon sopivaksi merkityt muoviastiat. Vältä kertakäyttörasioita, jotka on tarkoitettu vain säilytykseen."],
    ["Vältä metallia", "Folio, aterimet ja metallikoristeiset astiat voivat kipinöidä. Metallia saa käyttää vain, jos valmistaja sen nimenomaisesti sallii."],
    ["Kuumenna nesteitä varoen", "Vesi voi kuumentua yli kiehumispisteen ilman kuplia ja kuohahtaa, kun astiaa liikutetaan. Anna seistä hetki ja nosta varovasti."],
    ["Anna höyryn purkautua", "Kansi raolleen tai kupu päälle. Sekoita ja anna ruoan tasaantua – pinta voi olla haalea, vaikka sisus on tulikuuma."],
    ["Noudata käyttöohjetta", "Tuuletusvälit, sallitut astiat ja toimintojen käyttö vaihtelevat malleittain. Käyttöohje on tärkein lähde."],
    ["Älä käytä vaurioitunutta laitetta", "Jos luukku ei sulkeudu, tiiviste tai sarana on rikki tai johto vioittunut, lopeta käyttö ja korjauta laite ammattilaisella."],
    ["Huomioi lapset", "Opasta lapset käyttämään mikroa ja käsittelemään kuumia astioita. Lapsilukko estää laitteen käynnistämisen vahingossa."],
  ];
  return html`<ul class="grid gap-3 sm:grid-cols-2">
  ${items.map(
    ([t, d]) => html`<li class="flex gap-4 rounded-2xl border border-line bg-white p-5">
      <span class="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-navy-50 text-navy-800">${icon.shield("h-5 w-5")}</span>
      <div><p class="font-semibold text-navy-950">${t}</p><p class="mt-1 text-sm leading-relaxed text-ink-soft">${d}</p></div>
    </li>`,
  )}
</ul>
<p class="mt-5 text-sm text-ink-muted">Nämä ovat yleisiä periaatteita. Tarkemmat ohjeet löytyvät aina oman laitteesi käyttöohjeesta.</p>`;
}

/* --- FAQ */
export function faqList(items: FaqItem[]) {
  return html`<div class="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white shadow-card">
  ${items.map(
    (f) => html`<details class="faq-item group" id="ukk-${f.id}">
      <summary><span>${f.q}</span><span class="faq-icon mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-navy-50 text-navy-800">${icon.plus("h-4 w-4")}</span></summary>
      <div class="faq-body">${f.a}</div>
    </details>`,
  )}
</div>`;
}

/* --- CTA-palkki */
export function ctaBand(o: { title?: string; text?: string } = {}) {
  return html`<section class="py-8 sm:py-12" aria-label="Seuraavat askeleet">
  <div class="container-page">
    <div class="relative overflow-hidden rounded-3xl bg-navy-900 px-6 py-12 text-white sm:px-12">
      <div class="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent-400/20 blur-3xl" aria-hidden="true"></div>
      <div class="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <div>
          <p class="text-2xl font-bold tracking-tight sm:text-3xl">${o.title ?? "Etsi sopiva mikroaaltouuni"}</p>
          <p class="mt-3 max-w-xl text-navy-100">${o.text ?? "Aloita osto-oppaasta tai hyppää suoraan vertailuun. Suodata malleja hinnan, tehon, koon ja tyypin mukaan."}</p>
        </div>
        <div class="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
          <a href="/mikroaaltouuni-vertailu" class="btn-accent">Vertaile malleja <span aria-hidden="true">→</span></a>
          <a href="/mikroaaltouuni-osto-opas" class="btn border border-white/25 text-white hover:bg-white/10">Lue osto-opas <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </div>
  </div>
</section>`;
}

/* --- Aiheeseen liittyvät */
export function relatedLinks(links: { label: string; href: string; text?: string }[], title = "Lue myös") {
  return html`<aside class="mt-14 max-w-prose" aria-label="${title}">
  <p class="text-sm font-semibold uppercase tracking-wide text-ink-muted">${title}</p>
  <ul class="mt-4 grid gap-3 sm:grid-cols-2">
    ${links.map((l) => `<li><a href="${l.href}" class="card card-hover flex h-full flex-col p-4"><span class="font-semibold text-navy-900">${l.label} <span aria-hidden="true">→</span></span>${l.text ? `<span class="mt-1 text-sm text-ink-soft">${l.text}</span>` : ""}</a></li>`)}
  </ul>
</aside>`;
}

/** Sisältösivun runko: pääsisältö + sivupalkki (desktop) */
export function articleLayout(main: string, aside: string) {
  return html`<div class="container-page grid gap-12 py-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16 lg:py-16">
  <article class="min-w-0">${main}</article>
  <aside class="hidden lg:block"><div class="sticky top-24 space-y-4">${aside}</div></aside>
</div>`;
}

export function tocCard(items: { id: string; label: string }[]) {
  return html`<nav class="card p-5" aria-label="Sisällys">
  <p class="text-xs font-semibold uppercase tracking-wide text-ink-muted">Tällä sivulla</p>
  <ol class="mt-3 space-y-2 text-sm">
    ${items.map((i) => `<li><a href="#${i.id}" class="text-ink-soft hover:text-navy-950 hover:underline">${i.label}</a></li>`)}
  </ol>
</nav>`;
}

export function asideCta() {
  return html`<div class="rounded-2xl bg-navy-900 p-5 text-white">
  <p class="font-semibold">Vertaile malleja</p>
  <p class="mt-1 text-sm text-navy-100">Suodata hinnan, tehon, koon ja tyypin mukaan.</p>
  <a href="/mikroaaltouuni-vertailu" class="btn-accent btn-sm mt-4 w-full">Vertailuun <span aria-hidden="true">→</span></a>
</div>`;
}
