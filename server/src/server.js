import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import logger from 'morgan';

import activityRouter from './routes/activityRouter.js';
import userRouter from './routes/userRouter.js';
import levelRouter from './routes/levelRouter.js';
import taskRouter from './routes/taskRouter.js';
import scoreRouter from './routes/scoreRouter.js';
import connectDB from './lib/db.js';
import checkAuth from './middleware/checkAuth.js';

const app = express();
dotenv.config();
app.use(express.json());
app.use(logger('dev'));
app.use(cors());
connectDB();

app.use('/activity', checkAuth, activityRouter);
app.use('/user', checkAuth, userRouter);
app.use('/level', levelRouter);
app.use('/task', taskRouter);
app.use('/score', scoreRouter);

const port = process.env.PORT || 8001;
app.listen(port, () => {
  console.log(`:+1: Server is running on http://localhost:${port}`);
});
