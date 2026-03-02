import { VariantOption } from "@/types";


interface VariantSelectorProps {
    options: string[];
    type: 'color' | 'size';
    selected: string;
    onSelect: (val: string) => void;
    mainColor: string;
}


const VariantSelector = ({
    options,
    type,
    selected,
    onSelect,
    mainColor,
}: VariantSelectorProps) => {
    if (!options || options.length === 0) return null;

    return (
        <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-900 mb-2">
                {type === 'color' ? 'اللون' : 'الحجم'}:{' '}
                <span className="font-semibold text-indigo-700">{selected}</span>
            </h3>
            <div className="flex gap-3 flex-wrap">
                {options.map((opt, i) => (
                    <button
                        key={i}
                        type="button"
                        onClick={() => onSelect(opt)}
                        className={`transition-all duration-200 ${type === 'size'
                            ? 'px-4 py-2 border rounded-lg'
                            : 'w-10 h-10 rounded-full border shadow-sm'
                            }`}
                        style={{
                            backgroundColor:
                                type === 'color'
                                    ? opt 
                                    : selected === opt 
                                        ? mainColor
                                        : 'white',
                            color:
                                type === 'size' && selected === opt  ? 'white' : 'black',
                            borderColor: selected === opt  ? mainColor : '#e5e7eb',
                            transform: selected === opt  ? 'scale(1.1)' : 'scale(1)',
                            // Use boxShadow to simulate ring since 'ring' isn't a valid inline style property
                            boxShadow:
                                selected === opt  ? `0 0 0 2px ${mainColor}` : 'none',
                        }}
                    >
                        {type === 'size' && opt }
                    </button>
                ))}
            </div>
        </div>
    );
};

export default VariantSelector