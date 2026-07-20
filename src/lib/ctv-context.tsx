"use client";

import { createContext, useContext } from "react";
import { DEFAULT_CTV, type CtvConfig } from "./ctv-config";

const CtvContext = createContext<CtvConfig>(DEFAULT_CTV);

export function CtvProvider({
  value,
  children,
}: {
  value: CtvConfig;
  children: React.ReactNode;
}) {
  return <CtvContext.Provider value={value}>{children}</CtvContext.Provider>;
}

export function useCtv(): CtvConfig {
  return useContext(CtvContext);
}
