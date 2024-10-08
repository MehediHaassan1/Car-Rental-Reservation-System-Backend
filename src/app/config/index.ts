import dotenv from 'dotenv';

dotenv.config();


export default {
    NODE_ENV: process.env.NODE_ENV,
    port: process.env.PORT,
    db_url: process.env.DB_URL,
    bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    jwt_access_secret_expires_in: process.env.JWT_ACCESS_SECRET_EXPIRES_IN,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
    jwt_refresh_secret_expires_in: process.env.JWT_REFRESH_SECRET_EXPIRES_IN,
    payment_url: process.env.PAYMENT_URL,
    store_id: process.env.STORE_ID,
    signature_key: process.env.SIGNATURE_KEY,
    payment_verify_url: process.env.PAYMENT_VERIFY_URL,
}