import { site } from "./site.config.ts";
import { html, pageHero, esc } from "./ui.ts";
import type { PageDef } from "./pages-types.ts";

function simple(path: string, crumb: string, title: string, description: string, h1: string, intro: string, content: string, noindex = false): PageDef {
  return {
    path,
    title: `${title} | mikroaaltouuni.fi`,
    description,
    crumbs: [{ name: crumb, path }],
    noindex,
    body: html`${pageHero({ eyebrow: "mikroaaltouuni.fi", title: h1, intro, updated: true })}
<div class="container-page py-12 sm:py-16"><div class="prose-fi">${content}</div></div>`,
  };
}

const contactLine = () =>
  site.owner.email
    ? `sähköpostitse osoitteeseen <a href="mailto:${esc(site.owner.email)}">${esc(site.owner.email)}</a>`
    : `sivuston <a href="/yhteystiedot">yhteystietosivun</a> kautta`;

export const aboutPage = () =>
  simple(
    "/tietoa-sivustosta",
    "Tietoa sivustosta",
    "Tietoa sivustosta",
    "mikroaaltouuni.fi on suomalainen tietosivusto, joka auttaa kuluttajia valitsemaan sopivan mikroaaltouunin. Lue, miten sisältö tehdään ja miten hintatiedot päivitetään.",
    "Tietoa sivustosta",
    "mikroaaltouuni.fi on suomalainen tietosivusto, joka auttaa kuluttajia tutustumaan mikroaaltouuneihin, niiden ominaisuuksiin ja hintoihin.",
    html`
<h2>Mikä mikroaaltouuni.fi on?</h2>
<p>Sivusto on kuluttajaopas, ei verkkokauppa. Emme myy laitteita, emmekä käsittele tilauksia tai maksuja. Kun haluat ostaa mikroaaltouunin, siirryt jälleenmyyjän omaan verkkokauppaan, jossa kauppa tehdään sen ehdoilla.</p>

<h2>Miten sisältö tehdään?</h2>
<ul>
  <li>Oppaat perustuvat yleiseen tietoon mikroaaltouunien toiminnasta sekä valmistajien ja jälleenmyyjien julkaisemiin tuotetietoihin.</li>
  <li>Esimerkkituotteiden tekniset tiedot (teho, tilavuus, tyyppi) tarkistetaan valmistajan tai jälleenmyyjän tuotesivulta. Jos tietoa ei ole voitu varmistaa, sitä ei näytetä.</li>
  <li>Emme testaa laitteita omassa laboratoriossa, emmekä julkaise paremmuusjärjestyksiä, joita emme pysty perustelemaan.</li>
  <li>Turvallisuusohjeet ovat yleisellä tasolla. Laitekohtaiset ohjeet löytyvät aina valmistajan käyttöohjeesta.</li>
</ul>

<h2>Hinnat ja päivitykset</h2>
<p>Jokaisen hinnan yhteydessä kerrotaan päivä, jolloin hinta on tarkistettu. Hinnat ja saatavuus muuttuvat usein, joten tarkista ajantasainen hinta aina jälleenmyyjältä ennen ostamista. Hintatasot (esimerkiksi ”noin 100–200 €”) ovat suuntaa-antavia haarukoita, eivät lupauksia.</p>

<h2>Kaupallisuus</h2>
<p>Sivuston ylläpito voidaan rahoittaa kumppanuuslinkeillä. Kaupallinen yhteistyö ei vaikuta siihen, mitä oppaissa suositellaan. Lue lisää <a href="/kumppanuuslinkit">kumppanuuslinkeistä</a>.</p>

<h2>Palaute</h2>
<p>Huomasitko virheen tai vanhentuneen tiedon? Otathan yhteyttä ${contactLine()} – korjaamme tiedot mahdollisimman pian.</p>`,
  );

export const contactPage = () =>
  simple(
    "/yhteystiedot",
    "Yhteystiedot",
    "Yhteystiedot",
    "mikroaaltouuni.fi:n yhteystiedot. Ota yhteyttä, jos huomaat virheen, vanhentuneen hinnan tai haluat antaa palautetta.",
    "Yhteystiedot",
    "Palaute, korjausehdotukset ja yhteistyötiedustelut ovat tervetulleita.",
    html`
${
  site.owner.email
    ? `<h2>Sähköposti</h2><p><a href="mailto:${esc(site.owner.email)}">${esc(site.owner.email)}</a></p>`
    : `<h2>Yhteydenotto</h2><p>Sähköpostiosoite julkaistaan tällä sivulla.</p>`
}
${site.owner.name ? `<h2>Sivuston ylläpitäjä</h2><p>${esc(site.owner.name)}${site.owner.businessId ? `<br>Y-tunnus ${esc(site.owner.businessId)}` : ""}</p>` : ""}
<h2>Huomaa</h2>
<ul>
  <li>mikroaaltouuni.fi ei myy tuotteita. Tilauksiin, toimituksiin, palautuksiin ja takuuasioihin liittyvissä kysymyksissä ota yhteyttä suoraan jälleenmyyjään.</li>
  <li>Laitteen vikatilanteissa käänny jälleenmyyjän tai valmistajan asiakaspalvelun puoleen.</li>
</ul>`,
  );

export const privacyPage = () =>
  simple(
    "/tietosuojaseloste",
    "Tietosuojaseloste",
    "Tietosuojaseloste",
    "mikroaaltouuni.fi:n tietosuojaseloste: mitä tietoja sivustolla käsitellään, miksi ja mitkä ovat käyttäjän oikeudet.",
    "Tietosuojaseloste",
    "Tässä selosteessa kerrotaan, miten mikroaaltouuni.fi käsittelee henkilötietoja.",
    html`
<h2>Rekisterinpitäjä</h2>
<p>${site.owner.name ? esc(site.owner.name) : "Sivuston ylläpitäjä"}${site.owner.businessId ? `, Y-tunnus ${esc(site.owner.businessId)}` : ""}. Yhteydenotot ${contactLine()}.</p>

<h2>Mitä tietoja käsitellään?</h2>
<p>Sivustolla ei ole rekisteröitymistä, tilauslomaketta eikä uutiskirjettä. Sivuston selaaminen ei edellytä henkilötietojen antamista.</p>
<ul>
  <li><strong>Palvelimen lokitiedot:</strong> sivuston palveluntarjoaja voi tallentaa teknisiä lokitietoja, kuten IP-osoitteen, selaimen tiedot ja pyydetyn sivun. Tietoja käytetään palvelun toimivuuden ja tietoturvan varmistamiseen, ja niitä säilytetään vain rajatun ajan.</li>
  <li><strong>Yhteydenotot:</strong> jos lähetät sähköpostia, käsittelemme viestisi ja yhteystietosi vastataksemme siihen.</li>
</ul>

<h2>Käsittelyn peruste</h2>
<p>Lokitietojen käsittely perustuu oikeutettuun etuun palvelun ylläpitämiseksi ja suojaamiseksi. Yhteydenottojen käsittely perustuu oikeutettuun etuun vastata yhteydenottoon.</p>

<h2>Evästeet ja ulkopuoliset palvelut</h2>
<p>Sivusto ei oletuksena käytä analytiikka- tai markkinointievästeitä, ja fontit ladataan sivuston omalta palvelimelta. Lue lisää <a href="/evastekaytannot">evästekäytännöistä</a>. Kun siirryt jälleenmyyjän sivustolle, sen omat tietosuojakäytännöt koskevat käyntiäsi.</p>

<h2>Tietojen luovutukset</h2>
<p>Tietoja ei myydä eikä luovuteta kolmansille osapuolille markkinointitarkoituksiin. Tekniset palveluntarjoajat (esimerkiksi sivuston ylläpitoalusta) voivat käsitellä tietoja lukuumme.</p>

<h2>Sinun oikeutesi</h2>
<p>Sinulla on oikeus saada tietää, mitä tietoja sinusta käsitellään, pyytää tietojen oikaisua tai poistamista sekä vastustaa käsittelyä. Voit myös tehdä valituksen valvontaviranomaiselle (tietosuojavaltuutetun toimisto).</p>`,
  );

export const cookiePage = () =>
  simple(
    "/evastekaytannot",
    "Evästekäytännöt",
    "Evästekäytännöt",
    "mikroaaltouuni.fi:n evästekäytännöt: sivusto ei oletuksena käytä seuranta- tai markkinointievästeitä.",
    "Evästekäytännöt",
    "Evästeet ovat pieniä tekstitiedostoja, joita verkkosivusto voi tallentaa selaimeesi.",
    html`
<h2>Käyttääkö mikroaaltouuni.fi evästeitä?</h2>
<p>Sivusto ei oletuksena aseta analytiikka-, mainos- tai markkinointievästeitä. Sivu toimii ilman evästeitä, eikä sen käyttö edellytä suostumusta.</p>

<h2>Jälleenmyyjien sivustot</h2>
<p>Kun siirryt linkin kautta jälleenmyyjän verkkokauppaan, kyseinen sivusto voi asettaa omia evästeitään. Kumppanuuslinkkien kautta jälleenmyyjä voi tunnistaa, että saavuit mikroaaltouuni.fi:stä. Näitä evästeitä koskevat jälleenmyyjän omat käytännöt.</p>

<h2>Muutokset</h2>
<p>Jos sivustolle lisätään myöhemmin esimerkiksi kävijäanalytiikka, päivitämme tämän sivun ja pyydämme tarvittaessa suostumuksesi ennen evästeiden käyttöä.</p>

<h2>Evästeiden hallinta</h2>
<p>Voit poistaa ja estää evästeet selaimesi asetuksista. Ohjeet löytyvät selaimesi ohjeista.</p>`,
  );

export const affiliatePage = () =>
  simple(
    "/kumppanuuslinkit",
    "Kumppanuuslinkit",
    "Kumppanuuslinkit",
    "Osa mikroaaltouuni.fi:n linkeistä voi olla kaupallisia kumppanuuslinkkejä. Linkin käyttäminen ei maksa sinulle ylimääräistä.",
    "Kumppanuuslinkit",
    "Osa sivuston linkeistä voi olla kaupallisia kumppanuuslinkkejä. Linkin käyttäminen ei maksa sinulle ylimääräistä.",
    html`
<h2>Mitä kumppanuuslinkki tarkoittaa?</h2>
<p>Kumppanuus- eli affiliate-linkki on linkki jälleenmyyjän sivulle, jonka kautta jälleenmyyjä voi tunnistaa, että ostaja tuli mikroaaltouuni.fi:stä. Jos teet ostoksen tällaisen linkin kautta, sivusto voi saada jälleenmyyjältä pienen palkkion.</p>

<h2>Vaikuttaako se hintaan?</h2>
<p>Ei. Maksat tuotteesta saman hinnan riippumatta siitä, tuletko kauppaan linkin kautta vai suoraan.</p>

<h2>Vaikuttaako se sisältöön?</h2>
<p>Ei. Oppaiden neuvot perustuvat siihen, mikä sopii kuluttajalle – esimerkiksi suosittelemme edullista perusmikroa, jos se riittää käyttötarkoitukseen. Esimerkkituotteiden järjestys ei ole paremmuusjärjestys, eikä jälleenmyyjä voi ostaa parempaa sijoitusta.</p>

<h2>Miten tunnistan kumppanuuslinkin?</h2>
<p>Jälleenmyyjille johtavat linkit on merkitty painikkeilla, kuten ”Katso valikoima” tai ”Katso tuote”, ja ne avautuvat uuteen välilehteen. Kaupalliset linkit merkitään sivun koodiin hakukoneita varten (rel="sponsored").</p>`,
  );

export const notFoundPage = (): PageDef => ({
  path: "/404",
  outFile: "404.html",
  title: "Sivua ei löytynyt | mikroaaltouuni.fi",
  description: "Etsimääsi sivua ei löytynyt.",
  noindex: true,
  excludeFromSitemap: true,
  body: html`<section class="container-page py-24 text-center">
  <p class="eyebrow">Virhe 404</p>
  <h1 class="mt-3 text-4xl font-bold tracking-tight text-navy-950">Sivua ei löytynyt</h1>
  <p class="lead mx-auto mt-4 max-w-xl">Sivu on voinut siirtyä tai osoitteessa on kirjoitusvirhe. Löydät oppaat ja vertailun alta.</p>
  <div class="mt-8 flex flex-wrap justify-center gap-3">
    <a href="/" class="btn-primary">Etusivulle</a>
    <a href="/mikroaaltouuni-vertailu" class="btn-ghost">Vertaile mikroja</a>
    <a href="/mikroaaltouuni-osto-opas" class="btn-ghost">Osto-opas</a>
  </div>
</section>`,
});
