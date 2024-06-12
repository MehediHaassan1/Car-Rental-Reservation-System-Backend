import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const globalErrorHandler = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {

    let statusCode = error?.statusCode || 500;
    let message = error?.message || 'Something went wrong!'
    

    return res.status(statusCode).json({
        success: false,
        message,
        error
    })
}


export default globalErrorHandler;