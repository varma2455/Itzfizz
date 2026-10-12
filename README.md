# ITZFIZZ — Immersive Digital Motion Experience

A bespoke, production-quality scroll-driven automotive digital experience engineered for the **Itzfizz Digital Creative Web Animation Internship Assignment**.

Recreated and elevated from the interaction mechanics of [car-scroll-animation](https://paraschaturvedi.github.io/car-scroll-animation) into an award-caliber editorial digital flagship.

---

## 🏛️ Art Direction & Visual Identity

The project follows a premium automotive-inspired aesthetic:
- **Color Palette**: Obsidian black (`#090A0D`), graphite (`#16181E`), silver (`#8E909B`), and warm off-white (`#F5F5F3`).
- **Typographic System**: High-contrast display headlines (`Space Grotesk`), editorial body (`Outfit`), and precision monospace telemetry (`JetBrains Mono`).
- **Architectural Contrast**: The dark cinematic hero and pinned motion scene seamlessly transition into a light off-white editorial spread (`#F5F5F3`), creating dynamic visual rhythm.
- **Restraint & Purpose**: Clean negative space, thin hairline separators, and hardware-accelerated transforms rather than excessive decorative glows or generic cards.

---

## 🎬 Section Breakdown & Motion Highlights

### 1. Navigation (`Navigation.jsx`)
- Compact header with minimal `ITZFIZZ / STUDIO` wordmark.
- Hairline scroll progress indicator tracking entire viewport depth.
- Smooth anchor navigation across all sections.
- Functional slide-out mobile drawer with keyboard and touch accessibility.
- Dual-mode accessible **Motion Toggle** (Calm / Fluid) and **Procedural Audio Toggle**.

### 2. Full-Viewport Hero (`HeroSection.jsx`)
- Occupies `100svh` on desktop.
- Upper editorial label: `DIGITAL EXPERIENCES / 2026`.
- Enormous editorial headline: `WELCOME ITZFIZZ` with widely controlled letter spacing.
- Center vehicle anchor featuring a high-resolution top-down sports car asset.
- Left-aligned illustrative benchmark metrics (`+185%`, `99.4%`, `-64%`).
- Right-aligned minimal scroll cue with directional indicator.
- Polished GSAP entrance sequence revealing typography, metrics, and chassis without flash of unstyled content.

### 3. Dedicated Pinned Car Animation Scene (`CarScrollScene.jsx`)
- Controlled `360vh` scroll container pinned with `ScrollTrigger` and `scrub: 1.0`.
- **Three Distinct Phases**:
  - **Phase A — Arrival**: Vehicle enters composition while oversized headline recedes into spatial depth.
  - **Phase B — Motion**: Horizontal travel with banking transforms (`translateY`), apex yaw rotation, and reactive letter illumination (`WELCOME ITZFIZZ`).
  - **Phase C — Reveal**: Terminal waypoint deceleration with atmospheric transition shifting toward the off-white editorial section.
- Direct DOM cockpit HUD telemetry (Speedometer 0 → 320 KM/H, transmission shifting `N → 1 → 2 → 3 → 4 → TOP`, scrub progress %) updating without React re-render thrashing.
- Fully symmetrical and reversible on upward scrolling.

### 4. Editorial Spread — The Approach (`EditorialSection.jsx`)
- Off-white background (`#F5F5F3`) contrasting with dark obsidian palette.
- Section label: `01 / THE APPROACH`.
- Main headline: *“DIGITAL EXPERIENCES, ENGINEERED TO MOVE.”*
- Asymmetric two-column editorial spread with large `01` numerals, technical divider, and secondary high-resolution automotive interior photography.
- Three core principles: *Design with intention*, *Engineer with precision*, and *Optimize every interaction*.

### 5. Capabilities Section (`CapabilitiesSection.jsx`)
- Dark section titled *“CRAFTED FOR THE MODERN WEB.”*
- Four-item balanced editorial grid:
  1. `01 / FRONTEND ENGINEERING` — Responsive interfaces & reusable architecture.
  2. `02 / INTERACTION DESIGN` — Scroll-linked storytelling & micro-interactions.
  3. `03 / PERFORMANCE` — 16.6ms frame budgets & GPU compositing.
  4. `04 / RESPONSIVE SYSTEMS` — Consistent ergonomics across mobile, tablet, and desktop.

### 6. Interactive Technical Showcase (`MotionShowcase.jsx`)
- Section titled *“MOTION WITH PURPOSE.”*
- Interactive three-stage inspector (*Composition*, *Interaction*, *Performance*).
- Touch and click functional tabs updating technical specifications and visual progress indicators.

### 7. Final Contact Section (`ContactSection.jsx`)
- Oversized headline: *“LET'S BUILD WHAT MOVES PEOPLE.”*
- Restrained animated divider and functional inquiry dialogue trigger.

### 8. Polished Minimal Footer (`Footer.jsx`)
- Minimal `ITZFIZZ` wordmark and assignment metadata.
- Dynamic current year generation.
- Smooth Back-to-Top scroll control.

---

## 🛠️ Mandatory Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **Next.js 16 (React 19)** | Core framework, pages routing, static page optimization |
| **JavaScript (ES6+)** | Component architecture & state logic |
| **Tailwind CSS v4** | Design tokens, responsive utilities, editorial typography |
| **GSAP 3.12 & ScrollTrigger** | Pinned scroll scrub, timeline orchestration, transforms |
| **Web Audio API** | Zero-dependency procedural hypercar engine synthesizer |
| **HTML5 & CSS3** | Semantic structure, hairline dividers, custom scrollbars |

---

## 📂 Project Architecture

```
scroll/
├── public/
│   ├── images/
│   │   ├── mclaren-top.png             # Locally hosted, high-res transparent sports car
│   │   ├── mclaren-side.png            # Perspective sports car asset
│   │   └── editorial-automotive.jpg    # High-res secondary photography
│   └── favicon.ico
├── src/
│   ├── data/
│   │   └── experienceData.js           # Centralized metrics, copy, and capabilities
│   ├── components/
│   │   ├── Navigation.jsx              # Compact nav, scroll progress bar, mobile drawer
│   │   ├── HeroSection.jsx             # 100svh hero, headline reveal, car showcase, stats
│   │   ├── CarScrollScene.jsx          # Pinned 3-phase scrub track, transforms, telemetry
│   │   ├── EditorialSection.jsx        # Off-white editorial spread & secondary photo
│   │   ├── CapabilitiesSection.jsx     # Dark 4-item capabilities grid
│   │   ├── MotionShowcase.jsx          # Interactive 3-stage technical showcase
│   │   ├── ContactSection.jsx          # Oversized headline & inquiry trigger
│   │   └── Footer.jsx                  # Minimal footer with dynamic year & back-to-top
│   ├── styles/
│   │   └── globals.css                 # Custom font definitions, grids, hairline rules
│   ├── utils/
│   │   └── engineAudio.js              # Web Audio API engine oscillator synthesizer
│   └── pages/
│       ├── _app.js                     # Root wrapper & global stylesheet
│       ├── _document.js                # Google Fonts preconnect & metadata
│       └── index.js                    # Master page & useSyncExternalStore subscription
├── next.config.mjs                     # Turbopack root & Next.js config
├── package.json                        # Dependencies & npm scripts
└── README.md                           # Documentation & deployment guide
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v18.17.0+ or v20+ (v22+ supported)
- **npm**: v9+

### 2. Installation
```bash
git clone <repository-url>
cd scroll
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Run Linter
```bash
npm run lint
```
Zero errors, zero warnings.

### 5. Production Build & Execution
```bash
# Build optimized production bundle
npm run build

# Start production server
npm run start
```

---

## 🌐 Deployment to GitHub & Vercel

### Step 1: Commit & Push to GitHub
```bash
git add .
git commit -m "feat: complete editorial digital motion experience for Itzfizz Digital"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

### Step 2: Deploy to Vercel
1. Log in to [vercel.com](https://vercel.com).
2. Click **Add New Project** and select your GitHub repository.
3. Vercel automatically detects **Next.js** framework settings:
   - **Framework Preset**: Next.js
   - **Build Command**: `next build`
   - **Output Directory**: `.next`
4. Click **Deploy**.
5. Your production website URL will be live in under 60 seconds with global CDN distribution and SSL.

---

## 📄 License & Attribution

Crafted for the **Itzfizz Digital Creative Web Animation Internship Assignment**.
All rights reserved &copy; 2026 ITZFIZZ DIGITAL.
