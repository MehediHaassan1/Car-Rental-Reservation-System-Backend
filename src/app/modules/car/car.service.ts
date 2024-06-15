import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TCar } from "./car.interface";
import Car from "./car.model";
import { JwtPayload } from "jsonwebtoken";
import User from "../user/user.model";
import Booking from "../booking/booking.model";
import { calculateTotalCost, isEndTimeBigger } from "./car.utils";
import mongoose from "mongoose";

// create car
const createCarIntoDB = async (payload: TCar) => {
    const result = await Car.create(payload);
    return result;
}

// get all cars
const getAllCarsFromDB = async () => {
    const result = await Car.find();
    return result;
}

// get single car
const getSingleCarFromDB = async (id: string) => {
    const result = await Car.findById(id);
    return result;
}


// update car data
const updateCarIntoDB = async (id: string, payload: Partial<TCar>) => {

    // check the car exists or not
    const car = await Car.isCarExists(id)
    if (!car) {
        throw new AppError(httpStatus.NOT_FOUND, 'Car not found!')
    }

    // update car data
    const result = await Car.findByIdAndUpdate(
        id,
        payload,
        { new: true }
    )
    return result;
}

// delete car
const deleteCarFromDB = async (id: string) => {

    // check the car exists or not
    const car = await Car.isCarExists(id)
    if (!car) {
        throw new AppError(httpStatus.NOT_FOUND, 'Car not found!')
    }

    // check the car status is available or not
    if (car?.status === 'unavailable') {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            'Car is currently reserved and cannot be deleted!'
        )
    }
    // update car data
    const result = await Car.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true }
    )
    return result;

}

// return car
const returnABookedCar = async (
    user: JwtPayload,
    data: { bookingId: string, endTime: string }
) => {
    
    // check the user exists or not
    const userData = await User.isUserExists(user?.email);
    if (!userData) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found!')
    }

    // check the booking is exists or not
    const bookingData = await Booking.findById(data.bookingId);
    if (!bookingData) {
        throw new AppError(httpStatus.NOT_FOUND, 'Booking not found!')
    }

    // get the car data and price per hour
    const carData = await Car.findById(bookingData?.car);
    if (!carData) {
        throw new AppError(httpStatus.NOT_FOUND, 'Car not found!')
    }

    const pricePerHour = carData?.pricePerHour

    // check the booking data end time is null or not
    const bookingDataEndTime = bookingData?.endTime;
    if (bookingDataEndTime !== null) {
        throw new AppError(httpStatus.BAD_REQUEST, 'This booking is already completed!')
    }

    // check the booking data start time is bigger than the booking data end time
    const bookingDataStartTime = bookingData?.startTime;

    if (!isEndTimeBigger(bookingDataStartTime, data.endTime)) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Invalid end time!')
    }

    // get the total cost
    const totalCost = calculateTotalCost(bookingDataStartTime, data.endTime, pricePerHour)

    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        // update car status
        const updatedCarData = await Car.findByIdAndUpdate(
            bookingData?.car,
            { status: 'available' },
            { new: true, session }
        );
        if (!updatedCarData) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update data!')
        }

        // find booking data and update
        const updatedBookingData = await Booking.findByIdAndUpdate(
            data.bookingId,
            {
                endTime: data.endTime,
                totalCost: totalCost
            },
            { new: true, session }
        )
            .populate('car')
            .populate('user');

        if (!updatedBookingData) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update data!')
        }

        await session.commitTransaction();
        await session.endSession();

        return updatedBookingData;

    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(httpStatus.BAD_REQUEST, 'Bad request!')
    }

}

export const CarServices = {
    createCarIntoDB,
    getAllCarsFromDB,
    getSingleCarFromDB,
    updateCarIntoDB,
    deleteCarFromDB,
    returnABookedCar
}