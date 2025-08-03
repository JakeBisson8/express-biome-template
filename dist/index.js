"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_http_1 = __importDefault(require("node:http"));
const app_1 = __importDefault(require("./app"));
const logger_1 = __importDefault(require("./logger"));
const { HTTP_PORT } = process.env;
logger_1.default.info('Hello World');
const httpServer = node_http_1.default.createServer(app_1.default);
httpServer.listen(HTTP_PORT, () => {
    logger_1.default.info(`HTTP server listening on ${HTTP_PORT}`);
});
process.on('SIGINT', () => {
    logger_1.default.info(`Received SIGINT... shutting down gracefully.`);
    httpServer.close();
});
process.on('SIGTERM', () => {
    logger_1.default.info(`Received SIGTERM... shutting down gracefully.`);
    httpServer.close();
});
