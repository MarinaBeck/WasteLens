# Handoff: WasteLense — AI Waste Sorting Web App

## Overview
WasteLense is a single-page web app that lets users upload a photo of a waste item, classifies it using a Teachable Machine AI model running entirely in-browser, and tells them which recycling bin it belongs in. The page also includes a bins reference guide and a privacy-focused FAQ.

## About the Design Files
The `index.html` file in this bundle is a **high-fidelity design reference built as an HTML prototype** — it shows the intended look, layout, interactions, and content. It is **not** production code to be shipped directly.

Your task is to **recreate this design in your target codebase** (React, Next.js, Vue, etc.) using its established patterns, component libraries, and routing conventions. If no codebase exists yet, React + Next.js is a sensible choice given the interactive nature of the page.

## Fidelity
**High-fidelity.** The prototype uses final colors, typography, spacing, copy, and interactions. Recreate it pixel-accurately using your codebase's design system and component library. Exact token values are listed in the Design Tokens section below.

---

## Screens / Views

### 1. Navigation Bar
- **Position:** Sticky top, full width, z-index 100
- **Height:** ~64px
- **Background:** Cream `#f6f1e9` at 88% opacity with `backdrop-filter: blur(12px)`
- **Border:** 1px solid `#ddd8cc` bottom
- **Layout:** Flex row, space-between, horizontal padding 48px
- **Left:** Logo — leaf SVG icon + "WasteLense" in Lora serif 700, 1.25rem, forest green `#2d5a3d`
- **Right:** Nav links — "Scan", "Bins Guide", "FAQ" in DM Sans 500, 0.875rem, muted `#7a7568`. Hover → forest green. Smooth 0.2s color transition.

---

### 2. Hero Section
- **Max-width:** 860px, centered, padding 80px top / 60px bottom
- **Text align:** Center
- **Eyebrow pill:** Inline-flex, sage-light bg `#deeedd`, forest-mid text `#4a7c5a`, 0.78rem, 600 weight, uppercase, 0.08em letter-spacing, 100px border-radius, checkmark SVG icon left
- **H1:** Lora serif, 700, ~4rem desktop / `clamp(2.6rem, 5vw, 4rem)`, line-height 1.18, letter-spacing -0.03em, forest green. The word "correctly" is italic and uses clay color `#b8723a`
- **Body copy:** DM Sans 300, 1.1rem, muted `#7a7568`, max-width 520px, centered, text-wrap: pretty

---

### 3. Upload Zone (main interaction)
- **Max-width:** 760px, centered, padding 0 48px
- **Container:** `min-height: 340px`, dashed border `2px dashed` sage `#8fba8f`, border-radius 24px, cream-deep bg `#ede8df`, flex column centered
- **Drag-over state:** Border → forest green, bg → sage-light `#deeedd`, `transform: scale(1.01)`
- **Hidden `<input type="file">` covers the entire zone** (absolute inset 0, opacity 0)
- **Upload icon:** 72px circle, sage-light bg, leaf/arrow SVG inside. On hover: `translateY(-4px)` transition
- **Title:** "Drop your waste photo here" — Lora serif, 600, 1.3rem, forest green
- **Subtitle:** "or click to browse — JPG, PNG, WebP up to 20 MB" — DM Sans, 0.875rem, muted
- **Button:** "Choose image" — forest green bg, white text, 100px border-radius, 11px 28px padding, pointer-events: none (click propagates to file input)

#### After image selected:
- Replace zone content with `<img>` preview, max-height 420px, object-fit contain, border-radius 22px
- Gradient overlay bottom-to-top (dark → transparent), with "← Change photo" button bottom-left (white bg, forest green text, 100px radius)

---

### 4. Analyse Button + Privacy Note
- **Below the upload zone,** flex column centered, gap 12px
- **Button:** "Analyse Waste" — forest green bg `#2d5a3d`, white text, 100px radius, 16px 48px padding, 1rem 600, box-shadow `0 4px 20px rgba(forest, 0.3)`. Hover: lighten bg, `translateY(-2px)`, stronger shadow. Disabled: opacity 0.5. Loading state: "Analysing…" with spinning circle SVG + pulse animation.
- **Privacy note:** 0.78rem, muted, shield + checkmark SVG icon left. Text: "Processed locally in your browser · no data sent to servers"

---

### 5. Result Card
- **Appears below the analyse button** after classification, animated in with `slideUp` (opacity 0→1, translateY 24px→0, 0.45s cubic-bezier(0.22,1,0.36,1))
- **Background and border color depend on detected bin** (see Bin Colors below)
- **Header (padding 28px 32px):** Flex row, align center, gap 20px
  - Bin icon: 64px × 64px, border-radius 16px, bin-color at 13% opacity bg, emoji inside
  - Bin label: 0.78rem, 600, uppercase, 0.08em spacing, bin color, 70% opacity
  - Bin title: Lora serif, 1.7rem, 700, ink color
  - Short description: DM Sans, 0.875rem, muted
  - Confidence: right-aligned — large number in Lora serif 700 2rem (bin color), label "confidence" in 0.75rem muted
- **Body (padding 24px 32px 28px):** 2-column grid, white 45% opacity bg
  - Left: "What to do" — preparation instructions in 0.93rem
  - Right: "Detected as" tags + "Also accepts" tags — pill chips with bin-color bg at 18% opacity

---

### 6. How It Works Section
- **Full-width, forest green bg `#2d5a3d`**, white text
- **Padding:** 80px 48px
- **Decorative radial gradient** top-left: sage at 15% opacity
- **Inner max-width:** 860px, centered
- **Section label:** "How it works" — 0.75rem, 600, uppercase, 0.1em spacing, sage `#8fba8f`
- **H2:** Lora serif, 600, ~2.5rem, "From photo to sorted in under two seconds."
- **3-column grid** (gap 32px), each step:
  - Number badge: 40px square, border-radius 12px, white 10% opacity bg, Lora 700, sage colored number
  - H3: 1rem, 600, white
  - P: 0.875rem, `oklch(85% 0.02 145)` (light desaturated sage-white), line-height 1.55

---

### 7. Bins Guide
- **Max-width:** 960px, centered, padding 80px 48px
- **3-column grid** (gap 16px) of bin cards:
  - Border-radius 18px, padding 24px, cream-deep bg, 1px border `#ddd8cc`
  - Hover: `translateY(-3px)`, box-shadow
  - 44px × 44px icon badge (bin color at 13% opacity bg + emoji), border-radius 12px
  - H3: 0.98rem, 600, forest green
  - P: 0.82rem, muted — lists first 3 accepted items

---

### 8. FAQ Section
- **Background:** cream-deep `#ede8df`, border-top 1px `#ddd8cc`
- **Padding:** 80px 48px, inner max-width 720px
- **Accordion items** — each:
  - Bottom border 1px `#ddd8cc`
  - Question button: full width, flex row space-between, 22px 0 padding, DM Sans 500 0.98rem
  - Chevron: 22px circle, bg `#ddd8cc`. On open: bg sage-light, `rotate(180deg)`, 0.25s transition
  - Answer: `max-height: 0` → `max-height: 500px` transition (0.35s ease) when open, 0.9rem muted, line-height 1.7

**FAQ questions covered:**
1. Where are my photos processed?
2. Do you store or share my images?
3. What data does WasteLense collect?
4. Is the AI classification always accurate?
5. What AI technology powers the classification?
6. My local recycling rules are different — what should I do?
7. How can I improve my waste sorting?

All answers emphasize **full local/browser-side processing, zero server storage, no personal data collection.**

---

### 9. Footer
- **Forest green bg**, padding 40px 48px
- **Flex row, space-between**
- Left: "WasteLense" in Lora white bold + tagline in `oklch(85% 0.03 148)`
- Right: Links — Privacy, Data Protection, Scan Waste in sage green `#8fba8f`, hover → white

---

## Interactions & Behavior

### File Upload
- Click anywhere on upload zone → triggers `<input type="file">`
- Drag-and-drop supported — `dragover` / `dragleave` / `drop` events on the zone
- Accepts: `image/*`
- On file select: read as Data URL, display preview, clear previous result

### AI Classification (`analyze()`)
1. Show loading state on button ("Analysing…" + spin animation + pulse)
2. If `TM_MODEL_URL` is set: load Teachable Machine model (cached after first load), call `model.predict(imgElement)`
3. **Demo mode** (no model URL): `await 1800ms delay`, pick a random result from `DEMO_RESULTS`
4. Show result card with `slideUp` animation
5. Smooth-scroll result card into view

### Teachable Machine Integration
- Library: `@teachablemachine/image@0.8` from jsDelivr CDN (load on demand, not at page load)
- Also requires: `@tensorflow/tfjs` (TM image library loads this automatically)
- Model URL pattern: `https://teachablemachine.withgoogle.com/models/XXXX/`
  - Load: `tmImage.load(modelURL + "model.json", modelURL + "metadata.json")`
  - Predict: `model.predict(imgElement)` → returns `[{className, probability}]`
- **Map class names to bins** — example mapping in the prototype:
  ```
  plastic/metal/can → yellow
  paper/cardboard   → blue
  organic/food      → brown
  glass             → green
  battery/electronics → special
  trash/other       → black
  ```
  Adjust this mapping to match your specific model's class names.

### FAQ Accordion
- Click question → toggle `open` state
- `max-height` CSS transition for smooth expand/collapse (not JS height measurement)
- Only one item open at a time is not required — multiple can be open

---

## Bin Definitions

| Bin Key  | Label           | Color (approx)         | Icon | Accepts |
|----------|----------------|------------------------|------|---------|
| yellow   | Yellow Bin      | `#d4a843` (warm yellow)| ♻️   | Plastic, metal, cartons |
| blue     | Blue Bin        | `#4a7fc1` (medium blue)| 📄   | Paper, cardboard |
| brown    | Brown Bin       | `#8b5e3c` (warm brown) | 🌿   | Organic/food scraps |
| black    | Black Bin       | `#2a2a2a`              | 🗑️   | Residual/non-recyclable |
| green    | Glass Bank      | `#3d9a60` (mid green)  | 🍾   | Glass bottles & jars |
| special  | Special Disposal| `#d4732a` (orange)     | ⚠️   | Batteries, e-waste, chemicals |

Each bin has: preparation instruction, accepts list (4 items), rejects list (3 items).

---

## Design Tokens

### Colors
```
--cream:        oklch(96.5% 0.012 82)   ≈ #f6f1e9
--cream-deep:   oklch(93%   0.018 80)   ≈ #ede8df
--forest:       oklch(31%   0.095 148)  ≈ #2d5a3d
--forest-mid:   oklch(44%   0.1   148)  ≈ #4a7c5a
--sage:         oklch(72%   0.09  145)  ≈ #8fba8f
--sage-light:   oklch(89%   0.055 142)  ≈ #deeedd
--clay:         oklch(55%   0.09  52)   ≈ #b8723a
--clay-light:   oklch(88%   0.04  60)   ≈ #f0e0d0
--ink:          oklch(18%   0.02  80)   ≈ #2a2820
--muted:        oklch(48%   0.02  80)   ≈ #7a7568
--border:       oklch(86%   0.025 90)   ≈ #ddd8cc
```

### Typography
```
Display / Headings:  Lora (Google Fonts), weights 400 / 600 / 700, italic 400
Body / UI:           DM Sans (Google Fonts), weights 300 / 400 / 500 / 600

H1:  Lora 700, clamp(2.6rem, 5vw, 4rem), lh 1.18, ls -0.03em
H2:  Lora 600, clamp(1.8rem, 3vw, 2.5rem), lh 1.2, ls -0.02em
Body: DM Sans 400, 1rem, lh 1.6
Small/label: DM Sans 600, 0.75–0.78rem, uppercase, ls 0.08–0.1em
```

### Spacing
```
Section padding:   80px vertical / 48px horizontal (desktop)
                   60px vertical / 20px horizontal (mobile)
Max content width: 760px (scanner), 860px (hero/how), 960px (bins), 720px (faq)
Card padding:      24px (bin cards), 28px 32px (result header), 24px 32px (result body)
Border radius:     24px (upload zone), 20px (result card), 18px (bin cards), 16px (tweaks), 100px (pills/buttons)
```

### Shadows
```
Analyse button default: 0 4px 20px oklch(31% 0.095 148 / 0.3)
Analyse button hover:   0 8px 28px oklch(31% 0.095 148 / 0.35)
Card hover:             0 8px 24px oklch(0% 0 0 / 0.07)
```

### Animations
```
slideUp (result card):   opacity 0→1, translateY 24px→0, 0.45s cubic-bezier(0.22, 1, 0.36, 1)
button pulse (loading):  opacity 1→0.65→1, 1.4s ease-in-out infinite
spinner (loading icon):  rotate 360deg, 1s linear infinite
FAQ expand:              max-height 0→500px, 0.35s ease
chevron rotate:          0→180deg, 0.25s
hover lifts:             translateY -3px, 0.2s
```

---

## State Management

```
image: string | null         — Data URL of uploaded image, null = no image
dragging: boolean            — Drag-over state for upload zone styling
analyzing: boolean           — True while classification is running
result: {
  bin: string,               — Key from BINS object ('yellow'|'blue'|'brown'|'black'|'green'|'special')
  confidence: number,        — 0–1 float
  items: string[]            — Detected class name(s)
} | null
```

---

## Assets
- **Fonts:** Lora + DM Sans via Google Fonts CDN
- **Icons:** Inline SVGs only (no icon library needed) — leaf logo, upload arrow, search/analyze icon, shield icon, chevron
- **Emojis:** Used as bin icons inside the result cards and bin guide cards
- **No external images** — the only user-provided image is the waste photo they upload

---

## Privacy & Data Protection Copy
The FAQ answers are the primary copy for privacy statements. Key claims to preserve verbatim (important for legal/trust reasons):
- "Your photos are analyzed entirely within your browser"
- "The image data is never uploaded to our servers or any external service"
- "We do not store, retain, or share any images you upload"
- "WasteLense collects no personal data"

---

## Files in This Package
| File | Description |
|------|-------------|
| `index.html` | Complete hi-fi prototype — single self-contained page |
| `README.md` | This document |

Open `index.html` in a browser to interact with the prototype. Upload any photo and click "Analyse Waste" to see the demo classification flow.
