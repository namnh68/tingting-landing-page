import { headers } from "next/headers";
import {
  getConfigById,
  CTV_ID_HEADER,
  CTV_PATH_HEADER,
  type CtvConfig,
} from "./ctv-config";

export async function getCtvConfig(): Promise<CtvConfig> {
  const h = await headers();
  return getConfigById(h.get(CTV_ID_HEADER) ?? "default");
}

export async function getCtvMeta(): Promise<{ isDefault: boolean; path: string }> {
  const h = await headers();
  const id = h.get(CTV_ID_HEADER) ?? "default";
  return {
    isDefault: id === "default",
    path: h.get(CTV_PATH_HEADER) ?? "/",
  };
}
