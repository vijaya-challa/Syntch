import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import logger from 'morgan';
import connectDB from './lib/db.js';

const app = express();
dotenv.config();
app.use(logger('dev'));
app.use(cors());
connectDB();

const port = process.env.PORT || 8001;
app.listen(port, () => {
  console.log(`:+1: Server is running on http://localhost:${port}`);
});
