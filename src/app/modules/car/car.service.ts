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
        query.pricePerDay = { $lte: price };
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
const deleteCarFromDB = async (id: string) => {

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

    // 
    return null;

}

interface TSearchCriteria {
    carType?: string;
    seats?: number;
    features?: string; // Now only one feature can be selected
}

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