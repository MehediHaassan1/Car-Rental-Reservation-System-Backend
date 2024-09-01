import { z } from 'zod';

const now = new Date();
const minutes = now.getMinutes();
const defaultPickUpTime = minutes <= 30
    ? new Date(now.setMinutes(30, 0, 0))
    : new Date(now.setHours(now.getHours() + 1, 0, 0, 0));

const createBookingValidation = z.object({
    body: z.object({
        user: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid User ID format"),
        car: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Car ID format"),
        pickUpDate: z.string().optional(),
        pickUpTime: z.string().optional(),
        dropOffDate: z.string().optional(),
        dropOffTime: z.string().optional(),
        totalCost: z.number().min(0).default(0),
        status: z.enum(['pending', 'ongoing', 'complete']).default('pending'),
        identity: z.string().nonempty("Identity is required"),
        identityNo: z.string().nonempty("Identity Number is required"),
        drivingLicenseNo: z.string().nonempty("Driving License Number is required"),
        isDeleted: z.boolean().default(false),
        returned: z.boolean().default(false),
        paid: z.boolean().default(false),
    })
});



export const validateBooking = {
    createBookingValidation
}