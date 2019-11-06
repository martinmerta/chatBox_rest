"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
exports.isAuth = (req, res, next) => {
    const token = req.get('Authorization');
    let decodedToken;
    try {
        if (token) {
            decodedToken = jsonwebtoken_1.verify(token.split(' ')[1], 'superSecret');
        }
        else {
            throw new Error('Not authenticated!!');
        }
        if (!decodedToken) {
            throw new Error('Not authenticated!!');
        }
        req.user = decodedToken.userId;
    }
    catch (err) {
        res.status(401).json(err);
    }
    next();
};
