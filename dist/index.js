"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_http_1 = __importDefault(require("node:http"));
const node_https_1 = __importDefault(require("node:https"));
const app_1 = __importDefault(require("./app"));
const logger_1 = __importDefault(require("./config/logger"));
const environment_1 = require("./environment");
const file_management_1 = require("./Utils/file-management");
// HTTP & HTTPS servers
const httpServer = node_http_1.default.createServer(app_1.default);
const options = environment_1.environment.HTTPS_ENABLED
    ? {
        cert: (0, file_management_1.getSSLFile)(environment_1.environment.SSL_CERTIFICATE_FILE),
        key: (0, file_management_1.getSSLFile)(environment_1.environment.SSL_KEY_FILE),
        dhparam: (0, file_management_1.getSSLFile)(environment_1.environment.DH_PARAM_FILE),
        minVersion: environment_1.environment.SSL_MIN_VERSION,
        maxVersion: environment_1.environment.SSL_MAX_VERSION,
        ciphers: environment_1.environment.SSL_CIPHERS,
        ecdhCurve: environment_1.environment.ECDH_CURVES,
    }
    : {};
const httpsServer = node_https_1.default.createServer(options, app_1.default);
const startup = () => {
    if (environment_1.environment.HTTP_ENABLED) {
        httpServer.listen(environment_1.environment.HTTP_PORT, () => {
            logger_1.default.info(`HTTP server: ${environment_1.environment.HTTP_PORT}`);
        });
    }
    if (environment_1.environment.HTTPS_ENABLED) {
        httpsServer.listen(environment_1.environment.HTTPS_PORT, () => {
            logger_1.default.info(`HTTPS server: ${environment_1.environment.HTTPS_PORT}`);
        });
    }
};
const shutdown = async () => {
    const shutdownHTTP = new Promise((resolve, reject) => {
        if (!environment_1.environment.HTTP_ENABLED)
            return resolve();
        httpServer.close((err) => {
            if (err) {
                logger_1.default.error(`Error shutting down http server`);
                return reject(err);
            }
            resolve();
        });
    });
    const shutdownHTTPS = new Promise((resolve, reject) => {
        if (!environment_1.environment.HTTPS_ENABLED)
            return resolve();
        httpsServer.close((err) => {
            if (err) {
                logger_1.default.error('Error shutting down https server');
                return reject(err);
            }
            resolve();
        });
    });
    await Promise.all([shutdownHTTP, shutdownHTTPS]);
    logger_1.default.info('Bye Bye!');
};
const handleShutdownSignal = (signal) => async () => {
    logger_1.default.info(`${signal}: shutting down`);
    try {
        await shutdown();
        process.exit(0);
    }
    catch (err) {
        logger_1.default.error(err);
        process.exit(1);
    }
};
process.on('SIGINT', handleShutdownSignal('SIGINT'));
process.on('SIGTERM', handleShutdownSignal('SIGTERM'));
// Start the app
startup();
