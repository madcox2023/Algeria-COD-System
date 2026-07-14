/**
 * Algeria COD System
 * calculator.js
 */

/**
 * حساب سعر المنتجات
 */
export function calculateProductsTotal(price, quantity) {

    return Number(price) * Number(quantity);

}

/**
 * حساب المجموع النهائي
 */
export function calculateOrderTotal(
    productPrice,
    quantity,
    shippingPrice
) {

    const productsTotal =
        calculateProductsTotal(
            productPrice,
            quantity
        );

    return productsTotal + Number(shippingPrice);

}

/**
 * تنسيق السعر
 */
export function formatPrice(price, currency = "دج") {

    return Number(price).toLocaleString("fr-DZ") +
        " " +
        currency;

}
