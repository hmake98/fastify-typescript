import mongoose, { Schema, Document } from 'mongoose';

export interface User extends Document {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}

export const UserSchema: Schema = new Schema({
    email: { type: 'String', required: true, unique: true },
    firstName: { type: 'String', required: false },
    lastName: { type: 'String', required: false },
    password: { type: 'String', required: false },
}, { timestamps: true })

export default mongoose.model<User>('User', UserSchema)