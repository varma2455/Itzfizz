import React, { useState, useSyncExternalStore } from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CarScrollSection from "@/components/CarScrollSection";
import AgencyIntro from "@/components/AgencyIntro";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import Footer from "@/components/Footer";
import { initEngineAudio, stopEngineAudio } from "@/utils/engineAudio";

// React 19 idiomatic external store subscription for prefers-reduced-motion
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

  // Active motion preference: manual override takes priority over OS preference
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
        <title>ITZFIZZ // Cinematic Scroll-Driven Hero Animation</title>
        <meta
          name="description"
          content="Production-quality scroll-driven automotive hero animation for the Itzfizz Digital creative web engineering internship assignment."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="ITZFIZZ // Scroll-Driven Hero Animation" />
        <meta
          property="og:description"
          content="High-velocity scroll-driven hero experience engineered with Next.js, Tailwind CSS, and GSAP ScrollTrigger."
        />
        <meta property="og:type" content="website" />
      </Head>

      <div className="min-h-screen bg-[#060709] text-zinc-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-200">
        {/* Navigation Bar */}
        <Navbar
          reducedMotion={reducedMotion}
          onToggleReducedMotion={toggleReducedMotion}
          soundEnabled={soundEnabled}
          onToggleSound={toggleSound}
        />

        {/* Main Content Sections */}
        <main className="flex-1 w-full">
          {/* 1. Hero Section */}
          <HeroSection reducedMotion={reducedMotion} />

          {/* 2. Core Scroll-Driven Animation Section */}
          <CarScrollSection reducedMotion={reducedMotion} />

          {/* 3. Agency Intro Section */}
          <AgencyIntro />

          {/* 4. Capabilities Grid */}
          <CapabilitiesSection />
        </main>

        {/* 5. Minimal Footer */}
        <Footer />
      </div>
    </>
  );
}
