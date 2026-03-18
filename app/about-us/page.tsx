"use client";

import { useState, useCallback } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import { AboutHero } from "@/components/AboutHero";
import { AboutContent } from "@/components/AboutContent";
import MarketingFooter from "@/components/MarketingFooter";

export default function AboutUsPage() {
  return (
    <main className="bg-[#050505]">
      <AboutHero />
      <AboutContent />
      <MarketingFooter />
    </main>
  );
}
