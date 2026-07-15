/**
 * Algeria COD System
 * api.js
 * Version: 1.0.0
 */

import { CONFIG } from "./config.js";

/**
 * إرسال طلب جديد
 */
export async function submitOrder(orderData) {

    try {

        const formData =
            new URLSearchParams();

        Object.keys(orderData)
            .forEach(key => {

                formData.append(
                    key,
                    orderData[key]
                );

            });

        const response =
            await fetch(

                CONFIG.API_URL,

                {

                    method: "POST",

                    body: formData

                }

            );

        if (!response.ok) {

            throw new Error(
                `HTTP ${response.status}`
            );

        }

        const result =
            await response.json();

        return {

            success: true,

            data: result

        };

    }

    catch (error) {

        console.error(
            "Submit Order Error:",
            error
        );

        return {

            success: false,

            message: error.message

        };

    }

}

/**
 * جلب بيانات المنتج
 */
export async function fetchProduct(productId) {

    try {

        const response = await fetch(

            `${CONFIG.API_URL}?action=product&id=${encodeURIComponent(productId)}`

        );

        if (!response.ok) {

            throw new Error(`HTTP ${response.status}`);

        }

        return await response.json();

    } catch (error) {

        console.error("Fetch Product Error:", error);

        return null;

    }

}

/**
 * جلب أسعار الشحن
 */
export async function fetchShipping() {

    try {

        const response = await fetch(

            `${CONFIG.API_URL}?action=shipping`

        );

        if (!response.ok) {

            throw new Error(`HTTP ${response.status}`);

        }

        return await response.json();

    } catch (error) {

        console.error("Fetch Shipping Error:", error);

        return [];

    }

}

/**
 * جلب إعدادات النظام
 */
export async function fetchSettings() {

    try {

        const response = await fetch(

            `${CONFIG.API_URL}?action=settings`

        );

        if (!response.ok) {

            throw new Error(`HTTP ${response.status}`);

        }

        return await response.json();

    } catch (error) {

        console.error("Fetch Settings Error:", error);

        return null;

    }

}
