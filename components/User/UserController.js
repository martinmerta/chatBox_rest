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
const jsonwebtoken_1 = require("jsonwebtoken");
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
exports.logInUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const { email, password } = req.body;
    let loadedUser;
    try {
        const user = UserModel_1.userSchema.findOne({ email });
        if (user && user['password'] === password) {
            loadedUser = user;
        }
        else {
            throw new Error('Wrong email or password');
        }
        const token = jsonwebtoken_1.sign({ email: loadedUser.email, userId: loadedUser._id.toString() }, 'superSecret', { expiresIn: '1h' });
        res.status(200).json({ token, userId: loadedUser._id.toString() });
    }
    catch (err) {
        res.status(401).json(err);
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
    const { id } = req.params;
    try {
        const user = yield UserModel_1.userSchema.findOne({ _id: id });
        if (user !== null &&
            user['email'] === email &&
            user['password'] === password) {
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
