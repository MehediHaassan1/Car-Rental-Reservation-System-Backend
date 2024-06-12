import { Router } from "express";
import { validateCar } from "./car.validation";
import validateRequest from "../../middlewares/validateRequest";
import { CarControllers } from "./car.controller";

const router = Router();

router.post(
    '/',
    validateRequest(validateCar.createCarSchema),
    CarControllers.createCar
)



export const CarRoutes = router;