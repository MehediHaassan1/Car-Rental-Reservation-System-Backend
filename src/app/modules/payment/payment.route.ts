import { Router } from "express";
import { PaymentController } from "./payment.controller";

const router = Router();

router.post('/payment-verify', PaymentController.confirmPayment);

export const PaymentRoutes = router;