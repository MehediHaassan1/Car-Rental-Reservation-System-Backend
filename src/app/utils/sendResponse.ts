import { Response } from "express";

type TResponse<T> = {
    statusCode: number;
    success: boolean;
    message: string;
    data: T;
    token?: string;
}


const sendResponse = <T>(res: Response, response: TResponse<T>) => {
    return res.status(response?.statusCode).send({
        success: response?.success,
        statusCode: response.statusCode,
        message: response?.message,
        data: response?.data,
        token: response?.token
    })
}


export default sendResponse;