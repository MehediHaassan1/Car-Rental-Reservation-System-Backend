import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TCar, TSearchCriteria } from "./car.interface";
import Car from "./car.model";
import { JwtPayload } from "jsonwebtoken";
import User from "../user/user.model";
import Booking from "../booking/booking.model";
import mongoose from "mongoose";
import { calculateTotalCost } from "./car.utils";

// create car
const createCarIntoDB = async (payload: TCar) => {
    const result = await Car.create(payload);
    return result;
}

// get all cars
const getAllCarsFromDB = async (name: string, carType: string, price: number, location: string) => {
    let query: any = {}

    if (name) {
        const searchRegex = new RegExp(name, "i");
        query = {
            $or: [
                { name: searchRegex },
            ]
        };
    }
    if (carType) {
        const searchRegex = new RegExp(carType, "i");
        query = {
            $or: [
                { carType: searchRegex },
            ]
        };
    }
    if (location) {
        const searchRegex = new RegExp(location, "i");
        query = {
            $or: [
                { location: searchRegex },
            ]
        };
    }
    if (price > 100) {
        query.pricePerHour = { $lte: price };
    }

    const result = await Car.find(query);
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
const deleteCarFromDB = async (id: string, isDeleted: boolean) => {
    console.log(id, isDeleted);

    // check the car exists or not
    const car = await Car.isCarExists(id)
    if (!car) {
        throw new AppError(httpStatus.NOT_FOUND, 'Car not found!')
    }

    // check the car status is available or not
    if (car?.isBooked === true) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            'Car is currently reserved and cannot be deleted!'
        )
    }

    const newIsDeleted = !isDeleted;
    console.log(newIsDeleted)
    // update car data
    const result = await Car.findByIdAndUpdate(
        id,
        { isDeleted: newIsDeleted },
        { new: true }
    )
    console.log(result)
    return result;

}

// return car
const returnABookedCar = async (userData: JwtPayload, id: string) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const user = await User.findOne({ email: userData.email }).session(session);
        if (!user) {
            throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
        }

        if (user.role !== 'admin') {
            throw new AppError(httpStatus.FORBIDDEN, 'Unauthorized access!');
        }

        const booking = await Booking.findById(id).session(session);
        if (!booking) {
            throw new AppError(httpStatus.NOT_FOUND, 'Booking not found!');
        }

        const car = await Car.findById(booking.car).session(session);
        if (!car) {
            throw new AppError(httpStatus.NOT_FOUND, 'Car not found!');
        }

        const { pickUpDate, pickUpTime } = booking;
        const hourlyRate = car.pricePerHour;

        const {
            totalCost,
            dropOffDate,
            dropOffTime,
        } = calculateTotalCost(pickUpDate, pickUpTime, hourlyRate);

        // Update booking with the total cost, drop-off date, drop-off time, and status
        booking.totalCost = totalCost;
        booking.dropOffDate = dropOffDate;
        booking.dropOffTime = dropOffTime;
        booking.status = 'complete';
        booking.returned = true;
        await booking.save({ session });

        // Update car's isBooked status
        car.isBooked = false;
        await car.save({ session });

        // Re-query the booking with populated fields
        const populatedBooking = await Booking.findById(id)
            .populate('car')
            .populate('user')
            .session(session);

        await session.commitTransaction();
        session.endSession();

        return populatedBooking;
    } catch (err: any) {
        await session.abortTransaction();
        session.endSession();
        console.error(err);
        throw new AppError(httpStatus.BAD_REQUEST, 'Bad request!');
    }
};


const searchCarsFromDB = async ({ carType, seats, features }: TSearchCriteria) => {

    const query: any = { isBooked: false };

    if (carType) {
        query.carType = carType;
    }

    if (seats) {
        query.seats = seats;
    }

    if (features) {
        query.features = { $in: [features] };
    }

    const cars = await Car.find(query);
    return cars;
};

export const CarServices = {
    createCarIntoDB,
    getAllCarsFromDB,
    getSingleCarFromDB,
    updateCarIntoDB,
    deleteCarFromDB,
    returnABookedCar,
    searchCarsFromDB,
}