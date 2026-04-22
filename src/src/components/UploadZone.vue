<script setup>
import { ref } from 'vue'

const props = defineProps({
  image: String,
  analyzing: Boolean,
})

const emit = defineEmits(['select', 'clear', 'img-ref'])

const dragging = ref(false)
const fileInput = ref(null)
const imgElement = ref(null)

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

function onImgMounted(el) {
  imgElement.value = el
  emit('img-ref', el)
}
</script>

<template>
  <!-- Empty state: drag & drop zone -->
  <div
    v-if="!image"
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
      @change="e => handleFile(e.target.files[0])"
    />
    <div class="upload-icon">
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
        <path d="M15 20V10M10 15l5-5 5 5" stroke="oklch(44% 0.1 148)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="4" y="4" width="22" height="22" rx="5" stroke="oklch(72% 0.09 145)" stroke-width="1.5" fill="none"/>
      </svg>
    </div>
    <div class="upload-title">Abfallfoto hier ablegen</div>
    <div class="upload-sub">oder klicken zum Durchsuchen — JPG, PNG, WebP bis 20 MB</div>
    <button class="upload-btn">Bild auswählen</button>
  </div>

  <!-- Preview state -->
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
  cursor: pointer;
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

.upload-zone input[type="file"] {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
  width: 100%;
  height: 100%;
}

.upload-icon {
  width: 72px;
  height: 72px;
  background: var(--sage-light);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
}
.upload-zone:hover .upload-icon {
  transform: translateY(-4px);
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
}

.upload-btn {
  margin-top: 4px;
  background: var(--forest);
  color: white;
  border: none;
  border-radius: 100px;
  padding: 11px 28px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  pointer-events: none;
  transition: background 0.2s;
}
.upload-zone:hover .upload-btn {
  background: var(--forest-mid);
}

/* Preview */
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
</style>
