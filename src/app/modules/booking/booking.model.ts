import { Schema, model } from 'mongoose';
import { TBooking } from './booking.interface';
import moment from "moment";

const bookingSchema = new Schema<TBooking>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    car: { type: Schema.Types.ObjectId, ref: 'Car', required: true },
    pickUpDate: { type: String },
    pickUpTime: { type: String },
    dropOffDate: { type: String, default: "" },
    dropOffTime: { type: String, default: "" },
    totalCost: { type: Number, default: 0 },
    status: {
        type: String, enum: ['pending', 'ongoing', 'complete'], default: 'pending'
    },
    identity: { type: String, required: true },
    identityNo: { type: String, required: true },
    drivingLicenseNo: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    returned: { type: Boolean, default: false },
    paid: { type: Boolean, default: false },
}, {
    timestamps: true,
});

// Query Middleware
bookingSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

bookingSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

const Booking = model<TBooking>('Booking', bookingSchema);

export default Booking;
