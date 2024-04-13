import mongoose, { Schema } from 'mongoose';
import { TodoInterface } from '../interfaces/todoInterface';

const TodoSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true,ref:'User' },
  title: { type: String, required: true },
}, { timestamps: true });

export const TodoModel = mongoose.model<TodoInterface>('Todo', TodoSchema);
