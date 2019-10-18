import express from 'express';
import bodyPraser from 'body-parser'
import helmet from 'helmet'
import {router as messageRoutes}from './components/Message';
import { router as userRoutes} from './components/User'
export const app = express()
app.use(helmet())
app.use(bodyPraser.json());
app.use('/api',messageRoutes)
app.use('/api',userRoutes)
