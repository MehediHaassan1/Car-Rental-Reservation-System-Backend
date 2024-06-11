import { Model } from "mongoose";

export interface TUser {
    name: string;
    email: string;
    role: 'user' | 'admin';
    password: string;
    phone: string;
    address: string;
    isDeleted?: boolean;
}

export interface TUserModel extends Model<TUser> {
    isUserExists(email: string): TUser;
}