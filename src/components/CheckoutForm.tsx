'use client';

import { User, Phone, ShoppingCart, Loader2    } from 'lucide-react';
import VariantSelector from './CheckoutFormComponents/VariantSelector';
import OfferSelector from './CheckoutFormComponents/OfferSelector';
import { CheckoutFormProps } from '@/types';
import { useCheckoutLogic } from '@/hooks/useCheckoutLogic';
import { LocationSelectors } from './CheckoutFormComponents/LocationSelectors';
import { OrderSummary } from './CheckoutFormComponents/OrderSummary';
import { DeliveryControl } from './CheckoutFormComponents/DeliveryControl';
import StickyActions from './StickyActions';
 import states from '@/constans/states'; // Check your import path
import { FormInput } from './CheckoutFormComponents/FormInput';

// Sub-components
 

export default function CheckoutForm(props: CheckoutFormProps) {
    // 1. All Logic resides here
    const {
        formData, availableCities, selectedColor, selectedSize, selectedOffer,
        isSubmitting, showStickyBtn, finalTotal, deliveryCostDisplay,
        colorOptions, sizeOptions, offers,
        setSelectedColor, setSelectedSize, handleOfferSelect,
        handleQuantityChange, handleStateChange, handleInputChange, handleSubmit, handleStickyClick,
        formRef, nameInputRef, phoneErr
    } = useCheckoutLogic(props);

    const { mainColor = '#4F46ff', product, StoreDlevryPrices, beru } = props;

    return (
        <div dir="rtl" className="relative font-sans text-right">
            
            {/* Main Form Card */}
            <div  ref={formRef} className="bg-white rounded-3xl shadow-2xl border border-indigo-50 p-6 md:p-8 sticky top-24">
                
                {/* Header */}
                <div className="text-center mb-8">
                    <h3 className="text-2xl font-extrabold text-gray-900">إملأ الاستمارة للطلب</h3>
                    <p className="text-gray-500 text-sm mt-1">الدفع عند الاستلام، توصيل سريع ومضمون</p>
                </div>

                {/* Variants & Offers */}
                <VariantSelector options={colorOptions} type="color" selected={selectedColor} onSelect={setSelectedColor} mainColor={mainColor} />
                <VariantSelector options={sizeOptions} type="size" selected={selectedSize} onSelect={setSelectedSize} mainColor={mainColor} />
                <OfferSelector offers={offers} selectedOffer={selectedOffer} onSelect={handleOfferSelect} mainColor={mainColor} />

                {/* Form Inputs */}
                <form
                id="checkout-form"
                onSubmit={handleSubmit} className="space-y-5 mt-8">
                    <div className="space-y-4">
                        <FormInput 
                            label="الاسم الكامل" 
                            name="name" 
                            Icon={User} 
                            value={formData.name} 
                            onChange={handleInputChange} 
                            ref={nameInputRef} 
                            placeholder="أدخل اسمك هنا" 
                            required 
                        />
                        <FormInput 
                        err={phoneErr}
                        minLength={10}
                            label="رقم الهاتف" 
                            name="phone" 
                            Icon={Phone} 
                            value={formData.phone} 
                            onChange={handleInputChange} 
                            placeholder="05 XX XX XX XX" 
                            dir="ltr" 
                            className="text-right" 
                            required 
                        />
                    </div>

                    <LocationSelectors 
                        formData={formData} 
                        states={StoreDlevryPrices || states} 
                        availableCities={availableCities} 
                        onStateChange={handleStateChange} 
                        onCityChange={handleInputChange} 
                    />

                   {beru && <DeliveryControl 
                        formData={formData} 
                        onTypeChange={handleInputChange} 
                        onQtyChange={handleQuantityChange} 
                    />}

                    <OrderSummary 
                        freeDelivery={formData.freeDelivery} 
                        deliveryCost={deliveryCostDisplay} 
                        total={finalTotal} 
                        mainColor={mainColor} 
                    />

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

            {/* Sticky Buttons */}
            <StickyActions 
                isVisible={showStickyBtn} 
                 mainColor={mainColor} 
                onClick={handleStickyClick} 
            />
        </div>
    );
}