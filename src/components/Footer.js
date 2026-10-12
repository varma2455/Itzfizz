import React from "react";
import { ArrowUp, Terminal, Heart, Sparkles, ExternalLink } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#040507] border-t border-white/10 pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-zinc-400 font-mono-code text-xs">
      <div className="max-w-7xl mx-auto flex flex-col justify-between gap-12">
        {/* Top Row: Brand & Back to Top */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 p-0.5 flex items-center justify-center">
              <div className="w-full h-full bg-[#07090e] rounded-[6px] flex items-center justify-center font-display font-black text-emerald-400 text-sm">
                IZ
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-base text-white tracking-wider">
                  ITZFIZZ DIGITAL
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  INTERNSHIP ASSIGNMENT
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 mt-0.5 font-normal">
                Scroll-Driven Hero Animation & High-Velocity Interactive Experience
              </p>
            </div>
          </div>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/40 text-zinc-300 hover:text-white transition-all cursor-pointer"
            aria-label="Scroll to top of page"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 text-emerald-400 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Tech Stack & Assignment Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-4">
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-2">
              Objective & Inspiration
            </h4>
            <p className="text-zinc-400 text-[11px] leading-relaxed">
              Inspired by the kinetic mechanics of scroll-driven automotive visualization, re-engineered into an original, production-quality agency showcase for Itzfizz Digital.
            </p>
          </div>

          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-2">
              Mandatory Stack
            </h4>
            <div className="flex flex-wrap gap-1.5 text-[11px]">
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-300">
                Next.js (React)
              </span>
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-300">
                JavaScript
              </span>
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-300">
                Tailwind CSS
              </span>
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-emerald-400">
                GSAP ScrollTrigger
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-2">
              Architecture & Performance
            </h4>
            <p className="text-zinc-400 text-[11px] leading-relaxed">
              GPU-composited transforms (<code className="text-emerald-400">translateX</code>, <code className="text-emerald-400">translateY</code>, <code className="text-emerald-400">scale</code>, <code className="text-emerald-400">rotation</code>), zero CLS layout, and declarative React GSAP lifecycle management.
            </p>
          </div>
        </div>

        {/* Bottom Copyright & Status */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-400">
          <div>
            © {new Date().getFullYear()} Itzfizz Digital Assignment. Built with precision for the creative web animation role.
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-zinc-400">STATUS: PRODUCTION BUILD READY</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
