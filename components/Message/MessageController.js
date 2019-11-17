"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const MessageModel_1 = require("./MessageModel");
exports.getMessages = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fetchMessages = yield MessageModel_1.messageSchema.find();
        return res.status(200).json({ messages: fetchMessages });
    }
    catch (err) {
        return res.status(400).json({ msg: err });
    }
});
exports.postMessage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { message } = req.body;
        const userId = req.user;
        if (userId) {
            const newMessage = yield new MessageModel_1.messageSchema({
                userId,
                message
            });
            yield newMessage.save();
            return res.status(201).json({
                msg: "Message succesfully created",
                msgId: newMessage._id.toString()
            });
        }
        else {
            return res.status(401).json({ msg: "Unauthorized" });
        }
    }
    catch (err) {
        return res.status(400).json({ msg: "Upps Something gone wrong.." });
    }
});
exports.putMessage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { message, msgId } = req.body;
    const user = req.user;
    try {
        if (user) {
            const owner = yield MessageModel_1.messageSchema.findById({ _id: msgId });
            if (owner && owner["userId"].toString() === user.toString()) {
                yield MessageModel_1.messageSchema.findByIdAndUpdate({ _id: msgId }, { message });
                return res.status(200).json({ msg: "Message updated!" });
            }
            else {
                return res
                    .status(401)
                    .json({ msg: "Only owner of messsage can update it" });
            }
        }
        else {
            return res.status(401).json({ msg: "Unauthorized" });
        }
    }
    catch (err) {
        return res.status(401).json({ msg: err });
    }
});
exports.deleteMessage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { msgId } = req.body;
    const user = req.user;
    try {
        if (user) {
            const owner = yield MessageModel_1.messageSchema.findById({ _id: msgId });
            if (owner && owner["userId"].toString() === user.toString()) {
                yield MessageModel_1.messageSchema.findByIdAndRemove({ _id: msgId });
                return res.status(200).json({ msg: "Message deleted!" });
            }
            else {
                return res
                    .status(401)
                    .json({ msg: "Only owner of messsage can delete it" });
            }
        }
        else {
            return res.status(401).json({ msg: "Unauthorized" });
        }
    }
    catch (err) {
        return res.status(401).json({ msg: err });
    }
});
