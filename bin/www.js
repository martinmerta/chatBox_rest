"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// here will be connection to server
var app_1 = require("../app");
var port = process.env.port || 3000;
app_1.app.listen(port);
