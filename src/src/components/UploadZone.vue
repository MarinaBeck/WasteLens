<script setup>
import { ref, onBeforeUnmount, nextTick } from 'vue'

defineProps({
  image: String,
  analyzing: Boolean,
})

const emit = defineEmits(['select', 'clear', 'img-ref'])

// ─── Datei-Upload ───────────────────────────────────────────
const dragging = ref(false)
const fileInput = ref(null)

function handleFile(file) {
  if (!file || !file.type.startsWith('image/')) return
  const reader = new FileReader()
  reader.onload = e => emit('select', e.target.result)
  reader.readAsDataURL(file)
}

function onDrop(e) {
  e.preventDefault()
  dragging.value = false
  handleFile(e.dataTransfer.files[0])
}

function pickFile() {
  fileInput.value?.click()
}

// ─── Kamera-Live ────────────────────────────────────────────
// HCAI Prinzip 3 (Sicherheit): Kamera-Stream läuft client-side,
// wird beim Verlassen sauber beendet. Kein Frame wird übertragen.
// HCAI Prinzip 5 (Kontrolle): User entscheidet aktiv per Browser-
// Permission, ob die Kamera überhaupt geöffnet wird.
const cameraActive = ref(false)
const cameraError = ref(null)
const videoEl = ref(null)
let stream = null

async function openCamera() {
  cameraError.value = null
  if (!navigator.mediaDevices?.getUserMedia) {
    cameraError.value = 'Dein Browser unterstützt keinen Kamera-Zugriff.'
    return
  }
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: 'environment' } },
      audio: false,
    })
    cameraActive.value = true
    await nextTick()
    if (videoEl.value) {
      videoEl.value.srcObject = stream
    }
  } catch (e) {
    console.error('Kamera-Zugriff fehlgeschlagen:', e)
    if (e.name === 'NotAllowedError') {
      cameraError.value = 'Kamera-Zugriff wurde verweigert. Bitte in den Browser-Einstellungen erlauben.'
    } else if (e.name === 'NotFoundError' || e.name === 'OverconstrainedError') {
      cameraError.value = 'Keine Kamera gefunden.'
    } else if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
      cameraError.value = 'Kamera-Zugriff erfordert HTTPS.'
    } else {
      cameraError.value = 'Kamera konnte nicht geöffnet werden.'
    }
    stopStream()
  }
}

function stopStream() {
  if (stream) {
    stream.getTracks().forEach(t => t.stop())
    stream = null
  }
}

function closeCamera() {
  stopStream()
  cameraActive.value = false
}

function takeSnapshot() {
  if (!videoEl.value || !stream) return
  const video = videoEl.value
  const canvas = document.createElement('canvas')
  canvas.width = video.videoWidth
  canvas.height = video.videoHeight
  const ctx = canvas.getContext('2d')
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
  const dataUrl = canvas.toDataURL('image/jpeg', 0.92)
  closeCamera()
  emit('select', dataUrl)
}

onBeforeUnmount(() => {
  stopStream()
})

// ─── Preview ────────────────────────────────────────────────
function onImgMounted(el) {
  emit('img-ref', el)
}
</script>

<template>
  <!-- ═══════════════════════════════════════════════════════ -->
  <!-- STATE 1 — Empty: Drag-Drop + zwei Aktions-Buttons        -->
  <!-- ═══════════════════════════════════════════════════════ -->
  <div
    v-if="!image && !cameraActive"
    class="upload-zone"
    :class="{ 'drag-over': dragging }"
    @dragover.prevent="dragging = true"
    @dragleave="dragging = false"
    @drop="onDrop"
  >
    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      class="file-input-hidden"
      @change="e => handleFile(e.target.files[0])"
    />
    <div class="upload-icon">
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
        <path d="M15 20V10M10 15l5-5 5 5" stroke="oklch(44% 0.1 148)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="4" y="4" width="22" height="22" rx="5" stroke="oklch(72% 0.09 145)" stroke-width="1.5" fill="none"/>
      </svg>
    </div>
    <div class="upload-title">Abfallfoto hier ablegen</div>
    <div class="upload-sub">JPG, PNG, WebP bis 20 MB · oder eine Option wählen</div>
    <div class="upload-actions">
      <button class="upload-btn primary" type="button" @click="pickFile">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" stroke-width="1.4"/>
          <path d="M2 10l3.5-3 3 2.5 2.5-2L14 9" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
          <circle cx="10.5" cy="6" r="0.9" fill="currentColor"/>
        </svg>
        Bild auswählen
      </button>
      <button class="upload-btn secondary" type="button" @click="openCamera">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <rect x="1.5" y="4.5" width="13" height="9" rx="1.5" stroke="currentColor" stroke-width="1.4"/>
          <path d="M5.5 4.5l1-1.5h3l1 1.5" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>
          <circle cx="8" cy="9" r="2.5" stroke="currentColor" stroke-width="1.4"/>
        </svg>
        Kamera öffnen
      </button>
    </div>
    <div v-if="cameraError" class="camera-error" role="alert">{{ cameraError }}</div>
  </div>

  <!-- ═══════════════════════════════════════════════════════ -->
  <!-- STATE 2 — Kamera-Live mit Snapshot-Auslöser              -->
  <!-- ═══════════════════════════════════════════════════════ -->
  <div v-else-if="cameraActive" class="upload-zone camera-zone">
    <video
      ref="videoEl"
      class="camera-video"
      autoplay
      playsinline
      muted
    ></video>
    <div class="camera-controls">
      <button class="camera-cancel" type="button" @click="closeCamera">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M9 3L4 7l5 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Abbrechen
      </button>
      <button
        class="camera-snapshot"
        type="button"
        @click="takeSnapshot"
        aria-label="Foto aufnehmen"
      >
        <span class="camera-snapshot-ring"></span>
        <span class="camera-snapshot-dot"></span>
      </button>
      <span class="camera-spacer" aria-hidden="true"></span>
    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════════ -->
  <!-- STATE 3 — Preview des aufgenommenen/hochgeladenen Bilds  -->
  <!-- ═══════════════════════════════════════════════════════ -->
  <div v-else class="upload-zone preview" style="border: 2px solid var(--sage); padding: 0;">
    <div class="preview-wrapper">
      <img
        :ref="onImgMounted"
        :src="image"
        class="preview-img"
        alt="Hochgeladener Abfall"
        crossorigin="anonymous"
      />
      <div class="preview-overlay">
        <button class="preview-change" @click="emit('clear')">← Foto ändern</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.upload-zone {
  position: relative;
  border: 2px dashed var(--sage);
  border-radius: 24px;
  background: var(--cream-deep);
  transition: all 0.25s ease;
  overflow: hidden;
  min-height: 340px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.upload-zone.drag-over {
  border-color: var(--forest);
  background: var(--sage-light);
  transform: scale(1.01);
}

.file-input-hidden {
  display: none;
}

.upload-icon {
  width: 72px;
  height: 72px;
  background: var(--sage-light);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.upload-title {
  font-family: 'Lora', serif;
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--forest);
}

.upload-sub {
  font-size: 0.875rem;
  color: var(--muted);
  text-align: center;
  padding: 0 16px;
}

.upload-actions {
  display: flex;
  gap: 10px;
  margin-top: 4px;
  flex-wrap: wrap;
  justify-content: center;
}

.upload-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border-radius: 100px;
  padding: 11px 24px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s, transform 0.1s, color 0.2s;
  border: 1.5px solid transparent;
}

.upload-btn.primary {
  background: var(--forest);
  color: white;
}
.upload-btn.primary:hover {
  background: var(--forest-mid);
  transform: translateY(-1px);
}

.upload-btn.secondary {
  background: white;
  border-color: var(--sage);
  color: var(--forest);
}
.upload-btn.secondary:hover {
  background: var(--sage-light);
  border-color: var(--forest-mid);
  transform: translateY(-1px);
}

.camera-error {
  margin-top: 4px;
  font-size: 0.82rem;
  color: var(--clay);
  background: var(--clay-light);
  padding: 8px 16px;
  border-radius: 100px;
  text-align: center;
  max-width: 90%;
}

/* ── Kamera-Live ─────────────────────────────────────────── */
.camera-zone {
  padding: 0;
  border: 2px solid var(--forest);
  background: oklch(15% 0.01 80);
  justify-content: flex-end;
  gap: 0;
}

.camera-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.camera-controls {
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 18px 22px 22px;
  background: linear-gradient(to top, oklch(0% 0 0 / 0.55), oklch(0% 0 0 / 0));
}

.camera-cancel {
  justify-self: start;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: oklch(100% 0 0 / 0.92);
  color: var(--forest);
  border: none;
  border-radius: 100px;
  padding: 9px 18px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.camera-cancel:hover {
  background: var(--sage-light);
}

.camera-snapshot {
  position: relative;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.12s;
}
.camera-snapshot:active {
  transform: scale(0.94);
}

.camera-snapshot-ring {
  position: absolute;
  inset: 0;
  border: 3px solid white;
  border-radius: 50%;
}

.camera-snapshot-dot {
  width: 48px;
  height: 48px;
  background: white;
  border-radius: 50%;
  transition: background 0.15s;
}
.camera-snapshot:hover .camera-snapshot-dot {
  background: oklch(94% 0.02 80);
}

.camera-spacer {
  /* hält das Snapshot-Button optisch zentriert in der Grid-Mitte */
}

/* ── Preview ──────────────────────────────────────────────── */
.preview-wrapper {
  position: relative;
  width: 100%;
  min-height: 340px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-img {
  max-width: 100%;
  max-height: 420px;
  border-radius: 22px;
  object-fit: contain;
  display: block;
}

.preview-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, oklch(18% 0.02 80 / 0.55) 0%, transparent 50%);
  border-radius: 22px;
  display: flex;
  align-items: flex-end;
  padding: 24px;
}

.preview-change {
  background: white;
  color: var(--forest);
  border: none;
  border-radius: 100px;
  padding: 8px 20px;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.preview-change:hover {
  background: var(--sage-light);
}

@media (max-width: 480px) {
  .upload-actions {
    flex-direction: column;
    width: 100%;
    padding: 0 28px;
  }
  .upload-btn {
    justify-content: center;
  }
}
</style>
