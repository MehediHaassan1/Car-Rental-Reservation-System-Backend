import { Router } from "express";
import authHandler from "../../middlewares/authHandler";
import { T_User_Roles } from "../user/user.constant";
import validateRequestHandler from "../../middlewares/validateRequestHandler";
import { validateBooking } from "./booking.validation";
import { BookingControllers } from "./booking.controller";

const router = Router();

// create booking
router.post(
    '/',
    authHandler(T_User_Roles.USER),
    validateRequestHandler(validateBooking.createBookingValidation),
    BookingControllers.bookACar
)

router.patch(
    '/update-booking/:id',
    authHandler(T_User_Roles.USER, T_User_Roles.ADMIN),
    BookingControllers.updateBooking
)


router.delete(
    '/delete-booking/:id',
    authHandler(T_User_Roles.USER, T_User_Roles.ADMIN),
    BookingControllers.deleteBooking
)


// get All Bookings
router.get(
    '/',
    authHandler(T_User_Roles.ADMIN),
    BookingControllers.getAllBookings
)


// get Specific Users Bookings
router.get(
    '/my-bookings',
    authHandler(T_User_Roles.USER, T_User_Roles.ADMIN),
    BookingControllers.getSpecificUsersBookings
);


export const BookingRoutes = router;