import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { CAPABILITIES } from "@/data/experienceData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CapabilitiesSection({ reducedMotion }) {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headlineRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: (index % 2) * 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="capabilities"
      ref={sectionRef}
      className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 bg-[#090a0d] text-white border-b border-white/[0.08] overflow-hidden"
      aria-label="Capabilities Overview"
    >
      {/* Background Editorial Grid */}
      <div className="absolute inset-0 bg-editorial-grid opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div ref={headlineRef} className="max-w-4xl mb-16 sm:mb-20">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
            <span className="text-xs font-mono-code uppercase tracking-[0.25em] text-zinc-400 font-semibold">
              02 / CAPABILITIES
            </span>
          </div>

          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-white leading-[0.98]">
            CRAFTED FOR THE
            <br />
            MODERN WEB.
          </h2>

          <p className="mt-6 text-base sm:text-lg text-zinc-400 font-normal leading-relaxed max-w-2xl">
            Thoughtful interfaces. Reliable engineering. Experiences built for
            every screen.
          </p>
        </div>

        {/* Premium Four-Item Editorial Grid with Thin Separators */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {CAPABILITIES.map((cap, idx) => (
            <div
              key={cap.index}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="group editorial-panel rounded-xl p-8 sm:p-10 flex flex-col justify-between border border-white/[0.08] hover:border-white/20 transition-all duration-300 relative overflow-hidden"
            >
              <div>
                {/* Header: Large Index Number & Category Tag */}
                <div className="flex items-baseline justify-between pb-6 border-b border-white/[0.08] mb-6">
                  <span className="font-display font-black text-4xl sm:text-5xl text-zinc-400 group-hover:text-white transition-colors">
                    {cap.index}
                  </span>
                  <span className="text-[10px] font-mono-code tracking-[0.2em] text-zinc-400 uppercase">
                    {cap.tag}
                  </span>
                </div>

                {/* Strong Title */}
                <h3 className="font-display font-bold text-2xl text-white tracking-wide mb-3">
                  {cap.title}
                </h3>

                {/* Concise Description */}
                <p className="text-sm text-zinc-400 leading-relaxed font-normal mb-8">
                  {cap.description}
                </p>

                {/* Minimal Technical Specifications List */}
                <div className="grid grid-cols-2 gap-2 pt-4 border-t border-white/[0.06] text-xs font-mono-code text-zinc-400">
                  {cap.specs.map((spec) => (
                    <div key={spec} className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-zinc-400 rounded-full" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Minimal Bottom Technical Motif */}
              <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono-code text-zinc-400">
                <span>SPEC // ARCHITECTURE READY</span>
                <span className="text-zinc-400 group-hover:text-white transition-colors">
                  0{idx + 1} → 04
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
