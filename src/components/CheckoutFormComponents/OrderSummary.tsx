interface Props {
  freeDelivery: boolean;
  deliveryCost: number;
  total: number;
  mainColor: string;
}

export const OrderSummary = ({ freeDelivery, deliveryCost, total, mainColor }: Props) => (
  <div className="bg-gray-50 p-4 rounded-xl border border-dashed border-gray-300 mt-6">
    <div className="flex justify-between items-center text-gray-600 mb-2">
      <span>التوصيل:</span>
      <span className={freeDelivery ? 'text-green-600 font-bold' : ''}>
        {freeDelivery ? 'مجاني' : `${deliveryCost} د.ج`}
      </span>
    </div>
    <div className="flex justify-between items-center text-xl font-extrabold text-gray-900 border-t border-gray-200 pt-2 mt-2">
      <span>المجموع الكلي:</span>
      <span style={{ color: mainColor }}>{total.toLocaleString()} د.ج</span>
    </div>
  </div>
);