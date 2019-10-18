"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var MessageSchema = new mongoose_1.Schema({
    owner: mongoose_1.Schema.Types.ObjectId,
    message: mongoose_1.Schema.Types.String
});
