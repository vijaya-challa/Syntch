import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const levelSchema = new Schema({
  name: { type: String, required: true, unique: true },
  timerCount: { type: Number, required: true },
  blanksCount: { type: Number, required: true },
  defaultPoints: { type: Number, required: true }
  // tasks: [{ type: mongoose.Types.ObjectId, ref: 'tmpTask' }]
});

const Level = model('tmpLevel', levelSchema);
export default Level;
