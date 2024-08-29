import { JwtPayload } from "jsonwebtoken"
import User from "./user.model"
import AppError from "../../errors/AppError"
import httpStatus from "http-status"


const getSingleUserFromDB = async (userData: JwtPayload) => {
  // check the user is exists or not
  const user = await User.findOne({ email: userData?.email })
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found')
  }

  // check the user is deleted or blocked
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found')
  }

  return user;

}

const updateUserIntoDB = async (userData: JwtPayload, payload: Record<string, unknown>) => {

  console.log({ userData, payload })
  // check the user is exists or not
  const user = await User.findOne({ email: userData?.email })
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found')
  }

  // check the user is deleted or blocked
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found')
  }

  // update user data
  const updatedUser = await User.findByIdAndUpdate(user?._id, payload, { new: true });

  if (!updatedUser) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Bad Request');
  }

  return updatedUser
}


export const UserServices = {
  updateUserIntoDB,
  getSingleUserFromDB,
}