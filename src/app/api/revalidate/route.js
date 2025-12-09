import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function POST(request) {
    try {
        const body = await request.json();
        const { tag, secret } = body;

        // 1. حماية بسيطة (تذكر وضع الكود في .env لاحقاً)
        if (secret !== "MY_SECRET_KEY_123") {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        // 2. إذا وصلنا اسم التاج، نحذف الكاش الخاص به
        if (tag) {
            revalidateTag(tag);
            console.log(`♻️ Revalidated tag: ${tag}`);
            return NextResponse.json({ revalidated: true, now: Date.now() });
        }

        return NextResponse.json({ revalidated: false, message: "Missing tag" });
    } catch (err) {
        console.error(err); // طباعة الخطأ في التيرمينال للمساعدة
        return NextResponse.json({ message: 'Error' }, { status: 500 });
    }
}