import { TErrorResponse } from "../interface/error";

const handleDuplicateError = (err: any): TErrorResponse => {
    const match = err.message.match(/"([^"]*)"/);
    const errMessage = match && match[1];
    const statusCode = 400;
    const message = 'A user with the provided email already exists!'
    const errorSources = [{
        path: '',
        message: `${errMessage} is already exists!`,
    }]

    return {
        statusCode,
        message,
        errorSources,
    }
}

export default handleDuplicateError;