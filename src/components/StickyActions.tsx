'use client';

import { useState, useEffect } from 'react';
import { ShoppingCart, ArrowDown } from 'lucide-react';


export default function StickyActions({ title }: { title: string }) {
    const [showStickyBtn, setShowStickyBtn] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // البحث عن عنصر الفورم بواسطة ID
            const formElement = document.getElementById('checkout-form');

            if (formElement) {
                const rect = formElement.getBoundingClientRect();
                // التحقق مما إذا كان الفورم ظاهراً في الشاشة
                const isFormVisible = (rect.top < window.innerHeight) && (rect.bottom >= 0);

                // إظهار الزر فقط إذا كان الفورم غير ظاهر ونحن قد تجاوزنا بداية الصفحة قليلاً
                setShowStickyBtn(!isFormVisible && window.scrollY > 200);
            } else {
                // في حالة عدم وجود الفورم، نعتمد على السكرول فقط
                setShowStickyBtn(window.scrollY > 500);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToForm = () => {
        // التمرير السلس إلى الفورم
        const formElement = document.getElementById('checkout-form');
        if (formElement) {
            formElement.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <>
            {/* Mobile Sticky Button */}
            <div className={`fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-lg z-50 md:hidden transition-transform duration-300 ${showStickyBtn ? 'translate-y-0' : 'translate-y-full'}`}>
                <button onClick={scrollToForm} className="w-full bg-green-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg">
                    <span>أطلب {title}</span>
                    <ShoppingCart size={20} />
                </button>
            </div>

            {/* Desktop Floating Button */}
            <div className={`fixed bottom-8 left-8 z-40 hidden md:block transition-all duration-300 ${showStickyBtn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
                <button onClick={scrollToForm} className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full shadow-2xl flex items-center gap-2 hover:scale-105 transition-transform">
                    <span>أطلب الآن</span>
                    <ArrowDown size={20} />
                </button>
            </div>
        </>
    );
}
