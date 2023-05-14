import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema({
  firebase_uid: { type: String, required: true, unique: true },
  roles: [{ type: String }]
});

const User = model('user', userSchema);
export default User;
