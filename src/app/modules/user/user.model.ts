import { Schema, model } from 'mongoose';
import { TUser, TUserModel } from './user.interface';
import { TUserRole } from './user.constant';

const userSchema = new Schema<TUser, TUserModel>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    role: {
        type: String,
        enum: TUserRole,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});


userSchema.statics.isUserExists = async function (email) {
    const user = await User.findOne({ email });
    return user;
}


const User = model<TUser, TUserModel>('User', userSchema);

export default User;
