import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUser } from "../user/user.interface";
import User from "../user/user.model";
import { TSignIn } from "./auth.interface";
import config from "../../config";
import { createToken } from "./auth.utils";

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

    // check the password is matched or not!
    if (! await User.isPasswordMatched(password, user?.password as string)) {
        throw new AppError(httpStatus.FORBIDDEN, 'Wrong password!')
    }

    // create token
    const jwtPayload = {
        email: user.email as string,
        role: user.role as string,
    }
    const accessToken = createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_secret_expires_in as string
    )

    const refreshToken = createToken(
        jwtPayload,
        config.jwt_refresh_secret as string,
        config.jwt_refresh_secret_expires_in as string
    )

    return {
        user,
        accessToken,
        refreshToken
    }
}


export const AuthServices = {
    signUpUser,
    singInUser
}