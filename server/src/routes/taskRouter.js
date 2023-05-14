import express from 'express';
import createError from 'http-errors';
import Task from '../models/Task.js';

const taskRouter = express.Router();

taskRouter.post('/add', async (req, res, next) => {
  try {
    const { description, snippet, level } = req.body;
    if (description && snippet && level) {
      const task = new Task({ description, snippet, level });
      await task.save();
      res.json({ msg: `task added`, task });
    } else {
      res.send(createError(401, 'required description, snippet, level'));
    }
  } catch (error) {
    next(createError(401, error.message));
  }
});

export default taskRouter;
