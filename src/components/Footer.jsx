import React from "react";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#07080a] text-zinc-400 font-mono-code text-xs pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto flex flex-col justify-between gap-12">
        {/* Top Row: Wordmark & Back-to-top */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <span className="font-display font-black text-xl text-white tracking-[0.2em] uppercase">
              ITZFIZZ
            </span>
            <span className="text-[10px] text-zinc-400 px-2 py-0.5 rounded border border-white/10 uppercase tracking-widest">
              Assignment / Creative Development
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 px-4 py-2 rounded border border-white/10 hover:border-white/30 text-zinc-300 hover:text-white transition-all cursor-pointer"
            aria-label="Scroll to top of document"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Middle Metadata: Stack & Architectural Notes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-2 text-[11px] leading-relaxed text-zinc-400">
          <div>
            <h4 className="text-zinc-200 font-bold uppercase tracking-wider mb-2">
              Objective & Execution
            </h4>
            <p>
              Bespoke scroll-driven automotive digital experience built for the
              Itzfizz Digital creative web engineering internship assignment.
            </p>
          </div>

          <div>
            <h4 className="text-zinc-200 font-bold uppercase tracking-wider mb-2">
              Technology Stack
            </h4>
            <p>
              Next.js &bull; React &bull; JavaScript &bull; Tailwind CSS &bull; GSAP 3.12 &bull; ScrollTrigger &bull; Web Audio API.
            </p>
          </div>

          <div>
            <h4 className="text-zinc-200 font-bold uppercase tracking-wider mb-2">
              Performance Budget
            </h4>
            <p>
              Hardware GPU layer promotion, direct DOM telemetry updates, zero
              layout shift, and native prefers-reduced-motion bypass.
            </p>
          </div>
        </div>

        {/* Bottom Row: Dynamic Copyright & Attribution */}
        <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[10px] text-zinc-400">
          <div>
            &copy; {currentYear} ITZFIZZ DIGITAL INTERNSHIP SUBMISSION. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
            <span>PRODUCTION DEPLOYMENT READY</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
