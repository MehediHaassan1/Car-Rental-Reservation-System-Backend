import { Model } from "mongoose";

export type TCar = {
    name: string;
    description: string;
    color: string;
    isElectric: boolean;
    features: string[];
    pricePerDay: number;
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
}


export interface TSearchCriteria {
    location: string;
    pickUpDate: string;
    pickUpTime: string;
    dropOffDate: string;
    dropOffTime: string;
}


export interface CarModel extends Model<TCar> {
    isCarExists(id: string): Promise<TCar>
}