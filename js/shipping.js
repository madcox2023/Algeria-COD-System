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
 * تعبئة قائمة الولايات
 */
export function populateWilayas(
    button,
    list
) {

    list.innerHTML = "";

    shippingData.forEach(item => {

        const div =
            document.createElement("div");

        div.className =
            "dropdown-item";

        div.textContent =
            item.code + " - " + item.wilaya;

        div.onclick = () => {

            selectedWilaya =
                item.wilaya;

            button.textContent =
                item.code +
                " - " +
                item.wilaya;

            list.classList.remove("show");

        };

        list.appendChild(div);

    });

}

/**
 * تعبئة البلديات
 */
export function populateCommunes(
    wilaya,
    button,
    list
) {

    list.innerHTML = "";

    const item =
        shippingData.find(

            x => x.wilaya === wilaya

        );

    if (!item) {

        return;

    }

    item.communes.forEach(name => {

        const div =
            document.createElement("div");

        div.className =
            "dropdown-item";

        div.textContent =
            name;

        div.onclick = () => {

            selectedCommune =
                name;

            button.textContent =
                name;

            list.classList.remove("show");

        };

        list.appendChild(div);

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
export function getSelectedWilaya() {

    return selectedWilaya;

}

export function getSelectedCommune() {

    return selectedCommune;

}
