import express from 'express';
import createError from 'http-errors';
import Level from '../models/Level.js';

const levelRouter = express.Router();

levelRouter.post('/add', async (req, res, next) => {
  try {
    const { name } = req.body;
    if (name) {
      const level = new Level({ name });
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

export default levelRouter;
