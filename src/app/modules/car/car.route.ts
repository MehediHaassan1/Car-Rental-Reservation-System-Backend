import { Router } from "express";
import { validateCar } from "./car.validation";
import validateRequestHandler from "../../middlewares/validateRequestHandler";
import { CarControllers } from "./car.controller";
import authHandler from "../../middlewares/authHandler";
import { T_User_Roles } from "../user/user.constant";

const router = Router();

// return A Booked Car
router.put(
    '/return',
    authHandler(T_User_Roles.ADMIN),
    CarControllers.returnABookedCar
)


// Create a car
router.post(
    '/',
    authHandler(T_User_Roles.ADMIN),
    validateRequestHandler(validateCar.createCarSchema),
    CarControllers.createCar
)

// get all cars
router.get(
    '/',
    CarControllers.getAllCars
)

// get single cars
router.get(
    '/:id',
    CarControllers.getSingleCar
)


// update car info
router.put(
    '/:id',
    authHandler(T_User_Roles.ADMIN),
    validateRequestHandler(validateCar.updateCarSchema),
    CarControllers.updateCar
)


// Delete car
router.delete(
    '/:id',
    authHandler(T_User_Roles.ADMIN),
    CarControllers.deleteCar
)



export const CarRoutes = router;