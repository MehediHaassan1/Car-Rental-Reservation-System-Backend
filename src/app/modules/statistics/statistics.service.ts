import Booking from "../booking/booking.model";
import Car from "../car/car.model";
import User from "../user/user.model";

const getAdminStatisticsFromDB = async () => {
  const user = await User.countDocuments()
  const booking = await Booking.countDocuments();
  const cars = await Car.countDocuments();

  return {user, booking, cars};

}


const getUserStatisticsFromDB = async () => {

}

export const StatisticsService = {
  getAdminStatisticsFromDB,
  getUserStatisticsFromDB,
}