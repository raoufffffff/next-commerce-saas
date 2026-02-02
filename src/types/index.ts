// src/types/index.ts

// ==========================================
// 1. Global & Route Params
// ==========================================

export interface PageParams {
    site: string;
    id: string;
}

// ==========================================
// 2. Store & User Interfaces
// ==========================================

export interface CompanyLiv {
    name: string;
    key: string;
    token: string;
}

export interface PixelConfig {
    name: string;
    id: string;
}

export interface HeaderSettings {
    name: boolean;
    logo: boolean;
    headercolor: string;
    namecolor: string;
    barcolor: string;
}

export interface ThanksSettings {
    img: boolean;
    title: boolean;
    about: boolean;
    homebutton: boolean;
    phone: boolean;
    media: boolean;
    titleText: string;
    aboutText: string;
}

export interface FAQ {
    question: string;
    answer: string;
    id: string;
}

export interface Store {
    id: string;
    logo: string;
    store_name: string;
    main_color: string;
    phone: string;
    repoName: string;
    email: string;
    language: string;

    // Social Media Links
    facebook: string;
    instagram: string;
    tiktok: string;
    whatsapp: string;
    viber?: string;
    snapchat?: string;

    // Legacy/String Pixel fields (if used)
    tiktokP?: string;
    FacebookP?: string;

    // Configuration Objects
    header: HeaderSettings;
    thanks: ThanksSettings;

    // Pixel Objects
    facebookPixel: PixelConfig;
    TiktokPixel: PixelConfig;

    // Content
    faqs: FAQ[];
    EnableBerue: boolean;

    // Extra fields found in JSON
    name?: string;
}

export interface Category {
    id?: string; // 👈 Made optional
    name: string;
    show: boolean;
    image: string;
}

export interface UserData {
    _id: string;
    name: string;
    email: string;
    phone: string;
    repoName: string;
    password?: string; // Optional as you might not always fetch it
    link: string;
    createdAt: string;
    updatedAt: string;
    __v: number;

    // Nested Objects
    companyLiv?: CompanyLiv;
    website: Store;

    // Arrays
    Categories: Category[]; // Replace 'any' with Category interface if you have one
    Notifications: any[];
    taem: any[]; // Note: API returns 'taem', likely typo for 'team'
}

// ==========================================
// 3. Product Interfaces
// ==========================================

export interface VariantOption {
    name: string;
    color?: string; // Optional because size variants don't have color hex
}

export interface Variant {
    id: number;
    name: string;
    type: 'color' | 'size' | string;
    curentOption?: string;
    options: VariantOption[];
}

export interface Offer {
    id: number | string;
    name: string;
    // JSON shows these as strings ("2", "3350"), allowing number just in case
    Quantity: string | number;
    price: string | number;
    freedelevry: boolean; // Matches API spelling
    topOffer: boolean;
}

export interface Product {
    _id: string;
    userId: string;
    name: string;
    price: number;
    Oldprice?: number; // Matches API casing

    // Descriptions
    note?: string;
    ShortDescription?: string;
    Description?: string;

    // Organization
    tags: string[];
    type?: string;
    show: boolean;

    // Images
    images: string[];
    LadingPages: string[]; // Matches API spelling (LandingPages)

    // Complex Data
    Variants: Variant[];
    Offers: Offer[];

    // Stats
    visit: number;
    orders: number;
    date: string;
    __v: number;
}


export interface StateData {
    code: string | number;
    ar_name: string;
    name?: string;
    prix_initial: number;
    stop_back: number;
}

export interface CityData {
    id?: string;
    wilaya_code: string | number;
    commune_name: string;
    daira_name?: string;
    name?: string;
}

export interface CheckoutFormData {
    name: string;
    phone: string;
    wilaya: string; // The code
    wilayaName: string; // The text name
    baladyia: string;
    deliveryType: 'home' | 'office';
    quantity: number;
    ride: number; // Current shipping cost
    rideHome: number; // Stored home cost
    rideOffice: number; // Stored office cost
    offer: boolean;
    offerNmae: string;
    freeDelivery: boolean;
}

export interface CheckoutFormProps {
    EnableBerue: boolean;
    product: Product;
    livPriceapi?: { LivPrice: StateData[] } | null;
    mainColor?: string;
    tiktokp?: any; // Pass pixel config or boolean
    facebookp?: any;
}
