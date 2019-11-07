import { Request, Response, NextFunction } from 'express';
import { hash, compare } from 'bcrypt';
import { userSchema } from './UserModel';
import { sign } from 'jsonwebtoken';
import { IRequestWithUser } from '../Interfaces';

export const getUser = (req: Request, res: Response, next: NextFunction) => {};

export const postUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, repeatPassword } = req.body;
  try {
    const ifExists = await userSchema.findOne({ email });
    if (ifExists) {
      return res
        .status(401)
        .json({ msg: 'User with this email arleady exsists' });
    }
    const hashedPw = await hash(password, 10);
    if (
      email &&
      password &&
      repeatPassword &&
      password.toString() === repeatPassword.toString()
    ) {
      const user = await new userSchema({ email, password: hashedPw });
      await user.save();
      return res.status(201).json({ msg: 'User Created!' });
    } else {
      return res.status(400).json({ msg: 'Invalid Input!' });
    }
  } catch (err) {
    return res.status(400).json({ msg: 'Ups something go wrong' });
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
    const user = await userSchema.findOne({ email });
    if (user) {
      const comparePasswords = await compare(password, user['password']);
      if (comparePasswords) {
        loadedUser = user;
      } else {
        return res.status(401).json({ msg: 'Wrong email or password' });
      }
    } else {
      return res.status(400).json({ msg: `Don't exsist!!` });
    }
    const token = sign(
      { email: loadedUser.email, userId: loadedUser._id.toString() },
      'supersecret',
      { expiresIn: '1h' }
    );
    return res.status(200).json({ token, userId: loadedUser._id.toString() });
  } catch (err) {
    return res.status(401).json({ msg: 'upps.. Something go wrong..' });
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
      const comparePW = await compare(user['password'], oldPassword);
      if (comparePW && newPassword === repeatNewPassword) {
        const hashedNewPw = hash(newPassword, 10);
        await userSchema.findOneAndUpdate({ email }, { password: hashedNewPw });
        return res.status(201).json({ msg: 'Password sucessfully changed!' });
      } else {
        return res.status(401).json({ msg: 'Invalid input!' });
      }
    } else {
      return res
        .status(401)
        .json({ msg: 'We dont have that user in our database' });
    }
  } catch (err) {
    return res.status(400).json({ msg: 'Something gone wrong..' });
  }
};
export const deleteUser = async (
  req: IRequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  const userId = req.user;
  console.log(userId);
  try {
    const user = await userSchema.findOne({ _id: userId });
    if (user) {
      const comparePW = await compare(password, user['password']);
      if (user['email'] === email && comparePW) {
        await userSchema.findOneAndDelete({ email });
        return res.status(200).json({ msg: 'User Deleted' });
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
