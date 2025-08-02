"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_http_1 = __importDefault(require("node:http"));
const app_1 = __importDefault(require("./app"));
const { HTTP_PORT } = process.env;
console.log(process.env.NODE_ENV);
const httpServer = node_http_1.default.createServer(app_1.default);
httpServer.listen(HTTP_PORT || 80, () => {
    console.log('Listening on port 80');
});
process.on('SIGINT', () => {
    httpServer.close();
});
process.on('SIGTERM', () => {
    httpServer.close();
});
