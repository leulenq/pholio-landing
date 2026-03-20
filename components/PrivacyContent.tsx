"use client";

import { motion } from "framer-motion";

const LAST_UPDATED = "March 19, 2026";
const EFFECTIVE_DATE = "March 19, 2026";
const CONTACT_EMAIL = "privacy@pholio.studio";
const COMPANY_NAME = "Pholio Studio, Inc.";
const COMPANY_ADDRESS = "Pholio Studio, Inc., [Your Address], [City, State, ZIP], United States";

const sections = [
  {
    title: "Who We Are and How to Contact Us",
    content: [
      `${COMPANY_NAME} ("Pholio," "we," "our," or "us") operates the platform accessible at www.pholio.studio and app.pholio.studio (collectively, the "Platform"). We are the data controller responsible for your personal data.`,
      `For all privacy-related questions, requests, or concerns, please contact our Privacy Team at:`,
      `Email: ${CONTACT_EMAIL}`,
      `Mailing address: ${COMPANY_ADDRESS}`,
      `If you are located in the European Economic Area (EEA) or the United Kingdom, you also have the right to lodge a complaint with your local supervisory authority. We encourage you to contact us first so we can address your concern directly.`,
    ],
  },
  {
    title: "Scope of This Policy",
    content: [
      `This Privacy Policy applies to all personal data we collect when you: (a) visit our marketing website at www.pholio.studio; (b) create and use an account on our application at app.pholio.studio; (c) interact with us by email, social media, or any other channel; or (d) apply to or manage talent as an agency partner.`,
      `This Policy does not apply to third-party websites, services, or applications that may be linked from our Platform. We encourage you to review the privacy policies of any third parties before providing them with personal data.`,
      `If you are a talent user ("Talent"), this Policy explains how we handle your portfolio data, images, and professional profile. If you are an agency user ("Agency"), this Policy explains how we handle your roster management and business data. Some sections apply to both user types; where distinctions exist, we note them clearly.`,
    ],
  },
  {
    title: "Data We Collect and Why",
    content: [
      `We collect personal data only when necessary for legitimate business purposes. Below is a full account of the categories of data we collect, the source of that data, and the purpose for which we use it.`,
      `3a. Account and Identity Data\nWhen you register for Pholio, we collect your full name, email address, password (stored as a hashed credential via Firebase Authentication), role (Talent or Agency), and account creation timestamp. We use this data to create and authenticate your account, communicate with you about your account, and maintain platform security. Legal basis (GDPR): Performance of a contract; Legitimate interests (fraud prevention and security).`,
      `3b. Profile and Portfolio Data (Talent)\nTalent users voluntarily provide professional profile information including display name, biography, pronouns, location (city and country), social media handles, physical measurements (height, weight, bust, waist, hip, shoe size, eye color, hair color), and portfolio categories. We also store your selected comp card layout and styling preferences. This data is used to build your public-facing portfolio page, generate PDF comp cards, and help agencies discover and evaluate you. Legal basis (GDPR): Performance of a contract; Consent (for sensitive physical attributes).`,
      `3c. Images and Media\nTalent users upload photographs and other media files to their portfolios. These images are stored on our servers and served publicly via your portfolio URL unless you configure your visibility settings otherwise. We use uploaded images to display your portfolio, generate comp card PDFs, and — with your explicit consent — to process AI-assisted photo curation (see Section 3g). Legal basis (GDPR): Performance of a contract; Consent (for AI analysis).`,
      `3d. Agency and Business Data\nAgency users provide business name, agency description, website URL, logo, and contact details. Agencies may also store internal notes, application statuses, interview schedules, reminder entries, and commission records related to talent they manage. This data is used to operate agency dashboards, manage talent rosters, and facilitate applications between talent and agencies. Legal basis (GDPR): Performance of a contract; Legitimate interests.`,
      `3e. Application and Communication Data\nWhen a Talent applies to an Agency, we record the application submission date, application status (pending, reviewed, accepted, rejected), and any messages exchanged within the platform. This data is visible to both the applying Talent and the receiving Agency. Legal basis (GDPR): Performance of a contract.`,
      `3f. Payment and Subscription Data\nWe use Stripe, Inc. as our payment processor for all subscription billing and transaction management. When you subscribe to a paid plan, Stripe collects and stores your payment card details, billing address, and transaction history directly on their PCI-DSS-compliant infrastructure. We do not store full card numbers or CVV codes on our servers. We receive from Stripe only a tokenized reference, subscription status, plan tier, and billing cycle dates. Stripe's Privacy Policy governs their handling of your payment data: stripe.com/privacy. Legal basis (GDPR): Performance of a contract; Legal obligation (tax and accounting records).`,
      `3g. AI-Assisted Photo Analysis\nWith your explicit consent, we submit portfolio images to Groq, Inc.'s AI inference API for automated photo quality assessment, composition scoring, and curation recommendations. Images sent to Groq are used solely for this analysis and are subject to Groq's data processing terms. We do not sell or share images with Groq for model training purposes. You may withdraw consent for AI analysis at any time in your account settings; doing so will not affect the availability of other features. Legal basis (GDPR): Consent.`,
      `3h. Technical and Device Data\nWhen you access the Platform, we automatically collect your IP address, browser type and version, operating system, device type, referring URL, and page interaction data (clicks, scroll depth, time on page). We use this data to maintain platform security, debug errors, prevent abuse, and improve performance. Legal basis (GDPR): Legitimate interests.`,
      `3i. Analytics and Usage Data\nWe collect aggregated usage statistics such as portfolio page views, unique visitors, geographic distribution of visitors, and application conversion rates. Talent users can view their own analytics in their dashboard. We use this data to help Talent understand their portfolio performance and to improve the Platform. Legal basis (GDPR): Legitimate interests; Performance of a contract.`,
      `3j. Session and Cookie Data\nWe use server-side session cookies to maintain your authenticated state across visits. Session identifiers are stored in our database and associated with your account. We also use strictly necessary cookies required for security and authentication. We do not use third-party advertising cookies or behavioral tracking cookies. See Section 10 (Cookies) for full details. Legal basis (GDPR): Legitimate interests; Legal obligation.`,
      `3k. Communications Data\nIf you contact us by email or through support channels, we retain the content of your communications and your contact details in order to resolve your inquiry and maintain a record for follow-up. Legal basis (GDPR): Legitimate interests.`,
    ],
  },
  {
    title: "Legal Bases for Processing (GDPR)",
    content: [
      `If you are located in the EEA or UK, we rely on the following legal bases under the General Data Protection Regulation (GDPR) and UK GDPR:`,
      `Performance of a Contract (Art. 6(1)(b)): Processing necessary to provide you with the Platform and its features — account creation, portfolio management, agency matching, and subscription management.`,
      `Legitimate Interests (Art. 6(1)(f)): Processing necessary for our legitimate business interests, including platform security, fraud prevention, product improvement, and analytics — where those interests are not overridden by your rights.`,
      `Consent (Art. 6(1)(a)): Processing of AI photo analysis and any optional communications such as marketing emails. You may withdraw consent at any time without affecting the lawfulness of prior processing.`,
      `Legal Obligation (Art. 6(1)(c)): Processing required for compliance with applicable law, such as financial recordkeeping for tax purposes.`,
      `Where we process special categories of data (such as physical measurements, which may indirectly reveal health or ethnic origin information), we rely on your explicit consent (Art. 9(2)(a) GDPR). You may provide such data voluntarily as part of your professional profile; it is not mandatory.`,
    ],
  },
  {
    title: "How We Share Your Data",
    content: [
      `We do not sell your personal data. We share personal data only in the circumstances described below.`,
      `5a. With Other Platform Users\nPublic portfolio pages are visible to anyone who accesses your portfolio URL. Agency users who receive an application from a Talent will see that Talent's profile data, portfolio images, and contact details as part of the application workflow. Agencies manage this data as independent controllers for their own business purposes.`,
      `5b. With Third-Party Service Providers\nWe share data with vendors who process data on our behalf under data processing agreements:`,
      `— Firebase / Google LLC (Authentication and Identity): Manages login, credential verification, and Google OAuth flows. Privacy policy: firebase.google.com/support/privacy`,
      `— Stripe, Inc. (Payment Processing): Processes subscription payments and billing. Privacy policy: stripe.com/privacy`,
      `— Groq, Inc. (AI Inference): Processes portfolio images for photo analysis where consent is given.`,
      `— Neon Technologies (Database Hosting): Hosts the PostgreSQL database in production environments. Data is encrypted at rest and in transit.`,
      `— Netlify, Inc. (Hosting and Functions): Serves the Platform and executes serverless API functions.`,
      `5c. For Legal Compliance and Safety\nWe may disclose personal data if required by law, court order, subpoena, or regulatory authority, or if we believe disclosure is necessary to protect the rights, property, or safety of Pholio, our users, or the public.`,
      `5d. Business Transfers\nIf Pholio undergoes a merger, acquisition, restructuring, or sale of assets, personal data may be transferred as part of that transaction. We will notify affected users via email or prominent notice on the Platform at least 30 days before data becomes subject to a materially different privacy policy.`,
      `5e. Aggregated and De-identified Data\nWe may share aggregated, anonymized, or de-identified data (from which you cannot reasonably be identified) with third parties for research, analytics, or product improvement purposes.`,
    ],
  },
  {
    title: "International Data Transfers",
    content: [
      `Pholio is based in the United States. If you access the Platform from outside the United States, your data may be transferred to, stored in, and processed in the United States or other countries where our service providers operate.`,
      `For users in the EEA, UK, or Switzerland, we implement appropriate safeguards for international transfers in accordance with GDPR Chapter V, including Standard Contractual Clauses (SCCs) approved by the European Commission where applicable. A copy of our transfer mechanisms is available upon request at ${CONTACT_EMAIL}.`,
    ],
  },
  {
    title: "Data Retention",
    content: [
      `We retain personal data only for as long as necessary to fulfill the purposes for which it was collected, comply with legal obligations, resolve disputes, and enforce agreements.`,
      `Account Data: Retained for the duration of your account and for up to 3 years after account deletion, unless a longer retention period is required by law.`,
      `Portfolio Images and Media: Deleted within 30 days of account deletion or upon your request, except where we are required to retain them for legal or dispute-resolution purposes.`,
      `Payment Records: Retained for 7 years in accordance with tax and financial recordkeeping obligations.`,
      `Application Records: Retained for 2 years after the conclusion of an application process.`,
      `Analytics Data: Aggregated analytics may be retained indefinitely as they do not identify individuals. Raw logs containing IP addresses are purged after 90 days.`,
      `Session Data: Active sessions expire after 30 days of inactivity. Expired session records are purged monthly.`,
      `Support Communications: Retained for 3 years from last contact to allow follow-up and resolve recurring issues.`,
      `You may request early deletion of your data at any time (see Section 8, Your Rights).`,
    ],
  },
  {
    title: "Data Security",
    content: [
      `We implement technical and organizational security measures proportionate to the sensitivity of the data we hold. These measures include:`,
      `— Encryption in transit: All data transmitted between your browser and our servers is encrypted using TLS (HTTPS).`,
      `— Encryption at rest: Database records are encrypted at rest on Neon's managed PostgreSQL infrastructure.`,
      `— Authentication security: Passwords are never stored in plaintext. We use Firebase Authentication, which applies bcrypt hashing and enforces secure credential storage.`,
      `— Access controls: Only authorized personnel with a legitimate business need have access to personal data. Access is governed by role-based permissions and logged.`,
      `— Session integrity: Sessions use cryptographically signed, server-stored tokens. Session IDs are rotated on authentication events.`,
      `— Third-party security: Our payment data is handled exclusively by Stripe, a PCI-DSS Level 1 certified payment processor.`,
      `Despite these measures, no system is completely immune to security risks. If you suspect unauthorized access to your account, please contact us immediately at ${CONTACT_EMAIL}. In the event of a data breach that affects your rights and freedoms, we will notify you and relevant authorities in accordance with applicable law (within 72 hours for GDPR-covered incidents).`,
    ],
  },
  {
    title: "Your Privacy Rights",
    content: [
      `Depending on where you reside, you have rights regarding your personal data. We honor these rights for all users regardless of location, to the extent technically feasible.`,
      `Right of Access: You may request a copy of the personal data we hold about you, along with information about how and why we process it.`,
      `Right to Rectification: You may request that we correct inaccurate or incomplete personal data. Most profile data can be updated directly in your account settings.`,
      `Right to Erasure ("Right to Be Forgotten"): You may request deletion of your personal data. We will delete your data subject to applicable retention obligations (e.g., financial records we must keep by law).`,
      `Right to Restriction: You may request that we limit how we process your data, for example while a dispute is being resolved.`,
      `Right to Data Portability: You may request an export of your personal data in a structured, commonly used, machine-readable format (JSON or CSV).`,
      `Right to Object: You may object to processing based on legitimate interests, including profiling. We will cease such processing unless we can demonstrate compelling legitimate grounds.`,
      `Right to Withdraw Consent: Where processing is based on consent (e.g., AI photo analysis, marketing emails), you may withdraw consent at any time without penalty.`,
      `Right to Non-Discrimination (CCPA): California residents have the right not to be discriminated against for exercising their privacy rights. We will not deny services, charge different prices, or provide a lower quality of service based on the exercise of these rights.`,
      `Right to Opt-Out of Sale: We do not sell personal data as defined under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA). No opt-out mechanism is required, but if our practices change, we will update this Policy and provide an opt-out link.`,
      `To exercise any of these rights, submit a request to ${CONTACT_EMAIL} with the subject line "Privacy Rights Request." We will verify your identity before processing the request and respond within 30 days (extendable by an additional 60 days for complex requests, with notice). We do not charge a fee for reasonable requests.`,
    ],
  },
  {
    title: "Cookies and Tracking Technologies",
    content: [
      `We use cookies and similar technologies to operate the Platform. The table below describes the cookies we set.`,
      `Strictly Necessary Cookies: These are required for the Platform to function and cannot be disabled. They include session authentication cookies (to keep you logged in), CSRF protection tokens, and security-related identifiers. Legal basis: Legitimate interests / Legal obligation.`,
      `Preference Cookies: These store your preferences such as display settings and onboarding state, so you do not need to reconfigure them on each visit. Legal basis: Legitimate interests.`,
      `Analytics Cookies (First-Party): We use server-side analytics to track aggregated page views and feature usage. We do not use Google Analytics, Facebook Pixel, or other third-party tracking scripts on the authenticated application. Legal basis: Legitimate interests.`,
      `No Advertising Cookies: We do not use cookies for advertising, retargeting, or cross-site behavioral tracking.`,
      `Cookie Controls: You can control cookies through your browser settings. Disabling strictly necessary cookies will prevent you from logging in or using core Platform features. Disabling preference cookies will cause your preferences to reset on each visit.`,
    ],
  },
  {
    title: "Children's Privacy",
    content: [
      `The Pholio Platform is not directed to children under the age of 16 (or 13 in the United States where COPPA applies). We do not knowingly collect personal data from minors without verifiable parental or guardian consent.`,
      `If you are a parent or guardian and believe your child has created a Pholio account or provided us with personal data without your consent, please contact us immediately at ${CONTACT_EMAIL}. We will investigate and, if confirmed, delete the account and all associated data promptly.`,
      `Talent users who wish to create a portfolio as a minor (e.g., child models) must have a parent or legal guardian complete registration on their behalf and certify their legal authority to do so.`,
    ],
  },
  {
    title: "Changes to This Policy",
    content: [
      `We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or Platform features. When we make material changes, we will:`,
      `(a) Update the "Last Updated" date at the top of this Policy;`,
      `(b) Notify registered users via email at least 14 days before the changes take effect; and`,
      `(c) Display a prominent notice on the Platform for at least 30 days.`,
      `For non-material changes (such as grammatical corrections or clarifications that do not alter the substance of the Policy), we will update the date and publish the revised Policy without separate notification. Your continued use of the Platform after the effective date of a revised Policy constitutes your acceptance of the updated terms.`,
      `We maintain a version history of this Policy, which is available upon request at ${CONTACT_EMAIL}.`,
    ],
  },
  {
    title: "California Privacy Rights (CCPA / CPRA)",
    content: [
      `If you are a California resident, the California Consumer Privacy Act (CCPA), as amended by the California Privacy Rights Act (CPRA), grants you the following rights in addition to those described in Section 8:`,
      `Right to Know: You have the right to request that we disclose the categories and specific pieces of personal information we have collected about you, the categories of sources from which it was collected, the business purpose for collection, and the categories of third parties with whom it was shared.`,
      `Right to Delete: You have the right to request deletion of personal information we have collected from you, subject to certain exceptions (e.g., completing a transaction, security purposes, legal compliance).`,
      `Right to Correct: You have the right to request correction of inaccurate personal information we maintain about you.`,
      `Right to Opt-Out of Sale or Sharing: We do not sell personal information or share it for cross-context behavioral advertising as defined under the CCPA/CPRA.`,
      `Right to Limit Use of Sensitive Personal Information: We use sensitive personal information (such as physical measurements) solely to provide the services you request and do not use it for inferring characteristics or for any purpose beyond service delivery.`,
      `Shine the Light: California Civil Code Section 1798.83 permits California residents to request information about our disclosure of personal data to third parties for direct marketing purposes. We do not disclose personal data to third parties for their own direct marketing purposes.`,
      `To submit a verifiable California consumer request, email ${CONTACT_EMAIL} with "California Privacy Rights Request" in the subject line. We will acknowledge receipt within 10 business days and respond substantively within 45 days (extendable by an additional 45 days with notice).`,
    ],
  },
  {
    title: "EEA and UK Residents — Additional Information",
    content: [
      `If you are located in the European Economic Area or the United Kingdom, the following additional information applies:`,
      `Data Controller: ${COMPANY_NAME} is the data controller for personal data processed through the Platform.`,
      `EU/UK Representative: [If applicable — If you do not have an EU/UK establishment, you should appoint an Art. 27 representative. Placeholder: Our EU/UK representative can be contacted at ${CONTACT_EMAIL} pending formal appointment.]`,
      `Supervisory Authority Complaints: You have the right to lodge a complaint with the supervisory authority in your EU member state or the UK Information Commissioner's Office (ICO) if you believe we have processed your data unlawfully. However, we would appreciate the opportunity to address your concern directly first.`,
      `Automated Decision-Making: We do not make solely automated decisions (including profiling) that produce legal or similarly significant effects on you. AI photo curation is advisory and does not determine your ability to access or remain on the Platform.`,
      `Legitimate Interests Assessment: Where we rely on legitimate interests as a legal basis, we have conducted a balancing test to ensure our interests do not override your fundamental rights and freedoms. Details of these assessments are available upon request.`,
    ],
  },
];

export function PrivacyContent() {
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
            Privacy Policy
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
            This Privacy Policy describes how {COMPANY_NAME} collects, uses, shares, and protects your personal data when you use the Pholio platform. Please read it carefully. By using Pholio, you acknowledge that you have read and understood this Policy.
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
                  const isSubheading =
                    paragraph.includes("\n") ||
                    /^\d+[a-z]\./.test(paragraph) ||
                    /^(Right to|—|Strictly|Preference|Analytics|No Advert|Cookie|Account Data|Portfolio|Payment|Application|Analytics Data|Session|Support|Encryption|Authentication|Access|Session integrity|Third-party|Right of|Right to|Right to Data|Right to Object|Right to Non|Right to Opt|Right to Know|Right to Delete|Right to Correct|Right to Limit|Shine|EU\/UK|Supervisory|Automated|Legitimate|Data Controller)/.test(paragraph);

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

                  if (paragraph.startsWith("(a)") || paragraph.startsWith("(b)") || paragraph.startsWith("(c)")) {
                    return (
                      <div key={j} className="flex gap-3 pl-4">
                        <p className="font-sans text-base text-[#050505]/65 leading-relaxed font-light">
                          {paragraph}
                        </p>
                      </div>
                    );
                  }

                  if (
                    paragraph.startsWith("Email:") ||
                    paragraph.startsWith("Mailing address:")
                  ) {
                    return (
                      <p key={j} className="font-sans text-sm text-[#050505]/50 leading-relaxed pl-4 border-l-2 border-[#C9A55A]/30">
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
          <h3 className="font-editorial text-2xl mb-4">Questions About This Policy?</h3>
          <p className="font-sans text-[#050505]/60 mb-2 leading-relaxed">
            If you have questions, concerns, or requests relating to this Privacy Policy or your personal data, our Privacy Team is here to help.
          </p>
          <p className="font-sans text-[#050505]/60 mb-8">
            We aim to respond to all substantive inquiries within 5 business days.
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
