"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// here will be connection to server
const app_1 = require("../app");
const mongo_1 = require("../components/Database/mongo");
require('dotenv').config();
const url = process.env.DATABASE_URL;
const port = process.env.port || 8080;
console.log(port);
mongo_1.connectToDB(url, app_1.app, port);
