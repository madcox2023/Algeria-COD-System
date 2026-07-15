/**
 * Algeria COD System
 * validator.js
 */

/**
 * إزالة المسافات الزائدة
 */
export function sanitize(value) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }

    return String(value).trim();

}

/**
 * التحقق من الاسم
 */
export function validateName(name) {

    name = sanitize(name);

    if (name.length < 3) {
        return {
            valid: false,
            message: "الاسم يجب أن يحتوي على 3 أحرف على الأقل."
        };
    }

    return { valid: true };

}

/**
 * التحقق من رقم الهاتف الجزائري
 */
export function validatePhone(phone) {

    phone = sanitize(phone)
        .replace(/\s/g, "")
        .replace("+213", "0")
        .replace(/^213/, "0");

    const regex =
        /^(05|06|07)[0-9]{8}$/;

    if (!regex.test(phone)) {

        return {

            valid: false,

            message:
                "رقم الهاتف غير صحيح."

        };

    }

    return {

        valid: true

    };

}

/**
 * التحقق من الولاية
 */
export function validateWilaya(wilaya) {

    wilaya = sanitize(wilaya);

    if (!wilaya) {

        return {
            valid: false,
            message: "يرجى اختيار الولاية."
        };

    }

    return { valid: true };

}

/**
 * التحقق من البلدية
 */
export function validateCommune(commune) {

    commune = sanitize(commune);

    if (!commune) {

        return {
            valid: false,
            message: "يرجى إدخال البلدية."
        };

    }

    return { valid: true };

}

/**
 * التحقق من العنوان
 */
export function validateAddress(address) {

    address = sanitize(address);

    if (address.length < 5) {

        return {
            valid: false,
            message: "العنوان غير مكتمل."
        };

    }

    return { valid: true };

}

/**
 * التحقق من الكمية
 */
export function validateQuantity(quantity) {

    quantity = Number(quantity);

    if (isNaN(quantity) || quantity < 1) {

        return {
            valid: false,
            message: "الكمية غير صحيحة."
        };

    }

    return { valid: true };

}

/**
 * التحقق من نوع الشحن
 */
export function validateShipping(type) {

    if (type !== "Home" && type !== "Desk") {

        return {
            valid: false,
            message: "نوع الشحن غير صحيح."
        };

    }

    return { valid: true };

}

/**
 * التحقق من المنتج
 */
export function validateProduct(productId) {

    productId = sanitize(productId);

    if (!productId) {

        return {
            valid: false,
            message: "المنتج غير موجود."
        };

    }

    return { valid: true };

}

/**
 * التحقق من الطلب كاملاً
 */
export function validateOrder(order) {

    let result;

    result =
        validateName(
            order.customerName
        );

    if (!result.valid) {

        return result;

    }

    result =
        validatePhone(
            order.phone
        );

    if (!result.valid) {

        return result;

    }

    result =
        validateWilaya(
            order.wilaya
        );

    if (!result.valid) {

        return result;

    }

    result =
        validateCommune(
            order.commune
        );

    if (!result.valid) {

        return result;

    }

    result =
        validateAddress(
            order.address
        );

    if (!result.valid) {

        return result;

    }

    result =
        validateQuantity(
            order.quantity
        );

    if (!result.valid) {

        return result;

    }

    result =
        validateShipping(
            order.shippingType
        );

    if (!result.valid) {

        return result;

    }

    result =
        validateProduct(
            order.productId
        );

    if (!result.valid) {

        return result;

    }

    return {

        valid: true

    };

}
