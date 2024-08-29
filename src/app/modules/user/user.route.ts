import { Router } from "express";
import { T_User_Roles } from "./user.constant";
import authHandler from "../../middlewares/authHandler";
import validateRequestHandler from "../../middlewares/validateRequestHandler";
import { validateUser } from "./user.validation";
import { UserController } from "./user.controller";

const router = Router();

router.get(
  '/me',
  authHandler(T_User_Roles.USER, T_User_Roles.ADMIN),
  UserController.getSingleUser
)

router.put(
  '/update-profile',
  authHandler(T_User_Roles.USER, T_User_Roles.ADMIN),
  validateRequestHandler(validateUser.updateUserValidation),
  UserController.updateUser
)

export const UserRoutes = router;