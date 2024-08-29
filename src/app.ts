import express, { Application, Request, Response } from 'express'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
const app: Application = express()



// parser
app.use(cors({
    origin: ['http://localhost:5173', 'https://ride-ease-dusky.vercel.app'],
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());



// global route
app.use('/api', router);


app.get('/', (req: Request, res: Response) => {
    res.send('Server is running smoothly!')
})


// global error handler
app.use(globalErrorHandler);

// not found route
app.use(notFound);


export default app;