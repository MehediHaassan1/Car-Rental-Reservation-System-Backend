import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TCar } from "./car.interface";
import Car from "./car.model";

const createCarIntoDB = async (payload: TCar) => {
    const result = await Car.create(payload);
    return result;
}

const getAllCarsFromDB = async () => {
    const result = await Car.find();
    return result;
}


const getSingleCarFromDB = async (id: string) => {
    const result = await Car.findById(id);
    return result;
}


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

const deleteCarFromDB = async (id: string) => {

    // check the car exists or not
    const car = await Car.isCarExists(id)
    if (!car) {
        throw new AppError(httpStatus.NOT_FOUND, 'Car not found!')
    }

    // update car data
    const result = await Car.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true }
    )
    return result;

}

export const CarServices = {
    createCarIntoDB,
    getAllCarsFromDB,
    getSingleCarFromDB,
    updateCarIntoDB,
    deleteCarFromDB
}