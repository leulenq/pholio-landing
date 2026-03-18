import type { Metadata } from "next";
import { Noto_Serif_Display, Inter } from "next/font/google";
import "./globals.css";
import HeaderWrapper from "@/components/HeaderWrapper";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";

const notoSerif = Noto_Serif_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pholio — The Industry Standard for Talent Portfolios",
  description:
    "AI-curated portfolios, verified metrics, and direct agency access. The platform top agencies use to discover verified talent.",
  openGraph: {
    title: "Pholio — The Industry Standard for Talent Portfolios",
    description:
      "AI-curated portfolios, verified metrics, and direct agency access.",
    url: "https://www.pholio.studio",
    siteName: "Pholio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${notoSerif.variable} ${inter.variable}`}>
      <body>
        <SmoothScroll>
          <CustomCursor />
          <HeaderWrapper />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
