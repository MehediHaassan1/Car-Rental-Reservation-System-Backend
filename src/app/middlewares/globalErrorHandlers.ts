import { NextFunction, Request, Response } from "express";

const globalErrorHandlers = (
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


export default globalErrorHandlers;