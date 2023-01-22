"use strict";

const moment = require("moment");
const { isNotEmpty, isEmpty } = require("./common_utils");

//Enable Logs For Debugging
let showLogs = isDevelopment();
//Enable Error Logs
let showLimiterLogs = isDevelopment();
//Enable Error Logs
let showErrorLogs = isDevelopment() || isProduction();

function enableDisableLogs(enableDisableLogs = false) {
    showLogs = enableDisableLogs;
    showLimiterLogs = enableDisableLogs;
    showErrorLogs = enableDisableLogs;
}

function printLocalLog(str) {
    const time = moment().format("HH:mm:ss");
    console.log(`${time} | ${str}`);
}

function printLog(desc = "", logData = "") {
    if (showLogs === true || showLimiterLogs === true) {
        if (isNotEmpty(desc)) console.log(desc);
        if (isNotEmpty(logData)) console.log(logData);
    }
}

function printErrorLog(logDetail) {
    if (showErrorLogs === true) {
        console.error(logDetail);
    }
}

function isProduction() {
    return process.env.NODE_ENV === "prod" || process.env.NODE_ENV === "production" || process.env.NODE_ENV === "PROD" || process.env.NODE_ENV === "PRODUCTION";
}

function isDevelopment() {
    return process.env.NODE_ENV === "dev" || process.env.NODE_ENV === "development" || process.env.NODE_ENV === "DEV" || process.env.NODE_ENV === "DEVELOPMENT";
}

/**
 * Logs the environment variables required for the package to work correctly.
 * @since 1.0.3
 *
 * @returns {void}
 */
function logEnvironmentVariables(logValue = false) {
    const envVars = [
        {
            name: "NODE_ENV",
            errorMessage: "NODE_ENV is not defined, please define it before using printLog/printErrorLog functions"
        },
        {
            name: "ENC_PASSWORD",
            errorMessage: "ENC_PASSWORD is not defined, please define it before using encrypt/decrypt/encryptRequest/decryptRequest functions"
        },
        {
            name: "ENC_INITIAL_VECTOR",
            errorMessage: "ENC_INITIAL_VECTOR is not defined, please define it before using encrypt/decrypt/encryptRequest/decryptRequest functions"
        },
        {
            name: "JWT_KEY",
            errorMessage: "JWT_KEY is not defined, please define it before using verifyAndDecodeToken function"
        }
    ];

    for (const varInfo of envVars) {
        if (isEmpty(process.env[varInfo.name])) {
            console.error(varInfo.errorMessage);
        } else if (logValue) {
            console.log(`${varInfo.name}: ${process.env[varInfo.name]}`);
        }
    }
}

module.exports = {
    enableDisableLogs,
    isDevelopment,
    isProduction,
    logEnvironmentVariables,
    printErrorLog,
    printLocalLog,
    printLog
};
