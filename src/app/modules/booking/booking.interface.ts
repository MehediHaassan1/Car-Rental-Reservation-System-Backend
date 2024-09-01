import { Types } from 'mongoose';

export interface TBooking {
    user: Types.ObjectId;
    car: Types.ObjectId;
    location: string;
    pickUpDate: string;
    dropOffDate: string;
    totalCost: number;
    status: 'pending' | 'ongoing' | 'complete';
    identity: string;
    identityNo: string;
    drivingLicenseNo: string;
    isDeleted: boolean;
}


export type TUserPaymentInfo = {
    name: string;
    email: string;
    phone: string;
    address: string;
    totalCost: number;
    trxID: string;
    bookingId: Types.ObjectId;
    dropOffDate: string;
}