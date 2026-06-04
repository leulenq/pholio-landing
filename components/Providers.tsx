"use client";

import type { ReactNode } from "react";
import { PholioAuthProvider } from "@/lib/pholio-auth/PholioAuthProvider";

export default function Providers({ children }: { children: ReactNode }) {
  return <PholioAuthProvider>{children}</PholioAuthProvider>;
}
