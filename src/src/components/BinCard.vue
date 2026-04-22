<script setup>
import { computed } from 'vue'
import { BINS } from '../data/waste.js'

const props = defineProps({
  binKey: String,
})

const bin = computed(() => BINS[props.binKey])
</script>

<template>
  <div class="bin-card">
    <div class="bin-dot" :style="{ background: bin.color + '22' }">
      <span>{{ bin.icon }}</span>
    </div>
    <h3>{{ bin.title }}</h3>
    <p>{{ bin.accepts.slice(0, 3).join(', ') }}</p>
  </div>
</template>

<style scoped>
.bin-card {
  border-radius: 18px;
  padding: 24px;
  background: var(--cream-deep);
  border: 1px solid var(--border);
  transition: transform 0.2s, box-shadow 0.2s;
}

.bin-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px oklch(0% 0 0 / 0.07);
}

.bin-dot {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
}

h3 {
  font-size: 0.98rem;
  font-weight: 600;
  margin-bottom: 6px;
  color: var(--forest);
}

p {
  font-size: 0.82rem;
  color: var(--muted);
  line-height: 1.5;
}
</style>
