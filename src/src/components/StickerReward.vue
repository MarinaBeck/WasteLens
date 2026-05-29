<script setup>
// ─────────────────────────────────────────────────────────────
// StickerReward — verspielte Belohnung nach erfolgreichem Scan
// ─────────────────────────────────────────────────────────────
// Erscheint zusammen mit der Empfehlung (ResultCard). Zeigt einen
// zufälligen Tier-Sticker und bietet ihn zum Teilen an.
//
// Teilen-Strategie:
//   1. Bevorzugt das PNG selbst übers native Teilen-Menü
//      (Web Share API Level 2, files) — am Handy landet es direkt
//      in Instagram-Story, WhatsApp usw.
//   2. Wo Datei-Teilen nicht geht (v.a. Desktop-Browser): Sticker
//      herunterladen + Seiten-Link in die Zwischenablage.
// ─────────────────────────────────────────────────────────────
import { ref, onBeforeUnmount } from 'vue'

const props = defineProps({
  sticker: { type: Object, required: true }, // { id, name, emoji, file }
})

const busy = ref(false)
const feedback = ref(null) // null | 'saved' | 'linkonly'

let feedbackTimer = null
function flashFeedback(kind) {
  feedback.value = kind
  clearTimeout(feedbackTimer)
  feedbackTimer = setTimeout(() => { feedback.value = null }, 4500)
}
onBeforeUnmount(() => clearTimeout(feedbackTimer))

async function shareSticker() {
  if (busy.value) return
  busy.value = true
  feedback.value = null

  const pageUrl = window.location.href
  const text = `Müll richtig getrennt mit WasteLense ♻️\n${pageUrl}`

  // Sticker-PNG als File laden (für natives Teilen bzw. Download)
  let file = null
  try {
    const res = await fetch(props.sticker.file)
    const blob = await res.blob()
    file = new File([blob], `wastelense-${props.sticker.id}.png`, {
      type: blob.type || 'image/png',
    })
  } catch (e) {
    file = null // lokales Asset — sollte praktisch nie passieren
  }

  // 1) Bevorzugt: Bild übers native Teilen-Menü (v.a. mobil)
  if (file && navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file], text, title: 'WasteLense' })
      busy.value = false
      return
    } catch (e) {
      // Abbruch durch den User → kein Fallback, einfach zurück
      if (e?.name === 'AbortError') {
        busy.value = false
        return
      }
      // anderer Fehler → unten auf den Fallback ausweichen
    }
  }

  // 2) Fallback (v.a. Desktop): Sticker speichern + Link kopieren
  if (file) downloadFile(file)
  let linkCopied = false
  try {
    await navigator.clipboard?.writeText(pageUrl)
    linkCopied = true
  } catch (e) {
    linkCopied = false // Clipboard nicht verfügbar — kein Drama
  }

  flashFeedback(file ? 'saved' : (linkCopied ? 'linkonly' : null))
  busy.value = false
}

function downloadFile(file) {
  const url = URL.createObjectURL(file)
  const a = document.createElement('a')
  a.href = url
  a.download = file.name
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
</script>

<template>
  <div class="sticker-reward">
    <div class="sticker-eyebrow">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M3 7.5l3 3 5-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      Geschafft
    </div>
    <h3 class="sticker-headline">Sticker freigeschaltet!</h3>

    <div class="sticker-stage">
      <span class="sparkle sparkle-1" aria-hidden="true"></span>
      <span class="sparkle sparkle-2" aria-hidden="true"></span>
      <span class="sparkle sparkle-3" aria-hidden="true"></span>
      <span class="sparkle sparkle-4" aria-hidden="true"></span>
      <span class="sparkle sparkle-5" aria-hidden="true"></span>
      <img
        :src="sticker.file"
        :alt="`WasteLense-Sticker: ${sticker.name}`"
        class="sticker-img"
      />
    </div>

    <button class="sticker-share-btn" :disabled="busy" @click="shareSticker">
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
        <circle cx="11.5" cy="3" r="1.8" stroke="currentColor" stroke-width="1.4"/>
        <circle cx="3.5" cy="7.5" r="1.8" stroke="currentColor" stroke-width="1.4"/>
        <circle cx="11.5" cy="12" r="1.8" stroke="currentColor" stroke-width="1.4"/>
        <path d="M5.2 6.5l4.5-2.6M5.2 8.5l4.5 2.6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
      </svg>
      {{ busy ? 'Moment …' : 'Sticker teilen' }}
    </button>

    <p v-if="feedback === 'saved'" class="sticker-feedback">
      Sticker gespeichert &amp; Link kopiert — ab damit in deine Story 🎉
    </p>
    <p v-else-if="feedback === 'linkonly'" class="sticker-feedback">
      Link kopiert — Sticker per Rechtsklick speichern und dazupacken 🎉
    </p>
    <p v-else class="sticker-hint">
      Teil ihn in deiner Story oder mit Freund:innen.
    </p>
  </div>
</template>

<style scoped>
.sticker-reward {
  margin-top: 20px;
  padding: 30px 28px 26px;
  border-radius: 20px;
  background: linear-gradient(180deg, var(--sage-light), oklch(100% 0 0 / 0.55));
  border: 1.5px solid oklch(72% 0.09 145 / 0.4);
  text-align: center;
  overflow: hidden;
  animation: slideUp 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}

.sticker-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--forest);
}

.sticker-headline {
  font-family: 'Lora', serif;
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--ink);
  margin-top: 4px;
}

/* ── Bühne: Sticker + Konfetti-Funken ─────────────────────── */
.sticker-stage {
  position: relative;
  width: 230px;
  height: 300px;
  margin: 16px auto 22px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sticker-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 12px 20px oklch(31% 0.095 148 / 0.2));
  animation: stickerPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.12s both;
}

.sparkle {
  position: absolute;
  width: 9px;
  height: 9px;
  opacity: 0;
  animation: sparklePop 0.8s ease-out both;
}
.sparkle-1 { top: 6%;    left: 20%;  background: var(--clay);       border-radius: 2px;  animation-delay: 0.25s; }
.sparkle-2 { top: 12%;   right: 16%; background: var(--sage);       border-radius: 50%;  animation-delay: 0.38s; }
.sparkle-3 { top: 44%;   left: 5%;   background: var(--forest-mid); border-radius: 2px;  animation-delay: 0.3s; }
.sparkle-4 { bottom: 20%; right: 7%; background: var(--clay);       border-radius: 50%;  animation-delay: 0.46s; }
.sparkle-5 { top: 4%;    left: 50%;  background: var(--sage);       border-radius: 2px;  animation-delay: 0.42s; }

.sticker-share-btn {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  background: var(--forest);
  color: white;
  border: none;
  border-radius: 100px;
  padding: 13px 32px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
  box-shadow: 0 4px 18px oklch(31% 0.095 148 / 0.25);
}
.sticker-share-btn:hover:not(:disabled) {
  background: var(--forest-mid);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px oklch(31% 0.095 148 / 0.3);
}
.sticker-share-btn:disabled {
  opacity: 0.6;
  cursor: default;
}

.sticker-hint,
.sticker-feedback {
  font-size: 0.82rem;
  margin-top: 12px;
  text-wrap: pretty;
}
.sticker-hint { color: var(--muted); }
.sticker-feedback { color: var(--forest); font-weight: 500; }

@keyframes stickerPop {
  0%   { opacity: 0; transform: scale(0.4); }
  60%  { opacity: 1; transform: scale(1.08); }
  100% { opacity: 1; transform: scale(1); }
}

@keyframes sparklePop {
  0%   { opacity: 0; transform: scale(0); }
  40%  { opacity: 1; transform: scale(1.2); }
  100% { opacity: 0; transform: scale(0.7); }
}

/* Bewegung respektiert die System-Einstellung */
@media (prefers-reduced-motion: reduce) {
  .sticker-reward,
  .sticker-img { animation: none; }
  .sticker-img { opacity: 1; transform: none; }
  .sparkle { display: none; }
}

@media (max-width: 680px) {
  .sticker-reward { padding: 26px 20px 22px; }
  .sticker-stage { width: 190px; height: 250px; }
}
</style>
