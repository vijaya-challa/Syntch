import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const levelSchema = new Schema({
  name: { type: String, required: true, unique: true }
});

const Level = model('tmpLevel', levelSchema);
export default Level;
