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
 * تعبئة الولايات
 */
export function populateWilayas(select) {

    select.innerHTML =
        '<option value="">اختر الولاية</option>';

    shippingData.forEach(item => {

        const option =
            document.createElement("option");

        option.value = item.wilaya;

        option.textContent =
            item.code + " - " + item.wilaya;

        select.appendChild(option);

    });

}

/**
 * تعبئة البلديات
 */
export function populateCommunes(
    wilaya,
    communeSelect
) {

    communeSelect.innerHTML =
        '<option value="">اختر البلدية</option>';

    const item =
        shippingData.find(

            x => x.wilaya === wilaya

        );

    if (!item) {

        return;

    }

    item.communes.forEach(name => {

        const option =
            document.createElement("option");

        option.value = name;

        option.textContent = name;

        communeSelect.appendChild(option);

    });

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
