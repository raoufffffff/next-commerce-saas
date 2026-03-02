import { Minus, Plus } from 'lucide-react';
import { CheckoutFormData } from '@/types';

interface Props {
  formData: CheckoutFormData;
  onTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onQtyChange: (increment: boolean) => void;
}

export const DeliveryControl = ({ formData, onTypeChange, onQtyChange }: Props) => (
  <div className="grid grid-cols-2 gap-4">
    <div className="col-span-2 md:col-span-1">
      <label className="block text-sm font-bold text-gray-700 mb-1">نوع التوصيل</label>
      <select
        name="deliveryType"
        value={formData.deliveryType}
        onChange={onTypeChange}
        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 outline-none"
      >
        <option value="home">توصيل للمنزل</option>
        <option value="office">توصيل للمكتب (Stop desk)</option>
      </select>
    </div>
    <div className="col-span-2 md:col-span-1">
      <label className="block text-sm font-bold text-gray-700 mb-1">الكمية</label>
      <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
        <button type="button" onClick={() => onQtyChange(false)} className="px-3 py-3 hover:bg-gray-100 transition">
          <Minus size={18} />
        </button>
        <div className="flex-1 text-center font-bold bg-white">{formData.quantity}</div>
        <button type="button" onClick={() => onQtyChange(true)} className="px-3 py-3 hover:bg-gray-100 transition">
          <Plus size={18} />
        </button>
      </div>
    </div>
  </div>
);