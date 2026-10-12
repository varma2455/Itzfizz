import React from "react";
import { ArrowUpRight } from "lucide-react";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative py-32 sm:py-44 px-4 sm:px-6 lg:px-8 bg-[#090a0d] text-white overflow-hidden border-b border-white/[0.08]"
      aria-label="Contact and Inquiries"
    >
      {/* Background Editorial Grid */}
      <div className="absolute inset-0 bg-editorial-grid opacity-50 pointer-events-none" />

      {/* Atmospheric Subtle Center Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-white/[0.02] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col justify-between">
        {/* Section Label */}
        <div className="mb-8 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
          <span className="text-xs font-mono-code uppercase tracking-[0.25em] text-zinc-400 font-semibold">
            04 / INQUIRIES & COLLABORATION
          </span>
        </div>

        {/* Oversized Headline */}
        <div className="max-w-5xl my-4">
          <h2 className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase tracking-tight text-white leading-[0.92]">
            LET&apos;S BUILD
            <br />
            WHAT MOVES
            <br />
            <span className="text-zinc-500 hover:text-white transition-colors duration-300">
              PEOPLE.
            </span>
          </h2>
        </div>

        {/* Restrained Animated Hairline */}
        <div className="my-12 w-full h-[1px] bg-gradient-to-r from-white/30 via-white/10 to-transparent" />

        {/* Supporting Copy & Functional Interaction Link */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end justify-between">
          <div className="md:col-span-7">
            <p className="text-base sm:text-xl text-zinc-400 font-normal leading-relaxed max-w-xl">
              Available for bespoke creative engineering, spatial web experiences,
              and motion design collaborations that demand uncompromising
              attention to detail.
            </p>
          </div>

          <div className="md:col-span-5 flex flex-col sm:flex-row items-start sm:items-center justify-end gap-4">
            <a
              href="mailto:contact@itzfizz.digital?subject=Inquiry:%20Creative%20Motion%20Collaboration"
              className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg bg-white text-black font-mono-code text-xs font-semibold tracking-wider hover:bg-zinc-200 transition-all cursor-pointer shadow-xl shadow-black/80"
              aria-label="Send collaboration inquiry"
            >
              <span>INITIATE DIALOGUE</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
