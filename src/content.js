export const DEFAULT_LOCALE = "hr";
export const SUPPORTED_LOCALES = ["hr", "en"];

export const PROJECT_FACTS = [
  { id: "dolce-torte", number: "01", title: "Dolce Torte", domain: "dolcetorte.hr", url: "https://dolcetorte.hr/", image: "dolceTorte" },
  { id: "sol", number: "02", title: "SOL", domain: "atasol.hr", url: "https://www.atasol.hr/", image: "atasol" },
  { id: "produkt-auto", number: "03", title: "Produkt Auto", domain: "produktauto.com", url: "https://produktauto.com/", image: "produktAuto" },
  { id: "tina-sport", number: "04", title: "Tina Šport–Pia", domain: "mnk-tinasport.hr", url: "https://mnk-tinasport.hr/", image: "tinaSport" },
  { id: "dogan-septem", number: "05", title: "Dogan Septem Interijeri", domain: "doganseptem-interijeri.hr", url: "https://www.doganseptem-interijeri.hr/", image: "doganSeptem" },
];

export const FORM_OPTIONS = {
  services: ["brand-systems", "digital-products", "campaign-worlds", "not-sure"],
  budgets: ["exploring", "under-15", "15-35", "35-plus"],
  timelines: ["asap", "one-two", "three-six", "exploring"],
};

const contentByLocale = {
  hr: {
    meta: {
      title: "OSIRIS — Nezavisni kreativni studio",
      description: "OSIRIS povezuje strategiju, identitet, digitalne proizvode i kampanje u jasne, prepoznatljive sustave.",
    },
    brand: {
      name: "OSIRIS",
      descriptor: "Nezavisni kreativni studio",
      edition: "Hrvatski / English · 2026",
      contactLabel: "Pošaljite upit",
    },
    navigation: [
      { label: "Radovi", href: "#work" },
      { label: "Usluge", href: "#services" },
      { label: "Studio", href: "#studio" },
      { label: "Bilješke", href: "#insights" },
      { label: "Upit", href: "#contact" },
    ],
    hero: {
      title: ["PRVO IDEJA.", "ONDA SVE OSTALO."],
      description: "Povezujemo strategiju, identitet, digitalne proizvode i kampanje u sustave koji govore jasno — i ostaju prepoznatljivi.",
      note: "Strategija · Identitet · Digitalno · Kampanje",
    },
    work: {
      title: "Odabrani radovi",
      intro: "Pet aktivnih webova. Pet različitih industrija. Svaki projekt počinje istim pitanjem: što ovdje mora biti jasnije?",
      liveSite: "Web uživo",
    },
    projectCopy: {
      "dolce-torte": {
        category: "Slastičarstvo · Web",
        description: "Ponuda je u prvom planu: pregledan katalog, jasne kategorije i kratak put od odabira do narudžbe.",
        tags: ["Web dizajn", "Katalog", "Responzivno"],
      },
      sol: {
        category: "Wellness · Urednički web",
        description: "Miran, fotografijom vođen web za somatsku psihoterapiju, strukturiran oko povjerenja, razumljivosti i pronalaska termina.",
        tags: ["Art direkcija", "Web dizajn", "Responzivno"],
      },
      "produkt-auto": {
        category: "Automobili · Platforma",
        description: "Tamno, inventarom vođeno iskustvo koje objedinjuje pregled vozila, filtriranje i veleprodajne upite.",
        tags: ["UX/UI", "Inventar", "Responzivno"],
      },
      "tina-sport": {
        category: "Sport · Ligaški portal",
        description: "Snažan klupski portal koji organizira rasporede, rezultate, dobne skupine, vijesti i galerije za igrače i obitelji.",
        tags: ["Web dizajn", "Sustav sadržaja", "Responzivno"],
      },
      "dogan-septem": {
        category: "Interijeri · Usluge",
        description: "Projektima vođen web koji spaja izvedene interijere, razumljivu ponudu usluga i izravan put do traženja ponude.",
        tags: ["Art direkcija", "Dizajn usluge", "Responzivno"],
      },
    },
    services: {
      title: "Što radimo",
      intro: "Ne prodajemo pakete. Sastavljamo pravi spoj strategije, identiteta i izvedbe za problem pred nama.",
      items: [
        {
          id: "brand-systems",
          title: "Sustavi brenda",
          summary: "Postavljanje smjera, identiteta i vizualnog jezika koji se može dosljedno primjenjivati nakon lansiranja.",
          deliverables: ["Strategija brenda", "Verbalni smjer", "Dizajn identiteta", "Smjernice"],
        },
        {
          id: "digital-products",
          title: "Digitalni proizvodi",
          summary: "Webovi i digitalna iskustva oblikovani kao dio brenda, a ne kao naknadno dodan tehnički sloj.",
          deliverables: ["Strategija iskustva", "UX i UI dizajn", "Kreativni razvoj", "Dizajn sustavi"],
        },
        {
          id: "campaign-worlds",
          title: "Kampanjski svjetovi",
          summary: "Ideje za lansiranje koje ostaju prepoznatljive kroz film, društvene mreže, urednički sadržaj i prostor.",
          deliverables: ["Koncepti kampanje", "Art direkcija", "Jezik pokreta", "Alati za lansiranje"],
        },
      ],
    },
    studio: {
      title: "Jedna ideja. Jedna odgovornost.",
      lead: "Jedna seniorska perspektiva vodi rad od prve odluke do zadnjeg detalja.",
      copy: "Strategiju, identitet i digitalnu izvedbu držimo u istom razgovoru. Tako se odluke ne gube između disciplina, a svaki detalj nastavlja istu ideju.",
      note: "Smjer ostaje povezan od početnog razgovora do objave.",
      capabilitiesTitle: "Disciplinski raspon",
      capabilities: ["Strategija", "Identitet", "Sučelje", "Kampanja", "Pokret", "Kreativni kod"],
      principle: "Rad treba djelovati neizbježno: svaka odluka povezana, svaki detalj opravdan.",
      attribution: "Načelo studija OSIRIS",
    },
    insights: {
      title: "Bilješke iz rada",
      intro: "Tri kratka zapisa o brendovima, sučeljima i idejama koje moraju trajati dulje od lansiranja.",
      items: [
        {
          id: "systems",
          category: "Sustavi brenda",
          title: "Zašto je prepoznatljivost važnija od jednakosti",
          date: "Bilješka 01",
          excerpt: "Dosljednost ponavlja isti odgovor. Prepoznatljivost daje brendu dovoljno strukture da odgovori drukčije, a da pritom ne postane netko drugi.",
        },
        {
          id: "interfaces",
          category: "Digitalni proizvodi",
          title: "Sučelje već govori",
          date: "Bilješka 02",
          excerpt: "Razmaci, čekanje i stanja pogreške imaju vlastiti glas. Dizajn proizvoda postaje dizajn brenda kada su ti tihi trenuci jednako namjerni kao naslovnica.",
        },
        {
          id: "launches",
          category: "Kampanje",
          title: "Ideji za lansiranje treba život nakon prvog tjedna",
          date: "Bilješka 03",
          excerpt: "Snažna kampanja nije jedna savršena slika. Ona je skup pravila koji nastavlja stvarati relevantne izraze nakon početnog trenutka.",
        },
      ],
    },
    faq: {
      title: "Prije prvog razgovora",
      intro: "Kratki odgovori na praktična pitanja o suradnji.",
      items: [
        { id: "fit", question: "Kakvi projekti najbolje odgovaraju studiju?", answer: "Projekti u kojima se događa stvarna promjena: nova tvrtka, jasnije pozicioniranje, proizvod koji ulazi u sljedeću fazu ili kampanja kojoj treba vlastiti svijet." },
        { id: "process", question: "Kako projekt počinje?", answer: "Jednim usredotočenim razgovorom. Prvo mapiramo odluku, publiku i ograničenja, a zatim predlažemo opseg, tim i redoslijed rada." },
        { id: "build", question: "Dizajnirate li i razvijate web?", answer: "Da. Web možemo voditi od strategije iskustva preko vizualnog dizajna do front-end izvedbe ili raditi uz Vaš postojeći razvojni tim." },
        { id: "partners", question: "Možete li se uključiti u naš tim?", answer: "Da. Možemo voditi kreativni smjer ili se uključiti u postojeću produktnu, marketinšku ili produkcijsku strukturu kada je potrebna seniorska dizajnerska pažnja." },
        { id: "timeline", question: "Kada Vam se trebamo javiti?", answer: "Vrijeme početka ovisi o opsegu i uključenom timu. U upitu navedite željeni termin lansiranja kako bismo odmah imali pravi kontekst." },
      ],
    },
    contact: {
      title: "Recite nam što se mora promijeniti.",
      copy: "Recite nam što se mijenja, što zapinje i što projekt mora postići.",
      directEmail: "Ili pišite izravno",
      privacy: "Ova stranica ne sprema niti šalje Vaše podatke. Pripremit će poruku koju šaljete tek kada u svojoj aplikaciji za e-poštu pritisnete Pošalji.",
      form: {
        labels: { name: "Vaše ime", email: "Adresa e-pošte", company: "Tvrtka ili tim", service: "Primarna potreba", budget: "Radni budžet", timeline: "Željeni termin", brief: "Sažetak projekta" },
        required: "Obavezno",
        optional: "Neobavezno",
        choose: "Odaberite",
        placeholder: "Što se mora promijeniti i zašto upravo sada?",
        options: {
          services: { "brand-systems": "Sustavi brenda", "digital-products": "Digitalni proizvodi", "campaign-worlds": "Kampanjski svjetovi", "not-sure": "Još nismo sigurni" },
          budgets: { exploring: "Istražujemo opseg", "under-15": "Manje od 15.000 €", "15-35": "15.000–35.000 €", "35-plus": "Više od 35.000 €" },
          timelines: { asap: "Što prije", "one-two": "Unutar 1–2 mjeseca", "three-six": "Unutar 3–6 mjeseci", exploring: "Još istražujemo" },
        },
        validation: {
          name: "Ime je prekratko. Upišite najmanje dva znaka kako bismo znali kome odgovaramo.",
          email: "Adresa e-pošte nije potpuna. Upišite adresu u obliku ime@studio.hr.",
          service: "Primarna potreba nije odabrana. Odaberite područje najbliže Vašem projektu.",
          timeline: "Termin nije odabran. Odaberite vrijeme koje najbolje opisuje projekt.",
          brief: "Sažetak je prekratak. Upišite najmanje 20 znakova o onome što se treba promijeniti.",
        },
        submit: "Pripremite upit",
        prepared: "Poruka je pripremljena u Vašoj aplikaciji za e-poštu.",
        fallback: "Otvorite pripremljenu poruku",
      },
    },
    footer: { statement: "Neka sljedeća stvar bude prepoznatljiva.", meta: "Nezavisni kreativni studio · HR / EN" },
    a11y: {
      skip: "Preskočite na sadržaj",
      home: "OSIRIS — početna stranica",
      language: "Jezik stranice",
      croatian: "Hrvatski",
      english: "English",
      primaryNavigation: "Glavna navigacija",
      navigationDialog: "Navigacija stranice",
      openNavigation: "Otvorite navigaciju",
      closeNavigation: "Zatvorite navigaciju",
      visitProject: (title) => `Otvorite web-stranicu projekta ${title}`,
      projectImage: (title) => `${title} — prikaz početne stranice`,
      projectDisciplines: (title) => `Područja rada na projektu ${title}`,
      portrait: "Crno-bijeli studijski portret",
      readNote: "Pročitajte bilješku",
      closeNote: "Zatvorite bilješku",
    },
  },
  en: {
    meta: {
      title: "OSIRIS — Independent creative studio",
      description: "OSIRIS connects strategy, identity, digital products, and campaigns into clear, recognisable systems.",
    },
    brand: {
      name: "OSIRIS",
      descriptor: "Independent creative studio",
      edition: "Hrvatski / English · 2026",
      contactLabel: "Send an inquiry",
    },
    navigation: [
      { label: "Work", href: "#work" },
      { label: "Services", href: "#services" },
      { label: "Studio", href: "#studio" },
      { label: "Notes", href: "#insights" },
      { label: "Inquiry", href: "#contact" },
    ],
    hero: {
      title: ["THE IDEA FIRST.", "EVERYTHING ELSE FOLLOWS."],
      description: "We connect strategy, identity, digital products, and campaigns into systems that speak clearly—and remain recognisable.",
      note: "Strategy · Identity · Digital · Campaigns",
    },
    work: {
      title: "Selected work",
      intro: "Five live websites. Five different industries. Every project begins with the same question: what needs to become clearer here?",
      liveSite: "Live website",
    },
    projectCopy: {
      "dolce-torte": { category: "Pastry · Website", description: "The offer comes first: a clear catalogue, legible categories, and a short path from selection to ordering.", tags: ["Web design", "Catalogue", "Responsive"] },
      sol: { category: "Wellness · Editorial website", description: "A calm, image-led website for somatic psychotherapy, structured around trust, clarity, and finding an appointment.", tags: ["Art direction", "Web design", "Responsive"] },
      "produkt-auto": { category: "Automotive · Platform", description: "A dark, inventory-led experience bringing vehicle discovery, filtering, and wholesale inquiries into one place.", tags: ["UX/UI", "Inventory", "Responsive"] },
      "tina-sport": { category: "Sport · League portal", description: "A forceful club portal organising fixtures, results, age groups, news, and galleries for players and families.", tags: ["Web design", "Content system", "Responsive"] },
      "dogan-septem": { category: "Interiors · Services", description: "A project-led website joining completed interiors, clear service information, and a direct route to requesting a quotation.", tags: ["Art direction", "Service design", "Responsive"] },
    },
    services: {
      title: "What we do",
      intro: "We do not sell packages. We assemble the right combination of strategy, identity, and delivery for the problem in front of us.",
      items: [
        { id: "brand-systems", title: "Brand systems", summary: "Positioning, identity, and a visual language that can keep working consistently after launch.", deliverables: ["Brand strategy", "Verbal direction", "Identity design", "Guidelines"] },
        { id: "digital-products", title: "Digital products", summary: "Websites and digital experiences shaped as part of the brand, not as a technical layer added afterwards.", deliverables: ["Experience strategy", "UX and UI design", "Creative development", "Design systems"] },
        { id: "campaign-worlds", title: "Campaign worlds", summary: "Launch ideas that remain recognisable across film, social media, editorial content, and space.", deliverables: ["Campaign concepts", "Art direction", "Motion language", "Launch toolkits"] },
      ],
    },
    studio: {
      title: "One idea. One responsibility.",
      lead: "One senior perspective guides the work from the first decision to the final detail.",
      copy: "We keep strategy, identity, and digital delivery in the same conversation. Decisions do not disappear between disciplines, and every detail continues the same idea.",
      note: "The direction stays connected from the opening conversation to release.",
      capabilitiesTitle: "Disciplines",
      capabilities: ["Strategy", "Identity", "Interface", "Campaign", "Motion", "Creative code"],
      principle: "The work should feel inevitable: every decision connected, every detail earning its place.",
      attribution: "OSIRIS studio principle",
    },
    insights: {
      title: "Notes from the work",
      intro: "Three short observations on brands, interfaces, and ideas that need to outlive their launch.",
      items: [
        { id: "systems", category: "Brand systems", title: "Why recognition matters more than sameness", date: "Field note 01", excerpt: "Consistency repeats the same answer. Recognition gives a brand enough structure to answer differently without becoming someone else." },
        { id: "interfaces", category: "Digital products", title: "The interface is already speaking", date: "Field note 02", excerpt: "Spacing, waiting, and error states all have a voice. Product design becomes brand design when those quiet moments are treated as deliberately as the homepage." },
        { id: "launches", category: "Campaigns", title: "A launch idea needs a life after week one", date: "Field note 03", excerpt: "A strong campaign is not one perfect image. It is a rule set that keeps producing relevant expressions after the opening moment." },
      ],
    },
    faq: {
      title: "Before the first conversation",
      intro: "Short answers to the practical questions about working together.",
      items: [
        { id: "fit", question: "Which projects fit the studio best?", answer: "Projects built around a meaningful change: a new company, a clearer position, a product entering its next stage, or a campaign that needs its own world." },
        { id: "process", question: "How does a project begin?", answer: "With one focused conversation. We map the decision, audience, and constraints before proposing the scope, team, and sequence of work." },
        { id: "build", question: "Do you design and build websites?", answer: "Yes. We can carry a website from experience strategy through visual design and front-end delivery, or work alongside your existing engineering team." },
        { id: "partners", question: "Can you join our team?", answer: "Yes. We can lead creative direction or join an established product, marketing, or production structure where senior design attention is needed." },
        { id: "timeline", question: "When should we get in touch?", answer: "The starting point depends on the scope and team involved. Include the intended launch window in your inquiry so we begin with the right context." },
      ],
    },
    contact: {
      title: "Tell us what must change.",
      copy: "Tell us what is changing, what is stuck, and what the work needs to achieve.",
      directEmail: "Or write directly",
      privacy: "This website neither stores nor sends your information. It prepares a message that is sent only when you press Send in your email application.",
      form: {
        labels: { name: "Your name", email: "Email address", company: "Company or team", service: "Primary need", budget: "Working budget", timeline: "Ideal timing", brief: "Project brief" },
        required: "Required",
        optional: "Optional",
        choose: "Choose",
        placeholder: "What needs to change, and why now?",
        options: {
          services: { "brand-systems": "Brand systems", "digital-products": "Digital products", "campaign-worlds": "Campaign worlds", "not-sure": "Not sure yet" },
          budgets: { exploring: "Exploring scope", "under-15": "Under €15,000", "15-35": "€15,000–€35,000", "35-plus": "More than €35,000" },
          timelines: { asap: "As soon as possible", "one-two": "Within 1–2 months", "three-six": "Within 3–6 months", exploring: "Still exploring" },
        },
        validation: {
          name: "The name is too short. Add at least two characters so we know who to reply to.",
          email: "The email address is incomplete. Use an address such as name@studio.com.",
          service: "No primary need is selected. Choose the area closest to your project.",
          timeline: "No timing is selected. Choose the option that best describes the project.",
          brief: "The brief is too short. Add at least 20 characters about what needs to change.",
        },
        submit: "Prepare inquiry",
        prepared: "The message is ready in your email application.",
        fallback: "Open the prepared message",
      },
    },
    footer: { statement: "Make the next thing unmistakable.", meta: "Independent creative studio · HR / EN" },
    a11y: {
      skip: "Skip to content",
      home: "OSIRIS — home",
      language: "Website language",
      croatian: "Hrvatski",
      english: "English",
      primaryNavigation: "Primary navigation",
      navigationDialog: "Website navigation",
      openNavigation: "Open navigation",
      closeNavigation: "Close navigation",
      visitProject: (title) => `Visit the ${title} website`,
      projectImage: (title) => `${title} website homepage`,
      projectDisciplines: (title) => `${title} project disciplines`,
      portrait: "Black-and-white studio portrait",
      readNote: "Read note",
      closeNote: "Close note",
    },
  },
};

export function normaliseLocale(locale) {
  return SUPPORTED_LOCALES.includes(locale) ? locale : DEFAULT_LOCALE;
}

export function getSiteContent(locale = DEFAULT_LOCALE) {
  const selectedLocale = normaliseLocale(locale);
  const localised = contentByLocale[selectedLocale];

  return {
    ...localised,
    locale: selectedLocale,
    projects: PROJECT_FACTS.map((project) => ({
      ...project,
      ...localised.projectCopy[project.id],
    })),
  };
}
