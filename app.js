"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = require("./components/cors/cors");
const Message_1 = require("./components/Message");
const User_1 = require("./components/User");
exports.app = express_1.default();
exports.app.use(cors_1.cors);
exports.app.use(helmet_1.default());
exports.app.use(body_parser_1.default.json());
exports.app.use('/api', Message_1.router);
exports.app.use('/api', User_1.router);
