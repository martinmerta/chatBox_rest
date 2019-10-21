import mongoose, {Schema} from 'mongoose';

const MessageSchema = new Schema({
    owner:Schema.Types.ObjectId,
    message:String
})

export const messageSchema = mongoose.model('Messages', MessageSchema)