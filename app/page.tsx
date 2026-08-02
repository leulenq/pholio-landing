import TemporaryLanding from "@/components/TemporaryLanding";
import PageWrapper from "@/components/PageWrapper";

/** True on live production deploys (Netlify CONTEXT or Vercel production). */
function isProductionDeploy() {
  return (
    process.env.VERCEL_ENV === "production" ||
    process.env.CONTEXT === "production"
  );
}

export default function Home() {
  if (isProductionDeploy()) {
    return <TemporaryLanding />;
  }

  return <PageWrapper />;
}
