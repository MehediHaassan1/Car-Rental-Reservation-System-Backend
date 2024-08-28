import { z } from 'zod';

const createCarSchema = z.object({
    body: z.object({
        name: z.string().nonempty("Name is required"),
        description: z.string().nonempty("Description is required"),
        color: z.string().nonempty("Color is required"),
        isElectric: z.boolean(),
        features: z.array(z.string()).default([]),
        pricePerDay: z.number().positive("Price per day must be a positive number"),
        carImage: z.string().url("Car image must be a valid URL"),
        isBooked: z.boolean(),
        location: z.string().nonempty("Location is required"),
        engine: z.string().nonempty("Engine is required"),
        horsepower: z.string().nonempty("Horsepower is required"),
        torque: z.string().nonempty("Torque is required"),
        transmission: z.string().nonempty("Transmission is required"),
        drivetrain: z.string().nonempty("Drivetrain is required"),
        range: z.string().nonempty("Range is required"),
        topSpeed: z.string().nonempty("Top speed is required"),
        acceleration: z.string().nonempty("Acceleration is required"),
        seatingCapacity: z.number().positive("Seating capacity must be a positive number"),
        cargoCapacity: z.string().nonempty("Cargo capacity is required"),
        fuelEconomy: z.string().nonempty("Fuel economy is required"),
        seats: z.number().positive("Seats must be a positive number"),
        ac: z.boolean(),
        luggage: z.number().positive("Luggage capacity must be a positive number"),
        atxOrMtx: z.string().nonempty("Transmission type (ATX or MTX) is required"),
        doorCount: z.number().positive("Door count must be a positive number"),
        carType: z.string().nonempty("Car type is required"),
    })
});

const updateCarSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        description: z.string().optional(),
        color: z.string().optional(),
        isElectric: z.boolean().optional(),
        features: z.array(z.string()).optional(),
        pricePerDay: z.number().optional(),
        carImage: z.string().optional(),
        isBooked: z.boolean().optional(),
        location: z.string().optional(),
        engine: z.string().optional(),
        horsepower: z.string().optional(),
        torque: z.string().optional(),
        transmission: z.string().optional(),
        drivetrain: z.string().optional(),
        range: z.string().optional(),
        topSpeed: z.string().optional(),
        acceleration: z.string().optional(),
        seatingCapacity: z.number().optional(),
        cargoCapacity: z.string().optional(),
        fuelEconomy: z.string().optional(),
        seats: z.number().optional(),
        ac: z.boolean().optional(),
        luggage: z.number().optional(),
        atxOrMtx: z.string().optional(),
        doorCount: z.number().optional(),
        carType: z.string().optional(),
    })
});



export const validateCar = {
    createCarSchema,
    updateCarSchema,
}
