export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 space-y-4">
            {/* 1. سبينر بسيط */}
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>

            {/* 2. Skeleton Loading (هيكل عظمي وهمي) */}
            <div className="w-full max-w-md space-y-4 p-4">
                <div className="h-8 bg-gray-200 rounded animate-pulse w-3/4 mx-auto"></div>
                <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2 mx-auto"></div>
            </div>

            <p className="text-gray-500 animate-pulse">جاري تجهيز المتجر...</p>
        </div>
    );
}