import {NextFunction, Request, Response} from "express";
import LoginRequestDTO from "../dto/LoginRequest.DTO";
import {GlobalErrorHandlerMiddleware} from "../middleWare/GlobalErrorHandler.Middleware";
import {
    handleLoginRequest,
    handleRefreshTokenRequest, replaceUser,
    saveUser,
    sendResetPasswordURL,
    updatePassword,
    updatePermissions,
    updateUser,
} from "../service/User.Service";
import {UserDTO} from "../dto/User.DTO";
import {config} from 'dotenv'
import {Role} from "../utils/Role";

config();

type  DoneProps = { jwtAccessToken: string, jwtRefreshToken: string };

export async function defaultLoginRoute(req: Request, res: Response, next: NextFunction): Promise<void> {
    const reqData: LoginRequestDTO = req.body;
    console.info(`Login request received for email${reqData.email}`);
    try {
        const data: DoneProps & { isAdmin: boolean } | null = await handleLoginRequest(reqData);

        res.setHeader('Authorization', `Bearer ${data!.jwtAccessToken}`);
        res.setHeader('Role', data?.isAdmin ? 'admin' : 'user');
        res.cookie('jwt-refresh-token', data!.jwtRefreshToken, {httpOnly: true, secure: true, sameSite: 'strict'});

        res.status(200).json({status: 200, message: 'Login Successful'});

    } catch (err: any) {
        next(err as GlobalErrorHandlerMiddleware);
    }
}

export async function defaultRegistrationRoute(req: Request, res: Response, next: NextFunction): Promise<void> {
    const data: UserDTO = req.body;
    console.info(`request received for ${data.username}`);

    try {
        const tokens = await saveUser(data);

        res.setHeader('Authorization', `Bearer ${tokens.jwtAccessToken}`);
        res.cookie('jwt-refresh-token', tokens.jwtRefreshToken, {httpOnly: true, secure: true, sameSite: 'strict'})
        res.status(200).json({status: 200, message: "User saved successfully!"});

        console.log(`user saved successfully ${data.username}`);
    } catch (err: any) {
        next(err as GlobalErrorHandlerMiddleware);
    }
}

export async function googleCallbackRoute(req: Request, res: Response): Promise<void> {
    const doneProps: DoneProps = req.user as DoneProps;

    res.setHeader('Authorization', `Bearer ${doneProps.jwtAccessToken}`);
    res.cookie('jwt-refresh-token', doneProps.jwtRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 3600
    });
    res.redirect('/');
}

export async function refreshTokenRoute(req: Request, res: Response): Promise<void> {
    const refreshToken: string = req.cookies['jwt-refresh-token'];

    if (!refreshToken) {
        res.status(400).json({status: 401, message: 'Missing refresh token.Try re-login'});
        return;
    }

    const tokens = handleRefreshTokenRequest(refreshToken);

    res.setHeader('Authorization', `Bearer ${tokens.jwtAccessToken}`);
    res.cookie('jwt-refresh-token', tokens.jwtRefreshToken, {httpOnly: true, secure: true, sameSite: 'strict'})
    res.status(200).json({status: 200, message: "Refresh token Successful"});
}

export function logoutRoute(_: Request, res: Response): void {
    res.clearCookie('jwt-refresh-token');
    res.status(200).json({status:200,message:'Logout Successful'});
}

export async function resetPasswordURLRoute(req: Request, res: Response, next: NextFunction): Promise<void> {
    const email: string = req.params['email'];

    try {
        await sendResetPasswordURL(email);
        res.status(200).json({status: 200, message: `Reset password link sent to ${email}`});
    } catch (e) {
        next(e);
    }
}

export async function resetPasswordRoute(req: Request, res: Response, next: NextFunction): Promise<void> {
    const newPassword: string = req.cookies['new-password'];
    const email: string = req.params['email'];

    try {
        await updatePassword(email, newPassword);
        res.status(200).json({status: 200, message: `Password updated successfully`});
    } catch (e) {
        next(e);
    }

}

export async function patchRoute(req: Request, res: Response, next: NextFunction): Promise<void> {
    const email: string = req.params['email'];
    const data: Partial<Omit<UserDTO, 'email'>> = req.body;
    console.info("request received for patch user " + email);

    try {
        await updateUser(email, data);
        res.status(200).json({status: 200, message: 'updated successfully'})
        console.info("response status" + 200);
    } catch (e) {
        next(e as GlobalErrorHandlerMiddleware);
    }
}

export async function editPermissionsRoute(req: Request, res: Response, next: NextFunction): Promise<void> {
    const email: string = req.params['email'];
    const roles: Role[] = req.body;

    try {
        await updatePermissions(email, roles);
        res.status(200).json({status: 200, message: 'user permissions updated successfully'})
    } catch (e) {
        next(e);
    }
}

export async function replaceUserRoute(req: Request, res: Response, next: NextFunction):Promise<void> {
    const email: string = req.params['email'];
    const data: UserDTO = req.body;

    try {
        await replaceUser(email, data);
        res.status(200).json({status: 200, message: 'user updated successfully'})
    } catch (e) {
        next(e);
    }
}

export function authorizeRoute(req: Request, res: Response, _: NextFunction){
    const user = req.user
    res.status(200).json({msg : "Authenticated",user})
}