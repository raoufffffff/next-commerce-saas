import ProductGallery from '@/components/ProductGallery';
import CheckoutForm from '@/components/CheckoutForm';
import { CheckCircle } from 'lucide-react';
import { getProduct, getStore } from '@/lib/api';

// ---------------------------------------------------------
// 🚀 1. إعدادات الكاش (Static Configuration)
// ---------------------------------------------------------

// ✅ هذا يضمن أن البيانات تبقى في الكاش للأبد حتى تأمر أنت بتحديثها
export const revalidate = false;

// ✅ يسمح بإنشاء صفحات جديدة عند الطلب (لأنك لا تعرف كل الـ IDs وقت البناء)
export const dynamicParams = true;

// ⚡️ السحر هنا: هذه الدالة تخبر Next.js أن هذه الصفحة "Static"
// بإرجاع مصفوفة فارغة، نحن نقول: "لا تبنِ شيئاً الآن، ابنِ الصفحة عند أول زيارة واحفظها كـ Static HTML"
export async function generateStaticParams() {
    return [];
}

// ---------------------------------------------------------
// 🔍 2. SEO Metadata
// ---------------------------------------------------------
export async function generateMetadata({ params }) {
    const { id, site } = await params;
    const product = await getProduct(id, site);

    // حماية في حال كان المنتج غير موجود
    if (!product) return { title: 'Product Not Found' };

    return {
        title: `${product.name} | DZ Shop`,
        description: product.ShortDescription || "next-commerce",
    };
}

// ---------------------------------------------------------
// 🎨 3. Page Component
// ---------------------------------------------------------
export default async function ProductPage({ params }) {
    const { id, site } = await params;

    // 🔥 تحسين الأداء: جلب المتجر والمنتج في نفس الوقت (Parallel Fetching)
    // هذا يقلل وقت الانتظار للنصف تقريباً عند "أول زيارة" قبل الكاش
    const [storeData, product] = await Promise.all([
        getStore(site),
        getProduct(id, site)
    ]);

    // معالجة حالة الخطأ أو عدم وجود البيانات
    if (!product || !storeData) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-500">
                عذراً، المنتج أو المتجر غير متوفر.
            </div>
        );
    }

    const { livPrice, result: store } = storeData; // تأكد أن هيكلة البيانات تطابق الـ API

    return (
        <div dir="rtl" className="min-h-screen bg-gray-50 font-sans text-gray-800 pb-20 mt-20">

            <main className="container mx-auto relative grid grid-cols-1 md:grid-cols-2 px-4 py-8 max-w-6xl gap-5">

                {/* LEFT: PRODUCT */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-4 md:p-8 mb-8">
                    <ProductGallery LadingPages={product.LadingPages} images={product.images} title={product.name} />

                    <div className="flex flex-col mt-5">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

                        <div className="flex items-end gap-3 mb-6">
                            <span className="text-4xl font-extrabold text-indigo-600">{product.price} د.ج</span>
                            {/* إخفاء السعر القديم إذا لم يكن موجوداً */}
                            {product.oldPrice && (
                                <span className="text-lg text-gray-400 line-through mb-1">{product.oldPrice} د.ج</span>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-8">
                            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
                                <CheckCircle size={18} className="text-green-500" /> توصيل سريع
                            </div>
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mt-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">تفاصيل المنتج</h2>
                        <div className="prose prose-indigo max-w-none text-right">
                            {product.ShortDescription}
                        </div>
                    </div>
                </div>

                {/* RIGHT: STICKY CHECKOUT FORM */}
                <div className="md:sticky md:top-24 h-fit">
                    {/* تأكدنا من وجود store قبل الوصول إلى خصائصه لتجنب الأخطاء */}
                    <CheckoutForm
                        mainColor={store?.website?.main_color || '#000'}
                        livPriceapi={livPrice}
                        product={product}
                    />
                </div>

            </main>
        </div>
    );
}