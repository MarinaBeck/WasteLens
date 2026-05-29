<script setup>
// ─────────────────────────────────────────────────────────────
// ResultCard — Stufe 3 der HCAI-Feedback-Logik
// ─────────────────────────────────────────────────────────────
// HCAI Prinzip 5 (Menschliche Kontrolle): Zeigt zusätzlich zur
// Bin-Karte den transparenten Regel-Block — Klasse, Konfidenz,
// Verschmutzung, Regeltext, Quelle, Empfehlung — plus den
// Disclaimer "Du hast das letzte Wort".
// ─────────────────────────────────────────────────────────────
import { computed } from 'vue'
import { BINS, ABF_OOE_URL } from '../data/waste.js'
import { VERSCHMUTZUNG_OPTIONEN, BESTAETIGT } from '../data/disposalRules.js'

const props = defineProps({
  // Empfehlung (legt fest welche Bin-Karte gerendert wird)
  binKey: { type: String, required: true },
  // Transparenz-Daten für die Regel-Box
  klasse: { type: String, required: true },
  konfidenz: { type: Number, required: true },     // 0..1
  manuell: { type: Boolean, default: false },      // User hat aktiv vom Modell abgewichen
  verschmutzung: { type: String, required: true }, // 'sauber' | 'leicht' | 'stark'
  regeltext: { type: String, required: true },
  quelle: { type: String, required: true },
  tonne: { type: String, required: true },
})

const bin = computed(() => BINS[props.binKey])
const pct = computed(() => Math.round(props.konfidenz * 100))
const verschmutzungLabel = computed(
  () => VERSCHMUTZUNG_OPTIONEN.find(o => o.value === props.verschmutzung)?.label ?? props.verschmutzung
)
// Zeile "Verschmutzung laut deiner Angabe" nur bei Klassen mit
// echter Verschmutzungs-Differenzierung anzeigen. Bei Bestätigungs-
// Klassen würde die Zeile sonst nichts Sinnvolles zeigen.
const zeigeVerschmutzung = computed(() => props.verschmutzung !== BESTAETIGT)
</script>

<template>
  <div
    v-if="bin"
    class="result-card"
    :style="{ background: bin.bg, border: `1.5px solid ${bin.color}22` }"
  >
    <!-- Header -->
    <div class="result-header">
      <div class="result-bin-icon" :style="{ background: bin.color + '22' }">
        <span>{{ bin.icon }}</span>
      </div>
      <div class="result-meta">
        <div class="result-label" :style="{ color: bin.color }">{{ bin.label }}</div>
        <div class="result-title">{{ bin.title }}</div>
        <div class="result-desc">{{ bin.shortDesc }}</div>
      </div>
      <div class="result-confidence">
        <template v-if="!manuell">
          <div class="result-confidence-num" :style="{ color: bin.color }">{{ pct }}%</div>
          <div class="result-confidence-label">Übereinstimmung</div>
        </template>
        <div v-else class="result-manual-badge" :style="{ background: bin.color + '22', color: bin.color }">
          manuell gewählt
        </div>
      </div>
    </div>

    <!-- Body: Anleitung + erkannte/akzeptierte Items -->
    <div class="result-body">
      <div class="result-info-block">
        <h4>Was tun</h4>
        <p>{{ bin.instruction }}</p>
      </div>
      <div class="result-info-block">
        <h4>Nimmt auch an</h4>
        <div class="result-tags">
          <span
            v-for="item in bin.accepts.slice(0, 4)"
            :key="item"
            class="result-tag"
            :style="{ background: bin.color + '18', color: 'var(--ink)' }"
          >{{ item }}</span>
        </div>
      </div>
    </div>

    <!-- ═══════════════════════════════════════════════════════ -->
    <!-- STUFE 3 — Transparente Regel-Anzeige (HCAI Prinzip 5)   -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <div class="rule-block">
      <h4 class="rule-heading">Angewendete Regel</h4>
      <dl class="rule-list">
        <div class="rule-row">
          <dt>Erkannt:</dt>
          <dd>{{ klasse }} <span class="rule-source">({{ manuell ? 'manuell gewählt' : pct + ' % Übereinstimmung' }})</span></dd>
        </div>
        <div v-if="zeigeVerschmutzung" class="rule-row">
          <dt>Verschmutzung laut deiner Angabe:</dt>
          <dd>{{ verschmutzungLabel }}</dd>
        </div>
        <div class="rule-row">
          <dt>→ Regel:</dt>
          <dd>„{{ regeltext }}“ <span class="rule-source">(Quelle: {{ quelle }})</span></dd>
        </div>
        <div class="rule-row rule-row-final">
          <dt>→ Empfehlung:</dt>
          <dd><strong>{{ tonne }}</strong></dd>
        </div>
      </dl>

      <div class="rule-disclaimer">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.4"/>
          <path d="M8 4.5v4M8 11v.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
        </svg>
        <span>
          <strong>Du hast das letzte Wort.</strong>
          Im Zweifel beim
          <a :href="ABF_OOE_URL" target="_blank" rel="noopener noreferrer">Abfall-ABC der OÖ Umweltprofis</a>
          prüfen.
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.result-card {
  margin-top: 24px;
  border-radius: 20px;
  overflow: hidden;
  animation: slideUp 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}

.result-header {
  padding: 28px 32px;
  display: flex;
  align-items: center;
  gap: 20px;
}

.result-bin-icon {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  flex-shrink: 0;
}

.result-label {
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  opacity: 0.7;
}

.result-title {
  font-family: 'Lora', serif;
  font-size: 1.7rem;
  font-weight: 700;
  line-height: 1.2;
  color: var(--ink);
}

.result-desc {
  font-size: 0.875rem;
  color: var(--muted);
  margin-top: 2px;
}

.result-confidence {
  margin-left: auto;
  text-align: right;
  flex-shrink: 0;
}

.result-confidence-num {
  font-family: 'Lora', serif;
  font-size: 2rem;
  font-weight: 700;
}

.result-confidence-label {
  font-size: 0.75rem;
  color: var(--muted);
  opacity: 0.65;
}

.result-manual-badge {
  display: inline-block;
  font-size: 0.78rem;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 100px;
  letter-spacing: 0.02em;
  white-space: nowrap;
}

.result-body {
  background: oklch(100% 0 0 / 0.45);
  padding: 24px 32px 28px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.result-info-block h4 {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 6px;
}

.result-info-block p {
  font-size: 0.93rem;
  text-wrap: pretty;
}

.result-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.result-tag {
  font-size: 0.78rem;
  font-weight: 500;
  padding: 4px 12px;
  border-radius: 100px;
}

/* ── Stufe 3: Transparente Regel ──────────────────────────── */
.rule-block {
  background: oklch(100% 0 0 / 0.7);
  border-top: 1px solid oklch(0% 0 0 / 0.06);
  padding: 22px 32px 26px;
}

.rule-heading {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 12px;
}

.rule-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.rule-row {
  display: grid;
  grid-template-columns: minmax(180px, max-content) 1fr;
  gap: 12px;
  font-size: 0.9rem;
  line-height: 1.5;
}

.rule-row dt {
  font-weight: 500;
  color: var(--muted);
}

.rule-row dd {
  color: var(--ink);
  text-wrap: pretty;
}

.rule-source {
  color: var(--muted);
  font-size: 0.82rem;
}

.rule-row-final {
  padding-top: 8px;
  border-top: 1px dashed var(--border);
}

.rule-disclaimer {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  background: var(--sage-light);
  color: var(--forest);
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 0.88rem;
  line-height: 1.5;
}

.rule-disclaimer svg {
  flex-shrink: 0;
  margin-top: 2px;
}

.rule-disclaimer a {
  color: inherit;
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 2px;
}

@media (max-width: 680px) {
  .result-body {
    grid-template-columns: 1fr;
  }
  .result-header {
    padding: 20px;
    flex-wrap: wrap;
  }
  .rule-row {
    grid-template-columns: 1fr;
    gap: 2px;
  }
  .rule-row dt {
    font-size: 0.78rem;
  }
  .rule-block {
    padding: 20px;
  }
}
</style>
