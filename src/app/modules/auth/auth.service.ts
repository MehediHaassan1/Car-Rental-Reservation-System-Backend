import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUser } from "../user/user.interface";
import User from "../user/user.model";
import { TSignIn } from "./auth.interface";
import config from "../../config";
import { createToken, verifyToken } from "./auth.utils";

const signUpUser = async (payload: TUser) => {

    // check the user with same email is exists or not!
    const user = await User.isUserExists(payload?.email);
    // user.role = 'user';

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

    if (user?.isDeleted) {
        throw new AppError(httpStatus.BAD_GATEWAY, 'The user is blocked!')
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

    // console.log(accessToken)

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


const refreshTokenFromClient = async (token: string) => {
    const decoded = verifyToken(token, config.jwt_refresh_secret as string)
    const { email, iag } = decoded;

    // check the user;
    const user = await User.findOne({ email })
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found!')
    }

    const isDeleted = user?.isDeleted;
    if (isDeleted) {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted!');
    }

    const jwtPayload = {
        email: user.email,
        role: user.role,
    };

    const accessToken = createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_secret_expires_in as string,
    );

    return {
        accessToken,
    };
}

export const AuthServices = {
    signUpUser,
    singInUser,
    refreshTokenFromClient,
}