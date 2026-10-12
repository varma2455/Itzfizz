import React, { useState, useSyncExternalStore } from "react";
import Head from "next/head";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import CarScrollScene from "@/components/CarScrollScene";
import EditorialSection from "@/components/EditorialSection";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import MotionShowcase from "@/components/MotionShowcase";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { initEngineAudio, stopEngineAudio } from "@/utils/engineAudio";

// React 19 external store subscription for prefers-reduced-motion
function subscribeReducedMotion(callback) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getServerSnapshot() {
  return false;
}

export default function Home() {
  const systemReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getServerSnapshot
  );

  const [manualMotionOverride, setManualMotionOverride] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Active motion preference: manual override takes priority
  const reducedMotion =
    manualMotionOverride !== null ? manualMotionOverride : systemReducedMotion;

  const toggleReducedMotion = () => {
    setManualMotionOverride((prev) => {
      const current = prev !== null ? prev : systemReducedMotion;
      return !current;
    });
  };

  const toggleSound = () => {
    if (!soundEnabled) {
      const ok = initEngineAudio();
      if (ok) setSoundEnabled(true);
    } else {
      stopEngineAudio();
      setSoundEnabled(false);
    }
  };

  return (
    <>
      <Head>
        <title>ITZFIZZ // Immersive Digital Motion Experience</title>
        <meta
          name="description"
          content="Production-quality scroll-driven automotive digital experience engineered for the Itzfizz Digital creative web engineering internship assignment."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="ITZFIZZ // Digital Motion Experience" />
        <meta
          property="og:description"
          content="Bespoke scroll-driven automotive visual experience built with Next.js, Tailwind CSS, and GSAP ScrollTrigger."
        />
        <meta property="og:type" content="website" />
      </Head>

      <div className="min-h-screen bg-[#090a0d] text-zinc-100 flex flex-col selection:bg-white/20 selection:text-white">
        {/* Navigation Bar */}
        <Navigation
          reducedMotion={reducedMotion}
          onToggleReducedMotion={toggleReducedMotion}
          soundEnabled={soundEnabled}
          onToggleSound={toggleSound}
        />

        {/* Main Content Sections */}
        <main className="flex-1 w-full">
          {/* 1. Hero — Full-Viewport Introduction */}
          <HeroSection reducedMotion={reducedMotion} />

          {/* 2. Main Scroll-Driven Car Animation Scene */}
          <CarScrollScene reducedMotion={reducedMotion} />

          {/* 3. Essential Editorial Section Below the Car */}
          <EditorialSection reducedMotion={reducedMotion} />

          {/* 4. Capabilities Section */}
          <CapabilitiesSection reducedMotion={reducedMotion} />

          {/* 5. Interactive Technical Showcase */}
          <MotionShowcase />

          {/* 6. Final Contact Section */}
          <ContactSection />
        </main>

        {/* 7. Polished Minimal Footer */}
        <Footer />
      </div>
    </>
  );
}
