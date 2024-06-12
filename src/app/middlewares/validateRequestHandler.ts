import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const validateRequestHandler = (schema: AnyZodObject) => {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            await schema.parseAsync({
                body: req.body
            })
            next()
        } catch (err: any) {
            throw new Error(err.message)
        }
    }

}

export default validateRequestHandler;