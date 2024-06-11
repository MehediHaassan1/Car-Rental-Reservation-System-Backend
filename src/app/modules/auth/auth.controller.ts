import { Request, Response } from "express";
import { AuthServices } from "./auth.service"

const signUpUser = async (req: Request, res: Response) => {
    const result = await AuthServices.signUpUser(req.body);
    res.status(200).send({
        success: true,
        message: 'User signed up successfully',
        data: result
    })
}


export const AuthControllers = { signUpUser }