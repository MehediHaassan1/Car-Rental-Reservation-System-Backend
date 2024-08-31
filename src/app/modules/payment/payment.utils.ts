import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const initializePayment = async () => {



  const response = await axios.post("https://sandbox.aamarpay.com/jsonpost.php", {
    store_id: "aamarpaytest",
    signature_key: "dbb74894e82415a2f7ff0ec3a97e4183",
    tran_id: "acfedf123123173",
    success_url: "http://www.merchantdomain.com/sucesspage.html",
    fail_url: "http://www.merchantdomain.com/failedpage.html",
    cancel_url: "http://www.merchantdomain.com/cancellpage.html", 
    amount: "10.0",
    currency: "BDT",
    desc: "Merchant Registration Payment",
    cus_name: "Name",
    cus_email: "payer@merchantcusomter.com",
    cus_add1: "House B-158 Road 22",
    cus_add2: "Mohakhali DOHS",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1206",
    cus_country: "Bangladesh",
    cus_phone: "+8801704",
    type: "json"
  });

  console.log(response);
  console.log("config.store_id ----> ", process.env.STORE_ID)
}