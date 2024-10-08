import axios from 'axios';
import config from '../../config';
import { TUserPaymentInfo } from '../booking/booking.interface';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';


export const initializePayment = async (userPaymentInfo: TUserPaymentInfo) => {
  const { bookingId, trxID } = userPaymentInfo;
  try {
    const response = await axios.post(config.payment_url!, {
      store_id: config.store_id,
      signature_key: config.signature_key,
      tran_id: userPaymentInfo.trxID,
      success_url: `https://car-rental-reservation-system-backend.vercel.app/payment-verify?booking=${bookingId}&trxID=${trxID}&status=success`,
      fail_url: `https://car-rental-reservation-system-backend.vercel.app/payment-verify?booking=${bookingId}&status=failed`,
      cancel_url: "https://ride-ease-dusky.vercel.app",
      amount: userPaymentInfo.totalCost,
      currency: "BDT",
      desc: "Merchant Registration Payment",
      cus_name: userPaymentInfo.name,
      cus_email: userPaymentInfo.email,
      cus_add1: userPaymentInfo.address || "N/A",
      cus_add2: "N/A",
      cus_city: "N/A",
      cus_state: "N/A",
      cus_postcode: "N/A",
      cus_country: "N/A",
      cus_phone: userPaymentInfo.phone,
      type: "json"
    });

    return response.data;
  } catch (err) {
    throw new AppError(httpStatus.BAD_GATEWAY, 'Failed to pay')
  }

}

export const verifyPayment = async (trxID: string) => {
  try {
    const response = await axios.get(config.payment_verify_url!, {
      params: {
        store_id: config.store_id,
        signature_key: config.signature_key,
        type: "json",
        request_id: trxID
      }
    });

    return response.data;
  }
  catch (err) {
    throw new Error("Payment validation failed!")
  }
}