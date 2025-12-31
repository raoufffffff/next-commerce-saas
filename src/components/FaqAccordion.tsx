'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FaqAccordion({ faqs, mainColor }: { faqs: { question: string; answer: string; id?: string | number }[]; mainColor?: string }) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    // Default color if missing
    const activeColor = mainColor || '#4F46E5';

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    if (!faqs || faqs.length === 0) {
        return (
            <div className="text-center py-20 text-gray-500">
                <HelpCircle className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                <p>لا توجد أسئلة شائعة حالياً.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {faqs.map((item, index) => {
                const isOpen = openIndex === index;

                return (
                    <div
                        key={item.id || index}
                        className={`border rounded-xl transition-all duration-300 bg-white overflow-hidden`}
                        style={{
                            borderColor: isOpen ? activeColor : '#e5e7eb', // Dynamic border color
                            boxShadow: isOpen ? `0 4px 6px -1px ${activeColor}20` : 'none' // Subtle glow
                        }}
                    >
                        <button
                            onClick={() => toggleFaq(index)}
                            className="w-full flex items-center justify-between p-5 text-right bg-white transition-colors"
                        >
                            <span
                                className={`font-bold text-lg transition-colors`}
                                style={{ color: isOpen ? activeColor : '#111827' }} // Dynamic text color
                            >
                                {item.question}
                            </span>
                            <ChevronDown
                                className={`transform transition-transform duration-300 flex-shrink-0 mr-4 text-gray-400`}
                                style={{
                                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                    color: isOpen ? activeColor : '#9ca3af' // Dynamic icon color
                                }}
                            />
                        </button>

                        <div
                            className={`transition-all duration-300 ease-in-out overflow-hidden`}
                            style={{ maxHeight: isOpen ? '500px' : '0px', opacity: isOpen ? 1 : 0 }}
                        >
                            <div className="p-5 pt-0 text-gray-600 leading-relaxed border-t border-gray-50 mx-5 mt-2">
                                {item.answer}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}