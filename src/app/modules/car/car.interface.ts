import { Model } from "mongoose";

export type TCar = {
    name: string;
    description: string;
    color: string;
    isElectric: boolean;
    features: string[];
    pricePerHour: number;
    carImage: string;
    isBooked: boolean;
    location: string;
    engine: string;
    horsepower: string;
    torque: string;
    transmission: string;
    drivetrain: string;
    range: string;
    topSpeed: string;
    acceleration: string;
    seatingCapacity: number;
    cargoCapacity: string;
    fuelEconomy: string;
    seats: number;
    ac: boolean;
    luggage: number;
    atxOrMtx: string;
    doorCount: number;
    carType: string;
    isDeleted: boolean;
}


export interface TSearchCriteria {
    carType?: string;
    seats?: number;
    features?: string; // Now only one feature can be selected
}


export interface CarModel extends Model<TCar> {
    isCarExists(id: string): Promise<TCar>
}