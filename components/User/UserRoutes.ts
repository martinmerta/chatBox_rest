import express from "express";
import {
  getUser,
  postUser,
  putUser,
  deleteUser,
  logInUser
} from "./UserController";
import { isAuth } from "../auth/isAuth";
import {
  userSchema,
  validator,
  userLogInSchema,
  userPutSchema
} from "../auth/validation";
export const router = express.Router();

router.get("/user", getUser);
router.post("/user", validator.body(userSchema), postUser);
router.post("/user/login", validator.body(userLogInSchema), logInUser);
router.put("/user", validator.body(userPutSchema), putUser);
router.delete("/user", isAuth, deleteUser);
