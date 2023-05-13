import express from 'express';
import createError from 'http-errors';
import User from '../models/User.js';
import firebase from '../lib/firebase.cjs';

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

userRouter.get('/all', async (req, res, next) => {
  try {
    const users = await User.find({});
    const fbuids = users.map((user) => {
      return { uid: user.firebase_uid };
    });
    const fbdata = await firebase.auth().getUsers(fbuids);
    const resdata = fbdata.users.map((user, index) => {
      const { roles } = users[index];
      return {
        email: user.email,
        displayName: user.displayName,
        roles
      };
    });
    console.log({ ...resdata });
    res.json(resdata);
  } catch (error) {
    next(createError(401, error.message));
  }
});

userRouter.post('/admin-add', async (req, res, next) => {
  try {
    const roles = ['user', 'admin'];
    const fbdata = await firebase.auth().getUserByEmail(req.body.email);
    await User.findOneAndUpdate({ firebase_uid: fbdata.uid }, { roles });
    res.json({ msg: 'Admin role added' });
  } catch (error) {
    next(createError(401, error.message));
  }
});

userRouter.post('/admin-remove', async (req, res, next) => {
  try {
    const roles = ['user'];
    const fbdata = await firebase.auth().getUserByEmail(req.body.email);
    await User.findOneAndUpdate({ firebase_uid: fbdata.uid }, { roles });
    res.json({ msg: 'Admin role deleted' });
  } catch (error) {
    next(createError(401, error.message));
  }
});

export default userRouter;
