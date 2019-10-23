import express, { Router } from "express";
import {
  getMessages,
  postMessage,
  putMessage,
  deleteMessage
} from "./MessageController";
export const router = express.Router();

router.get("/message", getMessages);
router.post("/message", postMessage);
router.put("/message/:id", putMessage);
router.delete("/message/:id", deleteMessage);
