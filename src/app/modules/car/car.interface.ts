import { Model, Types } from "mongoose";

export interface TCar {
    name: string;
    description: string;
    color: string;
    isElectric: boolean;
    features: string[];
    pricePerHour: number;
    status: 'available' | 'unavailable';
    isDeleted: boolean;
}


export interface CarModel extends Model<TCar> {
    isCarExists(id: Types.ObjectId): TCar
}