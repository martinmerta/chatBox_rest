import express from "express";
import {
  getUser,
  postUser,
  putUser,
  deleteUser,
  logInUser
} from "./UserController";
import { isAuth } from "../auth/isAuth";
import { userSchema, validator } from "../auth/validation";
export const router = express.Router();

router.get("/user", getUser);
router.post("/user", validator.body(userSchema), postUser);
router.post("/user/login", logInUser);
router.put("/user", putUser);
router.delete("/user", isAuth, deleteUser);
