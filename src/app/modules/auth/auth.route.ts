import { Router } from "express";
import { AuthControllers } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { validateUser } from "../user/user.validation";

const router = Router();


router.post(
    '/signup',
    validateRequest(validateUser.createUserValidationSchema),
    AuthControllers.signUpUser
);


export const AuthRoutes = router;