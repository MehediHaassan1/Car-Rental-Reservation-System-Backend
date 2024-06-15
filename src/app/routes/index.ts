import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { CarRoutes } from "../modules/car/car.route";
import { BookingRoutes } from "../modules/booking/booking.route";

const router = Router();

const routers = [
    { path: '/auth', designation: AuthRoutes },
    { path: '/cars', designation: CarRoutes },
    { path: '/bookings', designation: BookingRoutes },
]

routers.forEach(route => router.use(route.path, route.designation))


export default router;