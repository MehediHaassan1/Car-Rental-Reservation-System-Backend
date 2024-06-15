import { z } from 'zod';
import { dateSchema, objectIdSchema, timeSchema } from './booking.constant';

export const createBookingSchema = z.object({
    body: z.object({
        date: dateSchema.transform((str) => new Date(str)),
        carId: objectIdSchema,
        startTime: timeSchema,
        endTime: z.union([timeSchema, z.null()]).default(null),
        totalCost: z.number().min(0).default(0),
    })
});


export const validateBooking = {
    createBookingSchema
}