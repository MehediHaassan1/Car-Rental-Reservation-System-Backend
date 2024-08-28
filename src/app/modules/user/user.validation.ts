import { z } from 'zod';
import { TUserRole } from './user.constant';

const createUserValidationSchema = z.object({
    body: z.object({
        name: z.string().nonempty("Name is required").trim(),
        email: z.string().nonempty("Email is required").email("Invalid email format").trim().toLowerCase(),
        password: z.string().nonempty("Password is required"),
        phone: z.string().nonempty("Phone number is required"),
    })
});


export const validateUser = {
    createUserValidationSchema
}