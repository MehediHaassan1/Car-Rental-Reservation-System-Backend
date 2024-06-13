import { TErrorResponse } from "../interface/error";

const handleDuplicateError = (err: any): TErrorResponse => {
    const statusCode = 400;
    const message = 'A user with the provided email already exists!'
    const errorSources = [{
        path: 'email',
        message: 'Use another email!'
    }]

    return {
        statusCode,
        message,
        errorSources,
    }
}

export default handleDuplicateError;