<script setup>
import { ref } from 'vue'

defineProps({
  q: String,
  a: String,
})

const open = ref(false)
</script>

<template>
  <div class="faq-item" :class="{ open }">
    <button class="faq-question" @click="open = !open">
      <span>{{ q }}</span>
      <span class="faq-chevron">
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
          <path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
    </button>
    <div class="faq-answer">{{ a }}</div>
  </div>
</template>

<style scoped>
.faq-item {
  border-bottom: 1px solid var(--border);
}

.faq-question {
  width: 100%;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 22px 0;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.98rem;
  font-weight: 500;
  color: var(--ink);
  cursor: pointer;
  text-align: left;
  transition: color 0.2s;
}
.faq-question:hover {
  color: var(--forest);
}

.faq-chevron {
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, transform 0.25s;
}

.faq-item.open .faq-chevron {
  background: var(--sage-light);
  transform: rotate(180deg);
}

.faq-answer {
  overflow: hidden;
  font-size: 0.9rem;
  color: var(--muted);
  line-height: 1.7;
  max-height: 0;
  transition: max-height 0.35s ease, padding 0.35s ease;
  padding: 0;
  text-wrap: pretty;
}

.faq-item.open .faq-answer {
  max-height: 500px;
  padding-bottom: 20px;
}
</style>
