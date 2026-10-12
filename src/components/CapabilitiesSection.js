import React from "react";
import {
  Code2,
  Smartphone,
  Gauge,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export default function CapabilitiesSection() {
  const capabilities = [
    {
      id: "web-dev",
      number: "01",
      title: "Web Development",
      category: "CREATIVE CODE",
      headline: "Modern Architecture & Clean Components",
      description:
        "Building scalable web applications powered by Next.js and React. Clean component hierarchies, isolated animation logic, and production-ready code designed for maintainability and extensibility.",
      features: [
        "Next.js App & Pages routing models",
        "Declarative GSAP context integration",
        "Modular Tailwind CSS utility architecture",
        "Strict dependency management & lint hygiene",
      ],
      icon: Code2,
      accent: "from-emerald-400 to-teal-400",
      badge: "PRODUCTION GRADE",
    },
    {
      id: "responsive",
      number: "02",
      title: "Responsive Design",
      category: "VIEWPORT ADAPTATION",
      headline: "Fluid Experiences Across Every Screen",
      description:
        "Motion choreography tailored for desktop, tablet, and mobile. Responsive coordinate recalculation prevents horizontal overflow, avoids layout shifting, and guarantees seamless touch interaction.",
      features: [
        "Dynamic coordinate interpolation per viewport",
        "Touch-gesture friendly scroll physics",
        "Adaptive typography using fluid clamp scales",
        "Zero horizontal scroll overflow (overflow-x-hidden)",
      ],
      icon: Smartphone,
      accent: "from-cyan-400 to-blue-400",
      badge: "MULTI-DEVICE",
    },
    {
      id: "performance",
      number: "03",
      title: "Performance Optimization",
      category: "60 FPS RUNTIME",
      headline: "Engineered For Speed & Accessibility",
      description:
        "Dedicated to the 16.6ms frame budget. We rely exclusively on GPU-accelerated transforms and opacity, caching geometry to avoid expensive scroll-time reflows while respecting reduced-motion preferences.",
      features: [
        "GPU layer promotion via will-change & transforms",
        "Cached DOM bounds to eliminate layout thrashing",
        "Native prefers-reduced-motion support (WCAG 2.2)",
        "Sub-second First Contentful Paint & 99+ Lighthouse",
      ],
      icon: Gauge,
      accent: "from-amber-400 to-orange-400",
      badge: "SUB-SECOND TTI",
    },
  ];

  return (
    <section
      id="capabilities"
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#060709] border-t border-white/5 overflow-hidden"
      aria-label="Capabilities and Specializations"
    >
      {/* Background Accent Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-xs font-mono-code mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="uppercase tracking-widest">{"// 04 CORE CAPABILITIES"}</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl uppercase tracking-wider text-white">
            Built For Modern{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-300 bg-clip-text text-transparent">
              Digital High-Performers
            </span>
          </h2>

          <p className="mt-5 text-base sm:text-lg text-zinc-400 font-normal leading-relaxed">
            Delivering the complete frontend triad required for world-class
            internship execution: engineering rigor, cross-device responsiveness,
            and flawless animation performance.
          </p>
        </div>

        {/* 3 Featured Capabilities */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.id}
                className="glass-panel glass-panel-hover rounded-2xl p-7 flex flex-col justify-between border border-white/10 relative group"
              >
                <div>
                  {/* Card Top Metadata */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6 text-emerald-400" />
                    </div>
                    <span className="text-[10px] font-mono-code px-2 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 uppercase tracking-wider">
                      {cap.badge}
                    </span>
                  </div>

                  <span
                    className={`text-xs font-mono-code font-bold tracking-widest uppercase bg-gradient-to-r ${cap.accent} bg-clip-text text-transparent`}
                  >
                    {`${cap.number} // ${cap.category}`}
                  </span>

                  <h3 className="font-display font-black text-2xl text-white tracking-wide mt-1 mb-2">
                    {cap.title}
                  </h3>

                  <p className="text-sm font-semibold text-zinc-300 mb-3">
                    {cap.headline}
                  </p>

                  <p className="text-xs text-zinc-400 leading-relaxed font-normal mb-6">
                    {cap.description}
                  </p>

                  {/* Feature Checklist */}
                  <div className="space-y-2.5 pt-4 border-t border-white/5">
                    {cap.features.map((feat) => (
                      <div
                        key={feat}
                        className="flex items-start gap-2.5 text-xs text-zinc-300"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Card Footer */}
                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between font-mono-code text-[11px] text-zinc-500 group-hover:text-zinc-300 transition-colors">
                  <span>SPECIFICATION: VERIFIED</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    READY <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
