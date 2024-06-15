import { Router } from "express";
import { AuthControllers } from "./auth.controller";
import validateRequestHandler from "../../middlewares/validateRequestHandler";
import { validateUser } from "../user/user.validation";
import { validateAuth } from "./auth.validation";

const router = Router();

// user or admin signup api endpoint
router.post(
    '/signup',
    validateRequestHandler(validateUser.createUserValidationSchema),
    AuthControllers.signUp
);


// user or admin signin api endpoint
router.post(
    '/signin',
    validateRequestHandler(validateAuth.signInValidationSchema),
    AuthControllers.signIn
)

export const AuthRoutes = router;