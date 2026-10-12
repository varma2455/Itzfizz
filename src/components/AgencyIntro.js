import React from "react";
import { Gauge, Target, Terminal, Cpu } from "lucide-react";

export default function AgencyIntro() {
  const pillars = [
    {
      icon: Gauge,
      tag: "PERFORMANCE FIRST",
      title: "Sub-Millisecond Responsiveness",
      desc: "Every interaction is engineered against strict 16.6ms frame budgets. We ensure silky 60fps animations without burning CPU cycles or dropping frames.",
      gradient: "from-emerald-400 to-teal-400",
    },
    {
      icon: Target,
      tag: "INTENTIONAL MOTION",
      title: "Storytelling With Purpose",
      desc: "Motion is never purely decorative. We choreograph visual elements to guide eye paths, focus visitor attention on value propositions, and drive conversion velocity.",
      gradient: "from-cyan-400 to-blue-400",
    },
    {
      icon: Terminal,
      tag: "CREATIVE CODE",
      title: "Agency-Caliber Engineering",
      desc: "Clean modular React components, robust GSAP context teardowns, and accessible fallbacks built for enterprise production readiness.",
      gradient: "from-amber-400 to-orange-400",
    },
  ];

  return (
    <section
      id="about"
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#060709] border-t border-white/5 overflow-hidden"
      aria-label="Itzfizz Digital Experiences"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-xs font-mono-code mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="uppercase tracking-widest">{"// 03 PHILOSOPHY & CRAFT"}</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl uppercase tracking-wider text-white">
            Where Speed Meets{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-300 bg-clip-text text-transparent">
              Editorial Precision
            </span>
          </h2>

          <p className="mt-5 text-base sm:text-lg text-zinc-400 font-normal leading-relaxed">
            At Itzfizz Digital, we believe the next era of digital flagships
            belongs to those who master the fusion of high-fidelity creative motion
            and disciplined software craftsmanship.
          </p>
        </div>

        {/* 3 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="glass-panel glass-panel-hover rounded-2xl p-7 flex flex-col justify-between relative group overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[11px] font-mono-code text-zinc-500 tracking-wider">
                      {`PHASE // 0${idx + 1}`}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 text-emerald-400" />
                    </div>
                  </div>

                  <span
                    className={`inline-block text-[11px] font-mono-code font-bold tracking-widest uppercase bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent mb-2`}
                  >
                    {item.tag}
                  </span>

                  <h3 className="font-display font-bold text-xl text-white tracking-wide mb-3">
                    {item.title}
                  </h3>

                  <p className="text-sm text-zinc-400 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>

                {/* Subtle bottom indicator */}
                <div
                  className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono-code text-zinc-500 group-hover:text-zinc-300 transition-colors"
                >
                  <span>SPECIFICATION VERIFIED</span>
                  <span className="text-emerald-400">READY</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Agency Quote / Metric Showcase Banner */}
        <div className="mt-14 glass-panel rounded-2xl p-6 sm:p-8 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400/20 to-cyan-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 shrink-0">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display font-bold text-base text-white">
                Engineered for the Itzfizz Digital Creative Assignment
              </h4>
              <p className="text-xs text-zinc-400 mt-0.5">
                Demonstrating senior-grade GSAP scroll orchestration, Next.js architecture, and clean component isolation.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0 font-mono-code text-xs">
            <div className="px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 text-zinc-300">
              FRAMEWORK: <span className="text-emerald-400">NEXT.JS 16</span>
            </div>
            <div className="px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 text-zinc-300">
              MOTION: <span className="text-cyan-400">GSAP SCRUB</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
