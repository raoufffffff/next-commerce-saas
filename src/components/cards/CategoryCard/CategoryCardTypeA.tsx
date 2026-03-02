 interface CategoryCardTypeProps {
    image: string;
name: string;
mainColor?: string;
isActive: boolean ;
onClick: (a:string)=> void
 }

const CategoryCardTypeA = ({image, name, onClick, isActive}:CategoryCardTypeProps) => {
  return (
   <div
   onClick={()=> onClick(name)}
                                    // 👇 Added min-w-[160px] to fix width and flex-shrink-0 so they don't squish
                                    className="group flex-shrink-0 min-w-[160px] md:min-w-[180px] snap-center flex flex-col items-center p-6 bg-white rounded-2xl border border-gray-100 hover:border-indigo-200 hover:shadow-xl transition-all duration-300 cursor-pointer text-center"
                                >
                                    {/* Image Container */}
                                    <div className="relative w-24 h-24 mb-4 rounded-full bg-gray-50 group-hover:bg-indigo-50 flex items-center justify-center overflow-hidden transition-colors duration-300">
                                        <img
                                            alt={name}
                                            src={image}
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className="object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>

                                    {/* Text Content */}
                                    <h3 className="font-bold text-gray-800 text-lg mb-1 group-hover:text-indigo-600 transition-colors whitespace-nowrap">
                                        {name}
                                    </h3>

                                </div>
                            
  )
}

export default CategoryCardTypeA