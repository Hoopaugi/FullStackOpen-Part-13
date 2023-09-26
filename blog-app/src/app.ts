import express, { Express } from 'express';
import cors from 'cors'

import apiRouter from './api';
import { errorHandler } from './middlewares';
import authRouter from './auth';

const app: Express = express();

app.use(cors())
app.use(express.json())

app.use('/api', apiRouter)
app.use('/auth', authRouter)

app.use(errorHandler)

export default app
