"use client";

import Image from "next/image";
import React, { useState } from "react";
import { PackageOpen } from "lucide-react";
import { Category, product, Store } from "@/types";

// Import your card variants
import CategoryCardTypeA from "./cards/CategoryCard/CategoryCardTypeA";
import CategoryCardTypeB from "./cards/CategoryCard/CategoryCardTypeB";
import CategoryCardTypeC from "./cards/CategoryCard/CategoryCardTypeC";
import ProductCardTypeA from "./cards/ProductCard/ProductCardTypeA";
import ProductCardTypeB from "./cards/ProductCard/ProductCardTypeB";
import ProductCardTypeC from "./cards/ProductCard/ProductCardTypeC";

// --- Types & Interfaces ---
interface ProductData {
    result: product[];
}

interface ProductAndCategoriesProps {
    products: ProductData;
    Categories: Category[];
    mainColor: string;
    logo: string;
    store: Store;
}

const ProductAndCategories = ({
    store,
    products,
    Categories,
    mainColor,
    logo,
}: ProductAndCategoriesProps) => {
    const [cat, setCat] = useState<string>("all");
    
    // Get styles from store (Default to 'A' if missing)
    const categoryStyle = store.CategoryCardType || "A";
    const productStyle = store.ProductCardType || "A";

    // Filter products
    const filteredProducts =
        cat === "all"
            ? products.result.filter((e) => e.show)
            : products.result
                .filter((e) => e.show)
                .filter((product) => product.type === cat);

    // --- Helper to Render Category Cards ---
    const renderCategoryCard = (item: { name: string; image: string; displayName?: string }, index: number) => {
        const isActive = cat === item.name;
        // Use displayName if available (for "All"), otherwise use name
        const label = item.displayName || item.name; 

        // FIX: Removed 'key' from this object
        const props = {
            image: item.image,
            name: label,
            isActive: isActive,
            onClick: () => setCat(item.name),
            mainColor: mainColor
        };

        // FIX: Applied 'key' directly to the JSX element
        switch (categoryStyle) {
            case "B": return <CategoryCardTypeB key={index} {...props} />;
            case "C": return <CategoryCardTypeC key={index} {...props} />;
            default:  return <CategoryCardTypeA key={index} {...props} />;
        }
    };

    // --- Helper to Render Product Cards ---
    const renderProductCard = (item: product, index: number) => {
        // FIX: Removed 'key' from this object to avoid the Type Error
        const props = {
            data: item, // Passing the full product object as 'data'
            mainColor: mainColor,
            link: item._id
        };

        // FIX: Ensure key is always a string or number (fallback to index if _id is missing)
        const uniqueKey =   index;

        // FIX: Applied 'key' directly to the JSX element
        switch (productStyle) {
            case "B": return <ProductCardTypeB key={uniqueKey} {...props} />;
            case "C": return <ProductCardTypeC key={uniqueKey} {...props} />;
            default:  return <ProductCardTypeA key={uniqueKey} {...props} />;
        }
    };

    return (
        <div
         >
            {/* --- CATEGORIES SECTION --- */}
            {Categories.length > 0 && (
                <section className="bg-white" id="categories">
                    <div className="container mx-auto px-4 md:px-8">
                        {/* Header */}
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                تصفح حسب الأقسام
                            </h2>
                            <div
                                style={{ background: mainColor || "#4F46E5" }}
                                className="w-16 h-1 mx-auto rounded-full"
                            ></div>
                        </div>

                        {/* Scrollable Container */}
                        <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide">
                            
                            {/* 1. The 'All' Category (Rendered dynamically to match style) */}
                            {renderCategoryCard({
                                name: "all",
                                displayName: "الكل",
                                image: logo // Use store logo for "All"
                            }, 999)}

                            {/* 2. The Dynamic Categories */}
                            {Categories.map((catItem, i) => 
                                renderCategoryCard(catItem, i)
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* --- PRODUCTS SECTION --- */}
            <div className="container mx-auto px-4 md:px-8">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">منتجاتنا</h2>
                    <div
                        className="w-16 h-1 mx-auto rounded-full"
                        style={{ backgroundColor: mainColor || "#4F46E5" }}
                    ></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {filteredProducts.length === 0 ? (
                        <section className="px-5 py-20 col-span-full" id="products">
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
                        // Render filtered products using the dynamic helper
                        // FIX: Passing 'i' (index) to helper function
                        filteredProducts.map((product, i) => renderProductCard(product, i))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductAndCategories;