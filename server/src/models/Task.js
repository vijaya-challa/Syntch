import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const taskSchema = new Schema({
  description: { type: String, required: true },
  snippet: { type: String, required: true },
  level: { type: Schema.Types.ObjectId, ref: 'tmpLevel' }
});

const Task = model('tmpTask', taskSchema);
export default Task;
