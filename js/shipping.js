/**
 * ==========================================
 * Algeria COD System
 * shipping.js
 * Version 3.0.0 Stable
 * ==========================================
 */

import { CONFIG } from "./config.js";

/*==========================================
PRIVATE STATE
==========================================*/

let shippingData = [];

/*==========================================
LOAD SHIPPING
==========================================*/

export async function loadShippingPrices() {

    try {

        const response =
            await fetch(
                CONFIG.API_URL +
                "?action=shipping"
            );

        if (!response.ok) {

            throw new Error(
                `HTTP ${response.status}`
            );

        }

        const json =
            await response.json();

        if (!json.success) {

            shippingData = [];

            return [];

        }

        shippingData =
            Array.isArray(json.shipping)
                ? json.shipping
                : [];

        return shippingData;

    }

    catch (error) {

        console.error(
            "Shipping Error:",
            error
        );

        shippingData = [];

        return [];

    }

}

/*==========================================
GET ALL WILAYAS
==========================================*/

export function getShippingData() {

    return shippingData;

}

/*==========================================
GET ONE WILAYA
==========================================*/

export function getWilaya(name) {

    return shippingData.find(

        item => item.wilaya === name

    ) || null;

}

/*==========================================
GET COMMUNES
==========================================*/

export function getCommunes(name) {

    const wilaya =
        getWilaya(name);

    if (!wilaya) {

        return [];

    }

    return Array.isArray(
        wilaya.communes
    )

        ? wilaya.communes

        : [];

}

/*==========================================
GET SHIPPING PRICE
==========================================*/

export function getShippingPrice(
    wilayaName,
    shippingType
) {

    const wilaya =
        getWilaya(
            wilayaName
        );

    if (!wilaya) {

        return 0;

    }

    return shippingType === "Home"

        ? Number(
            wilaya.home
        )

        : Number(
            wilaya.desk
        );

}
