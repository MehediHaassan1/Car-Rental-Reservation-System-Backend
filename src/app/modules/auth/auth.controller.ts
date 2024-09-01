import { AuthServices } from "./auth.service"
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import config from "../../config";

// sign up user or admin
const signUp = catchAsync(async (req, res) => {
    const result = await AuthServices.signUpUser(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User registered successfully!',
        data: result
    })
})


// sign in user or admin
const signIn = catchAsync(async (req, res) => {
    const { user, accessToken, refreshToken } = await AuthServices.singInUser(req.body);

    res.cookie('refreshToken', refreshToken, {
        secure: config.NODE_ENV === 'production',
        httpOnly: true
    })

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User logged in successfully!',
        data: user,
        token: accessToken
    })
})

const refreshToken = catchAsync(async (req, res) => {
    const { refreshToken } = req.cookies;
    const result = await AuthServices.refreshTokenFromClient(refreshToken);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Access token is retrieved!',
        data: result
    })
})

export const AuthControllers = {
    signUp,
    signIn,
    refreshToken,
}