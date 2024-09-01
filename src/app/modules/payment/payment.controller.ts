import { Request, Response } from "express";
import { PaymentServices } from "./payment.service";

const confirmPayment = async (req: Request, res: Response) => {
    const { booking, dropOffDate, totalCost, trxID, status } = req.query;
    const htmlContent = await PaymentServices.confirmPaymentIntoDB(
        booking as string,
        dropOffDate as string,
        totalCost as string,
        trxID as string,
        status as string
    );

    res.send(htmlContent);
};

export const PaymentController = {
    confirmPayment,
};
