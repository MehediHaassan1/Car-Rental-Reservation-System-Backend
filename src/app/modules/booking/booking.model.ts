import { Schema, model } from 'mongoose';
import { TBooking } from './booking.interface';

const bookingSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    car: { type: Schema.Types.ObjectId, ref: 'Car', required: true },
    location: { type: String, required: true },
    pickUpDate: { type: String, required: true },
    pickUpTime: { type: String, required: true },
    dropOffDate: { type: String, required: true },
    dropOffTime: { type: String, required: true },
    totalCost: { type: Number, required: true },
    isCanceled: { type: Boolean, default: false },
    status: { type: String, enum: ['pending', 'ongoing', 'complete'], default: 'pending' },
}, {
    timestamps: true,
});

const Booking = model<TBooking>('Booking', bookingSchema);

export default Booking;
