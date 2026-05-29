<script setup>
import { ref, computed } from 'vue'
import { ABF_OOE_URL } from './data/waste.js'
import { getRegel } from './data/disposalRules.js'
import { pickRandomSticker } from './data/stickers.js'
import {
  classify,
  evaluateConfidence,
  getTopK,
  findPrediction,
} from './lib/classification.js'
import TheNavBar from './components/TheNavBar.vue'
import HeroSection from './components/HeroSection.vue'
import UploadZone from './components/UploadZone.vue'
import ClassificationFeedback from './components/ClassificationFeedback.vue'
import ResultCard from './components/ResultCard.vue'
import BinsGuide from './components/BinsGuide.vue'
import FAQSection from './components/FAQSection.vue'
import TheFooter from './components/TheFooter.vue'
import ImpressumPage from './components/ImpressumPage.vue'
import VideoGuide from './components/VideoGuide.vue'
import StickerReward from './components/StickerReward.vue'

const showImpressum = ref(false)

function openImpressum() {
  showImpressum.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function closeImpressum() {
  showImpressum.value = false
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// ─────────────────────────────────────────────────────────────
// Zustand der Klassifikations-Pipeline
// ─────────────────────────────────────────────────────────────
const image = ref(null)             // data URL of uploaded image
const analyzing = ref(false)
const imgEl = ref(null)             // DOM <img> reference

const predictions = ref(null)       // vollständiges TM-Result (Array)
const selectedClass = ref(null)     // vom User gewählte Klasse (Stufe 2)
const contamination = ref(null)     // 'sauber' | 'leicht' | 'stark'
const modelError = ref(false)       // Modell konnte nicht geladen werden

const resultEl = ref(null)

// Belohnungs-Sticker: pro erfolgreichem Scan einmal gezogen und
// stabil gehalten (ändert sich nicht, wenn der User danach Klasse
// oder Verschmutzung anpasst — es bleibt derselbe Scan).
const currentSticker = ref(null)

// ─────────────────────────────────────────────────────────────
// Computed: aktive Klasse (Top-1 ODER User-Auswahl)
// HCAI Prinzip 4: User-Reselection hat Vorrang vor Modell-Top-1.
// ─────────────────────────────────────────────────────────────
const aktiveKlasse = computed(() => {
  if (selectedClass.value) return selectedClass.value
  const top = getTopK(predictions.value ?? [], 1)[0]
  return top?.className ?? null
})

const aktiveKonfidenz = computed(() => {
  const p = findPrediction(predictions.value ?? [], aktiveKlasse.value)
  return p?.probability ?? 0
})

const reliabilityStatus = computed(() => {
  const top1 = getTopK(predictions.value ?? [], 1)[0]
  return evaluateConfidence(top1?.probability ?? 0)
})

// HCAI Prinzip 5: "Manuelle Wahl" = User hat aktiv vom Modell-
// Vorschlag abgewichen. Wird an ResultCard durchgereicht, damit
// dort statt "%" "manuell gewählt" steht.
const isManuelleWahl = computed(() => {
  if (!selectedClass.value) return false
  const top1 = getTopK(predictions.value ?? [], 1)[0]
  return selectedClass.value !== top1?.className
})

// HCAI Prinzip 5: Regel wird erst aufgelöst, wenn beides vorliegt —
// erkannte Klasse UND Pflicht-Eingabe Verschmutzung.
const regel = computed(() => {
  if (!aktiveKlasse.value || !contamination.value) return null
  return getRegel(aktiveKlasse.value, contamination.value)
})

const showStage3 = computed(
  () => reliabilityStatus.value !== 'reject' && regel.value !== null
)

// ─────────────────────────────────────────────────────────────
// analyse — Bildklassifikation (HCAI Prinzip 3: client-side only)
// ─────────────────────────────────────────────────────────────
async function analyse() {
  if (!image.value || analyzing.value) return
  analyzing.value = true
  predictions.value = null
  selectedClass.value = null
  contamination.value = null
  modelError.value = false

  try {
    const result = await classify(imgEl.value)
    if (!result || result.length === 0) {
      // Modell nicht geladen oder predict() lieferte nichts —
      // wir setzen explizit den Fehler-State (kein stiller Fallback).
      modelError.value = true
    } else {
      predictions.value = result
      // Neuer Belohnungs-Sticker pro Scan; den zuletzt gezeigten
      // ausschließen, damit nicht zweimal in Folge derselbe kommt.
      currentSticker.value = pickRandomSticker(currentSticker.value?.id)
    }
  } catch (e) {
    console.error('Klassifikation fehlgeschlagen:', e)
    modelError.value = true
  }

  analyzing.value = false
  setTimeout(() => {
    resultEl.value?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, 100)
}

function onImageSelected(dataUrl) {
  image.value = dataUrl
  predictions.value = null
  selectedClass.value = null
  contamination.value = null
  modelError.value = false
}

function clearImage() {
  image.value = null
  predictions.value = null
  selectedClass.value = null
  contamination.value = null
  modelError.value = false
}

function onSelectClass(className) {
  // HCAI Prinzip 4: User wählt aktiv eine alternative Klasse.
  // Verschmutzung wird zurückgesetzt — neue Klasse, neue Entscheidung.
  selectedClass.value = className
  contamination.value = null
}

function onSetContamination(value) {
  contamination.value = value
}
</script>

<template>
  <ImpressumPage v-if="showImpressum" @close="closeImpressum" />
  <template v-else>
  <TheNavBar />
  <main>
    <HeroSection />

    <section class="scanner-section" id="scanner">
      <UploadZone
        :image="image"
        :analyzing="analyzing"
        @select="onImageSelected"
        @clear="clearImage"
        @img-ref="el => imgEl = el"
      />

      <div class="analyse-area">
        <button
          class="analyse-btn"
          :class="{ loading: analyzing }"
          :disabled="!image || analyzing"
          @click="analyse"
        >
          <svg v-if="analyzing" width="18" height="18" viewBox="0 0 18 18" fill="none" class="spin">
            <circle cx="9" cy="9" r="7" stroke="white" stroke-width="2" stroke-dasharray="22 10" stroke-linecap="round"/>
          </svg>
          <svg v-else width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="8" cy="8" r="6" stroke="white" stroke-width="2"/>
            <path d="M13 13l3 3" stroke="white" stroke-width="2" stroke-linecap="round"/>
            <path d="M5.5 8h5M8 5.5v5" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          {{ analyzing ? 'Analysiere…' : 'Abfall analysieren' }}
        </button>

        <span class="privacy-note">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 1L2 3v3c0 2.5 1.7 4.7 4 5 2.3-.3 4-2.5 4-5V3L6 1z" stroke="oklch(55% 0.09 52)" stroke-width="1.2" fill="none"/>
            <path d="M4 6l1.5 1.5L8 4" stroke="oklch(55% 0.09 52)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Lokal in deinem Browser verarbeitet · keine Daten werden übertragen
        </span>
      </div>

      <!-- Modell-Fehler: KI-Modell nicht ladbar -->
      <div v-if="modelError" ref="resultEl" class="model-error-banner" role="alert">
        <div class="model-error-icon" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <circle cx="11" cy="11" r="9" stroke="currentColor" stroke-width="2"/>
            <path d="M11 6v6M11 15.5v.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="model-error-body">
          <h3>KI-Modell gerade nicht verfügbar</h3>
          <p>
            Das Klassifikations-Modell konnte nicht geladen werden. Bitte versuche es
            später noch einmal oder lade die Seite neu.
          </p>
          <p>
            <strong>Wenn du dir unsicher bist</strong>, wie du den Artikel entsorgen sollst,
            frage die Mitarbeiter:innen in deinem nächsten Altstoffsammelzentrum (ASZ)
            oder schau im
            <a :href="ABF_OOE_URL" target="_blank" rel="noopener noreferrer">Abfall-ABC der OÖ Umweltprofis</a>
            nach.
          </p>
        </div>
      </div>

      <!-- HCAI-Feedback-Bereich: Stufen 1, 2 und 3 -->
      <div v-else-if="predictions" ref="resultEl">
        <!-- Stufen 1 + 2: Reliability + Top-K + Verschmutzungs-Rückfrage -->
        <ClassificationFeedback
          :predictions="predictions"
          :selected-class="selectedClass"
          :contamination="contamination"
          @select-class="onSelectClass"
          @set-contamination="onSetContamination"
        />

        <!-- Stufe 3: Transparente Regel-Anzeige + Disclaimer -->
        <ResultCard
          v-if="showStage3"
          :bin-key="regel.binKey"
          :klasse="aktiveKlasse"
          :konfidenz="aktiveKonfidenz"
          :manuell="isManuelleWahl"
          :verschmutzung="contamination"
          :regeltext="regel.regeltext"
          :quelle="regel.quelle"
          :tonne="regel.tonne"
        />

        <!-- Belohnung: zufälliger Sticker zum Teilen, sobald eine
             Empfehlung steht (gleiche Bedingung wie die ResultCard). -->
        <StickerReward
          v-if="showStage3 && currentSticker"
          :sticker="currentSticker"
        />
      </div>
    </section>

    <VideoGuide />
    <BinsGuide />
    <FAQSection />
  </main>
  <TheFooter @open-impressum="openImpressum" />
  </template>
</template>

<style scoped>
.scanner-section {
  max-width: 760px;
  margin: 0 auto 80px;
  padding: 0 48px;
}

.analyse-area {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.analyse-btn {
  background: var(--forest);
  color: white;
  border: none;
  border-radius: 100px;
  padding: 16px 48px;
  font-family: 'DM Sans', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
  box-shadow: 0 4px 20px oklch(31% 0.095 148 / 0.3);
  display: flex;
  align-items: center;
  gap: 10px;
}
.analyse-btn:hover:not(:disabled) {
  background: var(--forest-mid);
  transform: translateY(-2px);
  box-shadow: 0 8px 28px oklch(31% 0.095 148 / 0.35);
}
.analyse-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.analyse-btn.loading {
  animation: pulse 1.4s ease-in-out infinite;
}

.spin {
  animation: spin 1s linear infinite;
}

.privacy-note {
  font-size: 0.78rem;
  color: var(--muted);
  display: flex;
  align-items: center;
  gap: 5px;
}

.model-error-banner {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 20px 24px;
  border-radius: 16px;
  margin-top: 32px;
  background: oklch(95% 0.04 30);
  border: 1.5px solid oklch(65% 0.18 30);
  color: oklch(35% 0.15 30);
  animation: slideUp 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}

.model-error-icon {
  flex-shrink: 0;
  margin-top: 1px;
}

.model-error-body h3 {
  font-family: 'Lora', serif;
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 8px;
  color: inherit;
}

.model-error-body p {
  font-size: 0.92rem;
  line-height: 1.6;
  margin-bottom: 6px;
}

.model-error-body p:last-child {
  margin-bottom: 0;
}

.model-error-body a {
  color: inherit;
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 2px;
}

@media (max-width: 680px) {
  .scanner-section {
    padding: 0 20px;
  }
}
</style>
