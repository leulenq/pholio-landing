import type { Metadata, Viewport } from "next";
import { Noto_Serif_Display, Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import HeaderWrapper from "@/components/HeaderWrapper";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import Providers from "@/components/Providers";

/** Edge-to-edge on notched iPhones; theme-color is overridden per-route. */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#050505",
};

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

/* Product-frame voices: the talent app's onboarding/reveal serif and its
   clerical mono. Loaded here so marketing scenes can quote the product
   verbatim (see components/talent-cinema). */
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jbmono",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Pholio — Built for Talent. Trusted by Agencies.",
  description:
    "Built for talent. Trusted by agencies. AI-curated portfolios, verified metrics, and direct agency access — the platform top agencies use to discover verified talent.",
  openGraph: {
    title: "Pholio — Built for Talent. Trusted by Agencies.",
    description:
      "Built for talent. Trusted by agencies. AI-curated portfolios, verified metrics, and direct agency access.",
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
    <html
      lang="en"
      className={`${notoSerif.variable} ${inter.variable} ${playfair.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <Providers>
          <SmoothScroll>
            <CustomCursor />
            <HeaderWrapper />
            {children}
          </SmoothScroll>
        </Providers>
      </body>
    </html>
  );
}
