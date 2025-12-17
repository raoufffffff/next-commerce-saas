import { getProducts } from '@/lib/api';
import ProductAndCategories from './ProductAndCategories';

export default async function ProductList({ Categories, subdomain, id, mainColor, logo }) {
    const products = await getProducts(subdomain, id);
    return (
        <section className="px-5" id="products">
            <ProductAndCategories logo={logo} mainColor={mainColor} products={products} Categories={Categories} />

        </section>
    );
}