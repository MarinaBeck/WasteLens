<template>
  <section class="how-section">
    <div class="how-inner">
      <div class="section-label">So funktioniert es</div>
      <h2 class="section-title">Vom Foto zur Sortierung<br/>in unter zwei Sekunden.</h2>
      <div class="steps-grid">
        <div class="step">
          <div class="step-num">1</div>
          <h3>Foto hochladen</h3>
          <p>Ein klares Foto des Abfallartikels aufnehmen oder aus der Galerie hochladen. Das Modell funktioniert am besten bei einzelnen Objekten vor einfachem Hintergrund.</p>
        </div>
        <div class="step">
          <div class="step-num">2</div>
          <h3>KI klassifiziert im Browser</h3>
          <p>Ein Teachable Machine Modell läuft direkt auf deinem Gerät mit TensorFlow.js — kein Bild verlässt deinen Browser. Schnell, privat, offline-fähig.</p>
        </div>
        <div class="step">
          <div class="step-num">3</div>
          <h3>Tonne & Tipps erhalten</h3>
          <p>Die richtige Tonne, einen Konfidenzwert, Vorbereitungshinweise und ähnliche Artikel, die die Tonne akzeptiert — alles für korrekte Mülltrennung.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.how-section {
  background: var(--forest);
  color: white;
  padding: 80px 48px;
  position: relative;
  overflow: hidden;
}

.how-section::before {
  content: '';
  position: absolute;
  top: -60px;
  left: -40px;
  width: 340px;
  height: 340px;
  background: radial-gradient(circle, oklch(72% 0.09 145 / 0.15) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
}

.how-inner {
  max-width: 860px;
  margin: 0 auto;
  position: relative;
}

.section-label {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--sage);
  margin-bottom: 16px;
}

.section-title {
  font-family: 'Lora', serif;
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin-bottom: 48px;
  color: white;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}

.step {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.step-num {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: oklch(100% 0 0 / 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Lora', serif;
  font-weight: 700;
  color: var(--sage);
  font-size: 1rem;
}

.step h3 {
  font-size: 1rem;
  font-weight: 600;
  color: white;
}

.step p {
  font-size: 0.875rem;
  color: oklch(85% 0.02 145);
  text-wrap: pretty;
  line-height: 1.55;
}

@media (max-width: 680px) {
  .how-section {
    padding: 60px 20px;
  }
  .steps-grid {
    grid-template-columns: 1fr;
  }
}
</style>
