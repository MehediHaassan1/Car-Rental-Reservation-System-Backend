import { Types } from "mongoose";
import { z } from "zod";

export const objectIdSchema = z.string({ required_error: 'Object ID is required!' }).refine(
    id => Types.ObjectId.isValid(id),
    { message: "Invalid ID" }
);

export const timeSchema = z.string({ required_error: 'Time is required!' }).regex(
    /^([01]\d|2[0-3]):?([0-5]\d)$/,
    { message: "Invalid time format" }
);


export const dateFormatSchema = z.string({ required_error: 'Date is required!' }).regex(
    /^(20\d{2})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
    { message: "Invalid date format, expected YYYY-MM-DD" }
);


export const dateSchema = dateFormatSchema.refine(dateStr => {
    const today = new Date();
    today.setHours(0, 0, 0, 0)
    const date = new Date(dateStr);
    return date >= today;
}, {
    message: "Date cannot be in the past"
}
)