import mongoose, { Schema } from 'mongoose';

const MessageSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'Users' },
  message: String
});

export const messageSchema = mongoose.model('Messages', MessageSchema);
