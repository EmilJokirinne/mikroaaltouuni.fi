import { site } from "./site.config.ts";
import { products } from "./products.ts";
import { faq } from "./faq.ts";
import {
  html, icon, section, sectionHead, typeCards, priceRangeTable, productTable, powerTable, sizeTable,
  grillVsNormalTable, featureCards, retailerCards, safetyList, faqList, faqLd, ctaBand, websiteLd, orgLd, productLd,
} from "./ui.ts";
import type { PageDef } from "./pages-types.ts";

export function homePage(): PageDef {
  const homeFaq = faq.filter((f) => f.home);

  const hero = html`
<section class="relative overflow-hidden border-b border-line bg-gradient-to-b from-navy-50/70 via-white to-white">
  <div class="container-page grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:py-20">
    <div>
      <p class="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1 text-xs font-semibold text-navy-800 shadow-card">
        <span class="h-1.5 w-1.5 rounded-full bg-accent-500" aria-hidden="true"></span> Riippumaton suomalainen kuluttajaopas
      </p>
      <h1 class="mt-5 text-[2.25rem] font-bold leading-[1.1] tracking-tight text-navy-950 sm:text-5xl lg:text-[3.4rem]">Mikroaaltouuni – opas, hinnat ja vertailu</h1>
      <p class="lead mt-5 max-w-xl">Löydä sopiva mikroaaltouuni kotiisi. Vertaile ominaisuuksia, kokoja ja hintoja sekä tutustu suomalaisiin ostopaikkoihin.</p>
      <div class="mt-8 flex flex-col gap-3 sm:flex-row">
        <a href="/mikroaaltouuni-vertailu" class="btn-primary">Vertaile mikroaaltouuneja</a>
        <a href="/mikroaaltouuni-osto-opas" class="btn-ghost">Lue osto-opas</a>
      </div>
      <dl class="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-line pt-6">
        <div><dt class="meta">Yleisin teho</dt><dd class="mt-1 text-lg font-bold text-navy-950">800–900 W</dd></div>
        <div><dt class="meta">Yleisin koko</dt><dd class="mt-1 text-lg font-bold text-navy-950">20–25 l</dd></div>
        <div><dt class="meta">Perusmikro</dt><dd class="mt-1 text-lg font-bold text-navy-950">50–100 €</dd></div>
      </dl>
    </div>
    <div class="relative">
      <div class="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-accent-100/60 to-navy-100/50 blur-2xl" aria-hidden="true"></div>
      <img src="/hero-mikroaaltouuni.svg" width="640" height="520" alt="Moderni mikroaaltouuni vaalean skandinaavisen keittiön työtasolla" class="relative w-full rounded-[1.75rem] border border-line bg-white shadow-lift" fetchpriority="high" decoding="async">
    </div>
  </div>
</section>`;

  const guideTeaser = html`
<div class="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
  <div>
    ${sectionHead({ id: "osto-opas", eyebrow: "Osto-opas lyhyesti", title: "Viisi asiaa ennen ostamista", intro: "Näillä kysymyksillä rajaat vaihtoehdot nopeasti. Pidempi opas käy jokaisen kohdan läpi esimerkkien kanssa." })}
    <a href="/mikroaaltouuni-osto-opas" class="link-arrow mt-6">Lue koko osto-opas <span aria-hidden="true">→</span></a>
  </div>
  <ol class="space-y-3">
    ${[
      ["Mihin mikroa käytetään?", "Pelkkä lämmitys ja sulatus vai myös ruskistus ja paistaminen? Tämä ratkaisee tyypin."],
      ["Mahtuuko se paikalleen?", "Mittaa leveys, syvyys ja korkeus. Lisää valmistajan vaatima tuuletusväli ja luukun avautumistila."],
      ["Kuinka suuri sisätila tarvitaan?", "17–20 l yhdelle tai kahdelle, 23–25 l perheelle. Tarkista myös lautasen halkaisija."],
      ["Paljonko tehoa?", "800–900 W sopii useimpiin koteihin. 700 W riittää kevyeen käyttöön."],
      ["Mitkä ominaisuudet ovat oikeasti tarpeen?", "Automaattiohjelmat, invertteri ja helppo puhdistus ovat hyödyllisiä. Kaikkea ei tarvitse."],
    ].map(
      ([t, d], i) => html`<li class="card flex gap-4 p-5">
        <span class="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent-400 text-sm font-bold text-navy-950">${i + 1}</span>
        <div><p class="font-semibold text-navy-950">${t}</p><p class="mt-1 text-sm leading-relaxed text-ink-soft">${d}</p></div>
      </li>`,
    )}
  </ol>
</div>
<div class="mt-14">
  <h3 class="text-xl font-semibold text-navy-950">Mitä ominaisuuksia kannattaa etsiä?</h3>
  <div class="mt-6">${featureCards()}</div>
</div>`;

  const convection = html`
<div class="grid gap-6 lg:grid-cols-2">
  <article class="card p-7 sm:p-8">
    <div class="flex items-center gap-3"><span class="grid h-11 w-11 place-items-center rounded-xl bg-navy-50 text-navy-800">${icon.fan("h-6 w-6")}</span><h2 id="kiertoilmamikro-otsikko" class="text-xl font-bold text-navy-950 sm:text-2xl">Kiertoilmamikro</h2></div>
    <p class="mt-4 leading-relaxed text-ink-soft">Kiertoilmamikrossa on mikroaaltojen lisäksi lämpövastus ja puhallin, jotka kierrättävät kuumaa ilmaa uunitilassa. Sillä voi paistaa, leipoa ja ruskistaa kuten pienellä uunilla – ja yhdistelmätoiminnolla usein nopeammin.</p>
    <ul class="mt-5 space-y-2 text-[0.95rem]">
      <li class="flex gap-2">${icon.check("mt-0.5 h-5 w-5 shrink-0 text-emerald-600")}<span><strong class="font-semibold">Hyödyllinen</strong>, jos keittiössä ei ole uunia tai tarvitset toisen uunin pieniin annoksiin.</span></li>
      <li class="flex gap-2">${icon.check("mt-0.5 h-5 w-5 shrink-0 text-emerald-600")}<span>Sopii esimerkiksi pieneen asuntoon, mökille tai kakkosuuniksi.</span></li>
      <li class="flex gap-2">${icon.dash("mt-0.5 h-5 w-5 shrink-0 text-ink-muted")}<span><strong class="font-semibold">Tavallinen mikro riittää</strong>, jos laitetta käytetään vain lämmittämiseen ja sulattamiseen.</span></li>
    </ul>
    <a href="/kiertoilmamikro" class="link-arrow mt-6">Lue lisää kiertoilmamikroista <span aria-hidden="true">→</span></a>
  </article>
  <article class="card p-7 sm:p-8">
    <div class="flex items-center gap-3"><span class="grid h-11 w-11 place-items-center rounded-xl bg-navy-50 text-navy-800">${icon.builtin("h-6 w-6")}</span><h2 id="integroitava-otsikko" class="text-xl font-bold text-navy-950 sm:text-2xl">Integroitava mikro</h2></div>
    <p class="mt-4 leading-relaxed text-ink-soft">Integroitava mikroaaltouuni asennetaan keittiökalusteisiin, esimerkiksi yläkaappiin tai uunin yläpuolelle. Ulkonäkö on siisti, mutta laitteen ja kaapin mittojen täytyy sopia yhteen tarkasti.</p>
    <ul class="mt-5 space-y-2 text-[0.95rem]">
      <li class="flex gap-2">${icon.check("mt-0.5 h-5 w-5 shrink-0 text-emerald-600")}<span>Vertaa laitteen <strong class="font-semibold">asennusaukon mittoja</strong> kaapin sisämittoihin.</span></li>
      <li class="flex gap-2">${icon.check("mt-0.5 h-5 w-5 shrink-0 text-emerald-600")}<span>Tarkista ilmanvaihto, pistorasian paikka ja tarvittava asennuskehys.</span></li>
      <li class="flex gap-2">${icon.info("mt-0.5 h-5 w-5 shrink-0 text-accent-700")}<span>Noudata aina <strong class="font-semibold">valmistajan asennusohjeita</strong>. Tavallista pöytämikroa ei yleensä saa sulkea kaappiin.</span></li>
    </ul>
    <a href="/integroitava-mikroaaltouuni" class="link-arrow mt-6">Lue lisää integroitavista mikroista <span aria-hidden="true">→</span></a>
  </article>
</div>`;

  const body = html`
${hero}

${section("tyypit", html`
  ${sectionHead({ id: "tyypit", eyebrow: "Mikroaaltouunityypit", title: "Mikä mikroaaltouunityyppi sopii sinulle?", intro: "Useimmat mikrot kuuluvat yhteen neljästä ryhmästä. Tyyppi vaikuttaa eniten hintaan, kokoon ja siihen, mitä laitteella voi tehdä." })}
  <div class="mt-10">${typeCards(3)}</div>
`, { tight: true })}

${section("hinnat", html`
  <div class="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-14">
    <div>
      ${sectionHead({ id: "hinnat", eyebrow: "Hintaopas", title: "Paljonko mikroaaltouuni maksaa?", intro: "Suomessa mikroaaltouunien hinnat vaihtelevat huomattavasti ominaisuuksien, koon, tehon ja asennustavan mukaan. Toimivan perusmikron saa alle sadalla eurolla, integroitavasta mallista voi maksaa useita satoja." })}
      <a href="/mikroaaltouuni-hinta" class="link-arrow mt-6">Katso mikroaaltouunien hinnat <span aria-hidden="true">→</span></a>
    </div>
    <div>${priceRangeTable()}</div>
  </div>
`, { tint: true })}

${section("esimerkit", html`
  <div class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
    ${sectionHead({ id: "esimerkit", eyebrow: "Tuotevertailu", title: "Esimerkkejä Suomessa myytävistä mikroaaltouuneista", intro: "Poimintoja eri hintaluokista. Kyse on esimerkeistä, ei paremmuusjärjestyksestä – vertailusivulla voit suodattaa malleja omien tarpeidesi mukaan." })}
    <a href="/mikroaaltouuni-vertailu" class="btn-ghost shrink-0">Vertaile malleja <span aria-hidden="true">→</span></a>
  </div>
  <div class="mt-10">${productTable(products)}</div>
`)}

${section("osto-opas", guideTeaser, { tint: true })}

${section("teho", html`
  ${sectionHead({ id: "teho", eyebrow: "Tehon vertailu", title: "Kuinka paljon tehoa tarvitset?", intro: "Teho ilmoitetaan watteina (W) ja se kertoo, kuinka nopeasti mikro lämmittää. Todelliseen lämmitysaikaan vaikuttavat myös ruoan määrä, lähtölämpötila ja astia." })}
  <div class="mt-10">${powerTable()}</div>
`)}

${section("koko", html`
  <div class="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
    <div>
      ${sectionHead({ id: "koko", eyebrow: "Kokojen vertailu", title: "Minkä kokoinen mikroaaltouuni kannattaa ostaa?", intro: "Tilavuus kertoo sisätilan koon litroina. Yhtä tärkeitä ovat ulkomitat: mahtuuko mikro tasolle tai kaappiin niin, että sen ympärille jää tilaa tuuletukselle?" })}
      <p class="note mt-6">Mittaa paikka ennen ostamista ja vertaa sitä laitteen ulkomittoihin <strong class="font-semibold">sekä</strong> käyttöohjeen tuuletusväleihin.</p>
    </div>
    <div>${sizeTable()}</div>
  </div>
`, { tint: true })}

${section("grilli", html`
  <div class="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
    <div>
      ${sectionHead({ id: "grilli", eyebrow: "Grillimikro vs tavallinen", title: "Tarvitsetko grillin?", intro: "Grillivastus ruskistaa ruoan pinnan ylhäältä. Siitä on hyötyä gratiineissa, lämpimissä voileivissä ja pizzan lämmittämisessä. Jos mikro on lähinnä eväiden lämmittämiseen, tavallinen malli riittää." })}
      <a href="/grillimikro" class="link-arrow mt-6">Lue lisää grillimikroista <span aria-hidden="true">→</span></a>
    </div>
    <div>${grillVsNormalTable()}</div>
  </div>
`)}

<section class="pb-16 sm:pb-20" aria-label="Kiertoilmamikro ja integroitava mikro"><div class="container-page">${convection}</div></section>

${section("mista-ostaa", html`
  ${sectionHead({ id: "mista-ostaa", eyebrow: "Ostopaikat", title: "Mistä ostaa mikroaaltouuni Suomessa?", intro: "Mikroaaltouuneja myyvät kodinkone- ja elektroniikkaketjut, hypermarketit, rautakaupat ja verkkokaupat. Vertaile hintaa, toimitusta ja palautusehtoja ennen ostoa." })}
  <div class="mt-10">${retailerCards()}</div>
`, { tint: true })}

${section("turvallisuus", html`
  ${sectionHead({ id: "turvallisuus", eyebrow: "Turvallisuus", title: "Mikroaaltouunin turvallinen käyttö", intro: "Mikroaaltouuni on turvallinen, kun sitä käytetään ohjeiden mukaan. Suurin osa ongelmista liittyy vääriin astioihin ja kuumiin nesteisiin." })}
  <div class="mt-10">${safetyList()}</div>
`)}

${section("ukk", html`
  <div class="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-14">
    <div>
      ${sectionHead({ id: "ukk", eyebrow: "FAQ", title: "Usein kysytyt kysymykset", intro: "Lyhyet vastaukset yleisimpiin kysymyksiin mikroaaltouunin valinnasta." })}
      <a href="/usein-kysytyt-kysymykset" class="link-arrow mt-6">Kaikki kysymykset ja vastaukset <span aria-hidden="true">→</span></a>
    </div>
    <div>${faqList(homeFaq)}</div>
  </div>
`, { tint: true })}

<div class="pt-8">${ctaBand()}</div>`;

  return {
    path: "/",
    title: site.defaultTitle,
    description: site.defaultDescription,
    body,
    jsonLd: [websiteLd, orgLd, faqLd(homeFaq), ...(site.enableProductSchema ? productLd(products) : [])],
  };
}
