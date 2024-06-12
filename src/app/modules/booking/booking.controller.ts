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
    // console.log(req.body);
})


export const BookingControllers = {
    bookACar
}