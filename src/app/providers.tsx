"use client";

import { AlertProvider } from "@/components/custom";

export function Providers({ children }: { children: React.ReactNode }) {
  return <AlertProvider>{children}</AlertProvider>;
}
