import express from 'express';

const userRouter = express.Router();
userRouter.get('/', (req, res) => {
  res.json({ msg: 'test passed' });
});
userRouter.post('/add', (req, res) => {
  res.json('user Authenticated');
});

export default userRouter;
