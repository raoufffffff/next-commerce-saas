import { getStore } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import { PageParams, UserData } from "@/types";

export const revalidate = false;
export const dynamic = "force-static";



export default async function ThankYouPage({
    params,
}: {
    params: Promise<PageParams>;
}) {
    // 1. Await parameters (Next.js 15 requirement)
    const { site } = await params;

    // 2. Fetch store data (Cached - very fast)
    // We cast the result to ensure TypeScript knows the shape
    const data = await getStore(site);
    const store = data?.store as UserData | null;

    // Handle case where store might not exist (optional safety)
    if (!store) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                Store not found
            </div>
        );
    }

    // Extract data with default values to avoid errors
    const logo = store.website.logo;
    const storeName = store.website?.store_name || "The Store";

    // Primary store color (fallback to green if not found)
    const primaryColor =
        store.website?.main_color;

    // Transparent version for backgrounds
    const primaryColorLight = `${primaryColor}15`;

    // Simulate an order number (In a real app, pass this via query params or context)
    const simulatedOrderNumber = (Math.random() * 10000).toFixed(0);

    return (
        <div
            dir="rtl"
            className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4"
        >
            {/* Thank You Card */}
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden animate-fade-in-up">

                {/* 1. Header & Logo Area */}
                <div className="bg-gray-50 p-8 flex flex-col items-center border-b border-gray-100">
                    {logo ? (
                        <div className="relative w-24 h-24 mb-4">
                            <Image
                                src={logo}
                                alt={storeName}
                                fill
                                className="object-contain"
                            />
                        </div>
                    ) : (
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            {storeName}
                        </h2>
                    )}
                </div>

                {/* 2. Animated Success Icon */}
                <div className="flex justify-center -mt-10 relative z-10">
                    <div className="bg-white p-2 rounded-full shadow-sm">
                        <div
                            className="w-20 h-20 rounded-full flex items-center justify-center animate-bounce-slow"
                            style={{ backgroundColor: primaryColorLight }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-10 w-10"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke={primaryColor}
                                strokeWidth={3}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* 3. Thank You Text & Instructions */}
                <div className="text-center px-8 py-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">
                        شكراً لطلبك!
                    </h1>
                    <p className="text-gray-500 text-sm mb-6">
                        تم استلام طلبك بنجاح رقم{" "}
                        <span className="font-mono font-bold text-gray-700">
                            #{simulatedOrderNumber}
                        </span>
                    </p>

                    {/* 4. What Happens Next (Crucial for Algeria/COD markets) */}
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-right mb-8">
                        <h3 className="font-bold text-blue-800 text-sm mb-3 flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                            ماذا سيحدث الآن؟
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-sm text-gray-600">
                                <div className="bg-white p-1 rounded shadow-sm min-w-[24px] flex justify-center text-xs font-bold text-blue-600">
                                    1
                                </div>
                                <span>
                                    سيقوم فريقنا بالاتصال بك هاتفياً لتأكيد الطلب والعنوان في أقرب
                                    وقت.
                                </span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-gray-600">
                                <div className="bg-white p-1 rounded shadow-sm min-w-[24px] flex justify-center text-xs font-bold text-blue-600">
                                    2
                                </div>
                                <span>
                                    بعد التأكيد، سيتم شحن المنتج إليك والدفع يكون عند الاستلام.
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* 5. Return Button */}
                    <Link
                        href={`/`}
                        className="block w-full text-white font-bold py-4 rounded-xl shadow-lg hover:opacity-90 transition transform hover:-translate-y-1"
                        style={{ backgroundColor: primaryColor }}
                    >
                        العودة للتسوق
                    </Link>

                    {/* Support Link */}
                    <div className="mt-6 text-xs text-gray-400">
                        تواجه مشكلة؟{" "}
                        <Link href="/contact" className="underline hover:text-gray-600">
                            تواصل معنا
                        </Link>
                    </div>
                </div>
            </div>

            {/* Small Footer */}
            <p className="mt-8 text-gray-400 text-sm">
                جميع الحقوق محفوظة © {storeName}
            </p>
        </div>
    );
}