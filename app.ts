import express from 'express';
import bodyPraser from 'body-parser'
import helmet from 'helmet'
export const app = express()
app.use(helmet())
app.use(bodyPraser());