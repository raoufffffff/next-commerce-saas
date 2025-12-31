"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { ShoppingCart, Search, PackageOpen } from "lucide-react";
import { Category, Product } from "@/types";

// --- Types & Interfaces ---






interface ProductData {
    result: Product[];
}

interface ProductAndCategoriesProps {
    products: ProductData;
    Categories: Category[];
    mainColor: string;
    logo: string;
}

const ProductAndCategories = ({
    products,
    Categories,
    mainColor,
    logo,
}: ProductAndCategoriesProps) => {
    const [cat, setCat] = useState<string>("all");

    // Filter products based on the selected category and visibility status
    const filteredProducts =
        cat === "all"
            ? products.result.filter((e) => e.show)
            : products.result
                .filter((e) => e.show)
                .filter((product) => product.type === cat);

    return (
        <div>
            {Categories.length > 0 && (
                <section className="bg-white" id="categories">
                    <div className="container mx-auto px-4 md:px-8">
                        {/* Header */}
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                تصفح حسب الأقسام
                            </h2>
                            <div
                                style={{
                                    background: mainColor || "#4F46E5",
                                }}
                                className="w-16 h-1 mx-auto rounded-full"
                            ></div>
                        </div>

                        {/* 👇 SCROLLABLE CONTAINER */}
                        {/* Changed grid to flex + overflow-x-auto */}
                        <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide">
                            {/* 'All' Category Button */}
                            <div
                                onClick={() => setCat("all")}
                                // 👇 Added min-w-[160px] to fix width and flex-shrink-0 so they don't squish
                                className="group flex-shrink-0 min-w-[160px] md:min-w-[180px] snap-center flex flex-col items-center p-6 bg-white rounded-2xl border border-gray-100 hover:border-indigo-200 hover:shadow-xl transition-all duration-300 cursor-pointer text-center"
                            >
                                {/* Image Container */}
                                <div className="relative w-24 h-24 mb-4 rounded-full bg-gray-50 group-hover:bg-indigo-50 flex items-center justify-center overflow-hidden transition-colors duration-300">
                                    <Image
                                        alt={"all_cats"}
                                        src={logo}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                                    />
                                </div>

                                {/* Text Content */}
                                <h3 className="font-bold text-gray-800 text-lg mb-1 group-hover:text-indigo-600 transition-colors whitespace-nowrap">
                                    كل
                                </h3>
                                <p className="text-sm text-gray-400 font-medium">منتجات</p>
                            </div>

                            {/* Dynamic Categories */}
                            {Categories.map((catItem, i) => (
                                <div
                                    key={i}
                                    onClick={() => setCat(catItem.name)}
                                    // 👇 Added min-w-[160px] to fix width and flex-shrink-0 so they don't squish
                                    className="group flex-shrink-0 min-w-[160px] md:min-w-[180px] snap-center flex flex-col items-center p-6 bg-white rounded-2xl border border-gray-100 hover:border-indigo-200 hover:shadow-xl transition-all duration-300 cursor-pointer text-center"
                                >
                                    {/* Image Container */}
                                    <div className="relative w-24 h-24 mb-4 rounded-full bg-gray-50 group-hover:bg-indigo-50 flex items-center justify-center overflow-hidden transition-colors duration-300">
                                        <Image
                                            alt={catItem.name}
                                            src={catItem.image}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className="object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>

                                    {/* Text Content */}
                                    <h3 className="font-bold text-gray-800 text-lg mb-1 group-hover:text-indigo-600 transition-colors whitespace-nowrap">
                                        {catItem.name}
                                    </h3>

                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <div className="container mx-auto px-4 md:px-8">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">منتجاتنا</h2>
                    <div
                        className="w-16 h-1 mx-auto rounded-full"
                        style={{ backgroundColor: mainColor || "#4F46E5" }} // Use dynamic color
                    ></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {filteredProducts.length === 0 ? (
                        <section className="px-5 py-20" id="products">
                            <div className="container mx-auto px-4 text-center">
                                <div className="flex flex-col items-center justify-center space-y-4">
                                    <div className="bg-gray-50 p-6 rounded-full border border-gray-100">
                                        <PackageOpen size={64} className="text-gray-300" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900">
                                        لا توجد منتجات حالياً
                                    </h3>
                                    <p className="text-gray-500 max-w-md mx-auto">
                                        لم يتم إضافة أي منتجات لهذا المتجر بعد. يرجى التحقق مرة أخرى
                                        لاحقاً.
                                    </p>
                                </div>
                            </div>
                        </section>
                    ) : (
                        filteredProducts.map((product) => (
                            <article
                                key={product._id}
                                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 group flex flex-col"
                            >
                                <Link href={`/products/${product._id}`}>
                                    {/* Product Image */}
                                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                                        <Image
                                            alt={product.name}
                                            width={300}
                                            height={300}
                                            src={product.images[0]}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                            loading="lazy"
                                        />
                                        {/* Quick Actions overlay */}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                                            <button
                                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-800 hover:text-indigo-600 hover:scale-110 transition-all"
                                                aria-label="عرض التفاصيل"
                                            >
                                                <Search size={20} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Product Info */}
                                    <div className="p-5 flex-1 flex flex-col">
                                        <div className="text-xs text-indigo-600 font-semibold mb-2">
                                            {product.type}
                                        </div>
                                        <h3 className="font-bold text-gray-900 text-lg mb-2 leading-snug line-clamp-2 hover:text-indigo-600 transition-colors cursor-pointer">
                                            {product.name}
                                        </h3>

                                        <div className="mt-auto flex items-center justify-between">
                                            <div>
                                                <span className="block text-lg font-bold text-gray-900">
                                                    {product.price} دج
                                                </span>
                                                {product.Oldprice && (
                                                    <span className="text-sm text-gray-400 line-through">
                                                        {product.Oldprice}
                                                    </span>
                                                )}
                                            </div>
                                            <button
                                                style={{ background: mainColor }}
                                                className="text-white p-2.5 rounded-lg hover:opacity-90 transition-colors shadow-lg shadow-indigo-200"
                                                aria-label="أضف للسلة"
                                            >
                                                <ShoppingCart size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            </article>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductAndCategories;