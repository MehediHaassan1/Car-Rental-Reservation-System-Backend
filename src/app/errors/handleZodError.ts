import { ZodError, ZodIssue } from "zod";
import { TErrorResponse } from "../interface/error";

const handleZodError = (err: ZodError): TErrorResponse => {

    const errorSources = err.issues.map((issue: ZodIssue) => {
        return {
            path: issue.path[issue.path.length - 1],
            message: issue.message,
        }
    })

    return {
        errorSources,
        message: 'Validation error!',
        statusCode: 400,
    }
}

export default handleZodError;