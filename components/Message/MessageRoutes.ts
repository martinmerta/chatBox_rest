import express from "express";
import {
  getMessages,
  postMessage,
  putMessage,
  deleteMessage
} from "./MessageController";
import {
  postMessageSchema,
  validator,
  putMessageSchema
} from "../auth/validation";
import { isAuth } from "../auth/isAuth";
export const router = express.Router();

router.get("/message", getMessages);
router.post("/message", validator.body(postMessageSchema), isAuth, postMessage);
router.put("/message", validator.body(putMessageSchema), isAuth, putMessage);
router.delete("/message", isAuth, deleteMessage);
