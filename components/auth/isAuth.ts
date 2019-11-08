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
      return res.status(401).json({ msg: 'Not authenticated!!' });
    }
    if (!decodedToken) {
      return res.status(401).json({ msg: 'Not authenticated!!' });
    }
    req.user = decodedToken.userId;
  } catch (err) {
    return res.status(401).json({ msg: 'Unauthorized' });
  }
  next();
};
