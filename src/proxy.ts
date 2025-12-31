import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
    matcher: ["/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)"],
};

export default function middleware(req: NextRequest) {
    const url = req.nextUrl;
    const hostname = req.headers.get("host") || "";

    // Ensure this variable is set in Vercel Environment Variables
    // The value in Vercel should be: next-commerce.com (without https)
    const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3000";


    let currentHost = hostname
        .replace(`.${rootDomain}`, "")
        .replace(`.${rootDomain}:3000`, ""); // Extra protection for localhost

    // Clean the port if it remains stuck (safety measure)
    if (currentHost.includes(":")) {
        currentHost = currentHost.split(":")[0];
    }

    // Smart check: compares with rootDomain variable
    // If the link is the app, www, root domain, or localhost -> do not rewrite
    if (
        currentHost === "app" || // 👈 Added this line at the start as requested
        currentHost === "www" ||
        currentHost === rootDomain ||
        hostname === rootDomain ||
        currentHost === "localhost"
    ) {
        return NextResponse.next();
    }

    // Route to the store
    // Note: Ensure your folder name is 'sites' (without underscore)
    url.pathname = `/sites/${currentHost}${url.pathname}`;

    return NextResponse.rewrite(url);
}