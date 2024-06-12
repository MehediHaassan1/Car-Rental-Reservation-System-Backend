import { z } from 'zod';
import { dateSchema, isBookedStatus, objectIdSchema, timeSchema } from './booking.constant';

export const createBookingSchema = z.object({
    body: z.object({
        date: dateSchema.transform((str) => new Date(str)),
        car: objectIdSchema,
        startTime: timeSchema,
        endTime: z.union([timeSchema, z.null()]).default(null),
        totalCost: z.number().min(0).default(0),
        isBooked: z.enum(isBookedStatus as [string, ...string[]]).default('unconfirmed')
    })
});


export const validateBooking = {
    createBookingSchema
}