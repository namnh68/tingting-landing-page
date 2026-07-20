import { NextResponse, type NextRequest } from "next/server";
import { resolveCtvId, CTV_ID_HEADER, CTV_PATH_HEADER, CTV_MAP } from "@/lib/ctv-config";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host");

  let id = resolveCtvId(host);
  if (process.env.NODE_ENV === "development") {
    const devCtv = req.nextUrl.searchParams.get("ctv");
    if (devCtv && devCtv in CTV_MAP) id = devCtv;
  }

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set(CTV_ID_HEADER, id);
  requestHeaders.set(CTV_PATH_HEADER, req.nextUrl.pathname);

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!_next/|api/|images/|.*\\..*|favicon.ico|robots.txt|sitemap.xml).*)"],
};
