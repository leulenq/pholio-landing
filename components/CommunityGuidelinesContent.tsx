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
  LEGAL_EMAIL,
  SUPPORT_EMAIL,
} from "@/lib/legal-constants";

const sections: LegalSection[] = [
  {
    title: "Our Community",
    content: [
      `Pholio is a professional talent portfolio and agency management platform built for models, creatives, performers, and the agencies that represent them. Our platform works because it is grounded in trust: talent trust that agencies engaging with them are legitimate, and agencies trust that talent portfolios represent real individuals with genuine professional aspirations.`,
      `These Community Guidelines define the standards of conduct required to maintain that trust. They apply to all users — Talent and Agencies alike — and supplement our Terms of Service (www.pholio.studio/terms). Capitalized terms used here have the same meaning as in our Terms.`,
      `Violation of these Guidelines may result in content removal, account suspension, or permanent termination, depending on the severity and frequency of the violation.`,
    ],
  },
  {
    title: "Acceptable Use",
    content: [
      `Pholio is designed for professional use in the talent and agency industry. The following uses are expressly permitted:`,
      `— Creating, publishing, and maintaining a professional talent portfolio with accurate, current photographs and profile information;`,
      `— Applying to legitimate talent agencies and modeling agencies through the Platform;`,
      `— Managing a legitimate talent agency roster, reviewing applications, scheduling interviews, and tracking professional engagements;`,
      `— Communicating professionally with other Platform users about potential representation, bookings, and collaboration;`,
      `— Using AI-assisted features (where consent is given) to improve portfolio quality and presentation.`,
      `All use of the Platform must be professional in nature and consistent with standard practices in the talent representation and modeling industries.`,
    ],
  },
  {
    title: "Prohibited Content",
    content: [
      `The following content is strictly prohibited on Pholio and will result in immediate removal and account action:`,
      `3a. Sexually Explicit Content\nUploading, sharing, or distributing sexually explicit, pornographic, or obscene material is prohibited at all times, regardless of consent or context. Portfolio images must be suitable for professional industry presentation. Tasteful implied nudity consistent with editorial or high fashion photography norms may be permitted on a case-by-case basis; overtly sexual content is not.`,
      `3b. Child Sexual Abuse Material (CSAM)\nAny content that sexualizes, exploits, or endangers minors — including but not limited to child sexual abuse material (CSAM) — is absolutely prohibited and will result in immediate account termination, reporting to law enforcement, and referral to the National Center for Missing and Exploited Children (NCMEC) CyberTipline. This is a zero-tolerance policy with no exceptions.`,
      `3c. Harassment and Abuse\nHarassment, bullying, threats, intimidation, or abuse targeting any individual — whether a Platform user or a third party — is prohibited. This includes repeated unwanted contact, sharing of private information without consent (doxxing), making threats of harm, and coordinating harassment campaigns.`,
      `3d. Hate Speech and Discrimination\nContent that promotes hatred, violence, or discrimination against individuals or groups based on race, ethnicity, national origin, religion, gender, gender identity, sexual orientation, disability, age, immigration status, or other protected characteristics is prohibited.`,
      `3e. Misinformation and Fake Profiles\nCreating fake or impersonator profiles, misrepresenting your identity or professional credentials, or submitting materially false information to agencies (including fabricated measurements, falsified experience, or inauthentic portfolio images) is prohibited.`,
      `3f. Violence and Graphic Content\nContent depicting gratuitous violence, gore, or graphic injury is prohibited.`,
      `3g. Illegal Content\nContent that violates applicable law — including content that facilitates trafficking, exploitation, fraud, or any other criminal activity — is prohibited.`,
    ],
  },
  {
    title: "Minors on the Platform",
    content: [
      `Pholio recognizes that minors (individuals under 18) participate in the modeling and talent industry. We take the safety of minors seriously.`,
      `— Talent users who are minors must have a parent or legal guardian complete registration on their behalf. The parent or guardian must certify their legal authority to act for the minor.`,
      `— Any portfolio content depicting minors must be professionally appropriate and free from any sexualization, explicit content, or imagery that could be considered harmful or exploitative.`,
      `— Agencies viewing portfolios of minor talent must use that information solely for legitimate professional evaluation and may not contact minors directly outside of the Platform without guardian consent.`,
      `— If you encounter content on the Platform that you believe exploits, harms, or inappropriately sexualizes a minor, report it immediately using our reporting tools or by emailing ${LEGAL_EMAIL}. We will investigate promptly and escalate to law enforcement and NCMEC if warranted.`,
      `— Pholio reserves the right to request age verification or guardian documentation at any time.`,
    ],
  },
  {
    title: "No Fake Scouts or Impersonator Agencies",
    content: [
      `Fraudulent scouting and fake agency representation are serious harms to talent, particularly aspiring models and young creatives who may be vulnerable to exploitation.`,
      `— Registering as an agency without operating as a legitimate, active talent management or booking organization is prohibited.`,
      `— Using an agency account to contact talent for purposes other than professional representation, booking, or casting evaluation is prohibited.`,
      `— Impersonating a known, named agency (e.g., creating a profile that misrepresents affiliation with IMG, Elite, Ford, or any other established agency) is prohibited and may constitute fraud.`,
      `— Requesting payment from talent in exchange for representation, portfolio review, or guaranteed bookings is prohibited. Legitimate agencies do not charge talent for representation.`,
      `— Soliciting talent for services outside the Pholio Platform (e.g., directing talent to off-platform payment schemes, personal photo shoots under false pretenses) is prohibited.`,
      `Any user who suspects they have been contacted by a fraudulent scout or impersonator agency on Pholio should report the account immediately and, if relevant, contact local law enforcement.`,
    ],
  },
  {
    title: "Image and Content Ownership",
    content: [
      `By uploading content to Pholio, you represent that you own or have the rights to use all content you submit. You may not upload portfolio images taken by photographers without having the appropriate license or written release from the photographer.`,
      `You may not upload images of other individuals without their consent. This includes images of friends, colleagues, or other talent.`,
      `Images that depict trademarked logos, brand identifiers, or copyrighted artworks in a manner that may infringe third-party rights should not be uploaded without proper clearance.`,
      `If you believe content on the Platform was uploaded without your permission, please refer to our DMCA Policy (www.pholio.studio/dmca) for copyright complaints, or contact ${LEGAL_EMAIL} for other privacy or consent-related concerns.`,
    ],
  },
  {
    title: "Reporting Expectations",
    content: [
      `We rely on our community to help maintain a safe and professional environment. If you encounter content or behavior that violates these Guidelines, we expect you to report it.`,
      `— Use the in-platform reporting tools where available to flag content or users that violate these Guidelines.`,
      `— For urgent concerns (including CSAM, immediate safety threats, or suspected trafficking), email ${LEGAL_EMAIL} immediately with as much detail as possible.`,
      `— For privacy-related concerns (e.g., your images have been posted without consent), contact privacy@pholio.studio.`,
      `— For copyright concerns, refer to our DMCA Policy.`,
      `We commit to investigating all good-faith reports promptly. Reports made in bad faith, or used as a tool to harass another user, may themselves be grounds for account action.`,
      `Pholio does not proactively monitor all user-generated content but will act on credible reports and reserves the right to remove content or suspend accounts at our discretion.`,
    ],
  },
  {
    title: "Enforcement",
    content: [
      `When we determine that a violation of these Guidelines has occurred, we may take one or more of the following actions depending on the nature and severity of the violation:`,
      `— Issue a warning and require the user to correct or remove violating content;`,
      `— Remove or disable specific content without warning;`,
      `— Temporarily suspend the user's account;`,
      `— Permanently terminate the user's account and all associated data;`,
      `— Report the conduct to law enforcement, regulatory authorities, or child protection organizations where required by law or where the safety of individuals is at risk;`,
      `— Pursue civil or criminal remedies available under applicable law.`,
      `We aim to apply enforcement consistently and proportionally. However, certain categories of violation (CSAM, impersonation fraud, trafficking facilitation) will always result in immediate termination without warning.`,
      `Users who disagree with an enforcement action may appeal by emailing ${SUPPORT_EMAIL} within 14 days. We will review all appeals in good faith.`,
    ],
  },
  {
    title: "Changes to These Guidelines",
    content: [
      `We may update these Community Guidelines from time to time as our platform evolves and as the needs of our community change. We will notify users of material changes via email and by posting a notice on the Platform. Your continued use of the Platform after any update constitutes your acceptance of the revised Guidelines.`,
      `We maintain a version history of these Guidelines, which is available upon request at ${LEGAL_EMAIL}.`,
    ],
  },
];

export function CommunityGuidelinesContent() {
  return (
    <LegalDocumentLayout
      title="Community Guidelines"
      subtitle="These Community Guidelines define the standards of professional conduct required to use the Pholio platform. They protect talent, agencies, and the integrity of our community."
      lastUpdated={LAST_UPDATED}
      effectiveDate={EFFECTIVE_DATE}
      sections={sections}
      contactEmail={LEGAL_EMAIL}
      footerTitle="Questions or Reports?"
      footerBody="To report a violation of these Guidelines or ask about our enforcement policies, contact our Trust & Safety team."
      companyName={COMPANY_NAME}
      companyAddress={COMPANY_ADDRESS}
    />
  );
}
