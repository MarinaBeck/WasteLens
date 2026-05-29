// ─────────────────────────────────────────────────────────────
// Entsorgungsregeln — Klasse × Verschmutzung → Tonne
// ─────────────────────────────────────────────────────────────
// HCAI Prinzip 5 (Menschliche Kontrolle): Die Regeln liegen
// transparent in dieser Datei und werden bei jeder Empfehlung
// explizit ausgegeben. Wartung erfolgt ohne Code-Änderung.
//
// Klassen-Strings ENTSPRECHEN EXAKT den Labels im trainierten
// Teachable-Machine-Modell (metadata.json). Wird das Modell
// neu trainiert, müssen die Labels hier 1:1 übernommen werden.
// ─────────────────────────────────────────────────────────────

// Verschmutzungs-Optionen (nur für Klassen mit rueckfrageTyp='verschmutzung')
export const VERSCHMUTZUNG_OPTIONEN = [
  { value: 'sauber', label: 'sauber' },
  { value: 'leicht', label: 'leicht verschmutzt' },
  { value: 'stark', label: 'stark verschmutzt' },
]

// Interner Marker-Wert für Klassen ohne Verschmutzungs-Frage —
// wird gesetzt, wenn der User in Stufe 2 nur bestätigt.
export const BESTAETIGT = 'bestaetigt'

// Modell-Labels (1:1 aus metadata.json)
export const TM_KLASSEN = [
  'Restmüll',
  'Bioabfall',
  'Altpapier',
  'Karton',
  'Altglas weiß',
  'Altglas bunt',
  'Leichtverpackungen: Kunststoff und Metall',
  'Sperrmüll',
  'Sondermüll',
]

// ─────────────────────────────────────────────────────────────
// KLASSEN_KONFIG — definiert pro Klasse, welche Rückfrage in
// Stufe 2 gestellt wird.
//   'verschmutzung' → 3-Stufen-Frage (sauber/leicht/stark),
//                     ändert die Empfehlung tatsächlich.
//   'keine'         → einfache Bestätigung, kein zusätzlicher
//                     Input. Trotzdem Pflichtinteraktion
//                     (HCAI Prinzip 4: User bleibt aktiv).
// hinweis           → optionaler Text, der bei 'keine'-Klassen
//                     über dem Bestätigungsbutton angezeigt
//                     wird.
// ─────────────────────────────────────────────────────────────
export const KLASSEN_KONFIG = [
  {
    klasse: 'Restmüll',
    rueckfrageTyp: 'keine',
    defaultBinKey: 'restmuell',
    hinweis: 'Restmüll wird immer in der Restmülltonne entsorgt — kein zusätzlicher Input nötig.',
  },
  {
    klasse: 'Bioabfall',
    rueckfrageTyp: 'keine',
    defaultBinKey: 'bioabfall',
    hinweis: 'Bioabfall ist naturgemäß feucht. Eine Verschmutzungs-Angabe ändert die Empfehlung nicht.',
  },
  {
    klasse: 'Altpapier',
    rueckfrageTyp: 'verschmutzung',
    defaultBinKey: 'altpapier',
  },
  {
    klasse: 'Karton',
    rueckfrageTyp: 'verschmutzung',
    defaultBinKey: 'karton',
  },
  {
    klasse: 'Altglas weiß',
    rueckfrageTyp: 'keine',
    defaultBinKey: 'altglas',
    hinweis: 'Glas wird im Recycling-Prozess hochtemperatur-gereinigt. Der Verschmutzungsgrad ist nicht entscheidend.',
  },
  {
    klasse: 'Altglas bunt',
    rueckfrageTyp: 'keine',
    defaultBinKey: 'altglas',
    hinweis: 'Glas wird im Recycling-Prozess hochtemperatur-gereinigt. Der Verschmutzungsgrad ist nicht entscheidend.',
  },
  {
    klasse: 'Leichtverpackungen: Kunststoff und Metall',
    rueckfrageTyp: 'verschmutzung',
    defaultBinKey: 'leichtverpackungen',
  },
  {
    klasse: 'Sperrmüll',
    rueckfrageTyp: 'keine',
    defaultBinKey: 'sperrmuell',
    hinweis: 'Sperrmüll wird über die Abholung oder das ASZ entsorgt — unabhängig vom Zustand.',
  },
  {
    klasse: 'Sondermüll',
    rueckfrageTyp: 'keine',
    defaultBinKey: 'sondermuell',
    hinweis: 'Sondermüll gehört immer zur Schadstoffsammlung oder ins ASZ — niemals in den Hausmüll.',
  },
]

// ─────────────────────────────────────────────────────────────
// Felder pro Regel:
//   id            eindeutiger Schlüssel
//   klasse        muss exakt dem TM-Modell-Label entsprechen
//   verschmutzung 'sauber' | 'leicht' | 'stark' | BESTAETIGT
//   binKey        Schlüssel in BINS (src/data/waste.js)
//   tonne         Anzeige-Name in der Regel-Box (Stufe 3)
//   regeltext     ← vom Team final zu befüllen
//   quelle        ← vom Team final zu befüllen / verifizieren
// ─────────────────────────────────────────────────────────────
const QUELLE_PLACEHOLDER = 'Abfall-ABC der OÖ Umweltprofis, Stand 2025'

export const entsorgungsRegeln = [
  // ── Restmüll ─ ohne Verschmutzungs-Differenzierung ─────────
  {
    id: 'restmuell',
    klasse: 'Restmüll',
    verschmutzung: BESTAETIGT,
    binKey: 'restmuell',
    tonne: 'Restmülltonne',
    regeltext: 'Alles, was sich keiner anderen Tonne zuordnen lässt, gehört in den Restmüll.',
    quelle: QUELLE_PLACEHOLDER,
  },

  // ── Bioabfall ─ ohne Verschmutzungs-Differenzierung ────────
  {
    id: 'bioabfall',
    klasse: 'Bioabfall',
    verschmutzung: BESTAETIGT,
    binKey: 'bioabfall',
    tonne: 'Biotonne',
    regeltext: 'Pflanzliche Abfälle und Lebensmittelreste in die Biotonne. In Zeitungspapier einwickeln gegen Geruch — keine Plastiktüten.',
    quelle: QUELLE_PLACEHOLDER,
  },

  // ── Altpapier ─ mit Verschmutzungs-Stufen ──────────────────
  {
    id: 'altpapier_sauber',
    klasse: 'Altpapier',
    verschmutzung: 'sauber',
    binKey: 'altpapier',
    tonne: 'Papiertonne',
    regeltext: 'Sauberes, trockenes Papier in die Papiertonne. Klebeband und Plastikfenster wenn möglich entfernen.',
    quelle: QUELLE_PLACEHOLDER,
  },
  {
    id: 'altpapier_leicht',
    klasse: 'Altpapier',
    verschmutzung: 'leicht',
    binKey: 'altpapier',
    tonne: 'Papiertonne',
    regeltext: 'Leicht verschmutztes Papier (trockene Krümel) kann in die Papiertonne. Feucht oder fettig → Restmüll.',
    quelle: QUELLE_PLACEHOLDER,
  },
  {
    id: 'altpapier_stark',
    klasse: 'Altpapier',
    verschmutzung: 'stark',
    binKey: 'restmuell',
    tonne: 'Restmülltonne',
    regeltext: 'Stark verschmutztes oder fettiges Papier (z. B. Pizzakartons) zerstört die Recycling-Faser und gehört in den Restmüll.',
    quelle: QUELLE_PLACEHOLDER,
  },

  // ── Karton ─ mit Verschmutzungs-Stufen ─────────────────────
  {
    id: 'karton_sauber',
    klasse: 'Karton',
    verschmutzung: 'sauber',
    binKey: 'karton',
    tonne: 'Kartonsammlung',
    regeltext: 'Sauberen Karton flach falten und in die Kartonsammlung geben. Klebeband möglichst entfernen.',
    quelle: QUELLE_PLACEHOLDER,
  },
  {
    id: 'karton_leicht',
    klasse: 'Karton',
    verschmutzung: 'leicht',
    binKey: 'karton',
    tonne: 'Kartonsammlung',
    regeltext: 'Leicht verschmutzte Kartons (trockene Krümel) können weiterhin in die Kartonsammlung.',
    quelle: QUELLE_PLACEHOLDER,
  },
  {
    id: 'karton_stark',
    klasse: 'Karton',
    verschmutzung: 'stark',
    binKey: 'restmuell',
    tonne: 'Restmülltonne',
    regeltext: 'Stark verschmutzte Kartons (z. B. fettige Pizzakartons) gehören in den Restmüll — Fett zerstört die Papierfaser.',
    quelle: QUELLE_PLACEHOLDER,
  },

  // ── Altglas weiß ─ ohne Verschmutzungs-Differenzierung ─────
  {
    id: 'altglas_weiss',
    klasse: 'Altglas weiß',
    verschmutzung: BESTAETIGT,
    binKey: 'altglas',
    tonne: 'Glascontainer (Weißglas)',
    regeltext: 'Weißglas (Flaschen, Konservengläser) in den Weißglas-Container. Deckel und Etiketten entfernen — niemals zu Buntglas mischen.',
    quelle: QUELLE_PLACEHOLDER,
  },

  // ── Altglas bunt ─ ohne Verschmutzungs-Differenzierung ─────
  {
    id: 'altglas_bunt',
    klasse: 'Altglas bunt',
    verschmutzung: BESTAETIGT,
    binKey: 'altglas',
    tonne: 'Glascontainer (Buntglas)',
    regeltext: 'Buntglas (grün, braun) in den Buntglas-Container. Deckel und Etiketten entfernen — niemals zu Weißglas mischen.',
    quelle: QUELLE_PLACEHOLDER,
  },

  // ── Leichtverpackungen ─ mit Verschmutzungs-Stufen ─────────
  {
    id: 'lvp_sauber',
    klasse: 'Leichtverpackungen: Kunststoff und Metall',
    verschmutzung: 'sauber',
    binKey: 'leichtverpackungen',
    tonne: 'Gelber Sack / Gelbe Tonne',
    regeltext: 'Saubere Leichtverpackungen in den Gelben Sack bzw. die Gelbe Tonne. Deckel drauf lassen, nicht zusammenpressen.',
    quelle: QUELLE_PLACEHOLDER,
  },
  {
    id: 'lvp_leicht',
    klasse: 'Leichtverpackungen: Kunststoff und Metall',
    verschmutzung: 'leicht',
    binKey: 'leichtverpackungen',
    tonne: 'Gelber Sack / Gelbe Tonne',
    regeltext: 'Leicht verschmutzte Leichtverpackungen kurz ausspülen, dann in den Gelben Sack. Reste von Getränken oder Lebensmitteln sind unkritisch.',
    quelle: QUELLE_PLACEHOLDER,
  },
  {
    id: 'lvp_stark',
    klasse: 'Leichtverpackungen: Kunststoff und Metall',
    verschmutzung: 'stark',
    binKey: 'restmuell',
    tonne: 'Restmülltonne',
    regeltext: 'Stark verschmutzte Leichtverpackungen (z. B. Öl, Farbe, Chemikalien) können nicht mehr recycelt werden und gehören in den Restmüll.',
    quelle: QUELLE_PLACEHOLDER,
  },

  // ── Sperrmüll ─ ohne Verschmutzungs-Differenzierung ────────
  {
    id: 'sperrmuell',
    klasse: 'Sperrmüll',
    verschmutzung: BESTAETIGT,
    binKey: 'sperrmuell',
    tonne: 'Sperrmüll-Abholung / ASZ',
    regeltext: 'Sperrmüll per Abholung bei der Gemeinde anmelden oder zum Altstoffsammelzentrum (ASZ) bringen. Nicht einfach auf die Straße stellen.',
    quelle: QUELLE_PLACEHOLDER,
  },

  // ── Sondermüll ─ ohne Verschmutzungs-Differenzierung ───────
  {
    id: 'sondermuell',
    klasse: 'Sondermüll',
    verschmutzung: BESTAETIGT,
    binKey: 'sondermuell',
    tonne: 'Schadstoffsammlung / ASZ',
    regeltext: 'Sondermüll niemals in den Hausmüll. Zum Altstoffsammelzentrum (ASZ), zur Schadstoffsammlung oder zum Händler-Rücknahmesystem (z. B. Batterien im Supermarkt).',
    quelle: QUELLE_PLACEHOLDER,
  },
]

// ─────────────────────────────────────────────────────────────
// getKlasseKonfig — liefert die Stufe-2-Konfiguration einer
// Klasse (Rückfrage-Typ + optionaler Hinweistext).
// ─────────────────────────────────────────────────────────────
export function getKlasseKonfig(klasse) {
  if (!klasse) return null
  return KLASSEN_KONFIG.find(c => c.klasse === klasse) ?? null
}

// ─────────────────────────────────────────────────────────────
// getRegel — löst eine Regel aus Klasse + Verschmutzung auf.
// HCAI Prinzip 5: Die Funktion ist die einzige Entscheidungs-
// quelle für die Tonnen-Empfehlung — keine implizite Logik.
//
// Bei Klassen mit rueckfrageTyp='keine' wird der Verschmutzungs-
// Parameter ignoriert; gefunden wird die einzige Regel der
// Klasse.
// ─────────────────────────────────────────────────────────────
export function getRegel(klasse, verschmutzung) {
  if (!klasse || !verschmutzung) return null
  const konfig = getKlasseKonfig(klasse)
  if (konfig?.rueckfrageTyp === 'keine') {
    return entsorgungsRegeln.find(r => r.klasse === klasse) ?? null
  }
  return (
    entsorgungsRegeln.find(
      r => r.klasse === klasse && r.verschmutzung === verschmutzung
    ) ?? null
  )
}
