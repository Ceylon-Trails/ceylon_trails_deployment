import express, {Router} from "express";
import {config} from "dotenv";
import passport from 'passport';
import {Profile, Strategy as GoogleStrategy, VerifyCallback} from 'passport-google-oauth20'
import {handleGoogleAuthUser} from "../service/User.Service";

config();
const googleAuthRoutes: Router = express.Router();

type  DoneProps = { jwtAccessToken: string, jwtRefreshToken: string };

const CLIENT_ID: string = process.env.GOOGLE_CLIENT_ID!;
const CLIENT_SECRET: string = process.env.GOOGLE_CLIENT_SECRET!;
const REDIRECT_URI:string=process.env.GOOGLE_REDIRECT_URI!;

passport.use(new GoogleStrategy({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: REDIRECT_URI,
}, async (_acc: string, _ref: string, profile: Profile, done: VerifyCallback): Promise<void> => {

    console.log("Google request received");
    const email: string = profile.emails?.at(0)?.value!;
    const username: string = profile.username ?? profile.displayName;

    const {jwtAccessToken, jwtRefreshToken}: DoneProps = await handleGoogleAuthUser(profile.id, email, username);

    done(null, {jwtRefreshToken, jwtAccessToken});
}));

passport.serializeUser((user: Express.User, done: Function): void => done(null, user));
passport.deserializeUser((user: Express.User, done: Function): void => done(null, user));

export default googleAuthRoutes;