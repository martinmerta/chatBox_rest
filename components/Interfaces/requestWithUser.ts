import { Request } from "express";
import { Schema } from "mongoose";
export interface IRequestWithUser extends Request {
  user;
}
