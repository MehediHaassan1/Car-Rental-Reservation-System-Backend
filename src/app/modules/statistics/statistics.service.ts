import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import Booking from "../booking/booking.model";
import Car from "../car/car.model";
import User from "../user/user.model";

const getAdminStatisticsFromDB = async () => {
  const user = await User.countDocuments()
  const booking = await Booking.countDocuments();
  const cars = await Car.countDocuments();

  return { user, booking, cars };

}


const getUserStatisticsFromDB = async (email:string) => {
  const user = await User.findOne({ email });
    if (!user) throw new AppError(httpStatus.NOT_FOUND, 'User Not found!');

    const totalBookingsCount = await Booking.countDocuments({ user: user._id });
    
    const totalPaymentCount = await Booking.aggregate([
        { $match: { user: user._id, paid: true } },
        { $group: { _id: null, totalAmount: { $sum: "$totalCost" } } }
    ]);

    const totalPayableAmount = totalPaymentCount.length > 0 ? totalPaymentCount[0].totalAmount : 0;

    const latestBookings = await Booking.find({ user: user._id })
        .sort({ createdAt: -1 })
        .limit(3)
        .populate('car');

    return {
        totalBookingsCount,
        totalPayableAmount,
        latestBookings,
    };
}

export const StatisticsService = {
  getAdminStatisticsFromDB,
  getUserStatisticsFromDB,
}