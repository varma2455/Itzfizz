// Centralized data for Itzfizz Digital Motion Experience
// Clearly identified illustrative design benchmarks & editorial content

export const HERO_METRICS = [
  {
    id: "velocity",
    value: "+185%",
    label: "Interactive Velocity",
    description: "Lift across motion-choreographed user journeys.",
    annotation: "SPEC // DESIGN BENCHMARK",
  },
  {
    id: "stability",
    value: "99.4%",
    label: "Core Web Vitals",
    description: "Sub-second TTI & locked 60FPS animation budget.",
    annotation: "METRIC // RUNTIME TARGET",
  },
  {
    id: "latency",
    value: "-64%",
    label: "Bounce Latency",
    description: "Reduction in drop-off through kinetic storytelling.",
    annotation: "BENCHMARK // SPATIAL ENGAGEMENT",
  },
];

export const EDITORIAL_PRINCIPLES = [
  {
    index: "01",
    title: "Design with intention",
    desc: "Every visual gesture, transition, and layout decision communicates brand authority without gratuitous ornamentation.",
  },
  {
    index: "02",
    title: "Engineer with precision",
    desc: "Rigorous frontend architecture ensuring predictable layout integrity, semantic purity, and hardware-accelerated transforms.",
  },
  {
    index: "03",
    title: "Optimize every interaction",
    desc: "Committed to the 16.6ms frame budget. Zero layout shift, instant tactile feedback, and accessible fallbacks.",
  },
];

export const CAPABILITIES = [
  {
    index: "01",
    tag: "FRONTEND ENGINEERING",
    title: "Frontend Engineering",
    description:
      "Responsive interfaces, reusable components, and maintainable architecture built on modern Next.js and React primitives.",
    specs: ["Component isolation", "Clean state contracts", "Modular styling", "Zero layout shift"],
  },
  {
    index: "02",
    tag: "INTERACTION DESIGN",
    title: "Interaction Design",
    description:
      "Scroll-linked storytelling, refined transitions, and intuitive micro-interactions that elevate brand perception.",
    specs: ["ScrollTrigger scrub", "Fluid interpolation", "Kinetic choreography", "Tactile feedback"],
  },
  {
    index: "03",
    tag: "PERFORMANCE",
    title: "Performance",
    description:
      "Efficient rendering, optimized assets, and careful animation implementation adhering to strict frame budgets.",
    specs: ["GPU compositing", "60 FPS locked", "Asset preloading", "Hardware transforms"],
  },
  {
    index: "04",
    tag: "RESPONSIVE SYSTEMS",
    title: "Responsive Systems",
    description:
      "Consistent experiences across desktop, tablet, and mobile devices with bespoke viewport ergonomics.",
    specs: ["Fluid typography", "Adaptive travel paths", "Touch physics", "Zero overflow"],
  },
];

export const SHOWCASE_STAGES = [
  {
    id: "composition",
    number: "01",
    name: "Composition",
    tagline: "SPATIAL BALANCE & NEGATIVE SPACE",
    description:
      "The layout is structured around an asymmetrical editorial grid with strong typographic contrast. The vehicle is positioned as a kinetic focal anchor, establishing visual hierarchy between the oversized header and technical annotations.",
    technicalDetail: "Viewport-relative positioning with hardware-accelerated transform matrix and sub-pixel alignment.",
    metric: "100svh Hero Frame",
  },
  {
    id: "interaction",
    number: "02",
    name: "Interaction",
    tagline: "SCROLL-LINKED CHOREOGRAPHY",
    description:
      "Rather than passive autoplay, movement is directly bound to scroll progress using GSAP ScrollTrigger scrub. The vehicle accelerates, yaws into curve apexes, and scales dynamically with continuous bidirectional symmetry.",
    technicalDetail: "Continuous scrub: 1.0 with synchronized timeline keyframes across translateX, translateY, scale, and yaw rotation.",
    metric: "1:1 Scroll Scrub",
  },
  {
    id: "performance",
    number: "03",
    name: "Performance",
    tagline: "LOCKED 16.6ms FRAME BUDGET",
    description:
      "All scroll-linked motion utilizes GPU-promoted composite properties (transform and opacity exclusively). No state updates or DOM geometry queries occur during the scroll render loop.",
    technicalDetail: "Will-change managed via GSAP context teardown, zero layout thrashing, and native prefers-reduced-motion bypass.",
    metric: "60 FPS Budget",
  },
];
