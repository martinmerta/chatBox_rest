import {Schema} from 'mongoose';

const MessageSchema = new Schema({
    owner:Schema.Types.ObjectId,
    message:Schema.Types.String
})

