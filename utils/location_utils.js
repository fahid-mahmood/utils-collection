"use strict";

/**
 * Checks if the given variable is a valid latitude, which is a number between -90 and 90
 *
 * @since 1.0.1
 * @category Utils
 * @param {number} num The variable to be checked.
 * @returns {boolean} Returns true if the input variable is a valid latitude, false otherwise.
 * @example
 * isLatitude(91) // => false
 * isLatitude(-91) // => false
 * isLatitude(50) // => true
 */
const isLatitude = (num) => isFinite(num) && Math.abs(num) <= 90;

/**
 * Checks if the given variable is a valid longitude, which is a number between -180 and 180
 *
 * @since 1.0.1
 * @category Utils
 * @param {number} num The variable to be checked.
 * @returns {boolean} Returns true if the input variable is a valid longitude, false otherwise.
 * @example
 * isLongitude(181) // => false
 * isLongitude(-181) // => false
 * isLongitude(50) // => true
 */
const isLongitude = (num) => isFinite(num) && Math.abs(num) <= 180;

/**
 * Computes the bearing (direction) between two geographic coordinates.
 *
 * @since 1.0.1
 * @category Utils
 * @param {object} startCoord An object containing the latitude and longitude of the start location.
 * @param {object} destCoord An object containing the latitude and longitude of the destination location.
 * @returns {number} Returns the bearing between the two locations in degrees.
 * @example
 * bearingBetweenLocations({latitude: 37.788022, longitude: -122.399797}, {latitude: 38.788022, longitude: -123.399797}) // => 337.09
 */
function bearingBetweenLocations(startCoord, destCoord) {
    let startLat = toRadians(parseFloat(startCoord.latitude));
    let startLng = toRadians(parseFloat(startCoord.longitude));
    let destLat = toRadians(parseFloat(destCoord.latitude));
    let destLng = toRadians(parseFloat(destCoord.longitude));

    let y = Math.sin(destLng - startLng) * Math.cos(destLat);
    let x = Math.cos(startLat) * Math.sin(destLat) - Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
    let bearing = Math.atan2(y, x);
    bearing = toDegrees(bearing);
    return ((bearing + 360) % 360).toFixed();
}

function toRadians(degrees) {
    return (degrees * Math.PI) / 180;
}

function toDegrees(radians) {
    return (radians * 180) / Math.PI;
}

module.exports = {
    bearingBetweenLocations,
    isLatitude,
    isLongitude
};
