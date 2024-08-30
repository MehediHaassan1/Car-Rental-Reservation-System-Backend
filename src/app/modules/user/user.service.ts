import { JwtPayload } from "jsonwebtoken"
import User from "./user.model"
import AppError from "../../errors/AppError"
import httpStatus from "http-status"
import { TUser } from "./user.interface";

const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};

const getSingleUserFromDB = async (id: string) => {
  // check the user is exists or not
  const user = await User.findById(id)
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found')
  }

  // check the user is deleted or blocked
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found')
  }
  return user
}

const deleteUserFromDB = async (id: string) => {
  // check the user is exists or not
  const user = await User.findById(id)
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found')
  }

  // check the user is deleted or blocked
  let result;
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    result = await User.findByIdAndUpdate(id, { isDeleted: false }, { new: true })
  } else {
    result = await User.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
  }

  return result;
}

const makeAdminIntoDB = async (userData: JwtPayload, id: string) => {
  const superUser = await User.findOne({ email: userData.email });
  if (superUser?.role === 'admin') {

    // check the user is exists or not
    const user = await User.findById(id)
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found')
    }

    // check the user is deleted or blocked
    const isDeleted = user?.isDeleted;
    if (isDeleted) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found')
    }

    const result = await User.findByIdAndUpdate(id, { role: 'admin' }, { new: true })
    return result;
  } else {

  }
}


const getMeFromDB = async (userData: string) => {
  // check the user is exists or not
  const user = await User.findOne({ email: userData })
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

const updateUserIntoDB = async (userData: JwtPayload, payload: Partial<TUser>) => {

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
  getAllUsersFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
  makeAdminIntoDB,
  updateUserIntoDB,
  getMeFromDB,
}