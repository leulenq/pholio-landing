"use client";

import { CookiesContent } from "@/components/CookiesContent";
import CookiePreferencesButton from "@/components/CookiePreferencesButton";
import MarketingFooter from "@/components/MarketingFooter";

export default function CookiesPage() {
  return (
    <main className="bg-[#FAF7F2]">
      <CookiesContent />

      {/* Both cookie banners send "Manage" here, so the withdrawal control has
          to live on this page — otherwise the link is a dead end. */}
      <section className="mx-auto w-full max-w-3xl px-5 pb-16 md:px-8">
        <div className="border-t border-[#EDE8DD] pt-8">
          <h2
            className="mb-3 text-xl"
            style={{ fontFamily: "var(--font-serif)", color: "#050505" }}
          >
            Change your choice
          </h2>
          <p
            className="mb-5 max-w-2xl text-sm leading-relaxed"
            style={{ fontFamily: "var(--font-sans)", color: "#4B5563" }}
          >
            Your analytics preference is stored in a first-party cookie shared by
            www.pholio.studio and app.pholio.studio, so one choice covers both.
            Clearing it re-opens the consent banner.
          </p>
          <CookiePreferencesButton
            label="Reset cookie preferences"
            className="inline-flex items-center justify-center rounded-full border px-6 py-3 text-[10px] font-bold uppercase tracking-[0.15em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#050505]/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF7F2]"
            style={{
              fontFamily: "var(--font-sans)",
              borderColor: "#050505",
              color: "#050505",
              backgroundColor: "#FFFFFF",
              cursor: "pointer",
            }}
          />
        </div>
      </section>

      <MarketingFooter />
    </main>
  );
}
