"use client";

import {
  LegalDocumentLayout,
  type LegalSection,
} from "@/components/LegalDocumentLayout";
import {
  COMPANY_ADDRESS,
  COMPANY_NAME,
  LEGAL_EMAIL,
  PRIVACY_EMAIL,
} from "@/lib/legal-constants";

const LAST_UPDATED = "June 28, 2026";
const EFFECTIVE_DATE = "June 28, 2026";

const sections: LegalSection[] = [
  {
    title: "Controller; Scope of Notice",
    content: [
      `${COMPANY_NAME} ("Pholio," "we," "us," or "our") is the controller of personal data processed to operate Pholio's talent submission service. This Submission Program Notice ("Notice") applies when an individual talent user, or a parent or legal guardian acting for a minor talent user, prepares or sends a submission to an agency through Pholio.`,
      `This Notice supplements the Pholio Privacy Policy (https://www.pholio.studio/privacy), Terms of Service (https://www.pholio.studio/terms), Community Guidelines (https://www.pholio.studio/community-guidelines), and AI Notice (https://www.pholio.studio/ai-notice). The Privacy Policy governs in the event of a conflict concerning the processing of personal data. The Terms of Service govern in the event of any other conflict.`,
      `For purposes of this Notice, "Talent" means the individual who is the subject of a submission, and "Agency" means the agency organization designated by Talent to receive it, including authorized personnel who have access to that Agency's Pholio account.`,
    ],
  },
  {
    title: "Legal Nature of a Submission",
    content: [
      `A submission is a request that an Agency consider Talent for possible representation. It does not create an agency, management, employment, fiduciary, partnership, joint-venture, confidential, or other legal relationship between Talent and Pholio or between Talent and the receiving Agency.`,
      `Pholio is a software service. Pholio is not a talent agency, model management company, employment agency, casting director, employer, or client. Pholio does not procure engagements, negotiate compensation or commissions, make offers of representation, or enter into agreements on behalf of Talent or an Agency.`,
      `No Agency is required to review, respond to, retain, or act on a submission. No submission guarantees an interview, meeting, representation, booking, engagement, work, immigration status, permit, compensation, or income. A representation or booking relationship arises only under a separate agreement between the relevant parties.`,
      `A submission should not contain material that Talent requires the recipient to hold under a nondisclosure agreement. Agency access is restricted by the Pholio Terms, but submission does not create an attorney-client privilege, trade-secret undertaking, or independent duty of confidentiality beyond applicable law and the agreements governing the recipient's use of Pholio.`,
    ],
  },
  {
    title: "Categories of Personal Data",
    content: [
      `The personal data processed in connection with a submission may include the following categories, to the extent provided by Talent, maintained in Talent's Pholio profile, generated through use of the service, or required for the submission concerned:`,
      `3a. Identity and contact data\nName, professional or display name, pronouns, date of birth, age, city, state, country, market, email address, telephone number, portfolio address, and social-media usernames or links.`,
      `3b. Professional data\nBiography, languages, training, experience, credits, specialties, booking categories, preferred divisions or boards, current or prior representation information, work-eligibility information voluntarily provided, and other professional profile information.`,
      `3c. Physical and appearance data\nHeight, weight, bust or chest, waist, hips, inseam, dress, suit and shoe measurements; hair and eye color; gender or division information; body type; tattoos, piercings, ethnicity or heritage, and other appearance characteristics voluntarily provided for professional evaluation.`,
      `3d. Photographs and media\nHeadshots, profile images, full-length images, digitals, editorial or book images, comp-card images, video or other media where supported, together with file names, image order, upload dates, image type, shot type, recency, rights information, and technical metadata.`,
      `3e. Submission data\nThe designated Agency, selected board or division, selected media set and comp-card presentation, optional submission note, image selections, package-readiness information, submission date, application status, messages, interview or reminder information, and records of Agency action within Pholio.`,
      `3f. Account, consent, and compliance data\nAccount and profile identifiers, subscription status where relevant to service limits, acknowledgment and consent records, guardian name and contact information, guardian-consent status, minor work-permit status where provided, image-license and release information, and records necessary to demonstrate compliance.`,
      `3g. Derived and technical data\nCompatibility or match information, profile-completeness and image-quality assessments, search or ranking data, timestamps, request-integrity values, session and security data, IP address, browser and device information, approximate location derived from IP address, error records, and audit events.`,
      `Fields identified as required must be provided to submit an application. If required identity, contact, measurement, rights, or image information is not provided, Pholio will not transmit the submission. Optional information may be omitted, but omission may affect the information available to the Agency for evaluation.`,
    ],
  },
  {
    title: "Sensitive and Special-Category Data",
    content: [
      `Certain information used in the modeling and creative industries may be sensitive under applicable law. Racial or ethnic origin, health information, sexual orientation, and biometric data used to uniquely identify a person are special-category personal data under the EU and UK GDPR. California law separately defines categories of sensitive personal information.`,
      `A photograph is not, solely because it depicts a person, biometric data under the GDPR. A photograph may become biometric data if it is processed through specific technical means for unique identification or authentication. Pholio does not treat ordinary submission photographs as identity biometrics unless it expressly gives separate notice of such processing.`,
      `Physical measurements and appearance information are not automatically health data or special-category data. They may nevertheless be sensitive because of their nature and context, and they may reveal or permit inferences about protected characteristics. Where processing requires consent or explicit consent under applicable law, Pholio relies on the consent obtained for the relevant data and purpose. Talent may decline optional data, subject to the consequence that an Agency may be unable to assess the submission.`,
      `Talent must not include medical records, government identification numbers, financial-account credentials, precise home-location information, or other information not reasonably necessary for Agency evaluation unless Pholio specifically requests it under a separate notice.`,
    ],
  },
  {
    title: "Sources of Personal Data",
    content: [
      `Pholio obtains submission data principally from Talent and from information already maintained in Talent's Pholio account. For a minor, information may also be obtained from a parent or legal guardian.`,
      `Pholio also generates operational data from use of the service, including submission status, message and notification records, security logs, and derived assessments described in this Notice and the AI Notice. The receiving Agency may add application statuses, internal notes, tags, interview information, reminders, and communications.`,
      `If Talent supplies a social-media link, authorized Agency personnel may visit information that Talent has made available through that third-party service. Any information an Agency independently obtains from a public social-media account is processed by that Agency under its own legal responsibilities. Pholio does not receive private social-media content merely because Talent provides a profile link.`,
      `If Talent directs another person to act on Talent's behalf, that person must be legally authorized to provide the information and materials concerned. Pholio may request evidence of authority where reasonably necessary.`,
    ],
  },
  {
    title: "Purposes of Processing",
    content: [
      `Pholio processes submission data for the following purposes:`,
      `(a) to authenticate Talent, maintain the account, save a submission draft, and present the materials for review before transmission;`,
      `(b) to assess whether required fields and materials are present, validate current image and package references, confirm image-rights information, and prevent incomplete, duplicate, unauthorized, or unintended submissions;`,
      `(c) to transmit the submission to the Agency designated by Talent and make the relevant profile, contact, portfolio, image, measurement, comp-card, and message information available for Agency evaluation;`,
      `(d) to notify Talent and the Agency of submission, message, status, interview, withdrawal, or other application activity;`,
      `(e) to maintain application and consent records, permit status tracking, support resubmission, and resolve synchronization or delivery failures;`,
      `(f) to provide search, ranking, compatibility, quality, fraud-prevention, moderation, safety, and other supporting functions described in the Privacy Policy and AI Notice;`,
      `(g) to operate, secure, monitor, troubleshoot, audit, and improve the service;`,
      `(h) to enforce the Terms of Service, investigate misuse, protect the rights and safety of users and others, resolve disputes, establish or defend legal claims, and comply with law.`,
      `Pholio does not sell submission data and does not share submission data for cross-context behavioral advertising.`,
    ],
  },
  {
    title: "Legal Bases for Processing",
    content: [
      `Where the EU GDPR or UK GDPR applies, Pholio relies on one or more of the following legal bases, depending on the processing concerned:`,
      `7a. Contract and pre-contractual steps\nProcessing necessary to provide the Pholio service under the Terms of Service and, at Talent's request, to take steps before a possible contract between Talent and the receiving Agency.`,
      `7b. Legitimate interests\nProcessing necessary for Pholio's or a third party's legitimate interests in operating and securing the service, preventing fraud and duplicate submissions, communicating application activity, evaluating service performance, enforcing agreements, and establishing or defending legal claims, where those interests are not overridden by Talent's rights and interests.`,
      `7c. Consent or explicit consent\nProcessing based on consent where required, including processing of special-category data for which no other lawful condition applies. Consent may be withdrawn prospectively, but withdrawal does not affect processing already lawfully undertaken or processing supported by another legal basis.`,
      `7d. Legal obligation and vital interests\nProcessing necessary to comply with applicable law, lawful process, recordkeeping or safeguarding duties, or, in limited circumstances, to protect an individual's vital interests.`,
      `Under the CCPA/CPRA, where applicable, the categories, purposes, recipients, sale or sharing status, and retention practices stated in this Notice and the Privacy Policy constitute the relevant notice of collection and use for the submission service.`,
    ],
  },
  {
    title: "Disclosure to Agencies and Other Recipients",
    content: [
      `Talent directs Pholio to disclose the submission to the Agency identified at the time of submission. Within that Agency, the materials may be accessed by personnel authorized under the Agency's account and role permissions, including owners, agents, bookers, scouts, casting personnel, and other staff with a legitimate evaluation or administration function.`,
      `The receiving Agency may use the materials to evaluate Talent for representation, identify a potentially suitable division or market, communicate with Talent, maintain application records, arrange an interview, and administer any later process that Talent elects to pursue.`,
      `An Agency that determines its own purposes and means of processing acts as a separate controller or business with respect to that processing. Its privacy notice, retention schedule, legal obligations, and procedures for data-subject requests apply to the copy of the data it controls. Pholio is not responsible for an Agency's independent processing outside Pholio.`,
      `Pholio may also disclose data to hosting, storage, authentication, communications, security, support, analytics, and other service providers acting under contract; professional advisers and auditors; competent courts, regulators, law-enforcement bodies, or other authorities; and a purchaser or successor in a merger, financing, reorganization, or transfer of business, subject to applicable law and the Privacy Policy.`,
      `Pholio records the configuration of a submitted application, including the recipient, selected materials, submission time, confirmation, and message. The Agency interface may also display current profile, contact, or portfolio information associated with Talent's account. A later profile or media update may therefore affect information displayed in the Agency interface without deleting the historical application, consent, status, or communication record.`,
      `The submission itself is not published as a public application. Submission does not change Talent's separate public-portfolio or Agency-discoverability settings. Information made public or discoverable under those settings may remain available independently of the submission.`,
    ],
  },
  {
    title: "Agency Use; Further Disclosure",
    content: [
      `Under the Pholio Terms, the receiving Agency receives a limited right to view, print, and share submission materials internally with authorized personnel for legitimate evaluation and related professional administration. The Agency may not sell Talent data, use contact details for unrelated solicitation, scrape or aggregate Talent data, or disclose submission materials to unauthorized persons.`,
      `A submission does not authorize an Agency or Pholio to use Talent's name, likeness, voice, images, or other materials in advertising, publicity, merchandising, model training, or the creation or commercial use of a digital replica. Any such use requires a separate lawful basis and, where required, a distinct written agreement or consent specifying the permitted use.`,
      `Talent should review an Agency's privacy notice before proceeding with an interview, representation discussion, or off-platform exchange of additional information. Information later provided directly to an Agency is governed by the Agency's notice and applicable law, not solely by this Notice.`,
    ],
  },
  {
    title: "Accuracy; Authority; Intellectual Property",
    content: [
      `Talent is responsible for ensuring that submission information is accurate, current, and not materially misleading. Digitals represented as current or unretouched must be current and must not be deceptively altered. Pholio's completeness or rights checks do not verify professional suitability, identity, accuracy, ownership, or legal clearance.`,
      `Talent must own, or have sufficient written permission, license, release, and authority to upload and disclose every photograph and other protected work included in a submission. The subject of a photograph does not necessarily own its copyright; absent a valid transfer or work-made-for-hire arrangement, the photographer commonly owns the copyright.`,
      `Talent retains ownership of Talent content. Talent grants Pholio only the rights stated in the Terms of Service that are necessary to host, process, reproduce, format, transmit, display, and otherwise provide the requested service. The Agency receives only the limited evaluation rights stated in the Terms and this Notice.`,
      `Talent must not submit confidential client materials, embargoed work, photographs beyond the scope of their license, or content that infringes copyright, privacy, publicity, trademark, contract, moral, or other rights. Talent must have authority to provide personal data concerning any other person.`,
    ],
  },
  {
    title: "Automated Processing and Human Review",
    content: [
      `Pholio may use automated systems to assess profile completeness, image quality, package readiness, semantic relevance, compatibility, or search ranking. Inputs may include profile text, images, professional categories, location, measurements, and Agency criteria, as described in the Privacy Policy and AI Notice.`,
      `Automated outputs are advisory. They do not create representation, accept or reject a submission, or bind an Agency. Agencies are required to exercise their own judgment and remain responsible for decisions made using Pholio.`,
      `Pholio does not make a solely automated decision that produces legal or similarly significant effects by determining whether an Agency represents or employs Talent. Where applicable law grants rights concerning profiling or automated decision-making, Talent may request information, object to qualifying processing, contest a qualifying decision, or request human intervention by contacting ${PRIVACY_EMAIL}.`,
    ],
  },
  {
    title: "Minors",
    content: [
      `Pholio does not permit a child under 13 to create an account or submit materials. Users who have not reached the age of legal majority may use the service only under the eligibility and guardian requirements stated in the Terms of Service and applicable law.`,
      `A submission for Talent under 18 must be authorized and supervised by a parent or legal guardian. Pholio records guardian-consent information and may restrict measurements, full-length images, comp-card access, public visibility, or submission until the required consent is verified.`,
      `Guardian authorization for a submission is limited to disclosure for Agency evaluation. It is not consent to employment, travel, a test shoot, nudity, sexually explicit material, medical examination, creation or use of a digital replica, a power of attorney, or a representation agreement. Separate consent and documentation may be required for each later activity.`,
      `The parent or guardian is responsible for verifying the Agency and its representatives, supervising communications and meetings, and determining whether any proposed contract or engagement is lawful and appropriate. Applicable law may require child-performer permits, education arrangements, work-hour restrictions, trust accounts, responsible persons, employer certificates, or other safeguards before work begins. Submission through Pholio does not satisfy those requirements.`,
      `A minor or guardian should not provide identity documents, financial information, intimate images, or precise home-location information in a submission or in response to an unverified contact.`,
    ],
  },
  {
    title: "Retention",
    content: [
      `Pholio retains personal data only for the period reasonably necessary for the purposes stated in this Notice and the Privacy Policy, subject to legal, security, dispute-resolution, and recordkeeping requirements.`,
      `13a. Drafts\nAn active server-side submission draft expires after 90 days without renewal. A draft that is deleted or expires may remain recoverable for 7 days before its draft payload is purged. A browser recovery record ordinarily expires after 7 days. Limited draft lifecycle records may be retained without the draft note, image identifiers, or full payload.`,
      `13b. Submitted applications\nApplication records are retained for 2 years after conclusion of the application process, unless a longer period is necessary to comply with law, investigate misuse, resolve a dispute, enforce an agreement, or establish, exercise, or defend legal claims.`,
      `13c. Profile and media\nProfile data and portfolio media remain subject to the account and media retention periods in the Privacy Policy. Removal of an item from the live profile does not necessarily remove the historical application, status, consent, communication, or audit record.`,
      `13d. Security and backups\nSecurity logs and backup copies are retained under the periods or criteria stated in the Privacy Policy. Data scheduled for deletion may remain in restricted backups until the applicable backup cycle expires.`,
      `13e. Agency copies\nThe receiving Agency determines the retention period for data it controls. An Agency may retain a submission for future consideration, legal compliance, safeguarding, dispute resolution, or claims where permitted by law. Talent should direct a separate request to the Agency if deletion of the Agency's copy is sought.`,
    ],
  },
  {
    title: "Withdrawal; Erasure; Revocation",
    content: [
      `Talent may withdraw an application while it remains in a status that Pholio designates as withdrawable. Withdrawal changes the application status, records the change, and notifies the Agency. It does not rescind the historical disclosure or require deletion of the application record.`,
      `Withdrawal does not automatically delete messages, status history, consent records, audit events, the recorded submission configuration, or copies already viewed, printed, exported, downloaded, or lawfully retained by an Agency. Pholio cannot technically recall information from an Agency's independent systems or personnel.`,
      `Withdrawal of consent affects future processing based solely on that consent. It does not affect the lawfulness of prior processing and does not require deletion where another legal basis or a statutory exception applies.`,
      `A request for erasure is distinct from withdrawal of an application. To request deletion of data controlled by Pholio, contact ${PRIVACY_EMAIL}. To request deletion of data controlled by an Agency, contact that Agency. Pholio and the Agency may require identity verification and may deny or limit deletion where retention is permitted or required by applicable law.`,
    ],
  },
  {
    title: "Privacy Rights",
    content: [
      `Depending on Talent's location and the law applicable to the processing, Talent may have the right to:`,
      `(a) receive notice of the categories, sources, purposes, recipients, and retention of personal data;`,
      `(b) request access to personal data and a copy of qualifying data;`,
      `(c) correct inaccurate personal data;`,
      `(d) request deletion or erasure, subject to legal exceptions;`,
      `(e) restrict qualifying processing or object to processing based on legitimate interests;`,
      `(f) receive qualifying data in a structured, commonly used, machine-readable format and transmit it to another controller;`,
      `(g) withdraw consent prospectively where consent is the legal basis;`,
      `(h) obtain safeguards concerning qualifying automated decision-making and profiling;`,
      `(i) limit qualifying uses and disclosures of sensitive personal information where that right applies;`,
      `(j) opt out of sale or sharing for cross-context behavioral advertising where applicable. Pholio states that it does not engage in those activities with submission data;`,
      `(k) receive equal service and not be unlawfully discriminated against for exercising a privacy right; and`,
      `(l) lodge a complaint with a competent privacy or data-protection authority.`,
      `Rights are not absolute and differ by jurisdiction. Pholio may verify identity and authority before acting on a request. Submit requests to ${PRIVACY_EMAIL}. Requests concerning an Agency's independent processing must also be submitted to that Agency.`,
    ],
  },
  {
    title: "International Transfers and Security",
    content: [
      `Pholio is based in the United States. Submission data may be processed in the United States and in other countries in which Pholio, the receiving Agency, or their service providers operate. Where required, Pholio uses an adequacy decision, standard contractual clauses, or another lawful transfer mechanism described in the Privacy Policy.`,
      `Pholio uses technical and organizational measures appropriate to the nature and risk of the processing, including encryption in transit, managed encryption at rest, authenticated sessions, access controls, and role-based Agency permissions. No method of transmission, storage, or access control is completely secure. Talent must protect account credentials and promptly report suspected unauthorized access.`,
      `If Talent elects to continue communication outside Pholio, the security and privacy practices of the chosen email, messaging, file-transfer, or social-media service apply to that communication.`,
    ],
  },
  {
    title: "Agency Regulation; Fees; Safety",
    content: [
      `Laws governing talent agencies, model management companies, employment agencies, and child performers vary by jurisdiction. They may require an Agency to hold a license or registration, disclose a registration number, use written contracts, limit commissions or contract duration, provide accounting, obtain separate digital-replica approval, or comply with safeguarding and workplace requirements.`,
      `An Agency's presence on Pholio is not a government license and is not legal advice concerning that Agency's authority to operate in a particular jurisdiction. Talent should independently verify any required license or registration before signing an agreement or accepting an engagement.`,
      `Pholio does not charge a commission or success fee for Agency representation or bookings. Any Pholio subscription charge is a software-service charge and is not payment to an Agency, payment to secure consideration, or a guarantee of representation or work.`,
      `Talent should treat as warning signs any request to pay money to secure a place or guaranteed work; any guarantee of earnings; pressure to sign immediately; a requirement to use a particular photographer as a condition of work; a request for nude, lingerie, sexually explicit, banking, credential, or identity-document material during initial scouting; or contact from an address or account that cannot be verified independently.`,
      `Suspected impersonation, coercion, exploitation, trafficking, payment demands, unsafe conduct, or misuse of submission data should be reported through Pholio's reporting tools or to ${LEGAL_EMAIL}. Immediate threats should be reported to local emergency services or law enforcement.`,
    ],
  },
  {
    title: "Acknowledgment; Changes; Contact",
    content: [
      `Pholio records the version and time of the acknowledgment presented before Talent uses the submission service. Pholio separately records Talent's confirmation for each submission. An acknowledgment does not itself transmit a submission. A per-submission confirmation authorizes transmission only to the Agency identified for that submission.`,
      `Neither acknowledgment constitutes a representation agreement, employment agreement, power of attorney, image-usage release for advertising, digital-replica authorization, or waiver of rights that cannot lawfully be waived.`,
      `Pholio may amend this Notice to reflect changes in law, recipients, retention, technology, or the submission service. Where required by law, Pholio will provide notice of a material change and obtain renewed consent before undertaking processing that requires it.`,
      `Privacy inquiries and data-subject requests: ${PRIVACY_EMAIL}`,
      `Legal, safety, and Agency-conduct inquiries: ${LEGAL_EMAIL}`,
      `Mailing address: ${COMPANY_ADDRESS}`,
    ],
  },
];

export function SubmissionProgramNoticeContent() {
  return (
    <LegalDocumentLayout
      title="Submission Program Notice"
      subtitle="This Notice describes the processing and disclosure of personal data, photographs, measurements, contact information, and related materials when Talent requests consideration by an Agency through Pholio."
      lastUpdated={LAST_UPDATED}
      effectiveDate={EFFECTIVE_DATE}
      sections={sections}
      contactEmail={PRIVACY_EMAIL}
      footerTitle="Submission Privacy Inquiries"
      footerBody="Contact the Privacy Team to exercise a data-protection right or obtain further information concerning the processing described in this Notice."
      companyName={COMPANY_NAME}
      companyAddress={COMPANY_ADDRESS}
    />
  );
}
