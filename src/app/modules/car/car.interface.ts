import { Model } from "mongoose";

export interface TCar  {
    name: string;
    description: string;
    color: string;
    isElectric: boolean;
    features: string[];
    pricePerHour: number;
    status: 'available' | 'booked';
    isDeleted: boolean;
}


export interface CarModel extends Model<TCar> {
    isCarExists(id: string): TCar
}