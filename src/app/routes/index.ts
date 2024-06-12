import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { CarRoutes } from "../modules/car/car.route";
import { BookingRoutes } from "../modules/booking/booking.route";

const router = Router();

router.use('/auth', AuthRoutes)

router.use('/cars', CarRoutes)

router.use('/bookings', BookingRoutes)


export default router;