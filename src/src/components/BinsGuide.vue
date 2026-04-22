<script setup>
import { BINS } from '../data/waste.js'
import BinCard from './BinCard.vue'

const binKeys = Object.keys(BINS)
</script>

<template>
  <section class="bins-section" id="bins-guide">
    <div class="bins-header">
      <div class="section-label">Tonnen-Übersicht</div>
      <h2 class="section-title">Deine Tonnen auf einen Blick.</h2>
    </div>
    <div class="bins-grid">
      <BinCard v-for="key in binKeys" :key="key" :bin-key="key" />
    </div>
  </section>
</template>

<style scoped>
.bins-section {
  padding: 80px 48px;
  max-width: 960px;
  margin: 0 auto;
}

.bins-header {
  margin-bottom: 48px;
}

.section-label {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--clay);
  margin-bottom: 16px;
}

.section-title {
  font-family: 'Lora', serif;
  font-size: clamp(1.8rem, 3vw, 2.4rem);
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--forest);
}

.bins-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

@media (max-width: 680px) {
  .bins-section {
    padding: 60px 20px;
  }
  .bins-grid {
    grid-template-columns: 1fr;
  }
}
</style>
