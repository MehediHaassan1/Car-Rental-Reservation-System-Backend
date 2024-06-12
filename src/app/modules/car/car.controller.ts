import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CarServices } from "./car.service";


const createCar = catchAsync(async (req, res) => {
    const result = await CarServices.createCarIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Car created successfully!",
        data: result
    })
})


const getAllCars = catchAsync(async (req, res) => {
    const result = await CarServices.getAllCarsFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Cars retrieved successfully!",
        data: result
    })
})


const getSingleCar = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CarServices.getSingleCarFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "A Car retrieved successfully!",
        data: result
    });
});


export const CarControllers = {
    createCar,
    getAllCars,
    getSingleCar
}