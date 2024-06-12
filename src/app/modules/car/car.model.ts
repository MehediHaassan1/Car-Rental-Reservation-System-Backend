import { Schema, model } from "mongoose";
import { TCar } from "./car.interface";
import { TCarStatus } from "./car.constant";

const carSchema = new Schema<TCar>({
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




const Car = model<TCar>('Car', carSchema);

export default Car;