export async function getStore(subdomain) {
    try {
        // 👇 السر هنا: تفعيل التاج باسم المتجر
        const res = await fetch(`https://true-fit-dz-api.vercel.app/user/store/${subdomain}`, {
            cache: "force-cache",
            next: {
                revalidate: false,
                tags: [`store-${subdomain}`], // مثال
            }
        });

        if (!res.ok) throw new Error('Failed to fetch');

        const data = await res.json();
        console.log(`🔥🔥 [DATABASE HIT] لجلب بيانات المتجر: ${subdomain} في الوقت: ${new Date().toISOString()} 🔥🔥`);
        // ملاحظة: الأفضل مستقبلاً جعل الـ API يجلب متجراً واحداً فقط بدلاً من البحث في المصفوفة
        const store = data.result;
        const livPrice = data.livPrice
        return { store, livPrice };
    } catch (error) {
        console.error("API Error:", error);
        return null;
    }
}


export async function getProducts(subdomain, id) {
    // افترض أن لديك API لجلب المنتجات بناءً على اسم المتجر
    let res = await fetch(`https://true-fit-dz-api.vercel.app/item/my/${id}`, {
        cache: 'force-cache',
        next: { tags: [`products-${subdomain}`] } // ✅ ونفس التاج موجود هنا أيضاً!
    }
    );

    if (!res.ok) return [];
    res = res.json();
    console.log(`🔥🔥 [DATABASE HIT] لجلب بيانات المتجر: ${subdomain} في الوقت: ${new Date().toISOString()} 🔥🔥`);
    return res
}


export async function getProduct(id, subdomain) {
    try {
        const res = await fetch(`https://true-fit-dz-api.vercel.app/item/${id}`, {
            cache: "force-cache",
            next: {
                revalidate: false,
                tags: [`products-${subdomain}`],
            }
        });

        if (!res.ok) throw new Error('Failed to fetch');

        const data = await res.json();
        console.log(`🔥🔥 [DATABASE HIT] لجلب بيانات المتجر: ${subdomain} في الوقت: ${new Date().toISOString()} 🔥🔥`);
        // ملاحظة: الأفضل مستقبلاً جعل الـ API يجلب متجراً واحداً فقط بدلاً من البحث في المصفوفة
        const product = data.result;
        return product;
    } catch (error) {
        console.error("API Error:", error);
        return null;
    }
}
