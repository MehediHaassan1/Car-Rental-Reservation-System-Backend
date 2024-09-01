import express, { Application, Request, Response } from 'express'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import { PaymentRoutes } from './app/modules/payment/payment.route';
import path from 'path';
const app: Application = express()

// Static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// parser
app.use(cors({
    origin: ['http://localhost:5173', 'https://ride-ease-dusky.vercel.app'],
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());



// global route
app.use('/api', router);
// paymentroute
app.use(PaymentRoutes)

app.get('/', (req: Request, res: Response) => {
    res.send('Server is running smoothly!')
})


// global error handler
app.use(globalErrorHandler);

// not found route
app.use(notFound);


export default app;