"use client";

import {
  LegalDocumentLayout,
  type LegalSection,
} from "@/components/LegalDocumentLayout";
import {
  COMPANY_NAME,
  COMPANY_ADDRESS,
  LAST_UPDATED,
  EFFECTIVE_DATE,
  DMCA_EMAIL,
  LEGAL_EMAIL,
} from "@/lib/legal-constants";

const DESIGNATED_AGENT_NAME = "Legal Department, Pholio Studio, Inc.";
const DESIGNATED_AGENT_EMAIL = DMCA_EMAIL;

const sections: LegalSection[] = [
  {
    title: "Overview",
    content: [
      `${COMPANY_NAME} ("Pholio," "we," "our," or "us") respects the intellectual property rights of others and expects all users of the Pholio platform (www.pholio.studio and app.pholio.studio, collectively the "Platform") to do the same.`,
      `In accordance with the Digital Millennium Copyright Act of 1998 ("DMCA"), 17 U.S.C. § 512, Pholio has established a policy for addressing claims of copyright infringement. This DMCA Policy describes how to submit a takedown notice, how to file a counter-notification, and how Pholio handles repeat infringers.`,
      `Pholio qualifies for the safe harbor protections under 17 U.S.C. § 512(c) as a service provider that stores user-generated content. Nothing in this Policy creates any liability for Pholio beyond what is required by applicable law.`,
    ],
  },
  {
    title: "Designated Copyright Agent",
    content: [
      `Pholio has designated a Copyright Agent to receive notifications of claimed infringement. All DMCA-related notices must be directed to:`,
      `Designated Agent: ${DESIGNATED_AGENT_NAME}`,
      `Email: ${DESIGNATED_AGENT_EMAIL}`,
      `Mailing address: ${COMPANY_ADDRESS}`,
      `To be effective, your notice must comply with the requirements set out in Section 3 (Takedown Notice Requirements) below. Notices that do not substantially comply may be disregarded.`,
      `For non-copyright matters, including general legal inquiries, please contact ${LEGAL_EMAIL}.`,
    ],
  },
  {
    title: "Takedown Notice Requirements",
    content: [
      `If you are a copyright owner (or are authorized to act on behalf of a copyright owner) and believe that content on the Platform infringes your copyright, you may submit a DMCA takedown notice to our Copyright Agent. To be valid under 17 U.S.C. § 512(c)(3), your written notification must include ALL of the following:`,
      `(a) A physical or electronic signature of the person authorized to act on behalf of the owner of the exclusive right that is allegedly being infringed;`,
      `(b) Identification of the copyrighted work claimed to have been infringed, or — if multiple copyrighted works at a single online site are covered by a single notification — a representative list of such works;`,
      `(c) Identification of the material that is claimed to be infringing or to be the subject of infringing activity, and information reasonably sufficient to permit Pholio to locate the material (e.g., the URL or specific location on the Platform where the material appears);`,
      `(d) Information reasonably sufficient to permit Pholio to contact you, including your name, mailing address, telephone number, and email address;`,
      `(e) A statement that you have a good-faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law;`,
      `(f) A statement that the information in the notification is accurate, and under penalty of perjury, that you are authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.`,
      `Submitting a false, misleading, or bad-faith DMCA notice may expose you to liability for damages, including costs and attorneys' fees, under 17 U.S.C. § 512(f). We strongly recommend consulting legal counsel before submitting a DMCA notice if you are uncertain whether the material infringes your copyright.`,
    ],
  },
  {
    title: "How Pholio Processes Takedown Notices",
    content: [
      `Upon receipt of a valid takedown notice, Pholio will:`,
      `(a) Promptly remove or disable access to the allegedly infringing material from the Platform;`,
      `(b) Notify the user who uploaded or posted the affected content that the material has been removed or disabled; and`,
      `(c) Provide the user with a copy of the takedown notice (with your personal contact information redacted if you request it) and inform them of their right to submit a counter-notification.`,
      `We aim to process valid notices within five (5) business days of receipt. Complex or ambiguous notices may require additional time.`,
      `Pholio reserves the right to restore removed content if it receives a valid counter-notification (see Section 5) or if we determine in our sole discretion that the original notice was defective, misleading, or made in bad faith.`,
    ],
  },
  {
    title: "Counter-Notification",
    content: [
      `If you believe that material you uploaded to the Platform was removed or disabled as a result of a mistake or misidentification, you may submit a counter-notification to our Copyright Agent. To be valid under 17 U.S.C. § 512(g)(3), your written counter-notification must include ALL of the following:`,
      `(a) Your physical or electronic signature;`,
      `(b) Identification of the material that has been removed or disabled and the location at which the material appeared before it was removed or access to it was disabled;`,
      `(c) A statement under penalty of perjury that you have a good-faith belief that the material was removed or disabled as a result of mistake or misidentification;`,
      `(d) Your name, address, and telephone number; and`,
      `(e) A statement that you consent to the jurisdiction of the Federal District Court for the judicial district in which your address is located (or, if you are located outside the United States, any judicial district in which Pholio may be found), and that you will accept service of process from the person who provided the original takedown notice.`,
      `Upon receipt of a valid counter-notification, Pholio will forward it to the original complainant and inform them that we may restore the removed material in ten (10) to fourteen (14) business days unless the complainant files a court action and notifies Pholio. If no court action is filed within that period, Pholio may, in its discretion, restore the material.`,
      `Submitting a false or bad-faith counter-notification may expose you to civil and criminal liability.`,
    ],
  },
  {
    title: "Repeat Infringer Policy",
    content: [
      `Pholio maintains a repeat infringer policy in accordance with 17 U.S.C. § 512(i). Under this policy:`,
      `— We track takedown notices received against specific user accounts.`,
      `— Users who receive two (2) or more valid DMCA takedown notices within any rolling twelve (12) month period will have their account suspended.`,
      `— Users who receive three (3) or more valid DMCA takedown notices within any rolling twelve (12) month period will have their account permanently terminated.`,
      `— Pholio reserves the right to terminate, at any time and in its sole discretion, the account of any user who is found to be a repeat or willful infringer, even on the basis of a single egregious violation.`,
      `— Any content associated with a terminated account that was the subject of a valid DMCA notice will be permanently removed from the Platform.`,
      `Counter-notifications that are subsequently upheld (i.e., the original notice is not pursued in court) will not count against the user for purposes of this repeat infringer policy.`,
    ],
  },
  {
    title: "Portfolio Photographs and Modeling Industry Context",
    content: [
      `Pholio is a talent portfolio platform. Many users upload professional photographs taken by third-party photographers. By uploading images to Pholio, users represent and warrant that they have all necessary rights, licenses, and releases from the copyright holders (including photographers) to display those images on the Platform.`,
      `If you are a photographer and believe your photographs have been uploaded to Pholio without proper authorization, please submit a DMCA takedown notice as described in Section 3. We take photographer copyright claims seriously and will process valid notices promptly.`,
      `We encourage agencies and talent to maintain clear written agreements with photographers regarding portfolio usage rights before uploading images to the Platform. Pholio is not liable for rights disputes between talent and their photographers.`,
    ],
  },
  {
    title: "Limitations and Exclusions",
    content: [
      `This DMCA Policy addresses copyright infringement claims only. For other intellectual property concerns (trademark, trade secret, patent), please contact ${LEGAL_EMAIL}.`,
      `For privacy complaints (e.g., images of you uploaded without consent), please contact our Privacy Team at privacy@pholio.studio.`,
      `For content that is illegal but not copyright-related (e.g., CSAM, harassment), please refer to our Community Guidelines and contact ${LEGAL_EMAIL} immediately.`,
      `Pholio is not required to, and does not, monitor all content uploaded to the Platform proactively for copyright compliance. Our obligations are reactive — we respond to valid notices in accordance with the DMCA safe harbor framework.`,
    ],
  },
  {
    title: "Changes to This Policy",
    content: [
      `We may update this DMCA Policy from time to time. When we make material changes, we will update the "Last Updated" date at the top of this document and provide notice consistent with our general Terms of Service notification requirements. Your continued use of the Platform after such changes constitutes your acceptance of the updated Policy.`,
    ],
  },
];

export function DmcaContent() {
  return (
    <LegalDocumentLayout
      title="DMCA Policy"
      subtitle="Pholio respects copyright and responds to valid takedown notices under the Digital Millennium Copyright Act. This policy explains how to report infringement, submit counter-notifications, and how we handle repeat infringers."
      lastUpdated={LAST_UPDATED}
      effectiveDate={EFFECTIVE_DATE}
      sections={sections}
      contactEmail={DESIGNATED_AGENT_EMAIL}
      footerTitle="Submit a Copyright Notice"
      footerBody="To report copyright infringement on the Pholio platform, email our designated Copyright Agent. Please include all required information as detailed in Section 3 to ensure prompt processing."
      companyName={COMPANY_NAME}
      companyAddress={COMPANY_ADDRESS}
    />
  );
}
