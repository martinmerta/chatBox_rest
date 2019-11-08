"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
exports.isAuth = (req, res, next) => {
    const token = req.get('Authorization');
    let decodedToken;
    try {
        if (token) {
            decodedToken = jsonwebtoken_1.verify(token.split(' ')[1], 'supersecret');
        }
        else {
            return res.status(401).json({ msg: 'Not authenticated!!' });
        }
        if (!decodedToken) {
            return res.status(401).json({ msg: 'Not authenticated!!' });
        }
        req.user = decodedToken.userId;
    }
    catch (err) {
        return res.status(401).json({ msg: 'Unauthorized' });
    }
    next();
};
