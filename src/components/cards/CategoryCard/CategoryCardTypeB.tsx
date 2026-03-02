interface CategoryCardTypeProps {
    image: string;
    isActive: boolean;
name: string;
mainColor?: string
onClick: (a:string)=> void
}
const CategoryCardTypeB = ({image, name, mainColor, onClick, isActive}:CategoryCardTypeProps)  => {
  return (
     <div
     onClick={() =>onClick(name)}
     className="w-11/12 sm:w-52 h-36 relative rounded-2xl shadow-sm hover:shadow-lg overflow-hidden flex items-end">
            {/* Background image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${image})` }}
            >
                {/* Dark overlay only on image */}
                <div className="absolute inset-0 bg-black/30"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 p-3 text-white w-full">
                <strong>{name}</strong>
                <button
                style={{backgroundColor: mainColor || "black"}}
                className=" text-white px-3 py-1 rounded-xl w-full mt-2">
                    explore
                </button>
            </div>
        </div>
  )
}

export default CategoryCardTypeB