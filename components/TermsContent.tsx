"use client";

import { motion } from "framer-motion";

const LAST_UPDATED = "March 19, 2026";
const EFFECTIVE_DATE = "March 19, 2026";
const CONTACT_EMAIL = "legal@pholio.studio";
const COMPANY_NAME = "Pholio Studio, Inc.";
const COMPANY_ADDRESS = "Pholio Studio, Inc., [Your Address], [City, State, ZIP], United States";
const GOVERNING_LAW_STATE = "Delaware";
const ARBITRATION_SEAT = "Delaware";

const sections = [
  {
    title: "Acceptance of Terms",
    content: [
      `These Terms and Conditions ("Terms") constitute a legally binding agreement between you ("User," "you," or "your") and ${COMPANY_NAME} ("Pholio," "we," "our," or "us") governing your access to and use of the Pholio platform, including the marketing site at www.pholio.studio, the application at app.pholio.studio, and all associated services, features, APIs, and content (collectively, the "Platform").`,
      `BY CREATING AN ACCOUNT, CLICKING "I AGREE," OR OTHERWISE ACCESSING OR USING THE PLATFORM, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY THESE TERMS AND OUR PRIVACY POLICY (www.pholio.studio/privacy), WHICH IS INCORPORATED INTO THESE TERMS BY REFERENCE. IF YOU DO NOT AGREE, DO NOT ACCESS OR USE THE PLATFORM.`,
      `If you are entering into these Terms on behalf of a company, agency, or other legal entity, you represent that you have authority to bind that entity. In that case, "you" refers to both you individually and that entity. If you lack such authority, you must not accept these Terms or use the Platform.`,
    ],
  },
  {
    title: "Changes to Terms",
    content: [
      `We reserve the right to modify these Terms at any time at our sole discretion. When we make material changes, we will:`,
      `(a) Update the "Last Updated" date at the top of this document;`,
      `(b) Notify registered users via email at least 14 days before the changes take effect; and`,
      `(c) Display a prominent notice on the Platform for at least 30 days.`,
      `Non-material changes (such as clarifications, grammatical corrections, or changes required by law) take effect immediately upon posting. Your continued use of the Platform after the effective date of any updated Terms constitutes your binding acceptance. If you do not agree to the updated Terms, you must stop using the Platform and may cancel your account.`,
      `We maintain a version history of these Terms, which is available upon request at ${CONTACT_EMAIL}.`,
    ],
  },
  {
    title: "Eligibility and Account Registration",
    content: [
      `3a. Age Requirements\nYou must be at least 16 years old (or 13 if you reside in the United States, subject to COPPA requirements and parental consent) to create an account on the Platform. Talent users who are minors must have a parent or legal guardian register on their behalf and certify their legal authority to do so. We may require age verification at any time. If we discover that a user is under the minimum age, we will terminate their account immediately.`,
      `3b. Account Accuracy\nWhen registering, you must provide accurate, current, and complete information. You are responsible for keeping your account information up to date. Providing false or misleading information is grounds for immediate account termination.`,
      `3c. Account Security\nYou are solely responsible for maintaining the confidentiality of your login credentials and for all activity that occurs under your account. You must notify us immediately at ${CONTACT_EMAIL} if you suspect unauthorized access. We are not liable for any loss or damage arising from your failure to safeguard your credentials. We recommend using a strong, unique password and enabling any available two-factor authentication features.`,
      `3d. One Account Per User\nEach individual may hold one account. Agencies may hold one organization account but may designate multiple authorized team members. Creating duplicate or fraudulent accounts is prohibited and may result in all associated accounts being terminated.`,
      `3e. User Roles\nThe Platform distinguishes between two primary user types: Talent users (individual models, creatives, and performers managing personal portfolios) and Agency users (talent management agencies and scout organizations managing rosters of Talent). Certain features, capabilities, and obligations differ between these roles as described throughout these Terms.`,
    ],
  },
  {
    title: "Platform Description and License",
    content: [
      `4a. Platform Services\nPholio is a talent portfolio and agency management platform that enables: (i) Talent to create, maintain, and publish professional portfolios; generate PDF comp cards; track portfolio analytics; and apply to Agencies; and (ii) Agencies to manage talent rosters, review applications, conduct interview scheduling, set reminders, and track commission arrangements.`,
      `4b. Limited License\nSubject to your compliance with these Terms, Pholio grants you a limited, non-exclusive, non-transferable, revocable license to access and use the Platform for your internal business or personal professional purposes. This license does not include any right to: (i) sublicense, sell, resell, or commercially exploit the Platform; (ii) copy, modify, distribute, or create derivative works of any part of the Platform (except as expressly permitted by these Terms); (iii) reverse engineer, decompile, or disassemble any software component of the Platform; or (iv) use automated scripts, bots, or scrapers to access the Platform without our prior written consent.`,
      `4c. Platform Availability\nWe strive to maintain high availability but do not guarantee uninterrupted or error-free access. We may suspend, modify, or discontinue any feature or the entire Platform at any time with reasonable notice, except in cases of emergency or legal obligation. We are not liable for any losses arising from downtime, feature removal, or service interruptions.`,
      `4d. Beta Features\nWe may offer pre-release or beta features. These are provided "as-is" without warranty and may be changed or removed at any time. Your participation in beta features is voluntary.`,
    ],
  },
  {
    title: "Subscription Plans and Payment Terms",
    content: [
      `5a. Subscription Tiers\nPholio offers free and paid subscription plans. The features available at each tier are described on our Pricing page and may change from time to time. Paid plans are billed on a recurring basis (monthly or annually, as selected at checkout).`,
      `5b. Payment Processing\nAll payments are processed by Stripe, Inc., a PCI-DSS Level 1 certified payment processor. By providing payment details, you authorize Stripe to charge your designated payment method on a recurring basis in accordance with your chosen plan. You must provide valid, current payment information. We do not store full payment card numbers on our servers; all payment data is managed by Stripe under their terms (stripe.com/legal).`,
      `5c. Recurring Billing and Cancellation\nYour subscription will automatically renew at the end of each billing cycle unless you cancel before the renewal date. Cancellations take effect at the end of the current paid period; you will not be charged for the next cycle but will retain access until the period ends. To cancel, use the account settings page or contact ${CONTACT_EMAIL}. We do not offer prorated refunds for mid-cycle cancellations, except as required by law.`,
      `5d. Free Trials\nIf we offer a free trial, it begins on the date you enroll and ends on the date specified. If you do not cancel before the trial ends, you will be automatically charged the applicable subscription fee. One free trial per person.`,
      `5e. Price Changes\nWe may change subscription prices with at least 30 days' notice to existing subscribers via email. If you do not agree to a price change, you may cancel before the new price takes effect.`,
      `5f. Taxes\nPrices displayed exclude applicable taxes (VAT, GST, sales tax). Tax charges are calculated based on your billing address and applicable law. You are responsible for all taxes associated with your use of the Platform.`,
      `5g. Failed Payments\nIf a payment fails, we may retry the charge, suspend your account, or downgrade your access to a free tier until payment is successfully collected. Accounts with overdue balances for more than 30 days may be terminated.`,
      `5h. Refunds\nAll sales are final except where required by applicable law. If you believe a charge is erroneous, contact ${CONTACT_EMAIL} within 14 days of the charge. We will investigate and, if an error is confirmed, issue a refund or credit at our discretion.`,
    ],
  },
  {
    title: "User Content and Intellectual Property",
    content: [
      `6a. Your Content\n"User Content" means any data, text, images, photos, videos, bios, measurements, or other material you upload, submit, or transmit through the Platform. You retain full ownership of your User Content.`,
      `6b. License Grant to Pholio\nBy uploading User Content to the Platform, you grant Pholio a worldwide, non-exclusive, royalty-free, sublicensable (solely to our service providers), and transferable license to use, store, reproduce, process, display, distribute, and create derivative works of your User Content solely to: (i) operate and provide the Platform and its features; (ii) generate PDF comp cards and portfolio pages on your behalf; (iii) process AI-assisted photo analysis where you have provided consent; (iv) display your portfolio to Agencies or the public consistent with your visibility settings; and (v) comply with legal obligations. This license terminates when you delete your account or remove the relevant content, subject to reasonable caching and backup retention periods.`,
      `6c. Agency Viewing Rights\nWhen a Talent submits an application to an Agency, the Agency receives a limited, non-exclusive right to view, print, and internally share the Talent's portfolio and profile data solely for the purpose of evaluating the application. Agencies may not use Talent User Content for any other purpose, including advertising, without the Talent's separate written consent.`,
      `6d. Pholio's Intellectual Property\nThe Platform, including all software, algorithms, designs, graphics, logos, trade names, text, documentation, and all other materials (excluding User Content), is owned by Pholio or its licensors and is protected by copyright, trademark, patent, and other intellectual property laws. Nothing in these Terms transfers any ownership of Pholio's intellectual property to you. The Pholio name, logo, and product names are trademarks of ${COMPANY_NAME}. You may not use our trademarks without our prior written consent.`,
      `6e. Feedback\nIf you provide us with suggestions, ideas, or other feedback about the Platform ("Feedback"), you grant us an irrevocable, worldwide, royalty-free license to use, incorporate, and commercialize such Feedback without restriction or compensation to you. You acknowledge that we may already be working on similar improvements independently.`,
      `6f. DMCA / Copyright Infringement\nWe respect intellectual property rights and expect users to do the same. If you believe content on the Platform infringes your copyright, please submit a takedown notice to ${CONTACT_EMAIL} with: (i) your contact information; (ii) identification of the copyrighted work; (iii) identification of the allegedly infringing material and its location on the Platform; (iv) a statement of good-faith belief; and (v) a statement of accuracy and authority, signed under penalty of perjury.`,
    ],
  },
  {
    title: "Talent User Obligations",
    content: [
      `7a. Accuracy of Profile Data\nTalent users represent and warrant that all information submitted to their profile — including physical measurements, portfolio categories, location, and contact details — is accurate, truthful, and not misleading. Pholio is not responsible for inaccurate representations made by Talent users to Agencies.`,
      `7b. Image Ownership and Consent\nBy uploading photographs to your portfolio, you represent and warrant that: (i) you own or have all necessary rights, licenses, and consents to upload and display those images on the Platform; (ii) the images do not infringe any third party's intellectual property, privacy, publicity, or moral rights; and (iii) you have obtained written releases from any photographers, stylists, or other rights holders as required by applicable law.`,
      `7c. No Explicit or Harmful Content\nYou may not upload images or content that are sexually explicit, obscene, defamatory, harassing, violent, or otherwise objectionable. We reserve the right to remove any content that violates this provision and to terminate accounts of repeat violators.`,
      `7d. Direct Bookings and Commissions\nIf an Agency discovers your portfolio on Pholio and you subsequently enter into a booking or representation agreement with that Agency, you acknowledge that you may be subject to commission arrangements governed by that Agency's standard terms. Pholio is not a party to any direct agreements between Talent and Agencies and does not facilitate, guarantee, or take responsibility for commissions, bookings, or payment disputes between them.`,
      `7e. AI Feature Consent\nIf you enable AI-assisted photo analysis, you consent to the transmission of selected portfolio images to Groq, Inc.'s inference API for automated quality assessment and curation recommendations. AI analysis results are advisory only; they do not affect your standing on the Platform. You may withdraw this consent at any time in your account settings.`,
    ],
  },
  {
    title: "Agency User Obligations",
    content: [
      `8a. Authorized Use of Talent Data\nAgency users receive access to Talent profile data and portfolios solely for the purpose of evaluating talent for representation or booking. Agencies may not: (i) resell or share Talent data with unauthorized third parties; (ii) use Talent contact details for unsolicited mass communications; (iii) download, scrape, or aggregate Talent portfolios beyond what is reasonably necessary for internal evaluation; or (iv) use Talent data in any manner inconsistent with these Terms or applicable data protection law.`,
      `8b. Commission Records\nThe Platform may allow Agencies to record commission rates and earnings for talent they manage. These records are maintained for Agency internal reference only. Pholio does not enforce, validate, or participate in commission agreements between Agencies and Talent. You are responsible for ensuring your commission records comply with applicable labor, tax, and entertainment industry laws.`,
      `8c. Application Handling\nAgencies must handle received applications in good faith and in a timely manner. Agencies may not accept applications with no genuine intention of evaluation, nor use the application process to collect Talent data for purposes unrelated to talent representation.`,
      `8d. Legitimate Agency Operations\nBy registering as an Agency, you represent that you are a legitimate talent management, modeling, casting, or entertainment agency operating in compliance with all applicable laws in your jurisdiction, including any licensing requirements for talent agents or managers.`,
    ],
  },
  {
    title: "Prohibited Conduct",
    content: [
      `You agree not to engage in any of the following activities while using the Platform:`,
      `— Using the Platform for any unlawful purpose or in violation of any applicable local, state, national, or international law or regulation;`,
      `— Impersonating any person or entity, or falsely stating or misrepresenting your identity, affiliation, or credentials;`,
      `— Uploading, posting, or transmitting content that infringes any intellectual property right, violates any privacy right, or constitutes defamation, harassment, or hate speech;`,
      `— Uploading malware, viruses, trojans, spyware, or any other malicious code or files designed to disrupt, damage, or gain unauthorized access to any system;`,
      `— Using automated tools, bots, crawlers, or scrapers to access the Platform or extract data without our express written permission;`,
      `— Attempting to gain unauthorized access to any accounts, systems, or networks connected to the Platform through hacking, password mining, or any other means;`,
      `— Interfering with or disrupting the integrity or performance of the Platform or the data contained therein;`,
      `— Circumventing any technical measures we use to restrict access to certain areas of the Platform;`,
      `— Collecting or harvesting any personally identifiable information from the Platform without consent;`,
      `— Using the Platform to send spam, unsolicited commercial communications, or pyramid schemes;`,
      `— Engaging in any conduct that restricts or inhibits any other user from using or enjoying the Platform;`,
      `— Using the Platform to engage in or facilitate human trafficking, exploitation, or any form of abuse;`,
      `— Commercially reselling, leasing, or sublicensing access to the Platform without our prior written consent.`,
      `We reserve the right to investigate any suspected violation of the above and to take appropriate action, including account suspension or termination, content removal, and referral to law enforcement where warranted.`,
    ],
  },
  {
    title: "AI-Assisted Features",
    content: [
      `10a. Nature of AI Features\nThe Platform includes optional AI-powered features, including automated photo quality assessment and portfolio curation recommendations, processed via third-party AI inference services. These features are designed to assist you in presenting your portfolio effectively. All AI-generated recommendations are advisory only and do not constitute editorial judgments, professional opinions, or legally binding evaluations.`,
      `10b. No Guarantee of Accuracy\nAI systems can produce inaccurate, biased, or unexpected outputs. We make no representations or warranties regarding the accuracy, completeness, or suitability of any AI-generated content or recommendations. You should use your own judgment when acting on any AI output.`,
      `10c. Opt-In Consent Required\nAI-assisted photo analysis is an opt-in feature only. We will not process your images through AI systems without your explicit consent. You may withdraw consent at any time through your account settings; withdrawal will stop future AI processing but does not affect prior analysis.`,
      `10d. No Discriminatory Use\nNeither Pholio nor its AI features use personal characteristics such as race, ethnicity, national origin, religion, disability, age, sex, or sexual orientation as a basis for any platform decisions, including portfolio ranking, discoverability, or application outcomes.`,
    ],
  },
  {
    title: "Third-Party Services and Links",
    content: [
      `The Platform integrates with third-party services to provide core functionality. By using the Platform, you agree to be bound by the terms and privacy policies of these services where applicable:`,
      `— Firebase / Google LLC: Authentication and identity management. Your use of Google sign-in is subject to Google's Terms of Service and Privacy Policy.`,
      `— Stripe, Inc.: Payment processing. Your financial transactions are governed by Stripe's Terms of Service and Privacy Policy.`,
      `— Groq, Inc.: AI inference for photo analysis (where consent is given). Subject to Groq's Terms of Service.`,
      `— Neon Technologies: PostgreSQL database hosting in production environments.`,
      `— Netlify, Inc.: Platform hosting and serverless function execution.`,
      `The Platform may also contain links to third-party websites, resources, or services that we do not own or control. We are not responsible for the content, privacy practices, or terms of any third-party services. Accessing third-party links is at your own risk. We encourage you to review the terms and policies of any third party before using their services.`,
    ],
  },
  {
    title: "Disclaimers of Warranties",
    content: [
      `TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, THE PLATFORM AND ALL CONTENT, FEATURES, AND SERVICES PROVIDED THROUGH IT ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.`,
      `PHOLIO EXPRESSLY DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO: IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT; WARRANTIES ARISING FROM COURSE OF DEALING, USAGE, OR TRADE PRACTICE; AND ANY WARRANTY THAT THE PLATFORM WILL BE UNINTERRUPTED, ERROR-FREE, SECURE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.`,
      `PHOLIO DOES NOT WARRANT THAT: (A) THE PLATFORM WILL MEET YOUR REQUIREMENTS OR EXPECTATIONS; (B) ANY ERRORS OR DEFECTS WILL BE CORRECTED; (C) THE PLATFORM IS FREE FROM UNAUTHORIZED ACCESS OR MANIPULATION BY THIRD PARTIES; OR (D) ANY PARTICULAR RESULT OR OUTCOME WILL BE ACHIEVED FROM YOUR USE OF THE PLATFORM, INCLUDING BUT NOT LIMITED TO AGENCY REPRESENTATION, BOOKINGS, EMPLOYMENT, OR INCOME.`,
      `PHOLIO IS NOT AN EMPLOYMENT AGENCY, TALENT AGENT, OR STAFFING COMPANY. WE MAKE NO REPRESENTATIONS REGARDING THE QUALITY, LEGITIMACY, OR INTENTIONS OF ANY AGENCY USER ON THE PLATFORM. YOU ARE SOLELY RESPONSIBLE FOR EVALUATING ANY AGENCY OR TALENT WITH WHOM YOU CHOOSE TO ENGAGE.`,
    ],
  },
  {
    title: "Limitation of Liability",
    content: [
      `TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL PHOLIO, ITS AFFILIATES, DIRECTORS, OFFICERS, EMPLOYEES, AGENTS, LICENSORS, OR SERVICE PROVIDERS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF REVENUE, LOSS OF PROFITS, LOSS OF DATA, LOSS OF GOODWILL, LOSS OF BUSINESS OPPORTUNITIES, COST OF SUBSTITUTE GOODS OR SERVICES, OR ANY OTHER INTANGIBLE LOSSES, ARISING FROM OR RELATED TO YOUR ACCESS TO OR USE OF (OR INABILITY TO ACCESS OR USE) THE PLATFORM, EVEN IF PHOLIO HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.`,
      `NOTWITHSTANDING ANYTHING TO THE CONTRARY, PHOLIO'S TOTAL CUMULATIVE LIABILITY TO YOU ARISING FROM OR RELATED TO THESE TERMS OR YOUR USE OF THE PLATFORM, REGARDLESS OF THE FORM OF THE ACTION OR THE BASIS OF THE CLAIM, SHALL NOT EXCEED THE GREATER OF: (A) THE TOTAL AMOUNTS YOU PAID TO PHOLIO IN THE TWELVE (12) MONTHS IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO LIABILITY; OR (B) ONE HUNDRED US DOLLARS ($100.00).`,
      `THE LIMITATIONS IN THIS SECTION SHALL APPLY REGARDLESS OF THE THEORY OF LIABILITY — WHETHER CONTRACT, TORT (INCLUDING NEGLIGENCE), STATUTE, OR OTHERWISE — AND REGARDLESS OF WHETHER PHOLIO HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.`,
      `SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO SOME OF THE ABOVE LIMITATIONS MAY NOT APPLY TO YOU. IN SUCH JURISDICTIONS, OUR LIABILITY IS LIMITED TO THE MAXIMUM EXTENT PERMITTED BY LAW.`,
    ],
  },
  {
    title: "Indemnification",
    content: [
      `To the fullest extent permitted by applicable law, you agree to defend, indemnify, and hold harmless ${COMPANY_NAME}, its affiliates, subsidiaries, officers, directors, employees, agents, licensors, and service providers from and against any and all claims, demands, actions, damages, losses, costs, and expenses (including reasonable attorneys' fees) arising from or relating to:`,
      `(a) your use of or inability to use the Platform;`,
      `(b) your User Content, including any claim that your content infringes the intellectual property, privacy, or other rights of any third party;`,
      `(c) your breach of these Terms, any representation or warranty made by you, or any applicable law or regulation;`,
      `(d) your interactions with other users of the Platform, including any dispute with an Agency or Talent;`,
      `(e) any misrepresentation you make regarding your identity, credentials, or authorization; or`,
      `(f) your willful misconduct or fraud.`,
      `We reserve the right, at your expense, to assume exclusive defense and control of any matter subject to indemnification. You agree to cooperate with our defense of such claims and not to settle any such claim without our prior written consent.`,
    ],
  },
  {
    title: "Term and Termination",
    content: [
      `15a. Term\nThese Terms are effective from the date you first access the Platform and continue until terminated by either you or Pholio.`,
      `15b. Termination by You\nYou may terminate these Terms at any time by deleting your account through the account settings page. Termination does not entitle you to a refund of any pre-paid subscription fees, except as required by applicable law.`,
      `15c. Termination by Pholio\nWe may suspend or terminate your account and access to the Platform immediately and without prior notice if we determine, in our sole discretion, that you have: (i) violated these Terms; (ii) provided false or fraudulent information; (iii) engaged in conduct harmful to other users, third parties, or our business interests; (iv) failed to pay amounts due after reasonable notice; or (v) violated applicable law.`,
      `15d. Effects of Termination\nUpon termination of your account: (i) your license to use the Platform immediately ceases; (ii) we may delete your account data in accordance with our Privacy Policy and data retention practices; (iii) provisions of these Terms that by their nature should survive termination will survive, including Sections 6 (Intellectual Property), 9 (Prohibited Conduct), 12 (Disclaimers), 13 (Limitation of Liability), 14 (Indemnification), 16 (Dispute Resolution), and 17 (Governing Law).`,
      `15e. Data Access After Termination\nUpon account termination, you may request an export of your User Content within 30 days of termination. After this period, we are not obligated to retain or provide your data, subject to legal retention obligations.`,
    ],
  },
  {
    title: "Dispute Resolution and Arbitration",
    content: [
      `PLEASE READ THIS SECTION CAREFULLY. IT AFFECTS YOUR LEGAL RIGHTS, INCLUDING YOUR RIGHT TO FILE A LAWSUIT IN COURT AND YOUR RIGHT TO A JURY TRIAL.`,
      `16a. Informal Resolution First\nBefore initiating any formal legal proceeding, you agree to contact us at ${CONTACT_EMAIL} with a written description of your dispute and the resolution you seek. We agree to use good-faith efforts to resolve the dispute informally within 30 days of receiving your notice. This informal resolution period is a prerequisite to arbitration or any other formal proceeding.`,
      `16b. Binding Arbitration\nIf informal resolution fails, you and Pholio agree that any dispute, claim, or controversy arising from or relating to these Terms or the Platform (including the validity, enforceability, or scope of this arbitration clause) will be resolved through final, binding arbitration administered by the American Arbitration Association (AAA) under its Consumer Arbitration Rules. The arbitration will be conducted in English in ${ARBITRATION_SEAT} unless you and Pholio agree otherwise. The arbitrator's award shall be final and binding and may be entered as a judgment in any court of competent jurisdiction.`,
      `16c. Class Action Waiver\nTO THE FULLEST EXTENT PERMITTED BY LAW, YOU AND PHOLIO AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS, COLLECTIVE, REPRESENTATIVE, OR MULTI-PLAINTIFF ACTION OR PROCEEDING. No arbitrator shall have authority to consolidate claims or preside over any class or representative proceeding without the consent of both parties.`,
      `16d. Exceptions to Arbitration\nNotwithstanding the above, either party may seek injunctive or other equitable relief in a court of competent jurisdiction for matters involving: (i) actual or threatened infringement, misappropriation, or violation of intellectual property rights; or (ii) unauthorized access to the Platform or user accounts. Small claims court actions within applicable jurisdictional limits are also exempt.`,
      `16e. Opt-Out Right\nYou may opt out of the arbitration agreement within 30 days of first accepting these Terms by sending a written opt-out notice to ${CONTACT_EMAIL} with "Arbitration Opt-Out" in the subject line. If you opt out, disputes will be resolved in the courts specified in Section 17.`,
      `16f. EU/UK Users\nNothing in this Section limits your right as an EU or UK consumer to bring a claim before the courts of your country of residence or to use applicable out-of-court dispute resolution mechanisms provided by EU or UK law.`,
    ],
  },
  {
    title: "Governing Law and Jurisdiction",
    content: [
      `These Terms and any dispute arising from them are governed by and construed in accordance with the laws of the State of ${GOVERNING_LAW_STATE}, United States, without regard to its conflict of law principles.`,
      `For any dispute not subject to arbitration under Section 16, you consent to the exclusive personal jurisdiction and venue of the state and federal courts located in ${GOVERNING_LAW_STATE}, and you waive any objection to such jurisdiction or venue on grounds of inconvenient forum or otherwise.`,
      `If you are a consumer based in the EEA or UK, mandatory consumer protection laws in your country of residence may apply and take precedence over this governing law clause to the extent required by applicable law. You may also be entitled to bring proceedings in your local courts.`,
    ],
  },
  {
    title: "General Provisions",
    content: [
      `18a. Entire Agreement\nThese Terms, together with the Privacy Policy and any other legal notices or policies published by Pholio on the Platform, constitute the entire agreement between you and Pholio regarding your use of the Platform and supersede all prior agreements, understandings, and representations.`,
      `18b. Severability\nIf any provision of these Terms is held invalid, illegal, or unenforceable by a court of competent jurisdiction, that provision will be modified to the minimum extent necessary to make it enforceable, and the remaining provisions will continue in full force and effect.`,
      `18c. Waiver\nOur failure to enforce any right or provision of these Terms shall not constitute a waiver of that right or provision. No waiver of any term or condition shall be deemed a further or continuing waiver of that term or any other term.`,
      `18d. Assignment\nYou may not assign or transfer these Terms or any of your rights or obligations under them without our prior written consent. We may freely assign these Terms (including in connection with a merger, acquisition, or sale of assets) without notice to you. Any purported assignment in violation of this section is void.`,
      `18e. Force Majeure\nNeither party shall be liable for any failure or delay in performance resulting from events beyond its reasonable control, including natural disasters, acts of government, pandemic, strikes, utility failures, internet outages, or cyberattacks, provided the affected party gives prompt notice and uses reasonable efforts to resume performance.`,
      `18f. No Third-Party Beneficiaries\nThese Terms are solely for the benefit of you and Pholio. No third party shall have any right to enforce any provision of these Terms.`,
      `18g. Notices\nAll legal notices to Pholio under these Terms must be sent in writing to ${CONTACT_EMAIL} or to our registered address at ${COMPANY_ADDRESS}. We may provide notice to you via the email address associated with your account or by posting a notice on the Platform.`,
      `18h. Export Controls\nYou represent that you are not located in, under the control of, or a national or resident of any country subject to US export restrictions, and that you will not export or re-export the Platform to any such country or person.`,
    ],
  },
];

export function TermsContent() {
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
            Terms &amp; Conditions
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
            These Terms and Conditions govern your access to and use of the Pholio platform. By using Pholio, you agree to be bound by these Terms. Please read them carefully before creating an account or using any part of the Platform.
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

                  if (
                    paragraph.startsWith("(a)") ||
                    paragraph.startsWith("(b)") ||
                    paragraph.startsWith("(c)") ||
                    paragraph.startsWith("(d)") ||
                    paragraph.startsWith("(e)") ||
                    paragraph.startsWith("(f)")
                  ) {
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
                      <p
                        key={j}
                        className="font-sans text-sm text-[#050505]/50 leading-relaxed pl-4 border-l-2 border-[#C9A55A]/30"
                      >
                        {paragraph}
                      </p>
                    );
                  }

                  // All-caps legal notices get slightly different treatment
                  if (paragraph === paragraph.toUpperCase() && paragraph.length > 80) {
                    return (
                      <p
                        key={j}
                        className="font-sans text-sm text-[#050505]/55 leading-relaxed font-medium tracking-wide p-4 bg-[#050505]/[0.03] rounded-lg border border-[#050505]/[0.06]"
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
          <h3 className="font-editorial text-2xl mb-4">Questions About These Terms?</h3>
          <p className="font-sans text-[#050505]/60 mb-2 leading-relaxed">
            If you have questions about these Terms and Conditions, please contact our legal team. We aim to respond to all substantive inquiries within 5 business days.
          </p>
          <p className="font-sans text-[#050505]/40 text-sm mb-8">
            Mailing address: {COMPANY_ADDRESS}
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
