"use client";

import dynamic from "next/dynamic";

import { usePathname } from "next/navigation";

const Header = dynamic(() => import("@/components/Header"), { ssr: false });

export default function HeaderWrapper() {
  const pathname = usePathname();

  // Dark pill: near-black / cinematic page shells (#050505, #0A0A0F, home hero stack).
  // Light pill: warm editorial pages (#FAF8F5, #FAF7F2) so the bar matches the paper/cream field.
  const isDarkPage =
    pathname === "/" ||
    pathname?.startsWith("/agency") ||
    pathname?.startsWith("/about-us") ||
    pathname?.startsWith("/contact") ||
    pathname?.startsWith("/careers") ||
    pathname?.startsWith("/studio/plus") ||
    pathname?.startsWith("/studio-plus");

  return <Header theme={isDarkPage ? "dark" : "light"} />;
}
