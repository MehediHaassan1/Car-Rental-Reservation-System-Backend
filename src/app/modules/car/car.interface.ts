import { Model } from "mongoose";

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