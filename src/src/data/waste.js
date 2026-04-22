export const BINS = {
  yellow: {
    label: 'Gelbe Tonne',
    color: 'var(--bin-yellow)',
    textColor: 'oklch(30% 0.08 75)',
    bg: 'oklch(96% 0.06 88)',
    icon: '♻️',
    title: 'Wertstoffe',
    shortDesc: 'Kunststoffe, Metall & Verpackungen',
    instruction:
      'Behälter vor der Entsorgung entleeren und ausspülen. Kartons wenn möglich flach drücken.',
    accepts: [
      'Plastikflaschen & -behälter',
      'Metalldosen & -büchsen',
      'Tetra Paks & Verbundkartons',
      'Alufolie (sauber)',
    ],
    rejects: ['Plastiktüten', 'Styropor', 'Fettverschmutzte Verpackungen'],
  },
  blue: {
    label: 'Papiertonne',
    color: 'var(--bin-blue)',
    textColor: 'white',
    bg: 'oklch(93% 0.04 235)',
    icon: '📄',
    title: 'Papier & Pappe',
    shortDesc: 'Sauberes Papier und Pappe',
    instruction:
      'Papier trocken halten. Pappkartons flach zusammenlegen. Plastikfenster aus Briefumschlägen entfernen.',
    accepts: [
      'Zeitungen & Zeitschriften',
      'Büropapier',
      'Pappkartons',
      'Bücher & Kataloge',
    ],
    rejects: ['Pizzakartons (fettig)', 'Gewachstes Papier', 'Taschentücher', 'Pappbecher'],
  },
  brown: {
    label: 'Biotonne',
    color: 'var(--bin-brown)',
    textColor: 'white',
    bg: 'oklch(94% 0.025 65)',
    icon: '🌿',
    title: 'Bioabfall',
    shortDesc: 'Lebensmittelreste & Gartenabfälle',
    instruction:
      'Lebensmittelreste in Zeitung einwickeln oder kompostierbare Beutel verwenden. Bei Heimkompostern kein Fleisch oder Milchprodukte.',
    accepts: [
      'Obst- & Gemüsereste',
      'Kaffeesatz & Filter',
      'Rasenschnitt',
      'Eierschalen',
    ],
    rejects: ['Fleisch & Fisch (Heimkompost)', 'Milchprodukte', 'Öle & Fette'],
  },
  black: {
    label: 'Restmülltonne',
    color: 'var(--bin-black)',
    textColor: 'white',
    bg: 'oklch(93% 0.01 80)',
    icon: '🗑️',
    title: 'Restmüll',
    shortDesc: 'Nicht recycelbarer Abfall',
    instruction:
      'Dies ist der letzte Ausweg. Wenn ein Artikel weder recycelt noch kompostiert werden kann, kommt er hier rein.',
    accepts: [
      'Verunreinigte Verpackungen',
      'Windeln & Hygieneprodukte',
      'Kaputtes Keramikgeschirr',
      'Staubsaugerbeutel',
    ],
    rejects: ['Sondermüll', 'Elektrogeräte', 'Batterien', 'Chemikalien'],
  },
  green: {
    label: 'Glascontainer',
    color: 'var(--bin-green)',
    textColor: 'white',
    bg: 'oklch(93% 0.04 155)',
    icon: '🍾',
    title: 'Glas',
    shortDesc: 'Flaschen & Gläser',
    instruction:
      'Flaschen und Gläser ausspülen. Deckel und Korken entfernen. Zu einem Glascontainer in der Nähe bringen.',
    accepts: [
      'Glasflaschen (alle Farben)',
      'Einmachgläser',
      'Wein- & Bierflaschen',
    ],
    rejects: ['Fensterglas', 'Spiegel', 'Pyrex / ofenfestes Glas', 'Trinkgläser'],
  },
  special: {
    label: 'Sondermüll',
    color: 'var(--bin-orange)',
    textColor: 'white',
    bg: 'oklch(95% 0.05 55)',
    icon: '⚠️',
    title: 'Sondermüll',
    shortDesc: 'Batterien, Elektroschrott & Gefahrenstoffe',
    instruction:
      'Nicht in den Hausmüll. Zu einem Recyclinghof, einem Händler-Rücknahmesystem oder einer ausgewiesenen Sammelstelle bringen.',
    accepts: [
      'Batterien',
      'Elektrogeräte & Elektroschrott',
      'Farben & Chemikalien',
      'Leuchtstoffröhren',
    ],
    rejects: ['Niemals in den Hausmüll'],
  },
}

export const DEMO_RESULTS = [
  { bin: 'yellow', confidence: 0.91, items: ['Plastikflasche', 'PET-Behälter'] },
  { bin: 'blue',   confidence: 0.87, items: ['Zeitung', 'Pappkarton'] },
  { bin: 'brown',  confidence: 0.93, items: ['Apfelkern', 'Gemüseschalen'] },
  { bin: 'black',  confidence: 0.78, items: ['Styropor', 'Verschmutzte Verpackung'] },
  { bin: 'green',  confidence: 0.96, items: ['Glasflasche', 'Weinflasche'] },
  { bin: 'special',confidence: 0.88, items: ['Batterie', 'Altes Handy'] },
]

export const FAQS = [
  {
    q: 'Wo werden meine Fotos verarbeitet?',
    a: 'Deine Fotos werden vollständig in deinem Browser analysiert, mithilfe eines lokal geladenen KI-Modells von Teachable Machine (Google). Die Bilddaten werden niemals auf unsere Server oder externe Dienste übertragen. Die Verarbeitung erfolgt zu 100 % auf deinem Gerät.',
  },
  {
    q: 'Werden meine Bilder gespeichert oder weitergegeben?',
    a: 'Nein. Wir speichern, behalten oder teilen keine von dir hochgeladenen Bilder. Sobald du die Seite schließt oder neu lädst, werden alle Bilddaten dauerhaft aus dem Arbeitsspeicher deines Geräts gelöscht. Wir haben keine serverseitige Speicherung für hochgeladene Fotos.',
  },
  {
    q: 'Welche Daten sammelt WasteLense?',
    a: 'WasteLense sammelt keine personenbezogenen Daten. Wir verwenden keine Tracking-Cookies, erfassen keine mit Bildübertragungen verknüpften IP-Adressen und setzen keine Analysetools ein, die einzelne Nutzer identifizieren. Die einzigen lokal gespeicherten Daten sind die KI-Modellgewichte, die im Browser für bessere Performance zwischengespeichert werden.',
  },
  {
    q: 'Ist die KI-Klassifizierung immer korrekt?',
    a: 'Das Modell ist auf einem breiten Datensatz gängiger Haushaltsabfälle trainiert und erzielt bei typischen Artikeln eine hohe Genauigkeit. KI-Klassifizierung ist jedoch nicht fehlerfrei — bei ungewöhnlichen, gemischten oder schwer erkennbaren Artikeln solltest du die Abfallrichtlinien deiner Gemeinde oder den Tonnen-Guide zurate ziehen.',
  },
  {
    q: 'Welche KI-Technologie steckt hinter der Klassifizierung?',
    a: 'WasteLense nutzt Googles Teachable Machine Framework für Bildklassifizierung, das direkt in deinem Browser mit TensorFlow.js läuft. Die Modellgewichte werden einmalig geladen und lokal gespeichert. Nach dem ersten Laden ist keine Internetverbindung mehr erforderlich.',
  },
  {
    q: 'Meine lokalen Recyclingregeln sind anders — was soll ich tun?',
    a: 'Recyclingregeln unterscheiden sich erheblich je nach Gemeinde und Land. Die angezeigten Hinweise sind allgemeine Best-Practice-Empfehlungen (üblich im DACH-Raum). Im Zweifel immer die spezifischen Richtlinien deiner lokalen Abfallwirtschaft befolgen.',
  },
  {
    q: 'Wie kann ich meine Mülltrennung verbessern?',
    a: 'Die größte Verbesserung ist das Ausspülen von Behältern vor dem Recycling — verschmutzte Verpackungen werden oft abgelehnt und landen auf der Deponie. Außerdem verschiedene Abfallströme konsequent trennen und niemals „Wunschrecycling" betreiben (etwas ins Recycling werfen in der Hoffnung, es könnte recyclebar sein — im Zweifel kommt es in die Restmülltonne).',
  },
]

// Teachable Machine model URL — set to your model URL to enable real classification
// e.g. "https://teachablemachine.withgoogle.com/models/XXXX/"
export const TM_MODEL_URL = null
