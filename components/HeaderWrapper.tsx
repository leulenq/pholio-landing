"use client";

import dynamic from "next/dynamic";

import { usePathname } from "next/navigation";

const Header = dynamic(() => import("@/components/Header"), { ssr: false });

export default function HeaderWrapper() {
  const pathname = usePathname();
  
  // Apply the premium dark theme to our cinematic pages
  const isDarkPage =
    pathname === "/" ||
    pathname?.startsWith("/agency") ||
    pathname?.startsWith("/talent") ||
    pathname?.startsWith("/for-talent") ||
    pathname?.startsWith("/press");
  
  return <Header theme={isDarkPage ? "dark" : "light"} />;
}
