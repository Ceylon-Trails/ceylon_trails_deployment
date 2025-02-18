import express, {Request, Response, Router} from "express";
import '../db/ConnectionHandler'
import {
    authorizeRoute,
    defaultLoginRoute,
    defaultRegistrationRoute,
    editPermissionsRoute,
    logoutRoute,
    refreshTokenRoute,
    resetPasswordRoute,
    resetPasswordURLRoute
} from "../controllers/User.Controller";
import {Role} from "../utils/Role";
import authorize from "../middleWare/Authentication.MiddleWare";
import {authMiddleware} from "../middleWare/CheckAuthentication.Mddleware";

const defaultAuthRoutes: Router = express.Router();

defaultAuthRoutes.post("/", (_: Request, res: Response): void => {
    res.redirect("/login");
    console.info("redirected to '/login'");
});

defaultAuthRoutes.post("/login", defaultLoginRoute);
defaultAuthRoutes.post("/register", defaultRegistrationRoute);
defaultAuthRoutes.get("/refresh-token", authorize(Role.USER), refreshTokenRoute);
defaultAuthRoutes.get("/logout",  logoutRoute);
defaultAuthRoutes.get("/:email/reset-password-url/", authorize(Role.USER), resetPasswordURLRoute);
defaultAuthRoutes.get("/:email/reset-password/", authorize(Role.USER), resetPasswordRoute);
defaultAuthRoutes.patch("/:email/permissions", authorize(Role.ADMIN), editPermissionsRoute);
defaultAuthRoutes.get("/checkAuth",authMiddleware,authorizeRoute);

export default defaultAuthRoutes;