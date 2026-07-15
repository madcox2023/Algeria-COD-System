/**
 * ==========================================
 * Algeria COD System
 * app.js
 * Version 2.0.0
 * ==========================================
 */

import { CONFIG } from "./config.js";

import {
    fetchProduct,
    submitOrder
} from "./api.js";

import {
    loadWilayas,
    loadShippingPrices,
    populateWilayas,
    getShippingPrice
} from "./shipping.js";

import {
    validateOrder
} from "./validator.js";

import {
    calculateOrderTotal,
    formatPrice
} from "./calculator.js";

/*==========================================
GLOBAL VARIABLES
==========================================*/

let currentProduct = null;

let currentShippingPrice = 0;

let currentWilayas = [];

let currentShipping = [];

/*==========================================
DOM ELEMENTS
==========================================*/

const elements = {};

/*==========================================
START APPLICATION
==========================================*/

document.addEventListener(
    "DOMContentLoaded",
    init
);

/*==========================================
INIT
==========================================*/

async function init() {

    console.log(
        "Algeria COD System v2 Started"
    );

    try {

        cacheElements();

        await initializeSystem();

    }

    catch (error) {

        console.error(error);

    }

}

/*==========================================
CACHE DOM
==========================================*/

function cacheElements() {

    elements.container =
        document.getElementById(
            "algeria-cod-form"
        );

    elements.image =
        document.getElementById(
            "product-image"
        );

    elements.productName =
        document.getElementById(
            "product-name"
        );

    elements.productPrice =
        document.getElementById(
            "product-price"
        );

    elements.customerName =
        document.getElementById(
            "customer-name"
        );

    elements.phone =
        document.getElementById(
            "phone"
        );

    elements.wilaya =
        document.getElementById(
            "wilaya"
        );

    elements.commune =
        document.getElementById(
            "commune"
        );

    elements.address =
        document.getElementById(
            "address"
        );

    elements.quantity =
        document.getElementById(
            "quantity"
        );

    elements.plus =
        document.getElementById(
            "plus-btn"
        );

    elements.minus =
        document.getElementById(
            "minus-btn"
        );

    elements.summaryProduct =
        document.getElementById(
            "summary-product"
        );

    elements.summaryShipping =
        document.getElementById(
            "summary-shipping"
        );

    elements.summaryTotal =
        document.getElementById(
            "summary-total"
        );

    elements.submit =
        document.getElementById(
            "submit-order"
        );

}



/* END PART 1 */
/*==========================================
LOAD PRODUCT
==========================================*/

async function loadProduct() {

    const productId =
        elements.container.dataset.product;

    if (!productId) {

        throw new Error(
            "Product ID not found."
        );

    }

    console.log(
        "Loading product:",
        productId
    );

    const result =
        await fetchProduct(productId);

    if (!result || !result.success) {

        throw new Error(
            "Unable to load product."
        );

    }

    currentProduct =
        result.product;

    renderProduct();

}

/*==========================================
RENDER PRODUCT
==========================================*/

function renderProduct() {

    if (!currentProduct) {

        return;

    }

    elements.productName.textContent =
        currentProduct.name;

    elements.productPrice.textContent =
        formatPrice(
            currentProduct.price,
            CONFIG.CURRENCY
        );

    elements.summaryProduct.textContent =
        formatPrice(
            currentProduct.price,
            CONFIG.CURRENCY
        );

    if (currentProduct.image) {

        elements.image.src =
            currentProduct.image;

    }

}

/*==========================================
LOAD SHIPPING
==========================================*/

async function loadShippingData() {

    currentWilayas =
        await loadWilayas();

    currentShipping =
        await loadShippingPrices();

    populateWilayas(
        elements.wilaya
    );

}

/*==========================================
INITIALIZE SYSTEM
==========================================*/

async function initializeSystem() {

    console.log(
        "Initializing..."
    );

    await loadProduct();

    await loadShippingData();

    updateSummary();

    console.log(
        "System Ready"
    );

}

/* END PART 2 */
