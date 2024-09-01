import { Request, Response } from "express";
import { PaymentServices } from "./payment.service";

const confirmPayment = async (req: Request, res: Response) => {
    const { booking, trxID, status } = req.query;
    console.log(booking, trxID, status);
    const htmlContent = await PaymentServices.confirmPaymentIntoDB(
        booking as string,
        trxID as string,
        status as string
    );

    res.send(htmlContent);
};

export const PaymentController = {
    confirmPayment,
};
