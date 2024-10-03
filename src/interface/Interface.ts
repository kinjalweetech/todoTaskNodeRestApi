import mongoose, { Schema, Document } from "mongoose";

export interface TodoI extends Document {
  title: string;
  completed: boolean;
}

const todoSchema: Schema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const todoModel = mongoose.model<TodoI>("Todo", todoSchema);
export default todoModel;
