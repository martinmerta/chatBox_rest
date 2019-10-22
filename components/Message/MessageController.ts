import { Request, Response, NextFunction } from "express";
import { messageSchema } from "./MessageModel";
export const getMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const fetchMessages = await messageSchema.find();
    return res.status(200).json({ messages: fetchMessages });
  } catch (err) {
    return res.status(400).json({ msg: err });
  }
};
export const postMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { owner, message } = req.body;
    const newMessage = await new messageSchema({
      owner,
      message
    });
    await newMessage.save();
    return res.status(201).json({ msg: "Message succesfully created" });
  } catch (err) {
    return res.status(400).json({ msg: err });
  }
};
export const putMessages = (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
export const deleteMessages = (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
