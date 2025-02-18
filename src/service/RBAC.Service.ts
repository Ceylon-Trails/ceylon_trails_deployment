import jwt, {JwtPayload} from "jsonwebtoken";
import {Request} from "express";
import {Role} from "../utils/Role";
import UnAuthorizedOperationError from "../errors/UnAuthorizedOperation.Error";

export class RBACService {
    static hasRole(req: Request, ...allowedRoles: Role[]): true | UnAuthorizedOperationError {

        const header: string | undefined = req.header("Authorization");
        if (!header) throw new UnAuthorizedOperationError("Missing Authorization header", 403);

        const token: string | undefined = header.slice(7, header.length);
        if (!token) throw new UnAuthorizedOperationError("Missing token", 403);

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        const roles: Role[] | null = decoded["roles"] as Role[];

        if (!allowedRoles.some((role: Role): boolean => roles.includes(role)))
            return new UnAuthorizedOperationError("Insufficient permissions", 403);
        return true;
    }
}

