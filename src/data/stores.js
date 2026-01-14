// src/data/stores.ts
export const stores = {
    "ahmed": {
        name: "متاجر أحمد",
        theme: "blue",
        delivery: { type: "fixed", price: 500 } // توصيل ثابت
    },
    "pizza-king": {
        name: "بيتزا كينغ",
        theme: "red",
        delivery: { type: "dynamic", base: 200, perKm: 50 } // توصيل متغير
    }
};