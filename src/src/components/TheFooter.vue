<template>
  <footer>
    <div>
      <div class="logo">WasteLense</div>
      <div class="tagline">Mülltrennung leicht gemacht · {{ new Date().getFullYear() }}</div>
      <div>Link zum Kaggle-Datensatz</div>
    </div>
    <div class="footer-links">
      <a href="#faq">Datenschutz</a>
    </div>
  </footer>
</template>

<style scoped>
footer {
  background: var(--forest);
  color: oklch(85% 0.03 148);
  padding: 40px 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.82rem;
}

.logo {
  font-family: 'Lora', serif;
  color: white;
  font-weight: 700;
  font-size: 1rem;
}

.tagline {
  margin-top: 6px;
}

.footer-links {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.footer-links a {
  color: var(--sage);
  text-decoration: none;
  transition: color 0.2s;
}
.footer-links a:hover {
  color: white;
}

@media (max-width: 680px) {
  footer {
    flex-direction: column;
    gap: 12px;
    text-align: center;
    padding: 32px 20px;
  }
  .footer-links {
    justify-content: center;
  }
}
</style>
