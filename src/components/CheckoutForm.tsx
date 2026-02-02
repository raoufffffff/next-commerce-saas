'use client';

import * as fbq from '@/lib/fpixel';
import * as ttq from '@/lib/ttpixel';
import { useState, useEffect, useRef, useMemo } from 'react';
import {
    User,
    Phone,
    MapPin,
    ChevronDown,
    ShoppingCart,
    ArrowDown,
    Gift,
    Tag,
    CheckCircle2,
    Building,
    Minus,
    Plus,
    Loader2,
} from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
// Assuming these are .js or .ts files. If they are .json, you might need to adjust imports.
import states from '@/constans/states';
import etat from '@/constans/etat';
import VariantSelector from './CheckoutFormComponents/VariantSelector';
import OfferSelector from './CheckoutFormComponents/OfferSelector';
import { CheckoutFormData, CheckoutFormProps, CityData, Offer, Product, StateData } from '@/types';



export default function CheckoutForm({
    EnableBerue,
    product,
    livPriceapi,
    mainColor = '#4F46ff',
    tiktokp,
    facebookp,
}: CheckoutFormProps) {
    const router = useRouter();
    console.log(facebookp);

    // Fallback to local states if API data isn't provided
    const livPrice = livPriceapi || { LivPrice: states as unknown as StateData[] };
    // 1. Extract Product Details
    const variants = product.Variants || [];
    const colorOptions =
        variants.find((v) => v.type === 'color')?.options || [];
    const sizeOptions =
        variants.find((v) => v.type === 'size')?.options || [];
    const offers = product?.Offers || [];
    const productBasePrice = product?.price || 0;

    // 2. State Management
    const [selectedColor, setSelectedColor] = useState<string>(
        colorOptions[0]?.name || ''
    );
    const [selectedSize, setSelectedSize] = useState<string>(
        sizeOptions[0]?.name || ''
    );
    const [availableCities, setAvailableCities] = useState<CityData[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showStickyBtn, setShowStickyBtn] = useState(true);

    const [formData, setFormData] = useState<CheckoutFormData>({
        name: '',
        phone: '',
        wilaya: '', // This stores the code
        wilayaName: '', // Stores the name for DB
        baladyia: '',
        deliveryType: 'home', // 'home' or 'office'
        quantity: 1,
        ride: 0,
        rideHome: 0,
        rideOffice: 0,
        offer: false,
        offerNmae: '',
        freeDelivery: false,
    });

    const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

    // Refs
    const formRef = useRef<HTMLDivElement>(null);
    const nameInputRef = useRef<HTMLInputElement>(null);

    // 4. Scroll Logic for Sticky Button
    useEffect(() => {
        const handleScroll = () => {
            if (!formRef.current) return;
            const rect = formRef.current.getBoundingClientRect();
            // Logic: Sticky button shows only when form is NOT fully visible
            const isFormVisible =
                rect.top < window.innerHeight && rect.bottom >= 0;
            setShowStickyBtn(!isFormVisible);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 5. Handlers
    const handleStickyClick = () => {
        formRef.current?.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => nameInputRef.current?.focus(), 500);
    };

    const handleOfferSelect = (offer: Offer) => {
        if (selectedOffer?.id === offer.id) {
            // Deselect
            setSelectedOffer(null);
            setFormData((prev) => ({
                ...prev,
                quantity: 1,
                offer: false,
                freeDelivery: false,
                offerNmae: '',
            }));
        } else {
            // Select
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
            const newQty = increment
                ? prev.quantity + 1
                : Math.max(1, prev.quantity - 1);
            if (selectedOffer) setSelectedOffer(null); // Reset offer on manual qty change
            return {
                ...prev,
                quantity: newQty,
                offer: false,
                freeDelivery: false,
            };
        });
    };

    // 👇 FIX 2: Fix the CityData casting
    const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const stateCode = e.target.value;
        const stateObj = livPrice.LivPrice.find(
            (s) => String(s.code) === String(stateCode)
        );

        // Cast 'etat' to unknown first, then to CityData[] to tell TypeScript "Trust me"
        const citiesList = etat as unknown as CityData[];

        const cities = citiesList
            ? citiesList.filter(
                (c) => String(c.wilaya_code) === String(stateCode)
            )
            : [];

        setAvailableCities(cities);

        setFormData((prev) => ({
            ...prev,
            wilaya: stateCode,
            wilayaName: stateObj?.ar_name || stateObj?.name || '',
            baladyia: '',
            rideHome: stateObj?.prix_initial || 0,
            rideOffice: stateObj?.stop_back || 0,
            ride:
                prev.deliveryType === 'home'
                    ? stateObj?.prix_initial || 0
                    : stateObj?.stop_back || 0,
        }));
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        if (name === 'deliveryType') {
            setFormData((prev) => ({
                ...prev,
                deliveryType: value as 'home' | 'office',
                ride: value === 'home' ? prev.rideHome : prev.rideOffice,
            }));
            return;
        }

        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // 6. Calculations (Performance Optimized)
    const { finalTotal, deliveryCostDisplay } = useMemo(() => {
        let itemTotal;
        // Determine Delivery Cost
        const deliveryCost = formData.freeDelivery ? 0 : formData.ride;

        if (selectedOffer) {
            itemTotal = Number(selectedOffer.price);
        } else {
            itemTotal = formData.quantity * productBasePrice;
        }

        return {
            finalTotal: itemTotal + deliveryCost,
            deliveryCostDisplay: deliveryCost,
        };
    }, [
        formData.quantity,
        formData.freeDelivery,
        formData.ride,
        productBasePrice,
        selectedOffer,
    ]);

    // 7. Submit Logic
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.wilaya) return alert('يرجى اختيار الولاية'); // "Please select a state"

        setIsSubmitting(true);
        try {
            const orderPayload = {
                ...formData,
                state: formData.wilayaName,
                city: formData.baladyia,
                item: product,
                ride: formData.freeDelivery ? 0 : formData.ride,
                userId: product.userId,
                price: product.price,
                total: finalTotal,
                color: selectedColor,
                size: selectedSize,
                home: formData.deliveryType === 'home',
            };

            await axios.post(
                'https://true-fit-dz-api.vercel.app/order',
                orderPayload
            );

            // 1. Facebook Pixel
            if (facebookp) {
                fbq.event('Purchase', {
                    content_name: product.name,
                    content_ids: [product._id],
                    value: product.price,
                    currency: 'DZD',
                });
            }

            // 2. TikTok Pixel
            if (tiktokp) {
                ttq.event('Purchase', {
                    contents: [
                        {
                            content_id: product._id,
                            content_name: product.name,
                            price: product.price,
                            quantity: 1,
                        },
                    ],
                    value: product.price,
                    currency: 'DZD',
                });
            }

            router.push('/thanks'); // Next.js navigation
        } catch (err) {
            console.error(err);
            alert('حدث خطأ أثناء الطلب، يرجى المحاولة مرة أخرى'); // "Error occurred, please try again"
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div dir="rtl" className="relative font-sans text-right">
            {/* --- The Main Form Container --- */}
            <div
                ref={formRef}
                className="bg-white rounded-3xl shadow-2xl border border-indigo-50 p-6 md:p-8 sticky top-24"
            >
                <div className="text-center mb-8">
                    <h3 className="text-2xl font-extrabold text-gray-900">
                        إملأ الاستمارة للطلب
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">
                        الدفع عند الاستلام، توصيل سريع ومضمون
                    </p>
                </div>

                {/* Variants (Color/Size) */}
                <VariantSelector
                    options={colorOptions}
                    type="color"
                    selected={selectedColor}
                    onSelect={setSelectedColor}
                    mainColor={mainColor}
                />
                <VariantSelector
                    options={sizeOptions}
                    type="size"
                    selected={selectedSize}
                    onSelect={setSelectedSize}
                    mainColor={mainColor}
                />

                {/* Offer Selection */}
                <OfferSelector
                    offers={offers}
                    selectedOffer={selectedOffer}
                    onSelect={handleOfferSelect}
                    mainColor={mainColor}
                />

                <form onSubmit={handleSubmit} className="space-y-5 mt-8">
                    {/* Name & Phone */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">
                                الاسم الكامل
                            </label>
                            <div className="relative">
                                <User
                                    className="absolute top-3 right-3 text-gray-400"
                                    size={20}
                                />
                                <input
                                    ref={nameInputRef}
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="أدخل اسمك هنا"
                                    className="w-full pr-10 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">
                                رقم الهاتف
                            </label>
                            <div className="relative">
                                <Phone
                                    className="absolute top-3 right-3 text-gray-400"
                                    size={20}
                                />
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="05 XX XX XX XX"
                                    dir="ltr"
                                    className="w-full pr-10 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 text-right transition-all outline-none"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Location (Wilaya & Baladyia) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">
                                الولاية
                            </label>
                            <div className="relative">
                                <MapPin
                                    className="absolute top-3 right-3 text-gray-400"
                                    size={20}
                                />
                                <select
                                    name="wilaya"
                                    value={formData.wilaya}
                                    onChange={handleStateChange}
                                    className="w-full pr-10 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 appearance-none outline-none"
                                    required
                                >
                                    <option value="">اختر الولاية...</option>
                                    {livPrice.LivPrice.map((w, i) => (
                                        <option key={i} value={w.code}>
                                            {w.ar_name}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown
                                    className="absolute top-3.5 left-3 text-gray-400 pointer-events-none"
                                    size={16}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">
                                البلدية
                            </label>
                            <div className="relative">
                                <Building
                                    className="absolute top-3 right-3 text-gray-400"
                                    size={20}
                                />
                                {availableCities.length > 0 ? (
                                    <select
                                        name="baladyia"
                                        value={formData.baladyia}
                                        onChange={handleInputChange}
                                        className="w-full pr-10 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 appearance-none outline-none"
                                        required
                                        disabled={!formData.wilaya}
                                    >
                                        <option value="">اختر البلدية...</option>
                                        {availableCities.map((c) => (
                                            <option
                                                key={c.id || c.commune_name}
                                                value={c.commune_name}
                                            >
                                                {c.commune_name || c.daira_name}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <input
                                        type="text"
                                        name="baladyia"
                                        value={formData.baladyia}
                                        onChange={handleInputChange}
                                        placeholder="اسم البلدية"
                                        className="w-full pr-10 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                                        required
                                        disabled={!formData.wilaya}
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Delivery Type & Quantity */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-sm font-bold text-gray-700 mb-1">
                                نوع التوصيل
                            </label>
                            {EnableBerue && <select
                                name="deliveryType"
                                value={formData.deliveryType}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 outline-none"
                            >
                                <option value="home">توصيل للمنزل</option>
                                <option value="office">توصيل للمكتب (Stop desk)</option>
                            </select>}
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-sm font-bold text-gray-700 mb-1">
                                الكمية
                            </label>
                            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                                <button
                                    type="button"
                                    onClick={() => handleQuantityChange(false)}
                                    className="px-3 py-3 hover:bg-gray-100 transition"
                                >
                                    <Minus size={18} />
                                </button>
                                <div className="flex-1 text-center font-bold bg-white">
                                    {formData.quantity}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleQuantityChange(true)}
                                    className="px-3 py-3 hover:bg-gray-100 transition"
                                >
                                    <Plus size={18} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-gray-50 p-4 rounded-xl border border-dashed border-gray-300 mt-6">
                        <div className="flex justify-between items-center text-gray-600 mb-2">
                            <span>التوصيل:</span>
                            <span
                                className={
                                    formData.freeDelivery ? 'text-green-600 font-bold' : ''
                                }
                            >
                                {formData.freeDelivery
                                    ? 'مجاني'
                                    : `${deliveryCostDisplay} د.ج`}
                            </span>
                        </div>
                        <div className="flex justify-between items-center text-xl font-extrabold text-gray-900 border-t border-gray-200 pt-2 mt-2">
                            <span>المجموع الكلي:</span>
                            <span style={{ color: mainColor }}>
                                {finalTotal.toLocaleString()} د.ج
                            </span>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        style={{ backgroundColor: mainColor }}
                        className="w-full text-white font-bold py-4 rounded-xl shadow-lg hover:opacity-90 transform active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="animate-spin" size={24} />
                                <span>جاري المعالجة...</span>
                            </>
                        ) : (
                            <>
                                <span>تأكيد الطلب الآن</span>
                                <ShoppingCart size={24} />
                            </>
                        )}
                    </button>
                </form>
            </div>

            {/* --- Sticky Mobile Button --- */}
            <div
                className={`fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-[0_-5px_20px_rgba(0,0,0,0.1)] z-50 md:hidden transition-transform duration-300 ${showStickyBtn ? 'translate-y-0' : 'translate-y-full'
                    }`}
            >
                <button
                    onClick={handleStickyClick}
                    className="w-full text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg"
                    style={{ backgroundColor: mainColor }}
                >
                    <span>أطلب {product?.name}</span>
                    <ShoppingCart size={20} />
                </button>
            </div>

            {/* --- Sticky Desktop Button --- */}
            <div
                className={`fixed bottom-8 left-8 z-40 hidden md:block transition-all duration-300 ${showStickyBtn
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10 pointer-events-none'
                    }`}
            >
                <button
                    onClick={handleStickyClick}
                    className="text-white font-bold py-3 px-6 rounded-full shadow-2xl flex items-center gap-2 hover:scale-105 transition-transform"
                    style={{ backgroundColor: mainColor }}
                >
                    <span>أطلب الآن</span>
                    <ArrowDown size={20} />
                </button>
            </div>
        </div>
    );
}