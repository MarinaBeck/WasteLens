<script setup>
import { computed } from 'vue'
import { BINS } from '../data/waste.js'

const props = defineProps({
  result: Object,
})

const bin = computed(() => BINS[props.result.bin])
const pct = computed(() => Math.round(props.result.confidence * 100))
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
        <div class="result-confidence-num" :style="{ color: bin.color }">{{ pct }}%</div>
        <div class="result-confidence-label">Konfidenz</div>
      </div>
    </div>

    <!-- Body -->
    <div class="result-body">
      <div class="result-info-block">
        <h4>Was tun</h4>
        <p>{{ bin.instruction }}</p>
      </div>
      <div class="result-info-block">
        <h4>Erkannt als</h4>
        <div class="result-tags">
          <span
            v-for="item in result.items"
            :key="item"
            class="result-tag"
            :style="{ background: bin.color + '18', color: 'var(--ink)' }"
          >{{ item }}</span>
        </div>
        <h4 style="margin-top: 14px;">Nimmt auch an</h4>
        <div class="result-tags">
          <span
            v-for="item in bin.accepts.slice(0, 3)"
            :key="item"
            class="result-tag"
            style="background: oklch(0% 0 0 / 0.06); color: var(--muted);"
          >{{ item }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.result-card {
  margin-top: 32px;
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

@media (max-width: 680px) {
  .result-body {
    grid-template-columns: 1fr;
  }
  .result-header {
    padding: 20px;
    flex-wrap: wrap;
  }
}
</style>
