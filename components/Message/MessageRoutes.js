"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MessageController_1 = require("./MessageController");
const isAuth_1 = require("../auth/isAuth");
exports.router = express_1.default.Router();
exports.router.get('/message', MessageController_1.getMessages);
exports.router.post('/message', isAuth_1.isAuth, MessageController_1.postMessage);
exports.router.put('/message', isAuth_1.isAuth, MessageController_1.putMessage);
exports.router.delete('/message', isAuth_1.isAuth, MessageController_1.deleteMessage);
