import { Types } from 'mongoose';

export interface TBooking {
    user: Types.ObjectId;
    car: Types.ObjectId;
    pickUpDate: string;
    pickUpTime: string;
    dropOffDate: string;
    dropOffTime: string;
    totalCost: number;
    status: 'pending' | 'ongoing' | 'complete';
    identity: string;
    identityNo: string;
    drivingLicenseNo: string;
    isDeleted: boolean;
    returned: boolean;
    paid: boolean;
}


export type TUserPaymentInfo = {
    name: string;
    email: string;
    phone: string;
    address: string;
    totalCost: number;
    trxID: string;
    bookingId: Types.ObjectId;
}