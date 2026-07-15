/**
 * ==========================================
 * Algeria COD System
 * shipping.js
 * Version 2.0.0
 * ==========================================
 */

import { CONFIG } from "./config.js";

/* بيانات الشحن */
let shippingData = [];
let selectedWilaya = "";
let selectedCommune = "";
/**
 * تحميل بيانات الشحن من Google Sheet
 */
export async function loadShippingPrices() {

    try {

        const response = await fetch(
            CONFIG.API_URL + "?action=shipping"
        );

        const json = await response.json();

        if (!json.success) {

            return [];

        }

        shippingData = json.shipping;

        return shippingData;

    }

    catch (error) {

        console.error(error);

        return [];

    }

}

/**
 * لم نعد نستخدم wilayas.json
 */
export async function loadWilayas() {

    return shippingData;

}


/**
 * سعر الشحن
 */
export function getShippingPrice(
    wilaya,
    shippingType
) {

    const item =
        shippingData.find(

            x => x.wilaya === wilaya

        );

    if (!item) {

        return 0;

    }

    if (shippingType === "Home") {

        return Number(item.home);

    }

    return Number(item.desk);

}

/**
 * الحصول على ولاية
 */
export function getWilaya(name) {

    return shippingData.find(

        x => x.wilaya === name

    );

}
