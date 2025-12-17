export const revalidate = false;
export const dynamic = "force-static";
import ProductList from "@/components/ProductList";
import { getStore } from "@/lib/api";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
    const { site } = await params;
    const { store } = await getStore(site);

    return {
        title: store ? store.website.store_name : "Shop",
        description: "Browse our categories",
    };
}

export default async function ShopPage({ params }) {
    const { site } = await params;
    const { store } = await getStore(site);
    if (!store) return notFound();
    const Categories = store.Categories.filter(e => e.show)
    return (
        <div className="min-h-screen">

            <ProductList logo={store.website?.logo} Categories={Categories} mainColor={store.website.main_color} subdomain={site} id={store._id} />
        </div>
    );
}