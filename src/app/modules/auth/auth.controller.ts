import { AuthServices } from "./auth.service"
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import config from "../../config";

const signUp = catchAsync(async (req, res) => {
    const result = await AuthServices.signUpUser(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User registered successfully!',
        data: result
    })
})


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

export const AuthControllers = { signUp, signIn }