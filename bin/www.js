"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// here will be connection to server
var app_1 = require("../app");
var mongo_1 = require("../components/Database/mongo");
var port = process.env.port || 3000;
mongo_1.connectToDB('URL', app_1.app, port);
