import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ArrowDown } from "lucide-react";
import { HERO_METRICS } from "@/data/experienceData";

export default function HeroSection({ reducedMotion }) {
  const containerRef = useRef(null);
  const labelRef = useRef(null);
  const headlineWordsRef = useRef([]);
  const copyRef = useRef(null);
  const carWrapperRef = useRef(null);
  const metricsRef = useRef([]);
  const scrollCueRef = useRef(null);
  const annotationsRef = useRef(null);

  const headline = ["WELCOME", "ITZFIZZ"];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(
          [
            labelRef.current,
            headlineWordsRef.current,
            copyRef.current,
            carWrapperRef.current,
            metricsRef.current,
            scrollCueRef.current,
            annotationsRef.current,
          ],
          { opacity: 1, y: 0, scale: 1 }
        );
        return;
      }

      // Hide elements initially to prevent flash of unstyled content
      gsap.set(labelRef.current, { opacity: 0, y: -15 });
      gsap.set(headlineWordsRef.current, { opacity: 0, y: 35 });
      gsap.set(copyRef.current, { opacity: 0, y: 20 });
      gsap.set(carWrapperRef.current, { opacity: 0, scale: 0.95, y: 25 });
      gsap.set(metricsRef.current, { opacity: 0, y: 20 });
      gsap.set(scrollCueRef.current, { opacity: 0, y: 15 });
      gsap.set(annotationsRef.current, { opacity: 0 });

      // Clean, rapid GSAP entrance timeline
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.1,
      });

      tl.to(labelRef.current, { opacity: 1, y: 0, duration: 0.5 })
        .to(
          headlineWordsRef.current,
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 },
          "-=0.3"
        )
        .to(copyRef.current, { opacity: 1, y: 0, duration: 0.55 }, "-=0.4")
        .to(
          carWrapperRef.current,
          { opacity: 1, scale: 1, y: 0, duration: 0.85 },
          "-=0.4"
        )
        .to(
          metricsRef.current,
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
          "-=0.5"
        )
        .to(annotationsRef.current, { opacity: 1, duration: 0.6 }, "-=0.3")
        .to(scrollCueRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.4");
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const scrollToScrollScene = () => {
    const el = document.getElementById("scroll-scene");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[100svh] lg:h-[100svh] flex flex-col justify-between pt-20 pb-8 px-4 sm:px-6 lg:px-8 bg-[#090a0d] border-b border-white/[0.06] overflow-hidden"
      aria-label="Hero Introduction"
    >
      {/* Background Subtle Editorial Grid */}
      <div className="absolute inset-0 bg-editorial-grid opacity-60 pointer-events-none" />

      {/* Atmospheric Subtle Spotlight */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-white/[0.02] blur-[140px] rounded-full pointer-events-none" />

      {/* Technical Corner Annotations */}
      <div
        ref={annotationsRef}
        className="hidden xl:flex absolute top-28 left-8 right-8 justify-between text-[10px] font-mono-code text-zinc-400 uppercase tracking-widest pointer-events-none select-none z-10"
      >
        <span>COORD // 45.4642° N 9.1900° E</span>
        <span>ENGINE // GSAP 3.12 SCRUB 1.0</span>
        <span>FRAME BUDGET // 16.6ms LOCKED</span>
      </div>

      {/* Center Group: Editorial Label + Enormous Headline + Car Showcase */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center items-center text-center mt-2 sm:mt-4">
        {/* Upper Editorial Label */}
        <div ref={labelRef} className="mb-3 sm:mb-4">
          <span className="text-[11px] sm:text-xs font-mono-code uppercase tracking-[0.3em] text-zinc-400 border-b border-white/10 pb-1">
            DIGITAL EXPERIENCES / 2026
          </span>
        </div>

        {/* Enormous Editorial Headline: WELCOME ITZFIZZ */}
        <h1
          className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-white tracking-editorial-wide uppercase select-none my-1 sm:my-2 flex flex-wrap justify-center items-center gap-x-6 sm:gap-x-12"
          aria-label="WELCOME ITZFIZZ"
        >
          {headline.map((word, wIdx) => (
            <span
              key={word}
              ref={(el) => (headlineWordsRef.current[wIdx] = el)}
              className="inline-block"
            >
              {word}
            </span>
          ))}
        </h1>

        {/* Concise Supporting Statement */}
        <p
          ref={copyRef}
          className="max-w-2xl text-xs sm:text-sm md:text-base text-zinc-400 font-normal leading-relaxed mt-2 sm:mt-3 px-4"
        >
          Engineering considered, motion-driven digital flagships at the
          intersection of purposeful design, technical discipline, and brand
          architecture.
        </p>

        {/* Cinematic Vehicle Image Placement */}
        <div
          ref={carWrapperRef}
          className="relative w-full max-w-4xl mx-auto mt-4 sm:mt-6 mb-2 flex items-center justify-center group"
        >
          {/* Subtle Ground Shadow & Horizon Razor Line */}
          <div className="absolute inset-x-12 sm:inset-x-24 bottom-2 h-14 bg-black/80 blur-xl rounded-full pointer-events-none" />
          <div className="absolute inset-x-8 sm:inset-x-16 bottom-3 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

          {/* High-Quality Sports Car Asset */}
          <div className="relative w-full max-w-[620px] sm:max-w-[720px] aspect-[2.1/1]">
            <Image
              src="/images/mclaren-top.png"
              alt="High-Performance McLaren Sports Car Top View"
              fill
              sizes="(max-width: 768px) 100vw, 720px"
              priority
              className="object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.85)]"
            />
          </div>
        </div>
      </div>

      {/* Bottom Row: 3 Illustrated Statistics on Left & Scroll Indicator on Right */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
        {/* Statistics Group (Illustrative Design Benchmarks) */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8">
            {HERO_METRICS.map((metric, idx) => (
              <div
                key={metric.id}
                ref={(el) => (metricsRef.current[idx] = el)}
                className="flex flex-col"
              >
                <div className="flex items-baseline gap-2">
                  <span className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
                    {metric.value}
                  </span>
                  <span className="text-[10px] font-mono-code text-zinc-400 uppercase tracking-wider">
                    {metric.annotation}
                  </span>
                </div>
                <h2 className="text-xs font-semibold text-zinc-200 mt-0.5">
                  {metric.label}
                </h2>
                <p className="text-[11px] text-zinc-400 mt-0.5 line-clamp-1">
                  {metric.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Minimal Scroll Cue on Right */}
        <div
          ref={scrollCueRef}
          className="flex flex-col items-end shrink-0 sm:pl-8 sm:border-l sm:border-white/[0.08]"
        >
          <button
            onClick={scrollToScrollScene}
            className="group flex items-center gap-3 text-left focus:outline-none cursor-pointer"
            aria-label="Scroll to begin motion scene"
          >
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-mono-code uppercase tracking-widest text-zinc-400 group-hover:text-zinc-200 transition-colors">
                Scroll To Accelerate
              </span>
              <span className="text-[10px] font-mono-code text-zinc-400">
                PHASE A / ARRIVAL
              </span>
            </div>
            <div className="w-8 h-8 rounded border border-white/10 group-hover:border-white/30 flex items-center justify-center transition-colors">
              <ArrowDown className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-transform group-hover:translate-y-0.5" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
