// Define the shape of the FBQ function to prevent TS errors
declare global {
    interface Window {
        fbq: any; // We use 'any' here because the Facebook script is dynamic
    }
}

export const FB_PIXEL_ID = null; // Passed dynamically in your logic

export const pageview = (id: string) => {
    // Safety check: ensure window exists (client-side) and fbq is loaded
    if (typeof window !== "undefined" && window.fbq) {
        window.fbq("init", id);
        window.fbq("track", "PageView");
    }
};

// Generic event tracker (AddToCart, Purchase, etc.)
export const event = (name: string, options: Record<string, any> = {}) => {
    if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", name, options);
    }
};