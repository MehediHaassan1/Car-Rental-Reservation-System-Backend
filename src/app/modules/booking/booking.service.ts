import { JwtPayload } from "jsonwebtoken"
import User from "../user/user.model"
import httpStatus from "http-status"
import AppError from "../../errors/AppError"
import mongoose from "mongoose"
import Car from "../car/car.model"
import Booking from "./booking.model"

// book a car
const bookACar = async (user: JwtPayload, payload: Record<string, unknown>) => {

    // check the user is exists or not
    const userData = await User.findOne({ email: user?.email })

    if (!userData) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found!')
    }

    // set the user id to payload.user
    payload.user = userData?._id;
    payload.car = payload.carId;

    // check the car exists or not
    const car = await Car.findById(payload?.car)
    if (!car) {
        throw new AppError(httpStatus.NOT_FOUND, 'Car not found!')
    }

    // check the car status
    const carStatus = car.status;
    if (carStatus === 'unavailable') {
        throw new AppError(httpStatus.CONFLICT, 'This car already has a reservation!')
    }

    // add transaction rollback
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        // update the car status
        await Car.findByIdAndUpdate(
            payload.car,
            { status: 'unavailable' },
            { new: true, session }
        )

        // create bookings
        const bookingData = await Booking.create([payload], { new: true, session })
        const result = bookingData[0];

        await (await result.populate('user')).populate('car');

        await session.commitTransaction();
        await session.endSession();

        return result;
    } catch (err: any) {
        await session.abortTransaction()
        await session.endSession();
        throw new AppError(httpStatus.BAD_REQUEST, 'Bad request!')
    }
}


// get all bookings
const getAllBookingsFromDB = async (query: Record<string, unknown>) => {
    const { carId, date } = query;
    const filter: any = {};

    if (carId) {
        filter.car = carId;
    }
    if (date) {
        filter.date = date as string;
    }

    const result = await Booking.find(filter).populate('car').populate('user');
    return result;
}


// get single booking
const getSpecificUsersBookingsFromDB = async (user: JwtPayload) => {
    // check the user is exists or not
    const userData = await User.findOne({ email: user?.email })
    if (!userData) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found!')
    }

    // get all bookings from the Bookings
    const result = await Booking.find({ user: userData?._id })
        .populate('car')
        .populate('user');

    return result;
}

export const BookingServices = {
    bookACar,
    getAllBookingsFromDB,
    getSpecificUsersBookingsFromDB
}