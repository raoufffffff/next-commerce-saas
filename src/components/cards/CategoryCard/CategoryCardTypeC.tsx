interface CategoryCardTypeProps {
    image: string;
name: string;
mainColor?: string;
isActive: boolean;
onClick: (s:string)=>void;

}
const CategoryCardTypeC =({image, name, mainColor, onClick, isActive}:CategoryCardTypeProps)  => {
  return (
     <div
     onClick={()=> onClick(name)}
     className={`
  w-11/12 md:w-44 rounded-2xl transition-all
  ${isActive ? "border-2 border-indigo-500 shadow-xl scale-105" : "border border-gray-200"}
`}
     >
        
            <img src={image} className='w-full hover:scale-105 rounded-xl h-40 object-cover' alt={name} />
            <div
                className='mt-auto flex justify-center flex-col p-3 z-[500]  '
            >
                <span
                    className='text-center mx-auto'
                >{name}</span>
                <button
                                style={{backgroundColor: mainColor || "black"}}

                    className='   text-white  px-3 py-1 rounded-xl w-full mt-2'
                >
                    explore
                </button>
            </div>
        </div>
  )
}

export default CategoryCardTypeC