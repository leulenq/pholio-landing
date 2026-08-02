import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import MarketingFooter from "@/components/MarketingFooter";
import ThemeColor from "@/components/ThemeColor";
import CopyBoilerplate from "@/components/press/CopyBoilerplate";
import PressReveal from "@/components/press/PressReveal";

export const metadata = {
  title: "Press | Pholio",
  description:
    "Pholio newsroom with company updates, media resources, and press contact details.",
};

const PRESS_EMAIL = "press@pholio.studio";
const PRESS_HREF =
  "mailto:press@pholio.studio?subject=Pholio%20press%20inquiry";

const boilerplate =
  "Pholio is a verified talent discovery platform built for models and the agencies that represent them. Talent use Pholio to curate professional portfolios, verify profile information, and apply directly to agencies. Agency teams use Pholio to review consistent profiles, evaluate portfolio strength, and manage discovery across markets.";

const pressUpdates = [
  {
    date: "March 2026",
    title:
      "Pholio expands agency discovery workflows across international rosters.",
    summary:
      "New shortlist and verification flows reduce portfolio review friction for agency teams operating across multiple markets.",
  },
  {
    date: "January 2026",
    title:
      "Studio+ introduces premium portfolio controls and advanced profile insights.",
    summary:
      "Talent can now tailor public portfolio presentation with deeper analytics and high-fidelity profile controls.",
  },
  {
    date: "October 2025",
    title: "Pholio launches direct talent-to-agency application routing.",
    summary:
      "Agencies receive cleaner application pipelines with standardized profile data, media, and verification signals.",
  },
];

const brandFacts = [
  { label: "Founded", value: "2024" },
  { label: "Company", value: "Remote-first" },
  { label: "Markets", value: "New York and London" },
  { label: "Products", value: "Pholio and Studio+" },
];

const mediaResources = [
  {
    title: "Brand system",
    description:
      "Primary wordmarks, approved lockups, and practical usage guidance.",
  },
  {
    title: "Product imagery",
    description:
      "Talent profiles, Pholio ID, portfolio tools, and agency workflows.",
  },
  {
    title: "Company background",
    description:
      "Approved boilerplate, product overview, mission, and company context.",
  },
  {
    title: "Interviews and comment",
    description:
      "Briefings on talent discovery, portfolio intelligence, and digital identity.",
  },
];

const backgroundLinks = [
  {
    title: "For talent",
    description: "How Pholio helps talent present, verify, and share their work.",
    href: "/talent",
  },
  {
    title: "For agencies",
    description: "The discovery and review workflow built for agency teams.",
    href: "/agency",
  },
  {
    title: "AI notice",
    description: "How Pholio describes its AI-assisted features and data use.",
    href: "/ai-notice",
  },
];

function PressLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="group inline-flex min-h-11 w-fit items-center gap-3 border-b border-[#A8894E] pb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#655126] transition-colors hover:text-[#171712] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8894E] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FAF7F2] active:translate-y-px"
    >
      <span>{children}</span>
      <ArrowUpRight
        aria-hidden="true"
        size={15}
        strokeWidth={1.6}
        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </a>
  );
}

export default function PressPage() {
  return (
    <main className="min-h-mobile-screen bg-[#FAF7F2] text-[#171712]">
      <ThemeColor color="#FAF7F2" />

      <section className="mx-auto grid min-h-[100dvh] w-full max-w-[1440px] grid-cols-1 gap-8 px-6 pb-8 pt-32 sm:gap-12 sm:pb-12 md:px-12 md:pb-16 md:pt-36 lg:grid-cols-[0.82fr_1.18fr] lg:items-end lg:gap-16">
        <PressReveal className="flex max-w-xl flex-col items-start lg:pb-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#655126]">
            Press &amp; media
          </p>
          <h1 className="mt-7 max-w-[8ch] font-editorial text-6xl leading-[0.94] tracking-[-0.045em] sm:text-7xl lg:text-[clamp(5.2rem,8vw,8.6rem)]">
            The newsroom.
          </h1>
          <p className="mt-8 max-w-md text-base leading-7 text-[#55544E] md:text-lg">
            Company news, verified background, and resources for reporting on
            Pholio and modern talent discovery.
          </p>
          <div className="mt-9">
            <PressLink href={PRESS_HREF}>Press inquiries</PressLink>
          </div>
        </PressReveal>

        <PressReveal
          className="relative min-h-60 sm:min-h-[42vh] lg:min-h-[68vh]"
          delay={0.12}
        >
          <Image
            src="/images/press/press-hero-studio.webp"
            alt="A model working with a photographer and stylist in a fashion studio."
            fill
            priority
            sizes="(max-width: 1023px) 100vw, 58vw"
            className="object-cover object-center saturate-[0.72] contrast-[1.03]"
          />
        </PressReveal>
      </section>

      <section
        id="company"
        className="border-t border-[#171712]/15 px-6 py-24 md:px-12 md:py-32"
      >
        <div className="mx-auto grid max-w-[1344px] grid-cols-1 gap-16 lg:grid-cols-[1.3fr_0.7fr] lg:gap-24">
          <PressReveal>
            <p className="font-mono text-[10px] text-[#77746B]">
              Approved company boilerplate
            </p>
            <h2 className="mt-6 max-w-3xl font-editorial text-4xl leading-[1.04] tracking-[-0.035em] sm:text-5xl md:text-6xl">
              The short version of what Pholio is and who it serves.
            </h2>
            <p className="mt-10 max-w-3xl text-lg leading-8 text-[#3F3E39] md:text-xl md:leading-9">
              {boilerplate}
            </p>
            <CopyBoilerplate text={boilerplate} />
          </PressReveal>

          <PressReveal
            className="grid grid-cols-2 content-start gap-x-8"
            delay={0.08}
          >
            {brandFacts.map((fact) => (
              <dl
                key={fact.label}
                className="border-t border-[#171712]/20 py-6 sm:py-8"
              >
                <dt className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#77746B]">
                  {fact.label}
                </dt>
                <dd className="mt-3 text-sm leading-6 text-[#25241F] sm:text-base">
                  {fact.value}
                </dd>
              </dl>
            ))}
          </PressReveal>
        </div>
      </section>

      <section className="border-t border-[#171712]/15 px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1344px]">
          <PressReveal>
            <h2 className="max-w-3xl font-editorial text-5xl leading-[0.98] tracking-[-0.04em] sm:text-6xl md:text-7xl">
              News and company updates.
            </h2>
          </PressReveal>

          <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-[1.35fr_0.65fr] lg:gap-24">
            <PressReveal>
              <article>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#655126]">
                  {pressUpdates[0].date}
                </p>
                <h3 className="mt-6 max-w-3xl font-editorial text-4xl leading-[1.05] tracking-[-0.03em] sm:text-5xl md:text-6xl">
                  {pressUpdates[0].title}
                </h3>
                <p className="mt-8 max-w-2xl text-base leading-7 text-[#55544E] md:text-lg">
                  {pressUpdates[0].summary}
                </p>
              </article>
            </PressReveal>

            <PressReveal className="space-y-10" delay={0.08}>
              {pressUpdates.slice(1).map((item) => (
                <article
                  key={item.title}
                  className="border-t border-[#171712]/20 pt-7"
                >
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#655126]">
                    {item.date}
                  </p>
                  <h3 className="mt-5 font-editorial text-3xl leading-[1.08] tracking-[-0.025em]">
                    {item.title}
                  </h3>
                  <p className="mt-5 text-sm leading-6 text-[#5C5A53]">
                    {item.summary}
                  </p>
                </article>
              ))}
            </PressReveal>
          </div>
        </div>
      </section>

      <section
        id="media-kit"
        className="border-t border-[#171712]/15 px-6 py-24 md:px-12 md:py-32"
      >
        <div className="mx-auto max-w-[1344px]">
          <PressReveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#655126]">
              Media resources
            </p>
            <h2 className="mt-6 max-w-3xl font-editorial text-5xl leading-[0.98] tracking-[-0.04em] sm:text-6xl md:text-7xl">
              Source material for a stronger story.
            </h2>
            <p className="mt-8 max-w-xl text-base leading-7 text-[#55544E] md:text-lg">
              Approved assets are available through the press desk for editorial
              use.
            </p>
          </PressReveal>

          <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-12 md:grid-rows-2">
            <PressReveal className="relative min-h-[520px] bg-[#E9E5DE] md:col-span-7 md:row-span-2">
              <Image
                src="/images/press/press-portrait-monochrome.webp"
                alt="A model in sculptural black tailoring photographed in high-contrast monochrome."
                fill
                sizes="(max-width: 767px) 100vw, 58vw"
                className="object-cover object-center"
              />
            </PressReveal>

            <PressReveal
              className="relative min-h-[330px] overflow-hidden bg-[#D8C0BC] md:col-span-5"
              delay={0.06}
            >
              <Image
                src="/images/press/press-duo-editorial.webp"
                alt="Two models in white tailoring photographed against a raw studio floor."
                fill
                sizes="(max-width: 767px) 100vw, 42vw"
                className="object-cover object-center saturate-[0.76]"
              />
            </PressReveal>

            <PressReveal
              className="relative min-h-[330px] overflow-hidden bg-[#E7E0D2] md:col-span-5"
              delay={0.12}
            >
              <Image
                src="/images/press/press-yellow-editorial.webp"
                alt="Two models in black and yellow geometric tailoring with white sunglasses."
                fill
                sizes="(max-width: 767px) 100vw, 42vw"
                className="object-cover object-[center_62%] saturate-[0.84]"
              />
            </PressReveal>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-x-12 sm:grid-cols-2">
            {mediaResources.map((resource) => (
              <div
                key={resource.title}
                className="border-t border-[#171712]/20 py-7 sm:py-8"
              >
                <h3 className="font-editorial text-2xl tracking-[-0.02em]">
                  {resource.title}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-6 text-[#5C5A53]">
                  {resource.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5">
            <PressLink href={PRESS_HREF}>Press inquiries</PressLink>
          </div>
        </div>
      </section>

      <section className="border-t border-[#171712]/15 px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1344px]">
          <PressReveal>
            <h2 className="max-w-2xl font-editorial text-5xl leading-[0.98] tracking-[-0.04em] sm:text-6xl">
              Useful background.
            </h2>
          </PressReveal>

          <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-0">
            {backgroundLinks.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={`group block border-t border-[#171712]/20 py-7 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8894E] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FAF7F2] md:min-h-48 md:px-8 md:py-8 ${
                  index === 0 ? "md:pl-0" : "md:border-l"
                }`}
              >
                <div className="flex items-start justify-between gap-6">
                  <h3 className="font-editorial text-3xl tracking-[-0.025em]">
                    {item.title}
                  </h3>
                  <ArrowUpRight
                    aria-hidden="true"
                    size={17}
                    strokeWidth={1.5}
                    className="mt-1 shrink-0 text-[#655126] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </div>
                <p className="mt-5 max-w-xs text-sm leading-6 text-[#5C5A53]">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#171712]/15 px-6 py-24 md:px-12 md:py-36">
        <PressReveal className="mx-auto grid max-w-[1344px] grid-cols-1 gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <h2 className="max-w-4xl font-editorial text-5xl leading-[0.98] tracking-[-0.04em] sm:text-6xl md:text-7xl">
              Working on a story about Pholio?
            </h2>
            <p className="mt-8 max-w-2xl text-base leading-7 text-[#55544E] md:text-lg">
              Contact the press desk for interviews, product demonstrations,
              background briefings, or approved media assets.
            </p>
          </div>
          <div className="lg:pb-1">
            <PressLink href={PRESS_HREF}>Press inquiries</PressLink>
            <p className="mt-5 font-mono text-[10px] text-[#77746B]">
              {PRESS_EMAIL}
            </p>
          </div>
        </PressReveal>
      </section>

      <MarketingFooter />
    </main>
  );
}
