import express from 'express';
import createError from 'http-errors';
import Level from '../models/Level.js';
import Task from '../models/Task.js';

const levelRouter = express.Router();

levelRouter.post('/add', async (req, res, next) => {
  try {
    const { name, timerCount, blanksCount, defaultPoints } = req.body;
    if (name) {
      const level = new Level({ name, timerCount, blanksCount, defaultPoints });
      await level.save();
      res.json({ msg: `level added`, level });
    } else {
      res.send(createError(401, 'missing name'));
    }
  } catch (error) {
    next(createError(401, error.message));
  }
});

levelRouter.delete('/delete', async (req, res, next) => {
  try {
    const { id, name } = req.body;
    if (id) {
      await Level.findByIdAndDelete(id);
      res.json({ msg: `level deleted` });
    } else if (name) {
      await Level.findOneAndDelete({ name });
      res.json({ msg: `level deleted` });
    } else {
      res.send(createError(401, 'missing id or name'));
    }
  } catch (error) {
    next(createError(401, error.message));
  }
});

levelRouter.get('/all', async (req, res, next) => {
  try {
    const levels = await Level.find({});
    res.json(levels);
  } catch (error) {
    next(createError(401, error.message));
  }
});

levelRouter.post('/tasks', async (req, res, next) => {
  try {
    console.log(req.body);
    const level = await Level.findOne({ name: req.body.name });

    // eslint-disable-next-line no-underscore-dangle
    const tasks = await Task.find({ level: level._id });

    const resObj = {
      level: level.name,
      timerCount: level.timerCount,
      blanksCount: level.blanksCount,
      defaultPoints: level.defaultPoints,
      // eslint-disable-next-line no-underscore-dangle
      _id: level._id,
      tasks
    };
    // console.log(resObj);
    res.json(resObj);
  } catch (error) {
    next(createError(401, error.message));
  }
});

export default levelRouter;
