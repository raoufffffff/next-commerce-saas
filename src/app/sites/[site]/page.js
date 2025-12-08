import { notFound } from "next/navigation";
import { stores } from "@/data/stores";

// تعريف النوع ليكون Promise (تغيير مهم في Next.js 15)

// الدالة يجب أن تكون async
export default async function ShopPage({ params }) {

    // ⚠️ الخطوة السحرية: يجب انتظار البارامترات أولاً
    const { site } = await params;

    console.log("📂 Site param resolved:", site);

    // الآن يمكنك استخدامه
    // @ts-ignore
    const store = stores[site];

    if (!store) return notFound();

    const deliveryInfo = store.delivery.type === 'fixed'
        ? `سعر التوصيل: ${store.delivery.price} دج`
        : `يبدأ التوصيل من ${store.delivery.base} دج`;

    return (
        <div style={{ padding: 50, backgroundColor: store.theme === 'red' ? '#ffebeb' : '#e6f7ff' }}>
            <h1 className="text-4xl font-bold">{store.name}</h1>
            <div className="mt-10 p-5 border bg-white rounded shadow">
                <h2 className="text-xl">تفاصيل التوصيل:</h2>
                <p className="text-lg font-bold text-green-600">{deliveryInfo}</p>
            </div>
        </div>
    );
}