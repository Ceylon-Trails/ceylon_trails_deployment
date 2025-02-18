import express, {Router} from "express";
import {patchRoute, replaceUserRoute} from "../controllers/User.Controller";
import {Role} from "../utils/Role";
import authorize from "../middleWare/Authentication.MiddleWare";

const userRoutes: Router = express.Router();

userRoutes.patch('/:email/edit', authorize(Role.USER), patchRoute);
userRoutes.put('/:email/replace',authorize(Role.USER),replaceUserRoute);

export default userRoutes