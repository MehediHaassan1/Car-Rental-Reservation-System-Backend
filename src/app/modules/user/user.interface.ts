import { Model } from "mongoose";
import { T_User_Roles } from "./user.constant";

export type TUser = {
    name: string;
    email: string;
    role: 'user' | 'admin';
    password: string;
    phone: string;
    address: string;
    image: string;
    isDeleted: boolean;
}

export interface TUserModel extends Model<TUser> {
    isUserExists(email: string): Promise<TUser>;
    isPasswordMatched(plainTextPassword: string, hashedPassword: string): boolean;
}

export type TUserRole = typeof T_User_Roles[keyof typeof T_User_Roles];