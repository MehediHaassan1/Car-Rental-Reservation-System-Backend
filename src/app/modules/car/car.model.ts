import { Schema, model } from "mongoose";
import { CarModel, TCar } from "./car.interface";

// todo need to update car model
const carSchema = new Schema<TCar>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    color: { type: String, required: true },
    isElectric: { type: Boolean, required: true },
    features: { type: [String], default: [] },
    pricePerDay: { type: Number, required: true },
    carImage: { type: String, required: true },
    isBooked: { type: Boolean, required: true },
    location: { type: String, required: true },
    engine: { type: String, required: true },
    horsepower: { type: String, required: true },
    torque: { type: String, required: true },
    transmission: { type: String, required: true },
    drivetrain: { type: String, required: true },
    range: { type: String, required: true },
    topSpeed: { type: String, required: true },
    acceleration: { type: String, required: true },
    seatingCapacity: { type: Number, required: true },
    cargoCapacity: { type: String, required: true },
    fuelEconomy: { type: String, required: true },
    seats: { type: Number, required: true },
    ac: { type: Boolean, required: true },
    luggage: { type: Number, required: true },
    atxOrMtx: { type: String, required: true },
    doorCount: { type: Number, required: true },
    carType: { type: String, required: true }
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