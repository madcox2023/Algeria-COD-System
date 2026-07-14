/**
 * Algeria COD System
 * app.js
 * Version 1.0.0
 */

import { CONFIG } from "./config.js";

import {
    loadWilayas,
    loadShippingPrices
} from "./shipping.js";

import {
    validateOrder
} from "./validator.js";

import {
    calculateOrderTotal,
    formatPrice
} from "./calculator.js";

import {
    submitOrder
} from "./api.js";

document.addEventListener("DOMContentLoaded", init);

/**
 * تشغيل النظام
 */
async function init() {

    console.log("Algeria COD System Started");

    try {

        // تحميل الولايات
        await loadWilayas();

        // تحميل أسعار الشحن
        await loadShippingPrices();

        // إنشاء الفورم
        renderForm();

        // ربط الأحداث
        bindEvents();

    } catch (error) {

        console.error(error);

    }

}

/**
 * إنشاء الفورم
 */
function renderForm() {

    const container = document.getElementById("algeria-cod-form");

    if (!container) {

        console.error("Container #algeria-cod-form not found.");

        return;

    }

    container.innerHTML = `
        <h2>Algeria COD System</h2>

        <!-- سيتم بناء الفورم هنا في الخطوة القادمة -->
    `;

}

/**
 * ربط الأحداث
 */
function bindEvents() {

    console.log("Events Ready");

}
