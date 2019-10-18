"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var helmet_1 = __importDefault(require("helmet"));
var Message_1 = require("./components/Message");
var User_1 = require("./components/User");
exports.app = express_1.default();
exports.app.use(helmet_1.default());
exports.app.use(body_parser_1.default.json());
exports.app.use('/api', Message_1.router);
exports.app.use('/api', User_1.router);
