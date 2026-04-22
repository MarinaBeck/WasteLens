<script setup>
import { ref } from 'vue'
import { BINS, DEMO_RESULTS, TM_MODEL_URL } from './data/waste.js'
import TheNavBar from './components/TheNavBar.vue'
import HeroSection from './components/HeroSection.vue'
import UploadZone from './components/UploadZone.vue'
import ResultCard from './components/ResultCard.vue'
import HowItWorks from './components/HowItWorks.vue'
import BinsGuide from './components/BinsGuide.vue'
import FAQSection from './components/FAQSection.vue'
import TheFooter from './components/TheFooter.vue'

const image = ref(null)       // data URL of uploaded image
const analyzing = ref(false)
const result = ref(null)
const resultEl = ref(null)
const imgEl = ref(null)

let modelCache = null

async function loadModel() {
  if (modelCache || !TM_MODEL_URL) return
  try {
    modelCache = await window.tmImage.load(
      TM_MODEL_URL + 'model.json',
      TM_MODEL_URL + 'metadata.json'
    )
  } catch (e) {
    console.warn('TM-Modell konnte nicht geladen werden:', e)
  }
}

async function analyse() {
  if (!image.value || analyzing.value) return
  analyzing.value = true
  result.value = null

  try {
    if (TM_MODEL_URL) await loadModel()

    if (modelCache && imgEl.value) {
      const predictions = await modelCache.predict(imgEl.value)
      const top = [...predictions].sort((a, b) => b.probability - a.probability)[0]
      const binMap = {
        plastic: 'yellow', metal: 'yellow', can: 'yellow',
        paper: 'blue', cardboard: 'blue',
        organic: 'brown', food: 'brown',
        glass: 'green',
        battery: 'special', electronics: 'special',
        trash: 'black', other: 'black',
      }
      const key = Object.entries(binMap).find(([k]) =>
        top.className.toLowerCase().includes(k)
      )?.[1] ?? 'black'
      result.value = { bin: key, confidence: top.probability, items: [top.className] }
    } else {
      await new Promise(r => setTimeout(r, 1800))
      result.value = DEMO_RESULTS[Math.floor(Math.random() * DEMO_RESULTS.length)]
    }
  } catch (e) {
    console.error(e)
  }

  analyzing.value = false
  setTimeout(() => {
    resultEl.value?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, 100)
}

function onImageSelected(dataUrl) {
  image.value = dataUrl
  result.value = null
}

function clearImage() {
  image.value = null
  result.value = null
}
</script>

<template>
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

      <div v-if="result" ref="resultEl">
        <ResultCard :result="result" />
      </div>
    </section>

    <HowItWorks />
    <BinsGuide />
    <FAQSection />
  </main>
  <TheFooter />
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

@media (max-width: 680px) {
  .scanner-section {
    padding: 0 20px;
  }
}
</style>
