import { getProducts } from '@/lib/api';
import ProductAndCategories from './ProductAndCategories';
import { Category, Product } from '@/types';

// 1. Update Category interface (Optional 'id' to fix previous error)

// 3. Define the API Response structure (The wrapper with "result")
interface ProductAPIResponse {
    result: Product[];
}

// 4. Props Interface
interface ProductListProps {
    Categories: Category[];
    subdomain: string;
    id: string;
    mainColor?: string; // 👈 Allow undefined here
    logo?: string;      // 👈 Allow undefined here
}

export default async function ProductList({
    Categories = [],
    subdomain,
    id,
    mainColor,
    logo,
}: ProductListProps) {
    // 5. Correctly type the API response
    const products: ProductAPIResponse = await getProducts(subdomain, id);

    return (
        <section className="px-5" id="products">
            <ProductAndCategories
                // 6. Fix "string | undefined" error by providing defaults
                logo={logo || ""}
                mainColor={mainColor || "#4F46E5"}
                products={products}
                Categories={Categories}
            />
        </section>
    );
}