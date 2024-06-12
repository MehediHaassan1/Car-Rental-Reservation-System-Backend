import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { CarRoutes } from "../modules/car/car.route";

const router = Router();

router.use('/auth', AuthRoutes)

router.use('/cars', CarRoutes)


export default router;