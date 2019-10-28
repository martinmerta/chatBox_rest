import { Request, Response, NextFunction } from 'express';
import { userSchema } from './UserModel';

export const getUser = (req: Request, res: Response, next: NextFunction) => {};

export const postUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, repeatPassword } = req.body;
  try {
    if (
      email &&
      password &&
      repeatPassword &&
      password.toString() === repeatPassword.toString()
    ) {
      const user = await new userSchema({ email, password });
      await user.save();
      return res.status(201).json({ msg: 'User sucesfully created!' });
    } else {
      return res.status(400).json({ msg: 'Invalid Input!' });
    }
  } catch (err) {
    return res.status(400).json({ msg: err });
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
    if (
      user &&
      user['password'] === oldPassword &&
      newPassword === repeatNewPassword
    ) {
      await userSchema.findOneAndUpdate({ email }, { password: newPassword });
      return res.status(201).json({ msg: 'Password sucessfully changed!' });
    } else {
      return res.status(400).json({ msg: 'Invalid input!' });
    }
  } catch (err) {
    return res.status(400).json({ msg: 'Something gone wrong..' });
  }
};
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  const { id } = req.params;
  try {
    const user = await userSchema.findOne({ _id: id });
    if (
      user !== null &&
      user['email'] === email &&
      user['password'] === password
    ) {
      await userSchema.findOneAndDelete({ email });
      return res.status(200).json({ msg: 'User Deleted' });
    } else {
      return res
        .status(401)
        .json({ msg: ` You don't have permission to delete user!` });
    }
  } catch (err) {
    return res.status(400).json({ msg: err });
  }
};
