import { AuthServices } from "./auth.service"
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const signUpUser = catchAsync(async (req, res) => {
    const result = await AuthServices.signUpUser(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User signed up successfully!',
        data: result
    })
})


export const AuthControllers = { signUpUser }