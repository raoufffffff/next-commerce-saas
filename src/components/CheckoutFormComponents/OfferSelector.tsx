import { Offer } from "@/types";
import { CheckCircle2, Gift, Tag } from "lucide-react";

interface OfferSelectorProps {
    offers: Offer[];
    selectedOffer: Offer | null;
    onSelect: (offer: Offer) => void;
    mainColor: string;
}


const OfferSelector = ({
    offers,
    selectedOffer,
    onSelect,
    mainColor,
}: OfferSelectorProps) => {
    if (!offers || offers.length === 0) return null;

    return (
        <div className="space-y-3 mt-6">
            <h3 className="font-bold text-gray-900">Special Offers</h3>
            <div className="grid gap-3">
                {offers.map((offer) => {
                    if (Number(offer.Quantity) < 1) return null;
                    const isActive = selectedOffer?.id === offer.id;

                    return (
                        <div
                            key={offer.id || Math.random()}
                            onClick={() => onSelect(offer)}
                            className={`cursor-pointer relative overflow-hidden rounded-xl border p-4 transition-all hover:shadow-md ${isActive ? 'bg-amber-50 border-2' : 'bg-white border-gray-200'
                                }`}
                            style={{ borderColor: isActive ? mainColor : '#E5E7EB' }}
                        >
                            {isActive && (
                                <div className="absolute top-0 left-0 bg-green-500 text-white p-1 rounded-br-lg z-10">
                                    <CheckCircle2 size={16} />
                                </div>
                            )}
                            <div className="flex items-center gap-4">
                                <div
                                    className={`p-3 rounded-full flex-shrink-0 ${isActive ? 'bg-white' : 'bg-gray-100'
                                        }`}
                                >
                                    {Number(offer.Quantity) >= 3 ? (
                                        <Gift size={24} style={{ color: mainColor }} />
                                    ) : (
                                        <Tag size={24} style={{ color: mainColor }} />
                                    )}
                                </div>
                                <div className="flex-1 text-right">
                                    <h3 className="font-bold text-gray-900">
                                        {offer.name || 'Special Offer'}
                                    </h3>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Buy <span className="font-bold">{offer.Quantity}</span> for{' '}
                                        <span
                                            className="font-bold text-lg"
                                            style={{ color: mainColor }}
                                        >
                                            {Number(offer.price).toLocaleString()} DZD
                                        </span>
                                    </p>
                                    {offer.freedelevry && (
                                        <p className="text-xs text-green-600 font-medium mt-1 flex items-center gap-1 justify-end">
                                            <CheckCircle2 size={12} /> Free Delivery
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default OfferSelector;