import { products, type Product } from "./products.ts";
import { faq } from "./faq.ts";
import {
  html, pageHero, articleLayout, tocCard, asideCta, relatedLinks, ctaBand, articleLd, faqLd, faqList,
  productTable, grillVsNormalTable, sizeTable, powerTable,
} from "./ui.ts";
import type { PageDef } from "./pages-types.ts";

interface TopicInput {
  path: string;
  crumb: string;
  metaTitle: string;
  description: string;
  eyebrow: string;
  h1: string;
  intro: string;
  toc: { id: string; label: string }[];
  content: string;
  productFilter?: (p: Product) => boolean;
  productsTitle?: string;
  productsIntro?: string;
  faqIds?: string[];
  related: { label: string; href: string; text?: string }[];
}

function topic(t: TopicInput): PageDef {
  const list = t.productFilter ? products.filter(t.productFilter) : [];
  const faqs = (t.faqIds ?? []).map((id) => faq.find((f) => f.id === id)!).filter(Boolean);
  const toc = [
    ...t.toc,
    ...(list.length || t.productFilter ? [{ id: "esimerkit", label: t.productsTitle ?? "Esimerkkimalleja" }] : []),
    ...(faqs.length ? [{ id: "kysymykset", label: "Kysymyksiä ja vastauksia" }] : []),
  ];

  const productsBlock = t.productFilter
    ? html`<section class="mt-14" aria-labelledby="esimerkit">
  <h2 id="esimerkit" class="text-2xl font-bold tracking-tight text-navy-950 sm:text-[1.75rem]">${t.productsTitle ?? "Esimerkkimalleja"}</h2>
  <p class="mt-3 max-w-prose text-[1.0625rem] leading-relaxed text-ink-soft">${t.productsIntro ?? "Esimerkkejä vertailumme malleista. Tarkista ajantasainen hinta ja saatavuus jälleenmyyjältä."}</p>
  <div class="mt-6">${
    list.length
      ? productTable(list, { cards: true })
      : `<div class="card p-6 text-ink-soft">Vertailussa ei ole vielä tämän tyypin esimerkkimalleja. Katso jälleenmyyjien valikoimat <a href="/mikroaaltouuni-vertailu#mista-ostaa" class="font-medium text-navy-700 underline underline-offset-4">vertailusivulta</a>.</div>`
  }</div>
  <a href="/mikroaaltouuni-vertailu" class="link-arrow mt-6">Vertaile kaikkia malleja <span aria-hidden="true">→</span></a>
</section>`
    : "";

  const faqBlock = faqs.length
    ? html`<section class="mt-14 max-w-prose" aria-labelledby="kysymykset">
  <h2 id="kysymykset" class="text-2xl font-bold tracking-tight text-navy-950 sm:text-[1.75rem]">Kysymyksiä ja vastauksia</h2>
  <div class="mt-6">${faqList(faqs)}</div>
</section>`
    : "";

  const main = html`${t.content}${productsBlock}${faqBlock}${relatedLinks(t.related)}`;

  return {
    path: t.path,
    title: `${t.metaTitle} | mikroaaltouuni.fi`,
    description: t.description,
    ogType: "article",
    crumbs: [{ name: t.crumb, path: t.path }],
    jsonLd: [articleLd(t.path, t.h1, t.description), ...(faqs.length ? [faqLd(faqs)] : [])],
    body: html`
${pageHero({ eyebrow: t.eyebrow, title: t.h1, intro: t.intro })}
${articleLayout(main, tocCard(toc) + asideCta())}
${ctaBand()}`,
  };
}

/* =================================================================== GRILLIMIKRO */

export const grillPage = () =>
  topic({
    path: "/grillimikro",
    crumb: "Grillimikro",
    metaTitle: "Grillimikro – milloin grillillinen mikroaaltouuni kannattaa?",
    description:
      "Grillimikro lämmittää kuten tavallinen mikro, mutta sen grillivastus ruskistaa ruoan pinnan. Lue, milloin grillimikro kannattaa, mitä se maksaa ja mitä ostaessa kannattaa katsoa.",
    eyebrow: "Mikrotyypit",
    h1: "Grillimikro",
    intro: "Grillimikro on tavallinen mikroaaltouuni, jonka katossa on grillivastus. Sillä saat gratiiniin värin ja lämpimään voileipään rapeutta – ilman erillistä uunia.",
    toc: [
      { id: "mika", label: "Mikä grillimikro on?" },
      { id: "vertailu", label: "Grillimikro vs tavallinen" },
      { id: "kenelle", label: "Kenelle se sopii?" },
      { id: "huomioi", label: "Mitä katsoa ostaessa?" },
    ],
    content: html`<div class="prose-fi">
  <h2 id="mika">Mikä grillimikro on?</h2>
  <p>Grillimikrossa on kaksi lämmitystapaa. Mikroaallot lämmittävät ruoan sisältä nopeasti, ja uunin katossa oleva grillivastus kuumentaa pintaa ylhäältä. Useimmissa malleissa toimintoja voi käyttää erikseen tai yhdessä.</p>
  <p>Yhdistelmätoiminto on grillimikron käytännöllisin puoli: esimerkiksi perunagratiini kuumenee mikroaalloilla läpi ja saa samalla väriä pintaan.</p>

  <h2 id="vertailu">Grillimikro vs tavallinen mikro</h2>
</div>
<div class="mt-6">${grillVsNormalTable()}</div>
<div class="prose-fi">
  <p>Grillivastus ei tee mikrosta täysiveristä uunia. Se ruskistaa pinnan, mutta ei kierrätä kuumaa ilmaa – leivonnaisten paistamiseen tarvitaan <a href="/kiertoilmamikro">kiertoilmamikro</a> tai tavallinen uuni.</p>

  <h2 id="kenelle">Kenelle grillimikro sopii?</h2>
  <ul>
    <li>Teet usein lämpimiä voileipiä, gratiineja tai kuorrutettuja ruokia.</li>
    <li>Haluat lämmittää pizzaa tai piirakkaa niin, ettei pinta jää veltoksi.</li>
    <li>Et halua lämmittää isoa uunia pienen annoksen takia.</li>
  </ul>
  <p>Jos mikro on lähinnä eväiden, jämien ja kahvin lämmittämiseen, grilli jää todennäköisesti vähälle käytölle. Silloin <a href="/mikroaaltouuni-800w">tavallinen 800 W:n mikro</a> on edullisempi valinta.</p>

  <h2 id="huomioi">Mitä katsoa grillimikroa ostaessa?</h2>
  <ul>
    <li><strong>Grillin teho</strong> ilmoitetaan erikseen mikroaaltotehosta. Suurempi grilliteho ruskistaa nopeammin.</li>
    <li><strong>Grilliritilä:</strong> monen mallin mukana tulee metallinen ritilä, jolla ruoka nostetaan lähemmäs vastusta. Käytä sitä vain käyttöohjeen mukaisissa toiminnoissa.</li>
    <li><strong>Puhdistettavuus:</strong> grillaus roiskii enemmän rasvaa kuin pelkkä lämmitys. Helposti puhdistettava sisäpinta on plussaa.</li>
    <li><strong>Koko:</strong> grillimikrot ovat usein 23–25 litran luokkaa. Tarkista ulkomitat ja tuuletusväli – grillin jälkeen laitteen pinta voi olla lämmin.</li>
  </ul>
  <p>Grillimikrot maksavat tyypillisesti noin 100–250 €. <a href="/mikroaaltouuni-hinta">Katso mikroaaltouunien hinnat</a>.</p>
</div>`,
    productFilter: (p) => p.type === "grilli",
    productsTitle: "Esimerkkejä grillimikroista",
    faqIds: ["grillimikro", "grilli-vs-kiertoilma", "metalli"],
    related: [
      { label: "Kiertoilmamikro", href: "/kiertoilmamikro", text: "Kun haluat paistaa ja leipoa." },
      { label: "Mikroaaltouuni 25 l", href: "/mikroaaltouuni-25l", text: "Tilaa isommille vuoille." },
      { label: "Osto-opas", href: "/mikroaaltouuni-osto-opas" },
      { label: "Vertailu", href: "/mikroaaltouuni-vertailu" },
    ],
  });

/* =================================================================== KIERTOILMAMIKRO */

export const convectionPage = () =>
  topic({
    path: "/kiertoilmamikro",
    crumb: "Kiertoilmamikro",
    metaTitle: "Kiertoilmamikro – mikro ja pieni uuni samassa",
    description:
      "Kiertoilmamikro yhdistää mikroaaltouunin ja kiertoilmauunin. Lue, miten se toimii, kenelle se sopii, milloin tavallinen mikro riittää ja mitä kiertoilmamikro maksaa.",
    eyebrow: "Mikrotyypit",
    h1: "Kiertoilmamikro",
    intro: "Kiertoilmamikro on mikroaaltouuni ja pieni kiertoilmauuni samassa laitteessa. Se sopii, kun haluat paistaa ja ruskistaa – ei vain lämmittää.",
    toc: [
      { id: "mika", label: "Mikä kiertoilmamikro on?" },
      { id: "kenelle", label: "Kenelle se sopii?" },
      { id: "hyoty", label: "Milloin siitä on hyötyä?" },
      { id: "riittaa", label: "Milloin tavallinen riittää?" },
      { id: "huomioi", label: "Mitä katsoa ostaessa?" },
    ],
    content: html`<div class="prose-fi">
  <h2 id="mika">Mikä kiertoilmamikro on?</h2>
  <p>Kiertoilmamikrossa on mikroaaltojen lisäksi lämpövastus ja puhallin, joka kierrättää kuumaa ilmaa koko uunitilassa. Laitteella voi siis paistaa samaan tapaan kuin kiertoilmauunilla. Useimmissa malleissa on myös grilli.</p>
  <p>Toimintoja voi käyttää erikseen tai yhdessä. Yhdistelmätoiminnossa mikroaallot kypsentävät ruoan sisältä ja kiertoilma ruskistaa pinnan, joten moni ruoka valmistuu nopeammin kuin pelkällä uunilla.</p>

  <h2 id="kenelle">Kenelle kiertoilmamikro sopii?</h2>
  <ul>
    <li>Asuntoon tai mökille, jossa ei ole uunia tai uuni on pieni.</li>
    <li>Kotiin, jossa halutaan toinen uuni pieniin annoksiin.</li>
    <li>Yhden tai kahden hengen talouteen, jossa ison uunin lämmittäminen tuntuu turhalta.</li>
  </ul>

  <h2 id="hyoty">Milloin kiertoilmasta on hyötyä?</h2>
  <p>Kiertoilma on hyödyllinen, kun ruoan pitää olla rapea tai ruskistunut: pakastepiirakat, pienet leivonnaiset, broilerin paloittelut, uuniperunat ja kalaruoat. Tavallinen mikro lämmittää nämä nopeasti, mutta pinta jää pehmeäksi.</p>

  <h2 id="riittaa">Milloin tavallinen mikro riittää?</h2>
  <p>Jos keittiössä on toimiva uuni ja mikroa käytetään lämmittämiseen ja sulattamiseen, kiertoilmasta ei ole juuri hyötyä. Kiertoilmamallit ovat yleensä isompia, kalliimpia ja niissä on enemmän puhdistettavaa. Jos haluat vain ruskistaa pintaa, <a href="/grillimikro">grillimikro</a> on edullisempi välimuoto.</p>

  <h2 id="huomioi">Mitä katsoa kiertoilmamikroa ostaessa?</h2>
  <ul>
    <li><strong>Tilavuus:</strong> kiertoilmamikrot ovat usein 25–30 litraa tai suurempia. Tarkista, mahtuuko oma vuoka tai pelti.</li>
    <li><strong>Lämpötila-alue</strong> ja esilämmitys: katso valmistajan tiedoista, mihin lämpötiloihin kiertoilma yltää.</li>
    <li><strong>Tasapohja vai lautanen:</strong> osassa malleista ei ole pyörivää lautasta, mikä helpottaa isojen astioiden käyttöä.</li>
    <li><strong>Sijoitus:</strong> uunin tapaan käytettynä laite lämpenee. Noudata käyttöohjeen tuuletusvälejä tarkasti.</li>
    <li><strong>Tarvikkeet:</strong> mukana voi olla ritilä tai pelti. Käytä metallisia tarvikkeita vain ohjeen sallimissa toiminnoissa.</li>
  </ul>
  <p>Kiertoilma- ja monitoimimikrot maksavat tyypillisesti noin 150–400 €.</p>
</div>`,
    productFilter: (p) => p.type === "kiertoilma",
    productsTitle: "Esimerkkejä kiertoilmamikroista",
    faqIds: ["grilli-vs-kiertoilma", "koko", "metalli"],
    related: [
      { label: "Grillimikro", href: "/grillimikro", text: "Edullisempi tapa ruskistaa." },
      { label: "Integroitava mikroaaltouuni", href: "/integroitava-mikroaaltouuni" },
      { label: "Osto-opas", href: "/mikroaaltouuni-osto-opas" },
      { label: "Hinnat", href: "/mikroaaltouuni-hinta" },
    ],
  });

/* =================================================================== INTEGROITAVA */

export const builtinPage = () =>
  topic({
    path: "/integroitava-mikroaaltouuni",
    crumb: "Integroitava mikroaaltouuni",
    metaTitle: "Integroitava mikroaaltouuni – mitat, asennus ja hinta",
    description:
      "Integroitava mikroaaltouuni asennetaan keittiökalusteisiin. Lue, miten mitoitus, ilmanvaihto ja asennus toimivat, mitä integroitava mikro maksaa ja mitä tarkistaa ennen ostoa.",
    eyebrow: "Mikrotyypit",
    h1: "Integroitava mikroaaltouuni",
    intro: "Kalusteisiin asennettava mikro vapauttaa työtason ja tekee keittiöstä yhtenäisen. Onnistunut valinta alkaa tarkoista mitoista ja valmistajan asennusohjeesta.",
    toc: [
      { id: "mika", label: "Mitä integroitava tarkoittaa?" },
      { id: "mitoitus", label: "Mitoitus" },
      { id: "ilmanvaihto", label: "Ilmanvaihto" },
      { id: "kalusteet", label: "Kalusteisiin sopivuus" },
      { id: "asennus", label: "Asennus" },
      { id: "hinta", label: "Hinta" },
    ],
    content: html`<div class="prose-fi">
  <h2 id="mika">Mitä integroitava tarkoittaa?</h2>
  <p>Integroitava eli kalusteisiin sijoitettava mikroaaltouuni on suunniteltu asennettavaksi keittiön kaappiin, korkeaan kaappiin tai kalusteuunin yläpuolelle. Laite kiinnitetään kalusteeseen, ja sen etupaneeli jää kaappien linjaan.</p>
  <p>Integroitava mikro ei ole sama asia kuin kaappiin nostettu pöytämikro. Pöytämikron tuuletus on suunniteltu vapaaseen tilaan, joten sitä ei pidä sulkea kaappiin, ellei valmistaja nimenomaan salli sitä.</p>

  <h2 id="mitoitus">Miksi mitoitus on niin tärkeä?</h2>
  <p>Valmistaja ilmoittaa laitteelle <strong>asennusaukon mitat</strong> (korkeus × leveys × syvyys). Kaapin sisämittojen pitää sopia niihin. Monet mallit on tehty 60 cm leveisiin kaappeihin, mutta asennuskorkeudet vaihtelevat malleittain.</p>
  <ul>
    <li>Mittaa kaapin sisäkorkeus, -leveys ja -syvyys.</li>
    <li>Vertaa mittoja asennusohjeen piirrokseen – älä pelkkiin tuotesivun ulkomittoihin.</li>
    <li>Huomioi luukun avautumissuunta ja viereiset laitteet.</li>
  </ul>

  <h2 id="ilmanvaihto">Ilmanvaihto</h2>
  <p>Mikroaaltouuni tuottaa lämpöä, joka pitää saada pois kaapista. Integroitavissa malleissa ilmankierto on suunniteltu kalusteasennusta varten, mutta se toimii vain, kun asennusohjeen mukaiset raot, aukot ja etäisyydet toteutuvat. Liian ahdas asennus voi lyhentää laitteen käyttöikää.</p>

  <h2 id="kalusteet">Kalusteisiin sopivuus</h2>
  <ul>
    <li><strong>Ulkonäkö:</strong> musta lasi, teräs ja valkoinen ovat yleisimmät vaihtoehdot. Sama sarja kalusteuunin kanssa tekee kokonaisuudesta yhtenäisen.</li>
    <li><strong>Asennuskehys:</strong> osa malleista tarvitsee erillisen kehyksen, jolla aukko täytetään siististi.</li>
    <li><strong>Kalustemerkki:</strong> esimerkiksi IKEAn keittiöihin on omia, niihin suunniteltuja laitteita.</li>
  </ul>

  <h2 id="asennus">Asennus</h2>
  <p>Asennuksessa tarvitaan sopivan kokoinen kaappi, pistorasia ohjeen sallimaan paikkaan ja laitteen kiinnitys kalusteeseen. Uudessa keittiössä laite kannattaa huomioida jo suunnitteluvaiheessa. Vanhaa integroitavaa mikroa vaihtaessa kannattaa etsiä mahdollisimman samoilla asennusmitoilla varustettu malli.</p>
  <p>Moni jälleenmyyjä tarjoaa asennuspalvelua. Jos kaapin rakenteeseen tai sähköihin pitää tehdä muutoksia, käytä ammattilaista.</p>

  <h2 id="hinta">Paljonko integroitava mikro maksaa?</h2>
  <p>Integroitavat mikroaaltouunit maksavat tyypillisesti noin 250–600 € tai enemmän. Grillillä tai kiertoilmalla varustetut kalustemallit ovat kalliimpia. Huomioi budjetissa myös asennus ja mahdollinen kehys.</p>
  <p class="note">Tarkista aina <strong>valmistajan asennusohjeet ja vaaditut mitat</strong> ennen ostoa. Ohje löytyy yleensä tuotesivulta PDF-tiedostona tai valmistajan verkkosivuilta.</p>
</div>`,
    productFilter: (p) => p.type === "integroitu",
    productsTitle: "Esimerkkejä integroitavista mikroista",
    faqIds: ["koko", "kestoika"],
    related: [
      { label: "Kiertoilmamikro", href: "/kiertoilmamikro" },
      { label: "Mikroaaltouunien hinnat", href: "/mikroaaltouuni-hinta" },
      { label: "Osto-opas", href: "/mikroaaltouuni-osto-opas" },
      { label: "Mistä ostaa", href: "/#mista-ostaa" },
    ],
  });

/* =================================================================== PIENI */

export const smallPage = () =>
  topic({
    path: "/pieni-mikroaaltouuni",
    crumb: "Pieni mikroaaltouuni",
    metaTitle: "Pieni mikroaaltouuni – kompakti ja halpa mikro pieneen keittiöön",
    description:
      "Pieni mikroaaltouuni sopii yksiöön, opiskelijalle ja taukotilaan. Lue, mitä 17–20 litran mikrosta kannattaa tarkistaa, mitkä mitat ratkaisevat ja mitä halpa mikro maksaa.",
    eyebrow: "Koko",
    h1: "Pieni mikroaaltouuni",
    intro: "Kompakti 17–20 litran mikro mahtuu ahtaaseenkin keittiöön ja riittää hyvin yhden tai kahden hengen arkeen. Tärkeintä on tarkistaa ulkomitat ja lautasen koko.",
    toc: [
      { id: "kenelle", label: "Kenelle pieni mikro sopii?" },
      { id: "mitat", label: "Tarkista mitat" },
      { id: "teho", label: "Riittääkö teho?" },
      { id: "hinta", label: "Halpa mikroaaltouuni" },
    ],
    content: html`<div class="prose-fi">
  <h2 id="kenelle">Kenelle pieni mikroaaltouuni sopii?</h2>
  <p>Pieni mikroaaltouuni on tyypillisesti 17–20 litran pöytämalli. Se sopii hyvin:</p>
  <ul>
    <li>yhden tai kahden hengen talouteen</li>
    <li>opiskelija-asuntoon ja yksiöön</li>
    <li>toimiston tai työmaan taukotilaan</li>
    <li>mökille tai toiseksi mikroksi</li>
  </ul>
  <p>Jos lämmität usein isoja vuokia tai perheen aterioita, 23–25 litran malli on käytännöllisempi. Katso <a href="/mikroaaltouuni-25l">25 litran mikroaaltouunit</a>.</p>

  <h2 id="mitat">Tarkista mitat – eivät vain litrat</h2>
  <p>Pienissä keittiöissä ratkaisevat ulkomitat. Tavallinen 20 litran mikro on noin 44–46 cm leveä, 33–35 cm syvä ja 25–26 cm korkea, mutta mitat vaihtelevat malleittain. Tarkista tuotesivulta tarkat mitat ja käyttöohjeesta tarvittavat tuuletusvälit.</p>
  <ul>
    <li>Mahtuuko mikro tasolle niin, että edessä jää työskentelytilaa?</li>
    <li>Onko yläkaappien alla tarpeeksi korkeutta, kun huomioidaan tuuletus?</li>
    <li>Aukeaako luukku seinän tai jääkaapin puolelle esteettä?</li>
    <li>Mahtuuko oma lautanen pyörimään? Pienen mikron lautanen on usein halkaisijaltaan noin 24–27 cm.</li>
  </ul>

  <h2 id="teho">Riittääkö pienen mikron teho?</h2>
  <p>Pienissä malleissa teho on yleensä 700–800 W. Se riittää yksittäisten annosten lämmittämiseen ja sulattamiseen – suuremmat annokset vain vievät hieman enemmän aikaa. Lue lisää: <a href="/mikroaaltouuni-700w">riittääkö 700 W?</a></p>

  <h2 id="hinta">Halpa mikroaaltouuni: mitä hinnalla saa?</h2>
  <p>Edullisimmat pienet mikrot maksavat usein noin 50–100 €. Niissä on tavallisesti mekaaniset säätimet tai yksinkertainen näyttö, muutama tehotaso ja sulatus. Lisähinnalla saa digitaalisen näytön, automaattiohjelmat ja helpommin puhdistettavan sisäpinnan.</p>
  <p>Pieniä integroitavia malleja on myös, mutta ne kuuluvat eri hintaluokkaan – katso <a href="/integroitava-mikroaaltouuni">integroitavat mikroaaltouunit</a>.</p>
</div>`,
    productFilter: (p) => p.capacity !== null && p.capacity <= 20,
    productsTitle: "Esimerkkejä pienistä mikroista (enintään 20 l)",
    faqIds: ["koko", "700w", "hinta"],
    related: [
      { label: "Mikroaaltouuni 20 l", href: "/mikroaaltouuni-20l" },
      { label: "Mikroaaltouuni 700 W", href: "/mikroaaltouuni-700w" },
      { label: "Hinnat", href: "/mikroaaltouuni-hinta" },
      { label: "Osto-opas", href: "/mikroaaltouuni-osto-opas" },
    ],
  });

/* =================================================================== TEHOSIVUT */

export const power700Page = () =>
  topic({
    path: "/mikroaaltouuni-700w",
    crumb: "Mikroaaltouuni 700 W",
    metaTitle: "Mikroaaltouuni 700 W – riittääkö 700 wattia?",
    description:
      "Riittääkö 700 W mikroaaltouuni? Lue, miten 700 watin mikro eroaa 800 ja 900 watin malleista, kenelle se sopii ja miten lämmitysohjeita sovelletaan.",
    eyebrow: "Teho",
    h1: "Mikroaaltouuni 700 W",
    intro: "700 watin mikro riittää hyvin lämmittämiseen ja sulattamiseen. Se on vain hieman hitaampi kuin tehokkaammat mallit – ja usein edullisempi ja kompaktimpi.",
    toc: [
      { id: "riittaako", label: "Riittääkö 700 W?" },
      { id: "ero", label: "Ero 800 ja 900 W:iin" },
      { id: "ohjeet", label: "Lämmitysohjeet" },
    ],
    content: html`<div class="prose-fi">
  <h2 id="riittaako">Riittääkö 700 wattia?</h2>
  <p>Useimmissa tilanteissa riittää. 700 W:n mikro lämmittää annoksen, sulattaa pakasteet ja kuumentaa juomat aivan kuten tehokkaampi laite – aikaa vain kuluu hieman enemmän. Teho on tyypillinen pienissä 17–20 litran malleissa ja myös osassa integroitavia mikroja.</p>
  <p>700 W sopii erityisesti, kun:</p>
  <ul>
    <li>lämmität lähinnä yksittäisiä annoksia</li>
    <li>kotitaloudessa on yksi tai kaksi henkeä</li>
    <li>tärkeintä on edullinen hinta tai pieni koko</li>
  </ul>

  <h2 id="ero">Miten 700 W eroaa 800 ja 900 W:n mikroista?</h2>
</div>
<div class="mt-6">${powerTable()}</div>
<div class="prose-fi">
  <p>Käytännössä ero näkyy isoissa annoksissa ja kypsennyksessä. Yhden lautasellisen lämmitys voi kestää 700 W:n mikrossa esimerkiksi puolisen minuuttia pidempään kuin 900 W:n mikrossa – tarkka ero riippuu ruoasta ja määrästä.</p>

  <h2 id="ohjeet">Miten valmisruokien ohjeita sovelletaan?</h2>
  <p>Pakkausten lämmitysohjeet on usein annettu 750 tai 800 watille. 700 W:n mikrossa lisää aikaa hieman, sekoita välillä ja tarkista, että ruoka on kuumaa läpikotaisin. Anna ruoan seistä hetki ennen syömistä, jotta lämpö tasaantuu.</p>
</div>`,
    productFilter: (p) => p.power !== null && p.power < 800,
    productsTitle: "Esimerkkejä 700 W:n mikroista",
    faqIds: ["700w", "watit"],
    related: [
      { label: "Mikroaaltouuni 800 W", href: "/mikroaaltouuni-800w" },
      { label: "Mikroaaltouuni 900 W", href: "/mikroaaltouuni-900w" },
      { label: "Pieni mikroaaltouuni", href: "/pieni-mikroaaltouuni" },
      { label: "Osto-opas", href: "/mikroaaltouuni-osto-opas#teho" },
    ],
  });

export const power800Page = () =>
  topic({
    path: "/mikroaaltouuni-800w",
    crumb: "Mikroaaltouuni 800 W",
    metaTitle: "Mikroaaltouuni 800 W – yleisin teho kotikäyttöön",
    description:
      "800 W on yleisin mikroaaltouunin teho kotikäytössä. Lue, kenelle 800 watin mikro sopii, miten se vertautuu 700 ja 900 watin malleihin ja katso esimerkkimalleja.",
    eyebrow: "Teho",
    h1: "Mikroaaltouuni 800 W",
    intro: "800 watin mikro on monelle kultainen keskitie: riittävän nopea arjen lämmitykseen ja tarjolla kaikissa hintaluokissa perusmalleista merkkimikroihin.",
    toc: [
      { id: "miksi", label: "Miksi 800 W on suosittu?" },
      { id: "kenelle", label: "Kenelle se sopii?" },
      { id: "vertailu", label: "700 vs 800 vs 900 W" },
    ],
    content: html`<div class="prose-fi">
  <h2 id="miksi">Miksi 800 W on niin yleinen?</h2>
  <p>800 W on tavallisten 20–23 litran pöytämikrojen yleisin teho. Se lämmittää annokset nopeasti ja vastaa hyvin valmisruokien lämmitysohjeita, jotka annetaan usein 750–800 W:lle. Siksi 800 W:n mikrolla ohjeita voi yleensä noudattaa sellaisenaan.</p>

  <h2 id="kenelle">Kenelle 800 watin mikro sopii?</h2>
  <ul>
    <li>Useimmille kotitalouksille yhdestä neljään henkeen.</li>
    <li>Kun mikroa käytetään lämmittämiseen, sulattamiseen ja välillä yksinkertaiseen ruoanlaittoon.</li>
    <li>Kun haluat valinnanvaraa: 800 W:n malleja on tarjolla laajasti eri merkeiltä ja hintaluokista.</li>
  </ul>

  <h2 id="vertailu">700 vs 800 vs 900 W</h2>
</div>
<div class="mt-6">${powerTable()}</div>
<div class="prose-fi">
  <p>Jos lämmität usein isoja määriä tai käytät mikroa ruoanlaittoon, harkitse <a href="/mikroaaltouuni-900w">900 W:n mallia</a>. Kevyeen käyttöön myös <a href="/mikroaaltouuni-700w">700 W</a> riittää.</p>
</div>`,
    productFilter: (p) => p.power === 800,
    productsTitle: "Esimerkkejä 800 W:n mikroista",
    faqIds: ["watit", "hyva-mikro"],
    related: [
      { label: "Mikroaaltouuni 700 W", href: "/mikroaaltouuni-700w" },
      { label: "Mikroaaltouuni 900 W", href: "/mikroaaltouuni-900w" },
      { label: "Mikroaaltouuni 20 l", href: "/mikroaaltouuni-20l" },
      { label: "Vertailu", href: "/mikroaaltouuni-vertailu" },
    ],
  });

export const power900Page = () =>
  topic({
    path: "/mikroaaltouuni-900w",
    crumb: "Mikroaaltouuni 900 W",
    metaTitle: "Mikroaaltouuni 900 W – tehokas mikro isompiin annoksiin",
    description:
      "Tehokas mikroaaltouuni: 900 W lämmittää isot annokset nopeammin. Lue, kenelle 900 watin mikro sopii, missä malleissa sitä on ja mitä muuta kannattaa katsoa.",
    eyebrow: "Teho",
    h1: "Mikroaaltouuni 900 W",
    intro: "900 watin mikro lämmittää nopeammin, mikä tuntuu etenkin isoissa annoksissa. Tehoa löytyy usein 25 litran ja sitä suuremmista, monipuolisemmista malleista.",
    toc: [
      { id: "hyoty", label: "Milloin 900 W hyödyttää?" },
      { id: "mallit", label: "Millaisissa malleissa?" },
      { id: "huomioi", label: "Mitä muuta katsoa?" },
    ],
    content: html`<div class="prose-fi">
  <h2 id="hyoty">Milloin 900 W:sta on hyötyä?</h2>
  <p>Tehokkaampi mikro lyhentää lämmitysaikaa, ja ero kasvaa ruoan määrän myötä. 900 W on perusteltu, kun:</p>
  <ul>
    <li>lämmität usein perheen aterioita tai isoja kulhollisia</li>
    <li>käytät mikroa ruoanlaittoon, esimerkiksi kasvisten höyryttämiseen</li>
    <li>mikrolla on kova käyttöaste, ja muutama sekunti per kerta ratkaisee</li>
  </ul>
  <p>Yksittäisen annoksen kohdalla ero 800 W:n mikroon on pieni.</p>

  <h2 id="mallit">Millaisissa malleissa 900 W on tavallinen?</h2>
  <p>900 W ja sitä suuremmat tehot ovat yleisiä 25 litran ja isommissa mikroissa sekä <a href="/grillimikro">grilli-</a> ja <a href="/kiertoilmamikro">kiertoilmamalleissa</a>. Näissä on usein myös invertteritekniikka ja enemmän automaattiohjelmia.</p>

  <h2 id="huomioi">Mitä muuta kannattaa katsoa?</h2>
  <ul>
    <li><strong>Tehotasot:</strong> tehokkaassa mikrossa on hyvä olla myös riittävän pieniä tehoja sulatukseen. Invertteri tekee pienistä tehoista tasaisempia.</li>
    <li><strong>Koko:</strong> 900 W:n mallit ovat usein isompia – tarkista ulkomitat.</li>
    <li><strong>Lämmitysohjeet:</strong> vähennä pakkauksen aikaa hieman ja tarkista ruoan lämpö.</li>
  </ul>
</div>`,
    productFilter: (p) => p.power !== null && p.power >= 900,
    productsTitle: "Esimerkkejä 900 W:n mikroista",
    faqIds: ["watit", "invertteri"],
    related: [
      { label: "Mikroaaltouuni 800 W", href: "/mikroaaltouuni-800w" },
      { label: "Mikroaaltouuni 25 l", href: "/mikroaaltouuni-25l" },
      { label: "Grillimikro", href: "/grillimikro" },
      { label: "Vertailu", href: "/mikroaaltouuni-vertailu" },
    ],
  });

/* =================================================================== KOKOSIVUT */

export const size20Page = () =>
  topic({
    path: "/mikroaaltouuni-20l",
    crumb: "Mikroaaltouuni 20 l",
    metaTitle: "Mikroaaltouuni 20 l – kompakti perusmikro",
    description:
      "20 litran mikroaaltouuni on yleinen perusmikron koko. Lue, mitä 20 l mikroon mahtuu, kenelle se sopii, mitkä ovat tyypilliset ulkomitat ja katso esimerkkimalleja.",
    eyebrow: "Koko",
    h1: "Mikroaaltouuni 20 l",
    intro: "20 litraa on yksi yleisimmistä mikroaaltouunien koosta. Tavallinen ruokalautanen ja rasia mahtuvat hyvin, ja laite pysyy kompaktina.",
    toc: [
      { id: "mahtuu", label: "Mitä 20 litraan mahtuu?" },
      { id: "kenelle", label: "Kenelle se sopii?" },
      { id: "mitat", label: "Tyypilliset mitat" },
      { id: "koot", label: "Kokojen vertailu" },
    ],
    content: html`<div class="prose-fi">
  <h2 id="mahtuu">Mitä 20 litran mikroon mahtuu?</h2>
  <p>20 litran mikroon mahtuvat tavalliset ruokalautaset, eväsrasiat ja kulhot. Lautasen halkaisija on näissä malleissa tyypillisesti noin 24–27 cm. Isot, suorakaiteen muotoiset vuoat eivät välttämättä mahdu pyörimään – tarkista sisämitat, jos käytät usein isoja astioita.</p>

  <h2 id="kenelle">Kenelle 20 litran mikro sopii?</h2>
  <p>Yhden tai kahden hengen talouksiin, pieniin keittiöihin ja taukotiloihin. Myös monessa perheessä 20 litraa riittää, jos mikroa käytetään lähinnä annosten lämmittämiseen. 20 litran malleja on runsaasti edullisissa ja keskihintaisissa hintaluokissa, teholtaan yleensä 700–800 W.</p>

  <h2 id="mitat">Tyypilliset ulkomitat</h2>
  <p>20 litran pöytämikro on usein noin 44–46 cm leveä, 33–35 cm syvä ja 25–26 cm korkea. Mitat vaihtelevat malleittain, joten tarkista ne aina tuotesivulta. Huomioi lisäksi käyttöohjeen tuuletusvälit.</p>

  <h2 id="koot">Kokojen vertailu</h2>
</div>
<div class="mt-6">${sizeTable()}</div>`,
    productFilter: (p) => p.capacity !== null && p.capacity >= 19 && p.capacity <= 21,
    productsTitle: "Esimerkkejä 20 litran mikroista",
    faqIds: ["koko"],
    related: [
      { label: "Pieni mikroaaltouuni", href: "/pieni-mikroaaltouuni" },
      { label: "Mikroaaltouuni 25 l", href: "/mikroaaltouuni-25l" },
      { label: "Mikroaaltouuni 800 W", href: "/mikroaaltouuni-800w" },
      { label: "Vertailu", href: "/mikroaaltouuni-vertailu" },
    ],
  });

export const size25Page = () =>
  topic({
    path: "/mikroaaltouuni-25l",
    crumb: "Mikroaaltouuni 25 l",
    metaTitle: "Mikroaaltouuni 25 l – tilaa perheelle ja isommille astioille",
    description:
      "25 litran mikroaaltouuni sopii perheelle ja isommille astioille. Lue, mitä 25 l mikrosta kannattaa tarkistaa, miten se eroaa 20 litran mallista ja katso esimerkkimalleja.",
    eyebrow: "Koko",
    h1: "Mikroaaltouuni 25 l",
    intro: "25 litran mikroon mahtuvat isommatkin kulhot ja vuoat. Koko on yleinen perheen mikrossa sekä grilli- ja monitoimimalleissa.",
    toc: [
      { id: "ero", label: "Ero 20 litraan" },
      { id: "kenelle", label: "Kenelle se sopii?" },
      { id: "huomioi", label: "Mitä tarkistaa?" },
      { id: "koot", label: "Kokojen vertailu" },
    ],
    content: html`<div class="prose-fi">
  <h2 id="ero">Mitä eroa on 20 ja 25 litran mikrolla?</h2>
  <p>Sisätilaa on noin neljänneksen enemmän, ja lautanen on usein suurempi, esimerkiksi halkaisijaltaan noin 28–32 cm. Ero tuntuu, kun lämmität isoja kulhoja, vuokia tai useampaa annosta kerralla. Ulkomitoiltaan 25 litran mikro on tyypillisesti muutaman sentin leveämpi, syvempi ja korkeampi.</p>

  <h2 id="kenelle">Kenelle 25 litran mikro sopii?</h2>
  <ul>
    <li>Perheille, joissa mikroa käytetään päivittäin useaan otteeseen.</li>
    <li>Kun lämmität usein isoja astioita tai valmistat mikrossa ruokaa.</li>
    <li>Kun haluat <a href="/grillimikro">grillin</a> tai muita lisätoimintoja – ne ovat yleisiä tässä kokoluokassa.</li>
  </ul>
  <p>25 litran malleissa teho on usein 800–900 W. Katso myös <a href="/mikroaaltouuni-900w">900 W:n mikroaaltouunit</a>.</p>

  <h2 id="huomioi">Mitä 25 litran mikrosta kannattaa tarkistaa?</h2>
  <ul>
    <li>Ulkomitat ja tuuletusvälit – suurempi mikro vie tasolta selvästi enemmän tilaa.</li>
    <li>Lautasen halkaisija ja se, voiko pyörimisen kytkeä pois isoja vuokia varten.</li>
    <li>Tarvitsetko grillin tai invertterin vai riittääkö perusmalli.</li>
  </ul>

  <h2 id="koot">Kokojen vertailu</h2>
</div>
<div class="mt-6">${sizeTable()}</div>`,
    productFilter: (p) => p.capacity !== null && p.capacity >= 23 && p.capacity <= 27,
    productsTitle: "Esimerkkejä 23–25 litran mikroista",
    faqIds: ["koko", "grillimikro"],
    related: [
      { label: "Mikroaaltouuni 20 l", href: "/mikroaaltouuni-20l" },
      { label: "Mikroaaltouuni 900 W", href: "/mikroaaltouuni-900w" },
      { label: "Grillimikro", href: "/grillimikro" },
      { label: "Vertailu", href: "/mikroaaltouuni-vertailu" },
    ],
  });
