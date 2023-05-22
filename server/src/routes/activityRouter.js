import express from 'express';
import Activity from '../models/Activity.js';
import User from '../models/User.js';

const activityRouter = express.Router();

activityRouter.post('/add', async (req, res) => {
  try {
    const { user, task, points } = req.body;

    if (!task || !task.selectedLevel || !task.currentTaskIndex) {
      return res.status(400).json({ message: 'Invalid task data' });
    }
    const u = await User.findOne({ firebase_uid: user });
    console.log(u);
    const existingTask = await Activity.findOne({
      // eslint-disable-next-line no-underscore-dangle
      user: u._id,
      'task.selectedLevel': task.selectedLevel,
      'task.currentTaskIndex': task.currentTaskIndex
    });

    if (existingTask) {
      return res.status(400).json({ message: 'Task already exists' });
    }

    // Create a new activity
    const newActivity = new Activity({
      // eslint-disable-next-line no-underscore-dangle
      user: u._id,
      task: {
        selectedLevel: task.selectedLevel,
        currentTaskIndex: task.currentTaskIndex
      },
      // eslint-disable-next-line object-shorthand
      points: points
    });

    // Save the new activity
    await newActivity.save();

    console.log(newActivity);
    return res.json({ message: 'Points saved successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error saving points' });
  }
});

activityRouter.get('/statistics', async (req, res) => {
  try {
    const { user } = req.headers;

    const u = await User.findOne({ firebase_uid: user });
    if (!u) {
      return res.status(400).json({ message: 'User not found' });
    }

    const statistics = await Activity.aggregate([
      {
        // eslint-disable-next-line no-underscore-dangle
        $match: { user: u._id }
      },
      {
        $group: {
          _id: '$task.selectedLevel',
          count: { $sum: 1 },
          totalPoints: { $sum: '$points' }
        }
      }
    ]);

    return res.json({ statistics });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error retrieving statistics' });
  }
});

export default activityRouter;
