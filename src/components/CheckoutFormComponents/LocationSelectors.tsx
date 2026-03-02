import { MapPin, Building, ChevronDown } from 'lucide-react';
import { CityData, StateData, CheckoutFormData } from '@/types';

interface Props {
  formData: CheckoutFormData;
  states: any[]; // Or StateData[]
  availableCities: CityData[];
  onStateChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onCityChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
}

export const LocationSelectors = ({ formData, states, availableCities, onStateChange, onCityChange }: Props) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* Wilaya */}
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-1">الولاية</label>
      <div className="relative">
        <MapPin className="absolute top-3 right-3 text-gray-400" size={20} />
        <select
          name="wilaya"
          value={formData.wilaya}
          onChange={onStateChange}
          className="w-full pr-10 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 appearance-none outline-none"
          required
        >
          <option value="">اختر الولاية...</option>
          {states?.map((w, i) => (
            <option key={i} value={w.code}>{w.ar_name}</option>
          ))}
        </select>
        <ChevronDown className="absolute top-3.5 left-3 text-gray-400 pointer-events-none" size={16} />
      </div>
    </div>

    {/* Baladyia */}
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-1">البلدية</label>
      <div className="relative">
        <Building className="absolute top-3 right-3 text-gray-400" size={20} />
        {availableCities.length > 0 ? (
          <select
            name="baladyia"
            value={formData.baladyia}
            onChange={onCityChange}
            className="w-full pr-10 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 appearance-none outline-none"
            required
            disabled={!formData.wilaya}
          >
            <option value="">اختر البلدية...</option>
            {availableCities.map((c) => (
              <option key={c.id || c.commune_name} value={c.commune_name_ascii}>
                {c.commune_name || c.daira_name}
              </option>
            ))}
          </select>
        ) : (
          <input
            type="text"
            name="baladyia"
            value={formData.baladyia}
            onChange={onCityChange}
            placeholder="اسم البلدية"
            className="w-full pr-10 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            required
            disabled={!formData.wilaya}
          />
        )}
      </div>
    </div>
  </div>
);