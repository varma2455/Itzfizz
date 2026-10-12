import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ChevronRight } from "lucide-react";
import { updateEngineSpeed } from "@/utils/engineAudio";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// 4 Milestone Business Impact Cards (Declared outside component for stable reference)
const MILESTONES = [
  {
    id: "m1",
    number: "01",
    tag: "SPEED BOOST",
    stat: "+142%",
    title: "Accelerated Architecture",
    desc: "Next.js Turbopack engine delivering zero bloat and sub-second initial load.",
    color: "from-emerald-400 to-teal-500",
    border: "border-emerald-500/30",
    top: true,
    scrollRange: [0.1, 0.35],
  },
  {
    id: "m2",
    number: "02",
    tag: "FRAME BUDGET",
    stat: "60 FPS",
    title: "Precision Motion Scrub",
    desc: "GSAP ScrollTrigger scrub bound directly to hardware GPU compositing layers.",
    color: "from-cyan-400 to-blue-500",
    border: "border-cyan-500/30",
    top: false,
    scrollRange: [0.36, 0.58],
  },
  {
    id: "m3",
    number: "03",
    tag: "RETENTION",
    stat: "3.8x",
    title: "Conversion Storytelling",
    desc: "Spatial choreography turning passive visitors into engaged brand advocates.",
    color: "from-amber-400 to-orange-500",
    border: "border-amber-500/30",
    top: true,
    scrollRange: [0.59, 0.81],
  },
  {
    id: "m4",
    number: "04",
    tag: "ACCESSIBILITY",
    stat: "100%",
    title: "Reversible Interpolation",
    desc: "Flawless bidirectional scrub with full WCAG prefers-reduced-motion support.",
    color: "from-emerald-400 to-cyan-400",
    border: "border-emerald-400/40",
    top: false,
    scrollRange: [0.82, 0.99],
  },
];

const HEADLINE_LETTERS = [
  "W", "E", "L", "C", "O", "M", "E",
  " ",
  "I", "T", "Z", "F", "I", "Z", "Z",
];

export default function CarScrollSection({ reducedMotion }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const roadRef = useRef(null);
  const carRef = useRef(null);
  const trailRef = useRef(null);
  const letterRefs = useRef([]);

  // Direct DOM refs for 60fps HUD telemetry (avoids React re-render thrashing)
  const speedRef = useRef(null);
  const gearRef = useRef(null);
  const gForceRef = useRef(null);
  const progressRef = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      const road = roadRef.current;
      const car = carRef.current;
      const trail = trailRef.current;
      const letters = letterRefs.current.filter(Boolean);

      if (!road || !car) return;

      const calcBounds = () => {
        const roadWidth = road.offsetWidth;
        const carWidth = car.offsetWidth || 200;
        const endX = Math.max(roadWidth - carWidth, 200);
        return { roadWidth, carWidth, endX };
      };

      let bounds = calcBounds();

      // Master ScrollTrigger timeline pinned to the section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
          pin: trackRef.current,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;

            // Direct HUD DOM updates for maximum 60FPS smoothness
            let calculatedSpeed = 0;
            let currentGear = "P";
            let g = "0.00";

            if (p > 0.015) {
              calculatedSpeed = Math.round(Math.min(p * 345, 328));
              if (calculatedSpeed < 65) currentGear = "1";
              else if (calculatedSpeed < 140) currentGear = "2";
              else if (calculatedSpeed < 220) currentGear = "3";
              else if (calculatedSpeed < 290) currentGear = "4";
              else currentGear = "OVERDRIVE";

              const lateralG = (Math.sin(p * Math.PI * 3.5) * 0.42 + p * 0.68).toFixed(2);
              g = `${Math.abs(lateralG)}G`;
            }

            const pct = Math.round(p * 100);

            if (speedRef.current) speedRef.current.textContent = String(calculatedSpeed);
            if (gearRef.current) gearRef.current.textContent = currentGear;
            if (gForceRef.current) gForceRef.current.textContent = g;
            if (progressRef.current) progressRef.current.textContent = `${pct}%`;
            if (progressBarRef.current) progressBarRef.current.style.width = `${pct}%`;

            // Update real-time Web Audio engine synthesizer
            updateEngineSpeed(calculatedSpeed);

            // Letter-by-letter reactive illumination based on car front coordinates
            if (car && letters.length > 0) {
              const carRect = car.getBoundingClientRect();
              const carNoseX = carRect.right - carRect.width * 0.12;

              letters.forEach((letter) => {
                if (!letter) return;
                const letterRect = letter.getBoundingClientRect();
                const letterMidX = letterRect.left + letterRect.width * 0.35;

                if (carNoseX >= letterMidX) {
                  letter.style.color = "#ffffff";
                  letter.style.opacity = "1";
                  letter.style.textShadow =
                    "0 0 20px rgba(52, 211, 153, 0.9), 0 0 35px rgba(6, 182, 212, 0.7)";
                  letter.style.transform = "scale(1.08) translateY(-2px)";
                } else {
                  letter.style.color = "#27272a";
                  letter.style.opacity = "0.22";
                  letter.style.textShadow = "none";
                  letter.style.transform = "scale(1) translateY(0px)";
                }
              });
            }

            // Sync trail width to car rear tires
            if (trail && car) {
              const currentX = gsap.getProperty(car, "x");
              const trailWidth = Math.max(0, currentX + bounds.carWidth * 0.18);
              trail.style.width = `${trailWidth}px`;
            }
          },
        },
      });

      // Bind car transforms: translateX, translateY, scale, rotation
      tl.fromTo(
        car,
        {
          x: 0,
          y: 0,
          scale: 0.92,
          rotation: 0,
        },
        {
          x: () => {
            bounds = calcBounds();
            return bounds.endX;
          },
          ease: "none",
          duration: 1,
        }
      );

      // Natural steering physics: banking and apex turns
      tl.to(
        car,
        {
          keyframes: [
            { y: 0, rotation: 0, scale: 0.92, duration: 0.1 },
            { y: -14, rotation: -2.4, scale: 1.03, duration: 0.25 },
            { y: 16, rotation: 2.2, scale: 1.08, duration: 0.3 },
            { y: -8, rotation: -1.2, scale: 1.03, duration: 0.2 },
            { y: 0, rotation: 0, scale: 1.0, duration: 0.15 },
          ],
          ease: "sine.inOut",
        },
        0
      );

      // Milestone cards dynamic fade and highlight
      MILESTONES.forEach((m) => {
        const cardEl = document.getElementById(`milestone-${m.id}`);
        if (!cardEl) return;

        tl.fromTo(
          cardEl,
          {
            opacity: 0,
            y: m.top ? -25 : 25,
            scale: 0.92,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.16,
            ease: "power2.out",
          },
          m.scrollRange[0]
        ).to(
          cardEl,
          {
            opacity: 0.18,
            scale: 0.95,
            duration: 0.12,
            ease: "power2.in",
          },
          m.scrollRange[1]
        );
      });

      const handleResize = () => {
        bounds = calcBounds();
        ScrollTrigger.refresh();
      };
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  // Accessible Fallback View for Reduced Motion Mode
  if (reducedMotion) {
    return (
      <section
        id="scroll-track"
        ref={sectionRef}
        className="relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-[#060709] border-t border-white/5"
        aria-label="Accessible Core Animation Overview"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-12">
            <span className="text-xs font-mono-code text-amber-400 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-3">
              ACCESSIBLE MODE // REDUCED MOTION PREFERRED
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-wider">
              {"W E L C O M E   I T Z F I Z Z"}
            </h2>
            <p className="text-sm text-zinc-400 mt-2 max-w-xl">
              All scroll animations adapted for comfortable reading without motion triggers.
            </p>
          </div>

          {/* Static Car Showcase */}
          <div className="relative max-w-2xl mx-auto my-8 p-6 glass-panel rounded-2xl border border-white/10 flex items-center justify-center">
            <div className="relative w-full max-w-lg aspect-[2.1/1]">
              <Image
                src="/images/mclaren-top.png"
                alt="McLaren 720S Sports Car"
                fill
                className="object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
              />
            </div>
          </div>

          {/* All 4 Milestones in clear grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {MILESTONES.map((m) => (
              <div
                key={m.id}
                className="glass-panel rounded-xl p-5 border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono-code text-zinc-500">
                      {`MILESTONE ${m.number}`}
                    </span>
                    <span className="text-[10px] font-mono-code text-emerald-400">
                      {m.tag}
                    </span>
                  </div>
                  <div className="font-display font-black text-2xl text-white">
                    {m.stat}
                  </div>
                  <h4 className="text-xs font-bold text-zinc-200 mt-1">
                    {m.title}
                  </h4>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Full-Motion Scrub Track View
  return (
    <section
      id="scroll-track"
      ref={sectionRef}
      className="relative w-full h-[380vh] bg-[#060709]"
      aria-label="Core Scroll Animation Section"
    >
      {/* Sticky / Pinned Viewport Track */}
      <div
        ref={trackRef}
        className="w-full h-screen sticky top-0 flex flex-col justify-between overflow-hidden bg-[#060709]"
      >
        {/* Top HUD Header: Cockpit Telemetry Bar */}
        <div className="relative z-30 w-full pt-6 px-4 sm:px-8 max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/80 border border-white/10 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[11px] font-mono-code font-semibold tracking-wider text-white uppercase">
                SCROLL-DRIVEN TELEMETRY
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-zinc-400 text-xs font-mono-code">
              <span>SCRUB ENGINE: ACTIVE</span>
              <span className="text-zinc-700">|</span>
              <span className="text-emerald-400">FPS: 60 LOCKED</span>
            </div>
          </div>

          {/* Real-time Dynamic Gauge Readouts (Updated directly via refs) */}
          <div className="flex items-center gap-4 sm:gap-6 bg-zinc-950/90 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-lg shadow-xl shadow-black/80 font-mono-code">
            {/* Speedometer */}
            <div className="flex flex-col items-end">
              <span className="text-[9px] uppercase tracking-widest text-zinc-400">
                VELOCITY
              </span>
              <div className="flex items-baseline gap-1">
                <span
                  ref={speedRef}
                  className="font-display font-black text-xl sm:text-2xl text-emerald-400"
                >
                  0
                </span>
                <span className="text-[10px] text-zinc-400">KM/H</span>
              </div>
            </div>

            <div className="w-[1px] h-8 bg-zinc-800" />

            {/* Gear Indicator */}
            <div className="flex flex-col items-center">
              <span className="text-[9px] uppercase tracking-widest text-zinc-400">
                GEAR
              </span>
              <span
                ref={gearRef}
                className="font-display font-bold text-sm sm:text-base text-cyan-400"
              >
                P
              </span>
            </div>

            <div className="w-[1px] h-8 bg-zinc-800" />

            {/* G-Force */}
            <div className="flex flex-col items-center hidden sm:flex">
              <span className="text-[9px] uppercase tracking-widest text-zinc-400">
                LATERAL G
              </span>
              <span
                ref={gForceRef}
                className="font-display font-bold text-sm text-amber-400"
              >
                0.00G
              </span>
            </div>

            <div className="w-[1px] h-8 bg-zinc-800 hidden sm:block" />

            {/* Track Completion */}
            <div className="flex flex-col items-start">
              <span className="text-[9px] uppercase tracking-widest text-zinc-400">
                SCRUB
              </span>
              <span
                ref={progressRef}
                className="font-display font-bold text-sm sm:text-base text-white"
              >
                0%
              </span>
            </div>
          </div>
        </div>

        {/* Central Stage: High-Velocity Track & Road Runway */}
        <div className="relative w-full flex-1 flex flex-col justify-center items-center px-0 sm:px-4 my-2">
          {/* Top Milestone Placement Zone (Desktop / Tablet) */}
          <div className="relative w-full max-w-7xl mx-auto px-4 h-24 hidden md:flex items-center justify-between pointer-events-none">
            {MILESTONES.filter((m) => m.top).map((m) => (
              <div
                key={m.id}
                id={`milestone-${m.id}`}
                className={`pointer-events-auto glass-panel border ${m.border} rounded-xl p-4 w-72 shadow-2xl backdrop-blur-xl transition-all duration-300 opacity-20`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono-code font-bold tracking-widest text-zinc-400">
                    {`MILESTONE // ${m.number}`}
                  </span>
                  <span
                    className={`text-xs font-mono-code px-1.5 py-0.5 rounded bg-white/5 font-semibold bg-gradient-to-r ${m.color} bg-clip-text text-transparent`}
                  >
                    {m.tag}
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span
                    className={`font-display font-black text-2xl bg-gradient-to-r ${m.color} bg-clip-text text-transparent`}
                  >
                    {m.stat}
                  </span>
                  <h4 className="text-xs font-bold text-white tracking-wide">
                    {m.title}
                  </h4>
                </div>
                <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>

          {/* The High-Tech Highway Roadbed */}
          <div
            ref={roadRef}
            className="relative w-full h-[220px] sm:h-[260px] md:h-[290px] bg-[#0c0e14] border-y border-emerald-500/20 overflow-hidden shadow-[inset_0_0_80px_rgba(0,0,0,0.9)] flex items-center"
          >
            {/* Subtle Road Grid & Asphalt Texture */}
            <div className="absolute inset-0 bg-grid-pattern opacity-25" />

            {/* Neon Speed Borders (Top & Bottom Edge Lasers) */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-emerald-500/20 via-emerald-400 to-cyan-400/40 shadow-[0_0_12px_#10b981]" />
            <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-cyan-500/20 via-cyan-400 to-emerald-400/40 shadow-[0_0_12px_#06b6d4]" />

            {/* Central Dashed Track Divider Line */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[3px] road-dashed-center opacity-30 pointer-events-none" />

            {/* Background Kinetic Energy Trail (Drawn directly behind car) */}
            <div
              ref={trailRef}
              className="absolute top-0 left-0 h-full pointer-events-none z-10 will-change-transform"
              style={{ width: "0px" }}
            >
              {/* Dual Neon Laser Tire Marks */}
              <div className="absolute top-[28%] inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/80 to-emerald-300 shadow-[0_0_15px_#10b981]" />
              <div className="absolute bottom-[28%] inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/80 to-cyan-300 shadow-[0_0_15px_#06b6d4]" />

              {/* Luminous Body Wash Gradient */}
              <div className="w-full h-full bg-gradient-to-r from-transparent via-emerald-500/10 to-cyan-500/25 backdrop-blur-[2px]" />
            </div>

            {/* Reactive Typographic Illumination: "W E L C O M E   I T Z F I Z Z" */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-15 flex items-center justify-center pointer-events-none select-none px-4 sm:px-12">
              <div className="font-display font-black text-4xl sm:text-6xl md:text-8xl lg:text-9xl tracking-cinematic uppercase flex flex-nowrap items-center justify-center gap-1 sm:gap-2">
                {HEADLINE_LETTERS.map((char, index) => {
                  if (char === " ") {
                    return (
                      <span
                        key={`space-${index}`}
                        className="inline-block w-4 sm:w-10"
                      >
                        &nbsp;
                      </span>
                    );
                  }
                  return (
                    <span
                      key={`track-letter-${index}`}
                      ref={(el) => (letterRefs.current[index] = el)}
                      className="inline-block text-zinc-700 transition-all duration-150 transform opacity-25 select-none"
                    >
                      {char}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* The Sports Car Element (Orchestrated by GSAP) */}
            <div
              ref={carRef}
              className="absolute left-0 z-20 h-[140px] sm:h-[180px] md:h-[220px] w-auto aspect-[2.1/1] flex items-center will-change-transform"
              style={{
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              {/* Headlight Beam Illumination Cone projecting forward */}
              <div
                className="absolute left-[85%] top-1/2 -translate-y-1/2 w-[280px] sm:w-[440px] h-[160px] sm:h-[230px] pointer-events-none z-10 opacity-75"
                style={{
                  background:
                    "radial-gradient(ellipse at 0% 50%, rgba(220, 252, 231, 0.45) 0%, rgba(6, 182, 212, 0.15) 45%, transparent 75%)",
                  transformOrigin: "left center",
                  transform: "perspective(400px) rotateY(-15deg)",
                }}
              />

              {/* Dynamic Tire Smoke & Contact Shadows */}
              <div className="absolute inset-x-4 inset-y-2 bg-black/85 blur-xl -z-10 rounded-full" />

              {/* High-Resolution Transparent Car Asset */}
              <div className="relative w-full h-full">
                <Image
                  src="/images/mclaren-top.png"
                  alt="McLaren 720S Sports Car navigating high-speed track"
                  fill
                  sizes="(max-width: 768px) 300px, 460px"
                  priority
                  className="object-contain filter drop-shadow-[0_14px_28px_rgba(0,0,0,0.95)]"
                />
              </div>
            </div>
          </div>

          {/* Bottom Milestone Placement Zone (Desktop / Tablet) */}
          <div className="relative w-full max-w-7xl mx-auto px-4 h-24 hidden md:flex items-center justify-between pointer-events-none">
            {MILESTONES.filter((m) => !m.top).map((m) => (
              <div
                key={m.id}
                id={`milestone-${m.id}`}
                className={`pointer-events-auto glass-panel border ${m.border} rounded-xl p-4 w-72 shadow-2xl backdrop-blur-xl transition-all duration-300 opacity-20`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono-code font-bold tracking-widest text-zinc-400">
                    {`MILESTONE // ${m.number}`}
                  </span>
                  <span
                    className={`text-xs font-mono-code px-1.5 py-0.5 rounded bg-white/5 font-semibold bg-gradient-to-r ${m.color} bg-clip-text text-transparent`}
                  >
                    {m.tag}
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span
                    className={`font-display font-black text-2xl bg-gradient-to-r ${m.color} bg-clip-text text-transparent`}
                  >
                    {m.stat}
                  </span>
                  <h4 className="text-xs font-bold text-white tracking-wide">
                    {m.title}
                  </h4>
                </div>
                <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Mobile Milestones Summary (Displays on small screens) */}
          <div className="w-full px-4 mt-3 md:hidden">
            <div className="grid grid-cols-2 gap-2">
              {MILESTONES.slice(0, 2).map((m) => (
                <div
                  key={`mobile-${m.id}`}
                  className="glass-panel rounded-lg p-2.5 border border-white/10"
                >
                  <span className="text-[9px] font-mono-code text-zinc-400 uppercase">
                    {`${m.number} // ${m.tag}`}
                  </span>
                  <div className="text-base font-display font-black text-white">
                    {m.stat}
                  </div>
                  <div className="text-[10px] text-zinc-300 font-semibold truncate">
                    {m.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Track Controls & Pacing Status */}
        <div className="relative z-30 w-full pb-6 px-4 sm:px-8 max-w-7xl mx-auto flex items-center justify-between text-xs font-mono-code text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="uppercase tracking-widest">
              DIRECTION: BIDIRECTIONAL SCRUB
            </span>
          </div>

          {/* Scrub Track Progress Bar */}
          <div className="flex-1 max-w-md mx-6 hidden sm:block">
            <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-white/10">
              <div
                ref={progressBarRef}
                className="h-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 transition-all duration-75 ease-out shadow-[0_0_10px_#10b981]"
                style={{ width: "0%" }}
              />
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-zinc-400">
            <span>SCROLL DOWN</span>
            <ChevronRight className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
