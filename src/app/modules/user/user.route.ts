import { Router } from "express";
import { T_User_Roles } from "./user.constant";
import authHandler from "../../middlewares/authHandler";
import validateRequestHandler from "../../middlewares/validateRequestHandler";
import { validateUser } from "./user.validation";
import { UserController } from "./user.controller";

const router = Router();




router.get(
  '/',
  authHandler(T_User_Roles.ADMIN),
  UserController.getAllUsers
)

router.get(
  '/me',
  authHandler(T_User_Roles.USER, T_User_Roles.ADMIN),
  UserController.getMe
)


router.get(
  '/:id',
  authHandler(T_User_Roles.ADMIN),
  UserController.getSingleUser
)

router.delete(
  '/delete-user/:id',
  authHandler(T_User_Roles.ADMIN),
  UserController.deleteUser
)

router.patch(
  '/make-admin/:id',
  authHandler(T_User_Roles.ADMIN),
  UserController.makeAdmin
)

router.put(
  '/update-profile',
  authHandler(T_User_Roles.USER, T_User_Roles.ADMIN),
  validateRequestHandler(validateUser.updateUserValidation),
  UserController.updateUser
)



export const UserRoutes = router;