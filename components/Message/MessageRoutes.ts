import express from 'express';
import {
  getMessages,
  postMessage,
  putMessage,
  deleteMessage
} from './MessageController';
import { isAuth } from '../auth/isAuth';
export const router = express.Router();

router.get('/message', getMessages);
router.post('/message', isAuth, postMessage);
router.put('/message/:id', isAuth, putMessage);
router.delete('/message/:id', isAuth, deleteMessage);
