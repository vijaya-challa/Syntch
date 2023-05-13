import express from 'express';
import createError from 'http-errors';
import User from '../models/User.js';

const userRouter = express.Router();

userRouter.post('/add', async (req, res, next) => {
  try {
    const user = new User({ firebase_uid: req.user.uid, roles: req.body.roles });
    await user.save();

    res.json({ msg: 'User added successfully', user });
  } catch (error) {
    next(createError(401, error.message));
  }
});

userRouter.get('/roles', async (req, res, next) => {
  try {
    const user = await User.findOne({ firebase_uid: req.user.uid });

    res.json({ roles: user.roles });
  } catch (error) {
    next(createError(401, error.message));
  }
});

userRouter.delete('/delete', async (req, res, next) => {
  try {
    const user = await User.findOneAndDelete({ firebase_uid: req.user.uid });
    res.json({ msg: `user deleted successfully:${user.email}` });
  } catch (error) {
    next(createError(401, error.message));
  }
});

export default userRouter;
