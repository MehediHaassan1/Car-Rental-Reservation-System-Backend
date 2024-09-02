import { Router } from "express";
import { validateCar } from "./car.validation";
import validateRequestHandler from "../../middlewares/validateRequestHandler";
import { CarControllers } from "./car.controller";
import authHandler from "../../middlewares/authHandler";
import { T_User_Roles } from "../user/user.constant";

const router = Router();

// get all cars
router.get(
    '/',
    CarControllers.getAllCars
)

// return A Booked Car
router.put(
    '/return-car/:id',
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



// search cars
router.get(
    '/search-cars',
    authHandler(T_User_Roles.ADMIN, T_User_Roles.USER),
    CarControllers.searchCars
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
router.put(
    '/delete-car/:id',
    authHandler(T_User_Roles.ADMIN),
    CarControllers.deleteCar
)



export const CarRoutes = router;