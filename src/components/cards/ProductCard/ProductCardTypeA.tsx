import { product } from '@/types';
import { Search, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
 
interface ProductCardTypeProps {
   link: string | undefined   ,
            data: product, // Passing the full product object as 'data'
            mainColor: string,
            key: number 
}

const ProductCardTypeA = ({ link,
            data, // Passing the full product object as 'data'
            mainColor}:ProductCardTypeProps) => {
  return (
    <Link
    href={`/products/${link}`}
className="group relative  rounded-3xl bg-white shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden"                            >
                                     {/* Product Image */}
                                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                                        <img
                                            alt={data.name}
                                            width={300}
                                            height={300}
                                            src={data.images[0]}
            className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                                            loading="lazy"
                                        />
                                        {/* Quick Actions overlay */}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                                            <button
                                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-800 hover:text-indigo-600 hover:scale-110 transition-all"
                                                aria-label="عرض التفاصيل"
                                            >
                                                <Search size={20} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Product Info */}
                                    <div className="p-5 flex-1 flex flex-col">
                                        
                                        <h3 className="font-bold text-gray-900 text-lg mb-2 leading-snug line-clamp-2 hover:text-indigo-600 transition-colors cursor-pointer">
                                            { data.name}
                                        </h3>

                                        <div className="mt-auto flex items-center justify-between">
                                            <div>
                                                <span className="block text-lg font-bold text-gray-900">
                                                    { data.price} دج
                                                </span>
                                                    {Number(data.Oldprice) > 0 && <span className="text-sm text-gray-400 line-through">
                                                        {data.Oldprice}
                                                    </span>}
                                                
                                            </div>
                                            <button
                                                style={{ background: mainColor }}
                                                className="text-white p-2.5 rounded-lg hover:opacity-90 transition-colors shadow-lg shadow-indigo-200"
                                                aria-label="buy"
                                            >
                                                <ShoppingCart size={20} />
                                            </button>
                                        </div>
                                    </div>
                             </Link>
  )
}

export default ProductCardTypeA