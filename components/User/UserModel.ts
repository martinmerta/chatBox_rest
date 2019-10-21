import mongoose, {Schema, mongo} from 'mongoose'

const UserSchema = new Schema({
    email:String,
    password:String
})

export const userSchema = mongoose.model('Users', UserSchema)