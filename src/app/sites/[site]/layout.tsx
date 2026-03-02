import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Pixels from "@/components/Analytics/Pixels";
import Header from "@/components/Header";
import { getStore } from "@/lib/api";

export const dynamic = "force-static";
export const revalidate = false;

interface LayoutParams {
    site: string;
}

export async function generateStaticParams() {
    return [];
}

export async function generateMetadata({
    params,
}: {
    params: Promise<LayoutParams>;
}): Promise<Metadata> {
    const { site } = await params;
    const data = await getStore(site);
    const store = data?.store;

    if (!store) {
        return { title: "Store Not Found" };
    }

    return {
        title: store.storeName,
        description: `Welcome to ${store.storeName}'s store`,
        icons: {
            icon: store.logo,
        },
        openGraph: {
            title: store.storeName,
            description: `Welcome to ${store.storeName}'s store`,
            images: [store.logo || ""],
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
            <Pixels fbId={store.facebookPixel} />
            <Header store={store} />
            <main className="min-h-screen mt-32">{children}</main>
            <footer className="p-4 bg-gray-100 text-center mt-10">
                <p>
                    All rights reserved © {new Date().getFullYear()} {store.storeName}
                </p>
            </footer>
        </div>
    );
}