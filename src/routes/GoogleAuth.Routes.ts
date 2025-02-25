import passport from "passport";
import googleAuthRoutes from "../middleWare/GoogleAuth.Middleware";
import {googleCallbackRoute} from "../controllers/User.Controller";
import {Role} from "../utils/Role";
import authorize from "../middleWare/Authentication.MiddleWare";

googleAuthRoutes.get("/", passport.authenticate("google", {
        scope: ['email', 'profile'],
        session: false
    })
);

googleAuthRoutes.get('/callback', passport.authenticate('google', {
    failureRedirect: '/',
    session: false
}), googleCallbackRoute);

export default googleAuthRoutes