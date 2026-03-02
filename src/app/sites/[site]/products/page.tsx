import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductList from "@/components/ProductList";
import { getStore } from "@/lib/api";
import { PageParams } from "@/types";

export const dynamic = "force-static";
export const revalidate = false;

export async function generateStaticParams() {
    return [];
}

export async function generateMetadata({
    params,
}: {
    params: Promise<PageParams>;
}): Promise<Metadata> {
    const { site } = await params;
    const data = await getStore(site);
    const store = data?.store;

    return {
        title: store ? store.storeName : "Shop",
        description: "Browse our categories",
    };
}

export default async function ShopPage({
    params,
}: {
    params: Promise<PageParams>;
}) {
    const { site } = await params;
    const data = await getStore(site);
    const store = data?.store;

    if (!store) return notFound();

    const activeCategories = store.categories.filter((e) => e.show);

    return (
        <div className="min-h-screen">
            <ProductList
                store={store}
                logo={store.logo}
                Categories={activeCategories}
                mainColor={store.mainColor}
                subdomain={site}
                id={store._id}
            />
        </div>
    );
}