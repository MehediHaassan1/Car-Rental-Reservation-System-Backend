import express, { Application, Request, Response } from 'express'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
const app: Application = express()



// parser
app.use(cors());
app.use(express.json());
app.use(cookieParser());


// global route
app.use('/api', router);

// global error handler
app.use(globalErrorHandler);


app.get('/', (req: Request, res: Response) => {
    res.send('Server is under development! Please visit us later.')
})

export default app;