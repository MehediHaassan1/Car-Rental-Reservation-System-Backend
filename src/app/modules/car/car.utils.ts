import moment from 'moment';

export const calculateTotalCost = (
    pickUpDate: string,
    pickUpTime: string,
    pricePerHour: number = 55
) => {
    const pickUpDateTime = moment(`${pickUpDate} ${pickUpTime}`, "DD-MM-YYYY HH:mm");
    const dropOffDateTime = moment();

    const duration = moment.duration(dropOffDateTime.diff(pickUpDateTime));
    const hours = duration.hours();
    const minutes = duration.minutes();

    let totalCost = 0;

    // Calculate cost based on minutes of the first hour
    if (minutes > 0 && minutes <= 30) {
        totalCost += pricePerHour / 2;
    } else if (minutes > 30 && minutes <= 60) {
        totalCost += pricePerHour;
    }

    // Add full cost for the remaining hours
    totalCost += hours * pricePerHour;

    const dropOffDate = dropOffDateTime.format("DD-MM-YYYY");
    const dropOffTime = dropOffDateTime.format("HH:mm");

    return {
        totalCost,
        dropOffDate,
        dropOffTime,
    };
};