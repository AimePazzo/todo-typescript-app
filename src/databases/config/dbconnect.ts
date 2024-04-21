import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config

export const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URL) {
      throw new Error('MONGODB_URL is not defined in the environment variables');
    }
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
};
mongoose.set('strictQuery', false);