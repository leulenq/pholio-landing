"use client";

import { AboutHero } from "./AboutHero";
import { ClosingSection } from "./ClosingSection";
import { ManifestoSection } from "./ManifestoSection";
import { OriginSection } from "./OriginSection";
import { TeamSection } from "./TeamSection";

export function AboutPageContent() {
  return (
    <>
      <AboutHero />
      <OriginSection />
      <ManifestoSection />
      <TeamSection />
      <ClosingSection />
    </>
  );
}
