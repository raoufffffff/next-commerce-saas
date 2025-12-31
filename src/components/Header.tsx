'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

const Header = ({ store }: { store: any }) => {
    // 1. Destructure Data
    const { store_name, logo, header } = store || {};

    // Default colors if not provided
    const headerColor = header?.headercolor || '#ffffff';
    const textColor = header?.namecolor || '#000000';
    const iconColor = header?.barcolor || '#000000';

    // 2. State
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // 3. Scroll Listener
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 4. Dynamic Styles logic
    // If scrolled: white background, black text. 
    // If top: custom background, custom text.
    const currentBg = headerColor;
    const currentText = textColor;
    const currentIcon = iconColor;

    return (
        <header
            dir="rtl"
            className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-md py-2' : 'py-4'
                }`}
            style={{ backgroundColor: currentBg }}
        >
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex justify-between items-center">

                    {/* --- Logo & Name --- */}
                    <Link href="/" className="flex items-center gap-3">
                        {header.logo && (
                            <div className="relative w-14 h-14">
                                <Image
                                    src={logo}
                                    alt={store_name || 'Logo'}
                                    fill
                                    className="object-contain"
                                    sizes="100px"
                                    priority // Load logo immediately
                                />
                            </div>
                        )}
                        {header.name && (
                            <h1
                                className="text-xl font-bold leading-tight"
                                style={{ color: currentText }}
                            >
                                {store_name}
                            </h1>
                        )}
                    </Link>

                    {/* --- Desktop Navigation --- */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="/" className="font-medium hover:opacity-75 transition-opacity" style={{ color: currentText }}>الرئيسية</Link>
                        <Link href="/products" className="font-medium hover:opacity-75 transition-opacity" style={{ color: currentText }}>المنتجات</Link>
                        {/* <Link href="/about" className="font-medium hover:opacity-75 transition-opacity" style={{ color: currentText }}>عن المتجر</Link> */}
                        <Link href="/faq" className="font-medium hover:opacity-75 transition-opacity" style={{ color: currentText }}>الأسئلة الشائعة</Link>
                        <Link href="/contact" className="font-medium hover:opacity-75 transition-opacity" style={{ color: currentText }}>اتصل بنا</Link>
                    </nav>

                    {/* --- Mobile Menu Button --- */}
                    <button
                        className="md:hidden p-2 rounded-full hover:bg-black/5 transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="القائمة"
                        style={{ color: currentIcon }}
                    >
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* --- Mobile Dropdown Menu --- */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-lg">
                    <nav className="flex flex-col p-4 space-y-1">
                        <Link
                            href="/"
                            onClick={() => setIsMenuOpen(false)}
                            className="block py-3 px-2 text-gray-800 font-medium hover:bg-gray-50 hover:text-indigo-600 rounded-lg transition-colors"
                        >
                            الرئيسية
                        </Link>
                        <Link
                            href="/products"
                            onClick={() => setIsMenuOpen(false)}
                            className="block py-3 px-2 text-gray-800 font-medium hover:bg-gray-50 hover:text-indigo-600 rounded-lg transition-colors"
                        >
                            المنتجات
                        </Link>
                        {/* <Link
                            href="/about"
                            onClick={() => setIsMenuOpen(false)}
                            className="block py-3 px-2 text-gray-800 font-medium hover:bg-gray-50 hover:text-indigo-600 rounded-lg transition-colors"
                        >
                            عن المتجر
                        </Link> */}
                        <Link
                            href="/faq"
                            onClick={() => setIsMenuOpen(false)}
                            className="block py-3 px-2 text-gray-800 font-medium hover:bg-gray-50 hover:text-indigo-600 rounded-lg transition-colors"
                        >
                            الأسئلة الشائعة
                        </Link>
                        <Link
                            href="/contact"
                            onClick={() => setIsMenuOpen(false)}
                            className="block py-3 px-2 text-gray-800 font-medium hover:bg-gray-50 hover:text-indigo-600 rounded-lg transition-colors"
                        >
                            اتصل بنا
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;