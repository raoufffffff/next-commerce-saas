import { product, StatePrice, Store } from "@/types";

// lib/api.ts
const api =  "https://api.next-commerce.shop";
 
// process.env.NEXT_PUBLIC_API as string ||




interface StoreResponse {
    store: Store | null;
    StoreDlevryPrices: StatePrice[] | null; // Replace 'any' with specific delivery price type if known
}

// This interface ensures getProducts matches what ProductList expects
export interface ProductAPIResponse {
    result: product[];
}

// --- API Functions ---

export async function getStore(subdomain: string): Promise<StoreResponse | null> {
    try {
        // 👇 The secret is here: activating the tag with the store name (for cache invalidation)
        const res = await fetch(`${api}/api/public/store/${subdomain}`, {
            cache: "force-cache",
            next: {
                revalidate: false,
                tags: [`store-${subdomain}`], // Example tag
            },
        });

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();


        // Note: In the future, it is better to make the API fetch only one store instead of searching the array
        const store = data.result;
        const StoreDlevryPrices = data.StoreDlevryPrices;

        return { store, StoreDlevryPrices };
    } catch (error) {
        console.error("getStore Error:", error);
        return null;
    }
}

export async function getProducts(subdomain: string, id: string): Promise<ProductAPIResponse> {
    try {
        // Assume you have an API to fetch products based on the store name/ID
        const res = await fetch(`${api}/api/public/products/store/${id}`, {
            cache: "force-cache",
            next: { tags: [`products-${subdomain}`] }, // ✅ The same tag is present here too!
        });

        if (!res.ok) {
            // ⚠️ Important Fix: Return an empty 'result' array instead of just [], 
            // so the component using products.result.filter() doesn't crash.
            return { result: [] };
        }

        const data = await res.json();
        return data; // Assuming API returns { result: [...] }
    } catch (error) {
        console.error("getProducts Error:", error);
        return { result: [] };
    }
}

export async function getProduct(id: string, subdomain: string): Promise<product | null> {
    try {
        const res = await fetch(`${api}/api/public/products/one/${id}`, {
            cache: "force-cache",
            next: {
                revalidate: false,
                tags: [`products-${subdomain}`],
            },
        });

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        console.log(
            `🔥🔥 [DATABASE HIT] Fetching single product for: ${subdomain} at: ${new Date().toISOString()} 🔥🔥`
        );

        // Note: In the future, optimize API to fetch single item directly if not already done
        const product = data.result;
        console.log(product);
        
        return product;
    } catch (error) {
        console.error("API Error (getProduct):", error);
        return null;
    }
}