// Define the shape of the TTQ object
declare global {
    interface Window {
        ttq: any;
    }
}

export const pageview = (id: string) => {
    if (typeof window !== "undefined" && window.ttq) {
        window.ttq.load(id);
        window.ttq.page();
    }
};

export const event = (name: string, options: Record<string, any> = {}) => {
    if (typeof window !== "undefined" && window.ttq) {
        window.ttq.track(name, options);
    }
};