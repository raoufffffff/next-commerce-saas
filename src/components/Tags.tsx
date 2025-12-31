import { CheckCircle } from 'lucide-react'
import React from 'react'

const Tags = ({ tags }: { tags: string[] }) => {


    return (
        <div className={`grid  grid-cols-2 gap-3  mb-8`} >
            {tags.map((e, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
                    <CheckCircle size={18} className="text-green-500" /> {e}
                </div>
            ))}
        </div>
    )
}

export default Tags