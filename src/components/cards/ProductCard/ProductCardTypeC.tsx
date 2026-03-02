import { product } from '@/types';
import { Search, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

interface ProductCardTypeProps {
   link: string | undefined   ,
            data: product, // Passing the full product object as 'data'
            mainColor: string,
            key: number
}


const ProductCardTypeC = ({
  link,
            data, // Passing the full product object as 'data'
            mainColor
}: ProductCardTypeProps) => {
  return (
    <Link
    href={`/products/${link}`}

    className="group   bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-gray-300 hover:-translate-y-1 hover:shadow-xl flex flex-col">
      
      {/* Image */}
      <div className="relative bg-gray-50">
        <img
          src={data.images[0]}
          alt={data.name}
          className="w-full h-60 object-contain  transition-transform duration-500 group-hover:scale-105"
        />

        {/* Quick view */}
        <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:shadow-md">
          <Search size={18} />
        </button>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-gray-900 font-semibold text-base leading-snug line-clamp-2 mb-3">
          {data.name}
        </h3>

        <div className="flex items-end gap-2 mb-5">
          <span className="text-xl font-bold text-gray-900">
            {data.price} دج
          </span>
         {Number(data.Oldprice) > 0 && <span className="text-sm text-gray-400 line-through">
            {data.Oldprice} دج
          </span>}
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 mb-4" />

        {/* Actions */}
        <div className="flex items-center gap-3 mt-auto">
          <button
            className="flex-1 py-3 rounded-xl text-white font-medium transition"
            style={{ background: mainColor }}
          >
           buy
          </button>

          <button className="w-12 h-12 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition">
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCardTypeC;
