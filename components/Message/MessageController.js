"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const MessageModel_1 = require("./MessageModel");
exports.getMessages = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const fetchMessages = yield MessageModel_1.messageSchema.find();
        return res.status(200).json({ messages: fetchMessages });
    }
    catch (err) {
        return res.status(400).json({ msg: err });
    }
});
exports.postMessage = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { owner, message } = req.body;
        // owner has to be stored in req object when we create a token
        const newMessage = yield new MessageModel_1.messageSchema({
            owner,
            message
        });
        yield newMessage.save();
        return res.status(201).json({ msg: "Message succesfully created" });
    }
    catch (err) {
        return res.status(400).json({ msg: err });
    }
});
exports.putMessage = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const { owner, message, _id } = req.body;
    try {
        yield MessageModel_1.messageSchema.findByIdAndUpdate({ _id }, { message });
        res.status(200).json({ msg: "Message updated!" });
    }
    catch (err) {
        return res.status(401).json({ msg: err });
    }
});
exports.deleteMessage = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const { _id } = req.body;
    try {
        yield MessageModel_1.messageSchema.findOneAndRemove({ _id });
        return res.status(200).json({ msg: "Sucesfully deleted!" });
    }
    catch (err) {
        return res.status(400).json({ msg: "deleted!!" });
    }
});
