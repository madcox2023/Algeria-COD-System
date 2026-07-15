/**
 * ==========================================
 * Algeria COD System
 * app.js
 * Version 3.0.0 Stable
 * ==========================================
 */

import { CONFIG } from "./config.js";

import {
    fetchProduct,
    submitOrder
} from "./api.js";

import {
    loadShippingPrices
} from "./shipping.js";

import {
    calculateOrderTotal,
    formatPrice
} from "./calculator.js";

import {
    validateOrder
} from "./validator.js";

/*==========================================
APPLICATION STATE
==========================================*/

const state = {

    product: null,

    shippingData: [],

    selectedWilaya: null,

    selectedCommune: null,

    shippingType: "Home",

    shippingPrice: 0,

    quantity: 1,

    loading: false

};
/*==========================================
DOM CACHE
==========================================*/

const elements = {

    container: null,

    image: null,

    productName: null,

    productPrice: null,

    customerName: null,

    phone: null,

    address: null,

    quantity: null,

    plus: null,

    minus: null,

    submit: null,

    summaryProduct: null,

    summaryShipping: null,

    summaryTotal: null,

    wilayaButton: null,

    wilayaList: null,

    communeButton: null,

    communeList: null

};

/*==========================================
DOM READY
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
        "Algeria COD System v3"
    );

    try {

        cacheElements();

        await initializeSystem();

    }

    catch (error) {

        console.error(
            error
        );

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

    elements.submit =
        document.getElementById(
            "submit-order"
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

    elements.wilayaButton =
        document.getElementById(
            "wilaya-btn"
        );

    elements.wilayaList =
        document.getElementById(
            "wilaya-list"
        );

    elements.communeButton =
        document.getElementById(
            "commune-btn"
        );

    elements.communeList =
        document.getElementById(
            "commune-list"
        );

}

/*==========================================
INITIALIZE SYSTEM
==========================================*/

async function initializeSystem() {

    state.loading = true;

    try {

        await Promise.all([

            loadProduct(),

            loadShipping()

        ]);

        bindEvents();

        updateSummary();

        state.loading = false;

        console.log(
            "System Ready"
        );

    }

    catch (error) {

        state.loading = false;

        console.error(
            "Initialize Error:",
            error
        );

    }

}

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

    const result =
        await fetchProduct(
            productId
        );

    if (

        !result ||

        !result.success ||

        !result.product

    ) {

        throw new Error(
            "Unable to load product."
        );

    }

    state.product =
        result.product;

    renderProduct();

}

/*==========================================
RENDER PRODUCT
==========================================*/

function renderProduct() {

    if (!state.product) {

        return;

    }

    elements.productName.textContent =

        state.product.name;

    elements.productPrice.textContent =

        formatPrice(

            state.product.price,

            CONFIG.CURRENCY

        );

    elements.summaryProduct.textContent =

        formatPrice(

            state.product.price,

            CONFIG.CURRENCY

        );

    if (state.product.image) {

        elements.image.src =
            state.product.image;

        elements.image.onerror =
            () => {

                console.warn(
                    "Image Load Failed"
                );

            };

    }

}

/*==========================================
LOAD SHIPPING
==========================================*/

async function loadShipping() {

    const data =
        await loadShippingPrices();

    state.shippingData =

        Array.isArray(data)
            ? data
            : [];

    buildWilayaDropdown();

}

/*==========================================
BUILD WILAYA DROPDOWN
==========================================*/

function buildWilayaDropdown() {

    elements.wilayaList.innerHTML = "";

    state.shippingData.forEach(item => {

        const option =
            document.createElement("div");

        option.className =
            "dropdown-item";

        option.textContent =
            item.code +
            " - " +
            item.wilaya;

        option.addEventListener(
            "click",
            () => selectWilaya(item)
        );

        elements.wilayaList.appendChild(
            option
        );

    });

}

/*==========================================
BUILD COMMUNE DROPDOWN
==========================================*/

function buildCommuneDropdown(
    wilaya
) {

    elements.communeList.innerHTML = "";

    if (!wilaya) {

        return;

    }

    wilaya.communes.forEach(commune => {

        const option =
            document.createElement("div");

        option.className =
            "dropdown-item";

        option.textContent =
            commune;

        option.addEventListener(
            "click",
            () => selectCommune(commune)
        );

        elements.communeList.appendChild(
            option
        );

    });

}

/*==========================================
SELECT WILAYA
==========================================*/

function selectWilaya(
    wilaya
) {

    state.selectedWilaya =
        wilaya;

    state.selectedCommune =
        null;

    elements.wilayaButton.textContent =
        wilaya.code +
        " - " +
        wilaya.wilaya;

    elements.communeButton.textContent =
        "اختر البلدية";

    buildCommuneDropdown(
        wilaya
    );

    closeDropdowns();

    updateShipping();

}

/*==========================================
SELECT COMMUNE
==========================================*/

function selectCommune(
    commune
) {

    state.selectedCommune =
        commune;

    elements.communeButton.textContent =
        commune;

    closeDropdowns();

}

/*==========================================
OPEN / CLOSE DROPDOWN
==========================================*/

function toggleDropdown(
    list
) {

    closeDropdowns();

    list.classList.toggle(
        "show"
    );

}

function closeDropdowns() {

    elements.wilayaList.classList.remove(
        "show"
    );

    elements.communeList.classList.remove(
        "show"
    );

}
/*==========================================
BIND EVENTS
==========================================*/

function bindEvents() {

    /* Wilaya Button */

    elements.wilayaButton.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();

            toggleDropdown(
                elements.wilayaList
            );

        }
    );

    /* Commune Button */

    elements.communeButton.addEventListener(
        "click",
        (event) => {

            if (!state.selectedWilaya) {

                return;

            }

            event.stopPropagation();

            toggleDropdown(
                elements.communeList
            );

        }
    );

    /* Close Dropdowns */

    document.addEventListener(
        "click",
        closeDropdowns
    );

    /* Quantity */

    elements.plus.addEventListener(
        "click",
        () => {

            state.quantity++;

            elements.quantity.value =
                state.quantity;

            updateSummary();

        }
    );

    elements.minus.addEventListener(
        "click",
        () => {

            if (state.quantity <= 1) {

                return;

            }

            state.quantity--;

            elements.quantity.value =
                state.quantity;

            updateSummary();

        }
    );

    /* Shipping Type */

    document
        .querySelectorAll(
            'input[name="shipping"]'
        )
        .forEach(radio => {

            radio.addEventListener(
                "change",
                (event) => {

                    state.shippingType =
                        event.target.value;

                    updateShipping();

                }
            );

        });

    /* Submit */

    elements.submit.addEventListener(
        "click",
        submitCurrentOrder
    );

}

/*==========================================
UPDATE SHIPPING
==========================================*/

function updateShipping() {

    if (!state.selectedWilaya) {

        state.shippingPrice = 0;

        updateSummary();

        return;

    }

    if (state.shippingType === "Home") {

        state.shippingPrice =
            Number(
                state.selectedWilaya.home
            );

    }

    else {

        state.shippingPrice =
            Number(
                state.selectedWilaya.desk
            );

    }

    updateSummary();

}

/*==========================================
UPDATE SUMMARY
==========================================*/

function updateSummary() {

    if (!state.product) {

        return;

    }

    const productTotal =
    Number(state.product.price) *
    state.quantity;

const shippingTotal =
    Number(state.shippingPrice);

const orderTotal =
    productTotal +
    shippingTotal;

    elements.quantity.value =
        state.quantity;

    elements.summaryProduct.textContent =

        formatPrice(

            productTotal,

            CONFIG.CURRENCY

        );

    elements.summaryShipping.textContent =

        formatPrice(

            state.shippingPrice,

            CONFIG.CURRENCY

        );

    elements.summaryTotal.textContent =

        formatPrice(

            orderTotal,

            CONFIG.CURRENCY

        );

}

/*==========================================
SUBMIT ORDER
==========================================*/

async function submitCurrentOrder() {

    const order = {

        productId:
            state.product.id,

        productName:
            state.product.name,

        customerName:
            elements.customerName.value.trim(),

        phone:
            elements.phone.value.trim(),

        wilaya:
            state.selectedWilaya
                ? state.selectedWilaya.wilaya
                : "",

        commune:
            state.selectedCommune || "",

        address:
            elements.address.value.trim(),

        quantity:
            state.quantity,

        shippingType:
            state.shippingType,

        shippingPrice:
            state.shippingPrice,

        productPrice:
            state.product.price,

        total:
            (
                state.product.price *
                state.quantity
            ) +
            state.shippingPrice

    };

    const validation =
        validateOrder(order);

    if (!validation.valid) {

        alert(
            validation.message
        );

        return;

    }

    elements.submit.disabled =
        true;

    elements.submit.textContent =
        "جارٍ إرسال الطلب...";

    try {

        const result =
            await submitOrder(order);

        if (result.success) {

    alert(
        "تم إرسال الطلب بنجاح"
    );

}

        else {

            alert(
                "❌ فشل إرسال الطلب"
            );

        }

    }

    catch (error) {

        console.error(error);

        alert(
            "حدث خطأ أثناء الإرسال"
        );

    }

    finally {

        elements.submit.disabled =
            false;

        elements.submit.textContent =
            "تأكيد الطلب";

    }

}



/*==========================================
resetForm
==========================================*/
function resetForm() {

    // الاسم
    elements.customerName.value = "";

    // الهاتف
    elements.phone.value = "";

    // العنوان
    elements.address.value = "";

    // الكمية
    state.quantity = 1;
    elements.quantity.value = 1;

    // الولاية
    state.selectedWilaya = null;
    elements.wilayaButton.textContent =
        "اختر الولاية";

    // البلدية
    state.selectedCommune = null;
    elements.communeButton.textContent =
        "اختر البلدية";

    elements.communeList.innerHTML = "";

    // نوع الشحن
    state.shippingType = "Home";

    document.querySelector(
        'input[value="Home"]'
    ).checked = true;

    // سعر الشحن
    state.shippingPrice = 0;

    // تحديث الملخص
    updateSummary();

}

