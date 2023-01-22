"use strict";

//These are the common functions which are getting used by other utils too that's why separated them in this class to avoid circular dependency

/**
 * Checks if a given variable is empty.
 *
 * @since 1.0.1
 * @category Utils
 * @param {string | object | array | number} str The variable to be checked.
 * @returns {boolean} Returns true if the input variable is empty, false otherwise. Empty values include {} , [], "", null, undefined, " ", "0000-00-00 00:00:00"
 * @example
 * isEmpty({}) // => true
 * isEmpty(["item1", "item2"]) // => false
 * isEmpty(" ") // => true
 */
function isEmpty(str) {
    str = typeof str == "string" ? str.replace(/\s/g, "") : str; //If it's a string remove all empty spaces
    str = typeof str == "number" ? str.toString() : str; //If it's a number make it string
    str = isJsonObj(str) && Object.keys(str).length === 0 ? "" : str; // if object is empty {}, []
    str = isJsonStr(str) && Object.keys(JSON.parse(str)).length === 0 ? "" : str; // if object string is empty {}, []
    return typeof str == "undefined" || !str || str.length == 0 || str == "" || str == "0000-00-00 00:00:00" || str == null || str == "null";
}

/**
 * Checks if a given variable is not empty.
 *
 * @since 1.0.1
 * @category Utils
 * @param {string | object | number} str The variable to be checked.
 * @returns {boolean} Returns true if the input variable is not empty, false otherwise. Empty values include {} , [], "", null, undefined, " ", "0000-00-00 00:00:00"
 * @example
 * isNotEmpty({}) // => false
 * isNotEmpty(["item1", "item2"]) // => true
 * isNotEmpty(" ") // => false
 */
function isNotEmpty(str) {
    return !isEmpty(str);
}

/**
 * Checks if a given variable is empty or equals to zero.
 *
 * @since 1.0.1
 * @category Utils
 * @param {string | object | array | number} str - The variable to be checked.
 * @returns {boolean} Returns true if the input variable is empty or equals to zero, false otherwise.
 * @example
 * isEmptyIncludingZero({}) // => true
 * isEmptyIncludingZero(["item1", "item2"]) // => false
 * isEmptyIncludingZero(0) // => true
 */
function isEmptyIncludingZero(str) {
    str = typeof str == "string" ? str.replace(/\s/g, "") : str; //If it's a string remove all empty spaces
    return isEmpty(str) || str == "0" || str == "0.0";
}

/**
 * Checks if a given variable is set (not undefined or null).
 *
 * @since 1.0.1
 * @category Utils
 * @param {any} variable - The variable to be checked.
 * @returns {boolean} Returns true if the input variable is set, false otherwise.
 * @example
 * isSet(null) // => false
 * isSet("Hello") // => true
 * isSet(0) // => true
 */
function isSet(variable) {
    if (typeof variable === "undefined" || variable == null) {
        return false;
    } else {
        return true;
    }
}

/**
 * Checks if a given variable is not set (undefined or null).
 *
 * @since 1.0.1
 * @category Utils
 * @param {any} variable - The variable to be checked.
 * @returns {boolean} Returns true if the input variable is not set, false otherwise.
 * @example
 * isNotSet(null) // => true
 * isNotSet("Hello") // => false
 * isNotSet(0) // => false
 */
function isNotSet(variable) {
    return !isSet(variable);
}

/**
 * Checks if a given variable is a json object.
 *
 * @since 1.0.1
 * @category Utils
 * @param {object} obj The variable to be checked.
 * @returns {boolean} Returns true if the input variable is a json object, false otherwise.
 * @example
 * isJsonObj({name: "John", age: 30, city: "New York"}) // => true
 * isJsonObj([1,2,3]) // => true
 * isJsonObj("Hello World") // => false
 */
function isJsonObj(obj) {
    // Call if u want to check if an object is a JSON
    if (typeof obj !== "object") return false;
    try {
        const type = Object.prototype.toString.call(obj).toLowerCase();
        return type === "[object object]" || type === "[object array]";
    } catch (err) {
        return false;
    }
}

/**
 * Checks if a given string is a valid JSON string.
 *
 * @since 1.0.1
 * @category Utils
 * @param {string} str The string to be checked.
 * @returns {boolean} Returns true if the input string is a valid JSON string, false otherwise.
 * @example
 * isJsonStr('{"name": "John", "age": 30, "city": "New York"}') // => true
 * isJsonStr('Hello World') // => false
 */
function isJsonStr(str) {
    // Call if u want to check if an string is a JSON So JSON.parse(str) can be called
    if (typeof str !== "string") return false;
    try {
        const result = JSON.parse(str);
        const type = Object.prototype.toString.call(result).toLowerCase();
        return type === "[object object]" || type === "[object array]";
    } catch (err) {
        return false;
    }
}

/**
 * Formats an error string to be returned.
 *
 * @since 1.0.1
 * @category Utils
 * @param {string | object | array} errorStr The error string to be formatted.
 * @returns {string} Returns a formatted error string.
 * @example
 * formatErrorString(["Error 1", "Error 2"]) // => "["Error 1", "Error 2"]"
 * formatErrorString("Error") // => "Error"
 * formatErrorString(null) // => "Empty Error"
 */
function formatErrorString(errorStr) {
    let resultErrorStr = "Empty Error";
    if (isNotEmpty(errorStr)) {
        if (isJsonObj(errorStr)) {
            resultErrorStr = JSON.stringify(errorStr);
        } else {
            resultErrorStr = errorStr;
        }
    }
    return resultErrorStr;
}

module.exports = {
    formatErrorString,
    isEmpty,
    isEmptyIncludingZero,
    isJsonObj,
    isJsonStr,
    isNotEmpty,
    isNotSet,
    isSet
};
