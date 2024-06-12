export type TCar = {
    name: string;
    description: string;
    color: string;
    isElectric: boolean;
    features: string[];
    pricePerHour: number;
    status: 'available' | 'booked';
    isDeleted: boolean;
}
