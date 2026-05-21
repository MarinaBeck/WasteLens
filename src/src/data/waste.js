export const BINS = {
  leichtverpackungen: {
    label: 'Gelbe Tonne / Gelber Sack',
    color: 'var(--bin-yellow)',
    textColor: 'oklch(30% 0.08 75)',
    bg: 'oklch(96% 0.06 88)',
    icon: '♻️',
    title: 'Leichtverpackungen',
    shortDesc: 'Kunststoff & Metall',
    instruction:
      'Verpackungen entleeren und kurz ausspülen. Deckel drauf lassen. Nicht zusammenpressen — Sortieranlage braucht das Volumen zur Erkennung.',
    accepts: [
      'Plastikflaschen & -behälter',
      'Metalldosen & -büchsen',
      'Tetra Paks & Verbundverpackungen',
      'Alufolie & Alutabletts (sauber)',
    ],
    rejects: ['Plastiktüten', 'Styropor', 'Fettverschmutzte Verpackungen', 'Glas'],
  },
  altpapier: {
    label: 'Papiertonne',
    color: 'var(--bin-blue)',
    textColor: 'white',
    bg: 'oklch(93% 0.04 235)',
    icon: '📄',
    title: 'Altpapier',
    shortDesc: 'Zeitungen, Zeitschriften & Büropapier',
    instruction:
      'Papier trocken und sauber einwerfen. Plastikfolien, Klebeband und Heftklammern wenn möglich entfernen.',
    accepts: [
      'Zeitungen & Zeitschriften',
      'Büropapier & Schulhefte',
      'Bücher & Kataloge',
      'Briefumschläge (ohne Plastikfenster)',
    ],
    rejects: ['Beschichtetes Papier', 'Taschentücher & Servietten', 'Pappkartons', 'Pizzakartons (fettig)'],
  },
  karton: {
    label: 'Kartonsammlung',
    color: 'var(--bin-karton)',
    textColor: 'white',
    bg: 'oklch(95% 0.04 78)',
    icon: '📦',
    title: 'Karton',
    shortDesc: 'Pappkartons & Wellpappe',
    instruction:
      'Kartons flach zusammenlegen und Klebeband entfernen. Zu Bündeln schnüren oder in die Papiertonne geben — je nach Gemeinde.',
    accepts: [
      'Pappkartons (flach gefaltet)',
      'Wellpappe',
      'Schuhkartons',
      'Eierkartons',
    ],
    rejects: ['Fettige Pizzakartons', 'Beschichtete Kartons (Getränke)', 'Styropor'],
  },
  bioabfall: {
    label: 'Biotonne',
    color: 'var(--bin-brown)',
    textColor: 'white',
    bg: 'oklch(94% 0.025 65)',
    icon: '🌿',
    title: 'Bioabfall',
    shortDesc: 'Lebensmittelreste & Gartenabfälle',
    instruction:
      'Lebensmittelreste in Zeitungspapier einwickeln oder kompostierbare Beutel verwenden. Biotonne nicht in die Sonne stellen.',
    accepts: [
      'Obst- & Gemüsereste',
      'Kaffeesatz, Filter & Teebeutel',
      'Rasenschnitt & Laub',
      'Eierschalen & Nussschalen',
    ],
    rejects: ['Fleisch & Fisch (nur kommunale Biotonne)', 'Milchprodukte', 'Öle & Fette', 'Plastiktüten'],
  },
  altglas: {
    label: 'Glascontainer',
    color: 'var(--bin-green)',
    textColor: 'white',
    bg: 'oklch(93% 0.04 155)',
    icon: '🍾',
    title: 'Altglas',
    shortDesc: 'Flaschen & Gläser nach Farbe trennen',
    instruction:
      'Flaschen und Gläser ausspülen. Deckel, Korken und Etiketten entfernen. Nach Farbe (Weiß-, Braun-, Grünglas) trennen.',
    accepts: [
      'Glasflaschen (Wein, Bier, Saft)',
      'Einmachgläser & Marmeladengläser',
      'Parfumflaschen',
    ],
    rejects: ['Fensterglas & Spiegelglas', 'Trinkgläser & Kristallglas', 'Keramik & Porzellan', 'Glühbirnen'],
  },
  restmuell: {
    label: 'Restmülltonne',
    color: 'var(--bin-black)',
    textColor: 'white',
    bg: 'oklch(93% 0.01 80)',
    icon: '🗑️',
    title: 'Restmüll',
    shortDesc: 'Alles, was nicht recyclebar ist',
    instruction:
      'Nur Abfälle einwerfen, die in keine andere Tonne passen. Je weniger hier landet, desto besser.',
    accepts: [
      'Verschmutzte Verpackungen',
      'Windeln & Hygieneprodukte',
      'Kaputtes Keramikgeschirr',
      'Staubsaugerbeutel & Kehricht',
    ],
    rejects: ['Sondermüll', 'Elektrogeräte', 'Batterien', 'Sperrmüll', 'Glas'],
  },
  sondermuell: {
    label: 'Sondermüll',
    color: 'var(--bin-orange)',
    textColor: 'white',
    bg: 'oklch(95% 0.05 55)',
    icon: '⚠️',
    title: 'Sondermüll',
    shortDesc: 'Batterien, Elektroschrott & Gefahrenstoffe',
    instruction:
      'Niemals in den Hausmüll. Zu einem Recyclinghof, einem Händler-Rücknahmesystem (z. B. Batterien im Supermarkt) oder einer Schadstoffsammlung bringen.',
    accepts: [
      'Batterien & Akkus',
      'Elektro- & Elektronikgeräte',
      'Farben, Lacke & Lösungsmittel',
      'Medikamente & Chemikalien',
    ],
    rejects: ['Niemals in den Hausmüll', 'Niemals in die Restmülltonne'],
  },
  sperrmuell: {
    label: 'Sperrmüll',
    color: 'var(--bin-gray)',
    textColor: 'white',
    bg: 'oklch(93% 0.01 80)',
    icon: '🛋️',
    title: 'Sperrmüll',
    shortDesc: 'Großmöbel & sperrige Gegenstände',
    instruction:
      'Sperrmüll per Abholung bei der Gemeinde anmelden oder zum Wertstoffhof bringen. Nicht einfach auf die Straße stellen.',
    accepts: [
      'Möbel & Matratzen',
      'Teppiche & Vorhänge',
      'Fahrräder & Kinderwagen',
      'Große Haushaltsgeräte (ohne Kühlmittel)',
    ],
    rejects: ['Elektrogeräte mit Kühlmittel (Sondermüll)', 'Bauschutt', 'Reifen', 'Grünschnitt (Biotonne)'],
  },
}

export const DEMO_RESULTS = [
  { bin: 'leichtverpackungen', confidence: 0.91, items: ['Plastikflasche', 'PET-Behälter'] },
  { bin: 'altpapier',          confidence: 0.87, items: ['Zeitung', 'Büropapier'] },
  { bin: 'karton',             confidence: 0.89, items: ['Pappkarton', 'Wellpappe'] },
  { bin: 'bioabfall',          confidence: 0.93, items: ['Apfelkern', 'Gemüseschalen'] },
  { bin: 'altglas',            confidence: 0.96, items: ['Glasflasche', 'Weinflasche'] },
  { bin: 'restmuell',          confidence: 0.78, items: ['Styropor', 'Verschmutzte Verpackung'] },
  { bin: 'sondermuell',        confidence: 0.88, items: ['Batterie', 'Altes Handy'] },
  { bin: 'sperrmuell',         confidence: 0.82, items: ['Stuhl', 'Tischbein'] },
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

// ─────────────────────────────────────────────────────────────
// Teachable Machine — Modell-Konfiguration
// ─────────────────────────────────────────────────────────────
// Beide URLs werden vom Team gesetzt, sobald das trainierte Modell
// verfügbar ist. Standard-Konvention: model.json und metadata.json
// liegen unter derselben Basis-URL.
// Beispiel: "https://teachablemachine.withgoogle.com/models/XXXX/"
// Dateien liegen in src/public/tm-model/ und werden von Vite unter
// /tm-model/ ausgeliefert (model.json + weights.bin + metadata.json).
export const TM_MODEL_URL = '/tm-model/'
export const TM_METADATA_URL = null

// ─────────────────────────────────────────────────────────────
// HCAI Prinzip 3 (Verlässlichkeit & Sicherheit)
// ─────────────────────────────────────────────────────────────
// Schwellwerte für die Konfidenz-Auswertung der Top-1-Klasse.
//   >= HIGH      → normale Empfehlung
//   >= LOW       → Empfehlung + sichtbare Warnung
//   <  LOW       → HARD-STOP, keine Empfehlung
// Die Werte werden bewusst konservativ gewählt, um Automation
// Bias (übermäßiges Vertrauen in die KI) zu vermeiden.
export const CONFIDENCE_THRESHOLDS = {
  HIGH: 0.70,
  LOW: 0.60,
}

// Quellen-Verweis für die transparente Regel-Anzeige (Stufe 3).
// Lokales PDF (liegt unter src/public/abfall-trenn-abc.pdf) —
// wird unabhängig von externer Verfügbarkeit ausgeliefert und
// verlässt die App-Domain nicht.
export const ABF_OOE_URL = '/abfall-trenn-abc.pdf'
export const ABF_OOE_LABEL = 'Abfall-Trenn-ABC (PDF)'

