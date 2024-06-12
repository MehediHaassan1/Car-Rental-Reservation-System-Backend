import { Schema, model, Types } from 'mongoose';
import { TBooking } from './booking.interface';
import { isBookedStatus } from './booking.constant';

const bookingSchema = new Schema<TBooking>({
    date: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', },
    car: { type: Schema.Types.ObjectId, ref: 'Car', required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, default: null },
    totalCost: { type: Number, default: 0 },
    isBooked: { type: String, enum: isBookedStatus as [string, ...string[]], default: 'unconfirmed' }
}, {
    timestamps: true
});

const Booking = model<TBooking>('Booking', bookingSchema);

export default Booking;
