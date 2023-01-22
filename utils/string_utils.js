"use strict";

const moment = require("moment");
const { isNotEmpty, isEmpty } = require("./common_utils");
const { getRandomInt } = require("./number_utils");

/**
 * Pads a number with leading zeros to a given total length.
 *
 * @since 1.0.1
 * @category Utils
 * @param {number} num - The number to be padded.
 * @param {number} [totalLength=2] - The desired total length of the padded number.
 * @returns {string} Returns the padded number as a string.
 * @example
 * pad(3, 4) // => "0003"
 * pad(123, 2) // => "123"
 * pad(-5, 3) // => "-005"
 */
function pad(num, totalLength = 2) {
    return `${num < 0 ? "-" : ""}${Math.abs(num).toString().padStart(totalLength, "0")}`;
}

/**
 * Adds ordinal suffixes to a given date.
 *
 * @since 1.0.1
 * @category Utils
 * @param {string} [date=""] - The date to add ordinal suffixes to.
 * @returns {string} Returns the date with ordinal suffixes added.
 * @example
 * prefix(1) // => "1st"
 * prefix(22) // => "22nd"
 */
function prefix(date = "") {
    const suffixes = {
        1: "st",
        21: "st",
        31: "st",
        2: "nd",
        22: "nd",
        3: "rd",
        23: "rd",
        default: "th"
    };
    const suffix = suffixes[date] || suffixes.default;
    return `${date}${suffix}`;
}

/**
 * Sanitizes a given string by removing any non-alphanumeric characters and leading/trailing whitespaces.
 *
 * @since 1.0.1
 * @category Utils
 * @param {string} str - The string to be sanitized.
 * @returns {string} Returns the sanitized string.
 * @example
 * sanitizeString("!Hello, World?@") // => "Hello, World"
 * sanitizeString(" Test ") // => "Test"
 * sanitizeString("1234567890") // => "1234567890"
 */
function sanitizeString(str) {
    str = str.toString().replace(/[^a-z0-9 \.@,_-]/gim, "");
    return str.trim();
}

/**
 * Converts a given string to clean HTML by removing newline characters and replacing all double quotes with single quotes.
 *
 * @since 1.0.1
 * @category Utils
 * @param {string} str - The string to be converted to clean HTML.
 * @returns {string} Returns the clean HTML string.
 * @example
 * stringToCleanHtml("<p>\nHello, World!\n</p>") // => "<p>Hello, World!</p>"
 * stringToCleanHtml(`<a href="example.com">Link</a>`) // => "<a href='example.com'>Link</a>"
 * stringToCleanHtml("<h1>This is a heading</h1>") // => "<h1>This is a heading</h1>"
 */
function stringToCleanHtml(str) {
    return str
        .toString()
        .replace(/(\r\n|\n|\r)/gm, "")
        .replace(/"/g, "'"); //.replaceAll('"', "'"); //For es6
}

/**
 * Appends a fake UUID to a given id.
 *
 * @since 1.0.1
 * @category Utils
 * @param {string} id - The id to be appended with a fake UUID.
 * @returns {string} Returns the id with a fake UUID appended.
 * @example
 * appendFakeUuid("abc123") // => "11111111-2222-3333-4444-abc123"
 * appendFakeUuid("def456") // => "11111111-2222-3333-4444-def456"
 * appendFakeUuid("ghi789") // => "11111111-2222-3333-4444-ghi789"
 */
function appendFakeUuid(id) {
    return "11111111-2222-3333-4444-" + id;
}

/**
 * Parses a given id to remove the fake UUID and returns the original id.
 *
 * @since 1.0.1
 * @category Utils
 * @param {string} id - The id to be parsed.
 * @param {string} [appType="employee_app"] - The type of app the id belongs to.
 * @returns {string} Returns the original id after removing the fake UUID.
 * @example
 * parseFakeUuid("11111111-2222-3333-4444-abc123", "employee_app") // => "abc123"
 * parseFakeUuid("11111111-2222-3333-4444-def456", "employee_app") // => "def456"
 * parseFakeUuid("11111111-2222-3333-4444-ghi789", "employee_app") // => "ghi789"
 */
function parseFakeUuid(id, appType = "employee_app") {
    id = id.toString().replace("11111111-2222-3333-4444-", "");
    if (id.indexOf("-") !== -1 && appType == "employee_app") {
        //Still contains - means old id
        return "old_uuid";
    }
    return id;
}

/**
 * Trims all fields in an object and its children.
 *
 * @since 1.0.1
 * @category Utils
 * @param {object} obj - The object to be trimmed.
 * @returns {object} Returns the object with all fields trimmed.
 * @example
 * var obj = {
 * field1: " value1 ",
 * field2: " value2 ",
 * field3: " value3 "
 * }
 * trimAllFieldsInObjectAndChildren(obj) // => {field1: "value1", field2: "value2", field3: "value3"}
 */
function trimAllFieldsInObjectAndChildren(obj) {
    return JSON.parse((typeof obj == "string" ? obj : JSON.stringify(obj)).replace(/"\s+|\s+"/g, '"'));
}

/**
 * Replaces all occurrences of key strings from a given map object in a given string with their corresponding values.
 *
 * @since 1.0.1
 * @category Utils
 * @param {string} str - The string to perform the replacements on.
 * @param {object} mapObj - The map object containing the key strings and their corresponding values.
 * @returns {string} Returns the string with all replacements made.
 * @example
 * var str = "I have a cat, a dog, and a goat.";
 * var mapObj = {
 * cat:"dog",
 * dog:"goat",
 * goat:"cat"
 * };
 * replaceAll(str, mapObj) // => "I have a dog, a goat, and a cat."
 */
function replaceAll(str, mapObj) {
    let re = new RegExp(
        Object.keys(mapObj)
            .map((key) => escapeRegex(key))
            .join("|"),
        "gi"
    );
    return str.replace(re, function (matched) {
        return mapObj[matched];
    });
}

/**
 * Beautifies a given enum string by replacing underscores and dashes with spaces and capitalizing the first letter of each word.
 *
 * @since 1.0.1
 * @category Utils
 * @param {string} str - The enum string to be beautified.
 * @returns {string} Returns the beautified enum string.
 * @example
 * beautifyEnum("beautiful_enum") // => "Beautiful Enum"
 * beautifyEnum("BEAUTIFUL_ENUM") // => "Beautiful Enum"
 * beautifyEnum("beautiful-enum") // => "Beautiful Enum"
 */
function beautifyEnum(str) {
    if (isEmpty(str)) return "";
    const mapObj = { _: " ", "-": " " };
    return replaceAll(str, mapObj).replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
}

/**
 * Replaces special characters in a string with their escaped versions.
 *
 * @since 1.0.1
 * @category Utils
 * @param {string} string The string to be modified.
 * @returns {string} Returns the modified string.
 * @example
 * escapeRegex("Hello, world!") // => "Hello\, world\!"
 * escapeRegex("$100") // => "\$100"
 * escapeRegex("[abc]") // => "\[abc\]"
 */
function escapeRegex(string) {
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}

/**
 * Generates a unique serial number based on the current time and a random number.
 *
 * @since 1.0.1
 * @category Utils
 * @returns {string} Returns the unique serial number in the format "current time in milliseconds.random number".
 * @example
 * getUniqueSerialNo() // => "1609336966111.1234"
 */
function getUniqueSerialNo() {
    return moment().valueOf() + "." + getRandomInt(1000, 9999);
}

/**
 * Pluralizes a noun based on a given count.
 *
 * @since 1.0.1
 * @category Utils
 * @param {number} count The number to base the pluralization on.
 * @param {string} noun The noun to be pluralized.
 * @param {string} [suffix="s"] The suffix to be added for pluralization.
 * @returns {string} Returns the pluralized noun in the format "count noun[suffix]".
 * @example
 * pluralize(1, "dog") // => "1 dog"
 * pluralize(2, "dog") // => "2 dogs"
 * pluralize(3, "box", "es") // => "3 boxes"
 */
function pluralize(count, noun, suffix = "s") {
    return `${count} ${beautifyEnum(noun)}${count !== 1 ? suffix : ""}`;
}

/**
 * Removes the last dot or comma from a string.
 *
 * @since 1.0.1
 * @category Utils
 * @param {string} str The string to be modified.
 * @param {boolean} [removeWhiteSpaces=true] Flag indicating whether to remove all whitespaces from the string.
 * @returns {string} Returns the modified string with the last dot or comma removed.
 * @example
 * removeLastDotOrComma("Hello, world.") // => "Hello, world"
 * removeLastDotOrComma("Hello, world,") // => "Hello, world"
 * removeLastDotOrComma("Hello, world .") // => "Hello, world"
 */
function removeLastDotOrComma(str, removeWhiteSpaces = true) {
    if (isNotEmpty(str)) {
        str = str.toString(); //replace is function of string just to be sure.
        if (removeWhiteSpaces) str = str.replace(/\s/g, ""); //Remove All whitespaces (e.g "Could not add Card" becomes "CouldnotaddCard")
        str = str.replace(/\,+$/, ""); //Remove Last Commas
        str = str.replace(/\.+$/, ""); //Remove Last Dot
        return str;
    }
    return null;
}

/**
 * Removes duplicate items from an array.
 * This method is efficient and fast as it uses a single for loop and an object, rather than using nested loops or additional data structures like other methods.
 *
 * @since 1.0.2
 * @category Utils
 * @param {Array} arr The array to be modified.
 * @returns {Array} Returns the modified array with duplicate items removed.
 * @example
 * removeDuplicates([1, 2, 3, 2, 4, 1]) // => [1, 2, 3, 4]
 * removeDuplicates(["apple", "banana", "apple", "orange"]) // => ["apple", "banana", "orange"]
 * removeDuplicates([1, "1", 2, "2"]) // => [1, "1", 2, "2"]
 */
function removeDuplicates(arr) {
    let seen = {};
    let unique = [];
    for (let i = 0; i < arr.length; i++) {
        let value = arr[i];
        if (!seen[value]) {
            seen[value] = true;
            unique.push(value);
        }
    }
    return unique;
}

/**
 * Removes trailing zeroes from a number or string representation of a number.
 *
 * @since 1.0.1
 * @category Utils
 * @param {string | number} value The number or string representation of a number to be modified.
 * @returns {string} Returns the modified number or string representation of a number with trailing zeroes removed.
 * @example
 * removeTrailingZeros(12.300) // => "12.3"
 * removeTrailingZeros("100.000") // => "100"
 * removeTrailingZeros(6.0) // => "6"
 */
function removeTrailingZeros(value) {
    value = value.toString();
    let cutFrom = value.length - 1;
    // as long as the last character is a 0, remove it
    do {
        // console.log('Checking:', value[cutFrom], cutFrom)
        if (value[cutFrom] === "0") {
            cutFrom--;
        }
    } while (value[cutFrom] === "0");
    return value.substr(0, cutFrom + 1);
}

/**
 * Generates a random password with a specified length.
 *
 * @since 1.0.1
 * @category Utils
 * @param {number} length The desired length of the password.
 * @returns {string} Returns the generated password.
 * @example
 * generatePassword(8) // => "A1b2C3d4"
 * generatePassword(12) // => "aBcDeFgHiJkL"
 * generatePassword(16) // => "A1B2C3D4E5F6G7H8"
 */
function generatePassword(length) {
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return generateCustomString(characters, length);
}

/**
 * Generates a random string with a specified length, using a custom set of characters.
 *
 * @since 1.0.1
 * @category Utils
 * @param {number} length The desired length of the generated string.
 * @returns {string} Returns the generated string.
 * @example
 * generatePlusPostFix(8) // => "5FMPVX7R"
 * generateCustomString("abc123", 4) // => "1b2c"
 * generateCustomString("!@#$%^", 6) // => "%^@!#"
 */
function generatePlusPostFix(length) {
    let characters = "23456789CFGHJMPQRVWX";
    return generateCustomString(characters, length);
}

function generateCustomString(characters, length) {
    let result = "";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

/**
 * Pauses the execution of the program for a specified amount of time in milliseconds.
 *
 * @since 1.0.1
 * @category Utils
 * @param {number} ms The number of milliseconds to sleep.
 * @returns {Promise} Returns a promise that resolves after the specified amount of time has passed.
 * @example
 * await sleep(1000);
 * console.log("I'm awake!"); // => "I'm awake!" (displays after 1 second)
 */
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

/**
 * Checks if a given variable is iterable.
 *
 * @since 1.0.1
 * @category Utils
 * @param {string | object | array | number} obj The variable to be checked.
 * @returns {boolean} Returns true if the input variable is iterable, false otherwise.
 * @example
 * isIterable([1, 2, 3]) // => true
 * isIterable("Hello, world!") // => true
 * isIterable({"name": "John Doe"}) // => false
 */
function isIterable(obj) {
    // checks for null and undefined
    if (obj == null) {
        return false;
    }
    return typeof obj[Symbol.iterator] === "function";
}

module.exports = {
    appendFakeUuid,
    beautifyEnum,
    generatePassword,
    generatePlusPostFix,
    getUniqueSerialNo,
    isIterable,
    pad,
    parseFakeUuid,
    pluralize,
    prefix,
    removeDuplicates,
    removeLastDotOrComma,
    removeTrailingZeros,
    replaceAll,
    sanitizeString,
    sleep,
    stringToCleanHtml,
    trimAllFieldsInObjectAndChildren
};
