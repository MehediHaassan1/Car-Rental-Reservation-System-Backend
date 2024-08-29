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


    // check the car exists or not
    const car = await Car.findById(payload?.car)
    if (!car) {
        throw new AppError(httpStatus.NOT_FOUND, 'Car not found!')
    }
    console.log(car)
    // check the car status
    if (car?.isBooked === true) {
        throw new AppError(httpStatus.CONFLICT, 'This car already has a reservation!')
    }

    // add transaction rollback
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        // update the car status
        await Car.findByIdAndUpdate(
            payload?.car,
            { isBooked: true },
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
        console.log(err)
        await session.abortTransaction()
        await session.endSession();
        throw new AppError(httpStatus.BAD_REQUEST, 'Bad request!')
    }
}

//updateBooking
const updateBookingIntoDB = async (user: JwtPayload, payload: Record<string, unknown>, id: string) => {
    // check the user is exists or not
    const userData = await User.findOne({ email: user?.email })

    if (!userData) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found!')
    }

    //  check the booking using booking id and user id
    const isCarBooked = await Booking.findOne({ user: userData?._id, _id: id })
    if (!isCarBooked) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Bad request')
    }

    // if status is pending, user can update data
    if (isCarBooked.status === 'pending') {
        const updateBooking = await Booking.findOneAndUpdate({ _id: id }, payload, { new: true })
        if (!updateBooking) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Bad request')
        }
        return updateBooking;
    } else {
        throw new AppError(httpStatus.BAD_REQUEST, 'Bad request')
    }

}
const deleteBookingIntoDB = async (user: JwtPayload, id: string) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        // Check if the user exists
        const userData = await User.findOne({ email: user?.email });
        if (!userData) {
            throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
        }

        // Check if the booking exists and is associated with the user
        const isCarBooked = await Booking.findOne({ user: userData?._id, _id: id });
        if (!isCarBooked) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Bad request');
        }

        // Check if the booking is already marked as deleted
        if (isCarBooked?.isDeleted === true) {
            throw new AppError(httpStatus.NOT_FOUND, 'This booking is already deleted');
        }

        // Mark the booking as deleted
        const deleteUserBooking = await Booking.findOneAndUpdate(
            { _id: id },
            { isDeleted: true },
            { new: true, session }
        );

        if (!deleteUserBooking) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Bad request');
        }

        // Update the car's isBooked status to false
        await Car.findByIdAndUpdate(
            deleteUserBooking.car,
            { isBooked: false },
            { new: true, session }
        );

        await session.commitTransaction();
        await session.endSession();

        return deleteUserBooking;
    } catch (err: any) {
        console.log(err);
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(httpStatus.BAD_REQUEST, 'Bad request!');
    }
};



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
    updateBookingIntoDB,
    deleteBookingIntoDB,
    getAllBookingsFromDB,
    getSpecificUsersBookingsFromDB
}