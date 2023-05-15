import express from 'express';
import createError from 'http-errors';
import Task from '../models/Task.js';

const taskRouter = express.Router();

taskRouter.post('/add', async (req, res, next) => {
  try {
    const { description, snippet, level } = req.body;
    console.log(req.body);
    let task;
    if (level) {
      task = new Task({ description, snippet, level });
    } else {
      task = new Task({ description, snippet });
    }
    console.log(task);
    await task.save();
    res.json({ msg: `task added`, task });
  } catch (error) {
    next(createError(401, error.message));
  }
});

taskRouter.delete('/delete', async (req, res, next) => {
  try {
    const { id } = req.body;
    await Task.findByIdAndDelete(id);
    res.json({ msg: `task deleted` });
  } catch (error) {
    next(createError(401, error.message));
  }
});

taskRouter.get('/all', async (req, res, next) => {
  try {
    const tasks = await Task.find({});
    await Task.populate(tasks, { path: 'level', select: 'name' });
    res.json(tasks);
  } catch (error) {
    next(createError(401, error.message));
  }
});

export default taskRouter;
