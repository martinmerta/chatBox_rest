import mongoose, { Schema } from 'mongoose';

const MessageSchema = new Schema({
  userId: { type: Schema.Types.ObjectId },
  message: String
});

export const messageSchema = mongoose.model('Messages', MessageSchema);
