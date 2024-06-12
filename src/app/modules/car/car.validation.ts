import { z } from 'zod';
import { TCarStatus } from './car.constant';

export const createCarSchema = z.object({
    body: z.object({
        name: z.string().nonempty(),
        description: z.string().nonempty(),
        color: z.string().nonempty(),
        isElectric: z.boolean(),
        features: z.array(z.string()).nonempty(),
        pricePerHour: z.number().positive(),
        status: z.enum(TCarStatus as [string, ...string[]]).default('available'),
        isDeleted: z.boolean().default(false),
    })
});

export const validateCar = {
    createCarSchema,
}
