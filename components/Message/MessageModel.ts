import mongoose, {Schema} from 'mongoose';

const MessageSchema = new Schema({
    owner:{type:Schema.Types.ObjectId,ref:'Users'},
    messages:[String]
})

export const messageSchema = mongoose.model('Messages', MessageSchema)