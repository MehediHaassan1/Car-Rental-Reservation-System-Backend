import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { CarRoutes } from "../modules/car/car.route";
import { BookingRoutes } from "../modules/booking/booking.route";
import { UserRoutes } from "../modules/user/user.route";
import { StatisticsRoutes } from "../modules/statistics/statistics.routes";

const router = Router();

const routers = [
    { path: '/auth', designation: AuthRoutes },
    { path: '/cars', designation: CarRoutes },
    { path: '/bookings', designation: BookingRoutes },
    { path: '/users', designation: UserRoutes},
    { path: '/stats', designation: StatisticsRoutes},
]

routers.forEach(route => router.use(route.path, route.designation))


export default router;