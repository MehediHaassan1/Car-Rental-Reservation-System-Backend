import { JwtPayload } from "jsonwebtoken"
import { TBooking } from "./booking.interface"
import User from "../user/user.model"
import httpStatus from "http-status"
import AppError from "../../errors/AppError"
import mongoose, { Types } from "mongoose"
import Car from "../car/car.model"
import Booking from "./booking.model"

const bookACar = async (user: JwtPayload, payload: Record<string, unknown>) => {
    // check the user is exists or not
    // const userData = await User.isUserExists(user?.email)
    const userData = await User.findOne({ email: user?.email })

    if (!userData) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found!')
    }

    console.log(userData);
    // set the user id to payload.user
    payload.user = userData?._id;

    // check the car exists or not
    const car = await Car.isCarExists(payload.car as string)
    if (!car) {
        throw new AppError(httpStatus.NOT_FOUND, 'Car not found!')
    }

    // check the car status
    const carStatus = car.status;
    if (carStatus === 'unavailable') {
        throw new AppError(httpStatus.CONFLICT, 'This car already has a reservation!')
    }

    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        await Car.findByIdAndUpdate(
            payload.car,
            { status: 'unavailable' },
            { new: true, session }
        )
        // set the book to confirmed
        payload.isBooked = 'confirmed';

        // create bookings
        const bookingData = await Booking.create([payload], { session })
        const result = bookingData[0];

        await result.populate('user');
        await result.populate('car');

        await session.commitTransaction();
        await session.endSession();
        return result;
    } catch (err: any) {
        await session.abortTransaction()
        await session.endSession();

        throw new AppError(httpStatus.BAD_REQUEST, 'Bad request!')
    }
}


const getAllBookingsFromDB = async (query: Record<string, unknown>) => {
    const { carId, date, isBooked } = query;
    const filter: any = {};

    if (carId) {
        filter.car = carId;
    }
    if (date) {
        filter.date = date as string;
    }
    if (isBooked) {
        filter.isBooked = isBooked;
    }

    const result = await Booking.find(filter).populate('car').populate('user');
    return result;
}


const getSpecificUsersBookingsFromDB = async (user: JwtPayload) => {
    // check the user is exists or not
    // const userData = await User.isUserExists(user?.email)
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