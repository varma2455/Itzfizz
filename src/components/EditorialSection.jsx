import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { EDITORIAL_PRINCIPLES } from "@/data/experienceData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function EditorialSection({ reducedMotion }) {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const imageContainerRef = useRef(null);
  const principlesRef = useRef([]);

  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      // Headline reveal
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headlineRef.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Subtle parallax on secondary editorial image
      if (imageContainerRef.current) {
        gsap.fromTo(
          imageContainerRef.current,
          { y: 30 },
          {
            y: -30,
            ease: "none",
            scrollTrigger: {
              trigger: imageContainerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      // Editorial principles staggered entrance
      principlesRef.current.forEach((el, index) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: index * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
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
      id="editorial"
      ref={sectionRef}
      className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 bg-[#f5f5f3] text-[#090a0d] border-b border-black/[0.08] overflow-hidden"
      aria-label="The Approach Editorial Spread"
    >
      {/* Background Subtle Light Grid Texture */}
      <div className="absolute inset-0 bg-editorial-light-grid opacity-70 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Label */}
        <div className="mb-6 flex items-center justify-between border-b border-black/10 pb-3">
          <span className="text-xs font-mono-code uppercase tracking-[0.25em] text-zinc-500 font-semibold">
            01 / THE APPROACH
          </span>
          <span className="text-xs font-mono-code text-zinc-400 hidden sm:inline-block">
            EDITORIAL SPREAD // PERSPECTIVE & RIGOR
          </span>
        </div>

        {/* Main Headline */}
        <div ref={headlineRef} className="max-w-5xl mb-16 sm:mb-24">
          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tight text-[#090a0d] leading-[0.95]">
            DIGITAL EXPERIENCES,
            <br />
            ENGINEERED TO MOVE.
          </h2>

          <p className="mt-8 text-base sm:text-xl text-zinc-700 max-w-3xl font-normal leading-relaxed">
            Great digital experiences are built at the intersection of
            purposeful design, thoughtful engineering, and precise interaction.
            Every transition, every layout decision, and every line of code
            should serve a clear objective.
          </p>
        </div>

        {/* Asymmetric Two-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-8 border-t border-black/10 items-start">
          {/* Left Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Massive Editorial Section Number */}
              <div className="font-display font-black text-7xl sm:text-8xl text-zinc-300 leading-none select-none -mt-4">
                01
              </div>

              {/* Short Editorial Statement */}
              <h3 className="font-display font-bold text-xl sm:text-2xl text-[#090a0d] mt-4 mb-3 tracking-wide">
                Connected Interaction Architecture
              </h3>

              <div className="w-12 h-[2px] bg-black mb-6" />

              <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-normal">
                Motion is not decorative punctuation. It is the spatial grammar
                guiding visitor comprehension, confirming state transitions,
                and communicating product value without friction.
              </p>
            </div>

            {/* High-Quality Secondary Automotive/Architectural Image */}
            <div className="mt-10 overflow-hidden rounded-xl border border-black/10 relative aspect-[4/3] bg-zinc-200">
              <div ref={imageContainerRef} className="relative w-full h-full">
                <Image
                  src="/images/editorial-automotive.jpg"
                  alt="Automotive Interior Design Architecture"
                  fill
                  sizes="(max-width: 1024px) 100vw, 450px"
                  className="object-cover filter contrast-[1.05]"
                />
              </div>
            </div>
            <span className="text-[10px] font-mono-code text-zinc-400 mt-2 block uppercase tracking-wider">
              FIG. 01 // BESPOKE MATERIAL CRAFT & SPATIAL BALANCE
            </span>
          </div>

          {/* Right Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-12">
            <div>
              <p className="text-lg sm:text-2xl text-zinc-800 font-normal leading-relaxed border-l-2 border-black pl-6 my-2">
                “From the first visual impression to the final interaction, we
                approach the web as a connected experience. Performance,
                accessibility, responsive behavior, and motion work together to
                make interfaces feel intuitive and considered.”
              </p>
            </div>

            {/* Three Editorial Principles */}
            <div className="pt-6 border-t border-black/10 space-y-6">
              <span className="text-[11px] font-mono-code uppercase tracking-widest text-zinc-500 font-semibold block">
                CORE EDITORIAL PRINCIPLES
              </span>

              <div className="space-y-6">
                {EDITORIAL_PRINCIPLES.map((item, idx) => (
                  <div
                    key={item.index}
                    ref={(el) => (principlesRef.current[idx] = el)}
                    className="group border-b border-black/10 pb-6 transition-all"
                  >
                    <div className="flex items-baseline justify-between mb-2">
                      <h4 className="font-display font-bold text-lg sm:text-xl text-[#090a0d] tracking-wide">
                        {item.index} — {item.title}
                      </h4>
                      <span className="text-xs font-mono-code text-zinc-400">
                        PRINCIPLE // 0{idx + 1}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-600 leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Editorial Footer Spec Note */}
            <div className="pt-4 flex items-center justify-between text-xs font-mono-code text-zinc-500">
              <span>ITAR COMPLIANCE // WCAG 2.2 AA</span>
              <span className="font-semibold text-black">NEXT: CAPABILITIES / 02</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
