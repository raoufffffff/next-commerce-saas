import { ShoppingCart, ArrowDown } from 'lucide-react';

// 1. Define the props to match what you are passing from the parent
interface StickyActionsProps {
  mainColor: string;
  isVisible: boolean;    // Controlled by parent
  onClick: () => void;   // Controlled by parent
}

export default function StickyActions({ mainColor, isVisible, onClick }: StickyActionsProps) {
  // We removed the internal useState and useEffect logic. 
  // This component now purely obeys the 'isVisible' prop passed to it.

  return (
    <>
      {/* Mobile Sticky Button */}
      <div 
        className={`fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-lg z-50 md:hidden transition-transform duration-300 ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <button
          style={{ backgroundColor: mainColor }}
          onClick={onClick}
          className="w-full text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg"
        >
          <span>أطلب الآن</span>
          <ShoppingCart size={20} />
        </button>
      </div>

      {/* Desktop Floating Button */}
      <div 
        className={`fixed bottom-8 left-8 z-40 hidden md:block transition-all duration-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        <button
          style={{ backgroundColor: mainColor }}
          onClick={onClick}
          className="text-white font-bold py-3 px-6 rounded-full shadow-2xl flex items-center gap-2 hover:scale-105 transition-transform"
        >
          <span>أطلب الآن</span>
          <ArrowDown size={20} />
        </button>
      </div>
    </>
  );
}