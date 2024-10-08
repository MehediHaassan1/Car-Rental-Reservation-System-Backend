import httpStatus from "http-status";
import AppError from "../errors/AppError";
import catchAsync from "../utils/catchAsync";
import config from "../config";
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from "../modules/user/user.model";
import { TUserRole } from "../modules/user/user.interface";

const authHandler = (...userRoles: TUserRole[]) => {
    return catchAsync(async (req, res, next) => {
        const authorization = req.headers.authorization
        const token = authorization?.split(' ')[1]


        // check the access token is missing or not
        if (!token) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'Authentication failed!')
        }


        // verify the jwt
        // const decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;
        let decoded;
        try {
            decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;
        } catch (error) {
            throw new AppError(httpStatus.UNAUTHORIZED, "Jwt expired");
        }


        const { email, role } = decoded;

        // check the user exists or not
        const existingUser = await User.isUserExists(email);
        if (!existingUser) {
            throw new AppError(httpStatus.FORBIDDEN, 'Forbidden access!')
        }

        // check the user is user or admin
        if (userRoles && !userRoles.includes(role)) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'You have no access to this route!')
        }

        req.user = decoded

        next();
    })
}

export default authHandler;