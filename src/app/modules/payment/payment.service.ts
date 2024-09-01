import fs from 'fs';
import path from 'path';
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import Booking from "../booking/booking.model";
import { verifyPayment } from "./payment.utils";
import Car from "../car/car.model";


const readHTMLTemplate = (): string => {
  const templatePath = path.join(__dirname, '../../../../public/verifyPayment.html');
  return fs.readFileSync(templatePath, 'utf8');
};

const generatePaymentHTML = (paymentStatus: string): string => {
  const template = readHTMLTemplate();

  const color = paymentStatus === 'success' ? '#4CAF50' : '#F44336';
  const imageSrc = paymentStatus === 'success' ? 'https://i.ibb.co/Ksbkcvd/check-payment.png' : 'https://i.ibb.co/9bKrbhq/failed.png';
  const title = paymentStatus === 'success' ? 'Payment Confirmed' : 'Payment Failed';
  const subtitle = paymentStatus === 'success' ? 'Thank you for your payment!' : 'There was an issue with your payment. Please try again.';

  return template
    .replace('{{paymentStatus}}', paymentStatus)
    .replace('{{color}}', color)
    .replace('{{imageSrc}}', imageSrc)
    .replace('{{title}}', title)
    .replace('{{subtitle}}', subtitle);
};

const confirmPaymentIntoDB = async (booking: string, trxID: string, status: string) => {
  const verifyResponse = await verifyPayment(trxID!);

  const bookedCar = await Booking.findById(booking);
  if (!bookedCar) {
    throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');
  }


  let result;
  if (verifyResponse && verifyResponse.pay_status === "Successful") {
    result = await Booking.findOneAndUpdate(
      { _id: booking },
      { paid: true },
      { new: true }
    );
  }
  console.log(result);
  // Generate HTML based on the status
  const paymentStatus = status === "success" && result ? 'success' : 'failed';
  const htmlContent = generatePaymentHTML(paymentStatus);

  return htmlContent;
}

export const PaymentServices = {
  confirmPaymentIntoDB,
};
