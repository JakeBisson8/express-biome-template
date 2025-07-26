"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const httpServer = http_1.default.createServer(app_1.default);
httpServer.listen(80, () => {
    console.log('Listening on port 80');
});
process.on('SIGINT', () => {
    httpServer.close();
});
process.on('SIGTERM', () => {
    httpServer.close();
});
