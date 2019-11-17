import { Request, Response, NextFunction } from "express";
import { messageSchema } from "./MessageModel";
import { IRequestWithUser } from "../Interfaces";
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
  req: IRequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const { message } = req.body;
    const userId = req.user;
    if (userId) {
      const newMessage = await new messageSchema({
        userId,
        message
      });
      await newMessage.save();
      return res.status(201).json({
        msg: "Message succesfully created",
        msgId: newMessage._id.toString()
      });
    } else {
      return res.status(401).json({ msg: "Unauthorized" });
    }
  } catch (err) {
    return res.status(400).json({ msg: "Upps Something gone wrong.." });
  }
};
export const putMessage = async (
  req: IRequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { message, msgId } = req.body;
  const user = req.user;
  try {
    if (user) {
      const owner = await messageSchema.findById({ _id: msgId });
      if (owner && owner["userId"].toString() === user.toString()) {
        await messageSchema.findByIdAndUpdate({ _id: msgId }, { message });
        return res.status(200).json({ msg: "Message updated!" });
      } else {
        return res
          .status(401)
          .json({ msg: "Only owner of messsage can update it" });
      }
    } else {
      return res.status(401).json({ msg: "Unauthorized" });
    }
  } catch (err) {
    return res.status(401).json({ msg: err });
  }
};
export const deleteMessage = async (
  req: IRequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { msgId } = req.body;
  const user = req.user;
  try {
    if (user) {
      const owner = await messageSchema.findById({ _id: msgId });
      if (owner && owner["userId"].toString() === user.toString()) {
        await messageSchema.findByIdAndRemove({ _id: msgId });
        return res.status(200).json({ msg: "Message deleted!" });
      } else {
        return res
          .status(401)
          .json({ msg: "Only owner of messsage can delete it" });
      }
    } else {
      return res.status(401).json({ msg: "Unauthorized" });
    }
  } catch (err) {
    return res.status(401).json({ msg: err });
  }
};
