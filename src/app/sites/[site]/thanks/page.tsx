import { getStore } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import { PageParams, Store } from "@/types";
import { CheckCircle, Copy, ArrowRight, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";

export const revalidate = false;
export const dynamic = "force-static";

export default async function ThankYouPage({
    params,
}: {
    params: Promise<PageParams>;
}) {
    const { site } = await params;
    const data = await getStore(site);
    const store = data?.store as Store | null;

    if (!store) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                Store not found
            </div>
        );
    }

    // Map the store config to the layout style you wanted
    const thanksConfig = store.thanks;
    const mainColor = store.mainColor || "#0D9488";
    const storeName = store.storeName || "متجرنا";
    return (
        <div
            dir="rtl"
            className="min-h-screen   flex flex-col items-center justify-center p-4 font-sans"
        >
            <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 overflow-hidden border border-gray-100">
                
                {/* Logo Section */}
                <div className="pt-10 pb-4 flex flex-col items-center">
                    {store.logo ? (
                        <div className="relative w-20 h-20">
                            <Image
                                src={store.logo}
                                alt={storeName}
                                fill
                                className="object-contain"
                            />
                        </div>
                    ) : (
                        <span className="font-bold text-xl">{storeName}</span>
                    )}
                </div>

                {/* Main Content Area */}
                <div className="p-6 flex flex-col items-center text-center space-y-6 min-h-[400px]">
                    
                    {/* Animated Success Icon */}
                    {thanksConfig.img && (
                        <div 
                            className="w-24 h-24 rounded-full flex items-center justify-center animate-in zoom-in duration-500 scale-110"
                            style={{ backgroundColor: `${mainColor}10` }}
                        >
                            <CheckCircle size={48} style={{ color: mainColor }} strokeWidth={2.5} />
                        </div>
                    )}

                    {/* Titles & Description */}
                    <div className="space-y-3">
                        {thanksConfig.title && (
                            <h2 className="text-2xl font-black text-gray-900 leading-tight">
                                {thanksConfig.titleText || "شكراً لطلبك!"}
                            </h2>
                        )}
                        {thanksConfig.about && (
                            <p className="text-gray-500 leading-relaxed px-6">
                                {thanksConfig.aboutText || "لقد استلمنا طلبك بنجاح، سنتصل بك قريباً لتأكيد المعلومات."}
                            </p>
                        )}
                    </div>

                    {/* Divider */}
                    {(thanksConfig.phone || thanksConfig.homeButton) && (
                        <div className="w-full border-t border-dashed border-gray-200" />
                    )}

                    {/* Action Area (Phone & Home Button) */}
                    <div className="w-full space-y-4 pt-2">
                        {thanksConfig.phone && (
                            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 transition-all hover:bg-gray-100/50">
                                <p className="text-xs text-gray-400 mb-2">هل لديك استفسار؟ اتصل بنا:</p>
                                <div className="flex items-center justify-center gap-3 font-mono font-bold text-gray-800 bg-white py-3 rounded-xl border border-gray-200 shadow-sm cursor-pointer active:scale-95 transition-transform">
                                    <Phone size={16} style={{ color: mainColor }} /> 
                                    {store.contacts?.phone || "0555 55 55 55"}
                                    <Copy size={14} className="text-gray-300 mr-1" />
                                </div>
                            </div>
                        )}

                        {thanksConfig.homeButton && (
                            <Link
                                href="/"
                                className="w-full py-4 rounded-2xl text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg transition-all hover:opacity-90 active:scale-95 shadow-teal-900/10"
                                style={{ backgroundColor: mainColor }}
                            >
                                العودة للرئيسية <ArrowRight size={18} className="rotate-180" />
                            </Link>
                        )}
                    </div>

                    {/* Footer Social Media */}
                    {thanksConfig.media && (
                        <div className="pt-6 mt-auto">
                            <p className="text-[10px] text-gray-400 mb-4 uppercase tracking-[0.2em] font-bold">تابعنا على</p>
                            <div className="flex justify-center gap-5">
                                <a href="#" className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center hover:scale-110 transition"><FaFacebookF size={16} /></a>
                                <a href="#" className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center hover:scale-110 transition"><FaInstagram size={16} /></a>
                                <a href="#" className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center hover:scale-110 transition"><FaTiktok size={16} /></a>
                            </div>
                        </div>
                    )}

                </div>
            </div>

            {/* Bottom Credits */}
            <p className="mt-8 text-gray-400 text-xs tracking-wide">
                جميع الحقوق محفوظة © {storeName} {new Date().getFullYear()}
            </p>
        </div>
    );
}