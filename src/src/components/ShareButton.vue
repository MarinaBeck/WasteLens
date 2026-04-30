<template>
  <button class="share-btn" @click="share" :class="{ copied }">
    <svg v-if="!copied" width="15" height="15" viewBox="0 0 15 15" fill="none">
      <circle cx="11.5" cy="3" r="1.8" stroke="currentColor" stroke-width="1.4"/>
      <circle cx="3.5" cy="7.5" r="1.8" stroke="currentColor" stroke-width="1.4"/>
      <circle cx="11.5" cy="12" r="1.8" stroke="currentColor" stroke-width="1.4"/>
      <path d="M5.2 6.5l4.5-2.6M5.2 8.5l4.5 2.6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
    </svg>
    <svg v-else width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path d="M3 7.5l3 3 6-6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    {{ copied ? 'Link kopiert!' : 'Teilen' }}
  </button>
</template>

<script setup>
import { ref } from 'vue'

const copied = ref(false)

async function share() {
  const data = {
    title: 'WasteLense — Abfall richtig sortieren',
    text: 'Nie wieder falsch trennen: WasteLense erkennt deinen Abfall per Foto und sagt dir, in welche Tonne er gehört.',
    url: window.location.href,
  }

  if (navigator.share && navigator.canShare?.(data)) {
    try {
      await navigator.share(data)
    } catch (e) {
      // user cancelled — do nothing
    }
  } else {
    try {
      await navigator.clipboard.writeText(window.location.href)
      copied.value = true
      setTimeout(() => { copied.value = false }, 2500)
    } catch (e) {
      // clipboard not available — silent fail
    }
  }
}
</script>

<style scoped>
.share-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: white;
  border: 1.5px solid var(--border);
  border-radius: 100px;
  padding: 10px 22px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--forest-mid);
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s, background 0.2s, transform 0.15s;
  white-space: nowrap;
}
.share-btn:hover {
  border-color: var(--sage);
  color: var(--forest);
  transform: translateY(-1px);
}
.share-btn.copied {
  border-color: var(--sage);
  background: var(--sage-light);
  color: var(--forest);
}
</style>
