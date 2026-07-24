"use client";

/* ═══════════════════════════════════════════════════════════════════
   /talent — one continuous take.
   Seven scenes, one camera move. The page owns a single interpolated
   background color field; scenes are transparent sticky stages that
   hand an element to the next scene at every boundary.
   Invisible logic: seen → sent → shared → remembered. Never printed.
   ═══════════════════════════════════════════════════════════════════ */

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SCENES } from "./kit";
import SceneArrival from "./SceneArrival";
import SceneCard from "./SceneCard";
import SceneBook from "./SceneBook";
import SceneSend from "./SceneSend";
import SceneSignal from "./SceneSignal";
import SceneAddress from "./SceneAddress";
import SceneWallet from "./SceneWallet";
import SceneClose from "./SceneClose";
import MarketingFooter from "@/components/MarketingFooter";

/* Color stops: each scene holds its field color for most of its span
   (10%→90%), so the morph to the neighbor happens in a tight window
   around the shared boundary — one continuous field, no section seams. */
function buildColorTrack() {
  const total = SCENES.reduce((sum, s) => sum + s.h, 0);
  const stops: number[] = [];
  const colors: string[] = [];
  let cursor = 0;
  for (const s of SCENES) {
    stops.push((cursor + s.h * 0.1) / total, (cursor + s.h * 0.9) / total);
    colors.push(s.bg, s.bg);
    cursor += s.h;
  }
  return { stops, colors };
}

export default function TalentFlowPage() {
  const flowRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: flowRef,
    offset: ["start start", "end end"],
  });
  const { stops, colors } = buildColorTrack();
  const field = useTransform(scrollYProgress, stops, colors);

  return (
    <main>
      <motion.div ref={flowRef} style={{ backgroundColor: field }}>
        <SceneArrival />
        <SceneCard />
        <SceneBook />
        <SceneSend />
        <SceneSignal />
        <SceneAddress />
        <SceneWallet />
        <SceneClose />
      </motion.div>
      <MarketingFooter theme="dark" />
    </main>
  );
}
