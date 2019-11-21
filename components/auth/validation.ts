import * as Joi from "@hapi/joi";
import {
  // Use this as a replacement for express.Request
  //ValidatedRequest,
  // Extend from this to define a valid schema type/interface
  ValidatedRequestSchema,
  // Creates a validator that generates middlewares
  createValidator
} from "express-joi-validation";

export const validator = createValidator();

export const userSchema = Joi.object({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string().required(),
  repeatPassword: Joi.ref("password")
});

export interface IUserRequestSchema extends ValidatedRequestSchema {
  body: {
    email: string;
    password: string;
    repeatPassword: string;
  };
}
