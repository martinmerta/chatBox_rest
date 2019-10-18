import express, {Router} from 'express'
import { getMessages,postMessages,putMessages,deleteMessages} from './MessageController'
export const router = express.Router()

router.get('/message',getMessages)
router.post('/message', postMessages)
router.put('/message/:id',putMessages)
router.delete('/message/:id',deleteMessages)