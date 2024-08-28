import { z } from 'zod';

const createCarSchema = z.object({
    body: z.object({
        name: z.string().nonempty(),
        description: z.string().nonempty(),
        color: z.string().nonempty(),
        isElectric: z.boolean(),
        features: z.array(z.string()).nonempty(),
        pricePerHour: z.number().positive(),
        isDeleted: z.boolean().default(false),
    })
});

const updateCarSchema = z.object({
    body: z.object({
        name: z.string().nonempty().optional(),
        description: z.string().nonempty().optional(),
        color: z.string().nonempty().optional(),
        isElectric: z.boolean().optional(),
        features: z.array(z.string()).nonempty().optional(),
        pricePerHour: z.number().positive().optional(),
        isDeleted: z.boolean().default(false).optional(),
    })
});



export const validateCar = {
    createCarSchema,
    updateCarSchema,
}
