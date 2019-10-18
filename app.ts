import express from 'express';
import bodyPraser from 'body-parser'
import helmet from 'helmet'
import {router}from './components/Message'
export const app = express()
app.use(helmet())
app.use(bodyPraser.json());
app.use('/api',router)