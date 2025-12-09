import { NextResponse } from "next/server";

export const config = {
    matcher: ["/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)"],
};

export default function middleware(req) {
    const url = req.nextUrl;
    const hostname = req.headers.get("host") || "";

    // تأكد من ضبط هذا المتغير في Vercel Environment Variables
    // القيمة في فيرسل يجب أن تكون: next-commerce.com (بدون https)
    const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3000";

    console.log("🔥 Hostname detected:", hostname);

    let currentHost = hostname
        .replace(`.${rootDomain}`, "")
        .replace(`.${rootDomain}:3000`, ""); // حماية إضافية للوكال

    // تنظيف البورت في حالة بقي عالقاً (للحماية فقط)
    if (currentHost.includes(":")) {
        currentHost = currentHost.split(":")[0];
    }


    // الشرط الذكي: يقارن بالمتغير rootDomain بدلاً من الكتابة اليدوية
    // إذا كان الرابط هو الدومين الأصلي، أو www، أو اللوكال هوست
    if (
        currentHost === "app" || // 👈 أضف هذا السطر هنا في البداية
        currentHost === "www" ||
        currentHost === rootDomain ||
        hostname === rootDomain ||
        currentHost === "localhost"
    ) {
        return NextResponse.next();
    }

    // التوجيه للمتجر
    // ملاحظة: تأكد أن اسم المجلد لديك هو sites (بدون underscore)
    url.pathname = `/sites/${currentHost}${url.pathname}`;

    console.log("🔄 Rewriting to:", url.pathname);
    return NextResponse.rewrite(url);
}