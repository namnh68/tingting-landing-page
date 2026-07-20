import { ZALO_GROUP_LINK, ZALO_PERSONAL_LINK } from "./constants";

export const CTV_ID_HEADER = "x-ctv-id";
export const CTV_PATH_HEADER = "x-ctv-path";
export const DEFAULT_QR = "/qr-code.jpg";
export const DEFAULT_SHARE_RATE = 80;

export interface CtvConfig {
  zaloGroupLink: string;
  zaloPersonalLink: string;
  qrImage: string;
  /** % hoa hồng chia lại cho khách của CTV này, vd 70 hoặc 80. */
  shareRate: number;
}

export const DEFAULT_CTV: CtvConfig = {
  zaloGroupLink: ZALO_GROUP_LINK,
  zaloPersonalLink: ZALO_PERSONAL_LINK,
  qrImage: DEFAULT_QR,
  shareRate: DEFAULT_SHARE_RATE,
};

// Keyed by full hostname (subdomain or CTV custom domain). Scale <20 CTVs — static map, no DB.
export const CTV_MAP: Record<string, CtvConfig> = {
  "ainguyen.vnting.com": {
    zaloGroupLink: "https://zalo.me/g/k6o4d5ruhxt7r5zv8vpt",
    zaloPersonalLink: "https://zalo.me/g/icqgkh803",
    qrImage: "/images/ctv/ainguyen/ainguyen-qr.jpg",
    shareRate: 70,
  },
};

function normalizeHost(host: string): string {
  return host.split(":")[0].toLowerCase().replace(/^www\./, "");
}

export function resolveCtvId(host?: string | null): string {
  if (!host) return "default";
  const normalized = normalizeHost(host);
  return normalized in CTV_MAP ? normalized : "default";
}

export function getConfigById(id: string): CtvConfig {
  if (id === "default") return DEFAULT_CTV;
  return CTV_MAP[id] ?? DEFAULT_CTV;
}
