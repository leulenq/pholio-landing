"use client";

import { motion } from "framer-motion";

const LAST_UPDATED = "March 19, 2026";
const EFFECTIVE_DATE = "March 19, 2026";
const CONTACT_EMAIL = "privacy@pholio.studio";
const COMPANY_NAME = "Pholio Studio, Inc.";

const sections = [
  {
    title: "What Are Cookies?",
    content: [
      `Cookies are small text files placed on your device (computer, tablet, or mobile phone) by a website when you visit it. They are widely used to make websites function efficiently, remember your preferences, and provide information to website owners.`,
      `In addition to cookies, we may use similar technologies such as web beacons (also called pixel tags or clear GIFs), local storage (including HTML5 localStorage and sessionStorage), and server-side session identifiers. Throughout this policy, we use the word "cookies" to refer to all such technologies collectively, unless otherwise specified.`,
      `Cookies can be "session cookies," which expire and are automatically deleted when you close your browser, or "persistent cookies," which remain on your device for a defined period or until you delete them. They can also be "first-party cookies," set directly by Pholio, or "third-party cookies," set by another domain (such as an analytics or authentication provider).`,
    ],
  },
  {
    title: "Who Sets Cookies on Pholio?",
    content: [
      `${COMPANY_NAME} ("Pholio," "we," "our," or "us") operates the Platform accessible at www.pholio.studio and app.pholio.studio. We are the primary party responsible for cookies set on our own domains.`,
      `We also integrate certain third-party services that may set their own cookies or use similar technologies when you interact with features powered by those services. These third parties are identified in Section 5 below. Each third party's use of cookies is governed by their own privacy and cookie policies, not ours.`,
      `For questions about our cookie practices, contact our Privacy Team at ${CONTACT_EMAIL}.`,
    ],
  },
  {
    title: "Why We Use Cookies",
    content: [
      `We use cookies for the following purposes:`,
      `— To keep you logged in and maintain your authenticated session securely across page loads and browser tabs;`,
      `— To protect against cross-site request forgery (CSRF) attacks and other security threats;`,
      `— To remember your preferences and settings, such as display configurations and onboarding progress, so you do not need to re-enter them each visit;`,
      `— To understand how users interact with the Platform at an aggregate level, enabling us to improve features, fix bugs, and optimize performance;`,
      `— To ensure the Platform functions correctly on your device and browser; and`,
      `— To comply with legal and security obligations.`,
      `We do NOT use cookies for advertising, retargeting, behavioral profiling, or cross-site tracking. We do not participate in third-party advertising networks or sell data derived from cookie-based tracking.`,
    ],
  },
  {
    title: "Categories of Cookies We Use",
    content: [
      `4a. Strictly Necessary Cookies\nThese cookies are essential for the Platform to function. Without them, core services — including logging in, maintaining your session, and using secure features — cannot be provided. Because they are necessary, they do not require your consent under most applicable laws, though we are transparent about their use here.`,
      `4b. Preference (Functional) Cookies\nThese cookies remember choices you make and personalize your experience. For example, they may store your selected portfolio layout, onboarding step progress, or UI display preferences. They are not strictly required for the Platform to operate, but disabling them means your preferences will reset each visit.`,
      `4c. Analytics Cookies (First-Party)\nWe collect aggregated, anonymized usage data — such as pages visited, features used, and general traffic patterns — using server-side logging and first-party analytics. This data helps us understand platform usage and improve the user experience. We do not use Google Analytics, Mixpanel, or other third-party analytics scripts on the authenticated application.`,
      `4d. Security Cookies\nCertain cookies and server-side tokens are used exclusively for security purposes, including session integrity validation, CSRF token verification, and rate-limit enforcement. These are strictly necessary and cannot be disabled.`,
      `4e. What We Do Not Use\nWe do not use: advertising cookies or pixels (e.g., Meta Pixel, Google Ads tags); cross-site tracking cookies; third-party behavioral profiling tools; or social media tracking widgets that follow you across the web.`,
    ],
  },
  {
    title: "Third-Party Cookies and Services",
    content: [
      `Certain third-party services integrated into the Platform may set their own cookies or use similar technologies. Below is a complete list of third-party services active on the Platform and the technologies they use:`,
      `5a. Firebase Authentication (Google LLC)\nWhen you log in using Google OAuth or email/password, Firebase Authentication sets cookies and tokens to manage your authenticated state. These are strictly necessary for the login flow. Google's privacy policy applies to Firebase: policies.google.com/privacy`,
      `5b. Stripe (Payment Processing)\nIf you access subscription management or checkout pages, Stripe may set cookies to prevent fraud and maintain session state during payment flows. Stripe's cookie use is limited to payment security. Stripe's privacy policy applies: stripe.com/privacy`,
      `5c. No Other Third-Party Tracking\nBeyond Firebase and Stripe (for their specific functional purposes described above), no other third-party scripts, pixels, or tracking technologies are loaded on the authenticated application at app.pholio.studio. The marketing site at www.pholio.studio may be updated from time to time; any additions will be reflected in this policy.`,
    ],
  },
  {
    title: "Specific Cookies Set by Pholio",
    content: [
      `The table below describes the specific cookies we set, their purpose, type, and retention period.`,
      `pholio.session — Purpose: Maintains your authenticated login session. Type: Strictly Necessary / Session. Set by: Pholio (first-party). Retention: 30 days of inactivity, then expires. Deleted on logout.`,
      `pholio.csrf — Purpose: Cross-site request forgery (CSRF) protection token. Verifies that form submissions originate from the Platform. Type: Strictly Necessary / Security. Set by: Pholio (first-party). Retention: Duration of the browser session.`,
      `pholio.prefs — Purpose: Stores non-sensitive UI preferences such as display settings and onboarding progress markers. Type: Preference. Set by: Pholio (first-party). Retention: Up to 1 year.`,
      `pholio.onboarding — Purpose: Records onboarding flow step completion so the wizard resumes from where you left off. Type: Preference / Strictly Necessary. Set by: Pholio (first-party). Retention: Until onboarding is completed or account is deleted.`,
      `__stripe_mid, __stripe_sid — Purpose: Stripe fraud detection and session management during payment flows. Type: Strictly Necessary (payment). Set by: Stripe, Inc. (third-party). Retention: Up to 1 year (stripe_mid); session (stripe_sid).`,
      `Firebase auth tokens — Purpose: Firebase stores authentication tokens in browser localStorage to maintain your Google or email sign-in state. Not a traditional cookie; stored in HTML5 localStorage. Type: Strictly Necessary. Set by: Firebase / Google LLC. Retention: Until logout or token expiry (typically 1 hour for ID tokens; refresh tokens persist until revoked).`,
    ],
  },
  {
    title: "Legal Basis for Cookie Use",
    content: [
      `Under the EU ePrivacy Directive and the General Data Protection Regulation (GDPR), as implemented in EU member state law, we rely on the following legal bases for our cookie use:`,
      `Strictly Necessary: No consent is required for cookies that are essential to provide a service you have explicitly requested. This covers session authentication, CSRF protection, and security cookies.`,
      `Legitimate Interests (Art. 6(1)(f) GDPR): We rely on legitimate interests for first-party analytics and preference cookies, where our interest in improving and personalizing the Platform is balanced against your reasonable expectation of privacy. These do not involve cross-site tracking or behavioral profiling.`,
      `Consent (Art. 6(1)(a) GDPR): Where required by applicable law, we will obtain your consent before placing non-essential cookies. Our current Platform does not use advertising or third-party behavioral tracking cookies that would require consent under the ePrivacy Directive. If this changes, we will update this policy and present a consent mechanism.`,
      `For users in the United Kingdom, the same framework applies under the UK GDPR and the Privacy and Electronic Communications Regulations (PECR).`,
      `For users in California, our cookie use does not constitute "sale" or "sharing" of personal information as defined under the California Consumer Privacy Act (CCPA/CPRA), as we do not share cookie data with third parties for cross-context behavioral advertising.`,
    ],
  },
  {
    title: "How to Control and Manage Cookies",
    content: [
      `You have several options for managing cookies. Please note that restricting certain cookies may affect your ability to use the Platform.`,
      `8a. Browser Settings\nAll modern browsers allow you to view, manage, block, and delete cookies through their settings. The exact steps depend on your browser:`,
      `— Google Chrome: Settings → Privacy and Security → Cookies and other site data`,
      `— Mozilla Firefox: Settings → Privacy & Security → Cookies and Site Data`,
      `— Apple Safari: Preferences → Privacy → Manage Website Data`,
      `— Microsoft Edge: Settings → Cookies and Site Permissions → Cookies and site data`,
      `Blocking all cookies will prevent you from logging in to the Platform. Blocking third-party cookies specifically (a setting available in most browsers) will not materially affect your Pholio experience, as we do not rely on third-party tracking cookies for core functionality.`,
      `8b. Opt-Out of Firebase Analytics\nIf you wish to limit Google's data collection via Firebase, you can use the Google Analytics Opt-Out Browser Add-on (available from Google) or adjust your Google account's data-sharing settings at myaccount.google.com.`,
      `8c. Do Not Track (DNT)\nSome browsers offer a "Do Not Track" (DNT) signal. We respect DNT signals to the extent technically feasible. Because we do not engage in cross-site behavioral tracking, enabling DNT has minimal practical impact on your Pholio experience, but we honor it as a privacy preference.`,
      `8d. Mobile Devices\nOn mobile devices, you can manage cookie preferences through your mobile browser settings, as described above. For native app functionality (if applicable), platform-level privacy controls (iOS Privacy Settings, Android Permission Manager) apply.`,
      `8e. Local Storage\nFirebase authentication tokens stored in HTML5 localStorage can be cleared by clearing your browser's site data (under the same browser settings described in 8a). Clearing localStorage will log you out of the Platform.`,
    ],
  },
  {
    title: "Data Collected via Cookies",
    content: [
      `Cookies and related technologies we use may collect or facilitate collection of the following data:`,
      `— Session identifiers (randomly generated tokens linking your browser to your server-side session);`,
      `— IP address (used for security and rate limiting; stored server-side, not in the cookie itself);`,
      `— Browser type, version, and device type (derived from HTTP headers at the time of the request);`,
      `— Pages visited and features interacted with on the Platform;`,
      `— Timestamps of access events; and`,
      `— Authentication state (logged-in vs. anonymous).`,
      `We do not use cookies to collect financial data, health data, or precise geolocation. All data collected via cookies is processed in accordance with our Privacy Policy (www.pholio.studio/privacy), which describes retention periods, legal bases, your rights, and data sharing practices in full detail.`,
    ],
  },
  {
    title: "Cookies and Children",
    content: [
      `Our Platform is not directed to children under 16 (or 13 in the United States). We do not knowingly use cookies to collect data from minors. If you believe a child has used the Platform without appropriate consent, please contact us at ${CONTACT_EMAIL} and we will investigate promptly.`,
    ],
  },
  {
    title: "Changes to This Cookie Policy",
    content: [
      `We may update this Cookie Policy from time to time to reflect changes in our technology, legal obligations, or cookie practices. When we make material changes, we will update the "Last Updated" date at the top of this document and, where appropriate, notify users via email or a notice on the Platform.`,
      `We encourage you to review this policy periodically. Continued use of the Platform after the updated policy's effective date constitutes your acceptance of the changes.`,
      `A version history of this Cookie Policy is available upon request at ${CONTACT_EMAIL}.`,
    ],
  },
  {
    title: "Contact Us",
    content: [
      `If you have questions, concerns, or requests about our use of cookies or this Cookie Policy, please contact our Privacy Team:`,
      `Email: ${CONTACT_EMAIL}`,
      `We aim to respond to all substantive cookie-related inquiries within 5 business days. If you are located in the EEA or UK and are not satisfied with our response, you have the right to lodge a complaint with your local data protection supervisory authority.`,
    ],
  },
];

export function CookiesContent() {
  return (
    <article className="bg-[#FAF7F2] text-[#050505] min-h-screen pt-40 pb-32 px-6 texture-grain">
      <div className="max-w-3xl mx-auto">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-24 border-b border-[#050505]/10 pb-12"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C9A55A] mb-4 block font-semibold">
            Legal &amp; Compliance
          </span>
          <h1 className="font-editorial text-5xl md:text-7xl mb-6">
            Cookie Policy
          </h1>
          <div className="flex flex-col gap-1 mt-4">
            <p className="text-sm text-[#050505]/40 font-sans tracking-wide">
              Last Updated: {LAST_UPDATED}
            </p>
            <p className="text-sm text-[#050505]/40 font-sans tracking-wide">
              Effective Date: {EFFECTIVE_DATE}
            </p>
          </div>
          <p className="mt-6 text-base text-[#050505]/60 font-sans leading-relaxed font-light max-w-2xl">
            This Cookie Policy explains what cookies are, which cookies and similar technologies {COMPANY_NAME} uses on the Pholio platform, why we use them, and how you can control them. For broader information about how we handle your personal data, please read our{" "}
            <a
              href="/privacy"
              className="text-[#C9A55A] hover:underline underline-offset-4 transition-all"
            >
              Privacy Policy
            </a>
            .
          </p>
        </motion.header>

        {/* Table of Contents */}
        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20 p-8 border border-[#050505]/10 rounded-2xl bg-white/40 backdrop-blur-sm"
        >
          <h2 className="font-editorial text-xl mb-5 text-[#050505]/80">Table of Contents</h2>
          <ol className="space-y-2">
            {sections.map((section, i) => (
              <li key={section.title}>
                <a
                  href={`#section-${i + 1}`}
                  className="font-sans text-sm text-[#050505]/60 hover:text-[#C9A55A] transition-colors duration-200 flex items-baseline gap-3"
                >
                  <span className="text-[#C9A55A] font-semibold tabular-nums w-5 shrink-0">{i + 1}.</span>
                  <span>{section.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </motion.nav>

        <div className="space-y-20">
          {sections.map((section, i) => (
            <motion.section
              key={section.title}
              id={`section-${i + 1}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="group scroll-mt-28"
            >
              <h2 className="font-editorial text-2xl md:text-3xl mb-6 text-[#050505]/90 group-hover:text-[#C9A55A] transition-colors duration-300">
                {i + 1}. {section.title}
              </h2>
              <div className="space-y-4">
                {section.content.map((paragraph, j) => {
                  if (paragraph.includes("\n")) {
                    const [heading, ...rest] = paragraph.split("\n");
                    return (
                      <div key={j} className="space-y-1.5">
                        <p className="font-sans text-base font-semibold text-[#050505]/80">
                          {heading}
                        </p>
                        <p className="font-sans text-base text-[#050505]/65 leading-relaxed font-light">
                          {rest.join(" ")}
                        </p>
                      </div>
                    );
                  }

                  if (paragraph.startsWith("—")) {
                    return (
                      <div key={j} className="flex gap-3 pl-4">
                        <span className="text-[#C9A55A] shrink-0 mt-0.5">—</span>
                        <p className="font-sans text-base text-[#050505]/65 leading-relaxed font-light">
                          {paragraph.slice(2)}
                        </p>
                      </div>
                    );
                  }

                  // Cookie table rows: "cookieName — Purpose: ..."
                  if (/^(pholio\.|__stripe_|Firebase)/.test(paragraph)) {
                    const [name, ...rest] = paragraph.split(" — ");
                    return (
                      <div
                        key={j}
                        className="rounded-xl border border-[#050505]/[0.07] bg-white/50 p-4 space-y-1"
                      >
                        <p className="font-sans text-sm font-semibold text-[#050505]/80 font-mono">
                          {name}
                        </p>
                        <p className="font-sans text-sm text-[#050505]/55 leading-relaxed">
                          {rest.join(" — ")}
                        </p>
                      </div>
                    );
                  }

                  if (
                    paragraph.startsWith("Email:") ||
                    paragraph.startsWith("Mailing address:")
                  ) {
                    return (
                      <p
                        key={j}
                        className="font-sans text-sm text-[#050505]/50 leading-relaxed pl-4 border-l-2 border-[#C9A55A]/30"
                      >
                        {paragraph}
                      </p>
                    );
                  }

                  return (
                    <p
                      key={j}
                      className="font-sans text-base text-[#050505]/65 leading-relaxed font-light"
                    >
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            </motion.section>
          ))}
        </div>

        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-32 pt-12 border-t border-[#050505]/10"
        >
          <h3 className="font-editorial text-2xl mb-4">Questions About Cookies?</h3>
          <p className="font-sans text-[#050505]/60 mb-8 leading-relaxed">
            Our Privacy Team is happy to help with any questions about our cookie practices. We aim to respond to all inquiries within 5 business days.
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-editorial text-2xl text-[#C9A55A] hover:underline transition-all underline-offset-8"
          >
            {CONTACT_EMAIL}
          </a>
          <p className="mt-12 text-xs text-[#050505]/30 font-sans">
            © {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved. This document does not constitute legal advice. Consult qualified legal counsel for advice specific to your circumstances.
          </p>
        </motion.footer>
      </div>
    </article>
  );
}
