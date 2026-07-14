/**
 * Algeria COD System
 * shipping.js
 */

import { CONFIG } from "./config.js";

/* الولايات */
let wilayas = [];

/* أسعار الشحن */
let shippingPrices = [];

/**
 * تحميل الولايات من JSON
 */
export async function loadWilayas() {

    try {

        const response = await fetch("./data/wilayas.json");

        wilayas = await response.json();

        return wilayas;

    } catch (error) {

        console.error("Load Wilayas Error:", error);

        return [];

    }

}

/**
 * تحميل أسعار الشحن من Google Apps Script
 */
export async function loadShippingPrices() {

    try {

        const response = await fetch(
            CONFIG.API_URL + "?action=shipping"
        );

        shippingPrices = await response.json();

        return shippingPrices;

    } catch (error) {

        console.error("Shipping Error:", error);

        return [];

    }

}

/**
 * تعبئة قائمة الولايات
 */
export function populateWilayas(selectElement) {

    selectElement.innerHTML =
        '<option value="">اختر الولاية</option>';

    wilayas.forEach((wilaya) => {

        const option = document.createElement("option");

        option.value = wilaya.name;

        option.textContent =
            wilaya.code + " - " + wilaya.name;

        selectElement.appendChild(option);

    });

}

/**
 * الحصول على سعر الشحن
 */
export function getShippingPrice(wilayaName, shippingType) {

    const item = shippingPrices.find(

        (row) => row.wilaya === wilayaName

    );

    if (!item) {

        return 0;

    }

    if (shippingType === "Home") {

        return Number(item.homeShipping);

    }

    if (shippingType === "Desk") {

        return Number(item.deskShipping);

    }

    return 0;

}

/**
 * البحث عن ولاية
 */
export function getWilaya(code) {

    return wilayas.find(

        (item) => item.code == code

    );

}
