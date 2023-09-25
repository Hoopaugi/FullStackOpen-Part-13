import express, { Express } from 'express';
import cors from 'cors'

import apiRouter from './api';

const app: Express = express();

app.use(cors())
app.use(express.json())

app.use('/api', apiRouter)

export default app
