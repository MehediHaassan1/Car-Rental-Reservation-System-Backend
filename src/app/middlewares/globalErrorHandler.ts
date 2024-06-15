import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { TErrorSources } from "../interface/error";
import handleZodError from "../errors/handleZodError";
import handleDuplicateError from "../errors/handleDuplicateError";
import handleValidationError from "../errors/handleValidationError";
import AppError from "../errors/AppError";
import handleCastError from "../errors/handleCastError";
import config from "../config";

const globalErrorHandler = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {

    let statusCode = 500;
    let message = 'Something went wrong!'

    let errorSources: TErrorSources = [
        {
            path: '',
            message: 'Something went wrong!'
        }
    ]

    if (error instanceof ZodError) {
        const simplifiedError = handleZodError(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    } else if (error.code === 11000) {
        const simplifiedError = handleDuplicateError(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    } else if (error.name === 'ValidationError') {
        const simplifiedError = handleValidationError(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    } else if (error instanceof AppError) {
        statusCode = error?.statusCode;
        message = error.message;
        errorSources = [
            {
                path: '',
                message: error?.message,
            },
        ];
    } else if (error.name === "TokenExpiredError") {
        statusCode = 400;
        message = 'Invalid token!';
        errorSources = [
            {
                path: '',
                message: error?.message,
            },
        ];
    } else if (error.name === 'CastError') {
        const simplifiedError = handleCastError(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    } else if (error instanceof Error) {
        message = error.message;
        errorSources = [
            {
                path: '',
                message: error?.message,
            },
        ];
    }

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        errorSources,
        // error,
        stack: config.NODE_ENV === 'development' ? error.stack : null
    })
}


export default globalErrorHandler;