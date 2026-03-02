import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductList from "@/components/ProductList";
import { getStore } from "@/lib/api";
import { PageParams, Store } from "@/types";
import Visit from "@/components/Analytics/Visit";

export const revalidate = false;
export const dynamic = "force-static";



export async function generateMetadata({
    params,
}: {
    params: Promise<PageParams>;
}): Promise<Metadata> {
    const { site } = await params;
    const { store } = (await getStore(site)) as { store: Store | null };

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
    const { store } = (await getStore(site)) as { store: Store | null };

    if (!store) return notFound();

    // Filter categories to only show active ones
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
            <Visit image={store.logo} page="home" store={store._id} />
        </div>
    );
}