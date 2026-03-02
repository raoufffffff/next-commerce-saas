// components/Checkout/hooks/useCheckoutLogic.ts
import { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import * as fbq from '@/lib/fpixel';
import * as ttq from '@/lib/ttpixel';
import etat from '@/constans/algeria_cities.json'; // Check your import path
import states from '@/constans/states'; // Check your import path
import { CheckoutFormData, CityData, Offer, CheckoutFormProps } from '@/types';

export const useCheckoutLogic = (props: CheckoutFormProps) => {
    const { product,  user,   facebookp, tiktokp } = props;
    let  {StoreDlevryPrices} = props  
    StoreDlevryPrices = StoreDlevryPrices || states
    const router = useRouter();
    const [phoneErr, setPhoneErr] = useState("")
    // Defaults
    const colorOptions = product?.colorOpions || [];
    const sizeOptions = product?.sizeOpions || [];
    const offers = product?.Offers || [];
    const productBasePrice = product?.price || 1;

    // Refs
    const formRef = useRef<HTMLDivElement>(null);
    const nameInputRef = useRef<HTMLInputElement>(null);

    // State
    const [selectedColor, setSelectedColor] = useState<string>(colorOptions[0] || '');
    const [selectedSize, setSelectedSize] = useState<string>(sizeOptions[0] || '');
    const [availableCities, setAvailableCities] = useState<CityData[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showStickyBtn, setShowStickyBtn] = useState(true);
    const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

    const [formData, setFormData] = useState<CheckoutFormData>({
        name: '',
        phone: '',
        wilaya: '',
        wilayaName: '',
        baladyia: '',
        deliveryType: 'home',
        quantity: 1,
        ride: 0,
        rideHome: 0,
        rideOffice: 0,
        offer: false,
        offerNmae: '',
        freeDelivery: false,
    });

    // Scroll Effect
   // Add this to your parent component or hook
 
useEffect(() => {
   const handleScroll = () => {
    const formElement = document.getElementById('checkout-form');
    
    if (formElement) {
        const rect = formElement.getBoundingClientRect();
        
        // Is any part of the form currently in the viewport?
        const isFormInView = rect.top < window.innerHeight && rect.bottom > 0;
        
        // We only want the sticky button if:
        // 1. The form is NOT in view (!isFormInView)
        // 2. We have scrolled down at least 300px
        if (!isFormInView  ) {
            setShowStickyBtn(true);
        } else {
            setShowStickyBtn(false);
        }
    }
};

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
}, []);

const handleStickyClick = () => {
    document.getElementById('checkout-form')?.scrollIntoView({ behavior: 'smooth' });
};

    // Handlers
    

    const handleOfferSelect = (offer: Offer) => {
        if (selectedOffer?.id === offer.id) {
            setSelectedOffer(null);
            setFormData((prev) => ({ ...prev, quantity: 1, offer: false, freeDelivery: false, offerNmae: '' }));
        } else {
            setSelectedOffer(offer);
            setFormData((prev) => ({
                ...prev,
                quantity: Number(offer.Quantity),
                offer: true,
                freeDelivery: offer.freedelevry,
                offerNmae: offer.name,
            }));
        }
    };

    const handleQuantityChange = (increment: boolean) => {
        setFormData((prev) => {
            const newQty = increment ? prev.quantity + 1 : Math.max(1, prev.quantity - 1);
            if (selectedOffer) setSelectedOffer(null);
            return { ...prev, quantity: newQty, offer: false, freeDelivery: false };
        });
    };

    const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const stateCode = e.target.value;
        const stateObj = StoreDlevryPrices.find((s) => String(s.code) === String(stateCode));
        const citiesList = etat as unknown as CityData[]; // Keeping your casting logic
        const cities = citiesList ? citiesList.filter((c) => String(c.wilaya_code) === String(stateCode)) : [];

        setAvailableCities(cities);
        setFormData((prev) => ({
            ...prev,
            wilaya: stateCode,
            wilayaName: stateObj?.name || stateObj?.ar_name || '',
            baladyia: '',
            rideHome: stateObj?.prix_initial || 0,
            rideOffice: stateObj?.stop_back || 0,
            ride: prev.deliveryType === 'home' ? (stateObj?.prix_initial || 0) : (stateObj?.stop_back || 0),
        }));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'deliveryType') {
            setFormData((prev) => ({
                ...prev,
                deliveryType: value as 'home' | 'office',
                ride: value === 'home' ? prev.rideHome : prev.rideOffice,
            }));
            return;
        }
         if (name === 'phone') validatePhone(value);
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Calculations
    const { finalTotal, deliveryCostDisplay } = useMemo(() => {
        const deliveryCost = formData.freeDelivery ? 0 : formData.ride;
        const itemTotal = selectedOffer ? Number(selectedOffer.price) : formData.quantity * productBasePrice;
        return {
            finalTotal: itemTotal + deliveryCost,
            deliveryCostDisplay: deliveryCost,
        };
    }, [formData, productBasePrice, selectedOffer]);
const validatePhone = (value: string) => {
  if (!value.startsWith('0')) {
    setPhoneErr('رقم الهاتف يجب أن يبدأ بـ 0');
  } else if (value.replace(/\s/g, '').length !== 10) {
    setPhoneErr('رقم الهاتف يجب أن يتكون من 10 أرقام');
  } else {
    setPhoneErr('');
  }
};
    // Submit Logic
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.wilaya) return alert('يرجى اختيار الولاية');
         setIsSubmitting(true);
        try {
            const orderPayload = {
                item: {
 ...formData,
                state: formData.wilayaName,
                city: formData.baladyia,
                productData: product,
                ride: formData.freeDelivery ? 0 : formData.ride,
                store: product.store,
                price: product.price,
                total: finalTotal,
                color: selectedColor,
                size: selectedSize,
                                user: user,
                home: formData.deliveryType === 'home',
                },
                user: user
               
            };
 console.log(orderPayload);
 
            await axios.post('http://localhost:5000/api/public/orders', orderPayload);

            if (facebookp) {
                fbq.event('Purchase', {
                    content_name: product.name,
                    content_ids: [product._id],
                    value: product.price,
                    currency: 'DZD',
                });
            }
            if (tiktokp) {
                ttq.event('Purchase', {
                    contents: [{ content_id: product._id, content_name: product.name, price: product.price, quantity: 1 }],
                    value: product.price,
                    currency: 'DZD',
                });
            }
            router.push('/thanks');
        } catch (err) {
            console.error(err);
            alert('حدث خطأ أثناء الطلب، يرجى المحاولة مرة أخرى');
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        // Data
        formData,
        availableCities,
        selectedColor,
        selectedSize,
        selectedOffer,
        isSubmitting,
        showStickyBtn,
        finalTotal,
        deliveryCostDisplay,
        // Options
        colorOptions,
        sizeOptions,
        offers,
        // Handlers
        setSelectedColor,
        setSelectedSize,
        handleOfferSelect,
        handleQuantityChange,
        handleStateChange,
        handleInputChange,
        handleSubmit,
        handleStickyClick,
        // Refs
        formRef,
        nameInputRef,
        phoneErr
    };
};