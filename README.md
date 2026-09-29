# mikroaaltouuni.fi

Suomenkielinen tietosivusto ja vertailupalvelu mikroaaltouuneista. Sivusto generoidaan staattiseksi HTML:ksi (TypeScript + Tailwind CSS), joten se latautuu nopeasti, toimii ilman JavaScriptiä ja on helppo julkaista mille tahansa staattiselle hostingille.

## Käyttöönotto

Vaatii Node.js 20+.

```bash
npm install
npm run build     # generoi dist/-kansion
npm run preview   # esikatselu osoitteessa http://localhost:3000
```

`dist/` sisältää valmiin sivuston: yksi HTML-tiedosto per sivu (esim. `grillimikro.html` → `https://mikroaaltouuni.fi/grillimikro`), `sitemap.xml`, `robots.txt`, CSS, fontti ja kuvat.

### Julkaisu

- **Netlify / Cloudflare Pages:** build-komento `npm run build`, julkaisukansio `dist`. Siistit osoitteet toimivat automaattisesti (`netlify.toml` mukana).
- **Vercel:** `vercel.json` mukana (`cleanUrls: true`).
- **Apache / perinteinen webhotelli:** aja build ja lataa `dist/`-kansion sisältö palvelimelle. Mukana oleva `.htaccess` hoitaa siistit osoitteet ja 404-sivun.

## Tiedostot

Kaikki tiedostot ovat projektin juuressa.

| Tiedosto | Sisältö |
| --- | --- |
| `site.config.ts` | Sivuston asetukset, ylläpitäjän tiedot, hintatasotaulukko, **jälleenmyyjät ja kumppanuuslinkit** |
| `products.ts` | **Esimerkkituotteet, hinnat ja tarkistuspäivät** |
| `faq.ts` | Usein kysytyt kysymykset (myös FAQPage-schema) |
| `ui.ts` | Sivupohja, header, footer ja uudelleenkäytettävät komponentit (taulukot, kortit, FAQ, CTA, JSON-LD) |
| `pages-home.ts` | Etusivu |
| `pages-guides.ts` | Osto-opas, vertailu, hinnat, FAQ |
| `pages-topics.ts` | Grilli-, kiertoilma-, integroitava-, pieni-, teho- (700/800/900 W) ja kokosivut (20/25 l) |
| `pages-info.ts` | Tietoa sivustosta, yhteystiedot, tietosuoja, evästeet, kumppanuuslinkit, 404 |
| `build.ts` | Generoi sivut, sivukartan ja robots.txt:n sekä tarkistaa hintatiedot |
| `app.js` | Kevyt JS: sticky-headerin varjo, valikot ja vertailusivun suodatus |
| `styles.css`, `tailwind.config.js` | Tyylit ja väripaletti |

## Hintojen ja tuotteiden päivitys

Muokkaa `products.ts`:ää:

```ts
{
  name: "Bosch FFL023MW0",
  brand: "Bosch",
  model: "FFL023MW0",
  price: 139,              // null = "Hinta ei saatavilla – tarkista jälleenmyyjältä."
  currency: "EUR",
  power: 800,              // W, null jos ei varmistettu
  capacity: 20,            // l, null jos ei varmistettu
  type: "tavallinen",      // tavallinen | grilli | kiertoilma | integroitu
  retailer: "gigantti",    // tunniste site.config.ts:stä
  url: "https://…",        // tuotesivu; tyhjä = jälleenmyyjän yleislinkki
  affiliateUrl: "",        // kumppanuuslinkki tälle tuotteelle
  lastUpdated: "2026-09-29",
  highlights: ["…"],
}
```

- Päivitä `lastUpdated` aina, kun tarkistat hinnan. Päivämäärä näkyy jokaisen hinnan vieressä.
- Build varoittaa, jos hinta on tarkistettu yli 60 päivää sitten, ja pysähtyy, jos hinnalta puuttuu päivämäärä.
- Uusi tuote näkyy automaattisesti vertailussa ja niillä teho-, koko- ja tyyppisivuilla, joiden kriteerit se täyttää.

## Kumppanuuslinkit

`site.config.ts` → `retailers`: lisää jälleenmyyjän `affiliateUrl`, kun saat oikean linkin kumppaniohjelmasta. Kumppanuuslinkit merkitään automaattisesti `rel="sponsored"`, ja sivuston maininnat kumppanuuslinkeistä ohjataan asetuksella `usesAffiliateLinks`.

## Ennen julkaisua

1. Täytä `site.config.ts` → `owner` (nimi, Y-tunnus, sähköposti). Näkyy yhteystiedoissa ja tietosuojaselosteessa.
2. Tarkista esimerkkituotteiden hinnat ja päivitä `lastUpdated`.
3. Käy tietosuojaseloste ja evästekäytännöt läpi. Jos lisäät analytiikan, päivitä molemmat sivut ja lisää suostumuksenhallinta.
4. Product-schema on oletuksena pois (`enableProductSchema: false`), koska hinnat eivät päivity reaaliajassa. Ota käyttöön vain, jos tuotetiedot pidetään ajan tasalla.

## Tekniset valinnat

- Staattinen HTML: ei turhaa JavaScriptiä, erinomainen Core Web Vitals. Sivut toimivat ilman JS:ää (valikot ja FAQ `<details>`-elementeillä, suodatus lisätään progressiivisesti).
- Tailwind CSS, Inter-fontti omalta palvelimelta (latin-osajoukko, n. 32 kt, SIL Open Font License).
- Semanttinen HTML, murupolut, skip link, näkyvät focus-tilat, taulukoiden otsikkosolut.
- JSON-LD: WebSite, Organization, Article, FAQPage, BreadcrumbList, CollectionPage (+ valinnainen Product).
- Mobiilissa vertailutaulukko muuttuu korttinäkymäksi.
