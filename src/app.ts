import {config} from "dotenv";
import express, {Express, Request, Response} from 'express';
import AuthRouter from './routes/DefaultAuth.Routes';
import CardRouter from './routes/SelectionCard.Routes';
import GoogleRouter from './routes/GoogleAuth.Routes';
import UserRouter from './routes/User.Routes';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import {errorHandler} from "./middleWare/GlobalErrorHandler.Middleware";
import './db/ConnectionHandler'
import passport from "passport";
import path from "path";

config();
const host: string = process.env.HOST ?? '127.0.0.1';
const port: number = parseInt(process.env.PORT ?? "3000");

const app: Express = express();
app.use(cookieParser());

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cache-control', 'Expires', 'Prigma'],
    exposedHeaders: ['Authorization', 'Role'],
    credentials: true
}));
app.use(express.json());

app.use("/auth", AuthRouter);
app.use("/user/google", GoogleRouter);
app.use('/cards', CardRouter);
app.use('/user', UserRouter);
app.use(passport.initialize());
app.use(errorHandler);

// app.use(express.static(path.join(__dirname, '../ceylon-trails-client/dist')));
// app.get('*', (_: Request, res: Response): void => {
//     const filePath = path.join(__dirname, '../ceylon-trails-client/dist/index.html');
//     console.log('Resolved File Path:', filePath); // Log this to check the final resolved path
//     res.sendFile(filePath);
// });

app.listen(port, (): void => {
    console.log(`Server started at ${host} port ${port}`);
})

