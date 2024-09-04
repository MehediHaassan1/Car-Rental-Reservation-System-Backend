import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CarServices } from "./car.service";
import { TSearchCriteria } from "./car.interface";

// create a car
const createCar = catchAsync(async (req, res) => {
    const result = await CarServices.createCarIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Car created successfully!",
        data: result
    })
})


// get all cars
const getAllCars = catchAsync(async (req, res) => {

    const { carType, price } = req.query;

    const result = await CarServices.getAllCarsFromDB( carType as string, parseInt(price as string));

    result.length < 1
        ? sendResponse(res, {
            statusCode: httpStatus.NOT_FOUND,
            success: false,
            message: "No Data Found!",
            data: result
        })
        : sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Cars retrieved successfully!",
            data: result
        })
})


// get single car
const getSingleCar = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CarServices.getSingleCarFromDB(id);
    result === null
        ? sendResponse(res, {
            statusCode: httpStatus.NOT_FOUND,
            success: false,
            message: "No Data Found!",
            data: {}
        })
        : sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "A Car retrieved successfully!",
            data: result
        });
});


// update a car
const updateCar = catchAsync(async (req, res) => {
    const { email } = req.user;
    const { id } = req.params;
    const data = req.body;
    const result = await CarServices.updateCarIntoDB(email, id, data);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Car updated successfully!",
        data: result
    });
})


// delete a car
const deleteCar = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { isDeleted } = req.body;
    const result = await CarServices.deleteCarFromDB(id, isDeleted);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Car deleted successfully!",
        data: result
    });
})


const returnABookedCar = catchAsync(async (req, res) => {
    const { id } = req.params;
    const user = req.user;
    const result = await CarServices.returnABookedCar(user, id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Car returned successfully!",
        data: result
    });
})


// search car
const searchCars = catchAsync(async (req, res) => {
    const { carType, features, seats }: TSearchCriteria = req.query;
    console.log(carType, features, seats);

    const result = await CarServices.searchCarsFromDB({ carType, features, seats });
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Cars searched successfully!",
        data: result
    });
});

export const CarControllers = {
    createCar,
    getAllCars,
    getSingleCar,
    updateCar,
    deleteCar,
    returnABookedCar,
    searchCars,
}