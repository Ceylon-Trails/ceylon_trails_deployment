import {NextFunction, Request, Response} from "express";
import {RBACService} from "../service/RBAC.Service";
import {Role} from "../utils/Role";

function authorize(...allowedRoles: Role[]): (req: Request, res: Response, next: NextFunction) => void {
    return (req: Request, _: Response, next: NextFunction): void => {
        try {
            RBACService.hasRole(req, ...allowedRoles);
            next();
        } catch (e) {
            next(e);
        }
    }
}

export default authorize;