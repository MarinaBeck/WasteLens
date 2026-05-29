<script setup>
// ─────────────────────────────────────────────────────────────
// ClassificationFeedback — orchestriert HCAI-Stufen 1 + 2
// ─────────────────────────────────────────────────────────────
//   Stufe 1 (HCAI Prinzip 3): Reliability-Banner mit
//           Schwellwert-Logik (HIGH/WARN/REJECT).
//   Stufe 2 (HCAI Prinzip 4): Top-K-Alternativen klickbar +
//           Pflicht-Rückfrage zur Verschmutzung.
// ─────────────────────────────────────────────────────────────
import { ref, computed } from 'vue'
import { getTopK, evaluateConfidence, findPrediction } from '../lib/classification.js'
import {
  VERSCHMUTZUNG_OPTIONEN,
  BESTAETIGT,
  getKlasseKonfig,
  KLASSEN_KONFIG,
} from '../data/disposalRules.js'
import { ABF_OOE_URL, BINS } from '../data/waste.js'

const props = defineProps({
  predictions: { type: Array, required: true },     // vollständige TM-Predictions
  selectedClass: { type: String, default: null },   // aktuell gewählter className
  contamination: { type: String, default: null },   // 'sauber' | 'leicht' | 'stark'
})

const emit = defineEmits(['select-class', 'set-contamination'])

const showAlternatives = ref(false)
const showManualSelection = ref(false)

const topK = computed(() => getTopK(props.predictions, 3))
const top1 = computed(() => topK.value[0] ?? null)

// HCAI Prinzip 5 (Kontrolle): "Manuelle Wahl" = User hat aktiv
// von der Modell-Empfehlung abgewichen. Konfidenz-Prozent und
// Reliability-Banner werden in diesem Fall ausgeblendet, weil
// die Aussage des Modells nicht mehr die Grundlage ist.
const isManuelleWahl = computed(
  () =>
    !!props.selectedClass &&
    props.selectedClass !== top1.value?.className
)

// Welche Klasse ist aktuell die "Arbeitsklasse"?
// Default = Top-1 aus dem Modell, sofern User keine Alternative gewählt hat.
const aktiveKlasse = computed(() => props.selectedClass ?? top1.value?.className ?? null)
const aktivePrediction = computed(() =>
  findPrediction(props.predictions, aktiveKlasse.value)
)
const aktiveKonfidenz = computed(() => aktivePrediction.value?.probability ?? 0)
const pctAktiv = computed(() => Math.round(aktiveKonfidenz.value * 100))

// HCAI Prinzip 3: Schwellwert-Status der Top-1-Konfidenz
// (NICHT der aktiven Klasse — die Reliability-Aussage bezieht
// sich auf das Modell als Ganzes, nicht auf User-Reselection).
const reliabilityStatus = computed(() =>
  evaluateConfidence(top1.value?.probability ?? 0)
)

const alternativen = computed(() =>
  topK.value.filter(p => p.className !== aktiveKlasse.value)
)

// Stufe-2-Rückfrage-Typ der aktuellen Klasse
const klasseKonfig = computed(() => getKlasseKonfig(aktiveKlasse.value))
const rueckfrageTyp = computed(() => klasseKonfig.value?.rueckfrageTyp ?? 'verschmutzung')
const klasseHinweis = computed(() => klasseKonfig.value?.hinweis ?? null)

// Klassen für die Vollauswahl im "Erkennung stimmt nicht?"-Block:
// alle TM-Klassen außer der gerade aktiven, mit Bin-Icon-Mapping.
const weitereKlassen = computed(() =>
  KLASSEN_KONFIG.filter(k => k.klasse !== aktiveKlasse.value).map(k => ({
    klasse: k.klasse,
    bin: BINS[k.defaultBinKey],
  }))
)

function selectFromVollliste(className) {
  showManualSelection.value = false
  showAlternatives.value = false
  emit('select-class', className)
}

function selectKlasse(className) {
  emit('select-class', className)
  showAlternatives.value = false
}

function setVerschmutzung(value) {
  emit('set-contamination', value)
}

function bestaetigeKlasse() {
  // HCAI Prinzip 4: Auch bei Klassen ohne Verschmutzungs-Differenzierung
  // muss der User aktiv bestätigen — keine stillschweigende Empfehlung.
  emit('set-contamination', BESTAETIGT)
}
</script>

<template>
  <!-- ═══════════════════════════════════════════════════════ -->
  <!-- STUFE 1 — Reliability-Banner (HCAI Prinzip 3)            -->
  <!-- ═══════════════════════════════════════════════════════ -->

  <!-- HARD-STOP: Konfidenz < 60 % → keine Empfehlung. -->
  <div v-if="reliabilityStatus === 'reject'" class="banner banner-stop">
    <div class="banner-icon" aria-hidden="true">
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="9" stroke="currentColor" stroke-width="2"/>
        <path d="M11 6v6M11 15.5v.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </div>
    <div class="banner-body">
      <h3>Erkennung nicht eindeutig genug</h3>
      <p>
        Die KI ist sich bei diesem Foto unsicher (höchste Übereinstimmung: {{ Math.round((top1?.probability ?? 0) * 100) }} %).
        Um eine Fehlsortierung zu vermeiden, geben wir <strong>bewusst keine Empfehlung</strong>.
      </p>
      <p>
        Bitte prüfe den Artikel manuell beim
        <a :href="ABF_OOE_URL" target="_blank" rel="noopener noreferrer">Abfall-ABC der OÖ Umweltprofis</a>
        oder nimm ein neues, deutlicheres Foto auf.
      </p>
    </div>
  </div>

  <!-- AKTIV: high oder warn → Klassifikation anzeigen + Stufe 2 -->
  <template v-else>
    <!-- Warnung bei mittlerer Konfidenz (60–69 %)
         Bei manueller Wahl ausblenden: Modell-Konfidenz ist nicht
         mehr die Entscheidungsbasis. -->
    <div v-if="reliabilityStatus === 'warn' && !isManuelleWahl" class="banner banner-warn">
      <div class="banner-icon" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 2L1 18h18L10 2z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
          <path d="M10 8v4M10 14.5v.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
        </svg>
      </div>
      <div class="banner-body">
        <strong>Unsichere Erkennung ({{ pctAktiv }} %).</strong>
        Empfehlung mit Vorbehalt — im Zweifel beim
        <a :href="ABF_OOE_URL" target="_blank" rel="noopener noreferrer">Abfall-ABC der OÖ Umweltprofis</a>
        nachschlagen.
      </div>
    </div>

    <!-- ═════════════════════════════════════════════════════ -->
    <!-- STUFE 2 — Top-1 + Alternativen (HCAI Prinzip 4)        -->
    <!-- ═════════════════════════════════════════════════════ -->
    <div class="prediction-block">
      <div class="prediction-head">
        <div class="prediction-meta">
          <div class="prediction-eyebrow">Erkannt</div>
          <div class="prediction-class">{{ aktiveKlasse }}</div>
        </div>
        <div class="prediction-confidence">
          <template v-if="!isManuelleWahl">
            <div class="prediction-confidence-num">{{ pctAktiv }} %</div>
            <div class="prediction-confidence-label">Übereinstimmung</div>
          </template>
          <div v-else class="prediction-manual-badge">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
              <path d="M2 7l3 3 6-6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            manuell gewählt
          </div>
        </div>
      </div>

      <!-- Alternativen-Toggle: nur zeigen, wenn es welche gibt -->
      <button
        v-if="alternativen.length > 0"
        class="alternativen-toggle"
        :class="{ open: showAlternatives }"
        @click="showAlternatives = !showAlternatives"
        :aria-expanded="showAlternatives"
      >
        <span>{{ showAlternatives ? 'Andere Möglichkeiten ausblenden' : 'Andere Möglichkeiten' }}</span>
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" class="chevron">
          <path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <div v-show="showAlternatives && alternativen.length > 0" class="alternativen-list">
        <p class="alternativen-hint">
          Das Modell hält auch diese Klassen für möglich:
        </p>
        <button
          v-for="alt in alternativen"
          :key="alt.className"
          class="alternative-item"
          @click="selectKlasse(alt.className)"
        >
          <span class="alternative-name">{{ alt.className }}</span>
          <span class="alternative-pct">{{ Math.round(alt.probability * 100) }} %</span>
        </button>
      </div>

      <!-- ═════════════════════════════════════════════════════ -->
      <!-- "Erkennung stimmt nicht?" — Manuelle Vollauswahl       -->
      <!-- HCAI Prinzip 5 (Kontrolle): User kann jederzeit aus    -->
      <!-- allen trainierten Klassen wählen, wenn weder Top-1     -->
      <!-- noch die Top-K-Alternativen passen.                    -->
      <!-- ═════════════════════════════════════════════════════ -->
      <button
        class="manual-toggle"
        :class="{ open: showManualSelection }"
        @click="showManualSelection = !showManualSelection"
        :aria-expanded="showManualSelection"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.4"/>
          <path d="M5 5l4 4M9 5l-4 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
        </svg>
        <span>Erkennung stimmt nicht?</span>
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" class="chevron">
          <path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <div v-show="showManualSelection" class="manual-block">
        <p class="manual-intro">
          Wähle die passende Klasse selbst — du behältst das letzte Wort.
        </p>
        <div class="manual-grid">
          <button
            v-for="entry in weitereKlassen"
            :key="entry.klasse"
            class="manual-tile"
            :style="{ borderColor: entry.bin?.color + '55', background: entry.bin?.bg }"
            @click="selectFromVollliste(entry.klasse)"
          >
            <span
              class="manual-tile-icon"
              :style="{ background: (entry.bin?.color ?? '#ccc') + '22' }"
            >{{ entry.bin?.icon ?? '·' }}</span>
            <span class="manual-tile-text">
              <span class="manual-tile-name">{{ entry.klasse }}</span>
              <span class="manual-tile-bin" :style="{ color: entry.bin?.color }">
                {{ entry.bin?.label }}
              </span>
            </span>
          </button>
        </div>

        <div class="manual-fallback">
          <p>
            <strong>Keine davon passt?</strong>
            Schau im
            <a :href="ABF_OOE_URL" target="_blank" rel="noopener noreferrer">Abfall-ABC der OÖ Umweltprofis</a>
            nach oder frag die Mitarbeiter:innen in deinem nächsten
            Altstoffsammelzentrum (ASZ).
          </p>
        </div>
      </div>
    </div>

    <!-- ═════════════════════════════════════════════════════ -->
    <!-- STUFE 2 — Klassen-spezifische Pflicht-Rückfrage        -->
    <!-- ═════════════════════════════════════════════════════ -->

    <!-- Variante A: Verschmutzungsgrad (für Karton, Altpapier, LVP) -->
    <div v-if="rueckfrageTyp === 'verschmutzung'" class="contamination-block">
      <div class="contamination-question">
        <span class="contamination-label">Wie ist der Zustand des Artikels?</span>
        <span class="contamination-required">Pflichtangabe</span>
      </div>
      <div class="contamination-options">
        <button
          v-for="opt in VERSCHMUTZUNG_OPTIONEN"
          :key="opt.value"
          class="contamination-btn"
          :class="{ active: contamination === opt.value }"
          @click="setVerschmutzung(opt.value)"
        >
          {{ opt.label }}
        </button>
      </div>
    </div>

    <!-- Variante B: Bestätigung (für Klassen ohne Verschmutzungs-Relevanz) -->
    <div v-else class="contamination-block">
      <div class="contamination-question">
        <span class="contamination-label">Stimmt diese Erkennung?</span>
        <span class="contamination-required">Bestätigung</span>
      </div>
      <p v-if="klasseHinweis" class="confirm-hint">{{ klasseHinweis }}</p>
      <button
        class="confirm-btn"
        :class="{ active: contamination === BESTAETIGT }"
        @click="bestaetigeKlasse"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 8.5l3 3 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        {{ contamination === BESTAETIGT ? 'Bestätigt — Empfehlung wird angezeigt' : 'Ja, Empfehlung anzeigen' }}
      </button>
    </div>
  </template>
</template>

<style scoped>
/* ── Reliability-Banner ──────────────────────────────────── */
.banner {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 18px 22px;
  border-radius: 16px;
  margin-top: 32px;
  animation: slideUp 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}

.banner-stop {
  background: oklch(95% 0.04 30);
  border: 1.5px solid oklch(65% 0.18 30);
  color: oklch(35% 0.15 30);
}

.banner-warn {
  background: oklch(96% 0.05 75);
  border: 1.5px solid oklch(75% 0.12 75);
  color: oklch(38% 0.1 60);
}

.banner-icon {
  flex-shrink: 0;
  margin-top: 1px;
}

.banner-body {
  font-size: 0.92rem;
  line-height: 1.55;
}

.banner-body h3 {
  font-family: 'Lora', serif;
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 6px;
  color: inherit;
}

.banner-body p {
  margin-bottom: 4px;
}

.banner-body p:last-child {
  margin-bottom: 0;
}

.banner-body a {
  color: inherit;
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 2px;
}

/* ── Prediction-Block (Stufe 2) ──────────────────────────── */
.prediction-block {
  margin-top: 24px;
  background: oklch(100% 0 0 / 0.55);
  border: 1.5px solid var(--border);
  border-radius: 18px;
  padding: 20px 24px;
}

.prediction-head {
  display: flex;
  align-items: center;
  gap: 16px;
}

.prediction-meta {
  flex: 1;
}

.prediction-eyebrow {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted);
}

.prediction-class {
  font-family: 'Lora', serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--forest);
  line-height: 1.2;
  margin-top: 2px;
}

.prediction-confidence {
  text-align: right;
  flex-shrink: 0;
}

.prediction-confidence-num {
  font-family: 'Lora', serif;
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--forest);
}

.prediction-confidence-label {
  font-size: 0.72rem;
  color: var(--muted);
  letter-spacing: 0.04em;
}

/* ── Alternativen-Toggle ──────────────────────────────────── */
.alternativen-toggle {
  margin-top: 16px;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.88rem;
  font-weight: 500;
  color: var(--forest);
  cursor: pointer;
  padding: 8px 0;
  transition: color 0.2s;
}

.alternativen-toggle:hover {
  color: var(--forest-mid);
}

.chevron {
  transition: transform 0.25s;
}

.alternativen-toggle.open .chevron {
  transform: rotate(180deg);
}

.alternativen-list {
  margin-top: 8px;
  padding-top: 12px;
  border-top: 1px dashed var(--border);
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.alternativen-hint {
  font-size: 0.82rem;
  color: var(--muted);
  margin-bottom: 6px;
  text-wrap: pretty;
}

.alternative-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--cream-deep);
  border: 1px solid transparent;
  border-radius: 12px;
  padding: 10px 16px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.92rem;
  color: var(--ink);
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s, transform 0.1s;
}

.alternative-item:hover {
  background: var(--sage-light);
  border-color: var(--sage);
  transform: translateY(-1px);
}

.alternative-name {
  font-weight: 500;
}

.alternative-pct {
  font-size: 0.82rem;
  color: var(--muted);
  font-variant-numeric: tabular-nums;
}

/* ── "manuell gewählt" Badge ─────────────────────────────── */
.prediction-manual-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--forest);
  background: var(--sage-light);
  padding: 6px 12px;
  border-radius: 100px;
  letter-spacing: 0.02em;
  white-space: nowrap;
}

/* ── "Erkennung stimmt nicht?" ───────────────────────────── */
.manual-toggle {
  margin-top: 4px;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.88rem;
  font-weight: 500;
  color: var(--clay);
  cursor: pointer;
  padding: 8px 0;
  transition: color 0.2s;
}

.manual-toggle:hover {
  color: oklch(48% 0.12 50);
}

.manual-toggle.open .chevron {
  transform: rotate(180deg);
}

.manual-block {
  margin-top: 10px;
  padding-top: 14px;
  border-top: 1px dashed var(--border);
}

.manual-intro {
  font-size: 0.85rem;
  color: var(--muted);
  margin-bottom: 12px;
  text-wrap: pretty;
}

.manual-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 8px;
}

.manual-tile {
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 10px 12px;
  text-align: left;
  font-family: 'DM Sans', sans-serif;
  cursor: pointer;
  transition: transform 0.1s, border-color 0.2s, box-shadow 0.2s;
}

.manual-tile:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 14px oklch(0% 0 0 / 0.06);
}

.manual-tile-icon {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.manual-tile-text {
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-width: 0;
}

.manual-tile-name {
  font-size: 0.86rem;
  font-weight: 500;
  color: var(--ink);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.manual-tile-bin {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  opacity: 0.85;
}

.manual-fallback {
  margin-top: 14px;
  padding: 12px 16px;
  background: var(--cream-deep);
  border-radius: 12px;
  border-left: 3px solid var(--clay);
}

.manual-fallback p {
  font-size: 0.85rem;
  color: var(--ink);
  line-height: 1.55;
  text-wrap: pretty;
}

.manual-fallback a {
  color: var(--forest);
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 2px;
}

/* ── Verschmutzungs-Block ─────────────────────────────────── */
.contamination-block {
  margin-top: 20px;
  background: var(--cream-deep);
  border-radius: 18px;
  padding: 18px 24px;
}

.contamination-question {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.contamination-label {
  font-family: 'Lora', serif;
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--ink);
}

.contamination-required {
  font-size: 0.72rem;
  color: var(--clay);
  background: var(--clay-light);
  padding: 3px 10px;
  border-radius: 100px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.contamination-options {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.contamination-btn {
  flex: 1;
  min-width: 130px;
  background: white;
  border: 1.5px solid var(--border);
  border-radius: 12px;
  padding: 10px 16px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.92rem;
  color: var(--ink);
  cursor: pointer;
  transition: all 0.2s;
}

.contamination-btn:hover {
  border-color: var(--sage);
  background: var(--sage-light);
}

.contamination-btn.active {
  background: var(--forest);
  border-color: var(--forest);
  color: white;
  font-weight: 600;
}

.confirm-hint {
  font-size: 0.85rem;
  color: var(--muted);
  margin-bottom: 12px;
  text-wrap: pretty;
  line-height: 1.55;
}

.confirm-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: white;
  border: 1.5px solid var(--border);
  border-radius: 12px;
  padding: 12px 22px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.95rem;
  color: var(--ink);
  cursor: pointer;
  transition: all 0.2s;
}

.confirm-btn:hover {
  border-color: var(--sage);
  background: var(--sage-light);
}

.confirm-btn.active {
  background: var(--forest);
  border-color: var(--forest);
  color: white;
  font-weight: 600;
  cursor: default;
}

@media (max-width: 680px) {
  .prediction-head {
    flex-wrap: wrap;
  }
  .contamination-options {
    flex-direction: column;
  }
  .contamination-btn {
    min-width: 0;
  }
}
</style>
