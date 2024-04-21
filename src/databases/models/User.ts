import mongoose, { Schema } from 'mongoose';
import { UserInterface } from '../interfaces/userInterface';

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});


export default mongoose.model<UserInterface>('User', UserSchema);
