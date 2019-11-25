"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = __importStar(require("@hapi/joi"));
const express_joi_validation_1 = require("express-joi-validation");
exports.validator = express_joi_validation_1.createValidator();
exports.userSchema = Joi.object({
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string().required(),
    repeatPassword: Joi.ref("password")
});
exports.userLogInSchema = Joi.object({
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string().required()
});
exports.userPutSchema = Joi.object({
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string().required(),
    newPassword: Joi.string().required(),
    repeatNewPassword: Joi.string().required()
});
exports.userDeleteSchema = Joi.object({
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string().required(),
    repeatPassword: Joi.string().required()
});
exports.postMessageSchema = Joi.object({
    body: {
        message: Joi.string()
            .required()
            .min(1)
    }
});
exports.putMessageSchema = Joi.object({
    body: {
        message: Joi.string()
            .required()
            .min(1),
        msgId: Joi.string().required()
    }
});
