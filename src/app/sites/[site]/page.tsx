import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductList from "@/components/ProductList";
import { getStore } from "@/lib/api";
import { PageParams, UserData } from "@/types";

export const revalidate = false;
export const dynamic = "force-static";



export async function generateMetadata({
    params,
}: {
    params: Promise<PageParams>;
}): Promise<Metadata> {
    const { site } = await params;
    const { store } = (await getStore(site)) as { store: UserData | null };

    return {
        title: store ? store.website.store_name : "Shop",
        description: "Browse our categories",
    };
}

export default async function ShopPage({
    params,
}: {
    params: Promise<PageParams>;
}) {
    const { site } = await params;
    const { store } = (await getStore(site)) as { store: UserData | null };

    if (!store) return notFound();

    // Filter categories to only show active ones
    const activeCategories = store.Categories.filter((e) => e.show);

    return (
        <div className="min-h-screen">
            <ProductList
                logo={store.website.logo}
                Categories={activeCategories}
                mainColor={store.website.main_color}
                subdomain={site}
                id={store._id}
            />
        </div>
    );
}