import { Types } from 'mongoose';

export interface TBooking {
    user: Types.ObjectId;
    car: Types.ObjectId;
    location: string;
    pickUpDate: string;
    pickUpTime: string;
    dropOffDate: string;
    dropOffTime: string;
    totalCost: number;
    isCanceled: boolean;
    status: 'pending' | 'ongoing' | 'complete';
}
