import { notFound } from "next/navigation";

// دالة جلب البيانات مع تفعيل الـ ISR Tags
async function getStoreFromApi(subdomain) {
    try {
        // 👇 السر هنا: تفعيل التاج باسم المتجر
        const res = await fetch('https://true-fit-dz-api.vercel.app/user', {
            next: {
                tags: [`store-${subdomain}`], // مثال: store-lazemdeals
                // revalidate: 3600 // (اختياري) تحديث تلقائي كل ساعة كاحتياط
            }
        });

        if (!res.ok) throw new Error('Failed to fetch');

        const data = await res.json();

        // ملاحظة: الأفضل مستقبلاً جعل الـ API يجلب متجراً واحداً فقط بدلاً من البحث في المصفوفة
        // GET /api/store?subdomain=lazemdeals
        const store = data.result.find((user) => user.repoName === subdomain);

        return store || null;
    } catch (error) {
        console.error("API Error:", error);
        return null;
    }
}

export default async function ShopPage({ params }) {
    const { site } = await params;

    const store = await getStoreFromApi(site);

    if (!store) return notFound();

    // ... باقي الكود كما هو
    return (
        <div style={{ padding: 50 }}>
            <h1 className="text-4xl font-bold">{store.username || store.name}</h1>
            {/* ... */}
        </div>
    );
}