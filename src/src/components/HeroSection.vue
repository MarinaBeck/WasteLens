<template>
  <section class="hero">
    <div class="hero-eyebrow">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <circle cx="6" cy="6" r="5" fill="oklch(44% 0.1 148)"/>
        <path d="M4 6l1.5 1.5L8 4" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      KI-gestützte Mülltrennung
    </div>
    <h1>Sortiere deinen Müll <em>richtig</em> —<br/>jedes einzelne Mal.</h1>
    <p>
      Foto eines Abfallartikels aufnehmen oder hochladen. WasteLense erkennt ihn
      und sagt dir genau, in welche Tonne er gehört — kein Raten, keine Fehlsortierung.
    </p>
    <div class="hero-actions">
      <ShareButton />
    </div>
  </section>
</template>

<script setup>
import ShareButton from './ShareButton.vue'
</script>

<style scoped>
.hero-actions {
  margin-top: 28px;
  display: flex;
  justify-content: center;
}

.hero {
  padding: 80px 48px 60px;
  max-width: 860px;
  margin: 0 auto;
  text-align: center;
}

.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--sage-light);
  color: var(--forest-mid);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 5px 14px;
  border-radius: 100px;
  margin-bottom: 28px;
}

h1 {
  font-family: 'Lora', serif;
  font-size: clamp(2.6rem, 5vw, 4rem);
  font-weight: 700;
  line-height: 1.18;
  letter-spacing: -0.03em;
  color: var(--forest);
  margin-bottom: 20px;
}

h1 em {
  font-style: italic;
  color: var(--clay);
}

p {
  font-size: 1.1rem;
  color: var(--muted);
  font-weight: 300;
  max-width: 520px;
  margin: 0 auto;
  text-wrap: pretty;
}

@media (max-width: 680px) {
  .hero {
    padding: 60px 20px 40px;
  }
}
</style>
