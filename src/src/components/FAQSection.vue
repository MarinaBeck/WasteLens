<script setup>
import { FAQS } from '../data/waste.js'
import FAQItem from './FAQItem.vue'
</script>

<template>
  <section class="faq-section" id="faq">
    <div class="faq-inner">
      <div class="section-label">FAQ</div>
      <h2 class="section-title">Datenschutz &amp; wie alles funktioniert.</h2>
      <div class="faq-list">
        <FAQItem v-for="item in FAQS" :key="item.q" :q="item.q" :a="item.a" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq-section {
  background: var(--cream-deep);
  padding: 80px 48px;
  border-top: 1px solid var(--border);
}

.faq-inner {
  max-width: 720px;
  margin: 0 auto;
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

.faq-list {
  margin-top: 40px;
}

@media (max-width: 680px) {
  .faq-section {
    padding: 60px 20px;
  }
}
</style>
