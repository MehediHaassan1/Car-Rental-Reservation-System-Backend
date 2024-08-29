import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";


const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsersFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Users fetched successfully!",
    data: result
  });
})


const getSingleUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.getSingleUserFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User fetched successfully!",
    data: result
  });
})

const deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.deleteUserFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users deleted successfully!",
    data: result
  });
})


const makeAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.makeAdminIntoDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User role updated successfully!",
    data: result
  });
})



const getMe = catchAsync(async (req, res) => {
  const {email} = req.user;
  const result = await UserServices.getMeFromDB(email);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Profile data fetched successfully!",
    data: result
  });
})

const updateUser = catchAsync(async (req, res) => {
  const result = await UserServices.updateUserIntoDB(req.user, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User updated successfully!",
    data: result
  });
})


export const UserController = {
  getAllUsers,
  getSingleUser,
  deleteUser,
  makeAdmin,
  updateUser,
  getMe,
}