import { product } from '@/types';
import { Search, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

interface ProductCardTypeProps {
   link: string | undefined   ,
            data: product, // Passing the full product object as 'data'
            mainColor: string,
            key: number
}


const ProductCardTypeB = ({
  link,
            data, // Passing the full product object as 'data'
            mainColor
}: ProductCardTypeProps) => {
  return (
    <Link
    href={`/products/${link}`}
 
    className="group relative rounded-3xl bg-white shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden">
      
      {/* Glow Border */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
        style={{ background: mainColor }}
      />

      <div className="relative z-10 bg-white rounded-3xl overflow-hidden flex flex-col h-full">
        
        {/* Image */}
        <div className="relative overflow-hidden">
          <img
            src={data.images[0]}
            alt={data.name}
            className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Price Badge */}
          <div
            className="absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-bold text-white shadow-lg"
            style={{ background: mainColor }}
          >
            {data.price} دج
          </div>

          {/* Hover Actions */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-4">
            <button className="w-12 h-12 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:scale-110 transition">
              <Search size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-extrabold text-gray-900 text-lg leading-snug line-clamp-2 mb-2 group-hover:text-indigo-600 transition">
            {data.name}
          </h3>

         { Number(data.Oldprice) > 0  && <div className="flex items-center gap-2 mb-4">
            <span className="text-sm line-through text-gray-400">
              {data.Oldprice} دج
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-600 font-semibold">
              SALE
            </span>
          </div>}

          <button
            style={{ background: mainColor }}
            className="mt-auto flex items-center justify-center gap-2 py-3 rounded-xl text-white font-semibold tracking-wide hover:opacity-90 transition shadow-lg"
          >
            <ShoppingCart size={18} />
                                                           buy 

          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCardTypeB;
