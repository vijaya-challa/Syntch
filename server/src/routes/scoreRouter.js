import express, { request } from 'express';
import createError from 'http-errors';
import Score from '../models/Score.js';

const scoreRouter = express.Router();

scoreRouter.post('/add', async (req, res, next) => {
  try {
    const score = new Score({
      user: req.user,
      task: request.task,
      points: req.points
    });
    await score.save();

    res.json({ msg: 'score added successfully', score });
  } catch (error) {
    next(createError(401, error.message));
  }
});

scoreRouter.get('/get', async (req, res, next) => {
  try {
    const scores = await Score.find({
      user: req.user
    });

    res.json({ scores });
  } catch (error) {
    next(createError(401, error.message));
  }
});

export default scoreRouter;
