"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("./UserController");
const isAuth_1 = require("../auth/isAuth");
const validation_1 = require("../auth/validation");
exports.router = express_1.default.Router();
exports.router.get("/user", UserController_1.getUser);
exports.router.post("/user", validation_1.validator.body(validation_1.userSchema), UserController_1.postUser);
exports.router.post("/user/login", validation_1.validator.body(validation_1.userLogInSchema), UserController_1.logInUser);
exports.router.put("/user", validation_1.validator.body(validation_1.userPutSchema), UserController_1.putUser);
exports.router.delete("/user", isAuth_1.isAuth, UserController_1.deleteUser);
