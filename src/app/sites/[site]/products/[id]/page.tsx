import { notFound } from 'next/navigation';

// Components
import ProductGallery from '@/components/ProductGallery';
import CheckoutForm from '@/components/CheckoutForm';
import Tags from '@/components/Tags';
import { CheckCircle } from 'lucide-react';

// API Helpers
import { getProduct, getStore } from '@/lib/api';
import { PageParams } from '@/types';
import Visit from '@/components/Analytics/Visit';

export const revalidate = false;

export const dynamicParams = true;

export async function generateStaticParams() {
    return [];
}

// ---------------------------------------------------------
// 🔍 2. SEO & Metadata 
// ---------------------------------------------------------
export async function generateMetadata({ params }: { params: Promise<PageParams> }) {
    const { id, site } = await params;


    const product = await getProduct(id, site);

    if (!product) return { title: 'المنتج غير متوفر' };

    return {
        title: `${product.name} | أفضل الأسعار`,
        description: product.ShortDescription || `اشتري ${product.name} الآن بأفضل سعر في الجزائر`,
        openGraph: {
            title: product.name,
            description: product.ShortDescription,
            images: product.images && product.images[0] ? [
                {
                    url: product.images[0],
                    width: 800,
                    height: 600,
                    alt: product.name,
                }
            ] : [],
        },
    };
}

// ---------------------------------------------------------
// 🎨 3. Main Page Component // ---------------------------------------------------------
export default async function ProductPage({ params }: { params: Promise<PageParams> }) {
    const { id, site } = await params;

    // 🔥 Parallel Fetching
    const [storeData, product] = await Promise.all([
        getStore(site),
        getProduct(id, site)
    ]);

     

    if (!product || !storeData) {
        notFound();
    }


    const {  store, StoreDlevryPrices} = storeData

    
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product?.name,
        description: product?.ShortDescription,
        image: product?.images,
        offers: {
            '@type': 'Offer',
            priceCurrency: 'DZD',
            price: product?.price,
            availability: 'https://schema.org/InStock',
            url: `https://${site}/products/${id}`, // رابط المنتج
        },
    };

    return (
        <div dir="rtl" className="min-h-screen bg-gray-50 font-sans text-gray-800 pb-20 mt-20">

            {/* حقن بيانات JSON-LD في رأس الصفحة */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <main className="container mx-auto relative grid grid-cols-1 md:grid-cols-12 px-4 py-8 max-w-7xl gap-6">

                {/* 📸 RIGHT COLUMN (Desktop): Product Details & Gallery (Cols 7) */}
                <div className="md:col-span-7 space-y-6">

                    {/* Gallery Component (Client Island) */}
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-4">
                        <ProductGallery
                            LadingPages={product?.LadingPages}
                            images={product?.images}
                            title={product?.name}
                            mainColor={storeData?.store?.mainColor}
                        />
                    </div>

                    {/* Product Info Block */}
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                            {product?.name}
                        </h1>

                        <div className="flex items-center flex-wrap gap-4 mb-6">
                            <span className="text-4xl font-extrabold text-indigo-600">
                                {Number(product?.price).toLocaleString()} د.ج
                            </span>
                            {Number(product?.Oldprice) > 0  && (
                                <span className="text-xl text-gray-400 line-through decoration-red-400 decoration-2">
                                    {Number(product.Oldprice).toLocaleString()} د.ج
                                </span>
                            )}
                            {/* Badge Example */}
                            <span className="bg-green-100 text-green-700 text-sm font-bold px-3 py-1 rounded-full flex items-center gap-1">
                                <CheckCircle size={14} /> متوفر حالياً
                            </span>
                        </div>

                        {/* Tags */}
                        {product?.tags && product.tags.length > 0 && (
                            <div className="mb-6 border-t border-gray-100 pt-4">
                                <Tags tags={product.tags} />
                            </div>
                        )}

                        {/* Description */}
                      {product?.ShortDescription &&  <div className="prose prose-indigo max-w-none text-right text-gray-600 leading-relaxed">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">الوصف:</h3>
                            <p>{product?.ShortDescription}</p>
                        </div>}
                    </div>

                    {/* Extra Note Block (if exists) */}
                    {product?.note && (
                        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-amber-800 text-sm">
                            <strong>ملاحظة هامة: </strong> {product.note}
                        </div>
                    )}
                </div>
            <Visit image={product.images[0]} page={product._id || ""} store={storeData.store?._id || ""} />

                {/* 🛒 LEFT COLUMN (Desktop): Sticky Checkout Form (Cols 5) */}
                <div className="md:col-span-5 h-fit md:sticky md:top-24">
                    <CheckoutForm
                    beru={store?.enableBureau || false}
                        tiktokp={store?.tiktokPixel?.id  || null}
                        facebookp={store?.facebookPixel?.id  || null}
user={storeData.store?.user}
                        mainColor={store?.mainColor  || '#4F46E5'}
                        StoreDlevryPrices={StoreDlevryPrices}
                        product={product}
                    />

                    {/* Trust Badges (Optional Visuals) */}
                    <div className="mt-4 flex justify-center gap-4 opacity-60 grayscale">
                        {/* أضف صور طرق الدفع أو الضمان هنا لزيادة الثقة */}
                    </div>
                </div>

            </main>
        </div>
    );
}