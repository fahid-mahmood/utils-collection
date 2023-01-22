"use strict";

const moment = require("moment");
const { isNotEmpty, isEmpty, formatErrorString } = require("./common_utils");
const { getCurrentTimeStamp } = require("./time_utils");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { printErrorLog } = require("./debugging_utils");

/**
 * Encrypts a given string using a specified encryption algorithm and password.
 *
 * @since 1.0.1
 * @category Utils
 * @param {string} text The string to be encrypted.
 * @returns {string} Returns the encrypted string.
 * @example
 * encrypt('Hello World') // => "a9f9a1c906f8b829a9f9a1c906f8b829a9f9a1c906f8b829"
 * encrypt('') // => ""
 */
function encrypt(text) {
    if (isNotEmpty(text)) {
        try {
            let hash = crypto.createHash("sha256").update(process.env.ENC_PASSWORD).digest("base64").substring(0, 32);
            let cipher = crypto.createCipheriv("aes-256-ctr", hash, process.env.ENC_INITIAL_VECTOR);
            let encrypted = Buffer.concat([cipher.update(text, "utf8"), cipher.final()]);
            return encrypted.toString("hex");
        } catch (error) {
            printErrorLog("encrypt :" + formatErrorString(error));
        }
    }
    return "";
}

/**
 * Decrypts a given string using a specified encryption algorithm and password.
 *
 * @since 1.0.1
 * @category Utils
 * @param {string} text The string to be decrypted.
 * @returns {string} Returns the decrypted string.
 * @example
 * decrypt('a9f9a1c906f8b829a9f9a1c906f8b829a9f9a1c906f8b829') // => "Hello World"
 */
function decrypt(text) {
    if (isNotEmpty(text)) {
        try {
            let hash = crypto.createHash("sha256").update(process.env.ENC_PASSWORD).digest("base64").substring(0, 32);
            let decipher = crypto.createDecipheriv("aes-256-ctr", hash, process.env.ENC_INITIAL_VECTOR);
            let decrypted = Buffer.concat([decipher.update(text, "hex"), decipher.final()]);
            return decrypted.toString("utf8");
        } catch (error) {
            printErrorLog("decrypt :" + formatErrorString(error));
        }
    }
    return "";
}

/**
 * This function takes in a string, text, as a parameter and encrypts it using a unique key that changes for every invocation of the function.
 * Additionally, the function adds a unique identifier and a timestamp to the original text before encrypting it.
 * The resulting encrypted string is returned by the function.
 * The function has an expiry request logic, where it uses the timestamp added to the original text to check if the encrypted text is expired or not.
 *
 * @since 1.0.1
 * @category Utils
 * @param {string} text The text to be encrypted.
 * @returns {string} Returns the encrypted string.
 * @example
 * encryptRequest('{"name": "John", "age": 30, "city": "New York"}') // => "5a5a5a5a5a5a5a5a5a5a5a5a5a5a5a5"
 */
function encryptRequest(text) {
    text = uuidv4() + "|#" + text + "|#" + moment().format("YYYYMMDDHHmmss"); //'3b9a29a0-e9b3-4f3a-a177-6c1f7d41e6a9|#secret_text|#20210209130255'
    return encrypt(text);
}

/**
 * Decrypts the given text and checks if the unique identifier and timestamp added to it are valid. Also checks if the request is not older than a specified time limit.
 *
 * @since 1.0.1
 * @category Utils
 * @param {string} text The text to be decrypted
 * @param {number} [allowedTime=180] The maximum time limit allowed for the request to be considered valid (in seconds)
 * @returns {string} Returns the decrypted string if the request is valid, otherwise an empty string
 * @example
 * decryptRequest('a9f9a1c906f8b829a9f9a1c906f8b829a9f9a1c906f8b829')// => 'Hello World'
 */
function decryptRequest(text, allowedTime = 180) {
    let decryptedText = decrypt(text);
    if (isNotEmpty(decryptedText)) {
        let decryptedReqParts = decryptedText.split("|#");
        if (decryptedReqParts.length == 3) {
            //Verify if string was manipulated
            let requestTime = moment(decryptedReqParts[2], "YYYYMMDDHHmmss", true).format("YYYY-MM-DD HH:mm:ss");
            if (!(requestTime.toString().toLowerCase().indexOf("invalid") !== -1)) {
                //Verify if time was correct & was not manipulated
                let currentTime = getCurrentTimeStamp();
                let durationInSec = moment.duration(moment(currentTime).diff(moment(requestTime))).asSeconds();
                if (Math.abs(durationInSec) < allowedTime) {
                    //Request can't be older then allowedTime minutes
                    return decryptedReqParts[1];
                } else {
                    printErrorLog("Request is old: " + durationInSec);
                }
            } else {
                printErrorLog("Date Time of request is wrong");
            }
        } else {
            printErrorLog("decryptedReqParts Error:" + decryptedReqParts.length);
        }
    }
    return "";
}

/**
 * Verify and decode a given JWT token.
 *
 * @since 1.0.1
 * @category Utils
 * @param {Object} req The request object, which should contain the "authorization" header with the JWT token.
 * @param {boolean} [returnError=false] If true, the function will reject with an error message on failure. Otherwise, it will resolve with false.
 * @returns {Promise<Object|boolean>} Returns a promise that resolves with the decoded JWT payload if successful, or false if the token is invalid or not present. If returnError is set to true, the promise will reject with an error message on failure.
 * @example
 * verifyAndDecodeToken(req, true).then(decoded => {
 *      console.log(decoded); // decoded JWT payload
 * })
 * .catch(err => {
 *      console.log(err); // error message
 * });
 */
function verifyAndDecodeToken(req, returnError = false) {
    return new Promise(function (resolve, reject) {
        try {
            if (isNotEmpty(req.headers["authorization"])) {
                const token = req.headers["authorization"].split(" ")[1];
                if (isNotEmpty(token)) {
                    jwt.verify(token, process.env.JWT_KEY, function (err, decoded) {
                        if (err || isEmpty(decoded)) {
                            returnError ? reject(err.message) : resolve(false);
                        } else {
                            return resolve(decoded);
                        }
                    });
                } else {
                    returnError ? reject("Authorization token is missing.") : resolve(false);
                }
            } else {
                returnError ? reject("Authorization header is missing.") : resolve(false);
            }
        } catch (error) {
            returnError ? reject("Authorization token is invalid.") : resolve(false);
        }
    });
}

module.exports = {
    decrypt,
    decryptRequest,
    encrypt,
    encryptRequest,
    verifyAndDecodeToken
};
