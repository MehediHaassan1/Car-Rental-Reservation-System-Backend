import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUser } from "../user/user.interface";
import User from "../user/user.model";
import { TSignIn } from "./auth.interface";
import jwt from 'jsonwebtoken';
import config from "../../config";

const signUpUser = async (payload: TUser) => {

    // check the user with same email is exists or not!
    const user = await User.isUserExists(payload?.email);

    if (user) {
        throw new AppError(httpStatus.CONFLICT, 'User already exists!')
    }

    // create user
    const result = await User.create(payload);
    return result;
}


const singInUser = async (payload: TSignIn) => {
    const { email, password } = payload;

    // check the user is exists or not!
    const user = await User.isUserExists(email);
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found!')
    }

    // check the user is deleted or not!
    const isDeleted = user?.isDeleted;
    if (isDeleted) {
        throw new AppError(httpStatus.FORBIDDEN, 'User is deleted!')
    }

    // check the password is matched or not!
    if (! await User.isPasswordMatched(password, user?.password)) {
        throw new AppError(httpStatus.FORBIDDEN, 'Wrong password!')
    }

    // create token
    const jwtPayload = {
        user: user.email,
        role: user.role
    }
    const accessToken = jwt.sign(
        jwtPayload,
        config.jwt_access_secret as string,
        { expiresIn: config.jwt_access_secret_expires_in as string }
    );


    return {
        user,
        accessToken
    }
}


export const AuthServices = {
    signUpUser,
    singInUser
}