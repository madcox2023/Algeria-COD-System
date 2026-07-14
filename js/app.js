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

    // قراءة معرف المنتج من Raw HTML
    const productId = container.dataset.product;

    console.log("Product ID:", productId);

    container.innerHTML = `

<div class="cod-wrapper">

    <div class="product-box">

        <img
            id="product-image"
            src=""
            alt="Product"
        >

        <h2 id="product-name"></h2>

        <h3 id="product-price"></h3>

    </div>

    <form id="order-form">

        <input
            type="text"
            id="customer-name"
            placeholder="الاسم الكامل"
        >

        <input
            type="tel"
            id="phone"
            placeholder="رقم الهاتف"
        >

        <select id="wilaya">

            <option value="">
                اختر الولاية
            </option>

        </select>

        <select id="commune">

            <option value="">
                اختر البلدية
            </option>

        </select>

        <textarea
            id="address"
            placeholder="العنوان"
        ></textarea>

        <input
            type="number"
            id="quantity"
            value="${CONFIG.DEFAULT_QUANTITY}"
            min="1"
        >

        <select id="shipping-type">

            <option value="Home">
                إلى المنزل
            </option>

            <option value="Desk">
                مكتب التوصيل
            </option>

        </select>

        <div class="summary">

            <div>

                سعر المنتج :

                <span id="summary-product">

                    0 ${CONFIG.CURRENCY}

                </span>

            </div>

            <div>

                سعر الشحن :

                <span id="summary-shipping">

                    0 ${CONFIG.CURRENCY}

                </span>

            </div>

            <div>

                الإجمالي :

                <span id="summary-total">

                    0 ${CONFIG.CURRENCY}

                </span>

            </div>

        </div>

        <button
            type="submit"
            id="submit-order"
        >

            تأكيد الطلب

        </button>

    </form>

</div>

`;

}

/**
 * ربط الأحداث
 */
function bindEvents() {

    console.log("Events Ready");

}
