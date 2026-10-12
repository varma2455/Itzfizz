import React, { useState, useEffect } from "react";
import { Gauge, Volume2, VolumeX, ArrowUpRight } from "lucide-react";

export default function Navbar({
  reducedMotion,
  onToggleReducedMotion,
  soundEnabled,
  onToggleSound,
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#060709]/85 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl shadow-black/60"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("hero");
            }}
            className="group flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-md"
            aria-label="Itzfizz Digital Home"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 p-0.5 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-shadow">
              <div className="w-full h-full bg-[#07090e] rounded-[6px] flex items-center justify-center">
                <span className="font-display font-bold text-sm tracking-tighter text-emerald-400">
                  IZ
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold text-base tracking-wider text-white">
                  ITZFIZZ
                </span>
                <span className="text-[10px] font-mono-code px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-widest font-semibold">
                  DIGITAL
                </span>
              </div>
              <span className="text-[10px] text-zinc-400 tracking-wider font-mono-code uppercase -mt-0.5 hidden sm:inline-block">
                Creative Engineering Lab
              </span>
            </div>
          </a>
        </div>

        {/* Live Status Pill & Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono-code uppercase tracking-widest text-zinc-400">
          <button
            onClick={() => scrollToSection("hero")}
            className="hover:text-emerald-400 transition-colors cursor-pointer focus:outline-none focus-visible:text-emerald-400"
          >
            {"// 01 Experience"}
          </button>
          <button
            onClick={() => scrollToSection("scroll-track")}
            className="hover:text-cyan-400 transition-colors cursor-pointer focus:outline-none focus-visible:text-cyan-400"
          >
            {"// 02 Telemetry Track"}
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="hover:text-emerald-400 transition-colors cursor-pointer focus:outline-none focus-visible:text-emerald-400"
          >
            {"// 03 Philosophy"}
          </button>
          <button
            onClick={() => scrollToSection("capabilities")}
            className="hover:text-cyan-400 transition-colors cursor-pointer focus:outline-none focus-visible:text-cyan-400"
          >
            {"// 04 Capabilities"}
          </button>
        </nav>

        {/* Controls & CTA */}
        <div className="flex items-center gap-2.5">
          {/* Sound Synthesizer Toggle */}
          <button
            onClick={onToggleSound}
            aria-pressed={soundEnabled}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border text-[11px] font-mono-code transition-all cursor-pointer ${
              soundEnabled
                ? "bg-cyan-500/15 border-cyan-500/40 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.3)]"
                : "bg-white/5 border-white/10 text-zinc-400 hover:text-zinc-200 hover:bg-white/10"
            }`}
            title={soundEnabled ? "Mute Engine Audio" : "Enable Futuristic Engine Audio"}
          >
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-zinc-400" />
            )}
            <span className="hidden sm:inline">
              {soundEnabled ? "Audio: Active" : "Audio: Mute"}
            </span>
          </button>

          {/* Reduced Motion Toggle Button */}
          <button
            onClick={onToggleReducedMotion}
            aria-pressed={reducedMotion}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border text-[11px] font-mono-code transition-all cursor-pointer ${
              reducedMotion
                ? "bg-amber-500/15 border-amber-500/40 text-amber-300"
                : "bg-white/5 border-white/10 text-zinc-400 hover:text-zinc-200 hover:bg-white/10"
            }`}
            title={
              reducedMotion
                ? "Reduced Motion is Active"
                : "Toggle Accessible Reduced Motion"
            }
          >
            <Gauge className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">
              {reducedMotion ? "Motion: Calm" : "Motion: Fluid"}
            </span>
          </button>

          {/* Action CTA */}
          <a
            href="#capabilities"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("capabilities");
            }}
            className="group relative inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono-code font-semibold tracking-wider text-black bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-lg shadow-emerald-500/25 transition-all duration-200 cursor-pointer overflow-hidden"
          >
            <span>EXPLORE</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </header>
  );
}
