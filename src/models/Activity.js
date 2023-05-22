import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const activitySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  task: {
    selectedLevel: {
      type: String,
      required: true
    },
    currentTaskIndex: {
      type: Number,
      required: true
    }
  },
  points: { type: Number }
});

const Activity = model('activity', activitySchema);
export default Activity;
