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
const UserModel_1 = require("./UserModel");
exports.getUser = (req, res, next) => { };
exports.postUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const { email, password, repeatPassword } = req.body;
    try {
        if (email &&
            password &&
            repeatPassword &&
            password.toString() === repeatPassword.toString()) {
            const user = yield new UserModel_1.userSchema({ email, password });
            yield user.save();
            return res.status(201).json({ msg: 'User sucesfully created!' });
        }
        else {
            return res.status(400).json({ msg: 'Invalid Input!' });
        }
    }
    catch (err) {
        return res.status(400).json({ msg: err });
    }
});
exports.putUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const { email, oldPassword, newPassword, repeatNewPassword } = req.body;
    try {
        const user = yield UserModel_1.userSchema.findOne({ email });
        if (user &&
            user['password'] === oldPassword &&
            newPassword === repeatNewPassword) {
            yield UserModel_1.userSchema.findOneAndUpdate({ email }, { password: newPassword });
            return res.status(201).json({ msg: 'Password sucessfully changed!' });
        }
        else {
            return res.status(400).json({ msg: 'Invalid input!' });
        }
    }
    catch (err) {
        return res.status(400).json({ msg: 'Something gone wrong..' });
    }
});
exports.deleteUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield UserModel_1.userSchema.findOne({ email, password });
        if (user !== null) {
            yield UserModel_1.userSchema.findOneAndDelete({ email });
            return res.status(200).json({ msg: 'User Deleted' });
        }
        else {
            return res
                .status(401)
                .json({ msg: ` You don't have permission to delete user!` });
        }
    }
    catch (err) {
        return res.status(400).json({ msg: err });
    }
});
