import jwt from "jsonwebtoken";
import {config} from "dotenv";
import {NextFunction, Request, Response} from "express";

config();

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
    const token = req.cookies['jwt-refresh-token']
    console.log(token);
    if (!token) {
        res.status(401).json({message: "Unauthorized"});
        return;
    }
    try {
        req.user = jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
        next();
    } catch (error) {
        res.status(500).json({msg: error});
    }
}


