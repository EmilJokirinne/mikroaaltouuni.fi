import { site } from "./site.config.ts";
import { products } from "./products.ts";
import { faq } from "./faq.ts";
import {
  html, esc, icon, pageHero, articleLayout, tocCard, asideCta, powerTable, sizeTable, grillVsNormalTable, featureCards,
  scenarioCards, relatedLinks, ctaBand, articleLd, faqLd, faqList, priceRangeTable, productTable, retailerCards,
  safetyList, section, sectionHead, fmtDate, productLd,
} from "./ui.ts";
import type { PageDef } from "./pages-types.ts";

/* =================================================================== OSTO-OPAS */

export function guidePage(): PageDef {
  const path = "/mikroaaltouuni-osto-opas";
  const title = "Mikroaaltouunin osto-opas – teho, koko ja ominaisuudet";
  const description =
    "Mikroaaltouunin osto-opas: kuinka paljon tehoa tarvitset, minkä kokoinen mikro kannattaa ostaa, tarvitsetko grillin tai kiertoilman ja mitä integroitavassa mallissa pitää huomioida.";

  const toc = [
    { id: "teho", label: "1. Kuinka paljon tehoa tarvitsen?" },
    { id: "koko", label: "2. Minkä kokoinen mikro?" },
    { id: "grilli", label: "3. Tavallinen vai grillimikro?" },
    { id: "kiertoilma", label: "4. Kiertoilmamikro" },
    { id: "integroitava", label: "5. Integroitava mikroaaltouuni" },
    { id: "ominaisuudet", label: "Hyödylliset ominaisuudet" },
    { id: "kayttoon", label: "Eri käyttötarpeisiin" },
    { id: "muistilista", label: "Muistilista ennen ostoa" },
  ];

  const main = html`
<div class="prose-fi">
  <p>Tämä opas käy läpi asiat, jotka oikeasti vaikuttavat mikroaaltouunin valintaan. Useimmille riittää hyvin perusmalli – kalliimmasta laitteesta on hyötyä vain, jos sen lisäominaisuuksia tulee käytettyä.</p>

  <h2 id="teho">1. Kuinka paljon tehoa tarvitsen?</h2>
  <p>Mikroaaltouunin teho ilmoitetaan watteina (W). Luku tarkoittaa uunin <strong>suurinta mikroaaltotehoa</strong>, eli sitä, kuinka paljon energiaa uuni pystyy täydellä teholla ohjaamaan ruokaan. Mitä suurempi teho, sitä nopeammin ruoka lämpenee.</p>
  <ul>
    <li><strong>600–700 W: peruskäyttö.</strong> Riittää yksittäisten annosten, kahvin ja eväiden lämmittämiseen sekä sulatukseen.</li>
    <li><strong>700–900 W: tavallinen kotikäyttö.</strong> Yleisin tehoalue ja useimmille sopivin. Valmisruokien lämmitysohjeet annetaan usein tälle alueelle.</li>
    <li><strong>900–1000 W+: nopeampi ja tehokkaampi käyttö.</strong> Hyödyllinen isoissa annoksissa ja silloin, kun mikrossa valmistetaan ruokaa.</li>
  </ul>
  <p>Ero 700 ja 900 watin välillä ei ole dramaattinen. Kun lämmität yhden annoksen, aikaa kuluu tehokkaammalla laitteella yleensä vain hieman vähemmän. Todelliseen lämmitysaikaan vaikuttavat myös ruoan määrä, lähtölämpötila (jääkaappikylmä vai pakaste), astia sekä valmistajan ohjelmat.</p>
  <p>Kun pakkauksessa lukee esimerkiksi ”750 W: 3 min”, lisää aikaa hieman, jos mikrosi on heikompi, ja vähennä, jos se on tehokkaampi. Tarkista aina, että ruoka on kuumaa läpikotaisin.</p>
  <p>Grillin ja kiertoilman tehot ilmoitetaan erikseen, eikä niitä pidä sekoittaa mikroaaltotehoon. Sähkötekninen kokonaisteho (liitäntäteho) on myös eri asia kuin mikroaaltoteho.</p>
</div>
<div class="mt-6">${powerTable()}</div>

<div class="prose-fi">
  <h2 id="koko">2. Minkä kokoinen mikroaaltouuni kannattaa ostaa?</h2>
  <p>Mikroaaltouunin koko ilmoitetaan sisätilavuutena litroina. Tilavuus kertoo, kuinka suuret astiat uuniin mahtuvat.</p>
  <ul>
    <li><strong>noin 17–20 l: pieni ja kompakti.</strong> Yhdelle tai kahdelle hengelle, pieniin keittiöihin ja taukotiloihin.</li>
    <li><strong>noin 20–25 l: tavallinen kotikäyttö.</strong> Tavalliset ruokalautaset ja rasiat mahtuvat hyvin.</li>
    <li><strong>noin 25–30 l: enemmän tilaa.</strong> Perheille ja isommille kulhoille tai vuoille.</li>
    <li><strong>yli 30 l: suuri / monitoimisempi laite.</strong> Usein grilli- tai kiertoilmamalleja, joita käytetään myös uunin tapaan.</li>
  </ul>
  <p><strong>Ulkomitat ovat usein tärkeämpiä kuin litrat.</strong> Mittaa paikka, johon mikro tulee: leveys, syvyys ja korkeus. Huomioi, että valmistajat edellyttävät laitteen ympärille tuuletustilaa – tarkat välit löytyvät käyttöohjeesta. Katso myös, kummalle puolelle luukku aukeaa ja mahtuuko se avautumaan kokonaan.</p>
  <p>Kiinnitä huomiota myös lautasen halkaisijaan. Kaksi saman litramäärän mikroa voi olla sisältä eri muotoisia, ja iso lautanen ei välttämättä mahdu pyörimään pienessä uunissa.</p>
</div>
<div class="mt-6">${sizeTable()}</div>

<div class="prose-fi">
  <h2 id="grilli">3. Tavallinen vai grillimikro?</h2>
  <p>Tavallinen mikro (solomikro) lämmittää ja sulattaa. Grillimikrossa on lisäksi uunin katossa grillivastus, jolla ruoan pintaan saa väriä ja rapeutta. Monissa grillimikroissa voi käyttää mikroaaltoja ja grilliä samanaikaisesti, mikä nopeuttaa esimerkiksi gratiinin valmistusta.</p>
</div>
<div class="mt-6">${grillVsNormalTable()}</div>
<div class="prose-fi">
  <p>Grilli on hyödyllinen, jos teet usein lämpimiä voileipiä, lämmität pizzaa tai haluat kuorruttaa ruokia. Jos mikroa käytetään lähinnä eväiden ja jämien lämmittämiseen, grilli jää helposti käyttämättä. <a href="/grillimikro">Lue lisää grillimikroista</a>.</p>

  <h2 id="kiertoilma">4. Kiertoilmamikro</h2>
  <p><strong>Mikä se on?</strong> Kiertoilmamikrossa on mikroaaltojen lisäksi lämpövastus ja puhallin, jotka kierrättävät kuumaa ilmaa koko uunitilassa – kuten kiertoilmauunissa. Useimmissa malleissa on myös grilli ja yhdistelmätoimintoja.</p>
  <p><strong>Kenelle se sopii?</strong> Kotiin, jossa ei ole erillistä uunia tai jossa uuni on usein varattu. Myös pienissä asunnoissa ja mökeillä kiertoilmamikro voi korvata uunin pienissä annoksissa.</p>
  <p><strong>Milloin siitä on hyötyä?</strong> Kun haluat paistaa pieniä leivonnaisia, lämmittää pakastepiirakoita rapeiksi tai kypsentää pieniä liha- ja kalaruokia. Yhdistelmätoiminto (mikro + kiertoilma) voi lyhentää kypsennysaikaa tavalliseen uuniin verrattuna.</p>
  <p><strong>Milloin tavallinen mikro riittää?</strong> Jos keittiössä on toimiva uuni ja mikroa käytetään lämmittämiseen ja sulattamiseen. Kiertoilmamallit ovat usein isompia, kalliimpia ja vaativat enemmän puhdistusta. <a href="/kiertoilmamikro">Lue lisää kiertoilmamikroista</a>.</p>

  <h2 id="integroitava">5. Integroitava mikroaaltouuni</h2>
  <p><strong>Mitä integroitava tarkoittaa?</strong> Integroitava eli kalusteisiin sijoitettava mikro asennetaan keittiön kaappiin tai kalusteuunin yläpuolelle. Se on suunniteltu toimimaan suljetussa tilassa, ja sen etupaneeli sulautuu kalusteisiin.</p>
  <p><strong>Miksi mitoitus on tärkeä?</strong> Valmistaja ilmoittaa asennusaukon mitat, joihin kaapin sisämittojen pitää sopia. Yleisiä ovat 60 cm leveisiin kaappeihin tarkoitetut mallit, mutta korkeudet ja syvyydet vaihtelevat. Muutaman millin ero voi estää asennuksen.</p>
  <p><strong>Ilmanvaihto.</strong> Mikro tarvitsee ilmankiertoa. Integroitavissa malleissa ilmanvaihto on suunniteltu kalusteasennusta varten, mutta se toimii vain, kun ohjeen mukaiset raot ja aukot on tehty. <strong>Tavallista pöytämikroa ei pidä sulkea kaappiin</strong>, ellei valmistaja sitä erikseen salli.</p>
  <p><strong>Kalusteisiin sopivuus.</strong> Tarkista luukun avautumissuunta, etupaneelin korkeus suhteessa muihin laitteisiin ja se, tarvitaanko erillinen asennuskehys. Musta, teräs ja valkoinen ovat yleisimmät värit.</p>
  <p><strong>Asennus.</strong> Asennuksessa tarvitaan sopiva kaappi, pistorasia sallitulle paikalle ja usein kiinnitys kalusteeseen. Moni kauppa tarjoaa asennuspalvelua. Jos kaappiin pitää tehdä muutoksia, käytä ammattilaista.</p>
  <p><strong>Hinta.</strong> Integroitavat mallit maksavat tyypillisesti noin 250–600 € tai enemmän. Hintaan voi tulla lisäksi asennus ja mahdollinen kehys.</p>
  <p class="note">Integroitavan laitteen kohdalla tarkista aina <strong>valmistajan asennusohjeet ja vaaditut mitat</strong> ennen ostoa. Ohje löytyy yleensä tuotesivulta tai valmistajan verkkosivuilta PDF-tiedostona.</p>
  <p><a href="/integroitava-mikroaaltouuni">Lue lisää integroitavista mikroaaltouuneista</a>.</p>

  <h2 id="ominaisuudet">Mitä ominaisuuksia kannattaa etsiä?</h2>
  <p>Kaikki lisäominaisuudet eivät ole tarpeen. Nämä ovat ne, joilla on arjessa eniten merkitystä.</p>
</div>
<div class="mt-6">${featureCards(2)}</div>

<div class="prose-fi">
  <h2 id="kayttoon">Miten valita mikro eri käyttöön?</h2>
  <p>Sama mikro ei sovi kaikille. Näistä esimerkeistä voit hakea suuntaa omaan tilanteeseesi.</p>
</div>
<div class="mt-6">${scenarioCards()}</div>

<div class="prose-fi">
  <h2 id="muistilista">Muistilista ennen ostoa</h2>
  <ol>
    <li>Mittaa paikka ja lisää käyttöohjeen tuuletusvälit.</li>
    <li>Päätä, tarvitsetko pelkän mikron, grillin vai kiertoilman.</li>
    <li>Valitse tilavuus käyttäjämäärän ja astioiden mukaan – tarkista lautasen halkaisija.</li>
    <li>Katso teho: 800–900 W on turvallinen valinta, 700 W riittää kevyeen käyttöön.</li>
    <li>Kokeile säätimiä, jos voit: selkeä käyttöliittymä on arjessa tärkeä.</li>
    <li>Vertaa hintaa, toimituskuluja ja palautusehtoja useammasta kaupasta.</li>
    <li>Integroitavassa mallissa: tarkista asennusaukon mitat ja asennusohje.</li>
  </ol>
  <p>Muista myös <a href="/usein-kysytyt-kysymykset#ukk-kierratys">vanhan mikron kierrätys</a> – kauppa ottaa vanhan laitteen vastaan, kun ostat tilalle uuden.</p>
</div>

${relatedLinks([
  { label: "Vertaile mikroaaltouuneja", href: "/mikroaaltouuni-vertailu", text: "Suodata hinnan, tehon ja koon mukaan." },
  { label: "Mikroaaltouunien hinnat", href: "/mikroaaltouuni-hinta", text: "Mitä eri hintaluokista saa?" },
  { label: "Grillimikro", href: "/grillimikro", text: "Milloin grilli kannattaa?" },
  { label: "Usein kysytyt kysymykset", href: "/usein-kysytyt-kysymykset", text: "Astiat, metalli, puhdistus ja kierrätys." },
])}`;

  return {
    path,
    title: `${title} | mikroaaltouuni.fi`,
    description,
    ogType: "article",
    crumbs: [{ name: "Osto-opas", path }],
    jsonLd: [articleLd(path, "Mikroaaltouunin osto-opas", description)],
    body: html`
${pageHero({
  eyebrow: "Osto-opas",
  title: "Mikroaaltouunin osto-opas",
  intro: "Teho, koko, grilli, kiertoilma ja integroitavat mallit selkeästi. Lue, mitä kannattaa katsoa ennen ostamista – ja mistä ei tarvitse maksaa ylimääräistä.",
  ctas: `<a href="/mikroaaltouuni-vertailu" class="btn-primary">Vertaile malleja</a><a href="#muistilista" class="btn-ghost">Muistilista</a>`,
})}
${articleLayout(main, tocCard(toc) + asideCta())}
${ctaBand({ title: "Tiedätkö jo, mitä etsit?", text: "Siirry vertailuun ja rajaa mallit tyypin, tehon, tilavuuden ja hinnan mukaan." })}`,
  };
}

/* =================================================================== VERTAILU */

export function comparePage(): PageDef {
  const path = "/mikroaaltouuni-vertailu";
  const description =
    "Mikroaaltouunien vertailu: suodata esimerkkimalleja hinnan, tyypin, tehon, tilavuuden ja myyjän mukaan. Hinnoissa tarkistuspäivä – tarkista ajantasainen hinta jälleenmyyjältä.";

  const group = (name: string, key: string, opts: [string, string][]) => html`
<fieldset class="min-w-0">
  <legend class="text-sm font-semibold text-navy-950">${name}</legend>
  <div class="mt-3 flex flex-wrap gap-2">
    ${opts.map(([v, l]) => `<label class="filter-chip"><input type="checkbox" name="${key}" value="${esc(v)}"><span>${l}</span></label>`)}
  </div>
</fieldset>`;

  const filters = html`
<form class="card p-5 sm:p-6" data-filters aria-label="Suodata mikroaaltouuneja" hidden>
  <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
    ${group("Hinta", "price", [["alle-75", "alle 75 €"], ["75-150", "75–150 €"], ["150-250", "150–250 €"], ["yli-250", "yli 250 €"]])}
    ${group("Tyyppi", "type", [["tavallinen", "Tavallinen"], ["grilli", "Grilli"], ["kiertoilma", "Kiertoilma"], ["integroitu", "Integroitu"]])}
    ${group("Teho", "power", [["alle-700", "alle 700 W"], ["700-800", "700–799 W"], ["800-900", "800–899 W"], ["900-plus", "900 W+"]])}
    ${group("Tilavuus", "capacity", [["alle-20", "alle 20 l"], ["20-25", "20–25 l"], ["25-30", "26–30 l"], ["yli-30", "yli 30 l"]])}
    ${group("Myyjä", "retailer", [["Gigantti", "Gigantti"], ["Verkkokauppa.com", "Verkkokauppa.com"], ["POWER", "POWER"], ["Prisma", "Prisma"], ["Tokmanni", "Tokmanni"], ["IKEA", "IKEA"], ["muut", "muut"]])}
  </div>
  <div class="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
    <p class="text-sm font-medium text-ink" role="status" aria-live="polite" data-count>Näytetään ${products.length} mallia</p>
    <button type="reset" class="btn-ghost btn-sm">Tyhjennä valinnat</button>
  </div>
</form>`;

  const empty = html`<div class="card mt-6 p-8 text-center" data-empty hidden>
  <p class="font-semibold text-navy-950">Valinnoilla ei löytynyt esimerkkimalleja.</p>
  <p class="mt-2 text-sm text-ink-soft">Kokeile väljempiä suodattimia tai katso jälleenmyyjien koko valikoima alta.</p>
</div>`;

  const lastChecked = products.reduce((a, p) => (p.lastUpdated > a ? p.lastUpdated : a), "0000");

  return {
    path,
    title: "Mikroaaltouuni vertailu – suodata hinnan, tehon ja koon mukaan | mikroaaltouuni.fi",
    description,
    crumbs: [{ name: "Vertailu", path }],
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Mikroaaltouunien vertailu",
        description,
        url: `${site.url}${path}`,
        inLanguage: "fi-FI",
        dateModified: lastChecked,
      },
      ...(site.enableProductSchema ? productLd(products) : []),
    ],
    body: html`
${pageHero({
  eyebrow: "Vertailu",
  title: "Mikroaaltouunien vertailu",
  intro: "Esimerkkejä Suomessa myytävistä mikroaaltouuneista eri hintaluokista. Rajaa malleja suodattimilla ja siirry jälleenmyyjän sivulle tarkistamaan ajantasainen hinta ja saatavuus.",
  updated: false,
})}
<div class="container-page py-10 sm:py-14">
  <p class="meta mb-4">Hinnat tarkistettu viimeksi: <time datetime="${lastChecked}">${fmtDate(lastChecked)}</time> · ${products.length} esimerkkimallia</p>
  ${filters}
  <div class="mt-8" data-results>${productTable(products, { caption: "Mikroaaltouunien vertailutaulukko" })}</div>
  ${empty}

  <div class="mt-16 grid gap-8 lg:grid-cols-2">
    <div class="card p-6 sm:p-8">
      <h2 class="text-xl font-bold text-navy-950">Näin luet vertailua</h2>
      <ul class="mt-4 space-y-3 text-[0.95rem] leading-relaxed text-ink-soft">
        <li><strong class="font-semibold text-ink">Hinta</strong> on jälleenmyyjän hinta tarkistuspäivänä. Se voi muuttua milloin tahansa.</li>
        <li><strong class="font-semibold text-ink">Teho</strong> on valmistajan ilmoittama suurin mikroaaltoteho. Grillin teho on mainittu lisätiedoissa.</li>
        <li><strong class="font-semibold text-ink">Tilavuus</strong> on uunin sisätilavuus. Tarkista ulkomitat aina ennen ostoa.</li>
        <li><strong class="font-semibold text-ink">Järjestys</strong> ei ole paremmuusjärjestys. Mallit ovat esimerkkejä eri hintaluokista.</li>
      </ul>
    </div>
    <div class="card p-6 sm:p-8">
      <h2 class="text-xl font-bold text-navy-950">Etkö löytänyt sopivaa?</h2>
      <p class="mt-4 text-[0.95rem] leading-relaxed text-ink-soft">Vertailussa on vain osa markkinoiden malleista. Jos tiedät jo, mitä etsit, jälleenmyyjien verkkokaupoissa voit suodattaa koko valikoimaa. Osto-oppaasta näet, mihin kannattaa kiinnittää huomiota.</p>
      <div class="mt-6 flex flex-wrap gap-3">
        <a href="/mikroaaltouuni-osto-opas" class="btn-primary btn-sm">Lue osto-opas <span aria-hidden="true">→</span></a>
        <a href="#mista-ostaa" class="btn-ghost btn-sm">Jälleenmyyjät</a>
      </div>
    </div>
  </div>
</div>
${section("mista-ostaa", html`
  ${sectionHead({ id: "mista-ostaa", eyebrow: "Ostopaikat", title: "Mistä ostaa mikroaaltouuni Suomessa?", intro: "Katso jälleenmyyjien koko valikoima ja ajantasaiset hinnat." })}
  <div class="mt-10">${retailerCards()}</div>
`, { tint: true })}
${ctaBand({ title: "Epävarma valinnasta?", text: "Osto-opas käy läpi tehon, koon ja ominaisuudet – ja kertoo, milloin perusmalli riittää." })}`,
  };
}

/* =================================================================== HINTA */

export function pricePage(): PageDef {
  const path = "/mikroaaltouuni-hinta";
  const description =
    "Paljonko mikroaaltouuni maksaa Suomessa? Suuntaa-antavat hintatasot perusmikroista integroitaviin malleihin, esimerkkihinnat ja vinkit edullisemman mikron löytämiseen.";

  const main = html`
<div class="prose-fi">
  <p>Mikroaaltouunien hinnat vaihtelevat Suomessa muutamista kymmenistä euroista useisiin satoihin euroihin. Hintaan vaikuttavat eniten <strong>laitetyyppi</strong> (tavallinen, grilli, kiertoilma vai integroitava), <strong>koko</strong>, <strong>teho</strong>, lisäominaisuudet ja merkki.</p>
  <h2 id="hintatasot">Mikroaaltouunien tyypilliset hintatasot</h2>
</div>
<div class="mt-6">${priceRangeTable()}</div>

<div class="prose-fi">
  <h2 id="mita-saa">Mitä eri hintaluokista saa?</h2>
  <h3>Alle 100 €: perusmikro</h3>
  <p>Tässä hintaluokassa on paljon 17–20 litran pöytämikroja, joiden teho on 700–800 W. Säätimet ovat usein mekaaniset (väännin) tai yksinkertaiset painikkeet. Lämmitykseen ja sulatukseen perusmikro riittää hyvin – <a href="/pieni-mikroaaltouuni">halpa ja pieni mikroaaltouuni</a> on monelle järkevä valinta.</p>
  <h3>100–200 €: keskihintainen mikro</h3>
  <p>Hinnan noustessa saat yleensä digitaalisen näytön, automaattiohjelmat, isomman sisätilan (20–25 l), keraamisen tai muun helposti puhdistettavan sisäpinnan ja joissakin malleissa invertteritekniikan. Myös monet <a href="/grillimikro">grillimikrot</a> kuuluvat tähän luokkaan.</p>
  <h3>150–400 €: kiertoilma- ja monitoimimallit</h3>
  <p><a href="/kiertoilmamikro">Kiertoilmamikrot</a> ovat käytännössä pieniä uuneja, joissa on myös mikroaaltotoiminto. Ne ovat usein 25–30 litran tai sitä suurempia laitteita.</p>
  <h3>250–600 € ja yli: integroitava mikro</h3>
  <p><a href="/integroitava-mikroaaltouuni">Integroitavat mallit</a> maksavat enemmän, koska ne on suunniteltu kalusteasennukseen. Huomioi budjetissa myös mahdollinen asennus ja asennuskehys.</p>

  <h2 id="esimerkkihinnat">Esimerkkihintoja</h2>
  <p>Alla on esimerkkejä jälleenmyyjien hinnoista tarkistuspäivänä. Hinnat muuttuvat usein, joten tarkista ajantasainen hinta aina kaupasta.</p>
</div>
<div class="mt-6">${productTable(products, { caption: "Esimerkkihintoja mikroaaltouuneille", cards: true })}</div>

<div class="prose-fi">
  <h2 id="edullisemmin">Näin löydät mikroaaltouunin edullisemmin</h2>
  <ul>
    <li><strong>Älä maksa ominaisuuksista, joita et käytä.</strong> Grilli, kiertoilma ja lukuisat automaattiohjelmat nostavat hintaa.</li>
    <li><strong>Vertaa kokonaishintaa.</strong> Toimituskulut, kotiinkuljetus ja vanhan laitteen poisvienti voivat muuttaa järjestystä.</li>
    <li><strong>Seuraa tarjouksia.</strong> Mikroaaltouunit ovat usein mukana kodinkonekampanjoissa. Hintaseurantapalveluista näet, onko tarjous oikeasti edullinen.</li>
    <li><strong>Harkitse näyttely- tai outlet-laitetta.</strong> Tarkista tällöin takuu ja palautusoikeus.</li>
  </ul>
  <p class="note">Hinnat ovat suuntaa-antavia ja voivat muuttua tarjousten, mallien ja jälleenmyyjien mukaan. Tarkista aina ajantasainen hinta jälleenmyyjän verkkokaupasta.</p>
</div>
${relatedLinks([
  { label: "Vertaile malleja", href: "/mikroaaltouuni-vertailu", text: "Suodata hinnan mukaan." },
  { label: "Osto-opas", href: "/mikroaaltouuni-osto-opas", text: "Mitä ominaisuuksia oikeasti tarvitset?" },
])}`;

  return {
    path,
    title: "Mikroaaltouuni hinta – paljonko mikro maksaa Suomessa? | mikroaaltouuni.fi",
    description,
    ogType: "article",
    crumbs: [{ name: "Hinnat", path }],
    jsonLd: [articleLd(path, "Paljonko mikroaaltouuni maksaa?", description)],
    body: html`
${pageHero({
  eyebrow: "Hintaopas",
  title: "Paljonko mikroaaltouuni maksaa?",
  intro: "Perusmikron saa usein 50–100 eurolla, integroitavasta mallista maksat useita satoja. Tästä näet, mitä eri hintaluokista saa ja mistä hinta syntyy.",
  ctas: `<a href="/mikroaaltouuni-vertailu" class="btn-primary">Vertaile hintoja</a>`,
})}
${articleLayout(main, tocCard([
  { id: "hintatasot", label: "Hintatasot" },
  { id: "mita-saa", label: "Mitä hinnalla saa?" },
  { id: "esimerkkihinnat", label: "Esimerkkihintoja" },
  { id: "edullisemmin", label: "Näin säästät" },
]) + asideCta())}
${ctaBand()}`,
  };
}

/* =================================================================== FAQ */

export function faqPage(): PageDef {
  const path = "/usein-kysytyt-kysymykset";
  const description =
    "Usein kysytyt kysymykset mikroaaltouuneista: teho, koko, grilli, invertteri, sopivat astiat, metalli, puhdistus, käyttöikä ja vanhan mikron kierrätys Suomessa.";
  return {
    path,
    title: "Mikroaaltouuni – usein kysytyt kysymykset | mikroaaltouuni.fi",
    description,
    crumbs: [{ name: "Usein kysytyt kysymykset", path }],
    jsonLd: [faqLd(faq)],
    body: html`
${pageHero({
  eyebrow: "FAQ",
  title: "Usein kysytyt kysymykset",
  intro: "Selkeät vastaukset mikroaaltouunin valintaan, käyttöön ja kierrätykseen. Turvallisuuteen liittyvissä asioissa tarkista aina myös oman laitteesi käyttöohje.",
})}
<div class="container-page grid gap-12 py-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:py-16">
  <div class="min-w-0">${faqList(faq)}</div>
  <aside class="hidden lg:block"><div class="sticky top-24 space-y-4">
    <div class="card p-5"><p class="font-semibold text-navy-950">Turvallinen käyttö</p><p class="mt-1 text-sm text-ink-soft">Astiat, nesteet ja lapset – lyhyt tarkistuslista.</p><a href="#turvallisuus" class="link-arrow mt-3 text-sm">Lue ohjeet <span aria-hidden="true">→</span></a></div>
    ${asideCta()}
  </div></aside>
</div>
${section("turvallisuus", html`
  ${sectionHead({ id: "turvallisuus", eyebrow: "Turvallisuus", title: "Mikroaaltouunin turvallinen käyttö" })}
  <div class="mt-10">${safetyList()}</div>
`, { tint: true })}
${ctaBand()}`,
  };
}
