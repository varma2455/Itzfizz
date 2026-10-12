# Itzfizz Digital // Scroll-Driven Hero Animation

A production-quality, cinematic scroll-driven hero animation website engineered for the **Itzfizz Digital Creative Web Animation Internship Assignment**.

Recreated and elevated from the motion mechanics of the [car scroll animation inspiration](https://paraschaturvedi.github.io/car-scroll-animation) into an original, luxury automotive digital flagship.

---

## 🌟 Live Preview & Design Highlights

- **Cinematic Hero Entrance**: Orchestrated GSAP timeline revealing the widely letter-spaced title `"W E L C O M E   I T Z F I Z Z"`, supporting narrative, and three business impact metrics.
- **Scrub-Driven Velocity Track**: Pinned viewport track with physical scrub interpolation (`scrub: 1.2`) translating a McLaren 720S sports car across the highway.
- **Physical Vehicle Transforms**: Natural dynamic steering transforms combining `translateX`, `translateY` (banking into curve apexes), subtle `rotation` (steering yaw), and `scale` (perspective depth).
- **Reactive Letter Illumination**: Typography illuminates dynamically with cyan/emerald neon glow letter-by-letter as the car's nose crosses each character's coordinates. Fully reversible when scrolling backward.
- **Live Cockpit Telemetry HUD**: Real-time calculated velocity (0 → 328 KM/H), dynamic transmission gear shifts (P → 1 → 2 → 3 → 4 → OVERDRIVE), lateral G-force calculations, and scrub progress percentage updated via direct DOM refs for locked 60FPS fidelity.
- **Dynamic Luminous Kinetic Trail**: Glowing energy trail expanding directly behind the car's rear tires with dual neon laser tracks.
- **Milestone Impact Overlays**: 4 sequential milestone cards highlighting code efficiency, frame budgeting, conversion metrics, and bidirectional stability.
- **Web Audio API Engine Synthesizer**: Interactive electric hypercar engine sound dynamically modulated by scroll acceleration (muted by default with toggle).
- **Accessibility & Reduced Motion**: Automatically respects system `prefers-reduced-motion` settings via `useSyncExternalStore`, plus a manual toggle in the navigation bar.

---

## 🛠️ Mandatory Tech Stack

| Technology | Role |
| :--- | :--- |
| **Next.js 16 (React 19)** | Core framework, pages routing, optimized static generation |
| **JavaScript (ES6+)** | Component architecture & logic |
| **Tailwind CSS v4** | Utility styling, responsive design tokens, glassmorphism |
| **GSAP & GSAP ScrollTrigger** | Pinning, timeline choreography, scrub physics, transform bindings |
| **HTML5 & CSS3** | Semantic structure, neon glow shaders, custom road grid textures |
| **Web Audio API** | Real-time procedural engine sound synthesis |

---

## 📁 Project Architecture

```
scroll/
├── public/
│   ├── images/
│   │   └── mclaren-top.png       # Locally hosted, high-res transparent sports car asset
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Navbar.js             # Agency navigation bar with live status, audio & motion controls
│   │   ├── HeroSection.js        # Full-viewport hero, "WELCOME ITZFIZZ" letter reveal, stats cards
│   │   ├── CarScrollSection.js   # Pinned scrub track, car transforms, trail, telemetry, reactive typography
│   │   ├── AgencyIntro.js        # Editorial Itzfizz digital philosophy & craft pillars
│   │   ├── CapabilitiesSection.js# Modern capabilities (Web Dev, Responsive Design, Performance)
│   │   └── Footer.js             # Minimal luxury agency footer & assignment attribution
│   ├── styles/
│   │   └── globals.css           # Cinematic fonts, grid textures, glassmorphism, glowing borders
│   ├── utils/
│   │   └── engineAudio.js        # Web Audio API procedural oscillator engine
│   └── pages/
│       ├── _app.js               # Application wrapper & global stylesheet
│       ├── _document.js          # Google Fonts (Space Grotesk, Outfit, JetBrains Mono) & metadata
│       └── index.js              # Master landing page with external store motion subscription
├── next.config.mjs               # Turbopack and Next.js configuration
├── package.json                  # Dependencies & scripts
└── README.md                     # Documentation & deployment guide
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v18.17.0+ or v20+ (v22+ supported)
- **npm**: v9+

### 2. Installation
Clone the repository and install all dependencies:
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
Guaranteed 0 errors and 0 warnings.

### 5. Production Build & Start
```bash
# Build optimized production bundle
npm run build

# Start production server
npm run start
```

---

## ⚡ Performance & Motion Engineering

1. **GPU Compositing Layers**: GSAP transforms are restricted strictly to `transform` (`translateX`, `translateY`, `scale`, `rotation`) and `opacity`, avoiding expensive browser reflows and paint recalculations during scroll.
2. **Direct DOM Telemetry Updates**: The live cockpit HUD meters (speedometer, gear, G-meter) update via direct DOM element references during `ScrollTrigger.onUpdate`, preventing cascading React render re-evaluations during rapid scroll scrubbing.
3. **GSAP Context Lifecycle**: All GSAP timelines and ScrollTrigger instances are bound inside `gsap.context()` and cleanly reverted upon unmount, preventing memory leaks and orphaned scroll listeners.
4. **Fluid Responsiveness**: Track bounds and travel distances calculate dynamically based on container widths, ensuring zero horizontal scroll overflow (`overflow-x: hidden`) across mobile, tablet, and ultra-wide screens.
5. **Bidirectional Symmetry**: The scrub pipeline is completely reversible. Scrolling up reverses vehicle transforms, slows telemetry readings, and returns typography to its standby unlit state.

---

## 🌐 Deployment Instructions

### Deploy to Vercel (Recommended)

1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: complete Itzfizz scroll-driven hero animation"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. Navigate to [Vercel Dashboard](https://vercel.com/new).
3. Import your GitHub repository.
4. Vercel automatically detects **Next.js** framework preset with default build commands:
   - **Build Command**: `next build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`
5. Click **Deploy**.
6. Within 60 seconds, your project is live with global CDN caching and SSL enabled.

---

## 📄 License & Attribution

Designed and developed for the **Itzfizz Digital Creative Web Animation Internship Assignment**.
Car silhouette and reference inspired by public sports car aerodynamics models.
All rights reserved © 2026 Itzfizz Digital.
