/**
 * LEISTUNGEN – Inhalte für Karten, Übersicht und die fünf Landingpages.
 * Jede Leistung hat eigene Meta-Daten für die zugehörige Google-Ads-Anzeigengruppe.
 */
import buero from '../assets/images/buero.png';
import treppenhaus from '../assets/images/treppenhaus.png';
import fenster from '../assets/images/fenster.png';
import hebebuehne from '../assets/images/hebebuehne-fassade.jpg';
import kita from '../assets/images/kita.png';
import stein from '../assets/images/stein.png';

export type Faq = { q: string; a: string };

export type Service = {
  slug: string;
  /** Kurzname für Karten, Formular-Auswahl und Navigation */
  name: string;
  /** Kurzform für das Multi-Step-Formular */
  short: string;
  icon: string;
  /** Teaser auf Karten */
  teaser: string;
  /** SEO / Google Ads */
  metaTitle: string;
  metaDescription: string;
  /** Landingpage */
  h1: string;
  intro: string;
  image: ImageMetadata;
  imageAlt: string;
  secondaryImage?: ImageMetadata;
  secondaryImageAlt?: string;
  benefits: { icon: string; title: string; text: string }[];
  checklistTitle: string;
  checklist: string[];
  objects: string[];
  faq: Faq[];
  cta: { title: string; text: string; button: string };
};

export const services: Service[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: 'bueroreinigung',
    name: 'Büro- & Unterhaltsreinigung',
    short: 'Büroreinigung',
    icon: 'lucide:building-2',
    teaser:
      'Täglich, mehrmals wöchentlich oder nach Bedarf: saubere Büros, Sanitärräume und Teeküchen – außerhalb Ihrer Geschäftszeiten.',
    metaTitle: 'Büroreinigung Frankfurt | Unterhaltsreinigung für Büros & Verwaltungen',
    metaDescription:
      'Professionelle Büroreinigung in Frankfurt am Main & Rhein-Main: festes Reinigungsteam, digitale Leistungsnachweise, flexible Intervalle. Jetzt Angebot in 60 Sekunden anfragen.',
    h1: 'Büroreinigung in Frankfurt – zuverlässig, diskret, auf Ihren Takt abgestimmt',
    intro:
      'Ein sauberes Büro ist Ihre Visitenkarte gegenüber Kunden und Mitarbeitenden. Wir übernehmen die laufende Unterhaltsreinigung für Büros, Kanzleien, Agenturen und Verwaltungen in Frankfurt und dem Rhein-Main-Gebiet – mit festem Personal, klaren Checklisten und digitaler Dokumentation jeder Reinigung.',
    image: buero,
    imageAlt:
      'Zwei Reinigungskräfte der Ideale Gebäudereinigung reinigen abends ein Großraumbüro: Schreibtisch wird abgewischt, Teppichboden gesaugt',
    secondaryImage: treppenhaus,
    secondaryImageAlt: 'Reinigungskraft wischt ein helles Treppenhaus mit Flachmopp, Reinigungswagen im Hintergrund',
    benefits: [
      { icon: 'lucide:users', title: 'Festes Team für Ihr Objekt', text: 'Immer dieselben, eingewiesenen Kräfte – sie kennen Ihre Räume, Ihre Abläufe und Ihre Ansprechpersonen.' },
      { icon: 'lucide:clock', title: 'Reinigung außerhalb der Bürozeiten', text: 'Früh morgens, abends oder am Wochenende: Ihr Betrieb läuft ungestört weiter.' },
      { icon: 'lucide:clipboard-check', title: 'Digitale Leistungsnachweise', text: 'Jede Reinigung wird per Checkliste dokumentiert. Sie sehen, was wann erledigt wurde.' },
      { icon: 'lucide:repeat', title: 'Flexible Intervalle', text: 'Täglich bis einmal wöchentlich, saisonale Anpassung und Zusatzleistungen auf Abruf.' },
    ],
    checklistTitle: 'Das umfasst unsere Unterhaltsreinigung',
    checklist: [
      'Arbeitsplätze, Schreibtische und Ablagen abwischen',
      'Böden saugen und feucht wischen (Teppich, Hartboden, Designbelag)',
      'Sanitärräume desinfizierend reinigen und Verbrauchsmaterial auffüllen',
      'Teeküchen und Pausenräume inkl. Spülen und Oberflächen',
      'Besprechungsräume, Empfang und Eingangsbereiche',
      'Papierkörbe leeren, Mülltrennung und Entsorgung',
      'Glasflächen innen: Türen, Trennwände, Fingerabdrücke',
      'Treppenhäuser, Flure und Aufzüge',
      'Optional: Tiefgarage, Außenanlagen, Grundreinigung im Turnus',
    ],
    objects: ['Büros & Großraumbüros', 'Kanzleien & Steuerberatungen', 'Agenturen & Start-ups', 'Coworking-Spaces', 'Banken & Versicherungen', 'Verwaltungen & Behörden'],
    faq: [
      { q: 'Wie schnell können Sie mit der Büroreinigung starten?', a: 'Nach Ihrer Anfrage vereinbaren wir kurzfristig eine kostenlose Besichtigung. Danach erhalten Sie ein individuelles Angebot mit Leistungsverzeichnis. Der Start ist in der Regel innerhalb weniger Werktage nach Beauftragung möglich.' },
      { q: 'Reinigen Sie auch außerhalb unserer Geschäftszeiten?', a: 'Ja. Die meisten unserer Büroobjekte reinigen wir früh morgens, abends oder am Wochenende. Schlüssel- bzw. Transponderübergabe und Alarmsicherung regeln wir schriftlich mit Ihnen.' },
      { q: 'Wer kommt zu uns – wechselt das Personal ständig?', a: 'Nein. Wir setzen feste, eingewiesene Reinigungskräfte pro Objekt ein. Bei Urlaub oder Krankheit übernehmen eingearbeitete Springer aus demselben Team.' },
      { q: 'Wie wird die Qualität kontrolliert?', a: 'Unsere Objektleitung führt regelmäßige Qualitätskontrollen durch. Jede Reinigung wird digital per Checkliste erfasst, Abweichungen werden sofort nachgebessert.' },
      { q: 'Gibt es Mindestlaufzeiten?', a: 'Wir bieten Verträge mit fairen, branchenüblichen Laufzeiten und Kündigungsfristen an. Details klären wir transparent im Angebot – ohne Kleingedrucktes.' },
    ],
    cta: {
      title: 'Büroreinigung in Frankfurt anfragen',
      text: 'In 60 Sekunden zur Anfrage: Fläche angeben, Kontaktdaten hinterlassen – wir melden uns mit einem Besichtigungstermin.',
      button: 'Angebot für Büroreinigung anfragen',
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'glas-und-fassadenreinigung',
    name: 'Glas- & Fassadenreinigung',
    short: 'Glas & Fassade',
    icon: 'lucide:layout-grid',
    teaser:
      'Streifenfreie Glasflächen und gepflegte Fassaden – von der Schaufensterfront bis zum Bürohochhaus, mit Hebebühne oder Teleskopsystem.',
    metaTitle: 'Glasreinigung & Fassadenreinigung Frankfurt | Fenster, Glasfassaden, Hochhaus',
    metaDescription:
      'Glas- und Fassadenreinigung in Frankfurt & Rhein-Main: Fensterreinigung, Glasfassaden, Hebebühneneinsatz, Osmose-Technik. Für Büros, Handel und Industrie. Angebot anfragen.',
    h1: 'Glas- & Fassadenreinigung in Frankfurt – streifenfrei bis in die obersten Etagen',
    intro:
      'Glasfassaden prägen das Frankfurter Stadtbild – und zeigen jede Verschmutzung. Wir reinigen Fenster, Glasfassaden, Rahmen und Fassadenflächen in allen Höhen: mit Teleskopstangen und Reinwasser-Technik, per Hebebühne oder über Fassadenbefahranlagen. Sicher, planbar und ohne Störung Ihres Betriebs.',
    image: fenster,
    imageAlt: 'Glasreiniger der Ideale Gebäudereinigung zieht eine Glasfassade eines Bürogebäudes mit dem Abzieher streifenfrei ab',
    secondaryImage: hebebuehne,
    secondaryImageAlt: 'Hebebühne im Einsatz an der Glasfassade eines mehrstöckigen Bürogebäudes zur Fassadenreinigung',
    benefits: [
      { icon: 'lucide:droplets', title: 'Reinwasser- & Osmose-Technik', text: 'Kalk- und streifenfreie Ergebnisse ohne Chemie – ideal für große Glasfronten und Photovoltaik.' },
      { icon: 'lucide:building', title: 'Höhenarbeit mit Hebebühne', text: 'Hochhäuser, Atrien und schwer zugängliche Flächen reinigen wir mit Hubarbeitsbühnen und passender Sicherungstechnik.' },
      { icon: 'lucide:calendar', title: 'Turnusreinigung planbar', text: 'Monatlich, quartalsweise oder saisonal – wir erinnern Sie rechtzeitig an den nächsten Termin.' },
      { icon: 'lucide:shield-check', title: 'Versichert & dokumentiert', text: 'Einsätze werden geplant, abgesichert und mit Leistungsnachweis dokumentiert.' },
    ],
    checklistTitle: 'Leistungsumfang Glas & Fassade',
    checklist: [
      'Fensterreinigung innen und außen inkl. Rahmen und Falze',
      'Glasfassaden, Vordächer, Glasdächer und Wintergärten',
      'Schaufenster und Eingangsportale im Einzelhandel',
      'Fassadenreinigung (Putz, Klinker, Metall, Alu-Verbundplatten)',
      'Entfernung von Algen, Moos und Umweltschmutz',
      'Reinigung von Werbeanlagen, Schildern und Leuchtkästen',
      'Photovoltaik- und Solaranlagen mit Reinwasser',
      'Einsatz mit Hebebühne, Teleskopsystem oder Fassadenbefahranlage',
    ],
    objects: ['Bürohochhäuser & Glasfassaden', 'Einzelhandel & Schaufenster', 'Autohäuser', 'Hotels & Gastronomie', 'Schulen & öffentliche Gebäude', 'Industrie- & Logistikhallen'],
    faq: [
      { q: 'Wie oft sollten Glasfassaden gereinigt werden?', a: 'Für repräsentative Büro- und Handelsflächen in Frankfurt empfehlen wir eine Außenreinigung alle 4 bis 12 Wochen, je nach Lage und Verkehrsaufkommen. Wir legen den Turnus gemeinsam bei der Besichtigung fest.' },
      { q: 'Benötigen Sie für die Hebebühne eine Genehmigung?', a: 'Steht die Bühne auf öffentlichem Grund, ist eine Sondernutzungserlaubnis der Stadt nötig. Die Beantragung übernehmen wir auf Wunsch für Sie.' },
      { q: 'Reinigen Sie auch bei laufendem Betrieb?', a: 'Ja. Außenreinigungen stören den Betrieb nicht, Innenreinigungen planen wir in Randzeiten. Arbeitsbereiche werden abgesichert und ausgeschildert.' },
      { q: 'Was ist der Vorteil der Osmose-Reinigung?', a: 'Entmineralisiertes Wasser löst Schmutz und trocknet ohne Rückstände ab. Das Ergebnis ist streifenfrei, ohne Reinigungsmittel und mit längerer Wirkung, da keine Tensidreste Schmutz anziehen.' },
    ],
    cta: {
      title: 'Glas- oder Fassadenreinigung anfragen',
      text: 'Nennen Sie uns Objekt und ungefähre Glasfläche – wir melden uns mit einem Besichtigungstermin und einem klaren Angebot.',
      button: 'Angebot für Glasreinigung anfragen',
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'baureinigung',
    name: 'Baureinigung & Bauendreinigung',
    short: 'Baureinigung',
    icon: 'lucide:hard-hat',
    teaser:
      'Von der Baugrobreinigung bis zur bezugsfertigen Endreinigung: termintreu, mit eigenem Personal und Entsorgung aus einer Hand.',
    metaTitle: 'Baureinigung & Bauendreinigung Frankfurt | Bezugsfertig zum Übergabetermin',
    metaDescription:
      'Baureinigung in Frankfurt & Rhein-Main: Baugrobreinigung, Bauzwischenreinigung, Bauendreinigung und Bauschlussreinigung für Bauträger, GU und Hausverwaltungen. Jetzt Termin sichern.',
    h1: 'Baureinigung & Bauendreinigung in Frankfurt – bezugsfertig zum Übergabetermin',
    intro:
      'Zwischen Rohbau und Schlüsselübergabe zählt jeder Tag. Wir reinigen Neubauten, Sanierungen und Mieterausbauten in allen Bauphasen – von der Grobreinigung über die Zwischenreinigung bis zur Feinreinigung vor der Abnahme. Mit festen Teams, kurzfristiger Verfügbarkeit und klaren Übergabeprotokollen.',
    image: treppenhaus,
    imageAlt: 'Frisch gereinigtes Treppenhaus mit Natursteinstufen nach der Bauendreinigung, Reinigungskraft mit Flachmopp',
    benefits: [
      { icon: 'lucide:timer', title: 'Termintreue zur Abnahme', text: 'Wir planen rückwärts vom Übergabetermin und arbeiten bei Bedarf in Schichten oder am Wochenende.' },
      { icon: 'lucide:users', title: 'Skalierbare Teams', text: 'Vom einzelnen Mieterausbau bis zum Bürokomplex – wir stellen die passende Mannschaft.' },
      { icon: 'lucide:shield-check', title: 'Sicher auf der Baustelle', text: 'Eingewiesenes Personal, Schutzausrüstung und Abstimmung mit der Bauleitung.' },
      { icon: 'lucide:file-text', title: 'Übergabeprotokoll', text: 'Dokumentierte Abnahme Raum für Raum – damit Sie dem Bauherrn sauber übergeben.' },
    ],
    checklistTitle: 'Unsere Baureinigung Schritt für Schritt',
    checklist: [
      'Baugrobreinigung: Bauschutt, Staub und Verpackungsreste entfernen',
      'Bauzwischenreinigung vor Maler-, Boden- und Elektroarbeiten',
      'Bauendreinigung: Böden, Fenster, Rahmen, Türen, Heizkörper',
      'Entfernen von Mörtel-, Farb-, Silikon- und Klebstoffresten',
      'Sanitärobjekte und Küchen entkalken, desinfizieren, polieren',
      'Glas- und Fensterreinigung inkl. Etikettenentfernung',
      'Reinigung von Lüftungsgittern, Lichtschaltern und Steckdosen',
      'Entsorgung von Baustellenabfällen nach Fraktionen',
      'Feinreinigung und Abnahmebegleitung mit der Bauleitung',
    ],
    objects: ['Bürogebäude & Mieterausbau', 'Wohnanlagen & Quartiere', 'Einzelhandel & Shopfitting', 'Praxen & Kliniken', 'Hotels', 'Industrie- & Logistikbauten'],
    faq: [
      { q: 'Wie kurzfristig können Sie eine Bauendreinigung übernehmen?', a: 'Je nach Objektgröße häufig innerhalb weniger Tage. Teilen Sie uns Übergabetermin und Fläche mit – wir prüfen sofort unsere Kapazitäten und bestätigen verbindlich.' },
      { q: 'Was ist der Unterschied zwischen Bauend- und Bauschlussreinigung?', a: 'Die Bauendreinigung erfolgt nach Abschluss aller Gewerke und beseitigt Baustaub und Rückstände. Die Bauschluss- oder Feinreinigung ist der letzte Durchgang unmittelbar vor Übergabe – damit das Objekt wirklich bezugsfertig ist.' },
      { q: 'Übernehmen Sie auch die Entsorgung?', a: 'Ja. Baustellenabfälle sortieren und entsorgen wir fachgerecht nach Fraktionen. Containerstellung organisieren wir auf Wunsch mit.' },
      { q: 'Arbeiten Sie mit Subunternehmern?', a: 'Wir setzen auf eigenes, eingewiesenes Personal unter Leitung unserer Objektleitung. So bleiben Qualität und Termintreue in unserer Hand.' },
    ],
    cta: {
      title: 'Baureinigung terminieren',
      text: 'Übergabetermin, Fläche, Bauphase – mehr brauchen wir nicht für ein schnelles, belastbares Angebot.',
      button: 'Angebot für Baureinigung anfragen',
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'praxisreinigung',
    name: 'Praxis- & Hygienereinigung',
    short: 'Praxisreinigung',
    icon: 'lucide:stethoscope',
    teaser:
      'Hygienereinigung nach Hygieneplan für Arztpraxen, Zahnarztpraxen, Therapiezentren, Kitas und Bildungseinrichtungen – diskret und dokumentiert.',
    metaTitle: 'Praxisreinigung Frankfurt | Hygienereinigung für Praxen, Kitas & Einrichtungen',
    metaDescription:
      'Praxis- und Hygienereinigung in Frankfurt & Rhein-Main nach Hygieneplan: geschultes Personal, desinfizierende Reinigung, lückenlose Dokumentation. Für Arzt-, Zahnarztpraxen, Kitas und Schulen.',
    h1: 'Praxis- & Hygienereinigung in Frankfurt – nach Hygieneplan, lückenlos dokumentiert',
    intro:
      'In Praxen, Therapiezentren, Kitas und Schulen ist Sauberkeit mehr als Optik: Sie ist Teil des Infektionsschutzes. Unsere Teams reinigen nach Ihrem Hygieneplan, mit geprüften Desinfektionsmitteln, farbcodiertem Material und einer Dokumentation, die Sie bei Begehungen vorlegen können.',
    image: kita,
    imageAlt: 'Reinigungsteam der Ideale Gebäudereinigung reinigt einen Gruppenraum einer Kita mit Scheuersaugmaschine und wischt Tische desinfizierend ab',
    benefits: [
      { icon: 'lucide:shield-check', title: 'Reinigung nach Hygieneplan', text: 'Wir arbeiten nach Ihrem Hygiene- und Desinfektionsplan und stimmen Mittel sowie Einwirkzeiten mit Ihrer Hygienebeauftragten ab.' },
      { icon: 'lucide:user-check', title: 'Geschultes, festes Personal', text: 'Unterwiesene Kräfte mit Hygieneschulung, Verschwiegenheitsverpflichtung und festem Einsatzobjekt.' },
      { icon: 'lucide:clipboard-check', title: 'Dokumentation für Begehungen', text: 'Digitale Reinigungs- und Desinfektionsnachweise – jederzeit abrufbar.' },
      { icon: 'lucide:brush', title: 'Farbcodiertes 4-Farben-System', text: 'Getrennte Tücher und Mopps je Bereich verhindern Keimverschleppung zwischen Behandlungs-, Sanitär- und Wartebereich.' },
    ],
    checklistTitle: 'Leistungsumfang Praxis & Hygiene',
    checklist: [
      'Desinfizierende Reinigung von Behandlungs- und Untersuchungsräumen',
      'Wartebereiche, Anmeldung und Patienten-WCs',
      'Kontaktflächen: Türklinken, Lichtschalter, Handläufe, Liegen',
      'Böden wischdesinfizieren nach Flächenplan',
      'Sanitär- und Wickelbereiche in Kitas und Schulen',
      'Gruppen-, Schlaf- und Bewegungsräume inkl. Spielmaterial-Oberflächen',
      'Sozialräume, Teeküchen und Personalbereiche',
      'Auffüllen von Seife, Desinfektionsmittel und Papier',
      'Optional: Grundreinigung in Ferien- und Schließzeiten',
    ],
    objects: ['Arzt- & Zahnarztpraxen', 'Physiotherapie & Therapiezentren', 'Medizinische Versorgungszentren (MVZ)', 'Kitas & Kindergärten', 'Schulen & Bildungsträger', 'Labore & Apotheken'],
    faq: [
      { q: 'Arbeiten Sie nach den Vorgaben des RKI bzw. unserem Hygieneplan?', a: 'Ja. Grundlage ist immer Ihr einrichtungsspezifischer Hygieneplan. Desinfektionsmittel wählen wir aus den gelisteten Produkten (VAH) und halten Konzentration und Einwirkzeit ein.' },
      { q: 'Wann reinigen Sie die Praxis?', a: 'In der Regel nach Praxisschluss oder vor Praxisbeginn, damit der Betrieb nicht gestört wird. Für Kitas und Schulen planen wir Zeiten nach Betreuungs- bzw. Unterrichtsende.' },
      { q: 'Sind Ihre Mitarbeitenden zur Verschwiegenheit verpflichtet?', a: 'Alle Reinigungskräfte in Praxisobjekten unterzeichnen eine Verschwiegenheitserklärung nach DSGVO und werden entsprechend unterwiesen.' },
      { q: 'Können Sie kurzfristig eine Desinfektionsreinigung durchführen?', a: 'Ja, z. B. nach Infektionsfällen oder vor Begehungen. Sprechen Sie uns an – wir disponieren kurzfristig ein Team.' },
    ],
    cta: {
      title: 'Praxis- oder Hygienereinigung anfragen',
      text: 'Nennen Sie uns Einrichtungsart und Fläche – wir melden uns zeitnah für eine Besichtigung und ein Angebot nach Hygieneplan.',
      button: 'Angebot für Praxisreinigung anfragen',
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'grundreinigung',
    name: 'Sonder- & Grundreinigung',
    short: 'Grundreinigung',
    icon: 'lucide:sparkles',
    teaser:
      'Intensivreinigung für Böden, Teppiche, Steinflächen und Außenbereiche – einmalig, saisonal oder als Ergänzung zur Unterhaltsreinigung.',
    metaTitle: 'Grundreinigung & Sonderreinigung Frankfurt | Böden, Teppich, Steinflächen',
    metaDescription:
      'Grundreinigung und Sonderreinigung in Frankfurt & Rhein-Main: Bodengrundreinigung, Teppichreinigung, Steinflächen- und Pflasterreinigung, Tiefgaragen. Maschinell, gründlich, termingerecht.',
    h1: 'Sonder- & Grundreinigung in Frankfurt – wenn normale Reinigung nicht mehr reicht',
    intro:
      'Verschlissene Beschichtungen, graue Teppiche, vermooste Pflasterflächen: Mit maschineller Grundreinigung bringen wir stark beanspruchte Flächen zurück in den Sollzustand. Einmalig, im festen Turnus oder als Sonderreinigung nach Veranstaltungen, Umzügen und Wasserschäden.',
    image: stein,
    imageAlt: 'Mitarbeiter der Ideale Gebäudereinigung reinigt eine vermooste Pflasterfläche mit einem Flächenreiniger – links verschmutzt, rechts bereits sauber',
    benefits: [
      { icon: 'lucide:zap', title: 'Maschinell & materialgerecht', text: 'Scheuersaugmaschinen, Einscheibenmaschinen, Sprühextraktion, Flächenreiniger – abgestimmt auf Belag und Verschmutzung.' },
      { icon: 'lucide:leaf', title: 'Schonende Reinigungsmittel', text: 'Wir setzen auf umweltverträgliche Produkte und dosieren exakt – gut für Material, Mensch und Umwelt.' },
      { icon: 'lucide:calendar', title: 'Flexibel terminierbar', text: 'Abends, am Wochenende oder in Betriebsferien – wir arbeiten, wenn es Ihren Betrieb am wenigsten stört.' },
      { icon: 'lucide:badge-check', title: 'Werterhalt Ihrer Immobilie', text: 'Regelmäßige Grundreinigung und Neubeschichtung verlängern die Lebensdauer von Böden spürbar.' },
    ],
    checklistTitle: 'Typische Sonder- und Grundreinigungen',
    checklist: [
      'Bodengrundreinigung mit Entschichtung und Neubeschichtung (Linoleum, PVC, Kautschuk)',
      'Natur- und Kunststeinreinigung, Kristallisation und Imprägnierung',
      'Teppich- und Polsterreinigung per Sprühextraktion',
      'Pflaster-, Terrassen- und Wegeflächen mit Flächenreiniger',
      'Tiefgaragen- und Parkdeckreinigung inkl. Markierungen',
      'Reinigung nach Umzug, Renovierung oder Veranstaltung',
      'Industriereinigung: Hallenböden, Maschinenumfeld, Hochregale',
      'Glas- und Rahmengrundreinigung, Jalousien und Lamellen',
      'Entfernung von Graffiti und Kaugummi (Objektabhängig)',
    ],
    objects: ['Bürokomplexe & Foyers', 'Tiefgaragen & Parkhäuser', 'Einzelhandel & Gastronomie', 'Industrie & Logistik', 'Wohnanlagen & Hausverwaltungen', 'Außenanlagen & Eingangsbereiche'],
    faq: [
      { q: 'Wie oft ist eine Grundreinigung sinnvoll?', a: 'Bei stark frequentierten Flächen ein- bis zweimal jährlich, bei beschichteten Böden abhängig vom Zustand der Beschichtung. Wir beurteilen das bei der Besichtigung und geben eine ehrliche Empfehlung.' },
      { q: 'Wie lange dauert eine Grundreinigung?', a: 'Das hängt von Fläche, Belag und Verschmutzung ab. Kleinere Flächen schaffen wir an einem Abend, größere Objekte planen wir in Abschnitten oder am Wochenende, damit der Betrieb weiterläuft.' },
      { q: 'Können Sie auch kurzfristig nach einem Wasserschaden helfen?', a: 'Ja. Für Sonderreinigungen nach Wasserschäden, Veranstaltungen oder Umzügen halten wir Kapazitäten bereit. Rufen Sie uns an – wir reagieren schnellstmöglich.' },
      { q: 'Bieten Sie die Grundreinigung auch als Einmalauftrag an?', a: 'Selbstverständlich. Sie benötigen keinen laufenden Vertrag. Viele Kunden kombinieren später eine turnusmäßige Grundreinigung mit der Unterhaltsreinigung.' },
    ],
    cta: {
      title: 'Grund- oder Sonderreinigung anfragen',
      text: 'Beschreiben Sie Fläche und Belag – wir melden uns mit Terminvorschlag und Festpreisangebot.',
      button: 'Angebot für Grundreinigung anfragen',
    },
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

/** Auswahl im Multi-Step-Formular (inkl. Sonstiges) */
export const formServiceOptions = [
  ...services.map((s) => ({ value: s.name, label: s.name, icon: s.icon })),
  { value: 'Sonstiges / Beratung', label: 'Sonstiges / Beratung', icon: 'lucide:lightbulb' },
];
