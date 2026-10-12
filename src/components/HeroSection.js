import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Zap, Activity, Compass } from "lucide-react";

export default function HeroSection({ reducedMotion }) {
  const containerRef = useRef(null);
  const headlineLettersRef = useRef([]);
  const taglineRef = useRef(null);
  const statsRef = useRef([]);
  const carWrapperRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const badgeRef = useRef(null);

  const word1 = "WELCOME".split("");
  const word2 = "ITZFIZZ".split("");

  const stats = [
    {
      value: "+185%",
      label: "Conversion Velocity",
      description: "Measured lift across interactive, motion-enhanced user funnels.",
      accent: "from-emerald-400 to-emerald-500",
      icon: Zap,
    },
    {
      value: "99.4%",
      label: "Core Web Vitals",
      description: "Sub-second TTI & locked 60FPS animation pipelines with zero layout shift.",
      accent: "from-cyan-400 to-cyan-500",
      icon: Activity,
    },
    {
      value: "-64%",
      label: "Bounce Latency",
      description: "Reduction in drop-off through captivating cinematic web experiences.",
      accent: "from-amber-400 to-amber-500",
      icon: Compass,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reducedMotion) {
        // Reduced motion: instant, accessible reveal
        gsap.set(
          [
            badgeRef.current,
            headlineLettersRef.current,
            taglineRef.current,
            statsRef.current,
            carWrapperRef.current,
            scrollIndicatorRef.current,
          ],
          { opacity: 1, y: 0, scale: 1 }
        );
        return;
      }

      // Initial state
      gsap.set(badgeRef.current, { opacity: 0, y: -20 });
      gsap.set(headlineLettersRef.current, { opacity: 0, y: 40 });
      gsap.set(taglineRef.current, { opacity: 0, y: 25 });
      gsap.set(statsRef.current, { opacity: 0, y: 30 });
      gsap.set(carWrapperRef.current, { opacity: 0, scale: 0.94, y: 35 });
      gsap.set(scrollIndicatorRef.current, { opacity: 0, y: 15 });

      // Orchestrated intro timeline
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.15,
      });

      tl.to(badgeRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
      })
        .to(
          headlineLettersRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.032,
            ease: "back.out(1.4)",
          },
          "-=0.3"
        )
        .to(
          taglineRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
          },
          "-=0.4"
        )
        .to(
          carWrapperRef.current,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.1,
            ease: "power2.out",
          },
          "-=0.45"
        )
        .to(
          statsRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.12,
          },
          "-=0.6"
        )
        .to(
          scrollIndicatorRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
          },
          "-=0.3"
        );
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const scrollToTrack = () => {
    const track = document.getElementById("scroll-track");
    if (track) {
      track.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-between pt-24 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden bg-radial-vignette"
      aria-label="Hero Introduction"
    >
      {/* Background Ambience & Cyber Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[500px] h-[300px] bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none" />

      {/* Main Hero Header & Typography */}
      <div className="relative z-10 max-w-7xl mx-auto w-full text-center flex flex-col items-center mt-4 sm:mt-8">
        {/* Sub-badge / Eyebrow */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs font-mono-code mb-5 shadow-inner"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400" />
          <span className="tracking-widest uppercase">
            Itzfizz Creative Engineering Assignment
          </span>
          <span className="text-zinc-600">{"//"}</span>
          <span className="text-emerald-400 font-semibold">2026 EDITION</span>
        </div>

        {/* Widely Letter-Spaced Headline: “W E L C O M E   I T Z F I Z Z” */}
        <h1
          className="font-display font-black tracking-cinematic text-2xl sm:text-4xl md:text-5xl lg:text-7xl uppercase text-white drop-shadow-2xl select-none flex flex-wrap justify-center items-center gap-y-2 gap-x-6 sm:gap-x-10 my-2"
          aria-label="WELCOME ITZFIZZ"
        >
          {/* Word 1: WELCOME */}
          <span className="inline-flex flex-nowrap">
            {word1.map((letter, index) => (
              <span
                key={`w1-${index}`}
                ref={(el) => (headlineLettersRef.current[index] = el)}
                className="inline-block transition-transform hover:text-emerald-400 hover:-translate-y-1 duration-200"
              >
                {letter}
              </span>
            ))}
          </span>

          {/* Word 2: ITZFIZZ */}
          <span className="inline-flex flex-nowrap bg-gradient-to-r from-emerald-300 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
            {word2.map((letter, index) => (
              <span
                key={`w2-${index}`}
                ref={(el) =>
                  (headlineLettersRef.current[word1.length + index] = el)
                }
                className="inline-block transition-transform hover:text-cyan-300 hover:-translate-y-1 duration-200"
              >
                {letter}
              </span>
            ))}
          </span>
        </h1>

        {/* Supporting Tagline */}
        <p
          ref={taglineRef}
          className="max-w-3xl text-sm sm:text-base md:text-lg text-zinc-300 font-normal leading-relaxed mt-4 sm:mt-6 px-4"
        >
          Engineering cinematic, high-velocity digital experiences at the
          crossroads of motion, performance code, and modern brand essence.
        </p>

        {/* Sports Car Centerpiece & Holographic Stage */}
        <div
          ref={carWrapperRef}
          className="relative w-full max-w-4xl mx-auto my-6 sm:my-8 flex items-center justify-center group"
        >
          {/* Platform Floor Glow & Runway Pedestal */}
          <div className="absolute inset-x-8 sm:inset-x-16 bottom-2 h-16 sm:h-24 bg-gradient-to-t from-emerald-500/20 via-cyan-500/10 to-transparent blur-2xl rounded-full" />
          <div className="absolute inset-x-12 sm:inset-x-24 bottom-4 h-1 sm:h-1.5 bg-gradient-to-r from-transparent via-emerald-400/80 to-transparent shadow-[0_0_20px_#10b981]" />

          {/* Precision Stage Telemetry Rings */}
          <div className="absolute -inset-4 sm:-inset-8 border border-white/5 rounded-3xl pointer-events-none" />
          <div className="absolute top-1 left-4 font-mono-code text-[10px] text-zinc-400 tracking-wider hidden sm:block">
            VEHICLE: MCLAREN 720S AERO // TELEMETRY READY
          </div>
          <div className="absolute top-1 right-4 font-mono-code text-[10px] text-emerald-400 tracking-wider hidden sm:block">
            STATUS: STANDBY // SCROLL TO IGNITE
          </div>

          {/* Prominent High-Quality Sports Car Asset */}
          <div className="relative w-full max-w-[650px] sm:max-w-[750px] aspect-[2.1/1] transform transition-transform duration-500 ease-out group-hover:scale-[1.02]">
            <Image
              src="/images/mclaren-top.png"
              alt="High-Performance McLaren 720S Sports Car Top View"
              width={750}
              height={358}
              priority
              className="w-full h-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)]"
            />
          </div>
        </div>
      </div>

      {/* Business Impact Statistics (3 Cards with percentage values and concise descriptions) */}
      <div className="relative z-10 max-w-6xl mx-auto w-full px-2 sm:px-4 mb-4 sm:mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-5">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                ref={(el) => (statsRef.current[idx] = el)}
                className="glass-panel glass-panel-hover rounded-xl p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono-code text-zinc-400 uppercase tracking-wider">
                      {`Metric // 0${idx + 1}`}
                    </span>
                  </div>
                  <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300">
                    <Icon className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                </div>

                <div className="my-1">
                  <div
                    className={`font-display font-black text-3xl sm:text-4xl bg-gradient-to-r ${stat.accent} bg-clip-text text-transparent`}
                  >
                    {stat.value}
                  </div>
                  <h3 className="text-sm font-semibold text-white tracking-wide mt-1">
                    {stat.label}
                  </h3>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed mt-1 font-normal">
                  {stat.description}
                </p>

                {/* Ambient accent strip at card bottom */}
                <div
                  className={`absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r ${stat.accent} opacity-30`}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="relative z-10 w-full flex flex-col items-center justify-center mt-2"
      >
        <button
          onClick={scrollToTrack}
          className="group flex flex-col items-center gap-2 focus:outline-none cursor-pointer"
          aria-label="Scroll down to begin interactive animation"
        >
          <span className="text-[11px] font-mono-code uppercase tracking-widest text-zinc-400 group-hover:text-emerald-400 transition-colors flex items-center gap-1.5">
            <span>Scroll To Accelerate</span>
            <span className="text-zinc-600">{"//"}</span>
            <span className="text-emerald-400 font-bold">0 → 100 KM/H</span>
          </span>

          <div className="w-5 h-8 rounded-full border border-white/20 group-hover:border-emerald-400/60 p-1 flex justify-center transition-colors shadow-sm">
            <div className="w-1 h-2 rounded-full bg-emerald-400 animate-bounce" />
          </div>
        </button>
      </div>
    </section>
  );
}
