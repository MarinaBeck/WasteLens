// ─────────────────────────────────────────────────────────────
// Sticker — Belohnung nach erfolgreichem Scan
// ─────────────────────────────────────────────────────────────
// 10 Tier-Sticker (PNG). Liegen in src/public/stickers/ und werden
// von Vite unter /stickers/ ausgeliefert — lokal gehostet, keine
// externen Requests (konsistent mit Fonts, Modell und PDF, DSGVO).
//
// Jeder Sticker trägt seine Botschaft bereits im Bild ("MÜLL? NICHT
// MIT MIR!" usw.), deshalb hält sich die Karte drumherum bewusst
// zurück. Der Name wird nur für den alt-Text (Screenreader) genutzt.
// ─────────────────────────────────────────────────────────────

export const STICKERS = [
  { id: 'biene',        name: 'Biene',       file: '/stickers/biene.png' },
  { id: 'faultier',     name: 'Faultier',    file: '/stickers/faultier.png' },
  { id: 'frosch',       name: 'Frosch',      file: '/stickers/frosch.png' },
  { id: 'fuchs',        name: 'Fuchs',       file: '/stickers/fuchs.png' },
  { id: 'igel',         name: 'Igel',        file: '/stickers/igel.png' },
  { id: 'moeve',        name: 'Möwe',        file: '/stickers/moeve.png' },
  { id: 'otter',        name: 'Otter',       file: '/stickers/otter.png' },
  { id: 'schildkroete', name: 'Schildkröte', file: '/stickers/schildkroete.png' },
  { id: 'wal',          name: 'Wal',         file: '/stickers/wal.png' },
  { id: 'waschbaer',    name: 'Waschbär',    file: '/stickers/waschbaer.png' },
]

// Zufälligen Sticker ziehen. Optional wird die zuletzt gezeigte ID
// ausgeschlossen, damit nicht zweimal in Folge derselbe erscheint.
export function pickRandomSticker(excludeId = null) {
  const pool = excludeId ? STICKERS.filter(s => s.id !== excludeId) : STICKERS
  const list = pool.length ? pool : STICKERS
  return list[Math.floor(Math.random() * list.length)]
}
