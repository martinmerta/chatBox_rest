import express from 'express';
import { getUser, postUser, putUser, deleteUser } from './UserController';
export const router = express.Router();

router.get('/user', getUser);
router.post('/user', postUser);
router.put('/user', putUser);
router.delete('/user/:id', deleteUser);
