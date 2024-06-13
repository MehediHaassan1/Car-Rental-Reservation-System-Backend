import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingServices } from "./booking.service";

const bookACar = catchAsync(async (req, res) => {
    const user = req.user;
    const data = req.body;
    const result = await BookingServices.bookACar(user, data);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Car booked successfully!",
        data: result
    })
})


const getAllBookings = catchAsync(async (req, res) => {
    const query = req.query;
    const result = await BookingServices.getAllBookingsFromDB(query);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Bookings retrieved successfully!",
        data: result
    })
})


const getSpecificUsersBookings = catchAsync(async (req, res) => {
    const user = req.user;
    const result = await BookingServices.getSpecificUsersBookingsFromDB(user)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "My Bookings retrieved successfully!",
        data: result
    })
})


export const BookingControllers = {
    bookACar,
    getAllBookings,
    getSpecificUsersBookings
}