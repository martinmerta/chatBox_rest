// here will be connection to server
import { app } from '../app'
import {connectToDB} from '../components/Database/mongo'
const port = process.env.port|| 3000
connectToDB('URL',app,port)