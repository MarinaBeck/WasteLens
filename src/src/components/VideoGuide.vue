<template>
  <section class="how-section" id="anleitung">
    <div class="how-inner">
      <div class="section-label">So funktioniert es</div>
      <h2 class="section-title">Vom Foto zur Sortierung<br/>in unter zwei Sekunden.</h2>

      <div class="explainer">
        <!-- Scenes -->
        <div class="scene" :class="{ active: current === 0 }">
          <div class="bg-blob" style="width:200px;height:200px;background:#818cf8;top:-60px;left:-40px;"></div>
          <div class="bg-blob" style="width:120px;height:120px;background:#a5b4fc;bottom:-30px;right:-20px;"></div>
          <svg width="100%" viewBox="0 0 560 300" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="270" x2="560" y2="270" stroke="#c7d0e8" stroke-width="1.5"/>
            <rect x="60" y="180" width="60" height="80" rx="4" fill="#3b82f6" opacity="0.9"/>
            <rect x="58" y="175" width="64" height="14" rx="3" fill="#2563eb"/>
            <rect x="72" y="200" width="36" height="4" rx="2" fill="#93c5fd"/>
            <text x="90" y="268" text-anchor="middle" font-size="11" fill="#6b7280" font-family="sans-serif">Papier</text>
            <rect x="160" y="190" width="60" height="70" rx="4" fill="#eab308" opacity="0.9"/>
            <rect x="158" y="185" width="64" height="14" rx="3" fill="#ca8a04"/>
            <rect x="172" y="210" width="36" height="4" rx="2" fill="#fef08a"/>
            <text x="190" y="268" text-anchor="middle" font-size="11" fill="#6b7280" font-family="sans-serif">Gelber Sack</text>
            <rect x="260" y="185" width="60" height="75" rx="4" fill="#22c55e" opacity="0.9"/>
            <rect x="258" y="180" width="64" height="14" rx="3" fill="#16a34a"/>
            <rect x="272" y="205" width="36" height="4" rx="2" fill="#86efac"/>
            <text x="290" y="268" text-anchor="middle" font-size="11" fill="#6b7280" font-family="sans-serif">Bio</text>
            <rect x="360" y="175" width="60" height="85" rx="4" fill="#6b7280" opacity="0.9"/>
            <rect x="358" y="170" width="64" height="14" rx="3" fill="#4b5563"/>
            <rect x="372" y="195" width="36" height="4" rx="2" fill="#d1d5db"/>
            <text x="390" y="268" text-anchor="middle" font-size="11" fill="#6b7280" font-family="sans-serif">Restmüll</text>
            <rect x="460" y="175" width="30" height="60" rx="6" fill="#818cf8"/>
            <circle cx="475" cy="162" r="18" fill="#fbbf24"/>
            <ellipse cx="475" cy="148" rx="18" ry="8" fill="#1e293b"/>
            <line x1="460" y1="195" x2="440" y2="178" stroke="#818cf8" stroke-width="8" stroke-linecap="round"/>
            <rect x="460" y="228" width="12" height="36" rx="5" fill="#3730a3"/>
            <rect x="476" y="228" width="12" height="36" rx="5" fill="#3730a3"/>
            <ellipse cx="466" cy="264" rx="10" ry="5" fill="#fbbf24"/>
            <ellipse cx="482" cy="264" rx="10" ry="5" fill="#fbbf24"/>
            <g style="animation: questionBounce 1s ease-in-out infinite;">
              <ellipse cx="510" cy="125" rx="22" ry="22" fill="white" stroke="#818cf8" stroke-width="1.5"/>
              <text x="510" y="132" text-anchor="middle" font-size="22" font-weight="bold" fill="#4f46e5" font-family="sans-serif">?</text>
            </g>
            <rect x="432" y="165" width="18" height="22" rx="3" fill="#f87171"/>
            <rect x="432" y="160" width="18" height="7" rx="2" fill="#ef4444"/>
            <text x="280" y="38" text-anchor="middle" font-size="15" font-weight="500" fill="#4338ca" font-family="sans-serif" style="animation: fadeIn 0.5s ease;">Wo kommt das hin?</text>
          </svg>
        </div>

        <div class="scene" :class="{ active: current === 1 }">
          <div class="bg-blob" style="width:180px;height:180px;background:#818cf8;top:-50px;right:-30px;"></div>
          <div class="bg-blob" style="width:100px;height:100px;background:#c4b5fd;bottom:-20px;left:10px;"></div>
          <svg width="100%" viewBox="0 0 560 300" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="270" x2="560" y2="270" stroke="#c7d0e8" stroke-width="1.5"/>
            <rect x="90" y="155" width="30" height="65" rx="6" fill="#818cf8"/>
            <circle cx="105" cy="140" r="18" fill="#fbbf24"/>
            <ellipse cx="105" cy="127" rx="18" ry="8" fill="#f59e0b"/>
            <rect x="90" y="228" width="12" height="36" rx="5" fill="#3730a3"/>
            <rect x="106" y="228" width="12" height="36" rx="5" fill="#3730a3"/>
            <ellipse cx="96" cy="264" rx="10" ry="5" fill="#fbbf24"/>
            <ellipse cx="112" cy="264" rx="10" ry="5" fill="#fbbf24"/>
            <line x1="120" y1="175" x2="170" y2="160" stroke="#818cf8" stroke-width="8" stroke-linecap="round"/>
            <rect x="168" y="100" width="90" height="155" rx="12" fill="#1e293b"/>
            <rect x="172" y="110" width="82" height="128" rx="8" fill="#f0f4ff"/>
            <rect x="200" y="106" width="28" height="8" rx="4" fill="#0f172a"/>
            <rect x="172" y="110" width="82" height="22" rx="8" fill="#4f46e5"/>
            <rect x="172" y="124" width="82" height="8" fill="#4f46e5"/>
            <text x="213" y="125" text-anchor="middle" font-size="8" font-weight="500" fill="white" font-family="sans-serif">WasteLens</text>
            <rect x="180" y="138" width="66" height="56" rx="4" fill="#dbeafe"/>
            <polyline points="184,146 184,142 188,142" fill="none" stroke="#4f46e5" stroke-width="1.5" stroke-linecap="round"/>
            <polyline points="238,146 238,142 234,142" fill="none" stroke="#4f46e5" stroke-width="1.5" stroke-linecap="round"/>
            <polyline points="184,186 184,190 188,190" fill="none" stroke="#4f46e5" stroke-width="1.5" stroke-linecap="round"/>
            <polyline points="238,186 238,190 234,190" fill="none" stroke="#4f46e5" stroke-width="1.5" stroke-linecap="round"/>
            <rect x="197" y="150" width="32" height="36" rx="3" fill="#f87171"/>
            <rect x="197" y="145" width="32" height="10" rx="3" fill="#ef4444"/>
            <line x1="182" y1="155" x2="244" y2="155" stroke="#4f46e5" stroke-width="1.5" stroke-dasharray="4,2" opacity="0.7" style="animation: scanLine 1.2s ease-in-out infinite;"/>
            <circle cx="213" cy="210" r="10" fill="#4f46e5"/>
            <circle cx="213" cy="210" r="6" fill="white"/>
            <circle cx="213" cy="210" r="4" fill="#4f46e5"/>
            <rect x="310" y="130" width="120" height="50" rx="10" fill="white" stroke="#c7d0e8" stroke-width="0.8"/>
            <text x="370" y="152" text-anchor="middle" font-size="13" font-weight="500" fill="#4f46e5" font-family="sans-serif">WasteLens</text>
            <text x="370" y="168" text-anchor="middle" font-size="10" fill="#6b7280" font-family="sans-serif">Foto aufnehmen →</text>
            <line x1="292" y1="155" x2="310" y2="155" stroke="#c7d0e8" stroke-width="1" stroke-dasharray="3,2"/>
            <text x="280" y="38" text-anchor="middle" font-size="15" font-weight="500" fill="#4338ca" font-family="sans-serif">App erkennt den Gegenstand</text>
          </svg>
        </div>

        <div class="scene" :class="{ active: current === 2 }">
          <div class="bg-blob" style="width:160px;height:160px;background:#a5b4fc;top:-40px;left:-30px;"></div>
          <svg width="100%" viewBox="0 0 560 300" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="arr2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M2 1L8 5L2 9" fill="none" stroke="#4f46e5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </marker>
            </defs>
            <line x1="0" y1="270" x2="560" y2="270" stroke="#c7d0e8" stroke-width="1.5"/>
            <rect x="30" y="140" width="56" height="96" rx="8" fill="#1e293b"/>
            <rect x="34" y="148" width="48" height="72" rx="5" fill="#f0f4ff"/>
            <rect x="34" y="148" width="48" height="14" rx="5" fill="#4f46e5"/>
            <rect x="34" y="155" width="48" height="7" fill="#4f46e5"/>
            <text x="58" y="156" text-anchor="middle" font-size="6" font-weight="500" fill="white" font-family="sans-serif">WasteLens</text>
            <rect x="38" y="167" width="40" height="36" rx="3" fill="#dbeafe"/>
            <rect x="44" y="173" width="20" height="24" rx="2" fill="#f87171"/>
            <rect x="44" y="169" width="20" height="7" rx="2" fill="#ef4444"/>
            <path d="M90 188 C160 188, 220 140, 310 185" fill="none" stroke="#4f46e5" stroke-width="2.5" stroke-dasharray="300" stroke-dashoffset="300" marker-end="url(#arr2)" style="animation: arrowGrow 1s ease forwards 0.3s;"/>
            <rect x="130" y="100" width="110" height="44" rx="10" fill="white" stroke="#c7d0e8" stroke-width="0.8"/>
            <text x="185" y="120" text-anchor="middle" font-size="10" font-weight="500" fill="#4f46e5" font-family="sans-serif">→ Gelber Sack</text>
            <text x="185" y="135" text-anchor="middle" font-size="9" fill="#6b7280" font-family="sans-serif">Verpackung erkannt</text>
            <polygon points="175,144 185,155 195,144" fill="white" stroke="#c7d0e8" stroke-width="0.8"/>
            <rect x="300" y="195" width="44" height="65" rx="4" fill="#3b82f6" opacity="0.3"/>
            <rect x="298" y="190" width="48" height="12" rx="3" fill="#2563eb" opacity="0.3"/>
            <text x="322" y="268" text-anchor="middle" font-size="10" fill="#9ca3af" font-family="sans-serif">Papier</text>
            <rect x="358" y="183" width="48" height="77" rx="4" fill="#eab308" opacity="1"/>
            <rect x="356" y="177" width="52" height="13" rx="3" fill="#ca8a04"/>
            <text x="382" y="268" text-anchor="middle" font-size="10" font-weight="500" fill="#854d0e" font-family="sans-serif">Gelber Sack</text>
            <rect x="354" y="175" width="56" height="83" rx="6" fill="none" stroke="#fde047" stroke-width="2.5" style="animation: pulse 1s ease-in-out infinite;"/>
            <rect x="420" y="197" width="44" height="63" rx="4" fill="#22c55e" opacity="0.3"/>
            <rect x="418" y="191" width="48" height="12" rx="3" fill="#16a34a" opacity="0.3"/>
            <text x="442" y="268" text-anchor="middle" font-size="10" fill="#9ca3af" font-family="sans-serif">Bio</text>
            <text x="280" y="38" text-anchor="middle" font-size="15" font-weight="500" fill="#4338ca" font-family="sans-serif">KI zeigt: Gelber Sack!</text>
          </svg>
        </div>

        <div class="scene" :class="{ active: current === 3 }">
          <div class="bg-blob" style="width:220px;height:220px;background:#bbf7d0;top:-70px;right:-50px;"></div>
          <div class="bg-blob" style="width:130px;height:130px;background:#a5b4fc;bottom:-30px;left:-20px;"></div>
          <svg width="100%" viewBox="0 0 560 300" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="270" x2="560" y2="270" stroke="#c7d0e8" stroke-width="1.5"/>
            <rect x="210" y="125" width="140" height="135" rx="8" fill="#22c55e" opacity="0.95"/>
            <rect x="206" y="112" width="148" height="22" rx="6" fill="#16a34a"/>
            <rect x="226" y="150" width="100" height="8" rx="3" fill="#86efac"/>
            <rect x="226" y="168" width="100" height="8" rx="3" fill="#86efac"/>
            <text x="280" y="268" text-anchor="middle" font-size="12" font-weight="500" fill="#14532d" font-family="sans-serif">Richtig!</text>
            <circle cx="280" cy="120" r="28" fill="white" stroke="#22c55e" stroke-width="2" style="animation: checkPop 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards;"/>
            <polyline points="268,121 276,130 294,112" fill="none" stroke="#16a34a" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
            <rect x="200" y="103" width="160" height="157" rx="10" fill="none" stroke="#4ade80" stroke-width="2" style="animation: glowBin 1.5s ease-in-out infinite;"/>
            <rect x="410" y="175" width="30" height="65" rx="6" fill="#818cf8"/>
            <circle cx="425" cy="158" r="18" fill="#fbbf24"/>
            <ellipse cx="425" cy="145" rx="18" ry="8" fill="#f59e0b"/>
            <path d="M417 163 Q425 170 433 163" fill="none" stroke="#92400e" stroke-width="1.5" stroke-linecap="round"/>
            <line x1="440" y1="185" x2="458" y2="165" stroke="#818cf8" stroke-width="8" stroke-linecap="round"/>
            <rect x="410" y="234" width="12" height="30" rx="5" fill="#3730a3"/>
            <rect x="426" y="234" width="12" height="30" rx="5" fill="#3730a3"/>
            <ellipse cx="416" cy="264" rx="10" ry="5" fill="#fbbf24"/>
            <ellipse cx="432" cy="264" rx="10" ry="5" fill="#fbbf24"/>
            <text x="455" y="162" font-size="14" font-family="sans-serif" fill="#fbbf24">✦</text>
            <text x="468" y="148" font-size="10" font-family="sans-serif" fill="#fbbf24">✦</text>
            <text x="446" y="147" font-size="8" font-family="sans-serif" fill="#fbbf24">✦</text>
            <rect x="40" y="115" width="148" height="52" rx="10" fill="white" stroke="#c7d0e8" stroke-width="0.8"/>
            <text x="114" y="138" text-anchor="middle" font-size="12" font-weight="500" fill="#4f46e5" font-family="sans-serif">WasteLens</text>
            <text x="114" y="154" text-anchor="middle" font-size="9" fill="#6b7280" font-family="sans-serif">weiß, wohin dein</text>
            <text x="114" y="164" text-anchor="middle" font-size="9" fill="#6b7280" font-family="sans-serif">Müll gehört.</text>
          </svg>
        </div>

        <!-- Controls -->
        <div class="progress-bar">
          <div v-for="i in 4" :key="i" class="progress-dot" :class="{ active: current === i - 1 }"></div>
        </div>
        <div class="time-label">{{ labels[current] }}</div>
        <div class="btn-row">
          <button class="ctrl-btn" @click="navigate(-1)">← Zurück</button>
          <button class="ctrl-btn play-btn" @click="togglePlay">
            {{ playing ? '⏸ Pause' : '▶ Abspielen' }}
          </button>
          <button class="ctrl-btn" @click="navigate(1)">Weiter →</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'

const current = ref(0)
const playing = ref(false)
let timer = null

const labels = [
  'Sekunde 0–2: Entscheidung vor den Mülltonnen',
  'Sekunde 3–5: WasteLens App – Foto aufnehmen',
  'Sekunde 6–8: KI zeigt die richtige Tonne',
  'Sekunde 9–10: Richtig sortiert – Aufgabe erledigt!',
]

function navigate(dir) {
  stopPlay()
  current.value = Math.max(0, Math.min(3, current.value + dir))
}

function togglePlay() {
  if (playing.value) { stopPlay(); return }
  playing.value = true
  current.value = 0
  timer = setInterval(() => {
    if (current.value >= 3) { stopPlay(); return }
    current.value++
  }, 2500)
}

function stopPlay() {
  playing.value = false
  clearInterval(timer)
  timer = null
}

onUnmounted(stopPlay)
</script>

<!-- Global keyframes — must not be scoped so SVG inline styles can reference them -->
<style>
@keyframes fadeIn      { from { opacity: 0; }                          to { opacity: 1; } }
@keyframes questionBounce { 0%,100% { transform: translateY(0); }     50% { transform: translateY(-6px); } }
@keyframes scanLine    { 0%  { transform: translateY(0); opacity: 1; } 100% { transform: translateY(60px); opacity: 0.4; } }
@keyframes arrowGrow   { from { stroke-dashoffset: 300; opacity: 0; } to { stroke-dashoffset: 0; opacity: 1; } }
@keyframes glowBin     { 0%,100% { filter: drop-shadow(0 0 0px #4ade80); } 50% { filter: drop-shadow(0 0 12px #4ade80); } }
@keyframes checkPop    { 0% { transform: scale(0); opacity: 0; }      70% { transform: scale(1.3); } 100% { transform: scale(1); opacity: 1; } }
</style>

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
  margin-bottom: 40px;
  color: white;
}

.explainer {
  background: #f0f4ff;
  border-radius: 16px;
  overflow: hidden;
  padding: 0 0 16px;
}

.scene {
  display: none;
  width: 100%;
  position: relative;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 8px 0 0;
}
.scene.active {
  display: flex;
}

.bg-blob {
  position: absolute;
  border-radius: 50%;
  opacity: 0.15;
}

.progress-bar {
  display: flex;
  gap: 6px;
  justify-content: center;
  padding: 12px 0 0;
}

.progress-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #c7d0e8;
  transition: background 0.3s;
}
.progress-dot.active {
  background: #4f46e5;
}

.time-label {
  font-size: 11px;
  color: #6b7280;
  text-align: center;
  padding: 6px 0 0;
  font-family: 'DM Sans', sans-serif;
}

.btn-row {
  display: flex;
  gap: 10px;
  justify-content: center;
  padding: 10px 0 0;
}

.ctrl-btn {
  padding: 6px 18px;
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;
  border: 1px solid #e2e8f0;
  background: white;
  color: #374151;
  font-family: 'DM Sans', sans-serif;
  transition: background 0.15s;
}
.ctrl-btn:hover {
  background: #f1f5f9;
}
.play-btn {
  background: #4f46e5;
  color: white;
  border-color: #4f46e5;
}
.play-btn:hover {
  background: #4338ca;
}

@media (max-width: 680px) {
  .how-section {
    padding: 60px 20px;
  }
}
</style>
