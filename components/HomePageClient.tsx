"use client";

import { useState, useCallback } from "react";
import Hero from "@/components/hero";
import SceneCompCard from "@/components/comp-card";
import Preloader from "@/components/Preloader";

export default function HomePageClient() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const handlePreloaderComplete = useCallback(() => {
    setPreloaderDone(true);
    if (typeof window !== "undefined") {
      (window as any).__preloaderDone = true;
      window.dispatchEvent(new Event("preloader-done"));
    }
  }, []);

  return (
    <>
      <Preloader onComplete={handlePreloaderComplete} />
      <div
        style={{
          opacity: preloaderDone ? 1 : 0,
          transition: "opacity 0.75s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <Hero ready={preloaderDone} />
        <SceneCompCard />
      </div>
    </>
  );
}
