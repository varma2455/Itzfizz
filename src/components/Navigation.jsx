import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, Gauge, Volume2, VolumeX } from "lucide-react";

export default function Navigation({
  reducedMotion,
  onToggleReducedMotion,
  soundEnabled,
  onToggleSound,
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 40);

      const winHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (winHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (scrollY / winHeight) * 100)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#090a0d]/90 backdrop-blur-md border-b border-white/[0.08] py-3.5"
            : "bg-transparent py-5"
        }`}
      >
        {/* Animated Hairline Scroll Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/[0.04]">
          <div
            className="h-full bg-zinc-300 transition-all duration-75 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Minimal ITZFIZZ Wordmark */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("hero");
            }}
            className="flex items-center gap-2.5 text-white hover:text-zinc-300 transition-colors focus-visible:ring-1 focus-visible:ring-zinc-400"
            aria-label="ITZFIZZ Home"
          >
            <span className="font-display font-bold text-base tracking-[0.2em] uppercase">
              ITZFIZZ
            </span>
            <span className="hidden sm:inline-block text-[10px] font-mono-code text-zinc-400 tracking-widest uppercase">
              / STUDIO
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden md:flex items-center gap-8 text-xs font-mono-code uppercase tracking-widest text-zinc-400"
            aria-label="Main Navigation"
          >
            <button
              onClick={() => scrollToSection("hero")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Experience
            </button>
            <button
              onClick={() => scrollToSection("scroll-scene")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Motion Scene
            </button>
            <button
              onClick={() => scrollToSection("editorial")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Approach
            </button>
            <button
              onClick={() => scrollToSection("capabilities")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Capabilities
            </button>
            <button
              onClick={() => scrollToSection("showcase")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Showcase
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Contact
            </button>
          </nav>

          {/* Right Controls: Motion & Sound toggles + CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Sound Synthesizer Toggle */}
            <button
              onClick={onToggleSound}
              aria-pressed={soundEnabled}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded border text-[11px] font-mono-code transition-colors cursor-pointer ${
                soundEnabled
                  ? "bg-white/10 border-white/30 text-white"
                  : "bg-transparent border-white/10 text-zinc-400 hover:text-zinc-200 hover:border-white/20"
              }`}
              title={soundEnabled ? "Mute engine audio" : "Enable procedural engine audio"}
            >
              {soundEnabled ? (
                <Volume2 className="w-3.5 h-3.5 text-zinc-200" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-zinc-400" />
              )}
              <span className="hidden lg:inline text-[10px]">
                {soundEnabled ? "AUDIO ON" : "AUDIO OFF"}
              </span>
            </button>

            {/* Accessible Reduced Motion Toggle */}
            <button
              onClick={onToggleReducedMotion}
              aria-pressed={reducedMotion}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded border text-[11px] font-mono-code transition-colors cursor-pointer ${
                reducedMotion
                  ? "bg-white/10 border-white/30 text-zinc-200"
                  : "bg-transparent border-white/10 text-zinc-400 hover:text-zinc-200 hover:border-white/20"
              }`}
              title="Toggle accessible motion reduction"
            >
              <Gauge className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[10px]">
                {reducedMotion ? "MOTION: CALM" : "MOTION: FLUID"}
              </span>
            </button>

            {/* Contact Action */}
            <button
              onClick={() => scrollToSection("contact")}
              className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded bg-zinc-100 hover:bg-white text-black text-xs font-mono-code font-medium tracking-wider transition-colors cursor-pointer"
            >
              <span>INQUIRE</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-zinc-400 hover:text-white transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Accessible Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#090a0d]/95 backdrop-blur-xl md:hidden pt-24 px-6 flex flex-col justify-between pb-12">
          <nav className="flex flex-col gap-6 text-base font-display uppercase tracking-widest text-zinc-300">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-left hover:text-white py-2 border-b border-white/5 cursor-pointer"
            >
              01 // Experience
            </button>
            <button
              onClick={() => scrollToSection("scroll-scene")}
              className="text-left hover:text-white py-2 border-b border-white/5 cursor-pointer"
            >
              02 // Motion Scene
            </button>
            <button
              onClick={() => scrollToSection("editorial")}
              className="text-left hover:text-white py-2 border-b border-white/5 cursor-pointer"
            >
              03 // The Approach
            </button>
            <button
              onClick={() => scrollToSection("capabilities")}
              className="text-left hover:text-white py-2 border-b border-white/5 cursor-pointer"
            >
              04 // Capabilities
            </button>
            <button
              onClick={() => scrollToSection("showcase")}
              className="text-left hover:text-white py-2 border-b border-white/5 cursor-pointer"
            >
              05 // Motion Showcase
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-left hover:text-white py-2 border-b border-white/5 cursor-pointer"
            >
              06 // Contact
            </button>
          </nav>

          <div className="pt-6 border-t border-white/10 flex flex-col gap-3 font-mono-code text-xs text-zinc-400">
            <div className="flex items-center justify-between">
              <span>PREFERS REDUCED MOTION:</span>
              <span className="text-white">{reducedMotion ? "ACTIVE" : "OFF"}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>PROCEDURAL AUDIO:</span>
              <span className="text-white">{soundEnabled ? "ACTIVE" : "MUTED"}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
