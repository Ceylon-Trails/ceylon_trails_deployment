import {config} from "dotenv";
import nodemailer, {SentMessageInfo} from 'nodemailer';
import {MailModel} from "../models/Mail.Model";

config();

const EMAIL: string = process.env.EMAIL!;
const API_KEY: string = process.env.API_KEY!;

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL,
        pass: API_KEY
    }
});

export function sendMail(to: string, sub: string, text: string):boolean {
    const opt: MailModel = {
        from: EMAIL,
        to: to,
        subject: sub,
        text: text
    }
    transport.sendMail(opt, function (error: Error | null, info: SentMessageInfo) {
        if (error) {
            throw Error(error.message)
        }
        console.log('Email sent: ' + info.response);
    });
    return true;
}