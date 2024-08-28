import { z } from 'zod';

// Define the Zod schema for the Booking with validation
const createBookingValidation = z.object({
    body: z.object({
        user: z.string(),
        car: z.string(),
        location: z.string().nonempty("Location is required"),
        pickUpDate: z.string(),
        pickUpTime: z.string(),
        dropOffDate: z.string(),
        dropOffTime: z.string(),
        isCanceled: z.boolean().default(false),
        identity: z.string().nonempty("Identity type is required"),
        identityNo: z.string().nonempty("Identity number is required"),
        drivingLicenseNo: z.string().nonempty("Driving license number is required"),
    })
})



export const validateBooking = {
    createBookingValidation
}