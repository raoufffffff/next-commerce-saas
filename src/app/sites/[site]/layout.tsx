import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Pixels from "@/components/Analytics/Pixels";
import Header from "@/components/Header";
import { getStore } from "@/lib/api";

export const revalidate = false;

// This layout only lives in [site], so it ONLY gets 'site'.
interface LayoutParams {
    site: string;
}

export async function generateMetadata({
    params,
}: {
    params: Promise<LayoutParams>; // Use specific type
}): Promise<Metadata> {
    const { site } = await params;

    // Cast the result to the correct type
    const data = await getStore(site);
    const store = data?.store;

    if (!store) {
        return {
            title: "Store Not Found",
        };
    }

    return {
        title: store.website.store_name,
        description: `Welcome to ${store.website.store_name}'s store`,
        icons: {
            icon: store.website.logo,
        },
        openGraph: {
            title: store.website.store_name,
            description: `Welcome to ${store.website.store_name}'s store`,
            images: [store.website.logo || ""],
        },
    };
}

export default async function StoreLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<LayoutParams>;
}) {
    const { site } = await params;
    const data = await getStore(site);
    const store = data?.store;

    if (!store) return notFound();

    return (
        <div>
            <Pixels
                fbId={store.website.facebookPixel}
            // tiktokId={store.website.TiktokPixel}
            />

            <Header store={store.website} />

            <main className="min-h-screen mt-32">{children}</main>

            <footer className="p-4 bg-gray-100 text-center mt-10">
                <p>
                    All rights reserved © {new Date().getFullYear()} {store.name}
                </p>
            </footer>
        </div>
    );
}