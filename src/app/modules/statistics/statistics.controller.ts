import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { StatisticsService } from "./statistics.service";

const getAdminStatistics = catchAsync(async (req, res) => {
  const result = await StatisticsService.getAdminStatisticsFromDB();
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin statistics retrieved done',
    data: result,
  })
})

const getUserStatistics = catchAsync(async (req, res) => {
  const email = req.user.email
  const result = await StatisticsService.getUserStatisticsFromDB(email);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User statistics retrieved done',
    data: result,
  })
})


export const StatisticsController = {
  getAdminStatistics,
  getUserStatistics,
}