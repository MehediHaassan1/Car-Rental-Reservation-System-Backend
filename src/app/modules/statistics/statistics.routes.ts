import { Router } from "express";
import authHandler from "../../middlewares/authHandler";
import { T_User_Roles } from "../user/user.constant";
import { StatisticsController } from "./statistics.controller";

const router = Router();

router.get(
  '/admin-statistics', 
  authHandler(T_User_Roles.ADMIN),
  StatisticsController.getAdminStatistics
)

router.get(
  '/user-statistics', 
  authHandler(T_User_Roles.USER),
  StatisticsController.getUserStatistics
)


export const StatisticsRoutes = router;