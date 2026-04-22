<script setup>
import logoUrl from '../assets/wastelense-logo-icon-512.svg'
</script>

<template>
  <nav>
    <a href="#" class="nav-logo">
      <img :src="logoUrl" alt="WasteLense Logo" class="nav-logo-img" />
      WasteLense
    </a>
    <div class="nav-links">
      <a href="#scanner">Scan</a>
      <a href="#bins-guide">Tonnen-Guide</a>
      <a href="#faq">FAQ</a>
    </div>
  </nav>
</template>

<style scoped>
nav {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 48px;
  background: oklch(96.5% 0.012 82 / 0.88);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
}

.nav-logo-img {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: 'Lora', serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--forest);
  text-decoration: none;
  letter-spacing: -0.02em;
}

.nav-links {
  display: flex;
  gap: 32px;
}

.nav-links a {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--muted);
  text-decoration: none;
  transition: color 0.2s;
}
.nav-links a:hover {
  color: var(--forest);
}

@media (max-width: 680px) {
  nav {
    padding: 16px 20px;
  }
  .nav-links {
    gap: 20px;
  }
}
</style>
