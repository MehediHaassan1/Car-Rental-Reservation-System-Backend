import { Schema, model } from 'mongoose';
import { TBooking } from './booking.interface';

// Define the Mongoose schema for the Booking
const bookingSchema = new Schema<TBooking>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    car: { type: Schema.Types.ObjectId, ref: 'Car', required: true },
    location: { type: String, required: true },
    pickUpDate: { type: String, required: true },
    pickUpTime: { type: String, required: true },
    dropOffDate: { type: String, required: true },
    dropOffTime: { type: String, required: true },
    totalCost: { type: Number, default: 0 },
    isCanceled: { type: Boolean, default: false },
    status: {
        type: String, enum: ['pending', 'ongoing', 'complete'], default: 'pending'
    },
    identity: { type: String, required: true },
    identityNo: { type: String, required: true },
    drivingLicenseNo: { type: String, required: true }
}, {
    timestamps: true
});

const Booking = model<TBooking>('Booking', bookingSchema);

export default Booking;
