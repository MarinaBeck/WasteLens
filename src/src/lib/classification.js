// ─────────────────────────────────────────────────────────────
// Classification-Library
// ─────────────────────────────────────────────────────────────
// Kapselt die Teachable-Machine-Integration. Läuft komplett
// client-side via TensorFlow.js — kein Server, kein Upload.
// HCAI Prinzip 3 (Sicherheit): Bilddaten verlassen den Browser
// nicht.
// ─────────────────────────────────────────────────────────────

import { TM_MODEL_URL, TM_METADATA_URL, CONFIDENCE_THRESHOLDS } from '../data/waste.js'

let modelCache = null
let loadPromise = null

// ─────────────────────────────────────────────────────────────
// loadModel — lädt das TM-Modell einmalig und cached es.
// Mehrfach-Aufrufe innerhalb derselben Session sind kostenlos.
// ─────────────────────────────────────────────────────────────
export async function loadModel() {
  if (modelCache) return modelCache
  if (loadPromise) return loadPromise
  if (!TM_MODEL_URL) return null

  if (typeof window === 'undefined' || !window.tmImage) {
    console.warn('Teachable Machine Library nicht verfügbar (window.tmImage fehlt).')
    return null
  }

  const metadataUrl = TM_METADATA_URL ?? TM_MODEL_URL + 'metadata.json'
  const modelUrl = TM_MODEL_URL.endsWith('model.json')
    ? TM_MODEL_URL
    : TM_MODEL_URL + 'model.json'

  loadPromise = window.tmImage
    .load(modelUrl, metadataUrl)
    .then(m => {
      modelCache = m
      loadPromise = null
      return m
    })
    .catch(err => {
      console.warn('TM-Modell konnte nicht geladen werden:', err)
      loadPromise = null
      return null
    })

  return loadPromise
}

// ─────────────────────────────────────────────────────────────
// classify — führt predict() aus und liefert die VOLLSTÄNDIGE
// Klassen-Verteilung (nicht nur Top-1). Diese Liste wird für
// die Top-K-Auswahl in Stufe 2 (HCAI Prinzip 4) gebraucht.
// ─────────────────────────────────────────────────────────────
export async function classify(imgEl) {
  if (!imgEl) return []
  const model = await loadModel()
  if (!model) return []
  const raw = await model.predict(imgEl)
  return raw.map(p => ({
    className: p.className,
    probability: p.probability,
  }))
}

// ─────────────────────────────────────────────────────────────
// getTopK — sortiert Predictions absteigend und gibt die Top-K
// zurück. HCAI Prinzip 4 (Autonomie): User sieht Alternativen
// und kann sie aktiv auswählen.
// ─────────────────────────────────────────────────────────────
export function getTopK(predictions, k = 3) {
  if (!Array.isArray(predictions) || predictions.length === 0) return []
  return [...predictions]
    .sort((a, b) => b.probability - a.probability)
    .slice(0, k)
}

// ─────────────────────────────────────────────────────────────
// evaluateConfidence — Schwellwert-Auswertung der Top-1-Konfidenz.
// HCAI Prinzip 3 (Verlässlichkeit): Unter LOW wird bewusst KEINE
// Empfehlung ausgegeben, um Automation Bias zu vermeiden.
//
// Return:
//   'high'   → normale Empfehlung
//   'warn'   → Empfehlung mit sichtbarer Warnung
//   'reject' → HARD-STOP, keine Empfehlung
// ─────────────────────────────────────────────────────────────
export function evaluateConfidence(probability) {
  if (typeof probability !== 'number' || Number.isNaN(probability)) return 'reject'
  if (probability >= CONFIDENCE_THRESHOLDS.HIGH) return 'high'
  if (probability >= CONFIDENCE_THRESHOLDS.LOW) return 'warn'
  return 'reject'
}

// ─────────────────────────────────────────────────────────────
// findPrediction — sucht eine Prediction nach className.
// Wird gebraucht, wenn der User in Stufe 2 eine Alternative
// wählt: die Konfidenz dieser Klasse für die Anzeige.
// ─────────────────────────────────────────────────────────────
export function findPrediction(predictions, className) {
  if (!Array.isArray(predictions) || !className) return null
  return predictions.find(p => p.className === className) ?? null
}
