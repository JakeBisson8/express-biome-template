"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const httplogger_1 = require("./config/httplogger");
const environment_1 = require("./environment");
const http_redirect_to_https_1 = require("./middleware/http-redirect-to-https");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Setup cors
app.use((0, cors_1.default)());
// Setup helmet with HSTS
app.use((0, helmet_1.default)({
    strictTransportSecurity: environment_1.environment.HTTPS_ENABLED
        ? {
            maxAge: environment_1.environment.HSTS_MAX_AGE,
            includeSubDomains: environment_1.environment.HSTS_INCLUDE_SUBDOMAINS,
            preload: environment_1.environment.HSTS_PRELOAD,
        }
        : false,
}));
// Setup HTTP Logger
app.use(httplogger_1.httpLogger);
app.use(httplogger_1.httpErrorLogger);
if (environment_1.environment.NODE_ENV === 'development') {
    app.use(httplogger_1.httpDevLogger);
}
// Forces HTTP requests to be HTTPS if it is enabled
if (environment_1.environment.HTTPS_ENABLED) {
    app.use(http_redirect_to_https_1.httpRedirectToHttps);
}
// Default endpoint
app.get('/', (_req, res) => {
    res.status(200).json({ message: 'Hello World!' });
});
exports.default = app;
