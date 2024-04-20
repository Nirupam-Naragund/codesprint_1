import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    flag: {
        type: Number,
        default: 0
    }
});

const User =  model('user', UserSchema);
User.createIndexes();
export default model('user', UserSchema);