/**
 * Usein kysytyt kysymykset. Vastaus kirjoitetaan HTML:nä; FAQPage-schemaan
 * käytetään samaa tekstiä ilman tageja.
 */

export interface FaqItem {
  id: string;
  q: string;
  a: string;
  /** Näytetäänkö etusivun lyhyessä FAQ-osiossa. */
  home?: boolean;
}

export const faq: FaqItem[] = [
  {
    id: "hyva-mikro",
    q: "Mikä on hyvä mikroaaltouuni?",
    home: true,
    a: `<p>Hyvä mikroaaltouuni on sellainen, joka sopii omaan käyttöön ja keittiöön. Useimmille kotitalouksille riittää 20–25 litran pöytämalli, jonka teho on 800–900 W ja jossa on selkeät säätimet sekä sulatusohjelma.</p>
<p>Tarkista ennen ostoa ainakin ulkomitat, lautasen halkaisija (mahtuuko oma lautanen tai rasia) ja se, tarvitsetko grilliä tai kiertoilmaa. Yksi malli ei ole paras kaikille.</p>`,
  },
  {
    id: "hinta",
    q: "Paljonko hyvä mikroaaltouuni maksaa?",
    home: true,
    a: `<p>Suomessa toimivan perusmikron saa usein noin 50–100 eurolla. Keskihintaiset mallit, joissa on digitaalinen näyttö ja automaattiohjelmat, maksavat tyypillisesti noin 100–200 €. Grilli- ja kiertoilmamallit sekä integroitavat mikrot ovat kalliimpia.</p>
<p>Hinnat ovat suuntaa-antavia ja vaihtelevat tarjousten ja jälleenmyyjien mukaan. Katso tarkemmin <a href="/mikroaaltouuni-hinta">mikroaaltouunien hintaopas</a>.</p>`,
  },
  {
    id: "watit",
    q: "Kuinka monta wattia mikroaaltouunissa pitäisi olla?",
    home: true,
    a: `<p>Tavalliseen kotikäyttöön 800–900 W on hyvä lähtökohta. Suurempi teho lämmittää nopeammin, mutta ero näkyy lähinnä suurissa annoksissa. Pakkausten lämmitysohjeet annetaan usein tietylle teholle, esimerkiksi 750 tai 800 W:lle, joten on hyvä tietää oman mikron teho.</p>
<p>Ilmoitettu teho on uunin suurin mikroaaltoteho. Grillin tai kiertoilman teho ilmoitetaan erikseen.</p>`,
  },
  {
    id: "700w",
    q: "Riittääkö 700 wattia?",
    a: `<p>Riittää, jos mikroa käytetään lähinnä yksittäisten annosten lämmittämiseen ja sulattamiseen. 700 watin mikro on vain hieman hitaampi kuin 800 watin malli: ruoka lämpenee samalla tavalla, mutta aikaa kuluu vähän enemmän.</p>
<p>Jos lämmität usein suuria määriä tai teet mikrossa ruokaa, 800–900 W on käytännöllisempi. Lue lisää <a href="/mikroaaltouuni-700w">700 W mikroaaltouuneista</a>.</p>`,
  },
  {
    id: "koko",
    q: "Mikä on sopiva mikroaaltouunin koko?",
    home: true,
    a: `<p>Yhdelle tai kahdelle hengelle riittää usein 17–20 litraa. Perheelle ja isommille astioille 23–25 litraa on mukavampi. Yli 30 litran mallit ovat yleensä monitoimilaitteita, joissa on grilli tai kiertoilma.</p>
<p>Litramäärää tärkeämpää on usein se, mahtuuko laite paikalleen. Mittaa tila ja jätä laitteen ympärille valmistajan ohjeen mukainen tuuletusväli.</p>`,
  },
  {
    id: "grillimikro",
    q: "Kannattaako ostaa grillimikro?",
    a: `<p>Grillimikro kannattaa, jos haluat ruskistaa esimerkiksi gratiinin, lämpimien voileipien tai uunilohen pinnan tai lämmittää pizzaa niin, ettei pohja jää veltoksi. Jos mikroa käytetään vain lämmittämiseen ja sulattamiseen, tavallinen malli riittää ja on yleensä edullisempi.</p>`,
  },
  {
    id: "grilli-vs-kiertoilma",
    q: "Mitä eroa on grillimikrolla ja kiertoilmamikrolla?",
    a: `<p>Grillimikrossa on uunin katossa grillivastus, joka kuumentaa ruoan pintaa ylhäältä. Kiertoilmamikrossa on lisäksi lämpövastus ja puhallin, jotka kierrättävät kuumaa ilmaa koko uunitilassa. Kiertoilmalla voi paistaa ja leipoa kuten pienessä uunissa, grillillä lähinnä ruskistaa.</p>
<p>Kiertoilmamallit ovat yleensä isompia ja kalliimpia. Monissa niistä on myös grilli.</p>`,
  },
  {
    id: "invertteri",
    q: "Mikä on invertterimikro?",
    a: `<p>Tavallinen mikro säätää pienempiä tehotasoja kytkemällä täyden tehon päälle ja pois jaksoittain. Invertterimikro pystyy tuottamaan pienemmän tehon tasaisesti. Tästä on hyötyä etenkin sulatuksessa ja herkkien ruokien lämmittämisessä, koska reunat kuumenevat vähemmän ennen kuin keskiosa sulaa.</p>`,
  },
  {
    id: "muovi",
    q: "Voiko mikroaaltouunissa lämmittää muoviastiassa?",
    a: `<p>Vain silloin, kun astia on merkitty mikroaaltouuniin sopivaksi. Kaikki muovit eivät kestä kuumaa ruokaa, ja rasvainen tai sokerinen ruoka voi kuumentua niin paljon, että astia vääntyy. Kertakäyttörasiat ja kannet on usein tarkoitettu vain säilytykseen.</p>
<p>Varminta on käyttää lasi- tai keramiikka-astiaa, jossa ei ole metallikoristeita. Tarkista myös oman mikron käyttöohje.</p>`,
  },
  {
    id: "metalli",
    q: "Voiko metallia laittaa mikroaaltouuniin?",
    a: `<p>Pääsääntöisesti ei. Metalli heijastaa mikroaaltoja, ja esimerkiksi alumiinifolio, haarukka tai kultareunainen astia voi aiheuttaa kipinöintiä ja vaurioittaa uunia.</p>
<p>Poikkeuksena ovat mallit, joiden mukana tulee metallinen grilliritilä tai joiden käyttöohjeessa metallin käyttö nimenomaan sallitaan tietyissä toiminnoissa. Noudata aina oman laitteen ohjetta.</p>`,
  },
  {
    id: "puhdistus",
    q: "Miten mikroaaltouuni puhdistetaan?",
    a: `<p>Irrota lautanen ja pese se kuten astia. Pinttyneen lian saa pehmeämmäksi lämmittämällä mikrossa kulhollista vettä (halutessasi sitruunan kanssa) muutaman minuutin ja antamalla höyryn vaikuttaa luukku kiinni. Pyyhi sisäpinnat sen jälkeen pehmeällä liinalla.</p>
<p>Älä käytä hankaavia aineita tai teräsvillaa, jotka voivat vahingoittaa sisäpintaa. Irrota laite verkkovirrasta ennen perusteellisempaa puhdistusta ja tarkista käyttöohjeesta mahdolliset puhdistusohjelmat.</p>`,
  },
  {
    id: "kestoika",
    q: "Kuinka kauan mikroaaltouuni yleensä kestää?",
    a: `<p>Käyttöikä vaihtelee paljon mallin, käyttömäärän ja hoidon mukaan. Moni mikro toimii vuosikausia, mutta tarkkaa lukua on vaikea antaa. Kestoa pidentävät säännöllinen puhdistus, riittävä tuuletusväli ja se, ettei uunia käytetä tyhjänä.</p>
<p>Jos luukku ei sulkeudu kunnolla, tiiviste tai sarana on vaurioitunut tai uuni kipinöi ilman syytä, laite kannattaa korjauttaa tai vaihtaa.</p>`,
  },
  {
    id: "kierratys",
    q: "Mihin vanhan mikroaaltouunin voi viedä Suomessa?",
    a: `<p>Mikroaaltouuni on sähkö- ja elektroniikkaromua (SER), eikä sitä saa laittaa sekajätteeseen. Sen voi viedä maksutta SER-vastaanottopisteeseen, esimerkiksi kunnan tai jätelaitoksen jäteasemalle.</p>
<p>Lisäksi kodinkoneita myyvä kauppa ottaa vanhan laitteen vastaan, kun ostat tilalle vastaavan uuden. Monet kaupat tarjoavat myös vanhan laitteen poisviennin kotiinkuljetuksen yhteydessä. Lähimmät vastaanottopaikat löydät <a href="https://www.kierratys.info/" rel="noopener">Kierratys.info</a>-palvelusta.</p>`,
  },
];
