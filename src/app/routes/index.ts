import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { CarRoutes } from "../modules/car/car.route";
import { BookingRoutes } from "../modules/booking/booking.route";
import { UserRoutes } from "../modules/user/user.route";

const router = Router();

const routers = [
    { path: '/auth', designation: AuthRoutes },
    { path: '/cars', designation: CarRoutes },
    { path: '/bookings', designation: BookingRoutes },
    { path: '/users', designation: UserRoutes}
]

routers.forEach(route => router.use(route.path, route.designation))


export default router;