"use strict";

const moment = require("moment");
const { isEmpty, isNotEmpty } = require("./common_utils");
const { isNumeric } = require("./number_utils");
const { pad, removeDuplicates } = require("./string_utils");

/**
 * Calculates the difference in days between two given dates.
 *
 * @param {string} startDate The start date in "YYYY-MM-DD" format
 * @param {string} endDate The end date in "YYYY-MM-DD" format
 * @returns {number} The difference in days between the two given dates
 * @example
 * getDifferenceInDays("2020-01-01", "2020-01-31") // => 31
 */
function getDifferenceInDays(startDate, endDate) {
    startDate = moment(startDate, "YYYY-MM-DD");
    endDate = moment(endDate, "YYYY-MM-DD");
    return Math.abs(moment.duration(startDate.diff(endDate)).asDays()); //26
}

/**
 * Generates a range of dates between two given dates.
 * @since 1.0.1
 * @category Date
 * @param {string} startDate The start date of the range in the format "YYYY-MM-DD".
 * @param {string} endDate The end date of the range in the format "YYYY-MM-DD".
 * @param {string} type The unit of time to be used for the range (e.g. "days", "months", "years").
 * @param {string} format The format of the generated dates (e.g. "YYYY-MM-DD").
 * @returns {array} Returns an array of dates within the given range, with duplicates removed.
 * @example
 * getRange("2022-01-01", "2022-01-31", "days", "YYYY-MM-DD") // => ["2022-01-01", "2022-01-02", "2022-01-03", ..., "2022-01-31"]
 * getRange("2022-01-01", "2022-12-31", "months", "MMM YYYY") // => ["Jan 2022", "Feb 2022", "Mar 2022", ..., "Dec 2022"]
 * getRange("2022-01-01", "2025-01-01", "years", "YYYY") // => ["2022", "2023", "2024", "2025"]
 */
function getRange(startDate, endDate, type, format) {
    let fromDate = moment(startDate);
    let toDate = moment(endDate);
    let diff = toDate.diff(fromDate, type);
    let range = [];
    for (let i = 0; i <= diff; i++) {
        range.push(moment(startDate).add(i, type).format(format).toLowerCase());
    }
    return removeDuplicates(range);
}

/**
 * The current time stamp in hh:mm:ss AM/PM DD/MM/YYYY format.
 *
 * @returns {string} Current time stamp in hh:mm:ss AM/PM DD/MM/YYYY format
 * @example
 * getCurrent12HourTimeStamp() // => "01:50:53 PM 25/08/2020"
 */
function getCurrent12HourTimeStamp() {
    return moment().format("hh:mm:ss A DD/MM/YYYY");
}

/**
 * Returns the given date time in "YYYY-MM-DD HH:mm:ss" format.
 *
 * @param {string} datetime The date time to be formatted.
 * @returns {string} The given date time in "YYYY-MM-DD HH:mm:ss" format
 * @example
 * getTimeStamp("2020-08-25 13:52:36") // => "2020-08-25 13:52:36"
 */
function getTimeStamp(datetime) {
    return parseDateTime(datetime).format("YYYY-MM-DD HH:mm:ss");
}

/**
 * Returns the current time stamp in "YYYY-MM-DD HH:mm:ss" format.
 *
 * @returns {string} Current time stamp in "YYYY-MM-DD HH:mm:ss" format
 * @example
 * getCurrentTimeStamp() // => "2020-08-25 13:52:36"
 */
function getCurrentTimeStamp() {
    return moment().format("YYYY-MM-DD HH:mm:ss");
}

/**
 * Returns the current time stamp in ISO Date format. It is used to save ISO Date in Mongo Db e.g ISODate("2020-09-25T17:42:41.000Z")
 *
 * @returns {Date} Current time stamp in ISO Date format
 * @example
 * getCurrentTimeStampISO() // => ISODate("2020-09-25T17:42:41.000Z")
 */
function getCurrentTimeStampISO() {
    return new Date();
}

/**
 * Returns the current timestamp with milliseconds.
 *
 * @since 1.0.1
 * @category Utils
 * @returns {string} Returns the current timestamp in the format of "YYYY-MM-DDTHH:mm:ss.SSSZ"
 * @example
 * getCurrentTimeStampWithMs() // => "2020-08-18T15:25:06.250Z"
 */
function getCurrentTimeStampWithMs() {
    return `${moment().format("YYYY-MM-DDTHH:mm:ss.SSS")}Z`;
}

/**
 * Converts the given UTC timestamp to the local time.
 *
 * @since 1.0.1
 * @category Utils
 * @param {string} timestamp - A UTC timestamp in the format of "YYYY-MM-DDTHH:mm:ss.SSSZ"
 * @returns {string} Returns the local time in the format of "YYYY-MM-DD HH:mm:ss"
 * @example
 * utcToLocal("2020-08-18T15:25:06.250Z") // => "2020-08-18 20:25:06"
 * utcToLocal("2022-07-01T23:59:59.999Z") // => "2022-07-02 04:59:59"
 * utcToLocal("2021-12-31T00:00:00.000Z") // => "2022-01-01 05:00:00"
 */
function utcToLocal(timestamp) {
    return moment(timestamp).utcOffset("+0500").format("YYYY-MM-DD HH:mm:ss");
}

/**
 * Returns the number of days in a given month and year.
 *
 * @since 1.0.1
 * @category Utils
 * @param {number} month - The month for which the number of days is to be returned.
 * @param {number} year - The year for which the number of days is to be returned.
 * @returns {number} Returns the number of days in the given month and year.
 * @example
 * getDaysInMonth(2, 2020) // => 29
 * getDaysInMonth(4, 2022) // => 30
 * getDaysInMonth(1, 2021) // => 31
 */
function getDaysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

/**
 * Returns the name of the day for a given date.
 *
 * @since 1.0.1
 * @category Utils
 * @param {number} day - The day of the date.
 * @param {number} month - The month of the date.
 * @param {number} year - The year of the date.
 * @returns {string} Returns the name of the day for the given date.
 * @example
 * getDayName(1, 1, 2022) // => "Sunday"
 * getDayName(15, 6, 2022) // => "Wednesday"
 * getDayName(31, 12, 2022) // => "Saturday"
 */
function getDayName(day, month, year) {
    return moment(new Date(year, month - 1, day)).format("dddd");
}

/**
 * Returns the time difference between two timestamps in the format of "HH:mm:ss"
 *
 * @since 1.0.1
 * @category Utils
 * @param {string} firstTimestamp - The first timestamp in the format of "YYYY-MM-DD HH:mm:ss"
 * @param {string} secondTimestamp - The second timestamp in the format of "YYYY-YY-MM-DD HH:mm:ss"
 *
 * @returns {string} Returns the time difference between the two timestamps in the format of "HH:mm:ss"
 * @example
 * getTimeDifference("2022-05-01 10:00:00", "2022-05-01 12:00:00") // => "02:00:00"
 * getTimeDifference("2022-05-01 12:00:00", "2022-05-01 10:00:00") // => "02:00:00"
 * getTimeDifference("2022-05-01 00:00:00", "2022-05-01 23:59:59") // => "23:59:59"
 */
function getTimeDifference(firstTimestamp, secondTimestamp) {
    let ms = moment(firstTimestamp, "YYYY-MM-DD HH:mm:ss").diff(moment(secondTimestamp, "YYYY-MM-DD HH:mm:ss"));
    let d = moment.duration(ms);
    return pad(Math.floor(d.asHours())) + moment.utc(ms).format(":mm");
}

/**
 * Returns the time duration between two moments in a human-readable format.
 * @since 1.0.1
 * @category Utils
 * @param {moment} momentFirstDate - The first moment object.
 * @param {moment} momentSecondDate - The second moment object.
 * @param {boolean} minify - If true, the output will be in a shortened format (e.g. "1y 2mo 3d 4h 5m 6s" instead of "1 years 2 months 3 days 4 hours 5 minutes 6 seconds").
 * @returns {string} Returns the time duration between the two moments in a human-readable format.
 * @example
 * formatStayedSince(moment("2022-05-01"), moment("2022-06-01")) // => "1 month"
 * formatStayedSince(moment("2022-05-01"), moment("2022-05-01"), true) // => "0s"
 * formatStayedSince(moment("2022-05-01"), moment("2022-09-01"), true) // => "4mo"
 * formatStayedSince(moment("2022-12-01"), "2022-05-01", true) // => 1mo 19d 1h 3m 50s
 */
function formatStayedSince(momentFirstDate, momentSecondDate, minify = false) {
    if (isEmpty(momentFirstDate) || !momentFirstDate._isValid) momentFirstDate = moment(); //using _isValid instead of .isValid as it avoids exception.
    if (isEmpty(momentSecondDate) || !momentSecondDate._isValid) momentSecondDate = moment();
    let intervals = moment.duration(momentSecondDate.diff(momentFirstDate));
    let formatted_time = formatStayedSinceHelper(intervals, minify);
    return isEmpty(formatted_time) ? "0s" : formatted_time;
}

function formatStayedSinceHelper(intervals, minify = false) {
    let year = intervals.get("years");
    let month = intervals.get("months");
    let day = intervals.get("days");
    let hour = intervals.get("hours");
    let minute = intervals.get("minutes");
    let second = intervals.get("seconds");

    let result = "";

    if (year) result = result.concat(year, minify ? "y " : " years ");
    if (month) result = result.concat(month, minify ? "mo " : " months ");
    if (day) result = result.concat(day, minify ? "d " : " days ");
    if (hour) result = result.concat(hour, minify ? "h " : " hours ");
    if (minute) result = result.concat(minute, minify ? "m " : " minutes ");
    if (isEmpty(result) || !hour || minify) {
        if (second) {
            result = result.concat(second, minify ? "s " : " seconds ");
        }
    }
    return result.trim();
}

//Date 01->12:00 TO 12:05 is Table rotation time although table rotated in seconds but when call is going on from last month we need to check in previous table.
/**
 * Checks if the current date and time is the monthly table rotation time.
 *
 * @since 1.0.1
 * @category Utils
 * @returns {boolean} Returns true if the current date and time is the monthly table rotation time (1st day of the month, 00:00 to 00:05), false otherwise.
 * @example
 * isMonthlyTableRotating() // (1st day of the month, 00:00 to 00:05) => true
 * isMonthlyTableRotating() // any other time=> false
 */
function isMonthlyTableRotating() {
    let today = Number(moment().format("DD"));
    let hour = Number(moment().format("HH"));
    let min = Number(moment().format("mm"));
    return today === 1 && hour === 0 && min <= 5;
}

/**
 * Parses the given date and time into a moment object.
 *
 * @since 1.0.1
 * @category Utils
 * @param {string|number|moment} datetime - The date and time to be parsed.
 * @returns {moment} Returns the parsed date and time as a moment object.
 * @example
 * parseDateTime("DEC.1630480520623") // => moment object of the date and time "1630480520623"
 * parseDateTime("1627762295.5722384") // => moment object of the date and time "1627762295.5722384"
 * parseDateTime("2021-05-11") // => moment object of the date and time "2021-05-11"
 * e.g when called from getMonthlyTable
 * DEC.1630480520623 To cdr_logs
 * 1627762295.5722384 To cdr_logs_2021_08
 * nullnull To cdr_logs
 * 2021-05-11 To cdr_logs_2021_05
 */
function parseDateTime(datetime) {
    if (isEmpty(datetime)) return moment();
    if (datetime instanceof moment) return datetime; // true)
    //Converting into string so could perform includes/replace etc feature
    datetime = datetime.toString();
    if (datetime.startsWith("DEC.")) {
        //unix should be Number that's why again converting.
        return moment(Number(datetime.replace("DEC.", "")));
    } else if (datetime.startsWith("HEL.")) {
        //unix should be Number that's why again converting.
        return moment(Number(datetime.replace("HEL.", "")));
    } else if (isNumeric(datetime)) {
        //it means is a unix timestamp
        return moment.unix(Number(datetime));
    } else if (moment(datetime).isValid()) {
        return moment(datetime);
    } else {
        return moment();
    }
}

/**
 * Checks if the given CDR ID belongs to an old month.
 *
 * @since 1.0.1
 * @category Utils
 * @param {string} cdrId - The CDR ID to be checked.
 * @returns {boolean} Returns true if the given CDR ID belongs to an old month, false otherwise.
 * @example
 * isOldMonthCdr("DEC.1630480520623") // => true
 * isOldMonthCdr("1627762295.5722384") // => false
 * isOldMonthCdr("2021-05-11") // => true
 */
function isOldMonthCdr(cdrId) {
    let from_date = parseDateTime(cdrId);
    const month = from_date.month();
    const year = from_date.year(); //year 1970 means datetime format was not correct

    return isNotEmpty(cdrId) && month != moment().month() && year >= 2020; //If month is not same, append month and year in table name to fetch data from that table
}

/**
 * Returns the name of the monthly table for the given date.
 *
 * @since 1.0.1
 * @category Utils
 * @param {string} table - The base table name.
 * @param {string|number|moment} date - The date for which the table name is to be returned.
 * @returns {string} Returns the name of the monthly table for the given date.
 * @example
 * getMonthlyTable("cdr_logs", "DEC.1630480520623") // => "cdr_logs_2021_09"
 * getMonthlyTable("cdr_logs", "1627762295.5722384") // => "cdr_logs"
 * getMonthlyTable("cdr_logs", "2021-05-11") // => "cdr_logs_2021_05"
 */
function getMonthlyTable(table, date) {
    const from_date = parseDateTime(date);
    const month = from_date.month();
    const year = from_date.year(); //year 1970 means datetime format was not correct

    if (isNotEmpty(date) && month != moment().month() && year >= 2020) {
        //If month is not same, append month and year in table name to fetch data from that table
        table += from_date.format("_YYYY_MM");
    }
    return table;
}

module.exports = {
    formatStayedSince,
    getCurrent12HourTimeStamp,
    getCurrentTimeStamp,
    getCurrentTimeStampISO,
    getCurrentTimeStampWithMs,
    getDayName,
    getDaysInMonth,
    getDifferenceInDays,
    getMonthlyTable,
    getRange,
    getTimeDifference,
    getTimeStamp,
    isMonthlyTableRotating,
    isOldMonthCdr,
    utcToLocal
};
