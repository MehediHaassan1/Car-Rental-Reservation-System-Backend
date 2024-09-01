import { JwtPayload } from "jsonwebtoken"
import User from "../user/user.model"
import httpStatus from "http-status"
import AppError from "../../errors/AppError"
import mongoose from "mongoose"
import Car from "../car/car.model"
import Booking from "./booking.model"
import { initializePayment } from "../payment/payment.utils"
import moment from "moment";

// book a car
const bookACar = async (user: JwtPayload, payload: Record<string, unknown>) => {
    const userData = await User.findOne({ email: user?.email });

    if (!userData) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
    }

    payload.user = userData?._id;

    const now = moment();
    const minutes = now.minutes();

    let pickUpTime: moment.Moment;

    if (minutes <= 30) {
        pickUpTime = now.minutes(30).seconds(0);
    } else {
        pickUpTime = now.add(1, 'hours').minutes(0).seconds(0);
    }

    if (pickUpTime.hour() === 0 && pickUpTime.minutes() === 0) {
        payload.pickUpDate = now.add(1, 'days').format("DD-MM-YYYY");
    } else {
        payload.pickUpDate = now.format("DD-MM-YYYY");
    }

    payload.pickUpTime = pickUpTime.format("HH:mm");

    const car = await Car.findById(payload?.car);
    if (!car) {
        throw new AppError(httpStatus.NOT_FOUND, 'Car not found!');
    }

    if (car?.isBooked === true) {
        throw new AppError(httpStatus.CONFLICT, 'This car already has a reservation!');
    }

    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        await Car.findByIdAndUpdate(
            payload?.car,
            { isBooked: true },
            { new: true, session }
        );

        const bookingData = await Booking.create([payload], { session });
        const result = bookingData[0];

        await (await result.populate('user')).populate('car');

        await session.commitTransaction();
        session.endSession();

        return result;
    } catch (err: any) {
        await session.abortTransaction();
        session.endSession();
        throw new AppError(httpStatus.BAD_REQUEST, 'Bad request!');
    }
};

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

        let isCarBooked;
        if (userData?.role === 'user') {
            // Check if the booking exists and is associated with the user
            isCarBooked = await Booking.findOne({ user: userData?._id, _id: id });
            if (!isCarBooked) {
                throw new AppError(httpStatus.BAD_REQUEST, 'Bad request');
            }
        } else {
            isCarBooked = await Booking.findOne({ _id: id });
            if (!isCarBooked) {
                throw new AppError(httpStatus.BAD_REQUEST, 'Bad request');
            }
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

// updateBookingStatusIntoDB
const updateBookingStatusIntoDB = async (user: JwtPayload, id: string) => {
    // check the user is exists or not
    const userData = await User.findOne({ email: user?.email })
    if (!userData) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found!')
    }

    //  check the booking using booking id and user id
    const isCarBooked = await Booking.findOne({ _id: id })
    if (!isCarBooked) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Bad request')
    }

    const updateBookingStatus = await Booking.findOneAndUpdate(
        { _id: isCarBooked._id },
        { status: 'ongoing' },
        { new: true }
    )

    return updateBookingStatus;
}

const updateBookingCompleteIntoDB = async (user: JwtPayload, id: string) => {

    // check the user is exists or not
    const userData = await User.findOne({ email: user?.email })
    if (!userData) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found!')
    }

    //  check the booking using booking id and user id
    const booking = await Booking.findOne({ _id: id })
    if (!booking) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Bad request')
    }

    // find the car
    const car = await Car.findById(booking.car)
    if (!car) {
        throw new AppError(httpStatus.NOT_FOUND, 'Car not found!')
    }

    const userPaymentInfo = {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        address: userData.address,
        trxID: `TrxID${Math.floor(Math.random() * 10000)}${userData.name.slice(0, 3)}`,
        totalCost:booking.totalCost,
        bookingId: booking?._id,
    }


    const paymentResponse = await initializePayment(userPaymentInfo);

    return paymentResponse;

}

export const BookingServices = {
    bookACar,
    updateBookingIntoDB,
    deleteBookingIntoDB,
    getAllBookingsFromDB,
    getSpecificUsersBookingsFromDB,
    updateBookingStatusIntoDB,
    updateBookingCompleteIntoDB,
}