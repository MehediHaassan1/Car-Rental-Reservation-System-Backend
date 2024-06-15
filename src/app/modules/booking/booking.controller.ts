import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingServices } from "./booking.service";

// book a car
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

// get all bookings
const getAllBookings = catchAsync(async (req, res) => {
    const query = req.query;
    const result = await BookingServices.getAllBookingsFromDB(query);
    result.length < 1
        ? sendResponse(res, {
            success: false,
            statusCode: httpStatus.NOT_FOUND,
            message: "No Data Found!",
            data: result
        })
        : sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Bookings retrieved successfully!",
            data: result
        })
})


// get Users Specific Bookings
const getSpecificUsersBookings = catchAsync(async (req, res) => {
    const user = req.user;
    const result = await BookingServices.getSpecificUsersBookingsFromDB(user)
    result.length < 1
        ? sendResponse(res, {
            success: false,
            statusCode: httpStatus.NOT_FOUND,
            message: "No Data Found!",
            data: result
        })
        : sendResponse(res, {
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