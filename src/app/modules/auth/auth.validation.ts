import { z } from "zod";

const signInValidationSchema = z.object({
    body: z.object({
        email: z.string().nonempty("Email is required").email("Invalid email format"),
        password: z.string().nonempty("Password is required"),
    })
})


export const validateAuth = {
    signInValidationSchema
}