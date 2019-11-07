import { Request, Response, NextFunction } from "express";
import { hash, compare } from "bcrypt";
import { userSchema } from "./UserModel";
import { sign } from "jsonwebtoken";
import { IRequestWithUser } from "../Interfaces";

export const getUser = (req: Request, res: Response, next: NextFunction) => {};

export const postUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, repeatPassword } = req.body;
  try {
    const hashedPw = await hash(password, "superSecret");
    if (
      email &&
      password &&
      repeatPassword &&
      password.toString() === repeatPassword.toString()
    ) {
      const user = await new userSchema({ email, hashedPw });
      await user.save();
      return res.status(201).json({ msg: "User sucesfully created!" });
    } else {
      return res.status(400).json({ msg: "Invalid Input!" });
    }
  } catch (err) {
    return res.status(400).json({ msg: err });
  }
};

export const logInUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  let loadedUser;
  try {
    const user = userSchema.findOne({ email });
    if (user) {
      const comparePasswords = await compare(user["password"], password);
      if (comparePasswords) {
        loadedUser = user;
      } else {
        throw new Error("Wrong email or password");
      }
    } else {
      throw new Error(`Don't exsist!!`);
    }
    const token = sign(
      { email: loadedUser.email, userId: loadedUser._id.toString() },
      "superSecret",
      { expiresIn: "1h" }
    );
    res.status(200).json({ token, userId: loadedUser._id.toString() });
  } catch (err) {
    res.status(401).json(err);
  }
};

export const putUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, oldPassword, newPassword, repeatNewPassword } = req.body;
  try {
    const user = await userSchema.findOne({ email });
    if (user) {
      const comparePW = await compare(user["password"], oldPassword);
      if (comparePW && newPassword === repeatNewPassword) {
        const hashedNewPw = hash(newPassword, "superSecret");
        await userSchema.findOneAndUpdate({ email }, { password: hashedNewPw });
        return res.status(201).json({ msg: "Password sucessfully changed!" });
      } else {
        return res.status(401).json({ msg: "Invalid input!" });
      }
    } else {
      return res
        .status(401)
        .json({ msg: "We dont have that user in our database" });
    }
  } catch (err) {
    return res.status(400).json({ msg: "Something gone wrong.." });
  }
};
export const deleteUser = async (
  req: IRequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  const { id } = req.user;
  try {
    const user = await userSchema.findOne({ _id: id });
    if (user) {
      const comparePW = compare(user["password"], password);
      if (user["email"] === email && comparePW) {
        await userSchema.findOneAndDelete({ email });
        return res.status(200).json({ msg: "User Deleted" });
      } else {
        return res
          .status(401)
          .json({ msg: ` You don't have permission to delete user!` });
      }
    } else {
      return res
        .status(401)
        .json({ msg: `We don't have that user in our database!` });
    }
  } catch (err) {
    return res.status(400).json({ msg: err });
  }
};
