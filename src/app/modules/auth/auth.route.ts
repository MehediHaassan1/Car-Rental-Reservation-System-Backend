import { Router } from "express";
import { AuthControllers } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { validateUser } from "../user/user.validation";
import { validateAuth } from "./auth.validation";

const router = Router();


router.post(
    '/signup',
    validateRequest(validateUser.createUserValidationSchema),
    AuthControllers.signUp
);

router.post(
    '/signin',
    validateRequest(validateAuth.signInValidationSchema),
    AuthControllers.signIn
)

export const AuthRoutes = router;