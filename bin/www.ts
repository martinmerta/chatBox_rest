// here will be connection to server
import { app } from '../app';
import { connectToDB } from '../components/Database/mongo';
require('dotenv').config();
const url = process.env.DATABASE_URL as string;
const port = process.env.port || 8080;
console.log(port);
connectToDB(url, app, port);
