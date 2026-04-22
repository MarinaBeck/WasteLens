<template>
  <nav>
    <a href="#" class="nav-logo">
      <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
        <circle cx="14" cy="14" r="13" fill="oklch(89% 0.055 142)"/>
        <path d="M14 6C10 6 7 9 7 13c0 3 1.5 5.5 4 6.5V22h6v-2.5c2.5-1 4-3.5 4-6.5 0-4-3-7-7-7z" fill="oklch(31% 0.095 148)"/>
        <path d="M11 13c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3-3-1.34-3-3z" fill="oklch(89% 0.055 142)"/>
      </svg>
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
