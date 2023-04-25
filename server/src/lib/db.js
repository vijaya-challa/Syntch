import mongoose from 'mongoose';

const connectDB = async () => {
  mongoose.set('strictQuery', true);
  const { DB_USER, DB_PASS, DB_NAME, DB_HOST } = process.env;

  const connectionString = `mongodb+srv://${DB_USER}:${DB_PASS}${DB_HOST}/${DB_NAME}`;
  try {
    await mongoose.connect(connectionString);
    console.log('[DB -> Connected]');
  } catch (err) {
    console.log('[DB Err]', err);
  }
};

export default connectDB;
