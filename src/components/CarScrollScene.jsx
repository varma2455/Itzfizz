import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ArrowRight, ChevronRight } from "lucide-react";
import { updateEngineSpeed } from "@/utils/engineAudio";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PHASES = [
  {
    key: "A",
    title: "PHASE A / ARRIVAL",
    desc: "Vehicle enters composition; oversized headline recedes into spatial depth.",
    range: [0.0, 0.33],
  },
  {
    key: "B",
    title: "PHASE B / MOTION",
    desc: "Horizontal traverse with banking transforms, apex yaw, and road telemetry.",
    range: [0.34, 0.72],
  },
  {
    key: "C",
    title: "PHASE C / REVEAL",
    desc: "Vehicle anchors at terminal waypoint; atmosphere transitions to editorial story.",
    range: [0.73, 1.0],
  },
];

const TRACK_LETTERS = [
  "W", "E", "L", "C", "O", "M", "E",
  " ",
  "I", "T", "Z", "F", "I", "Z", "Z",
];

export default function CarScrollScene({ reducedMotion }) {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const roadRef = useRef(null);
  const carRef = useRef(null);
  const trailRef = useRef(null);
  const bgAtmosphereRef = useRef(null);
  const letterRefs = useRef([]);

  // Telemetry DOM refs (no React state updates during scroll)
  const speedRef = useRef(null);
  const gearRef = useRef(null);
  const progressRef = useRef(null);
  const progressBarRef = useRef(null);
  const phaseIndicatorRef = useRef(null);
  const phaseDescRef = useRef(null);

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
          scrub: 1.0,
          pin: viewportRef.current,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;

            // Direct HUD DOM updates for locked 60FPS fidelity
            let calculatedSpeed = 0;
            let currentGear = "N";

            if (p > 0.02) {
              calculatedSpeed = Math.round(Math.min(p * 335, 320));
              if (calculatedSpeed < 70) currentGear = "1";
              else if (calculatedSpeed < 145) currentGear = "2";
              else if (calculatedSpeed < 230) currentGear = "3";
              else if (calculatedSpeed < 290) currentGear = "4";
              else currentGear = "TOP";
            }

            const pct = Math.round(p * 100);

            if (speedRef.current) speedRef.current.textContent = String(calculatedSpeed);
            if (gearRef.current) gearRef.current.textContent = currentGear;
            if (progressRef.current) progressRef.current.textContent = `${pct}%`;
            if (progressBarRef.current) progressBarRef.current.style.width = `${pct}%`;

            // Procedural engine synthesizer update
            updateEngineSpeed(calculatedSpeed);

            // Phase indicator update
            if (phaseIndicatorRef.current && phaseDescRef.current) {
              if (p < 0.34) {
                phaseIndicatorRef.current.textContent = PHASES[0].title;
                phaseDescRef.current.textContent = PHASES[0].desc;
              } else if (p < 0.72) {
                phaseIndicatorRef.current.textContent = PHASES[1].title;
                phaseDescRef.current.textContent = PHASES[1].desc;
              } else {
                phaseIndicatorRef.current.textContent = PHASES[2].title;
                phaseDescRef.current.textContent = PHASES[2].desc;
              }
            }

            // Letter-by-letter reactive illumination based on car front coordinates
            if (car && letters.length > 0) {
              const carRect = car.getBoundingClientRect();
              const carFrontX = carRect.right - carRect.width * 0.15;

              letters.forEach((letter) => {
                if (!letter) return;
                const letterRect = letter.getBoundingClientRect();
                const letterMidX = letterRect.left + letterRect.width * 0.35;

                if (carFrontX >= letterMidX) {
                  letter.style.color = "#ffffff";
                  letter.style.opacity = "1";
                  letter.style.transform = "scale(1.05)";
                } else {
                  letter.style.color = "#272a33";
                  letter.style.opacity = "0.22";
                  letter.style.transform = "scale(1)";
                }
              });
            }

            // Dynamic trail width synced to rear wheels
            if (trail && car) {
              const currentX = gsap.getProperty(car, "x");
              const trailWidth = Math.max(0, currentX + bounds.carWidth * 0.18);
              trail.style.width = `${trailWidth}px`;
            }
          },
        },
      });

      // Horizontal travel bound to scroll scrub
      tl.fromTo(
        car,
        {
          x: 0,
          y: 0,
          scale: 0.94,
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

      // Subtle dynamic steering transforms (Apex dips, yaw angles, scale depth)
      tl.to(
        car,
        {
          keyframes: [
            // Phase A: Arrival
            { y: 0, rotation: 0, scale: 0.94, duration: 0.2 },
            // Phase B: Motion (Turn into apex & bank out)
            { y: -12, rotation: -2.0, scale: 1.02, duration: 0.25 },
            { y: 14, rotation: 1.8, scale: 1.06, duration: 0.25 },
            // Phase C: Reveal & straightaway decelerate
            { y: 0, rotation: 0, scale: 1.0, duration: 0.3 },
          ],
          ease: "sine.inOut",
        },
        0
      );

      // Transition background atmosphere toward lighter tones in Phase C
      if (bgAtmosphereRef.current) {
        tl.to(
          bgAtmosphereRef.current,
          {
            opacity: 0.85,
            duration: 0.35,
            ease: "power2.inOut",
          },
          0.65
        );
      }

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

  // Reduced Motion Accessible Presentation
  if (reducedMotion) {
    return (
      <section
        id="scroll-scene"
        ref={sectionRef}
        className="relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-[#090a0d] border-b border-white/[0.08]"
        aria-label="Accessible Motion Scene Overview"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-10">
            <span className="text-[10px] font-mono-code uppercase tracking-widest text-zinc-400 border border-white/10 px-2.5 py-1 rounded mb-3">
              ACCESSIBLE MODE // REDUCED MOTION PREFERRED
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-editorial-wide uppercase">
              W E L C O M E &nbsp; I T Z F I Z Z
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-xl">
              Scroll-linked animations are adapted to a static presentation for comfortable reading without motion triggers.
            </p>
          </div>

          {/* Static Vehicle Showcase */}
          <div className="relative max-w-2xl mx-auto my-8 p-6 editorial-panel rounded-xl flex items-center justify-center">
            <div className="relative w-full max-w-lg aspect-[2.1/1]">
              <Image
                src="/images/mclaren-top.png"
                alt="McLaren Sports Car"
                fill
                className="object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.85)]"
              />
            </div>
          </div>

          {/* Three Phases Static Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            {PHASES.map((phase) => (
              <div
                key={phase.key}
                className="editorial-panel rounded-lg p-5 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono-code text-zinc-400">
                    STAGE // 0{phase.key}
                  </span>
                  <h3 className="font-display font-bold text-sm text-white tracking-wider mt-1">
                    {phase.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                    {phase.desc}
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
      id="scroll-scene"
      ref={sectionRef}
      className="relative w-full h-[360vh] bg-[#090a0d]"
      aria-label="Dedicated Scroll-Driven Car Animation Scene"
    >
      {/* Pinned Viewport Container */}
      <div
        ref={viewportRef}
        className="w-full h-screen sticky top-0 flex flex-col justify-between overflow-hidden bg-[#090a0d]"
      >
        {/* Background Phase C Atmosphere Transition Layer */}
        <div
          ref={bgAtmosphereRef}
          className="absolute inset-0 bg-gradient-to-b from-[#090a0d] via-[#12141a] to-[#252830] opacity-0 pointer-events-none transition-opacity duration-300"
        />

        {/* Top HUD: Editorial Chapter Indicator & Cockpit Telemetry */}
        <div className="relative z-30 w-full pt-6 px-4 sm:px-8 max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Phase Badge & Description */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
              <span
                ref={phaseIndicatorRef}
                className="text-xs font-mono-code font-bold uppercase tracking-widest text-white"
              >
                {PHASES[0].title}
              </span>
            </div>
            <p
              ref={phaseDescRef}
              className="text-[11px] font-mono-code text-zinc-400 mt-0.5 max-w-md hidden sm:block"
            >
              {PHASES[0].desc}
            </p>
          </div>

          {/* Telemetry Metrics Pill */}
          <div className="flex items-center gap-5 sm:gap-7 editorial-panel px-4 py-2 rounded-lg font-mono-code text-xs">
            {/* Speedometer */}
            <div className="flex flex-col items-end">
              <span className="text-[9px] uppercase tracking-widest text-zinc-400">
                VELOCITY
              </span>
              <div className="flex items-baseline gap-1">
                <span
                  ref={speedRef}
                  className="font-display font-black text-lg sm:text-xl text-white"
                >
                  0
                </span>
                <span className="text-[9px] text-zinc-400">KM/H</span>
              </div>
            </div>

            <div className="w-[1px] h-6 bg-white/10" />

            {/* Gear */}
            <div className="flex flex-col items-center">
              <span className="text-[9px] uppercase tracking-widest text-zinc-400">
                GEAR
              </span>
              <span
                ref={gearRef}
                className="font-display font-bold text-sm sm:text-base text-zinc-200"
              >
                N
              </span>
            </div>

            <div className="w-[1px] h-6 bg-white/10" />

            {/* Scrub Progress % */}
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

        {/* Central Stage: High-Velocity Asphalt Runway & Reactive Typography */}
        <div className="relative w-full flex-1 flex flex-col justify-center items-center px-0 sm:px-4 my-2">
          {/* The High-Tech Road Runway */}
          <div
            ref={roadRef}
            className="relative w-full h-[230px] sm:h-[260px] md:h-[290px] bg-[#0c0d12] border-y border-white/[0.08] overflow-hidden flex items-center shadow-[inset_0_0_60px_rgba(0,0,0,0.9)]"
          >
            {/* Subtle Road Grid Texture */}
            <div className="absolute inset-0 bg-editorial-grid opacity-30 pointer-events-none" />

            {/* Thin Hairline Guide Lasers */}
            <div className="absolute top-0 inset-x-0 h-[1px] bg-white/20" />
            <div className="absolute bottom-0 inset-x-0 h-[1px] bg-white/20" />

            {/* Central Dashed Track Divider Line */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] road-dashed-line opacity-30 pointer-events-none" />

            {/* Luminous Kinetic Trail (Behind Car) */}
            <div
              ref={trailRef}
              className="absolute top-0 left-0 h-full pointer-events-none z-10 will-change-transform"
              style={{ width: "0px" }}
            >
              {/* Dual Tire Marks */}
              <div className="absolute top-[28%] inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-zinc-400/50 to-zinc-200" />
              <div className="absolute bottom-[28%] inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-zinc-400/50 to-zinc-200" />
              <div className="w-full h-full bg-gradient-to-r from-transparent via-white/[0.03] to-white/[0.08]" />
            </div>

            {/* Reactive Typographic Illumination: "WELCOME ITZFIZZ" */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-15 flex items-center justify-center pointer-events-none select-none px-4 sm:px-12">
              <div className="font-display font-black text-4xl sm:text-6xl md:text-8xl lg:text-9xl tracking-editorial-wide uppercase flex flex-nowrap items-center justify-center gap-1 sm:gap-2">
                {TRACK_LETTERS.map((char, index) => {
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
              {/* Dynamic Tire Contact Shadows */}
              <div className="absolute inset-x-4 inset-y-2 bg-black/85 blur-xl -z-10 rounded-full" />

              {/* Headlight Illumination Cone */}
              <div
                className="absolute left-[85%] top-1/2 -translate-y-1/2 w-[240px] sm:w-[380px] h-[140px] sm:h-[200px] pointer-events-none z-10 opacity-60"
                style={{
                  background:
                    "radial-gradient(ellipse at 0% 50%, rgba(255, 255, 255, 0.3) 0%, rgba(200, 200, 210, 0.08) 45%, transparent 75%)",
                  transformOrigin: "left center",
                  transform: "perspective(400px) rotateY(-15deg)",
                }}
              />

              {/* High-Resolution Vehicle Asset */}
              <div className="relative w-full h-full">
                <Image
                  src="/images/mclaren-top.png"
                  alt="McLaren Sports Car navigating highway track"
                  fill
                  sizes="(max-width: 768px) 300px, 460px"
                  priority
                  className="object-contain filter drop-shadow-[0_14px_28px_rgba(0,0,0,0.95)]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Pacing & Direction Status */}
        <div className="relative z-30 w-full pb-6 px-4 sm:px-8 max-w-7xl mx-auto flex items-center justify-between text-xs font-mono-code text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 animate-pulse" />
            <span className="uppercase tracking-widest text-[11px]">
              BIDIRECTIONAL SCRUB SYMMETRY
            </span>
          </div>

          {/* Scrub Track Progress Bar */}
          <div className="flex-1 max-w-md mx-6 hidden sm:block">
            <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
              <div
                ref={progressBarRef}
                className="h-full bg-zinc-200 transition-all duration-75 ease-out"
                style={{ width: "0%" }}
              />
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-zinc-400 text-[11px]">
            <span>CONTINUE SCROLL</span>
            <ChevronRight className="w-3.5 h-3.5 text-white" />
          </div>
        </div>
      </div>
    </section>
  );
}
