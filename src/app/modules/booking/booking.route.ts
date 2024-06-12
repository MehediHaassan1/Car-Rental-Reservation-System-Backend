import { Router } from "express";
import authHandler from "../../middlewares/authHandler";
import { T_User_Roles } from "../user/user.constant";
import validateRequestHandler from "../../middlewares/validateRequestHandler";
import { validateBooking } from "./booking.validation";
import { BookingControllers } from "./booking.controller";

const router = Router();

router.post(
    '/',
    authHandler(T_User_Roles.USER),
    validateRequestHandler(validateBooking.createBookingSchema),
    BookingControllers.bookACar
)


// get All Bookings
router.get(
    '/',
    authHandler(T_User_Roles.ADMIN),
    BookingControllers.getAllBookings
)


export const BookingRoutes = router;