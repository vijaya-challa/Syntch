import express from 'express';
import createError from 'http-errors';
import User from '../models/User.js';

const userRouter = express.Router();
userRouter.get('/', (req, res) => {
  res.json({ msg: 'test passed' });
});
userRouter.post('/create', async (req, res, next) => {
  try {
    const user = new User({ firebase_uid: req.user.uid, roles: req.body.roles });
    await user.save();

    res.send(user);
  } catch (error) {
    next(createError(401, error.message));
  }
});

userRouter.post('/delete', async (req, res, next) => {
  try {
    const user = await User.findOneAndDelete({ firebase_uid: req.user.uid });
    res.json({ msg: `user deleted successfully:${user.email}` });
  } catch (error) {
    next(createError(401, error.message));
  }
});

export default userRouter;
