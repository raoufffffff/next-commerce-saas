export const revalidate = false;
export const dynamic = "force-static";

import { getStore } from '@/lib/api';
import { notFound } from 'next/navigation';
import FaqAccordion from '@/components/FaqAccordion'; // Ensure this path is correct
import { PageParams, UserData } from '@/types';

const page = async ({ params }: { params: Promise<PageParams> }) => {
    // 1. Await params (Next.js 15 requirement)
    const { site } = await params;

    // 2. Fetch Data
    const data = await getStore(site);
    const store = data?.store as UserData | undefined;
    if (!store) return notFound();

    // 3. Extract Data safely
    // 'faqs' is likely inside store.website
    const faqs = store.website?.faqs || [];
    // 'main_color' is likely at the root of store
    const main_color = store.website?.main_color || '#000000';

    return (
        <div className="min-h-screen bg-gray-50 font-sans" dir="rtl">

            {/* Header Section */}
            <div className="bg-white border-b border-gray-200 py-12 md:py-16 mb-8">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                        الأسئلة الشائعة
                    </h1>
                    <div
                        className="h-1 w-20 mx-auto rounded-full"
                        style={{ backgroundColor: main_color }}
                    ></div>
                </div>
            </div>

            {/* Accordion Section */}
            <div className="container mx-auto px-4 pb-20 max-w-3xl">
                <FaqAccordion faqs={faqs} mainColor={main_color} />
            </div>

        </div>
    );
}

export default page;