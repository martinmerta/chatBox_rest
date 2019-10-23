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
export const postMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { owner, message } = req.body;
    // owner has to be stored in req object when we create a token
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
export const putMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { owner, message, _id } = req.body;
  try {
    await messageSchema.findByIdAndUpdate({ _id }, { message });
    res.status(200).json({ msg: "Message updated!" });
  } catch (err) {
    return res.status(401).json({ msg: err });
  }
};
export const deleteMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { _id } = req.body;
  try {
    await messageSchema.findOneAndRemove({ _id });
    return res.status(200).json({ msg: "Sucesfully deleted!" });
  } catch (err) {
    return res.status(400).json({ msg: "deleted!!" });
  }
};
