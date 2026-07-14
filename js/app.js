/**
 * Algeria COD System
 * app.js
 * Version 1.0.0
 */

import { CONFIG } from "./config.js";

import {
    loadWilayas,
    loadShippingPrices,
    populateWilayas
} from "./shipping.js";

import {
    calculateOrderTotal,
    formatPrice
} from "./calculator.js";

import {
    validateOrder
} from "./validator.js";

import {
    submitOrder
} from "./api.js";

document.addEventListener("DOMContentLoaded", init);

async function init() {

    console.log("Algeria COD System Started");

}
