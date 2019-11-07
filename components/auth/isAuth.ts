import { verify } from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { IRequestWithUser } from '../Interfaces';

export const isAuth = (
  req: IRequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const token = req.get('Authorization');
  let decodedToken;
  try {
    if (token) {
      decodedToken = verify(token.split(' ')[1], 'supersecret');
    } else {
      throw new Error('Not authenticated!!');
    }
    if (!decodedToken) {
      throw new Error('Not authenticated!!');
    }
    req.user = decodedToken.userId;
  } catch (err) {
    res.status(401).json(err);
  }
  next();
};
