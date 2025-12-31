import { VariantOption } from "@/types";


interface VariantSelectorProps {
    options: VariantOption[];
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
                {type === 'color' ? 'Color' : 'Size'}:{' '}
                <span className="font-semibold text-indigo-700">{selected}</span>
            </h3>
            <div className="flex gap-3 flex-wrap">
                {options.map((opt) => (
                    <button
                        key={opt.name}
                        type="button"
                        onClick={() => onSelect(opt.name)}
                        className={`transition-all duration-200 ${type === 'size'
                            ? 'px-4 py-2 border rounded-lg'
                            : 'w-10 h-10 rounded-full border shadow-sm'
                            }`}
                        style={{
                            backgroundColor:
                                type === 'color'
                                    ? opt.color
                                    : selected === opt.name
                                        ? mainColor
                                        : 'white',
                            color:
                                type === 'size' && selected === opt.name ? 'white' : 'black',
                            borderColor: selected === opt.name ? mainColor : '#e5e7eb',
                            transform: selected === opt.name ? 'scale(1.1)' : 'scale(1)',
                            // Use boxShadow to simulate ring since 'ring' isn't a valid inline style property
                            boxShadow:
                                selected === opt.name ? `0 0 0 2px ${mainColor}` : 'none',
                        }}
                    >
                        {type === 'size' && opt.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default VariantSelector