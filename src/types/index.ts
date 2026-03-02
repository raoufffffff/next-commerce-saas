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



export interface Category {
    id?: string; // 👈 Made optional
    name: string;
    show: boolean;
    image: string;
}

export interface Store {
    user: string;
logo: string;
      language: string;
        enableBureau: boolean;
 storeName: string;
   _id: string;
   faqs: faqs[];
   categories: Category[];
   domain: string;
   contacts:contacts;
   header : header;
   mainColor: string;
   thanks:thanks;
   deliveryCompany:deliveryCompany;
    facebookPixel?:pixel;
    tiktokPixel?:pixel;
      ProductCardType: string,
    CategoryCardType: string,
}

export interface deliveryCompany {
   name: string;
        key: string;
        token: string;
        img?: string
}


export interface StatePrice {
        id: number,
        code: string,
        name: string,
        ar_name: string,
        stop_back: number,
        prix_initial: number
    }

 export interface pixel {
  name: string;
  id: string
 }   

export interface faqs {
  question: string;
  answer: string;
  id: string;
}

export interface  contacts  { 
        phone: string;
        instagram: string;
        tiktok: string;
        facebook: string;
        whatsapp: string
    }  



export interface  header  {
        name:  boolean ;
        logo: boolean  ;
        headerColor: string; // تم التعديل لـ 6 خانات للأمان
        textColor: string;
        barColor: string;
    }    

   

export interface thanks  {
        img:  boolean;
        title:  boolean;
        about:  boolean;
        homeButton:  boolean; // camelCase
        phone:  boolean;
        media:  boolean;
        titleText:  string;
        aboutText:  string ;
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

 

export interface product{
  _id ?: string;
   store: string;
      name: string;
      subTitel: string;
      price: number  ;
      Oldprice: number | string;
      ShortDescription: string;
      Description: string;
      tags: string[];
      note: string;
      show:boolean;
      type: string;  
      images: string[] | [];
      LadingPages: string[] | [];
       colorOpions?: string[];
        sizeOpions?: string[] ;
      Offers?: Offer[],
}

export interface Offer {
  id: number;
  name: string;
  Quantity: string;
  price: string;
  freedelevry: boolean;
  topOffer: boolean;
}


export interface StateData {
    code: string | number;
    ar_name: string;
    name?: string;
    prix_initial: number;
    stop_back: number;
}
 
export interface CityData {
  id: 22,
        commune_name_ascii: string,
        commune_name: string,
        daira_name_ascii: string,
        daira_name: string,
        wilaya_code: string,
        wilaya_name_ascii: string,
        wilaya_name: string
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
    beru: boolean;
    user?: string
    product: product;
    StoreDlevryPrices?: StatePrice[] | null;
    mainColor?: string;
    tiktokp?: any; // Pass pixel config or boolean
    facebookp?: any;
}
