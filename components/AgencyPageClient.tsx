"use client";

import AgencyHero from "@/components/agency/HeroSection";
import AgencyValueBand from "@/components/agency/AgencyValueBand";
import DashboardPreview from "@/components/agency/DashboardPreview";
import FeatureMatch from "@/components/agency/FeatureMatch";
import FeatureDiscovery from "@/components/agency/FeatureDiscovery";
import FeaturePipeline from "@/components/agency/FeaturePipeline";
import FeatureAnalytics from "@/components/agency/FeatureAnalytics";
import SocialProof from "@/components/agency/SocialProof";
import AgencyCTA from "@/components/agency/FinalCTA";
import MarketingFooter from "@/components/MarketingFooter";

export default function AgencyPageClient() {
  return (
    <main className="agency-marketing min-h-screen">
      <AgencyHero />
      <AgencyValueBand />
      <DashboardPreview />
      <FeatureMatch />
      <FeatureDiscovery />
      <FeaturePipeline />
      <FeatureAnalytics />
      <SocialProof />
      <AgencyCTA />
      <MarketingFooter theme="dark" />
    </main>
  );
}
