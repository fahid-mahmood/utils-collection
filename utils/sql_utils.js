"use strict";

const { isNotEmpty } = require("./common_utils");

/**
 * This function takes a string as input and returns a string with words separated by + or empty string.
 * The returned string is used to match all words no matter their position in the input string.
 *
 * @since 1.0.1
 * @category Utils
 * @param {string} str The input string to be processed.
 * @param {boolean} matchOnlyOne A flag to control whether to add + before each word or not
 * @returns {string} Returns processed string or empty string if input is empty
 * @example
 * sqlMatchPattern("Ichhra Lahore Pakistan") // => '+Ichhra* +Lahore* +Pakistan*'
 * sqlMatchPattern("Ichhra Lahore Pakistan", true) // => 'Ichhra* Lahore*Pakistan*'
 */
function sqlMatchPattern(str, matchOnlyOne = false) {
    if (isNotEmpty(str)) {
        str = str.trim(); //Remove whitespace from both sides of a string
        str = str.replace(/\s+/g, " "); //Remove more then one spaces.
        let split_str = str.split(" ");
        let compare_array = [];
        for (let str_part of split_str) {
            let and_operator = matchOnlyOne ? "" : "+";
            compare_array.push(`${and_operator}${str_part}*`); //e.g +lahor* or lahor*
        }
        return compare_array.join(" ");
    }
    return "";
}

/**
 * This function takes a string as input and returns a string with words separated by LOCATE('word', columnNames) or empty string.
 * The returned string is used to match all words no matter their position in the input string.
 *
 * @since 1.0.1
 * @category Utils
 * @param {string} str The input string to be processed.
 * @param {string[]} columnNames An array of column names used to match words in
 * @returns {string} Returns processed string or empty string if input is empty
 * @example
 * sqlLocatePattern("chowk lahore", ["address", "keywords"]) // => "(LOCATE('chowk', CONCAT(address," ",keywords)) AND LOCATE('lahore', CONCAT(address," ",keywords)))"
 */
function sqlLocatePattern(str, columnNames = []) {
    if (isNotEmpty(str)) {
        str = str.trim(); //Remove whitespace from both sides of a string
        str = str.replace(/\s+/g, " "); //Remove more then one spaces.
        let split_str = str.split(" ");
        let compare_array = [];
        for (let str_part of split_str) {
            let multi_column = columnNames.length > 1 ? `CONCAT(${columnNames.join('," ",')})` : columnNames[0];
            compare_array.push(`LOCATE('${str_part}', ${multi_column})`); //e.g
        }
        return "(" + compare_array.join(" AND ") + ")";
    }
    return "";
}

module.exports = {
    sqlLocatePattern,
    sqlMatchPattern
};
