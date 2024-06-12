import { Router } from "express";
import { validateCar } from "./car.validation";
import validateRequestHandler from "../../middlewares/validateRequestHandler";
import { CarControllers } from "./car.controller";
import authHandler from "../../middlewares/authHandler";
import { T_User_Roles } from "../user/user.constant";

const router = Router();

router.post(
    '/',
    authHandler(T_User_Roles.ADMIN),
    validateRequestHandler(validateCar.createCarSchema),
    CarControllers.createCar
)

router.get(
    '/',
    CarControllers.getAllCars
)


router.get(
    '/:id',
    CarControllers.getSingleCar
)

export const CarRoutes = router;