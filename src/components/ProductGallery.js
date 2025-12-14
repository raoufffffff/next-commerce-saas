'use client';

import Image from 'next/image';
import { useRef, useState, useCallback } from 'react';
import { PhotoSlider } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

export default function ProductGallery({
    images = [],
    title = "Product Image",
    LadingPages = [],
    mainColor = "#4F46E5",
    language = "ar"
}) {
    const scrollRef = useRef(null);
    const [visible, setVisible] = useState(false);
    const [index, setIndex] = useState(0);

    const scrollToImage = useCallback((idx) => {
        if (!scrollRef.current) return;
        const scrollX = scrollRef.current.clientWidth * idx;
        if (language === "ar") {
            scrollRef.current.scrollTo({ left: -scrollX, behavior: 'smooth' });
        } else {
            scrollRef.current.scrollTo({ left: scrollX, behavior: 'smooth' });
        }
    }, [language]);

    const handleImageClick = useCallback((i) => {
        setIndex(i);
        setVisible(true);
    }, []);

    const handleThumbClick = useCallback((i) => {
        setIndex(i);
        scrollToImage(i);
    }, [scrollToImage]);

    if (!images.length) return null;

    return (
        <div className="space-y-4 select-none">

            {/* --- Main Image Carousel --- */}
            <div
                ref={scrollRef}
                className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth rounded-2xl border border-gray-100 shadow-sm bg-white"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {images.map((src, i) => (
                    <div
                        key={i}
                        // ✅ جعلنا الحاوية relative لكي تعمل خاصية fill بشكل صحيح
                        className="min-w-full snap-center flex justify-center items-center relative aspect-square"
                    >
                        <Image
                            // ❌ حذفنا width و height لأننا نستخدم fill للتجاوب مع كل الشاشات
                            fill
                            src={src}
                            alt={`${title} - View ${i + 1}`}
                            // ✅ أهم تعديل: الأولوية للصورة الأولى فقط!
                            // إذا أعطيت priority للكل، المتصفح سيتجمد لمحاولة تحميلهم جميعاً في نفس الوقت
                            priority={i === 0}
                            sizes="(max-width: 768px) 100vw, 50vw" // ✅ يخبر المتصفح بحجم الصورة المناسب للموبايل
                            onClick={() => handleImageClick(i)}
                            className="object-cover cursor-zoom-in transition-transform duration-500 hover:scale-105"
                        />
                    </div>
                ))}
            </div>

            {/* --- Thumbnail Navigation --- */}
            {images.length > 1 && (
                <div
                    className="flex overflow-x-auto gap-3 px-1 py-1"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {images.map((src, i) => (
                        <button
                            key={i}
                            onClick={() => handleThumbClick(i)}
                            className={`relative min-w-[70px] w-20 h-20 rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-200 ${i === index ? 'ring-2 ring-offset-1' : 'opacity-70 hover:opacity-100'}`}
                            style={{
                                borderColor: i === index ? mainColor : 'transparent',
                                '--tw-ring-color': mainColor,
                            }}
                        >
                            <Image
                                src={src}
                                alt={`Thumbnail ${i + 1}`}
                                fill
                                className="object-cover"
                                sizes="80px" // حجم صغير جداً لتقليل استهلاك البيانات
                            />
                        </button>
                    ))}
                </div>
            )}

            {/* --- Lightbox Modal --- */}
            <PhotoSlider
                images={images.map((src) => ({ src, key: src }))}
                visible={visible}
                onClose={() => setVisible(false)}
                index={index}
                onIndexChange={setIndex}
                overlayRender={(props) => (
                    <div className="absolute bottom-5 left-0 w-full text-center pointer-events-none z-50">
                        <span className="bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                            {props.index + 1} / {images.length}
                        </span>
                    </div>
                )}
            />

            {/* --- Landing Page Images --- */}
            {LadingPages && LadingPages.length > 0 && (
                <div className="mt-8 flex flex-col gap-4">
                    {LadingPages.map((img, idx) => (
                        <div key={`lp-${idx}`} className="relative w-full">
                            {/* استخدمنا Image لكن بدون priority لأن هذه الصور في الأسفل */}
                            <Image
                                src={img}
                                alt={`${title} Detail ${idx + 1}`}
                                width={800} // أبعاد تقريبية للحفاظ على الهيكل (أو استخدم fill مع container)
                                height={1200}
                                // ❌ حذفنا priority={true} من هنا! هذا خطأ قاتل للأداء
                                // ✅ تركنا loading="lazy" لأنها صور ثانوية
                                className="w-full h-auto object-cover rounded-xl shadow-sm border border-gray-100"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}