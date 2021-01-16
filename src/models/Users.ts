import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: String,
    age: Number,
    phoneNumber: String,
    password: String,
});

export default mongoose.model('Users', usersSchema);