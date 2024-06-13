export const isEndTimeBigger = (startTime: string, endTime: string) => {
    const bookingStartTime = new Date(`2000-01-01T${startTime}`)
    const bookingEndTime = new Date(`2000-01-01T${endTime}`)
    return bookingEndTime > bookingStartTime;
}

const timeStringToHours = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    const minutesToHours = minutes / 60;
    return hours + minutesToHours;
};


export const calculateTotalCost = (
    startTime: string,
    endTime: string,
    pricePerHour: number
): number => {
    // get time
    const startHours = timeStringToHours(startTime);
    const endHours = timeStringToHours(endTime);

    // get time duration
    const timeDuration = endHours - startHours;

    // get the total cost
    const totalCost = timeDuration * pricePerHour;

    return totalCost;
};