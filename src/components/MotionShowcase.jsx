import React, { useState } from "react";
import { SHOWCASE_STAGES } from "@/data/experienceData";
import { Layers, Activity, Cpu, CheckCircle } from "lucide-react";

export default function MotionShowcase() {
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  const activeStage = SHOWCASE_STAGES[activeStageIndex];

  return (
    <section
      id="showcase"
      className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 bg-[#090a0d] text-white border-b border-white/[0.08] overflow-hidden"
      aria-label="Interactive Technical Showcase"
    >
      {/* Background Subtle Grid Texture */}
      <div className="absolute inset-0 bg-editorial-grid opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
            <span className="text-xs font-mono-code uppercase tracking-[0.25em] text-zinc-400 font-semibold">
              03 / TECHNICAL SHOWCASE
            </span>
          </div>

          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-white leading-[0.98]">
            MOTION WITH
            <br />
            PURPOSE.
          </h2>

          <p className="mt-6 text-base sm:text-lg text-zinc-400 font-normal leading-relaxed">
            An interactive breakdown of how the scroll choreography, spatial
            layout, and render pipeline harmonize to create a seamless
            experience.
          </p>
        </div>

        {/* Interactive Three-Stage Tab Selector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Numbered Stage Selectors (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {SHOWCASE_STAGES.map((stage, idx) => {
              const isActive = activeStageIndex === idx;
              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStageIndex(idx)}
                  onMouseEnter={() => setActiveStageIndex(idx)}
                  className={`text-left p-6 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                    isActive
                      ? "bg-white/[0.06] border-white/40 shadow-lg shadow-black/50"
                      : "editorial-panel border-white/[0.08] hover:border-white/20 text-zinc-400"
                  }`}
                  aria-pressed={isActive}
                  aria-label={`Select stage ${stage.number}: ${stage.name}`}
                >
                  <div className="flex items-baseline justify-between w-full mb-1">
                    <span className="text-[10px] font-mono-code uppercase tracking-widest text-zinc-400">
                      STAGE // 0{idx + 1}
                    </span>
                    <span
                      className={`text-xs font-mono-code font-bold ${
                        isActive ? "text-white" : "text-zinc-400"
                      }`}
                    >
                      {stage.metric}
                    </span>
                  </div>

                  <div className="flex items-center justify-between w-full mt-1">
                    <h3
                      className={`font-display font-bold text-xl sm:text-2xl tracking-wide ${
                        isActive ? "text-white" : "text-zinc-300"
                      }`}
                    >
                      {stage.name}
                    </h3>
                    <div
                      className={`w-2 h-2 rounded-full transition-colors ${
                        isActive ? "bg-white" : "bg-white/20"
                      }`}
                    />
                  </div>

                  <p className="text-xs font-mono-code text-zinc-400 mt-2 line-clamp-1">
                    {stage.tagline}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Column: Dynamic Stage Inspection Deck (7 cols) */}
          <div className="lg:col-span-7 editorial-panel rounded-2xl p-8 sm:p-12 border border-white/[0.12] flex flex-col justify-between min-h-[380px]">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/[0.08] mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono-code text-zinc-400">
                    STAGE // 0{activeStageIndex + 1}
                  </span>
                  <span className="text-zinc-700">/</span>
                  <span className="text-xs font-mono-code text-white uppercase tracking-wider">
                    {activeStage.tagline}
                  </span>
                </div>
                <span className="text-xs font-mono-code text-zinc-400">
                  STATUS: VERIFIED
                </span>
              </div>

              <h3 className="font-display font-black text-3xl sm:text-4xl text-white tracking-wide mb-4">
                {activeStage.name} Architecture
              </h3>

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal mb-8">
                {activeStage.description}
              </p>

              {/* Technical Detail Callout */}
              <div className="p-4 rounded-lg bg-black/40 border border-white/[0.08] font-mono-code text-xs text-zinc-300 space-y-2">
                <div className="text-[10px] text-zinc-400 uppercase tracking-widest">
                  IMPLEMENTATION SPECIFICATION:
                </div>
                <div className="text-zinc-200">
                  {activeStage.technicalDetail}
                </div>
              </div>
            </div>

            {/* Stage Progress Bar & Verification */}
            <div className="pt-8 border-t border-white/[0.08] mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  {SHOWCASE_STAGES.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === activeStageIndex
                          ? "w-8 bg-white"
                          : "w-2 bg-white/20"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[11px] font-mono-code text-zinc-400">
                  STEP {activeStageIndex + 1} OF 3
                </span>
              </div>

              <div className="text-[11px] font-mono-code text-zinc-400 flex items-center gap-1.5">
                <span>TOUCH & CLICK ENABLED</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
