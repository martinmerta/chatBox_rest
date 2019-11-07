import { Request, Response, NextFunction } from 'express';
import { messageSchema } from './MessageModel';
import { IRequestWithUser } from '../Interfaces';
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

    const newMessage = await new messageSchema({
      userId,
      message
    });
    await newMessage.save();
    return res.status(201).json({ msg: 'Message succesfully created' });
  } catch (err) {
    return res.status(400).json({ msg: err });
  }
};
export const putMessage = async (
  req: IRequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { message, _id } = req.body;
  const userId = req.user;
  console.log(message, _id, userId);
  try {
    await messageSchema.findByIdAndUpdate({ _id, userId }, { message });
    res.status(200).json({ msg: 'Message updated!' });
  } catch (err) {
    return res.status(401).json({ msg: err });
  }
};
export const deleteMessage = async (
  req: IRequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { _id } = req.body;
  const userId = req.user;
  console.log(_id, user);
  try {
    await messageSchema.findOneAndRemove({ _id, userId });
    return res.status(200).json({ msg: 'Sucesfully deleted!' });
  } catch (err) {
    return res.status(400).json({ msg: 'deleted!!' });
  }
};
