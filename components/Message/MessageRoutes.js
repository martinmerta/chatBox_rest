"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var MessageController_1 = require("./MessageController");
exports.router = express_1.default.Router();
exports.router.get('/message', MessageController_1.getMessages);
exports.router.post('/message', MessageController_1.postMessages);
exports.router.put('/message/:id', MessageController_1.putMessages);
exports.router.delete('/message/:id', MessageController_1.deleteMessages);