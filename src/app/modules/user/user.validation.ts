import { z } from 'zod';
import { TUserRole } from './user.constant';

const createUserValidationSchema = z.object({
    body: z.object({
        name: z.string({ required_error: "Name is required" }),
        email: z.string({ required_error: "Email is required" }),
        phone: z.string({ required_error: "Phone is required" }),
        password: z.string({ required_error: "Password is required" }),
        image: z.string().optional(),
        address: z.string().optional(),
    })
})

const updateUserValidation = z.object({
    body: z.object({
        name: z.string().optional(),
        image: z.string().optional(),
        phone: z.string().optional(),
        address: z.string().optional(),
    })
});


export const validateUser = {
    createUserValidationSchema,
    updateUserValidation,
}