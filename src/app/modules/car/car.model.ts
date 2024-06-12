import { Schema, model } from "mongoose";
import { CarModel, TCar } from "./car.interface";
import { TCarStatus } from "./car.constant";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const carSchema = new Schema<TCar, CarModel>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    color: { type: String, required: true },
    isElectric: { type: Boolean, required: true },
    features: { type: [String], required: true },
    pricePerHour: { type: Number, required: true },
    status: {
        type: String,
        required: true,
        enum: TCarStatus,
        default: 'available'
    },
    isDeleted: { type: Boolean, required: true, default: false }
}, {
    timestamps: true
});

// find all cars those are not deleted
carSchema.pre('find', async function (next) {
    this.find({ isDeleted: { $ne: true } })
    next();
})

// find single car that is not deleted
carSchema.pre('findOne', async function (next) {
    this.findOne({ isDeleted: { $ne: true } })
    next();
})

// find the car exists or not
carSchema.statics.isCarExists = async function (id: string) {
    const car = await Car.findById(id);
    return car;
}


const Car = model<TCar, CarModel>('Car', carSchema);

export default Car;