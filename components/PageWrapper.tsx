"use client";

import dynamic from "next/dynamic";

const ClientPage = dynamic(() => import("@/components/ClientPage"), {
  ssr: false,
});

export default function PageWrapper() {
  return <ClientPage />;
}
