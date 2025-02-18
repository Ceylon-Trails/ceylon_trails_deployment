import express, {Router} from "express";
import {getAll, post} from "../controllers/SelectionCard.Controller";
import {Role} from "../utils/Role";
import authorize from "../middleWare/Authentication.MiddleWare";

const router: Router = express.Router();

router.get('/',  getAll);
router.post('/', authorize(Role.ADMIN), post);

export default router;