import * as Joi from "@hapi/joi";
import {
  // Use this as a replacement for express.Request
  //ValidatedRequest,
  // Extend from this to define a valid schema type/interface
  ValidatedRequestSchema,
  // Creates a validator that generates middlewares
  createValidator
} from "express-joi-validation";
import { IRequestWithUser } from "../Interfaces/requestWithUser";
export const validator = createValidator();

export const userSchema = Joi.object({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string().required(),
  repeatPassword: Joi.ref("password")
});

export const userLogInSchema = Joi.object({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string().required()
});

export const userPutSchema = Joi.object({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string().required(),
  newPassword: Joi.string().required(),
  repeatNewPassword: Joi.string().required()
});

export const userDeleteSchema = Joi.object({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string().required(),
  repeatPassword: Joi.string().required()
});

export interface IUserRequestSchema extends ValidatedRequestSchema {
  body: {
    email: string;
    password: string;
    repeatPassword: string;
  };
}
export interface IUserLogInRequestSchema extends ValidatedRequestSchema {
  body: {
    email: string;
    password: string;
  };
}
export interface IPutRequestSchema extends ValidatedRequestSchema {
  body: {
    email: string;
    oldPassword: string;
    newPassword: string;
    repeatNewPassword: string;
  };
}
export interface IDeleteUserRequestSchema extends ValidatedRequestSchema {
  body: {
    email: string;
    password: string;
  };
  user: {
    userId: unknown;
  };
}
