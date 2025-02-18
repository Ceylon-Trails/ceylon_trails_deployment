import {config} from "dotenv";
import mongoose from "mongoose";

config();
const url: string = process.env.DB_URL!;

(async (): Promise<void> => mongoose.connect(url)
    .then((): void => console.log("DB connected!"))
    .catch((err: Error): void => console.log(err)))();