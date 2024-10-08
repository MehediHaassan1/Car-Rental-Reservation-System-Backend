import { Schema, model } from 'mongoose';
import { TUser, TUserModel } from './user.interface';
import { TUserRole } from './user.constant';
import bcrypt from 'bcrypt';
import config from '../../config';

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
        required: true,
        default: 'user'
    },
    password: {
        type: String,
        required: true,
        select: 0
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
    },
    image: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
});

// hashed the password field
userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(
        this.password,
        Number(config.bcrypt_salt_round)
    )

    next();
})


// remove the password field in the response
userSchema.set('toJSON', {
    transform: (doc, ret, options) => {
        delete ret.password;
        return ret;
    }
});

userSchema.statics.isUserExists = async function (email) {
    const user = await User.findOne({ email }).select('+password');
    return user;
}

userSchema.statics.isPasswordMatched = async function (
    plainTextPassword: string,
    hashedPassword: string
) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
}


const User = model<TUser, TUserModel>('User', userSchema);

export default User;
