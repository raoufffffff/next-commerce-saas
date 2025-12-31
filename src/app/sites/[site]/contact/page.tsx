import { getStore } from '@/lib/api';
import { notFound } from 'next/navigation';
import {
    Phone,
    Mail,
    MessageCircle,
    Facebook,
    Instagram,
} from 'lucide-react';
import { PageParams, UserData } from '@/types';

export const revalidate = false;
export const dynamic = "force-static";


export default async function ContactPage({ params }: { params: Promise<PageParams> }) {
    // 1. Await params (Next.js 15)
    const { site } = await params;

    // 2. Fetch Data
    const data = await getStore(site);
    const store = data?.store as UserData | undefined;

    if (!store) return notFound();

    // 3. Extract Data
    // We use optional chaining and empty object fallback to prevent crashes
    const {
        email,
        facebook,
        instagram,
        tiktok,
        whatsapp,
        phone,
    } = store.website || {};

    const main_color = store.website?.main_color || '#4F46E5';

    // 4. Helper function to check if a value exists
    const hasVal = (val?: string | null): boolean => {
        return !!(val && val.length > 0);
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans" dir="rtl">

            {/* --- Header Section --- */}
            <div className="bg-white border-b border-gray-200 py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                        تواصل معنا
                    </h1>
                    <p className="text-gray-500 max-w-2xl mx-auto mb-6">
                        نحن هنا لمساعدتك. اختر الطريقة التي تناسبك للتواصل معنا.
                    </p>
                    <div
                        className="h-1 w-20 mx-auto rounded-full"
                        style={{ backgroundColor: main_color }}
                    ></div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-5xl">

                {/* --- Contact Methods Grid --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">

                    {/* Phone Card */}
                    {hasVal(phone) && (
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow group">
                            <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 bg-gray-50 group-hover:scale-110 transition-transform">
                                <Phone size={32} style={{ color: main_color }} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">رقم الهاتف</h3>
                            <p className="text-gray-500 mb-6" dir="ltr">{phone}</p>
                            <a
                                href={`tel:${phone}`}
                                className="inline-block px-6 py-2 rounded-lg text-white font-medium transition-opacity hover:opacity-90"
                                style={{ backgroundColor: main_color }}
                            >
                                اتصل الآن
                            </a>
                        </div>
                    )}

                    {/* WhatsApp Card */}
                    {hasVal(whatsapp) && (
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow group">
                            <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 bg-gray-50 group-hover:scale-110 transition-transform">
                                <MessageCircle size={32} className="text-green-500" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">واتساب</h3>
                            <p className="text-gray-500 mb-6">تحدث معنا مباشرة</p>
                            <a
                                href={`https://wa.me/${whatsapp}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block px-6 py-2 rounded-lg text-white font-medium transition-opacity hover:opacity-90 bg-green-500"
                            >
                                فتح المحادثة
                            </a>
                        </div>
                    )}

                    {/* Email Card */}
                    {hasVal(email) && (
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow group">
                            <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 bg-gray-50 group-hover:scale-110 transition-transform">
                                <Mail size={32} style={{ color: main_color }} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">البريد الإلكتروني</h3>
                            <p className="text-gray-500 mb-6">{email}</p>
                            <a
                                href={`mailto:${email}`}
                                className="inline-block px-6 py-2 rounded-lg text-white font-medium transition-opacity hover:opacity-90"
                                style={{ backgroundColor: main_color }}
                            >
                                إرسال رسالة
                            </a>
                        </div>
                    )}

                    {/* Address Card (Optional) */}

                </div>

                {/* --- Social Media Section --- */}
                {(hasVal(facebook) || hasVal(instagram) || hasVal(tiktok)) && (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8">تابعنا على مواقع التواصل</h2>
                        <div className="flex flex-wrap justify-center gap-4">

                            {hasVal(facebook) && (
                                <a href={facebook} target="_blank" rel="noopener noreferrer" className="p-4 bg-white rounded-full shadow-sm border border-gray-200 hover:text-blue-600 hover:border-blue-600 transition-all hover:-translate-y-1">
                                    <Facebook size={28} />
                                </a>
                            )}

                            {hasVal(instagram) && (
                                <a href={instagram} target="_blank" rel="noopener noreferrer" className="p-4 bg-white rounded-full shadow-sm border border-gray-200 hover:text-pink-600 hover:border-pink-600 transition-all hover:-translate-y-1">
                                    <Instagram size={28} />
                                </a>
                            )}

                            {hasVal(tiktok) && (
                                <a href={tiktok} target="_blank" rel="noopener noreferrer" className="p-4 bg-white rounded-full shadow-sm border border-gray-200 hover:text-black hover:border-black transition-all hover:-translate-y-1">
                                    {/* Lucide doesn't have TikTok yet, using generic or text */}
                                    <svg viewBox="0 0 24 24" fill="currentColor" height="28" width="28">
                                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                                    </svg>
                                </a>
                            )}



                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}