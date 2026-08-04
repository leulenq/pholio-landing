"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { getConsent, setConsent, onConsentChange } from "@/lib/cookie-consent";
import { PholioButton } from "@/components/PholioButton";

const linkClassName =
  "underline decoration-[#C9A55A]/40 underline-offset-2 transition-colors duration-150 hover:text-[#C9A55A]";

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getConsent()) {
      setVisible(true);
    }
    // Withdrawing consent (the "Cookie preferences" control in the footer or on
    // /cookies) deletes the record and re-raises this banner, so withdrawal is
    // no harder than granting.
    return onConsentChange(() => setVisible(!getConsent()));
  }, []);

  const handleAcceptAll = () => {
    setConsent({ analytics: true });
    setVisible(false);
  };

  const handleNecessaryOnly = () => {
    setConsent({ analytics: false });
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.aside
          role="region"
          aria-label="Cookie consent"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 55, damping: 16 }}
          className="fixed inset-x-0 bottom-0 z-[100] border-t border-[#EDE8DD]"
          style={{
            backgroundColor: "#FAF7F2",
            boxShadow: "0 -12px 40px -20px rgba(15, 23, 42, 0.18)",
            paddingBottom: "max(1rem, env(safe-area-inset-bottom))",
          }}
        >
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-5 py-5 md:flex-row md:items-center md:justify-between md:gap-8 md:px-8 md:py-6">
            <p
              className="max-w-3xl text-sm leading-relaxed md:text-[15px]"
              style={{
                fontFamily: "var(--font-sans)",
                color: "#4B5563",
              }}
            >
              We use cookies to keep Pholio secure, remember your preferences, and
              understand how the platform is used. Read our{" "}
              <Link href="/cookies" className={linkClassName}>
                Cookie Policy
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className={linkClassName}>
                Privacy Policy
              </Link>{" "}
              for details.
            </p>

            <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <PholioButton type="button" variant="primary" onClick={handleAcceptAll}>
                Accept all
              </PholioButton>

              <PholioButton
                type="button"
                variant="secondary"
                onClick={handleNecessaryOnly}
              >
                Necessary only
              </PholioButton>

              {/* Jumps straight to the "Change your choice" control on /cookies,
                  not just the top of the policy page above it. */}
              <Link href="/cookies#preferences" className="pholio-btn pholio-btn--meta">
                Manage
              </Link>
            </div>
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}
