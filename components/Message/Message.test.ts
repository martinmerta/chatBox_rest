import { MongooseDocument } from "mongoose";

// import { messageSchema } from "./MessageModel";
const messageSchema = require("./MessageModel");
test("xx", () => {
  expect(messageSchema).toBeInstanceOf(MongooseDocument);
});
