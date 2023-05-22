import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const scoreSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'user', required: true, unique: true },
  task: { type: Schema.Types.ObjectId, ref: 'task', required: true },
  points: { type: Number, default: 0 }
});

const Score = model('score', scoreSchema);
export default Score;
