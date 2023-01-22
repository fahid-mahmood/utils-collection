"use strict";

const { isNotEmpty, formatErrorString, isEmpty } = require("./common_utils");
const { printErrorLog } = require("./debugging_utils");

const PNF = require("google-libphonenumber").PhoneNumberFormat;
const PNT = require("google-libphonenumber").PhoneNumberType;
const phoneUtil = require("google-libphonenumber").PhoneNumberUtil.getInstance();

/**
 * Generates a random integer within a given range.
 *
 * @since 1.0.1
 * @category Utils
 * @param {number} min The minimum value of the range.
 * @param {number} max The maximum value of the range.
 * @returns {number} Returns a random integer within the specified range.
 * @example
 * getRandomInt(5, 10) // => 7
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Validates and formats an international phone number.
 *
 * @since 1.0.1
 * @category Utils
 * @param {string} msisdn The phone number to be validated and formatted.
 * @returns {string} Returns the formatted phone number in E.164 format, or null if the input is invalid.
 * @example
 * validateAndFormatInternationalNumber("+1234567890") // => "+1234567890"
 * validateAndFormatInternationalNumber("1234567890") // => "+1234567890"
 */
function validateAndFormatInternationalNumber(msisdn) {
    try {
        if (isNotEmpty(msisdn)) {
            msisdn = msisdn.toString().replace(/\s/g, ""); //Remove All white spaces
            msisdn = msisdn.substr(0, 1) != "+" ? `+${msisdn}` : msisdn; //Add Plus if not added
            const mobile_no = phoneUtil.parseAndKeepRawInput(msisdn);
            if (phoneUtil.isValidNumber(mobile_no) && phoneUtil.isPossibleNumber(mobile_no) && [PNT.FIXED_LINE, PNT.MOBILE, PNT.FIXED_LINE_OR_MOBILE].includes(phoneUtil.getNumberType(mobile_no))) {
                return phoneUtil.format(mobile_no, PNF.E164);
            }
        }
    } catch (e) {
        printErrorLog(formatErrorString(e));
    }
    return null;
}

/**
 * Cleans a phone number by removing white spaces and leading zeroes.
 *
 * @since 1.0.1
 * @category Utils
 * @param {string} msisdn The phone number to be cleaned.
 * @returns {string} Returns the cleaned phone number.
 * @example
 * cleanCallNo("+123 456 7890") // => "1234567890"
 * cleanCallNo("001234567890") // => "1234567890"
 */
function cleanCallNo(msisdn) {
    if (isNotEmpty(msisdn)) {
        msisdn = msisdn.toString();
        msisdn = msisdn.replace(/\s/g, ""); //Remove All white spaces
        msisdn = msisdn.replace(/^0+/, ""); //Remove Leading Zeroes
        msisdn = msisdn.substr(0, 2) == "92" ? msisdn.substr(2) : msisdn;
        msisdn = msisdn.replace(/^0+/, ""); //Remove Leading Zeroes
        return msisdn;
    }
    return "";
}

/**
 * Rounds a floating point number to a specified number of decimal places.
 *
 * @since 1.0.1
 * @category Utils
 * @param {number | string} value The number to be rounded.
 * @param {number} decimal The number of decimal places to round to. Default is 2.
 * @returns {number} Returns the rounded number.
 * @example
 * roundTo(274.1212321) // => 274.12
 * roundTo(274) // => 274
 */
function roundTo(value, decimal = 2) {
    if (isNumeric(value) && value.toString().indexOf(".") !== -1) {
        //Check if floating point number change to 2 decimal place
        return Number(parseFloat(value).toFixed(decimal));
    } else {
        return parseInt(value);
    }
}

/**
 * Checks if a given variable is a numeric value.
 *
 * @since 1.0.1
 * @category Utils
 * @param {number} num The variable to be checked.
 * @returns {boolean} Returns true if the input variable is numeric, false otherwise.
 * @example
 * isNumeric("123") // => true
 * isNumeric("abc") // => false
 */
function isNumeric(num) {
    return !isNaN(num);
}

/**
 * Calculates the discounted price of an amount based on a given discount percentage.
 *
 * @since 1.0.1
 * @category Utils
 * @param {number} amount The original price.
 * @param {number} discountPercentage The discount percentage as a decimal.
 * @param {boolean} doRoundOff If true, rounds off the discounted price to the nearest whole number. Default is false.
 * @returns {number} Returns the discounted price.
 * @example
 * getDiscountedPrice(100, 5) // => 95
 */
function getDiscountedPrice(amount, discountPercentage, doRoundOff = false) {
    if (isEmpty(discountPercentage)) throw "Fee % not defined";
    let discountedPrice = Number(amount) - Number(amount) * (Number(discountPercentage) / 100);
    return doRoundOff ? Math.round(discountedPrice) : discountedPrice;
}

/**
 * Calculates the price after charging a fee on an amount based on a given fee percentage.
 *
 * @since 1.0.1
 * @category Utils
 * @param {number} amount The original price.
 * @param {number} chargingFee The charging fee percentage as a decimal.
 * @param {boolean} doRoundOff If true, rounds off the charging price to the nearest whole number. Default is false.
 * @returns {number} Returns the price after charging a fee.
 * @example
 * getChargingPrice(100, 5) // => 105
 */
function getChargingPrice(amount, chargingFee, doRoundOff = false) {
    if (isEmpty(chargingFee)) throw "Fee % not defined";
    let discountedPrice = Number(amount) + Number(amount) * (Number(chargingFee) / 100);
    return doRoundOff ? Math.round(discountedPrice) : discountedPrice;
}

/**
 * Parses a given variable as a number.
 *
 * @since 1.0.1
 * @category Utils
 * @param {number | string} num The variable to be parsed as a number.
 * @returns {number} Returns the parsed number. If the input is not a number, returns 0.
 * @example
 * parseNumber("123") // => 123
 * parseNumber("abc") // => 0
 */
function parseNumber(num) {
    return isNumeric(num) ? Number(num) : 0;
}

/**
 * Checks if a given variable is a positive integer.
 *
 * @since 1.0.1
 * @category Utils
 * @param {number} n The variable to be checked.
 * @returns {boolean} Returns true if the input variable is a positive integer, false otherwise.
 * @example
 * isPositiveInteger(5) // => true
 * isPositiveInteger(-5) // => false
 */
function isPositiveInteger(n) {
    return n >>> 0 === parseFloat(n);
}

/**
 * Formats a given phone number to a specified format and returns the formatted number.
 *
 * @since 1.0.1
 * @category Utils
 * @param {string} msisdn The phone number to be formatted.
 * @param {string} formatName The format to return the phone number in. Options are 'with_923', 'with_3xx', 'with_03x'. Default is 'with_03x'.
 * @param {boolean} isSimNo If true, only validates mobile phone numbers (not landline numbers). Default is false.
 * @returns {string} Returns the formatted phone number.
 * @example
 * validateCorrectFormat("+923317767454", "with_03x") // => "03317767454"
 * validateCorrectFormat("+a92923317767454", "with_03x") // => ""
 * validateCorrectFormat("+337767454", "with_03x") // => ""
 * validateCorrectFormat("92923317767454", "with_03x") // => "03317767454"
 * validateCorrectFormat("92303777 4715", "with_03x") // => "03037774715"
 */
const RETURN_WITH_923 = "with_923";
const RETURN_WITH_3XX = "with_3xx";
const RETURN_WITH_03X = "with_03x";

function validateCorrectFormat(msisdn, formatName = RETURN_WITH_03X, isSimNo = false) {
    //0300xxxxxxxxx
    try {
        if (isNotEmpty(msisdn)) {
            msisdn = msisdn.toString().replace(/\s/g, ""); //Remove All whitespaces

            msisdn = msisdn.replace("+", ""); //Remove + From no
            if (msisdn.substr(0, 4) == "9292") {
                // 9292300xxxxxxxxx to 92300xxxxxxxxx
                msisdn = msisdn.substr(2);
            }
            msisdn = phoneUtil.parseAndKeepRawInput(msisdn, "PK");
            if (phoneUtil.isValidNumber(msisdn)) {
                if (isSimNo && phoneUtil.getNumberType(msisdn) != 1)
                    //Check if number should be Sim Phone No (Not Landline)
                    return "";

                msisdn = phoneUtil.format(msisdn, PNF.E164); //+923317767454
                if (formatName === RETURN_WITH_923) {
                    return msisdn.substr(1);
                } else if (formatName === RETURN_WITH_3XX) {
                    return msisdn.substr(3);
                } else if (formatName === RETURN_WITH_03X) {
                    return "0" + msisdn.substr(3);
                }
            }
        }
    } catch (e) {
        return "";
    }
    return "";
}

/**
 * Returns the name of the operator for the given phone number.
 *
 * @since 1.0.1
 * @category Utils
 * @param {string} msisdn The phone number to get the operator name for.
 * @returns {string} Returns the name of the operator.
 * @example
 * getOperatorName("923317767454") // => "jazz"
 */
function getOperatorName(msisdn) {
    if (isNotEmpty(msisdn)) {
        msisdn = cleanCallNo(msisdn);
        const two_digits = msisdn.substr(0, 2);
        const three_digits = msisdn.substr(0, 3);
        const four_digits = msisdn.substr(0, 4);
        if (two_digits == "30") return "jazz";
        if (two_digits == "34") return "telenor";
        if (two_digits == "32") return "warid";
        if (two_digits == "31") return "zong";
        if (two_digits == "33") return "ufone";
        if (two_digits == "35" || two_digits == "36") return "scom";

        const area_code_ntc_list = ["6089", "6069", "6049", "5479", "5469", "5449", "5439", "5429", "4779", "4599", "4579", "4549", "4539", "689", "679", "669", "659", "649", "639", "629", "619", "579", "569", "569", "559", "539", "529", "519", "519", "499", "489", "479", "469", "449", "429", "419", "409"];
        const area_code_list = ["608", "606", "604", "547", "546", "544", "543", "542", "477", "459", "457", "454", "453", "68", "67", "66", "65", "64", "63", "62", "61", "57", "56", "56", "55", "53", "52", "51", "51", "49", "48", "47", "46", "44", "42", "41", "40"];
        if (area_code_ntc_list.includes(four_digits) || area_code_ntc_list.includes(three_digits)) return "ntc";
        if (area_code_list.includes(three_digits) || area_code_list.includes(two_digits)) return "ptcl";
    }
    return "other";
}

module.exports = {
    cleanCallNo,
    getChargingPrice,
    getDiscountedPrice,
    getOperatorName,
    getRandomInt,
    isNumeric,
    isPositiveInteger,
    parseNumber,
    roundTo,
    validateAndFormatInternationalNumber,
    validateCorrectFormat
};
