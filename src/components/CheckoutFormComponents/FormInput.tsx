import { forwardRef } from 'react';
import { LucideIcon } from 'lucide-react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  Icon: LucideIcon;
   err?: string;
}

// 1. We wrap the component in forwardRef to handle the 'ref' prop correctly
export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, Icon, className, err, ...props }, ref) => {
    return (
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">
          {label}
        </label>
        <div className="relative">
          <Icon className="absolute top-3 right-3 text-gray-400" size={20} />
          <input
            ref={ref}
            className={`w-full pr-10 pl-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none
              ${err ? 'border-red-400 focus:ring-red-400' : 'border-gray-200'}
              ${className || ''}`}
            {...props}
          />
        </div>
        {err && (
          <p className="mt-1 text-xs text-red-500 text-right">
            {err}
          </p>
        )}
      </div>
    );
  }
);

// Helpful display name for debugging
FormInput.displayName = 'FormInput';