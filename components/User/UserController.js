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
const bcrypt_1 = require("bcrypt");
const UserModel_1 = require("./UserModel");
const jsonwebtoken_1 = require("jsonwebtoken");
exports.getUser = (req, res, next) => { };
exports.postUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, repeatPassword } = req.body;
    try {
        const ifExists = yield UserModel_1.userSchema.findOne({ email });
        if (ifExists) {
            return res
                .status(401)
                .json({ msg: "User with this email arleady exsists" });
        }
        const hashedPw = yield bcrypt_1.hash(password, 10);
        if (email &&
            password &&
            repeatPassword &&
            password.toString() === repeatPassword.toString()) {
            const user = yield new UserModel_1.userSchema({ email, password: hashedPw });
            yield user.save();
            return res.status(201).json({ msg: "User Created!" });
        }
        else {
            return res.status(400).json({ msg: "Invalid Input!" });
        }
    }
    catch (err) {
        return res.status(400).json({ msg: "Ups something go wrong" });
    }
});
exports.logInUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    let loadedUser;
    try {
        const user = yield UserModel_1.userSchema.findOne({ email });
        if (user) {
            const comparePasswords = yield bcrypt_1.compare(password, user["password"]);
            if (comparePasswords) {
                loadedUser = user;
            }
            else {
                return res.status(401).json({ msg: "Wrong email or password" });
            }
        }
        else {
            return res.status(400).json({ msg: `Don't exsist!!` });
        }
        const token = jsonwebtoken_1.sign({ email: loadedUser.email, userId: loadedUser._id.toString() }, "supersecret", { expiresIn: "1h" });
        return res.status(200).json({ token, userId: loadedUser._id.toString() });
    }
    catch (err) {
        return res.status(401).json({ msg: "upps.. Something go wrong.." });
    }
});
exports.putUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, oldPassword, newPassword, repeatNewPassword } = req.body;
    try {
        const user = yield UserModel_1.userSchema.findOne({ email });
        if (user) {
            const comparePW = yield bcrypt_1.compare(user["password"], oldPassword);
            if (comparePW && newPassword === repeatNewPassword) {
                const hashedNewPw = bcrypt_1.hash(newPassword, 10);
                yield UserModel_1.userSchema.findOneAndUpdate({ email }, { password: hashedNewPw });
                return res.status(201).json({ msg: "Password sucessfully changed!" });
            }
            else {
                return res.status(401).json({ msg: "Invalid input!" });
            }
        }
        else {
            return res
                .status(401)
                .json({ msg: "We dont have that user in our database" });
        }
    }
    catch (err) {
        return res.status(400).json({ msg: "Something gone wrong.." });
    }
});
exports.deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const userId = req.user;
    console.log(userId);
    try {
        const user = yield UserModel_1.userSchema.findOne({ _id: userId });
        if (user) {
            const comparePW = yield bcrypt_1.compare(password, user["password"]);
            if (user["email"] === email && comparePW) {
                yield UserModel_1.userSchema.findOneAndDelete({ email });
                return res.status(200).json({ msg: "User Deleted" });
            }
            else {
                return res
                    .status(401)
                    .json({ msg: ` You don't have permission to delete user!` });
            }
        }
        else {
            return res
                .status(401)
                .json({ msg: `We don't have that user in our database!` });
        }
    }
    catch (err) {
        return res.status(400).json({ msg: err });
    }
});
