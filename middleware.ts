// middleware.ts

import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const url = req.nextUrl;
    const host = req.headers.get("host") || "";

    // If the request is for the app subdomain, rewrite it to the /app directory
    if (host.startsWith("app.")) {
        return NextResponse.rewrite(new URL(`/app${url.pathname}`, req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - images/ (public images)
         */
        "/((?!api|_next/static|_next/image|favicon.ico|images).*)",
    ],
};